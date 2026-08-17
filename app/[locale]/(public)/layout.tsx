import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { isLocale } from "@/i18n/config";
import { getBranding } from "@/lib/branding";

export default async function PublicLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (isLocale(locale)) {
    setRequestLocale(locale);
  }

  const t = await getTranslations("nav");
  const { logoUrl } = await getBranding();

  return (
    <>
      <a href="#main" className="skip-link">
        {t("skipToContent")}
      </a>
      <div className="flex min-h-screen flex-col bg-paper">
        <SiteHeader logoUrl={logoUrl} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter logoUrl={logoUrl} />
      </div>
    </>
  );
}
