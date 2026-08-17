"use server";

import { UserRole } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { loadDashboardStats } from "@/lib/dashboard-stats";
import { prisma, withDbRetry } from "@/lib/prisma";
import { dashboardRoles } from "@/lib/roles";

export async function getDashboardStats() {
  await requireSession(dashboardRoles);
  return loadDashboardStats();
}

export async function getLgas() {
  await requireSession();
  return withDbRetry(
    () =>
      prisma.lGA.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, zone: true }
      }),
    1
  );
}

export async function getDirectoryUsers() {
  const session = await requireSession();
  if (session.user.role === UserRole.ENUMERATOR) {
    return [
      {
        id: session.user.id,
        name: session.user.name,
        role: session.user.role
      }
    ];
  }

  return withDbRetry(
    () =>
      prisma.user.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { id: true, name: true, role: true }
      }),
    1
  );
}
