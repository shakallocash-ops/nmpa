"use server";

import { ConflictStatus, Prisma } from "@prisma/client";
import { prisma, withDbRetry } from "@/lib/prisma";
import { getBranding } from "@/lib/branding";
import { getProjectImages } from "@/lib/project-images";
import { rememberPublic } from "@/lib/public-cache";
import { serialize } from "@/lib/serialize";
import { NIGER_LGAS } from "@/lib/geo/niger-lgas";
import { SCHOOL_DIRECTORY, type DirectorySchool } from "@/lib/content/schools-directory";
import { PUBLISHED_STATS } from "@/lib/content/ministry";
import {
  FEATURED_PROJECTS,
  projectImageForType,
  type PublicProject
} from "@/lib/content/projects";
import { baselineByLga, demographicFallback } from "@/lib/content/baseline";
import { prettyEnum } from "@/lib/labels";
import {
  contactInquirySchema,
  publicConflictSchema
} from "@/lib/validations/public";

async function safe<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await operation();
  } catch {
    return fallback;
  }
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Returns month buckets as raw numbers. Labels are produced in the UI layer so
 * that the chart axis follows the active locale instead of a baked-in English
 * string.
 */
function lastTwelveMonths() {
  const months: Array<{ key: string; monthIndex: number; year: number }> = [];
  const now = new Date();
  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    months.push({
      key: monthKey(date),
      monthIndex: date.getMonth(),
      year: date.getFullYear()
    });
  }
  return months;
}

const publishedLgas = NIGER_LGAS.map((lga) => ({
  id: lga.name,
  name: lga.name,
  zone: lga.zone
}));

export async function getPublicLgas() {
  return rememberPublic(
    "public:lgas",
    async () => {
      const rows = await safe(
        () =>
          prisma.lGA.findMany({
            orderBy: { name: "asc" },
            select: { id: true, name: true, zone: true }
          }),
        []
      );
      return rows.length ? rows : publishedLgas;
    },
    publishedLgas
  );
}

const publishedHeadline = {
  lgas: PUBLISHED_STATS.lgas,
  schools: PUBLISHED_STATS.schools,
  households: PUBLISHED_STATS.households,
  conflictsResolved: PUBLISHED_STATS.conflictsResolved,
  livestock: PUBLISHED_STATS.livestock,
  appointments: PUBLISHED_STATS.appointments,
  solarBoreholes: PUBLISHED_STATS.solarBoreholes,
  live: null as {
    lgas: number;
    schools: number;
    households: number;
    conflictsResolved: number;
    livestock: number;
    appointments: number;
  } | null
};

export async function getPublicStats() {
  return rememberPublic(
    "public:stats",
    async () => {
      const live = await safe(async () => {
        const [lgas, schools, households, resolved, livestock, appointments] =
          await prisma.$transaction([
            prisma.lGA.count(),
            prisma.nomadicSchool.count(),
            prisma.household.count(),
            prisma.conflictCase.count({
              where: { status: ConflictStatus.RESOLVED }
            }),
            prisma.livestock.aggregate({ _sum: { count: true } }),
            prisma.user.count({
              where: {
                role: { in: ["COMMISSIONER", "PERM_SECRETARY", "DIRECTOR"] }
              }
            })
          ]);
        return {
          lgas,
          schools,
          households,
          conflictsResolved: resolved,
          livestock: livestock._sum.count ?? 0,
          appointments
        };
      }, null);

      return {
        lgas: Math.max(live?.lgas ?? 0, PUBLISHED_STATS.lgas),
        schools: Math.max(live?.schools ?? 0, PUBLISHED_STATS.schools),
        households: Math.max(live?.households ?? 0, PUBLISHED_STATS.households),
        conflictsResolved: Math.max(
          live?.conflictsResolved ?? 0,
          PUBLISHED_STATS.conflictsResolved
        ),
        livestock: Math.max(live?.livestock ?? 0, PUBLISHED_STATS.livestock),
        appointments: Math.max(
          live?.appointments ?? 0,
          PUBLISHED_STATS.appointments
        ),
        solarBoreholes: PUBLISHED_STATS.solarBoreholes,
        live
      };
    },
    publishedHeadline
  );
}

