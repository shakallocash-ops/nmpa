import { BrandingForm } from "@/components/admin/BrandingForm";
import { PageHeader } from "@/components/admin/PageHeader";
import { requireAdminPage } from "@/lib/admin-page";
import { getBranding } from "@/lib/branding";
import { contentWriteRoles } from "@/lib/roles";

export const dynamic = "force-dynamic";

export default async function BrandingPage() {
  await requireAdminPage(contentWriteRoles);
  const branding = await getBranding();

  return (
    <div>
      <PageHeader
        title="Logo & branding"
        description="Upload the official ministry logo and the homepage hero photo. Changes appear on the public website immediately."
      />
      <BrandingForm logoUrl={branding.logoUrl} heroUrl={branding.heroUrl} />
    </div>
  );
}
