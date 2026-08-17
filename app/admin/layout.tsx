import { getSession } from "@/actions/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-navy text-[#f8f5ee]">{children}</div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-[#f8f5ee]">
      <AdminShell user={session.user}>{children}</AdminShell>
    </div>
  );
}
