import { HouseholdsTable } from "@/components/admin/tables/HouseholdsTable";
import { requireAdminPage } from "@/lib/admin-page";
import { prisma } from "@/lib/prisma";
import {
  canDeleteRecords,
  canWriteHouseholds,
  householdAccessRoles
} from "@/lib/roles";
import { serialize } from "@/lib/serialize";

export default async function HouseholdsPage() {
  const session = await requireAdminPage(householdAccessRoles);
  const enumeratorOnly = session.user.role === "ENUMERATOR";

  const [households, lgas] = await Promise.all([
    prisma.household.findMany({
      where: enumeratorOnly ? { enumeratorId: session.user.id } : undefined,
      include: { lga: true, livestock: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.lGA.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } })
  ]);

  return (
    <HouseholdsTable
      data={serialize(households)}
      lgas={lgas}
      currentUserId={session.user.id}
      canWrite={canWriteHouseholds(session.user.role)}
      canDelete={canDeleteRecords(session.user.role)}
    />
  );
}
