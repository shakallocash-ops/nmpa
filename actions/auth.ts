"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  createSessionToken,
  getSession as readSession,
  setSessionCookie
} from "@/lib/auth";
import { isTransientDbError, prisma, withDbRetry } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";

export async function login(email: string, password: string) {
  try {
    const credentials = loginSchema.parse({ email, password });
    const user = await withDbRetry(
      () =>
        prisma.user.findUnique({
          where: { email: credentials.email }
        }),
      1
    );

    if (
      !user ||
      !user.isActive ||
      !(await compare(credentials.password, user.passwordHash))
    ) {
      return { success: false as const, error: "Invalid credentials" };
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    const { token, expiresAt } = await createSessionToken(sessionUser);
    setSessionCookie(token, expiresAt);

    try {
      await withDbRetry(
        () =>
          prisma.$transaction([
            prisma.user.update({
              where: { id: user.id },
              data: { lastLogin: new Date() }
            }),
            prisma.auditLog.create({
              data: {
                userId: user.id,
                action: "LOGIN",
                entityType: "User",
                entityId: user.id
              }
            })
          ]),
        1
      );
    } catch {
      // Session is already issued; audit must not block sign-in.
    }

    return {
      success: true as const,
      user: sessionUser,
      expiresAt: expiresAt.toISOString()
    };
  } catch (error) {
    console.error("Login failed:", error);
    if (isTransientDbError(error)) {
      return {
        success: false as const,
        error:
          "Cannot reach the Neon database. Open console.neon.tech, resume the project, wait until it is Active, then try again."
      };
    }
    return {
      success: false as const,
      error: "Unable to sign in right now. Please try again."
    };
  }
}

export async function logout() {
  const session = await readSession();
  clearSessionCookie();

  if (session) {
    try {
      await prisma.auditLog.create({
        data: {
          userId: session.user.id,
          action: "LOGOUT",
          entityType: "User",
          entityId: session.user.id
        }
      });
    } catch (error) {
      console.error("Failed to write logout audit log:", error);
    }
  }

  return { success: true };
}

export async function logoutAndRedirect() {
  await logout();
  redirect("/admin");
}

export async function getSession() {
  return readSession();
}
