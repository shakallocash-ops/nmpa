import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BarChart3, GraduationCap, Newspaper } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ResourceDownloads } from "@/components/public/ResourceDownloads";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import {
  getPublicExplorerData,
  getPublicProjects,
  getPublicSchools
} from "@/actions/public";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 300;

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/resources", page: "resources" });
}

const links = [
  { key: "data", href: "/data", Icon: BarChart3 },
  { key: "schools", href: "/education/schools", Icon: GraduationCap },
  { key: "news", href: "/news", Icon: Newspaper }
] as const;

export default async function ResourcesPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const [explorer, schools, projects] = await Promise.all([
    getPublicExplorerData(),
    getPublicSchools(),
    getPublicProjects()
  ]);

  const t = await getTranslations("resources");
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
          { href: "/resources", label: nav("resources") }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("downloads.eyebrow")}
            title={t("downloads.title")}
            description={t("downloads.description")}
          />
          <div className="mt-10">
            <ResourceDownloads
              baseline={explorer.byLga}
              schools={schools}
              projects={projects}
            />
          </div>
          <p className="mt-8 text-caption tracking-normal text-ink-faint">
            {t("sourceNote", {
              source:
                explorer.source === "live"
                  ? t("sourceLive")
                  : t("sourcePublished")
            })}
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("related.eyebrow")}
            title={t("related.title")}
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {links.map(({ key, href, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                  <span className="mt-4 flex items-center gap-2 font-serif text-h4 font-bold text-primary">
                    {t(`related.${key}Label` as never)}
                    <ArrowRight
                      className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 block text-small text-ink-muted">
                    {t(`related.${key}Description` as never)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
