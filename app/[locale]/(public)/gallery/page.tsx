import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/gallery", page: "gallery" });
}

export default async function GalleryPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const t = await getTranslations("gallery");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.village}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/gallery", label: nav("gallery") }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("section.eyebrow")}
            title={t("section.title")}
            description={t("section.description")}
          />
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>
    </>
  );
}
