
import "server-only";

import { Pool } from "pg";
import { serverConfig } from "./config";

const globalForPg = globalThis as typeof globalThis & {
  pgPool?: Pool;
};

export const db =
  globalForPg.pgPool ??
  new Pool({
    host: serverConfig.postgres.host,
    port: serverConfig.postgres.port,
    user: serverConfig.postgres.user,
    password: serverConfig.postgres.password,
    database: serverConfig.postgres.database,

    max: serverConfig.postgres.maxConnections,
    idleTimeoutMillis: serverConfig.postgres.idleTimeoutMillis,
    connectionTimeoutMillis:
      serverConfig.postgres.connectionTimeoutMillis,

    ssl: serverConfig.postgres.ssl,
    application_name: serverConfig.postgres.applicationName,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = db;
}

db.on("error", (error) => {
  console.error("[PostgreSQL] Unexpected idle client error:", error);
});
