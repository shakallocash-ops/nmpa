import {
  CommitteeRole,
  CommitteeType,
  ConflictStatus,
  Gender,
  InterviewStatus,
  LivestockType,
  ProjectStatus,
  ProjectType,
  SchoolStatus,
  SettlementType
} from "@prisma/client";

export function prettyEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export const genderLabels: Record<Gender, string> = {
  MALE: "Male",
  FEMALE: "Female"
};

export const settlementLabels: Record<SettlementType, string> = {
  NOMADIC: "Nomadic",
  SEMI_NOMADIC: "Semi-nomadic",
  SETTLED: "Settled"
};

export const interviewLabels: Record<InterviewStatus, string> = {
  COMPLETED: "Completed",
  NO_HOUSEHOLD_MEMBER_HOME: "No member home",
  POSTPONED: "Postponed",
  EXTENDED_ABSENCE: "Extended absence",
  REFUSED: "Refused",
  DWELLING_NOT_FOUND: "Dwelling not found",
  DWELLING_DESTROYED: "Dwelling destroyed",
  OTHER: "Other"
};

export const livestockLabels: Record<LivestockType, string> = {
  CATTLE: "Cattle",
  SHEEP: "Sheep",
  GOAT: "Goat",
  CAMEL: "Camel",
  CHICKEN: "Chicken",
  OTHER: "Other"
};

export const schoolStatusLabels: Record<SchoolStatus, string> = {
  VIABLE: "Viable",
  NON_VIABLE: "Non-Viable",
  NOT_ASSESSED: "Not assessed"
};

export const conflictStatusLabels: Record<ConflictStatus, string> = {
  PENDING: "Pending",
  IN_MEDIATION: "In mediation",
  RESOLVED: "Resolved",
  ESCALATED: "Escalated"
};

export const projectTypeLabels: Record<ProjectType, string> = {
  SOLAR_BOREHOLE: "Solar borehole",
  SCHOOL_RENOVATION: "School renovation",
  PEACE_RALLY: "Peace rally",
  DAIRY_CENTER: "Dairy center",
  RANCH: "Ranch"
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  PLANNING: "Planning",
  ONGOING: "Ongoing",
  COMPLETED: "Completed"
};

export const committeeRoleLabels: Record<CommitteeRole, string> = {
  ARDO: "Ardo",
  WAKILI: "Wakili",
  CHAIRMAN: "Chairman",
  VICE_CHAIRMAN: "Vice Chairman",
  SECRETARY: "Secretary",
  YOUTH_LEADER: "Youth Leader",
  WOMEN_LEADER: "Women Leader",
  TREASURER: "Treasurer",
  PRO: "PRO",
  LEGAL_ADVISER: "Legal Adviser",
  MEMBER: "Member"
};

export const committeeTypeLabels: Record<CommitteeType, string> = {
  THIRTY_MAN: "30-Man Committee",
  PEACE: "Peace Committee"
};

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function formatMoney(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  const amount = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);
}

export function projectProgress(
  status: ProjectStatus,
  startDate?: string | Date | null,
  endDate?: string | Date | null
) {
  if (status === ProjectStatus.COMPLETED) return 100;
  if (status === ProjectStatus.PLANNING) return 15;
  const start = startDate ? new Date(startDate).getTime() : NaN;
  const end = endDate ? new Date(endDate).getTime() : NaN;
  if (Number.isFinite(start) && Number.isFinite(end) && end > start) {
    const ratio = (Date.now() - start) / (end - start);
    return Math.min(95, Math.max(25, Math.round(ratio * 100)));
  }
  return 55;
}
