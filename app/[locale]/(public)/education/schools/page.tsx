import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/public/PageHero";
import { SchoolsExplorer } from "@/components/public/SchoolsExplorer";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { getPublicSchools } from "@/actions/public";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 300;

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({
    locale,
    path: "/education/schools",
    page: "schools"
  });
}

export default async function SchoolsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const schools = await getPublicSchools();
  const t = await getTranslations("schools");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.classroom}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/education", label: nav("programmesEducation") },
          { href: "/education/schools", label: nav("resourcesSchools") }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-12 md:px-8 md:py-16">
          <SchoolsExplorer schools={schools} />
          <p className="mt-6 text-caption tracking-normal text-ink-faint">
            {t("mapNote")}
          </p>
        </div>
      </section>
    </>
  );
}
