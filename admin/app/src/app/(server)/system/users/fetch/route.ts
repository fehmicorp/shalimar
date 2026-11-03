
import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const instant = false;

const ALLOWED_ROLES = [
  "superadmin",
  "admin",
  "manager",
  "editor",
  "publisher",
  "media_manager",
  "hr",
  "staff",
] as const;

const ALLOWED_STATUSES = ["active", "inactive", "locked"] as const;

function isAuthorized(role: string) {
  return role === "superadmin" || role === "admin";
}

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session || !isAuthorized(session.role)) {
      return NextResponse.json(
        { error: "You are not authorized to view users." },
        { status: 403 }
      );
    }

    const params = request.nextUrl.searchParams;

    const search = (params.get("search") || "").trim().slice(0, 100);
    const role = params.get("role") || "all";
    const status = params.get("status") || "all";

    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(params.get("limit")) || 8)
    );

    if (
      role !== "all" &&
      !ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])
    ) {
      return NextResponse.json({ error: "Invalid role filter." }, { status: 400 });
    }

    if (
      status !== "all" &&
      !ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])
    ) {
      return NextResponse.json(
        { error: "Invalid status filter." },
        { status: 400 }
      );
    }

    const conditions: string[] = ["role <> 'root'"];
    const values: unknown[] = [];

    if (search) {
      values.push(`%${search}%`);
      const index = values.length;

      conditions.push(
        `(username ILIKE $${index} OR COALESCE(email, '') ILIKE $${index} OR id::text ILIKE $${index})`
      );
    }

    if (role !== "all") {
      values.push(role);
      conditions.push(`role = $${values.length}`);
    }

    if (status === "active") {
      conditions.push("is_active = TRUE AND is_locked = FALSE");
    } else if (status === "inactive") {
      conditions.push("is_active = FALSE AND is_locked = FALSE");
    } else if (status === "locked") {
      conditions.push("is_locked = TRUE");
    }

    const where = conditions.join(" AND ");

    const countResult = await db.query<{
      total: string;
      active: string;
      inactive: string;
      locked: string;
    }>(
      `
      SELECT
        COUNT(*)::text AS total,
        COUNT(*) FILTER (
          WHERE is_active = TRUE AND is_locked = FALSE
        )::text AS active,
        COUNT(*) FILTER (
          WHERE is_active = FALSE AND is_locked = FALSE
        )::text AS inactive,
        COUNT(*) FILTER (
          WHERE is_locked = TRUE
        )::text AS locked
      FROM users
      WHERE role <> 'root'
      `
    );

    const count = countResult.rows[0];

    const filteredCountResult = await db.query<{ total: string }>(
      `SELECT COUNT(*)::text AS total FROM users WHERE ${where}`,
      values
    );

    const total = Number(filteredCountResult.rows[0]?.total || 0);
    const offset = (page - 1) * limit;

    const dataValues = [...values, limit, offset];

    const result = await db.query(
      `
      SELECT
        id,
        username,
        email,
        role,
        is_active,
        is_locked,
        last_login_at,
        created_at,
        CASE
          WHEN is_locked = TRUE THEN 'Locked'
          WHEN is_active = FALSE THEN 'Inactive'
          ELSE 'Active'
        END AS status
      FROM users
      WHERE ${where}
      ORDER BY created_at DESC
      LIMIT $${dataValues.length - 1}
      OFFSET $${dataValues.length}
      `,
      dataValues
    );

    return NextResponse.json({
      users: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
      summary: {
        total: Number(count?.total || 0),
        active: Number(count?.active || 0),
        inactive: Number(count?.inactive || 0),
        locked: Number(count?.locked || 0),
      },
    });
  } catch (error) {
    console.error("GET /api/system/users:", error);

    return NextResponse.json(
      { error: "Unable to retrieve users." },
      { status: 500 }
    );
  }
}
