import { SchoolsTable } from "@/components/admin/tables/SchoolsTable";
import { requireAdminPage } from "@/lib/admin-page";
import { prisma } from "@/lib/prisma";
import { canDeleteRecords, hasRole, schoolAccessRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";

export default async function SchoolsPage() {
  const session = await requireAdminPage(schoolAccessRoles);
  const [schools, lgas] = await Promise.all([
    prisma.nomadicSchool.findMany({
      include: { lga: true },
      orderBy: { name: "asc" }
    }),
    prisma.lGA.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } })
  ]);

  return (
    <SchoolsTable
      data={serialize(schools)}
      lgas={lgas}
      canWrite={hasRole(session.user.role, schoolAccessRoles)}
      canDelete={canDeleteRecords(session.user.role)}
    />
  );
}
