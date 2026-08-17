"use server";

import { ConflictStatus } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadershipRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";
import {
  conflictCaseSchema,
  idSchema,
  resolveConflictSchema
} from "@/lib/validations";
import { audit, jsonValue, parseOrThrow } from "./helpers";

export async function createConflictCase(data: unknown) {
  const session = await requireSession(leadershipRoles);
  const parsed = parseOrThrow(conflictCaseSchema, data);
  const created = await prisma.conflictCase.create({
    data: {
      ...parsed,
      partiesInvolved: jsonValue(parsed.partiesInvolved)
    }
  });
  await audit(session.user.id, "CREATE", "ConflictCase", created.id, created);
  return serialize(created);
}

export async function resolveConflictCase(id: string, resolution: unknown) {
  const session = await requireSession(leadershipRoles);
  const conflictId = parseOrThrow(idSchema, id);
  const parsed = parseOrThrow(resolveConflictSchema, resolution);
  const updated = await prisma.conflictCase.update({
    where: { id: conflictId },
    data: {
      ...parsed,
      resolvedById: session.user.id,
      resolvedAt:
        parsed.status === ConflictStatus.RESOLVED ? new Date() : undefined
    }
  });
  await audit(session.user.id, "RESOLVE", "ConflictCase", conflictId, parsed);
  return serialize(updated);
}
