/**
 * Maps stable data values (Prisma enums, content category strings) onto message
 * keys. Keeping the mapping here means components never branch on locale.
 */

const projectTypeKeys: Record<string, string> = {
  SOLAR_BOREHOLE: "solarBorehole",
  SCHOOL_RENOVATION: "schoolRenovation",
  PEACE_RALLY: "peaceRally",
  DAIRY_CENTER: "dairyCenter",
  RANCH: "ranch",
  SKILL_ACQUISITION: "skillAcquisition",
  GRAZING_RESERVE: "grazingReserve"
};

export function projectTypeKey(typeKey: string) {
  return projectTypeKeys[typeKey] ?? null;
}

export const projectTypeKeyList = Object.keys(projectTypeKeys);

const projectStatusKeys: Record<string, string> = {
  PLANNING: "planning",
  ONGOING: "ongoing",
  COMPLETED: "completed"
};

export function projectStatusKey(status: string) {
  return projectStatusKeys[status] ?? null;
}

const newsCategoryKeys: Record<string, string> = {
  "Press Releases": "pressReleases",
  Announcements: "announcements",
  Events: "events"
};

export function newsCategoryKey(category: string) {
  return newsCategoryKeys[category] ?? null;
}

const galleryCategoryKeys: Record<string, string> = {
  All: "all",
  Schools: "schools",
  Boreholes: "boreholes",
  "Peace Rallies": "rallies",
  "Community Visits": "community",
  Events: "events",
  "Conflict Victims": "victims",
  "Baseline Data Collection": "baseline"
};

export function galleryCategoryKey(category: string) {
  return galleryCategoryKeys[category] ?? null;
}

const committeeRoleKeys: Record<string, string> = {
  ARDO: "ardo",
  WAKILI: "wakili",
  CHAIRMAN: "chairman",
  VICE_CHAIRMAN: "viceChairman",
  SECRETARY: "secretary",
  YOUTH_LEADER: "youthLeader",
  WOMEN_LEADER: "womenLeader",
  TREASURER: "treasurer",
  PRO: "pro",
  LEGAL_ADVISER: "legalAdviser",
  MEMBER: "member"
};

export function committeeRoleKey(role: string) {
  return committeeRoleKeys[role] ?? null;
}

const committeeTypeKeys: Record<string, string> = {
  THIRTY_MAN: "thirtyMan",
  PEACE: "peace"
};

export function committeeTypeKey(type: string) {
  return committeeTypeKeys[type] ?? null;
}

const demographicKeys: Record<string, string> = {
  Male: "male",
  Female: "female",
  Nomadic: "nomadic",
  "Semi-nomadic": "semiNomadic",
  Settled: "settled",
  Cattle: "cattle",
  Sheep: "sheep",
  Goats: "goats",
  Other: "other"
};

/** Age bands and similar numeric labels are locale-neutral and pass through. */
export function demographicKey(name: string) {
  return demographicKeys[name] ?? null;
}
