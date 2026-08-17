import type { UserRole } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME =
  process.env.AUTH_COOKIE_NAME ?? "nmpa_session";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthSession {
  user: SessionUser;
  expiresAt: string;
}

function getSecret() {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error(
      `AUTH_SECRET must contain at least 32 characters (Vercel currently has ${secret?.length ?? 0}). Add AUTH_SECRET in Project Settings → Environment Variables for Production, then Redeploy.`
    );
  }
  return new TextEncoder().encode(secret);
}

function sessionDurationHours() {
  const hours = Number(process.env.AUTH_SESSION_HOURS ?? 8);
  return Number.isFinite(hours) && hours > 0 ? hours : 8;
}

export async function createSessionToken(user: SessionUser) {
  const expiresAt = new Date(
    Date.now() + sessionDurationHours() * 60 * 60 * 1000
  );

  const token = await new SignJWT({
    name: user.name,
    email: user.email,
    role: user.role
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .setIssuer("nmpa-official-website")
    .setAudience("nmpa-admin")
    .sign(getSecret());

  return { token, expiresAt };
}

export async function verifySessionToken(
  token: string
): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: "nmpa-official-website",
      audience: "nmpa-admin"
    });

    if (
      !payload.sub ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string" ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }

    return {
      user: {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role as UserRole
      },
      expiresAt: new Date(payload.exp * 1000).toISOString()
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AuthSession | null> {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  return token ? verifySessionToken(token) : null;
}

export async function requireSession(roles?: readonly UserRole[]) {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  if (roles && !roles.includes(session.user.role)) {
    throw new Error("FORBIDDEN");
  }
  return session;
}

export function setSessionCookie(token: string, expiresAt: Date) {
  cookies().set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt
  });
}

export function clearSessionCookie() {
  cookies().set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0)
  });
}
