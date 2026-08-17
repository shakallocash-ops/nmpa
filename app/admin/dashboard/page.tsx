import { DashboardCharts } from "@/components/admin/dashboard/DashboardCharts";
import { StatsCards } from "@/components/admin/dashboard/StatsCards";
import { PageHeader } from "@/components/admin/PageHeader";
import { requireAdminPage } from "@/lib/admin-page";
import {
  loadDashboardStats,
  offlineDashboardStats
} from "@/lib/dashboard-stats";
import { dashboardRoles } from "@/lib/roles";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await requireAdminPage(dashboardRoles);
  const stats = await loadDashboardStats().catch(() => offlineDashboardStats());

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${session.user.name}`}
        description="Live administrative overview of pastoralist data, nomadic education, conflict resolution, and projects."
      />
      {stats.offline ? (
        <div className="rounded-card border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-white/85">
          Neon cannot be reached, so live counts are unavailable. You can still
          upload the ministry logo under{" "}
          <a
            href="/admin/content/branding"
            className="font-semibold text-gold underline"
          >
            Website &amp; logo
          </a>
          . Resume the database at{" "}
          <a
            href="https://console.neon.tech"
            className="font-semibold text-gold underline"
            target="_blank"
            rel="noreferrer"
          >
            console.neon.tech
          </a>{" "}
          then refresh this page.
        </div>
      ) : null}
      <StatsCards stats={stats} />
      <DashboardCharts
        livestockByLga={stats.livestockByLga}
        schoolViability={stats.schoolViability}
        conflictsByMonth={stats.conflictsByMonth}
      />
    </div>
  );
}
