"use server";

import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadershipRoles, projectWriteRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";
import {
  idSchema,
  nomadicSchoolSchema,
  nomadicSchoolUpdateSchema
} from "@/lib/validations";
import { audit, parseOrThrow } from "./helpers";

export async function createSchool(data: unknown) {
  const session = await requireSession(projectWriteRoles);
  const parsed = parseOrThrow(nomadicSchoolSchema, data);
  const created = await prisma.nomadicSchool.create({ data: parsed });
  await audit(session.user.id, "CREATE", "NomadicSchool", created.id, created);
  return serialize(created);
}

export async function updateSchool(id: string, data: unknown) {
  const session = await requireSession(projectWriteRoles);
  const schoolId = parseOrThrow(idSchema, id);
  const parsed = parseOrThrow(nomadicSchoolUpdateSchema, data);
  const updated = await prisma.nomadicSchool.update({
    where: { id: schoolId },
    data: parsed
  });
  await audit(session.user.id, "UPDATE", "NomadicSchool", schoolId, parsed);
  return serialize(updated);
}

export async function deleteSchool(id: string) {
  const session = await requireSession(leadershipRoles);
  const schoolId = parseOrThrow(idSchema, id);
  const deleted = await prisma.nomadicSchool.delete({
    where: { id: schoolId }
  });
  await audit(session.user.id, "DELETE", "NomadicSchool", schoolId, deleted);
  return { success: true };
}
