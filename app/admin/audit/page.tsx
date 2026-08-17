import { AuditTable } from "@/components/admin/tables/AuditTable";
import { requireAdminPage } from "@/lib/admin-page";
import { prisma } from "@/lib/prisma";
import { auditRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";

export default async function AuditPage() {
  await requireAdminPage(auditRoles);
  const [logs, users] = await Promise.all([
    prisma.auditLog.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 500
    }),
    prisma.user.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true }
    })
  ]);

  return <AuditTable data={serialize(logs)} users={users} />;
}
