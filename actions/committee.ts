"use server";

import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadershipRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";
import {
  committeeMemberSchema,
  committeeMemberUpdateSchema,
  idSchema
} from "@/lib/validations";
import { audit, parseOrThrow } from "./helpers";

export async function createCommitteeMember(data: unknown) {
  const session = await requireSession(leadershipRoles);
  const parsed = parseOrThrow(committeeMemberSchema, data);
  const created = await prisma.committeeMember.create({
    data: {
      ...parsed,
      phone: parsed.phone || null
    }
  });
  await audit(
    session.user.id,
    "CREATE",
    "CommitteeMember",
    created.id,
    created
  );
  return serialize(created);
}

export async function updateCommitteeMember(id: string, data: unknown) {
  const session = await requireSession(leadershipRoles);
  const memberId = parseOrThrow(idSchema, id);
  const parsed = parseOrThrow(committeeMemberUpdateSchema, data);
  const updated = await prisma.committeeMember.update({
    where: { id: memberId },
    data: {
      ...parsed,
      phone: parsed.phone === "" ? null : parsed.phone
    }
  });
  await audit(session.user.id, "UPDATE", "CommitteeMember", memberId, parsed);
  return serialize(updated);
}

export async function deleteCommitteeMember(id: string) {
  const session = await requireSession(leadershipRoles);
  const memberId = parseOrThrow(idSchema, id);
  const deleted = await prisma.committeeMember.delete({
    where: { id: memberId }
  });
  await audit(session.user.id, "DELETE", "CommitteeMember", memberId, deleted);
  return { success: true };
}
