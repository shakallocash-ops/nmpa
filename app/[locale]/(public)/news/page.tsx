import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { NewsList } from "@/components/public/NewsList";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { getLocalisedNewsPosts } from "@/lib/i18n/records";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/news", page: "news" });
}

export default async function NewsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const t = await getTranslations("news");
  const nav = await getTranslations("nav");
  const posts = await getLocalisedNewsPosts();

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.dusk}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/news", label: nav("news") }
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
            <NewsList posts={posts} />
          </div>
        </div>
      </section>
    </>
  );
}
