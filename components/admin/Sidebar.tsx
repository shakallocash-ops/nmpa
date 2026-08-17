"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@prisma/client";
import {
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  Scale,
  School,
  ScrollText,
  Users,
  UsersRound,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  auditRoles,
  contentWriteRoles,
  dashboardRoles,
  formatRole,
  hasRole,
  householdAccessRoles,
  initials,
  leadershipRoles,
  schoolAccessRoles,
  userAdminRoles
} from "@/lib/roles";

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: dashboardRoles
  },
  {
    href: "/admin/content",
    label: "Website & logo",
    icon: ImageIcon,
    roles: contentWriteRoles
  },
  {
    href: "/admin/households",
    label: "Pastoralist Database",
    icon: Users,
    roles: householdAccessRoles
  },
  {
    href: "/admin/schools",
    label: "Nomadic Schools",
    icon: School,
    roles: schoolAccessRoles
  },
  {
    href: "/admin/conflicts",
    label: "Conflict Cases",
    icon: Scale,
    roles: leadershipRoles
  },
  {
    href: "/admin/committee",
    label: "30-Man Committee",
    icon: UsersRound,
    roles: leadershipRoles
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: FolderKanban,
    roles: schoolAccessRoles
  },
  {
    href: "/admin/users",
    label: "User Management",
    icon: UserCog,
    roles: userAdminRoles
  },
  {
    href: "/admin/audit",
    label: "Audit Logs",
    icon: ScrollText,
    roles: auditRoles
  }
];

export function Sidebar({
  user,
  onNavigate
}: {
  user: { name: string; email: string; role: UserRole };
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items = navItems.filter((item) => hasRole(user.role, item.roles));

  return (
    <div className="flex h-full flex-col bg-[#0B1F33]">
      <div className="border-b border-gold/20 px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          NMPA Admin
        </p>
        <p className="mt-2 text-sm text-white/70">
          Ministry of Nomadic and Pastoral Affairs
        </p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-gold text-navy font-semibold"
                  : "text-white/80 hover:bg-gold/15 hover:text-gold"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gold/20 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
            {initials(user.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
            <p className="truncate text-xs text-gold">{formatRole(user.role)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
