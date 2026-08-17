import { UsersTable } from "@/components/admin/tables/UsersTable";
import { requireAdminPage } from "@/lib/admin-page";
import { prisma } from "@/lib/prisma";
import { userAdminRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";

export default async function UsersPage() {
  const session = await requireAdminPage(userAdminRoles);
  const [users, lgas] = await Promise.all([
    prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        phone: true,
        lgaId: true,
        lastLogin: true,
        isActive: true,
        lga: { select: { id: true, name: true } }
      }
    }),
    prisma.lGA.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } })
  ]);

  return (
    <UsersTable
      data={serialize(users)}
      lgas={lgas}
      currentUserId={session.user.id}
    />
  );
}
