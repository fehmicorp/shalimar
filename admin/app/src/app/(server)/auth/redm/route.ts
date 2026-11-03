import { NextRequest, NextResponse } from "next/server";

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
  let client: import("pg").PoolClient | null = null;
  let transactionStarted = false;
  let recoveryCommitted = false;

  try {
    await InitializeServer();

    // Only an authenticated Root recovery session is accepted.
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

    // Enforce same-origin browser requests.
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
      typeof body.password === "string" ? body.password : "";

    const confirmPassword =
      typeof body.confirmPassword === "string"
        ? body.confirmPassword
        : "";

    if (
      !username ||
      username.length < 3 ||
      username.length > 50 ||
      !/^[a-z0-9._-]+$/.test(username)
    ) {
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

    // Hash before acquiring database locks to minimize lock duration.
    const passwordHash = await hashPassword(password);

    client = await db.connect();

    if (!client) {
      throw new Error("Database connection unavailable.");
    }

    await client.query("BEGIN");
    transactionStarted = true;

    // Lock Root account. Root may be inactive and locked after setup.
    const rootResult = await client.query(
      `
        SELECT id, username, role
        FROM users
        WHERE id = $1
          AND role = 'root'
        FOR UPDATE
      `,
      [session.userId]
    );

    const rootUser = rootResult.rows[0];

    if (!rootUser) {
      await client.query("ROLLBACK");
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message: "Root account is not authorized for recovery.",
        },
        { status: 403 }
      );
    }

    // Lock the one existing Super Admin account.
    const superAdminResult = await client.query(
      `
        SELECT id, username, role, is_active
        FROM users
        WHERE role = 'superadmin'
        FOR UPDATE
      `
    );

    if (superAdminResult.rows.length !== 1) {
      await client.query("ROLLBACK");
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message:
            "Recovery requires exactly one existing Super Admin account.",
        },
        { status: 409 }
      );
    }

    const superAdmin = superAdminResult.rows[0];

    if (superAdmin.username.toLowerCase() !== username) {
      await client.query("ROLLBACK");
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message: "The Super Admin username does not match.",
        },
        { status: 400 }
      );
    }

    // Update the existing Super Admin. Never insert a new account here.
    await client.query(
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
      `,
      [passwordHash, superAdmin.id]
    );

    // Disable Root again after successful recovery.
    await client.query(
      `
        UPDATE users
        SET
          is_active = FALSE,
          is_locked = TRUE,
          failed_login_attempts = 0,
          updated_at = NOW()
        WHERE id = $1
          AND role = 'root'
      `,
      [rootUser.id]
    );

    // Record the recovery event using the existing audit table.
    // This records the target account and the request metadata.
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

    await client.query("COMMIT");
    transactionStarted = false;
    recoveryCommitted = true;

    // The Root account is now inactive.
    // Invalidate the current Root session.
    try {
      await destroyAdminSession();
    } catch (sessionError) {
      console.error(
        "[Admin Auth] Root session invalidation error:",
        sessionError
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Super Admin password updated successfully. Root access has been disabled.",
      nextStep: "login",
    });
  } catch (error) {
    if (client && transactionStarted && !recoveryCommitted) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error(
          "[Admin Auth] Recovery rollback error:",
          rollbackError
        );
      }
    }

    console.error("[Admin Auth] Super Admin recovery error:", error);

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