function geoForLga(name: string) {
  return NIGER_LGAS.find((item) => item.name === name);
}

function directorySchools(): DirectorySchool[] {
  return SCHOOL_DIRECTORY.map((school) => ({ ...school }));
}

export async function getPublicSchools(): Promise<DirectorySchool[]> {
  return rememberPublic(
    "public:schools",
    async () => {
      const dbSchools = await safe(
        () =>
          prisma.nomadicSchool.findMany({
            include: { lga: { select: { name: true, zone: true } } }
          }),
        []
      );

      const directory = directorySchools();
      const used = new Set<string>();

      for (const row of dbSchools) {
        const match =
          directory.find(
            (school) =>
              !used.has(school.id) &&
              school.lga === row.lga.name &&
              (school.name === row.name ||
                school.name.toLowerCase().includes(row.lga.name.toLowerCase()))
          ) ??
          directory.find(
            (school) => !used.has(school.id) && school.lga === row.lga.name
          );

        const status =
          row.status === "NON_VIABLE"
            ? "NON_VIABLE"
            : row.status === "VIABLE"
              ? "VIABLE"
              : match?.status ?? "NON_VIABLE";

        const mapped: DirectorySchool = {
          id: row.id,
          name: row.name,
          lga: row.lga.name,
          zone: row.lga.zone,
          lat: match?.lat ?? geoForLga(row.lga.name)?.lat ?? 9.6,
          lng: match?.lng ?? geoForLga(row.lga.name)?.lng ?? 6.55,
          status,
          enrolmentMale: row.studentEnrollmentMale,
          enrolmentFemale: row.studentEnrollmentFemale,
          teachersMale: row.teacherCountMale,
          teachersFemale: row.teacherCountFemale,
          classroomsGood: row.classroomGood,
          classroomsBad: row.classroomBad,
          hasSolar: row.hasSolar,
          hasBorehole: row.hasBorehole
        };

        if (match) {
          used.add(match.id);
          Object.assign(match, mapped);
        } else {
          directory.push(mapped);
        }
      }

      return directory;
    },
    directorySchools()
  );
}

export async function getPublicSchool(id: string) {
  const schools = await getPublicSchools();
  return schools.find((school) => school.id === id) ?? null;
}

function toPublicProject(row: {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  budget: unknown;
  startDate: Date | null;
  endDate: Date | null;
  impactReport: string | null;
  lga: { name: string };
}): PublicProject {
    const featured = FEATURED_PROJECTS.find(
      (item) =>
        item.title === row.title ||
        (item.lga === row.lga.name && item.typeKey === row.type)
    );
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    lga: row.lga.name,
    type: prettyEnum(row.type),
    typeKey: row.type,
    status: row.status as PublicProject["status"],
    budget: row.budget == null ? null : Number(row.budget),
    startDate: row.startDate ? row.startDate.toISOString() : null,
    endDate: row.endDate ? row.endDate.toISOString() : null,
    impact: row.impactReport || featured?.impact || row.description,
    image: featured?.image ?? projectImageForType(row.type),
    gallery: featured?.gallery ?? [projectImageForType(row.type)],
    timeline: featured?.timeline ?? [
      {
        date: row.startDate ? row.startDate.toLocaleDateString("en-GB") : "Planned",
        title: prettyEnum(row.status),
        body: row.description
      }
    ]
  };
}

