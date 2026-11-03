
import "server-only";

import Redis from "ioredis";
import { serverConfig } from "./config";

const globalForRedis = globalThis as typeof globalThis & {
  redisClient?: Redis;
};

export const redis =
  globalForRedis.redisClient ??
  new Redis({
    host: serverConfig.redis.host,
    port: serverConfig.redis.port,
    password: serverConfig.redis.password,
    db: serverConfig.redis.db,
    connectTimeout: serverConfig.redis.connectTimeout,
    maxRetriesPerRequest:
      serverConfig.redis.maxRetriesPerRequest,
    lazyConnect: true,
    enableReadyCheck: true,

    retryStrategy(times) {
      return Math.min(times * 500, 5_000);
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redisClient = redis;
}

redis.on("error", (error) => {
  console.error("[Redis] Connection error:", error.message);
});
