import { ProjectsTable } from "@/components/admin/tables/ProjectsTable";
import { requireAdminPage } from "@/lib/admin-page";
import { prisma } from "@/lib/prisma";
import { canDeleteRecords, schoolAccessRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";

export default async function ProjectsPage() {
  const session = await requireAdminPage(schoolAccessRoles);
  const [projects, lgas] = await Promise.all([
    prisma.project.findMany({
      include: { lga: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.lGA.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } })
  ]);

  return (
    <ProjectsTable
      data={serialize(projects)}
      lgas={lgas}
      canWrite
      canDelete={canDeleteRecords(session.user.role)}
    />
  );
}