export async function getPublicProjects(): Promise<PublicProject[]> {
  const projects = await rememberPublic(
    "public:projects",
    async () => {
      const rows = await safe(
        () =>
          prisma.project.findMany({
            include: { lga: { select: { name: true } } },
            orderBy: { createdAt: "desc" }
          }),
        []
      );

      const fromDb = rows.map(toPublicProject);
      const extras = FEATURED_PROJECTS.filter(
        (featured) =>
          !fromDb.some(
            (row) =>
              row.title.toLowerCase() === featured.title.toLowerCase() ||
              row.id === featured.id
          )
      );
      const merged = [...fromDb, ...extras];
      return merged.length ? merged : FEATURED_PROJECTS;
    },
    FEATURED_PROJECTS
  );

  // Admin uploads win: a photo uploaded for the specific project comes
  // first, then the admin default photo for projects without one, then the
  // stock type-based image.
  const [{ projectDefaultUrl }, projectImages] = await Promise.all([
    getBranding(),
    getProjectImages()
  ]);
  if (!projectDefaultUrl && Object.keys(projectImages).length === 0) {
    return projects;
  }
  return projects.map((project) => {
    const uploaded = projectImages[project.id];
    if (uploaded) {
      return {
        ...project,
        image: uploaded,
        gallery: [uploaded, ...project.gallery.filter((url) => url !== uploaded)]
      };
    }
    const stock = projectImageForType(project.typeKey);
    if (!projectDefaultUrl || project.image !== stock) return project;
    return {
      ...project,
      image: projectDefaultUrl,
      gallery: project.gallery.map((url) =>
        url === stock ? projectDefaultUrl : url
      )
    };
  });
}

export async function getPublicProject(id: string) {
  const projects = await getPublicProjects();
  return projects.find((project) => project.id === id) ?? null;
}

function publishedConflictDashboard() {
  const fallbackTrend = lastTwelveMonths().map((month, index) => ({
    monthIndex: month.monthIndex,
    year: month.year,
    resolved: Math.round(12 + index * 3.4)
  }));
  return {
    total: PUBLISHED_STATS.conflictsResolved,
    resolved: PUBLISHED_STATS.conflictsResolved,
    pending: 12,
    mediation: 8,
    recent: [] as Array<{
      id: string;
      title: string;
      lga: string;
      location: string;
      resolution: string | null;
      resolvedAt: string;
    }>,
    trend: fallbackTrend
  };
}

export async function getPublicConflictDashboard() {
  return rememberPublic(
    "public:conflicts",
    async () => {
      const fallbackTrend = publishedConflictDashboard().trend;
      const data = await safe(async () => {
        const [total, resolved, pending, mediation, recent, resolvedRows] =
          await prisma.$transaction([
            prisma.conflictCase.count(),
            prisma.conflictCase.count({
              where: { status: ConflictStatus.RESOLVED }
            }),
            prisma.conflictCase.count({
              where: { status: ConflictStatus.PENDING }
            }),
            prisma.conflictCase.count({
              where: { status: ConflictStatus.IN_MEDIATION }
            }),
            prisma.conflictCase.findMany({
              where: { status: ConflictStatus.RESOLVED },
              include: { lga: { select: { name: true } } },
              orderBy: { resolvedAt: "desc" },
              take: 6
            }),
            prisma.conflictCase.findMany({
              where: { status: ConflictStatus.RESOLVED },
              select: { resolvedAt: true, dateReported: true }
            })
          ]);

        const byMonth = new Map<string, number>();
        for (const item of resolvedRows) {
          const date = item.resolvedAt ?? item.dateReported;
          const key = monthKey(date);
          byMonth.set(key, (byMonth.get(key) ?? 0) + 1);
        }

        return {
          total: Math.max(total, PUBLISHED_STATS.conflictsResolved),
          resolved: Math.max(resolved, PUBLISHED_STATS.conflictsResolved),
          pending,
          mediation,
          recent: recent.map((item) => ({
            id: item.id,
            title: item.title,
            lga: item.lga.name,
            location: item.location,
            resolution: item.resolutionDetails,
            resolvedAt:
              item.resolvedAt?.toISOString() ?? item.dateReported.toISOString()
          })),
          trend: lastTwelveMonths().map((month) => ({
            monthIndex: month.monthIndex,
            year: month.year,
            resolved: byMonth.get(month.key) ?? 0
          }))
        };
      }, null);

      if (!data) return publishedConflictDashboard();
      const trendEmpty = data.trend.every((row) => row.resolved === 0);
      return { ...data, trend: trendEmpty ? fallbackTrend : data.trend };
    },
    publishedConflictDashboard()
  );
}

