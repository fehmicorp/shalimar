
import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

import { redis } from "@/lib/server/redis";
import { serverConfig } from "@/lib/server/config";

export interface AdminSession {
  userId: string;
  username: string;
  role: string;
  createdAt: number;
}

const COOKIE_NAME = serverConfig.session.cookieName;
const SESSION_TTL = serverConfig.session.ttlSeconds;

function sessionKey(token: string): string {
  const hash = createHash("sha256")
    .update(token)
    .digest("hex");

  return `admin:session:${hash}`;
}

export async function createAdminSession(
  session: AdminSession
): Promise<void> {
  const token = randomBytes(32).toString("hex");

  await redis.set(
    sessionKey(token),
    JSON.stringify(session),
    "EX",
    SESSION_TTL
  );

  const cookieStore = await cookies();

  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token || !/^[a-f0-9]{64}$/i.test(token)) {
    return null;
  }

  const stored = await redis.get(sessionKey(token));

  if (!stored) return null;

  try {
    const session = JSON.parse(stored) as AdminSession;

    if (
      !session.userId ||
      !session.username ||
      !session.role ||
      typeof session.createdAt !== "number"
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token && /^[a-f0-9]{64}$/i.test(token)) {
    await redis.del(sessionKey(token));
  }

  cookieStore.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}

const USER_SESSION_INDEX = (userId: string) =>
  `admin:user-sessions:${userId}`;

async function registerUserSession(userId: string, sessionKey: string) {
  await redis.sadd(USER_SESSION_INDEX(userId), sessionKey);
  await redis.expire(USER_SESSION_INDEX(userId), 60 * 60 * 9);
}

export async function revokeUserSessions(userId: string) {
  const indexKey = USER_SESSION_INDEX(userId);
  const sessionKeys = await redis.smembers(indexKey);

  if (sessionKeys.length) {
    await redis.del(...sessionKeys);
  }

  await redis.del(indexKey);
}