import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ProjectsGrid } from "@/components/public/ProjectsGrid";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { getPublicProjects } from "@/actions/public";
import { localiseProjects } from "@/lib/i18n/records";
import { getFormatters } from "@/lib/i18n/server-format";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 120;

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/projects", page: "projects" });
}

export default async function ProjectsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const projects = await localiseProjects(await getPublicProjects());
  const t = await getTranslations("projects");
  const nav = await getTranslations("nav");
  const { formatNumber } = await getFormatters();

  const counts = [
    {
      key: "completed",
      value: projects.filter((item) => item.status === "COMPLETED").length
    },
    {
      key: "ongoing",
      value: projects.filter((item) => item.status === "ONGOING").length
    },
    {
      key: "planning",
      value: projects.filter((item) => item.status === "PLANNING").length
    }
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.borehole}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/programmes", label: nav("programmes") },
          { href: "/projects", label: nav("programmesProjects") }
        ]}
      />

      <section className="border-b border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-12 md:px-8">
          <dl className="grid gap-8 sm:grid-cols-3">
            {counts.map((item) => (
              <div key={item.key} className="border-l-2 border-secondary pl-5">
                <dd className="font-serif text-h1 font-bold text-primary">
                  {formatNumber(item.value)}
                </dd>
                <dt className="mt-1 text-small text-ink-muted">
                  {t(`counts.${item.key}` as never)}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("register.eyebrow")}
            title={t("register.title")}
            description={t("register.description")}
          />
          <div className="mt-10">
            <ProjectsGrid projects={projects} />
          </div>
        </div>
      </section>
    </>
  );
}
