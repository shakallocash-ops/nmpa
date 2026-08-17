import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, Mail } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { StatusBadge } from "@/components/public/StatusBadge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { isLocale, locales } from "@/i18n/config";
import { departments } from "@/lib/content/ministry";
import { staffDirectory } from "@/lib/content/staff";
import { IMAGES } from "@/lib/content/images";
import { getPublicProjects } from "@/actions/public";
import {
  getLocalisedDepartment,
  getLocalisedDepartments
} from "@/lib/i18n/content";
import { projectTypeKey } from "@/lib/i18n/labels";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 300;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    departments.map((dept) => ({ locale, slug: dept.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const dept = await getLocalisedDepartment(params.slug);
  if (!dept) {
    return buildPageMetadata({
      locale: params.locale,
      path: `/departments/${params.slug}`,
      page: "notFound"
    });
  }
  return buildPageMetadata({
    locale: params.locale,
    path: `/departments/${params.slug}`,
    title: dept.name,
    description: dept.summary
  });
}

const heroImages: Record<string, string> = {
  administration: IMAGES.meeting,
  planning: IMAGES.field,
  education: IMAGES.school,
  peace: IMAGES.rally,
  finance: IMAGES.village
};

export default async function DepartmentPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  if (isLocale(params.locale)) setRequestLocale(params.locale);

  const dept = await getLocalisedDepartment(params.slug);
  if (!dept) notFound();

  const t = await getTranslations("departments.detail");
  const nav = await getTranslations("nav");
  const common = await getTranslations("common");
  const projectTypes = await getTranslations("projects.types");
  const [projectList, allDepartments] = await Promise.all([
    getPublicProjects(),
    getLocalisedDepartments()
  ]);
  const projects = projectList.slice(0, 3);

  // Matched against the untranslated source name so the mapping does not shift
  // between locales.
  const sourceName =
    departments.find((item) => item.slug === params.slug)?.name ?? dept.name;
  const staff = staffDirectory.filter(
    (person) =>
      person.department.toLowerCase().includes(sourceName.toLowerCase()) ||
      sourceName.toLowerCase().includes(person.department.toLowerCase())
  );

  function localisedType(typeKey: string, fallback: string) {
    const key = projectTypeKey(typeKey);
    return key ? projectTypes(key as never) : fallback;
  }

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={dept.name}
        description={dept.summary}
        image={heroImages[dept.slug] ?? IMAGES.savanna}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/departments", label: nav("departments") },
          { href: `/departments/${dept.slug}`, label: dept.name }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={t("eyebrow")}
                title={t("functionsTitle")}
              />
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {dept.functions.map((fn) => (
                  <li key={fn} className="flex gap-4 py-4">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
                      aria-hidden="true"
                    />
                    <p className="text-body text-ink-muted">{fn}</p>
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 font-serif text-h3 font-bold text-primary">
                {t("achievementsTitle")}
              </h2>
              <span className="accent-rule mt-3" />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {dept.achievements.map((item) => (
                  <li
                    key={item}
                    className="rounded-card border border-line border-l-4 border-l-accent bg-ivory p-5 text-small text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-6">
              <div className="rounded-card border border-line bg-ivory p-6">
                <h2 className="font-serif text-h4 font-bold text-primary">
                  {t("contactsTitle")}
                </h2>
                <span className="accent-rule mt-3" />
                {staff.length ? (
                  <ul className="mt-5 space-y-4">
                    {staff.map((person) => (
                      <li
                        key={person.email}
                        className="border-b border-line pb-4 last:border-b-0 last:pb-0"
                      >
                        <p className="text-small font-medium text-primary">
                          {person.role}
                        </p>
                        <p className="mt-0.5 text-caption tracking-normal text-ink-faint">
                          {person.name}
                        </p>
                        <a
                          href={`mailto:${person.email}`}
                          className="mt-2 inline-flex items-center gap-2 text-small text-secondary hover:text-primary"
                        >
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          {person.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-small text-ink-muted">
                    {t("contactsEmpty")}
                  </p>
                )}
                <Button asChild variant="secondary" className="mt-6 w-full">
                  <Link href="/contact">{t("contactsCta")}</Link>
                </Button>
              </div>

              <nav
                aria-label={t("otherAria")}
                className="rounded-card border border-line bg-white p-6 shadow-card"
              >
                <h2 className="font-serif text-h4 font-bold text-primary">
                  {t("otherTitle")}
                </h2>
                <span className="accent-rule mt-3" />
                <ul className="mt-5 space-y-2.5">
                  {allDepartments
                    .filter((item) => item.slug !== dept.slug)
                    .map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/departments/${item.slug}`}
                          className="text-small text-ink-muted hover:text-secondary"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("relatedEyebrow")}
            title={t("relatedTitle")}
            description={t("relatedDescription")}
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <StatusBadge status={project.status} className="self-start" />
                  <span className="mt-3 block font-serif text-h4 font-bold text-primary group-hover:text-secondary">
                    {project.title}
                  </span>
                  <span className="mt-2 block text-caption tracking-normal text-ink-faint">
                    {project.lga} {common("lgaShort")} ·{" "}
                    {localisedType(project.typeKey, project.type)}
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
