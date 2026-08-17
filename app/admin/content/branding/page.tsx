import { BrandingForm } from "@/components/admin/BrandingForm";
import { PageHeader } from "@/components/admin/PageHeader";
import { requireAdminPage } from "@/lib/admin-page";
import { getBranding } from "@/lib/branding";
import { contentWriteRoles } from "@/lib/roles";

export default async function BrandingPage() {
  await requireAdminPage(contentWriteRoles);
  const branding = getBranding();

  return (
    <div>
      <PageHeader
        title="Logo & branding"
        description="Upload the official ministry logo. It replaces the default mark on the public website immediately. This does not need the Neon database."
      />
      <BrandingForm logoUrl={branding.logoUrl} />
    </div>
  );
}
