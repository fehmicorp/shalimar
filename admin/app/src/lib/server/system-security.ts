import "server-only";

import { db } from "@/lib/server/db";

export type SystemRole =
  | "root"
  | "superadmin"
  | "admin"
  | "manager"
  | "editor"
  | "publisher"
  | "media_manager"
  | "hr"
  | "staff";

export type Permission =
  | "users:read"
  | "users:create"
  | "users:update"
  | "users:block"
  | "users:delete"
  | "users:invite"
  | "roles:read"
  | "roles:manage"
  | "audit:read"
  | "sessions:read"
  | "sessions:revoke";

const rolePermissions: Record<SystemRole, string[]> = {
  root: [],
  superadmin: ["*"],
  admin: [
    "users:read",
    "users:create",
    "users:update",
    "users:block",
    "users:delete",
    "users:invite",
    "roles:read",
    "audit:read",
    "sessions:read",
    "sessions:revoke",
  ],
  manager: ["users:read"],
  editor: [],
  publisher: [],
  media_manager: [],
  hr: [],
  staff: [],
};

export function can(role: string, permission: Permission): boolean {
  if (role === "root") return false;

  const permissions = rolePermissions[role as SystemRole] ?? [];
  return permissions.includes("*") || permissions.includes(permission);
}

export function assertPermission(
  role: string,
  permission: Permission,
): void {
  if (!can(role, permission)) {
    throw new Error("You do not have permission to perform this operation.");
  }
}

export async function writeSystemAudit(input: {
  userId?: string | null;
  username?: string | null;
  action: string;
  category: string;
  description?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown>;
  success?: boolean;
}) {
  await db.query(
    `INSERT INTO security_audit
      (user_id, username, action, category, description,
       ip_address, user_agent, metadata, success)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)`,
    [
      input.userId ?? null,
      input.username ?? null,
      input.action,
      input.category,
      input.description ?? null,
      input.ipAddress ?? null,
      input.userAgent ?? null,
      JSON.stringify(input.metadata ?? {}),
      input.success ?? true,
    ],
  );
}