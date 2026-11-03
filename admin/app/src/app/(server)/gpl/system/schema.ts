import "server-only";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLError } from "graphql";
import { randomBytes, createHash } from "node:crypto";
import { db } from "@/lib/server/db";
import { redis } from "@/lib/server/redis";
import { getAdminSession } from "@/lib/server/auth";
import { hashPassword } from "@/lib/server/password";
import {
  assertPermission,
  writeSystemAudit,
  type Permission,
} from "@/lib/server/system-security";
import { revokeUserSessions } from "@/lib/server/auth";

const typeDefs = /* GraphQL */ `
  scalar DateTime
  scalar JSON

  type SystemUser {
    id: ID!
    username: String!
    email: String
    role: String!
    isActive: Boolean!
    isLocked: Boolean!
    lastLoginAt: DateTime
    passwordChangedAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UserStats {
    total: Int!
    active: Int!
    inactive: Int!
    locked: Int!
  }

  type UserPage {
    items: [SystemUser!]!
    total: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
  }

  type SystemRole {
    id: ID!
    name: String!
    label: String!
    description: String
    permissions: JSON!
    isSystem: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Invitation {
    id: ID!
    email: String!
    username: String!
    role: String!
    invitedBy: String
    expiresAt: DateTime!
    acceptedAt: DateTime
    revokedAt: DateTime
    createdAt: DateTime!
  }

  type AuditEvent {
    id: ID!
    userId: ID
    username: String
    action: String!
    category: String!
    description: String
    ipAddress: String
    userAgent: String
    metadata: JSON!
    success: Boolean!
    createdAt: DateTime!
  }

  type AuditPage {
    items: [AuditEvent!]!
    total: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
  }

  type SessionStats {
    activeUsers: Int!
  }

  type Query {
    me: SystemUser!
    users(
      search: String
      role: String
      status: String
      page: Int = 1
      pageSize: Int = 20
    ): UserPage!
    user(id: ID!): SystemUser
    userStats: UserStats!
    roles: [SystemRole!]!
    invitations(
      search: String
      status: String
      page: Int = 1
      pageSize: Int = 20
    ): [Invitation!]!
    auditLogs(
      search: String
      category: String
      success: Boolean
      from: DateTime
      to: DateTime
      page: Int = 1
      pageSize: Int = 25
    ): AuditPage!
    sessionStats: SessionStats!
  }

  input CreateUserInput {
    username: String!
    email: String
    password: String!
    role: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    role: String
    isActive: Boolean
  }

  input InviteUserInput {
    username: String!
    email: String!
    role: String!
  }

  input CreateRoleInput {
    name: String!
    label: String!
    description: String
    permissions: [String!]!
  }

  input UpdateRoleInput {
    label: String
    description: String
    permissions: [String!]
  }

  type Mutation {
    createUser(input: CreateUserInput!): SystemUser!
    updateUser(id: ID!, input: UpdateUserInput!): SystemUser!
    deleteUser(id: ID!): Boolean!
    blockUser(id: ID!, reason: String): SystemUser!
    unblockUser(id: ID!): SystemUser!
    resetUserPassword(id: ID!, password: String!): Boolean!
    unlockUser(id: ID!): SystemUser!

    inviteUser(input: InviteUserInput!): Invitation!
    resendInvitation(id: ID!): Boolean!
    revokeInvitation(id: ID!): Boolean!

    createRole(input: CreateRoleInput!): SystemRole!
    updateRole(id: ID!, input: UpdateRoleInput!): SystemRole!
    deleteRole(id: ID!): Boolean!
    assignRole(userId: ID!, role: String!): SystemUser!

    revokeAllUserSessions(userId: ID!): Boolean!
  }
`;

type Session = {
  userId: string;
  username: string;
  role: string;
};

type Context = {
  request: Request;
  session: Session;
  ipAddress: string | null;
  userAgent: string | null;
};

function requirePermission(ctx: Context, permission: Permission) {
  assertPermission(ctx.session.role, permission);
}

