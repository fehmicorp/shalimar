
import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const instant = false;

const ALLOWED_CATEGORIES = [
  "authentication",
  "content",
  "media",
  "system",
] as const;

const ALLOWED_STATUSES = ["success", "failed"] as const;

function isAuthorized(role: string) {
  return role === "superadmin" || role === "admin";
}

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session || !isAuthorized(session.role)) {
      return NextResponse.json(
        { error: "You are not authorized to view audit logs." },
        { status: 403 }
      );
    }

    const params = request.nextUrl.searchParams;

    const search = (params.get("search") || "").trim().slice(0, 100);
    const category = params.get("category") || "all";
    const status = params.get("status") || "all";
    const days = params.get("days") || "all";

    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(params.get("limit")) || 8)
    );

    if (
      category !== "all" &&
      !ALLOWED_CATEGORIES.includes(
        category as (typeof ALLOWED_CATEGORIES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Invalid audit category." },
        { status: 400 }
      );
    }

    if (
      status !== "all" &&
      !ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])
    ) {
      return NextResponse.json(
        { error: "Invalid audit status." },
        { status: 400 }
      );
    }

    if (days !== "all" && !["7", "30", "90"].includes(days)) {
      return NextResponse.json(
        { error: "Invalid date range." },
        { status: 400 }
      );
    }

    const conditions: string[] = [];
    const values: unknown[] = [];

    if (category !== "all") {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (status !== "all") {
      values.push(status === "success");
      conditions.push(`success = $${values.length}`);
    }

    if (days !== "all") {
      values.push(Number(days));
      conditions.push(
        `created_at >= NOW() - ($${values.length} * INTERVAL '1 day')`
      );
    }

    if (search) {
      values.push(`%${search}%`);
      const index = values.length;

      conditions.push(`
        (
          event_id ILIKE $${index}
          OR COALESCE(username, '') ILIKE $${index}
          OR action ILIKE $${index}
          OR COALESCE(description, '') ILIKE $${index}
          OR COALESCE(ip_address, '') ILIKE $${index}
        )
      `);
    }

    const where = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const auditCte = `
      WITH audit_events AS (
        SELECT
          'LOGIN-' || id::text AS event_id,
          user_id,
          username,
          CASE
            WHEN success THEN 'Successful login'
            ELSE 'Failed login'
          END AS action,
          'authentication'::text AS category,
          CASE
            WHEN success THEN 'Administrator authenticated successfully'
            ELSE 'Authentication attempt failed'
          END AS description,
          ip_address::text AS ip_address,
          user_agent,
          success,
          created_at
        FROM login_audit

        UNION ALL

        SELECT
          'AUDIT-' || id::text AS event_id,
          user_id,
          username,
          action,
          category,
          description,
          ip_address::text AS ip_address,
          user_agent,
          success,
          created_at
        FROM security_audit
      )
    `;

    const countResult = await db.query<{ total: string }>(
      `
      ${auditCte}
      SELECT COUNT(*)::text AS total
      FROM audit_events
      ${where}
      `,
      values
    );

    const total = Number(countResult.rows[0]?.total || 0);
    const offset = (page - 1) * limit;

    const dataValues = [...values, limit, offset];

    const result = await db.query(
      `
      ${auditCte}
      SELECT
        event_id AS id,
        user_id,
        username,
        action,
        category,
        description,
        ip_address,
        user_agent,
        success,
        CASE
          WHEN success THEN 'success'
          ELSE 'failed'
        END AS status,
        created_at
      FROM audit_events
      ${where}
      ORDER BY created_at DESC
      LIMIT $${dataValues.length - 1}
      OFFSET $${dataValues.length}
      `,
      dataValues
    );

    const summaryResult = await db.query<{
      total: string;
      successful: string;
      failed: string;
      authentication: string;
    }>(
      `
      ${auditCte}
      SELECT
        COUNT(*)::text AS total,
        COUNT(*) FILTER (WHERE success = TRUE)::text AS successful,
        COUNT(*) FILTER (WHERE success = FALSE)::text AS failed,
        COUNT(*) FILTER (
          WHERE category = 'authentication'
        )::text AS authentication
      FROM audit_events
      `
    );

    const summary = summaryResult.rows[0];

    return NextResponse.json({
      events: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
      summary: {
        total: Number(summary?.total || 0),
        successful: Number(summary?.successful || 0),
        failed: Number(summary?.failed || 0),
        authentication: Number(summary?.authentication || 0),
      },
    });
  } catch (error) {
    console.error("GET /api/system/audit:", error);

    return NextResponse.json(
      { error: "Unable to retrieve audit events." },
      { status: 500 }
    );
  }
}
