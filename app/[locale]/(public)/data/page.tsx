import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { DataExplorer } from "@/components/public/DataExplorer";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { getPublicExplorerData } from "@/actions/public";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 300;

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/data", page: "data" });
}

export default async function DataPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const data = await getPublicExplorerData();
  const t = await getTranslations("data");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.field}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/resources", label: nav("resources") },
          { href: "/data", label: nav("resourcesData") }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("explorer.eyebrow")}
            title={t("explorer.title")}
            description={t("explorer.description")}
          />
          <div className="mt-12">
            <DataExplorer data={data} />
          </div>
        </div>
      </section>
    </>
  );
}
