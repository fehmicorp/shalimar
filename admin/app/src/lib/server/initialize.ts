
import "server-only";

import { db } from "./db";
import { redis } from "./redis";
import { serverConfig } from "./config";
import { hashPassword } from "./password";
import path from "node:path";
import * as fs from "node:fs";
import type { PoolClient } from "pg";

const INITIALIZATION_LOCK = 741852963;

let initializationPromise: Promise<void> | null = null;
let initialized = false;

const REQUIRED_COLUMNS: Record<string, string[]> = {
  users: [
    "id",
    "username",
    "email",
    "password_hash",
    "role",
    "is_active",
    "is_locked",
    "failed_login_attempts",
    "last_login_at",
    "password_changed_at",
    "created_at",
    "updated_at",
    "session_version",
    "deleted_at",
  ],

  login_audit: [
    "id",
    "user_id",
    "username",
    "ip_address",
    "user_agent",
    "success",
    "created_at",
  ],

  password_reset_tokens: [
    "id",
    "user_id",
    "token",
    "expires_at",
    "created_at",
  ],

  system_roles: [
    "id",
    "name",
    "label",
    "description",
    "permissions",
    "is_system",
    "created_at",
    "updated_at",
  ],

  user_invitations: [
    "id",
    "email",
    "username",
    "role",
    "token_hash",
    "invited_by",
    "expires_at",
    "accepted_at",
    "revoked_at",
    "created_at",
  ],

  security_audit: [
    "id",
    "user_id",
    "username",
    "action",
    "category",
    "description",
    "ip_address",
    "user_agent",
    "metadata",
    "success",
    "created_at",
  ],
};

export async function CheckDatabase(): Promise<void> {
  await db.query("SELECT 1");
}

export async function CreateTables(client: PoolClient): Promise<void> {
  const sqlFilePath = path.join(
    process.cwd(),
    "src",
    "config",
    "table.sql"
  );

  if (!fs.existsSync(sqlFilePath)) {
    throw new Error(
      `[Database] SQL schema file not found: ${sqlFilePath}`
    );
  }

  const sqlQueries = fs.readFileSync(sqlFilePath, "utf8");

  if (!sqlQueries.trim()) {
    throw new Error("[Database] SQL schema file is empty.");
  }

  await client.query(sqlQueries);

  console.info("[Database] SQL schema executed.");
}

export async function VerifyDatabaseStructure(
  client: PoolClient
): Promise<void> {
  for (const [table, requiredColumns] of Object.entries(
    REQUIRED_COLUMNS
  )) {
    const result = await client.query(
      `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = $1
      `,
      [table]
    );

    const existingColumns = new Set(
      result.rows.map(
        (row: { column_name: string }) => row.column_name
      )
    );

    const missingColumns = requiredColumns.filter(
      (column) => !existingColumns.has(column)
    );

    if (missingColumns.length > 0) {
      throw new Error(
        `[Database] Table "${table}" is missing columns: ${missingColumns.join(", ")}`
      );
    }
  }

  console.info("[Database] All required tables and columns verified.");
}

export async function RootUserInjection(
  client: PoolClient
): Promise<void> {
  const username = serverConfig.root.username;
  const configuredPassword = serverConfig.root.password;

  if (!username || username.length < 3 || username.length > 50) {
    throw new Error("[Root Admin] Invalid root username configuration.");
  }

  const existing = await client.query(
    `
      SELECT id, role
      FROM users
      WHERE LOWER(username) = LOWER($1)
        AND deleted_at IS NULL
      LIMIT 1
    `,
    [username]
  );

  if (existing.rows.length > 0) {
    if (existing.rows[0].role !== "root") {
      throw new Error(
        `[Root Admin] Username "${username}" already exists but is not a root account.`
      );
    }

    return;
  }

  if (!configuredPassword || configuredPassword.length < 12) {
    throw new Error(
      "[Root Admin] A root account does not exist. Set ADMIN_APP_ROOT_PASSWORD to a strong password of at least 12 characters."
    );
  }

  if (configuredPassword.length > 128) {
    throw new Error("[Root Admin] Root password exceeds 128 characters.");
  }

  const passwordHash = await hashPassword(configuredPassword);

  await client.query(
    `
      INSERT INTO users (
        username,
        email,
        password_hash,
        role,
        is_active,
        is_locked
      )
      VALUES ($1, NULL, $2, 'root', TRUE, FALSE)
      ON CONFLICT DO NOTHING
    `,
    [username, passwordHash]
  );

  const verification = await client.query(
    `
      SELECT role
      FROM users
      WHERE LOWER(username) = LOWER($1)
        AND deleted_at IS NULL
      LIMIT 1
    `,
    [username]
  );

  if (verification.rows[0]?.role !== "root") {
    throw new Error(
      "[Root Admin] Root account creation could not be verified."
    );
  }

  console.info("[Root Admin] Root account is ready.");
}

export async function InitializeDatabase(): Promise<void> {
  const client = await db.connect();

  let transactionStarted = false;
  let lockAcquired = false;

  try {
    await client.query(
      "SELECT pg_advisory_lock($1)",
      [INITIALIZATION_LOCK]
    );

    lockAcquired = true;

    await client.query("BEGIN");
    transactionStarted = true;

    // Explicitly select the PostgreSQL schema for this transaction.
    await client.query("SET LOCAL search_path TO public");

    await CreateTables(client);
    await VerifyDatabaseStructure(client);
    await RootUserInjection(client);

    await client.query("COMMIT");
    transactionStarted = false;

    console.info("[Database] Initialization completed successfully.");
  } catch (error) {
    if (transactionStarted) {
      await client.query("ROLLBACK").catch(() => undefined);
    }

    throw error;
  } finally {
    if (lockAcquired) {
      await client
        .query("SELECT pg_advisory_unlock($1)", [
          INITIALIZATION_LOCK,
        ])
        .catch((error) => {
          console.error("[Database] Advisory unlock failed:", error);
        });
    }

    client.release();
  }
}

export async function InitializeRedis(): Promise<void> {
  if (redis.status === "wait") {
    await redis.connect();
  } else if (redis.status === "end") {
    throw new Error(
      "[Redis] Connection has been closed. Restart the application process."
    );
  } else if (redis.status === "connecting") {
    await new Promise<void>((resolve, reject) => {
      redis.once("ready", resolve);
      redis.once("error", reject);
    });
  }

  if (redis.status !== "ready") {
    throw new Error(
      `[Redis] Expected ready state, received "${redis.status}".`
    );
  }

  const response = await redis.ping();

  if (response !== "PONG") {
    throw new Error("[Redis] Health check failed.");
  }

  console.info("[Redis] Connection established.");
}

async function RunInitialization(): Promise<void> {
  console.info("[Startup] Checking PostgreSQL...");

  await CheckDatabase();
  await InitializeDatabase();

  console.info("[Startup] Checking Redis...");

  await InitializeRedis();

  initialized = true;

  console.info("[Startup] Server initialization completed.");
}

export async function InitializeServer(): Promise<void> {
  if (initialized) return;

  if (!initializationPromise) {
    initializationPromise = RunInitialization().catch((error) => {
      initializationPromise = null;
      initialized = false;
      throw error;
    });
  }

  return initializationPromise;
}

export function IsServerInitialized(): boolean {
  return initialized;
}

export async function CloseServer(): Promise<void> {
  initialized = false;
  initializationPromise = null;

  const results = await Promise.allSettled([
    db.end(),
    redis.quit(),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error(
        "[Shutdown] Resource close error:",
        result.reason
      );
    }
  }

  console.info("[Shutdown] Server resources closed.");
}
