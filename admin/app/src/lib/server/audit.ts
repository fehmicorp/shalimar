import "server-only";

import { db } from "@/lib/server/db";

interface WriteAuditEvent {
  userId?: string | null;
  username: string;
  action: string;
  category: "content" | "media" | "system";
  description?: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown>;
  success?: boolean;
}

export async function writeAuditEvent(event: WriteAuditEvent) {
  await db.query(
    `
    INSERT INTO security_audit (
      user_id,
      username,
      action,
      category,
      description,
      ip_address,
      user_agent,
      metadata,
      success
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9
    )
    `,
    [
      event.userId ?? null,
      event.username,
      event.action,
      event.category,
      event.description ?? null,
      event.ipAddress ?? null,
      event.userAgent ?? null,
      JSON.stringify(event.metadata ?? {}),
      event.success ?? true,
    ]
  );
}