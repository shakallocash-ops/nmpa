"use server";

import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { auditRoles, leadershipRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";
import { idSchema } from "@/lib/validations";
import { parseOrThrow } from "./helpers";

export async function getAuditLogs() {
  await requireSession(auditRoles);
  const logs = await prisma.auditLog.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true }
      }
    },
    orderBy: { createdAt: "desc" },
    take: 500
  });
  return serialize(logs);
}

export async function getLGAReport(lgaId: string) {
  await requireSession(leadershipRoles);
  const id = parseOrThrow(idSchema, lgaId);
  return serialize(
    await prisma.lGA.findUniqueOrThrow({
      where: { id },
      include: {
        households: { include: { livestock: true } },
        schools: true,
        conflictCases: true,
        committeeMembers: true,
        projects: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            department: true,
            phone: true,
            isActive: true
          }
        }
      }
    })
  );
}
