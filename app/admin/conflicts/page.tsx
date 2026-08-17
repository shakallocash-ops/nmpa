import { ConflictsTable } from "@/components/admin/tables/ConflictsTable";
import { requireAdminPage } from "@/lib/admin-page";
import { prisma } from "@/lib/prisma";
import { leadershipRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";

export default async function ConflictsPage() {
  await requireAdminPage(leadershipRoles);
  const [conflicts, lgas] = await Promise.all([
    prisma.conflictCase.findMany({
      include: { lga: true },
      orderBy: { dateReported: "desc" }
    }),
    prisma.lGA.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } })
  ]);

  return (
    <ConflictsTable
      data={serialize(conflicts)}
      lgas={lgas}
      canResolve
    />
  );
}
