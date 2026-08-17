import { CommitteeTable } from "@/components/admin/tables/CommitteeTable";
import { requireAdminPage } from "@/lib/admin-page";
import { prisma } from "@/lib/prisma";
import { leadershipRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";

export default async function CommitteePage() {
  await requireAdminPage(leadershipRoles);
  const [members, lgas] = await Promise.all([
    prisma.committeeMember.findMany({
      include: { lga: true },
      orderBy: { name: "asc" }
    }),
    prisma.lGA.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } })
  ]);

  return (
    <CommitteeTable data={serialize(members)} lgas={lgas} canWrite />
  );
}
