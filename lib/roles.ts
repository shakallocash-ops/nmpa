import { UserRole } from "@prisma/client";

export const leadershipRoles = [
  UserRole.SUPER_ADMIN,
  UserRole.COMMISSIONER,
  UserRole.PERM_SECRETARY,
  UserRole.DIRECTOR
] as const;

export const householdAccessRoles = [
  ...leadershipRoles,
  UserRole.ENUMERATOR
] as const;

export const householdWriteRoles = householdAccessRoles;

export const schoolAccessRoles = [
  ...leadershipRoles,
  UserRole.CONTENT_EDITOR
] as const;

export const projectWriteRoles = schoolAccessRoles;

export const contentWriteRoles = schoolAccessRoles;

export const dashboardRoles = [
  ...leadershipRoles,
  UserRole.CONTENT_EDITOR,
  UserRole.VIEWER,
  UserRole.ENUMERATOR
] as const;

export const auditRoles = [
  UserRole.SUPER_ADMIN,
  UserRole.COMMISSIONER,
  UserRole.PERM_SECRETARY
] as const;

export const userAdminRoles = [UserRole.SUPER_ADMIN] as const;

export type RoleList = readonly UserRole[];

export function hasRole(role: UserRole, allowed: RoleList) {
  return allowed.includes(role);
}

export function canWriteHouseholds(role: UserRole) {
  return hasRole(role, householdWriteRoles);
}

export function canDeleteRecords(role: UserRole) {
  return hasRole(role, leadershipRoles);
}

export function formatRole(role: UserRole) {
  const labels: Record<UserRole, string> = {
    SUPER_ADMIN: "Super Admin",
    COMMISSIONER: "Commissioner",
    PERM_SECRETARY: "Permanent Secretary",
    DIRECTOR: "Director",
    CONTENT_EDITOR: "Content Editor",
    VIEWER: "Viewer",
    ENUMERATOR: "Enumerator"
  };
  return labels[role];
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