function emptyCommittee() {
  return serialize(
    NIGER_LGAS.map((lga) => ({
      lga: lga.name,
      zone: lga.zone,
      members: [] as Array<{
        id: string;
        name: string;
        role: string;
        committeeType: string;
        phone: string | null;
      }>
    }))
  );
}

export async function getPublicCommittee() {
  return rememberPublic(
    "public:committee",
    async () => {
      const members = await safe(
        () =>
          prisma.committeeMember.findMany({
            where: { isActive: true },
            include: { lga: { select: { name: true, zone: true } } },
            orderBy: [{ lga: { name: "asc" } }, { name: "asc" }]
          }),
        []
      );

      const byLga = NIGER_LGAS.map((lga) => ({
        lga: lga.name,
        zone: lga.zone,
        members: members
          .filter((member) => member.lga.name === lga.name)
          .map((member) => ({
            id: member.id,
            name: member.name,
            role: member.role,
            committeeType: member.committeeType,
            phone: member.phone
          }))
      }));

      return serialize(byLga);
    },
    emptyCommittee()
  );
}

function publishedExplorer() {
  const livestockTotals = baselineByLga.reduce(
    (acc, row) => ({
      cattle: acc.cattle + row.cattle,
      sheep: acc.sheep + row.sheep,
      goats: acc.goats + row.goats
    }),
    { cattle: 0, sheep: 0, goats: 0 }
  );
  return {
    source: "published" as const,
    byLga: baselineByLga,
    gender: demographicFallback.gender,
    settlement: demographicFallback.settlement,
    age: demographicFallback.age,
    composition: [
      { name: "Cattle", value: livestockTotals.cattle, fill: "#0B1F33" },
      { name: "Sheep", value: livestockTotals.sheep, fill: "#C6A15B" },
      { name: "Goats", value: livestockTotals.goats, fill: "#0B6B4F" }
    ]
  };
}

export async function getPublicExplorerData() {
  return rememberPublic(
    "public:explorer",
    async () => {
  const live = await safe(async () => {
    const households = await prisma.household.findMany({
      include: {
        lga: { select: { name: true, zone: true } },
        livestock: true
      }
    });
    return households;
  }, []);

  const useLive = live.length >= 40;

  const byLga = useLive
    ? NIGER_LGAS.map((lga) => {
        const rows = live.filter((item) => item.lga.name === lga.name);
        const cattle = rows.reduce(
          (sum, row) =>
            sum +
            row.livestock
              .filter((item) => item.type === "CATTLE")
              .reduce((inner, item) => inner + item.count, 0),
          0
        );
        const sheep = rows.reduce(
          (sum, row) =>
            sum +
            row.livestock
              .filter((item) => item.type === "SHEEP")
              .reduce((inner, item) => inner + item.count, 0),
          0
        );
        const goats = rows.reduce(
          (sum, row) =>
            sum +
            row.livestock
              .filter((item) => item.type === "GOAT")
              .reduce((inner, item) => inner + item.count, 0),
          0
        );
        return {
          lga: lga.name,
          zone: lga.zone,
          households: rows.length,
          cattle,
          sheep,
          goats,
          livestock: rows.reduce(
            (sum, row) =>
              sum + row.livestock.reduce((inner, item) => inner + item.count, 0),
            0
          )
        };
      })
    : baselineByLga;

  const gender = useLive
    ? [
        {
          name: "Male",
          value: live.filter((row) => row.headGender === "MALE").length
        },
        {
          name: "Female",
          value: live.filter((row) => row.headGender === "FEMALE").length
        }
      ]
    : demographicFallback.gender;

  const settlement = useLive
    ? [
        {
          name: "Nomadic",
          value: live.filter((row) => row.settlementType === "NOMADIC").length
        },
        {
          name: "Semi-nomadic",
          value: live.filter((row) => row.settlementType === "SEMI_NOMADIC").length
        },
        {
          name: "Settled",
          value: live.filter((row) => row.settlementType === "SETTLED").length
        }
      ]
    : demographicFallback.settlement;

  const age = useLive
    ? [
        { name: "18–24", value: live.filter((row) => row.headAge < 25).length },
        {
          name: "25–44",
          value: live.filter((row) => row.headAge >= 25 && row.headAge < 45).length
        },
        {
          name: "45–64",
          value: live.filter((row) => row.headAge >= 45 && row.headAge < 65).length
        },
        { name: "65+", value: live.filter((row) => row.headAge >= 65).length }
      ]
    : demographicFallback.age;

  const livestockTotals = byLga.reduce(
    (acc, row) => ({
      cattle: acc.cattle + row.cattle,
      sheep: acc.sheep + row.sheep,
      goats: acc.goats + row.goats
    }),
    { cattle: 0, sheep: 0, goats: 0 }
  );

  return {
    source: useLive ? ("live" as const) : ("published" as const),
    byLga,
    gender,
    settlement,
    age,
    composition: [
      { name: "Cattle", value: livestockTotals.cattle, fill: "#0B1F33" },
      { name: "Sheep", value: livestockTotals.sheep, fill: "#C6A15B" },
      { name: "Goats", value: livestockTotals.goats, fill: "#0B6B4F" }
    ]
  };
    },
    publishedExplorer()
  );
}

