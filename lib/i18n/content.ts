import { getTranslations } from "next-intl/server";
import { departments, leadership, mandates } from "@/lib/content/ministry";
import { staffDirectory } from "@/lib/content/staff";

/**
 * Ministry copy (mandates, directorate descriptions, vision and mission) is
 * translated content and therefore read from the message catalogue, keyed by
 * the stable slugs/ids in `lib/content/ministry.ts`.
 *
 * Personal names are never translated — only the office or role attached to
 * them, which is why `leadership` keeps `name` from the source data.
 */
export async function getLocalisedMandates() {
  const t = await getTranslations("ministry.mandates");
  return mandates.map((mandate) => ({
    id: mandate.id,
    title: t(`${mandate.id}.title` as never),
    body: t(`${mandate.id}.body` as never)
  }));
}

export async function getLocalisedDepartments() {
  const t = await getTranslations("ministry.departments");
  return departments.map((department) => ({
    slug: department.slug,
    name: t(`${department.slug}.name` as never),
    summary: t(`${department.slug}.summary` as never),
    functions: t.raw(`${department.slug}.functions`) as string[],
    achievements: t.raw(`${department.slug}.achievements`) as string[]
  }));
}

export async function getLocalisedDepartment(slug: string) {
  const all = await getLocalisedDepartments();
  return all.find((department) => department.slug === slug) ?? null;
}

/** Maps the source role strings onto translation keys in `ministry.roles`. */
const roleKeys: Record<string, string> = {
  "Honourable Commissioner": "commissioner",
  "Permanent Secretary": "permanentSecretary",
  "Director, Administration": "directorAdministration",
  "Director, Planning, Research & Statistics": "directorPlanning",
  "Director, Nomadic Education": "directorEducation",
  "Director, Peace & Conflict Resolution": "directorPeace",
  "Director, Finance & Supply": "directorFinance"
};

export async function getLocalisedLeadership() {
  const t = await getTranslations("ministry.roles");
  const bios = await getTranslations("records.bios");
  return leadership.map((person) => {
    const key = roleKeys[person.role];
    return {
      name: person.name,
      role: key ? t(key as never) : person.role,
      bio: key && bios.has(key) ? bios(key as never) : person.bio
    };
  });
}

const officeKeys: Record<string, string> = {
  "Office of the Honourable Commissioner": "commissioner",
  "Office of the Permanent Secretary": "permanentSecretary",
  "Directorate of Administration": "administration",
  "Directorate of Planning, Research & Statistics": "planning",
  "Directorate of Nomadic Education": "education",
  "Directorate of Peace & Conflict Resolution": "peace",
  "Directorate of Finance & Supply": "finance",
  "Information & Protocol Unit": "information"
};

const departmentKeys: Record<string, string> = {
  Administration: "administration",
  "Planning, Research & Statistics": "planning",
  "Nomadic Education": "education",
  "Peace & Conflict Resolution": "peace",
  "Finance & Supply": "finance"
};

/**
 * The directory lists offices rather than individuals, so office, role and
 * department names are translated while the official email address is not.
 */
export async function getLocalisedStaffDirectory() {
  const [offices, roles, depts] = await Promise.all([
    getTranslations("ministry.offices"),
    getTranslations("ministry.roles"),
    getTranslations("ministry.departments")
  ]);

  return staffDirectory.map((person) => {
    const officeKey = officeKeys[person.name];
    const roleKey =
      roleKeys[person.role] ??
      (person.role === "Head, Information & Protocol" ? "informationUnit" : null);
    const deptKey = departmentKeys[person.department];
    return {
      name: officeKey
        ? offices(officeKey as never)
        : person.name,
      role: roleKey ? roles(roleKey as never) : person.role,
      department: deptKey
        ? depts(`${deptKey}.name` as never)
        : officeKey
          ? offices(officeKey as never)
          : person.department,
      email: person.email
    };
  });
}
