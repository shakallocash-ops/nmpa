import Link from "next/link";
import { ImageIcon, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { requireAdminPage } from "@/lib/admin-page";
import { contentWriteRoles } from "@/lib/roles";

export default async function ContentHomePage() {
  await requireAdminPage(contentWriteRoles);

  return (
    <div>
      <PageHeader
        title="Website content"
        description="Manage the public site without editing code. Logo upload works even when the live database is offline."
      />
      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          <Link
            href="/admin/content/branding"
            className="block rounded-card border border-gold/20 bg-[#12293F] p-6 hover:border-gold"
          >
            <ImageIcon className="h-6 w-6 text-gold" />
            <h2 className="mt-3 font-semibold text-white">Logo &amp; branding</h2>
            <p className="mt-2 text-sm text-white/65">
              Upload the ministry logo used in the public header and footer.
            </p>
          </Link>
        </li>
        <li className="rounded-card border border-white/10 bg-[#12293F]/60 p-6 opacity-70">
          <Newspaper className="h-6 w-6 text-white/50" />
          <h2 className="mt-3 font-semibold text-white/80">News, gallery &amp; pages</h2>
          <p className="mt-2 text-sm text-white/50">
            Next step once the database is reachable: photos, news and page copy.
          </p>
        </li>
      </ul>
    </div>
  );
}
