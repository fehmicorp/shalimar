
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/server/db";
import { redis } from "@/lib/server/redis";
import { verifyPassword } from "@/lib/server/password";
import { createAdminSession } from "@/lib/server/auth";
import { InitializeServer } from "@/lib/server/initialize";

interface LoginRequest {
  username?: string;
  password?: string;
}

interface UserRecord {
  id: string;
  username: string;
  password_hash: string;
  role: string;
  is_active: boolean;
  is_locked: boolean;
  failed_login_attempts: number;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 15 * 60;

function getClientIp(request: NextRequest): string {
  // Trust these headers only when your reverse proxy overwrites them.
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

function rateLimitPart(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function getRateLimitKeys(username: string, ip: string) {
  return {
    ipKey: `admin:login:ip:${rateLimitPart(ip)}`,
    usernameKey: `admin:login:user:${rateLimitPart(username)}`,
  };
}

async function recordFailedAttempt(
  username: string,
  ip: string,
  userId: string | null,
  userAgent: string | null
) {
  const { ipKey, usernameKey } = getRateLimitKeys(username, ip);

  const [ipAttempts, usernameAttempts] = await Promise.all([
    redis.incr(ipKey),
    redis.incr(usernameKey),
  ]);

  if (ipAttempts === 1) {
    await redis.expire(ipKey, LOCKOUT_SECONDS);
  }

  if (usernameAttempts === 1) {
    await redis.expire(usernameKey, LOCKOUT_SECONDS);
  }

  await db.query(
    `
      INSERT INTO login_audit (
        user_id,
        username,
        ip_address,
        user_agent,
        success
      )
      VALUES ($1, $2, $3, $4, FALSE)
    `,
    [
      userId,
      username,
      ip === "unknown" ? null : ip,
      userAgent,
    ]
  );

  return {
    locked:
      ipAttempts >= MAX_ATTEMPTS ||
      usernameAttempts >= MAX_ATTEMPTS,
  };
}

async function getSuperAdminCount(): Promise<number> {
  const result = await db.query(
    `
      SELECT COUNT(*)::INTEGER AS total
      FROM users
      WHERE role = 'superadmin'
    `
  );

  return Number(result.rows[0]?.total ?? 0);
}

async function clearLoginRateLimits(
  username: string,
  ip: string
): Promise<void> {
  const { ipKey, usernameKey } = getRateLimitKeys(username, ip);

  await Promise.all([
    redis.del(ipKey),
    redis.del(usernameKey),
  ]);
}

export async function POST(request: NextRequest) {
  try {
    await InitializeServer();

    // --------------------------------------------------
    // 1. Parse request
    // --------------------------------------------------

    let body: LoginRequest;

    try {
      body = (await request.json()) as LoginRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        { status: 400 }
      );
    }

    const submittedUsername =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (
      !submittedUsername ||
      submittedUsername.length < 3 ||
      submittedUsername.length > 51 ||
      password.length < 1 ||
      password.length > 128
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 2. Identify Root login
    // --------------------------------------------------

    // Root identifier: #rootadmin becomes rootadmin.
    const isRootLogin = submittedUsername.startsWith("#");

    const username = normalizeUsername(
      isRootLogin
        ? submittedUsername.slice(1)
        : submittedUsername
    );

    if (
      !username ||
      username.length < 3 ||
      username.length > 50 ||
      username.startsWith("#")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent");

    // --------------------------------------------------
    // 3. Redis rate limiting
    // --------------------------------------------------

    const { ipKey, usernameKey } = getRateLimitKeys(username, ip);

    const [ipAttempts, usernameAttempts] = await Promise.all([
      redis.get(ipKey),
      redis.get(usernameKey),
    ]);

    const isRateLimited =
      Number(ipAttempts || 0) >= MAX_ATTEMPTS ||
      Number(usernameAttempts || 0) >= MAX_ATTEMPTS;

    if (isRateLimited) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many login attempts. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(LOCKOUT_SECONDS),
          },
        }
      );
    }

    // --------------------------------------------------
    // 4. Fetch user
    // --------------------------------------------------

    const result = await db.query<UserRecord>(
      `
        SELECT
          id,
          username,
          password_hash,
          role,
          is_active,
          is_locked,
          failed_login_attempts
        FROM users
        WHERE LOWER(username) = $1
        LIMIT 1
      `,
      [username]
    );

    const user = result.rows[0];

    // --------------------------------------------------
    // 5. Validate role
    // --------------------------------------------------

    const validRole =
      user &&
      (
        isRootLogin
          ? user.role === "root"
          : user.role !== "root"
      );

    const accountAllowed =
      user &&
      (
        isRootLogin ||
        (
          user.is_active === true &&
          user.is_locked === false
        )
      );

    let passwordMatches = false;

    if (user?.password_hash) {
      passwordMatches = await verifyPassword(
        user.password_hash,
        password
      );
    }

    if (
      !user ||
      !validRole ||
      !accountAllowed ||
      !passwordMatches
    ) {
      if (user?.id) {
        await db.query(
          `
            UPDATE users
            SET
              failed_login_attempts = failed_login_attempts + 1,
              updated_at = NOW()
            WHERE id = $1
          `,
          [user.id]
        );
      }

      const rateLimit = await recordFailedAttempt(
        username,
        ip,
        user?.id || null,
        userAgent
      );

      return NextResponse.json(
        {
          success: false,
          message: rateLimit.locked
            ? "Too many login attempts. Please try again later."
            : "Invalid username or password.",
        },
        {
          status: rateLimit.locked ? 429 : 401,
          headers: rateLimit.locked
            ? {
                "Retry-After": String(LOCKOUT_SECONDS),
              }
            : undefined,
        }
      );
    }

    let requiresSetup = false;
    let requiresRecovery = false;

    if (isRootLogin) {
      const superAdminResult = await db.query(
        `
          SELECT
            id,
            username,
            is_active,
            is_locked
          FROM users
          WHERE role = 'superadmin'
          LIMIT 2
        `
      );

      const superAdmins = superAdminResult.rows;

      if (superAdmins.length === 0) {
        // Initial setup: no Super Admin exists.
        requiresSetup = true;
      } else if (superAdmins.length === 1) {
        const superAdmin = superAdmins[0];

        // Recovery is permitted only when Super Admin is disabled and locked.
        if (
          superAdmin.is_active === false &&
          superAdmin.is_locked === true
        ) {
          requiresRecovery = true;
        } else {
          return NextResponse.json(
            {
              success: false,
              message:
                "Super Admin account is active. Root recovery is not permitted.",
            },
            { status: 403 }
          );
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            message:
              "Multiple Super Admin accounts detected. Contact system support.",
          },
          { status: 409 }
        );
      }
    }

    await db.query(
      `
        UPDATE users
        SET
          failed_login_attempts = 0,
          last_login_at = NOW(),
          updated_at = NOW()
        WHERE id = $1
      `,
      [user.id]
    );

    await db.query(
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
        user.id,
        user.username,
        ip === "unknown" ? null : ip,
        userAgent,
      ]
    );

    await clearLoginRateLimits(username, ip);

    await createAdminSession({
      userId: user.id,
      username: user.username,
      role: user.role,
      createdAt: Date.now(),
    });

    if (isRootLogin) {
      return NextResponse.json({
        success: true,
        message: "Root authentication successful.",
        requiresSetup,
        requiresRecovery,
        nextStep: requiresSetup
          ? "create_superadmin"
          : "recover_superadmin",

        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    }
    return NextResponse.json({
      success: true,
      message: "Authentication successful.",
      requiresSetup: false,
      requiresRecovery: false,
      nextStep: "dashboard",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("[Admin Auth] Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Authentication service is temporarily unavailable.",
      },
      { status: 503 }
    );
  }
}
