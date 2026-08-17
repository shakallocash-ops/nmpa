import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";

export function jsonValue(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

export function parseOrThrow<T>(schema: { parse: (data: unknown) => T }, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const issue = error.issues[0];
      const path = issue?.path?.length ? `${issue.path.join(".")}: ` : "";
      throw new Error(`${path}${issue?.message ?? "Validation failed"}`);
    }
    throw error instanceof Error ? error : new Error("Validation failed");
  }
}

export function wrapActionError(error: unknown): never {
  if (error instanceof ZodError) {
    const issue = error.issues[0];
    throw new Error(issue?.message ?? "Validation failed");
  }
  if (error instanceof Error) {
    throw error;
  }
  throw new Error("An unexpected server error occurred");
}

export async function audit(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  changes?: unknown
) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      changes: changes === undefined ? undefined : jsonValue(changes)
    }
  });
}