async function createInquiry(data: {
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
}) {
  const delegate = (
    prisma as typeof prisma & {
      contactInquiry: {
        create: (args: { data: typeof data }) => Promise<unknown>;
      };
    }
  ).contactInquiry;
  if (!delegate) {
    throw new Error("ContactInquiry model is not available");
  }
  return delegate.create({ data });
}

/**
 * Failures are reported as message keys, not sentences: the browser holds the
 * active locale, so the words are chosen there.
 */
export type PublicFormResult =
  | { success: true }
  | { success: false; errorKey: string };

function firstIssueKey(field: string | undefined) {
  return field ? `field.${field}` : "generic";
}

export async function submitContact(input: unknown): Promise<PublicFormResult> {
  const parsed = contactInquirySchema.safeParse(input);
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0];
    return {
      success: false as const,
      errorKey: firstIssueKey(typeof field === "string" ? field : undefined)
    };
  }

  try {
    await withDbRetry(() =>
      createInquiry({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        subject: parsed.data.subject,
        message: parsed.data.message
      })
    );
    return { success: true as const };
  } catch {
    return { success: false as const, errorKey: "contactFailed" };
  }
}

export async function reportPublicConflict(
  input: unknown
): Promise<PublicFormResult> {
  const parsed = publicConflictSchema.safeParse(input);
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0];
    return {
      success: false as const,
      errorKey: firstIssueKey(typeof field === "string" ? field : undefined)
    };
  }

  try {
    const lga = await prisma.lGA.findUnique({
      where: { name: parsed.data.lgaName }
    });

    if (lga) {
      await withDbRetry(() =>
        prisma.conflictCase.create({
          data: {
            title: `Public report — ${parsed.data.location}`,
            description: parsed.data.description,
            lgaId: lga.id,
            location: parsed.data.location,
            dateReported: new Date(),
            status: ConflictStatus.PENDING,
            partiesInvolved: [
              {
                name: parsed.data.contactName,
                type: "Reporter",
                phone: parsed.data.contactPhone
              },
              {
                name: "To be identified",
                type: "Other party",
                phone: ""
              }
            ] as Prisma.InputJsonValue
          }
        })
      );
      return { success: true as const };
    }

    await withDbRetry(() =>
      createInquiry({
        name: parsed.data.contactName,
        email: parsed.data.contactEmail || "noreply@nomadicafairs.nigerstate.gov.ng",
        phone: parsed.data.contactPhone,
        subject: `Conflict report — ${parsed.data.lgaName}`,
        message: `${parsed.data.location}\n\n${parsed.data.description}`
      })
    );
    return { success: true as const };
  } catch {
    return { success: false as const, errorKey: "reportFailed" };
  }
}
