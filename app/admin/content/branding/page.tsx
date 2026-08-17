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
        title="Logo & website images"
        description="Upload the ministry logo, the homepage hero, the About the Ministry photo and the default project photo. Changes appear on the public website immediately."
      />
      <BrandingForm
        logoUrl={branding.logoUrl}
        heroUrl={branding.heroUrl}
        homeAboutUrl={branding.homeAboutUrl}
        projectDefaultUrl={branding.projectDefaultUrl}
      />
    </div>
  );
}
