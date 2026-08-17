"use server";

import { ProjectStatus } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadershipRoles, projectWriteRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";
import {
  idSchema,
  projectSchema,
  projectStatusSchema,
  projectUpdateSchema
} from "@/lib/validations";
import { audit, parseOrThrow } from "./helpers";

export async function createProject(data: unknown) {
  const session = await requireSession(projectWriteRoles);
  const parsed = parseOrThrow(projectSchema, data);
  const created = await prisma.project.create({
    data: {
      title: parsed.title,
      description: parsed.description,
      lgaId: parsed.lgaId,
      type: parsed.type,
      budget: parsed.budget ?? null,
      status: parsed.status,
      startDate: parsed.startDate,
      endDate: parsed.endDate,
      impactReport: parsed.impactReport || null
    }
  });
  await audit(session.user.id, "CREATE", "Project", created.id, created);
  return serialize(created);
}

export async function updateProject(id: string, data: unknown) {
  const session = await requireSession(projectWriteRoles);
  const projectId = parseOrThrow(idSchema, id);
  const parsed = parseOrThrow(projectUpdateSchema, data);
  const updated = await prisma.project.update({
    where: { id: projectId },
    data: {
      title: parsed.title,
      description: parsed.description,
      lgaId: parsed.lgaId,
      type: parsed.type,
      budget: parsed.budget,
      status: parsed.status,
      startDate: parsed.startDate,
      endDate:
        parsed.status === ProjectStatus.COMPLETED
          ? parsed.endDate ?? new Date()
          : parsed.endDate,
      impactReport: parsed.impactReport
    }
  });
  await audit(session.user.id, "UPDATE", "Project", projectId, parsed);
  return serialize(updated);
}

export async function updateProjectStatus(id: string, status: unknown) {
  const session = await requireSession(projectWriteRoles);
  const projectId = parseOrThrow(idSchema, id);
  const parsed = parseOrThrow(
    projectStatusSchema,
    typeof status === "string" ? { status } : status
  );
  const updated = await prisma.project.update({
    where: { id: projectId },
    data: {
      status: parsed.status,
      endDate:
        parsed.status === ProjectStatus.COMPLETED ? new Date() : undefined
    }
  });
  await audit(session.user.id, "STATUS_CHANGE", "Project", projectId, parsed);
  return serialize(updated);
}

export async function deleteProject(id: string) {
  const session = await requireSession(leadershipRoles);
  const projectId = parseOrThrow(idSchema, id);
  const deleted = await prisma.project.delete({
    where: { id: projectId }
  });
  await audit(session.user.id, "DELETE", "Project", projectId, deleted);
  return { success: true };
}
