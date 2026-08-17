import { ConflictStatus, SchoolStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { serialize } from "@/lib/serialize";

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function lastTwelveMonths() {
  const months: Array<{ key: string; label: string }> = [];
  const now = new Date();
  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    months.push({
      key: monthKey(date),
      label: date.toLocaleString("en-US", { month: "short", year: "2-digit" })
    });
  }
  return months;
}

export function offlineDashboardStats() {
  return serialize({
    totalLGAs: 25,
    totalSchools: 275,
    totalHouseholds: 18462,
    conflictsResolved: 300,
    totalLivestock: 2_352_000,
    activeProjects: 0,
    livestockByLga: [] as Array<{ lga: string; count: number }>,
    schoolViability: [] as Array<{ name: string; value: number; fill: string }>,
    conflictsByMonth: lastTwelveMonths().map((month) => ({
      month: month.label,
      resolved: 0
    })),
    offline: true
  });
}

export async function loadDashboardStats() {
  try {
    const [
      totalLGAs,
      totalSchools,
      totalHouseholds,
      conflictsResolved,
      livestock,
      activeProjects,
      schoolGroups,
      resolvedConflicts,
      livestockRows
    ] = await prisma.$transaction([
      prisma.lGA.count(),
      prisma.nomadicSchool.count(),
      prisma.household.count(),
      prisma.conflictCase.count({
        where: { status: ConflictStatus.RESOLVED }
      }),
      prisma.livestock.aggregate({ _sum: { count: true } }),
      prisma.project.count({
        where: { status: { in: ["PLANNING", "ONGOING"] } }
      }),
      prisma.nomadicSchool.groupBy({
        by: ["status"],
        _count: { _all: true },
        orderBy: { status: "asc" }
      }),
      prisma.conflictCase.findMany({
        where: { status: ConflictStatus.RESOLVED },
        select: { resolvedAt: true, dateReported: true }
      }),
      prisma.$queryRaw<Array<{ lga: string; count: number }>>`
        SELECT l.name AS lga, CAST(COALESCE(SUM(lv.count), 0) AS INTEGER) AS count
        FROM "LGA" l
        INNER JOIN "Household" h ON h."lgaId" = l.id
        INNER JOIN "Livestock" lv ON lv."householdId" = h.id
        GROUP BY l.name
        ORDER BY count DESC
        LIMIT 12
      `
    ]);

    const livestockByLga = livestockRows
      .map((row) => ({ lga: row.lga, count: Number(row.count) }))
      .filter((row) => row.count > 0);

    const viabilityLookup = new Map<SchoolStatus, number>();
    for (const school of schoolGroups) {
      viabilityLookup.set(school.status, school._count._all);
    }

    const resolvedByMonth = new Map<string, number>();
    for (const item of resolvedConflicts) {
      const date = item.resolvedAt ?? item.dateReported;
      const key = monthKey(date);
      resolvedByMonth.set(key, (resolvedByMonth.get(key) ?? 0) + 1);
    }

    return serialize({
      totalLGAs,
      totalSchools,
      totalHouseholds,
      conflictsResolved,
      totalLivestock: livestock._sum.count ?? 0,
      activeProjects,
      livestockByLga,
      schoolViability: [
        {
          name: "Viable",
          value: viabilityLookup.get(SchoolStatus.VIABLE) ?? 0,
          fill: "#22c55e"
        },
        {
          name: "Non-Viable",
          value: viabilityLookup.get(SchoolStatus.NON_VIABLE) ?? 0,
          fill: "#ef4444"
        },
        {
          name: "Not assessed",
          value: viabilityLookup.get(SchoolStatus.NOT_ASSESSED) ?? 0,
          fill: "#64748b"
        }
      ].filter((slice) => slice.value > 0),
      conflictsByMonth: lastTwelveMonths().map((month) => ({
        month: month.label,
        resolved: resolvedByMonth.get(month.key) ?? 0
      })),
      offline: false
    });
  } catch (error) {
    console.error("Dashboard stats unavailable:", error);
    return offlineDashboardStats();
  }
}
