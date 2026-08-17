import type { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/auth";
import { hasRole, type RoleList } from "@/lib/roles";

export async function requireAdminPage(roles?: RoleList) {
  const session = await getSession();
  if (!session) {
    redirect("/admin");
  }
  if (roles && !hasRole(session.user.role as UserRole, roles)) {
    redirect("/unauthorized");
  }
  return session;
}