function toUser(row: {
  id: string;
  username: string;
  email: string | null;
  role: string;
  is_active: boolean;
  is_locked: boolean;
  last_login_at: Date | null;
  password_changed_at: Date | null;
  created_at: Date;
  updated_at: Date;
} | null | undefined) {
  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    role: row.role,
    isActive: row.is_active,
    isLocked: row.is_locked,
    lastLoginAt: row.last_login_at,
    passwordChangedAt: row.password_changed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toRole(row: any) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    label: row.label,
    description: row.description,
    permissions: row.permissions,
    isSystem: row.is_system,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toInvitation(row: any) {
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    username: row.username,
    role: row.role,
    invitedBy: row.invited_by,
    expiresAt: row.expires_at,
    acceptedAt: row.accepted_at,
    revokedAt: row.revoked_at,
    createdAt: row.created_at,
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toAudit(row: any) {
  return {
    id: String(row.id),
    userId: row.user_id,
    username: row.username,
    action: row.action,
    category: row.category,
    description: row.description,
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
    metadata: row.metadata ?? {},
    success: row.success,
    createdAt: row.created_at,
  };
}

function validatePage(page = 1, pageSize = 20) {
  const safePage = Math.max(1, Math.floor(page));
  const safeSize = Math.min(100, Math.max(1, Math.floor(pageSize)));
  return {
    page: safePage,
    pageSize: safeSize,
    offset: (safePage - 1) * safeSize,
  };
}

function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

function normalizeEmail(value?: string | null) {
  const email = value?.trim().toLowerCase();
  return email || null;
}

function assertNotSelf(ctx: Context, targetId: string) {
  if (ctx.session.userId === targetId) {
    throw new GraphQLError("You cannot perform this operation on your own account.");
  }
}

async function assertManageableUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any,
  targetId: string,
  allowSuperAdmin = false,
) {
  const result = await client.query(
    `SELECT id, username, email, role, is_active, is_locked, deleted_at
     FROM users
     WHERE id = $1
     FOR UPDATE`,
    [targetId],
  );

  const user = result.rows[0];

  if (!user || user.deleted_at) {
    throw new GraphQLError("User not found.");
  }

  if (user.role === "root") {
    throw new GraphQLError("The Root recovery account cannot be managed here.");
  }

  if (!allowSuperAdmin && user.role === "superadmin") {
    throw new GraphQLError("Only a Super Admin can manage this account.");
  }

  return user;
}

async function audit(ctx: Context, action: string, category: string, description: string, metadata: Record<string, unknown> = {}) {
  await writeSystemAudit({
    userId: ctx.session.userId,
    username: ctx.session.username,
    action,
    category,
    description,
    ipAddress: ctx.ipAddress,
    userAgent: ctx.userAgent,
    metadata,
  });
}

const resolvers = {
  Query: {
    me: async (_: unknown, __: unknown, ctx: Context) => {
      const result = await db.query(
        `SELECT * FROM users
         WHERE id = $1 AND deleted_at IS NULL`,
        [ctx.session.userId],
      );
      return toUser(result.rows[0]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    users: async (_: unknown, args: any, ctx: Context) => {
      requirePermission(ctx, "users:read");

      const { page, pageSize, offset } = validatePage(args.page, args.pageSize);
      const values: unknown[] = [];
      const filters: string[] = [
        "deleted_at IS NULL",
        "role <> 'root'",
      ];

      if (args.search?.trim()) {
        values.push(`%${args.search.trim()}%`);
        filters.push(
          `(username ILIKE $${values.length} OR email ILIKE $${values.length})`,
        );
      }

      if (args.role && args.role !== "all") {
        values.push(args.role);
        filters.push(`role = $${values.length}`);
      }

      if (args.status === "active") filters.push("is_active = TRUE AND is_locked = FALSE");
      if (args.status === "inactive") filters.push("is_active = FALSE");
      if (args.status === "locked") filters.push("is_locked = TRUE");

      const where = filters.join(" AND ");

      const count = await db.query(
        `SELECT COUNT(*)::int AS total FROM users WHERE ${where}`,
        values,
      );

      const rows = await db.query(
        `SELECT id, username, email, role, is_active, is_locked,
                last_login_at, password_changed_at, created_at, updated_at
         FROM users
         WHERE ${where}
         ORDER BY created_at DESC
         LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
        [...values, pageSize, offset],
      );

      const total = count.rows[0].total;

      return {
        items: rows.rows.map(toUser),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: async (_: unknown, { id }: any, ctx: Context) => {
      requirePermission(ctx, "users:read");
      const result = await db.query(
        `SELECT * FROM users
         WHERE id = $1 AND deleted_at IS NULL AND role <> 'root'`,
        [id],
      );
      return toUser(result.rows[0]);
    },

    userStats: async (_: unknown, __: unknown, ctx: Context) => {
      requirePermission(ctx, "users:read");
      const result = await db.query(
        `SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE is_active = TRUE AND is_locked = FALSE)::int AS active,
          COUNT(*) FILTER (WHERE is_active = FALSE)::int AS inactive,
          COUNT(*) FILTER (WHERE is_locked = TRUE)::int AS locked
         FROM users
         WHERE deleted_at IS NULL AND role <> 'root'`,
      );
      return result.rows[0];
    },

    roles: async (_: unknown, __: unknown, ctx: Context) => {
      requirePermission(ctx, "roles:read");
      const result = await db.query(
        `SELECT * FROM system_roles ORDER BY is_system DESC, label ASC`,
      );
      return result.rows.map(toRole);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invitations: async (_: unknown, args: any, ctx: Context) => {
      requirePermission(ctx, "users:read");
      const { pageSize, offset } = validatePage(args.page, args.pageSize);
      const values: unknown[] = [];
      const filters: string[] = ["TRUE"];

      if (args.search?.trim()) {
        values.push(`%${args.search.trim()}%`);
        filters.push(`(email ILIKE $${values.length} OR username ILIKE $${values.length})`);
      }

      if (args.status === "pending") {
        filters.push("accepted_at IS NULL AND revoked_at IS NULL AND expires_at > NOW()");
      } else if (args.status === "accepted") {
        filters.push("accepted_at IS NOT NULL");
      } else if (args.status === "revoked") {
        filters.push("revoked_at IS NOT NULL");
      } else if (args.status === "expired") {
        filters.push("accepted_at IS NULL AND revoked_at IS NULL AND expires_at <= NOW()");
      }

      const result = await db.query(
        `SELECT * FROM user_invitations
         WHERE ${filters.join(" AND ")}
         ORDER BY created_at DESC
         LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
        [...values, pageSize, offset],
      );

      return result.rows.map(toInvitation);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    auditLogs: async (_: unknown, args: any, ctx: Context) => {
      requirePermission(ctx, "audit:read");

      const { page, pageSize, offset } = validatePage(args.page, args.pageSize);
      const values: unknown[] = [];
      const filters: string[] = [];

      if (args.category) {
        values.push(args.category);
        filters.push(`category = $${values.length}`);
      }

      if (typeof args.success === "boolean") {
        values.push(args.success);
        filters.push(`success = $${values.length}`);
      }

      if (args.from) {
        values.push(args.from);
        filters.push(`created_at >= $${values.length}`);
      }

      if (args.to) {
        values.push(args.to);
        filters.push(`created_at <= $${values.length}`);
      }

      if (args.search?.trim()) {
        values.push(`%${args.search.trim()}%`);
        filters.push(
          `(username ILIKE $${values.length} OR action ILIKE $${values.length} OR description ILIKE $${values.length} OR ip_address::text ILIKE $${values.length})`,
        );
      }

      const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

      const count = await db.query(
        `SELECT COUNT(*)::int AS total FROM (
          SELECT id, username, action, category, description,
                 ip_address, user_agent, metadata, success, created_at, user_id
          FROM security_audit
          UNION ALL
          SELECT id, username,
                 CASE WHEN success THEN 'login.success' ELSE 'login.failed' END AS action,
                 'authentication' AS category,
                 CASE WHEN success THEN 'Successful login' ELSE 'Failed login' END AS description,
                 ip_address, user_agent, '{}'::jsonb AS metadata,
                 success, created_at, user_id
          FROM login_audit
        ) a ${where}`,
        values,
      );

      const rows = await db.query(
        `SELECT * FROM (
          SELECT id, user_id, username, action, category, description,
                 ip_address, user_agent, metadata, success, created_at
          FROM security_audit
          UNION ALL
          SELECT id, user_id, username,
                 CASE WHEN success THEN 'login.success' ELSE 'login.failed' END AS action,
                 'authentication' AS category,
                 CASE WHEN success THEN 'Successful login' ELSE 'Failed login' END AS description,
                 ip_address, user_agent, '{}'::jsonb AS metadata,
                 success, created_at
          FROM login_audit
        ) a
        ${where}
        ORDER BY created_at DESC
        LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
        [...values, pageSize, offset],
      );

      const total = count.rows[0].total;

      return {
        items: rows.rows.map(toAudit),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    },

    sessionStats: async (_: unknown, __: unknown, ctx: Context) => {
      requirePermission(ctx, "sessions:read");
      const result = await db.query(
        `SELECT COUNT(*)::int AS active_users
         FROM users
         WHERE is_active = TRUE AND is_locked = FALSE
           AND deleted_at IS NULL AND role <> 'root'`,
      );
      return { activeUsers: result.rows[0].active_users };
    },
  },

  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createUser: async (_: unknown, { input }: any, ctx: Context) => {
      requirePermission(ctx, "users:create");

      const username = normalizeUsername(input.username);
      const email = normalizeEmail(input.email);
      const role = String(input.role).toLowerCase();

      if (!/^[a-z0-9._-]{3,50}$/.test(username)) {
        throw new GraphQLError("Username must be 3–50 characters and use letters, numbers, dots, underscores or hyphens.");
      }

      if (input.password.length < 12) {
        throw new GraphQLError("Password must contain at least 12 characters.");
      }

      if (role === "root") {
        throw new GraphQLError("The Root role cannot be assigned.");
      }

      const roleExists = await db.query(
        `SELECT 1 FROM system_roles WHERE name = $1`,
        [role],
      );
      if (!roleExists.rowCount) throw new GraphQLError("Invalid role.");

      const passwordHash = await hashPassword(input.password);

      const result = await db.query(
        `INSERT INTO users (username, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [username, email, passwordHash, role],
      );

      await audit(ctx, "user.created", "users", `Created user ${username}`, {
        targetUserId: result.rows[0].id,
        role,
      });

      return toUser(result.rows[0]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUser: async (_: unknown, { id, input }: any, ctx: Context) => {
      requirePermission(ctx, "users:update");
      assertNotSelf(ctx, id);

      const client = await db.connect();

      try {
        await client.query("BEGIN");
        const current = await assertManageableUser(client, id);

        const username = input.username !== undefined
          ? normalizeUsername(input.username)
          : current.username;
        const email = input.email !== undefined
          ? normalizeEmail(input.email)
          : current.email;
        const role = input.role !== undefined
          ? String(input.role).toLowerCase()
          : current.role;

        if (role === "root") throw new GraphQLError("The Root role cannot be assigned.");

        if (input.role !== undefined) {
          const roleResult = await client.query(
            `SELECT 1 FROM system_roles WHERE name = $1`,
            [role],
          );
          if (!roleResult.rowCount) throw new GraphQLError("Invalid role.");
        }

        const result = await client.query(
          `UPDATE users
           SET username = $2, email = $3, role = $4,
               is_active = COALESCE($5, is_active),
               session_version = CASE WHEN role <> $4 THEN session_version + 1 ELSE session_version END,
               updated_at = NOW()
           WHERE id = $1
           RETURNING *`,
          [id, username, email, role, input.isActive ?? null],
        );

        if (current.role !== role) {
          await client.query(
            `UPDATE users SET session_version = session_version + 1 WHERE id = $1`,
            [id],
          );
        }

        await client.query("COMMIT");

        if (current.role !== role) await revokeUserSessions(id);

        await audit(ctx, "user.updated", "users", `Updated user ${username}`, {
          targetUserId: id,
          changedFields: Object.keys(input),
        });

        return toUser(result.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteUser: async (_: unknown, { id }: any, ctx: Context) => {
      requirePermission(ctx, "users:delete");
      assertNotSelf(ctx, id);

      const client = await db.connect();

      try {
        await client.query("BEGIN");
        const user = await assertManageableUser(client, id);

        await client.query(
          `UPDATE users
           SET is_active = FALSE, is_locked = TRUE,
               deleted_at = NOW(),
               session_version = session_version + 1,
               updated_at = NOW()
           WHERE id = $1`,
          [id],
        );

        await client.query("COMMIT");
        await revokeUserSessions(id);

        await audit(ctx, "user.deleted", "users", `Soft-deleted user ${user.username}`, {
          targetUserId: id,
        });

        return true;
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blockUser: async (_: unknown, { id, reason }: any, ctx: Context) => {
      requirePermission(ctx, "users:block");
      assertNotSelf(ctx, id);

      const client = await db.connect();

      try {
        await client.query("BEGIN");
        const user = await assertManageableUser(client, id);

        await client.query(
          `UPDATE users
           SET is_active = FALSE, is_locked = TRUE,
               session_version = session_version + 1,
               updated_at = NOW()
           WHERE id = $1`,
          [id],
        );

        await client.query("COMMIT");
        await revokeUserSessions(id);

        await audit(ctx, "user.blocked", "users", `Blocked user ${user.username}`, {
          targetUserId: id,
          reason: reason ?? null,
        });

        const updated = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return toUser(updated.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    unblockUser: async (_: unknown, { id }: any, ctx: Context) => {
      requirePermission(ctx, "users:block");
      assertNotSelf(ctx, id);
      const client = await db.connect();
      try {
        await client.query("BEGIN");
        const user = await assertManageableUser(client, id);

        await client.query(
          `UPDATE users
           SET is_active = TRUE, is_locked = FALSE, updated_at = NOW()
           WHERE id = $1`,
          [id],
        );

        await client.query("COMMIT");

        await audit(ctx, "user.unblocked", "users", `Unblocked user ${user.username}`, {
          targetUserId: id,
        });

        const updated = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return toUser(updated.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resetUserPassword: async (_: unknown, { id, password }: any, ctx: Context) => {
      requirePermission(ctx, "users:update");
      assertNotSelf(ctx, id);

      if (password.length < 12) {
        throw new GraphQLError("Password must contain at least 12 characters.");
      }

      const client = await db.connect();

      try {
        await client.query("BEGIN");
        const user = await assertManageableUser(client, id);
        const passwordHash = await hashPassword(password);

        await client.query(
          `UPDATE users
           SET password_hash = $2,
               password_changed_at = NOW(),
               session_version = session_version + 1,
               failed_login_attempts = 0,
               is_locked = FALSE,
               is_active = TRUE,
               updated_at = NOW()
           WHERE id = $1`,
          [id, passwordHash],
        );

        await client.query("COMMIT");
        await revokeUserSessions(id);

        await audit(ctx, "user.password_reset", "security", `Reset password for ${user.username}`, {
          targetUserId: id,
        });

        return true;
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    unlockUser: async (_: unknown, { id }: any, ctx: Context) => {
      requirePermission(ctx, "users:block");
      assertNotSelf(ctx, id);

      const client = await db.connect();

      try {
        await client.query("BEGIN");
        const user = await assertManageableUser(client, id);

        await client.query(
          `UPDATE users
           SET is_locked = FALSE, failed_login_attempts = 0, updated_at = NOW()
           WHERE id = $1`,
          [id],
        );

        await client.query("COMMIT");

        await audit(ctx, "user.unlocked", "security", `Unlocked user ${user.username}`, {
          targetUserId: id,
        });

        const updated = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return toUser(updated.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inviteUser: async (_: unknown, { input }: any, ctx: Context) => {
      requirePermission(ctx, "users:invite");
      const username = normalizeUsername(input.username);
      const email = normalizeEmail(input.email);
      const role = String(input.role).toLowerCase();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new GraphQLError("A valid email address is required.");
      }

      if (role === "root") throw new GraphQLError("The Root role cannot be invited.");

      const roleResult = await db.query(
        `SELECT 1 FROM system_roles WHERE name = $1`,
        [role],
      );
      if (!roleResult.rowCount) throw new GraphQLError("Invalid role.");

      const existing = await db.query(
        `SELECT 1 FROM users
         WHERE LOWER(email) = LOWER($1) AND deleted_at IS NULL`,
        [email],
      );
      if (existing.rowCount) throw new GraphQLError("A user with this email already exists.");

      const rawToken = randomBytes(32).toString("hex");
      const tokenHash = createHash("sha256").update(rawToken).digest("hex");

      const result = await db.query(
        `INSERT INTO user_invitations
          (email, username, role, token_hash, invited_by, expires_at)
         VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '72 hours')
         RETURNING *`,
        [email, username, role, tokenHash, ctx.session.userId],
      );

      const inviteUrl = `${process.env.APP_URL}/invite/accept?token=${rawToken}`;

      // The mail service must send this URL. Never return the raw token to GraphQL.
      await sendInvitationEmail({ email, username, inviteUrl, role });

      await audit(ctx, "invitation.created", "users", `Invited ${email}`, {
        invitationId: result.rows[0].id,
        role,
      });

      return toInvitation(result.rows[0]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resendInvitation: async (_: unknown, { id }: any, ctx: Context) => {
      requirePermission(ctx, "users:invite");
      const invitation = await db.query(
        `SELECT * FROM user_invitations
         WHERE id = $1 AND accepted_at IS NULL AND revoked_at IS NULL
           AND expires_at > NOW()`,
        [id],
      );

      const current = invitation.rows[0];
      if (!current) throw new GraphQLError("Pending invitation not found.");

      const rawToken = randomBytes(32).toString("hex");
      const tokenHash = createHash("sha256").update(rawToken).digest("hex");

      await db.query(
        `UPDATE user_invitations
         SET token_hash = $2, expires_at = NOW() + INTERVAL '72 hours'
         WHERE id = $1`,
        [id, tokenHash],
      );

      const inviteUrl = `${process.env.APP_URL}/invite/accept?token=${rawToken}`;
      await sendInvitationEmail({
        email: current.email,
        username: current.username,
        inviteUrl,
        role: current.role,
      });

      await audit(ctx, "invitation.resent", "users", `Resent invitation to ${current.email}`, {
        invitationId: id,
      });

      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    revokeInvitation: async (_: unknown, { id }: any, ctx: Context) => {
      requirePermission(ctx, "users:invite");
      const result = await db.query(
        `UPDATE user_invitations
         SET revoked_at = NOW()
         WHERE id = $1 AND accepted_at IS NULL AND revoked_at IS NULL
         RETURNING email`,
        [id],
      );
      if (!result.rowCount) throw new GraphQLError("Pending invitation not found.");
      await audit(ctx, "invitation.revoked", "users", `Revoked invitation for ${result.rows[0].email}`, {
        invitationId: id,
      });

      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createRole: async (_: unknown, { input }: any, ctx: Context) => {
      requirePermission(ctx, "roles:manage");

      const name = String(input.name).trim().toLowerCase();

      if (!/^[a-z][a-z0-9_]{1,29}$/.test(name) || name === "root" || name === "superadmin") {
        throw new GraphQLError("Invalid or reserved role name.");
      }

      const result = await db.query(
        `INSERT INTO system_roles (name, label, description, permissions)
         VALUES ($1, $2, $3, $4::jsonb)
         RETURNING *`,
        [name, input.label.trim(), input.description ?? null, JSON.stringify(input.permissions)],
      );

      await audit(ctx, "role.created", "roles", `Created role ${name}`);
      return toRole(result.rows[0]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateRole: async (_: unknown, { id, input }: any, ctx: Context) => {
      requirePermission(ctx, "roles:manage");

      const current = await db.query(
        `SELECT * FROM system_roles WHERE id = $1`,
        [id],
      );

      if (!current.rowCount) throw new GraphQLError("Role not found.");
      if (current.rows[0].is_system) throw new GraphQLError("System roles cannot be modified.");

      const result = await db.query(
        `UPDATE system_roles
         SET label = COALESCE($2, label),
             description = COALESCE($3, description),
             permissions = COALESCE($4::jsonb, permissions),
             updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
        [
          id,
          input.label ?? null,
          input.description ?? null,
          input.permissions ? JSON.stringify(input.permissions) : null,
        ],
      );

      await audit(ctx, "role.updated", "roles", `Updated role ${result.rows[0].name}`);
      return toRole(result.rows[0]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteRole: async (_: unknown, { id }: any, ctx: Context) => {
      requirePermission(ctx, "roles:manage");

      const roleResult = await db.query(
        `SELECT * FROM system_roles WHERE id = $1`,
        [id],
      );

      const role = roleResult.rows[0];
      if (!role) throw new GraphQLError("Role not found.");
      if (role.is_system) throw new GraphQLError("System roles cannot be deleted.");

      const assigned = await db.query(
        `SELECT COUNT(*)::int AS count FROM users WHERE role = $1 AND deleted_at IS NULL`,
        [role.name],
      );

      if (assigned.rows[0].count > 0) {
        throw new GraphQLError("Reassign users before deleting this role.");
      }

      await db.query(`DELETE FROM system_roles WHERE id = $1`, [id]);
      await audit(ctx, "role.deleted", "roles", `Deleted role ${role.name}`);

      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    assignRole: async (_: unknown, { userId, role }: any, ctx: Context) => {
      requirePermission(ctx, "users:update");
      assertNotSelf(ctx, userId);

      if (role === "root") throw new GraphQLError("The Root role cannot be assigned.");

      const client = await db.connect();

      try {
        await client.query("BEGIN");
        const user = await assertManageableUser(client, userId);

        const roleResult = await client.query(
          `SELECT 1 FROM system_roles WHERE name = $1`,
          [role],
        );
        if (!roleResult.rowCount) throw new GraphQLError("Invalid role.");

        if (user.role === "superadmin") {
          throw new GraphQLError("The Super Admin role cannot be reassigned here.");
        }

        await client.query(
          `UPDATE users
           SET role = $2, session_version = session_version + 1, updated_at = NOW()
           WHERE id = $1`,
          [userId, role],
        );

        await client.query("COMMIT");
        await revokeUserSessions(userId);

        await audit(ctx, "user.role_changed", "users", `Changed role for ${user.username}`, {
          targetUserId: userId,
          previousRole: user.role,
          newRole: role,
        });

        const updated = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        return toUser(updated.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    revokeAllUserSessions: async (_: unknown, { userId }: any, ctx: Context) => {
      requirePermission(ctx, "sessions:revoke");
      assertNotSelf(ctx, userId);

      const result = await db.query(
        `UPDATE users
         SET session_version = session_version + 1, updated_at = NOW()
         WHERE id = $1 AND role <> 'root' AND deleted_at IS NULL`,
        [userId],
      );

      if (!result.rowCount) throw new GraphQLError("User not found.");

      await revokeUserSessions(userId);
      await audit(ctx, "sessions.revoked", "security", "Revoked all user sessions", {
        targetUserId: userId,
      });

      return true;
    },
  },
};

async function sendInvitationEmail(input: {
  email: string;
  username: string;
  inviteUrl: string;
  role: string;
}) {
  // Wire this to your existing Exchange/SMTP mailer.
  // Do not log the invitation URL or token.
  const { sendSystemInvitation } = await import("@/lib/server/mailer");
  await sendSystemInvitation(input);
}

export const systemSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export async function createSystemContext(request: Request): Promise<Context> {
  const session = await getAdminSession();

  if (!session || session.role === "root") {
    throw new GraphQLError("Authentication required.", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null;

  return {
    request,
    session,
    ipAddress,
    userAgent: request.headers.get("user-agent"),
  };
}