
import "server-only";

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`[Config] Missing required environment variable: ${name}`);
  }

  return value;
}

function numberEnv(
  name: string,
  fallback: number,
  min: number,
  max: number
): number {
  const raw = process.env[name];

  if (!raw) return fallback;

  const value = Number(raw);

  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`[Config] Invalid numeric value for ${name}`);
  }

  return value;
}

function durationToMs(
  value: string | undefined,
  fallback: number
): number {
  if (!value) return fallback;

  const match = value.trim().match(/^(\d+)(ms|s|m|h)?$/i);

  if (!match) {
    throw new Error(`[Config] Invalid duration: ${value}`);
  }

  const amount = Number(match[1]);
  const unit = (match[2] || "ms").toLowerCase();

  const multiplier =
    unit === "h" ? 3_600_000 :
    unit === "m" ? 60_000 :
    unit === "s" ? 1_000 : 1;

  return amount * multiplier;
}

const sslMode = process.env.PG_SSL_MODE || "disable";

if (!["disable", "require"].includes(sslMode)) {
  throw new Error(
    "[Config] PG_SSL_MODE must be either 'disable' or 'require'"
  );
}

export const serverConfig = {
  root: {
    username: (
      process.env.ADMIN_APP_ROOT_USERNAME || "rootadmin"
    ).trim().toLowerCase(),
    password: process.env.ADMIN_APP_ROOT_PASSWORD || "",
  },
  session: {
    cookieName: process.env.ADMIN_APP_COOKIE_NAME || "admin_session",
    ttlSeconds: numberEnv(
      "ADMIN_APP_SESSION_TTL",
      8 * 60 * 60,
      300,
      7 * 24 * 60 * 60
    ),
  },
  postgres: {
    host: requiredEnv("PG_HOST"),
    port: numberEnv("PG_PORT", 5432, 1, 65535),
    user: requiredEnv("PG_USER"),
    password: requiredEnv("PG_PASSWORD"),
    database: requiredEnv("PG_DATABASE"),
    maxConnections: numberEnv("PG_MAX_CONNECTIONS", 10, 1, 100),
    idleTimeoutMillis: durationToMs(
      process.env.PG_IDLE_TIMEOUT,
      30_000
    ),
    connectionTimeoutMillis: durationToMs(
      process.env.PG_CONNECTION_TIMEOUT,
      30_000
    ),
    ssl:
      sslMode === "require"
        ? { rejectUnauthorized: true }
        : false,

    applicationName: "shalimar-admin",
  },
  redis: {
    host: requiredEnv("REDIS_HOST"),
    port: numberEnv("REDIS_PORT", 6379, 1, 65535),
    password: requiredEnv("REDIS_PASSWORD"),
    db: numberEnv("REDIS_DB", 0, 0, 15),
    connectTimeout: numberEnv(
      "REDIS_CONNECT_TIMEOUT",
      10_000,
      1_000,
      60_000
    ),
    maxRetriesPerRequest: numberEnv(
      "REDIS_MAX_RETRIES_PER_REQUEST",
      2,
      1,
      10
    ),
  },
};
