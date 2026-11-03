
import { NextRequest, NextResponse } from "next/server";
import type { PoolClient } from "pg";

import { db } from "@/lib/server/db";
import {
  getAdminSession,
  destroyAdminSession,
} from "@/lib/server/auth";
import { hashPassword } from "@/lib/server/password";
import { InitializeServer } from "@/lib/server/initialize";

interface RecoveryRequest {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isValidPassword(password: string): boolean {
  return (
    password.length >= 12 &&
    password.length <= 128 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export async function POST(request: NextRequest) {
  let client: PoolClient | null = null;
  let transactionStarted = false;

  try {
    await InitializeServer();

    // --------------------------------------------------
    // 1. Validate Root recovery session
    // --------------------------------------------------

    const session = await getAdminSession();

    if (!session || session.role !== "root") {
      return NextResponse.json(
        {
          success: false,
          message: "Root recovery authorization required.",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // 2. Validate request origin
    // --------------------------------------------------

    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (!origin || !host) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request origin.",
        },
        { status: 403 }
      );
    }

    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json(
          {
            success: false,
            message: "Cross-origin requests are not allowed.",
          },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request origin.",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // 3. Parse request
    // --------------------------------------------------

    let body: RecoveryRequest;

    try {
      body = (await request.json()) as RecoveryRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        { status: 400 }
      );
    }

    const username =
      typeof body.username === "string"
        ? body.username.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const confirmPassword =
      typeof body.confirmPassword === "string"
        ? body.confirmPassword
        : "";

    if (!/^[a-z0-9._-]{3,50}$/.test(username)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Super Admin username.",
        },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be 12–128 characters and include uppercase, lowercase, number and special character.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match.",
        },
        { status: 400 }
      );
    }

    // Hash before acquiring database locks.
    const passwordHash = await hashPassword(password);

    // --------------------------------------------------
    // 4. Begin transaction
    // --------------------------------------------------

    client = await db.connect();

    await client.query("BEGIN");
    transactionStarted = true;

    // --------------------------------------------------
    // 5. Lock Root account
    // --------------------------------------------------

    const rootResult = await client.query(
      `
        SELECT
          id,
          username,
          role,
          is_active,
          is_locked
        FROM users
        WHERE id = $1
          AND role = 'root'
        FOR UPDATE
      `,
      [session.userId]
    );

    const root = rootResult.rows[0];

    if (
      !root ||
      root.is_active !== false ||
      root.is_locked !== true
    ) {
      throw new Error("ROOT_RECOVERY_NOT_ALLOWED");
    }

    // --------------------------------------------------
    // 6. Lock Super Admin account
    // --------------------------------------------------

    const superAdminResult = await client.query(
      `
        SELECT
          id,
          username,
          role,
          is_active,
          is_locked
        FROM users
        WHERE role = 'superadmin'
        FOR UPDATE
      `
    );

    if (superAdminResult.rows.length !== 1) {
      throw new Error("INVALID_SUPERADMIN_COUNT");
    }

    const superAdmin = superAdminResult.rows[0];

    // Verify username.
    if (superAdmin.username.toLowerCase() !== username) {
      throw new Error("SUPERADMIN_USERNAME_MISMATCH");
    }

    // Recovery only when Super Admin is disabled and locked.
    if (
      superAdmin.is_active !== false ||
      superAdmin.is_locked !== true
    ) {
      throw new Error("SUPERADMIN_NOT_LOCKED");
    }

    // --------------------------------------------------
    // 7. Update Super Admin password and activate
    // --------------------------------------------------

    const updateSuperAdmin = await client.query(
      `
        UPDATE users
        SET
          password_hash = $1,
          is_active = TRUE,
          is_locked = FALSE,
          failed_login_attempts = 0,
          password_changed_at = NOW(),
          updated_at = NOW()
        WHERE id = $2
          AND role = 'superadmin'
          AND is_active = FALSE
          AND is_locked = TRUE
        RETURNING id
      `,
      [passwordHash, superAdmin.id]
    );

    if (updateSuperAdmin.rowCount !== 1) {
      throw new Error("SUPERADMIN_UPDATE_FAILED");
    }

    // --------------------------------------------------
    // 8. Keep Root disabled and locked
    // --------------------------------------------------

    const updateRoot = await client.query(
      `
        UPDATE users
        SET
          is_active = FALSE,
          is_locked = TRUE,
          failed_login_attempts = 0,
          updated_at = NOW()
        WHERE id = $1
          AND role = 'root'
        RETURNING id
      `,
      [root.id]
    );

    if (updateRoot.rowCount !== 1) {
      throw new Error("ROOT_UPDATE_FAILED");
    }

    // --------------------------------------------------
    // 9. Audit recovery
    // --------------------------------------------------

    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent");

    await client.query(
      `
        INSERT INTO login_audit (
          user_id,
          username,
          ip_address,
          user_agent,
          success
        )
        VALUES ($1, $2, $3, $4, TRUE)
      `,
      [
        superAdmin.id,
        `password-recovery:${superAdmin.username}`,
        ip === "unknown" ? null : ip,
        userAgent,
      ]
    );

    // --------------------------------------------------
    // 10. Commit transaction
    // --------------------------------------------------

    await client.query("COMMIT");
    transactionStarted = false;

    // --------------------------------------------------
    // 11. Destroy Root session
    // --------------------------------------------------

    try {
      await destroyAdminSession();
    } catch (error) {
      // Database state is already committed.
      console.error(
        "[Super Admin Recovery] Root session cleanup failed:",
        error
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Super Admin password changed successfully. Super Admin is now active and Root remains disabled.",
      nextStep: "login",
    });

  } catch (error) {
    if (client && transactionStarted) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error(
          "[Super Admin Recovery] Rollback failed:",
          rollbackError
        );
      }
    }

    if (error instanceof Error) {
      const errors: Record<string, { message: string; status: number }> = {
        ROOT_RECOVERY_NOT_ALLOWED: {
          message: "Root recovery is not available.",
          status: 403,
        },
        INVALID_SUPERADMIN_COUNT: {
          message: "Exactly one Super Admin account is required.",
          status: 409,
        },
        SUPERADMIN_USERNAME_MISMATCH: {
          message: "Super Admin username does not match.",
          status: 400,
        },
        SUPERADMIN_NOT_LOCKED: {
          message: "Super Admin must be disabled and locked before recovery.",
          status: 409,
        },
        SUPERADMIN_UPDATE_FAILED: {
          message: "Unable to update Super Admin account.",
          status: 409,
        },
        ROOT_UPDATE_FAILED: {
          message: "Unable to update Root account.",
          status: 409,
        },
      };

      const knownError = errors[error.message];

      if (knownError) {
        return NextResponse.json(
          {
            success: false,
            message: knownError.message,
          },
          { status: knownError.status }
        );
      }
    }

    console.error(
      "[Super Admin Recovery] Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to complete Super Admin password recovery.",
      },
      { status: 503 }
    );
  } finally {
    client?.release();
  }
}
