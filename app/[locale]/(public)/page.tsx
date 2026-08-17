import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BarChart3,
  Building2,
  Droplets,
  GraduationCap,
  IdCard,
  Landmark,
  Milk,
  Scale,
  Sprout
} from "lucide-react";
import { Hero } from "@/components/public/Hero";
import { HomeStats } from "@/components/public/HomeStats";
import { QuickAccess } from "@/components/public/QuickAccess";
import { Reveal } from "@/components/public/Reveal";
import { SectionHeading, TextLink } from "@/components/public/SectionHeading";
import { StatusBadge } from "@/components/public/StatusBadge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/config";
import { ministry } from "@/lib/content/ministry";
import { IMAGES } from "@/lib/content/images";
import { getBranding } from "@/lib/branding";
import { getPublicProjects, getPublicStats } from "@/actions/public";
import {
  getLocalisedDepartments,
  getLocalisedMandates
} from "@/lib/i18n/content";
import {
  getLocalisedNewsPosts,
  localiseProjects
} from "@/lib/i18n/records";
import { getFormatters } from "@/lib/i18n/server-format";
import { newsCategoryKey, projectTypeKey } from "@/lib/i18n/labels";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 60;

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/", page: "home" });
}

const mandateIcons = [IdCard, GraduationCap, Scale, Sprout, Droplets, Milk, BarChart3];

const departmentIcons: Record<string, typeof Building2> = {
  administration: Building2,
  planning: BarChart3,
  education: GraduationCap,
  peace: Scale,
  finance: Landmark
};

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const [stats, allProjects, mandates, departments, formatters, news, branding] =
    await Promise.all([
      getPublicStats(),
      getPublicProjects(),
      getLocalisedMandates(),
      getLocalisedDepartments(),
      getFormatters(),
      getLocalisedNewsPosts(),
      getBranding()
    ]);
  const localisedProjects = await localiseProjects(allProjects);

  const t = await getTranslations("home");
  const gov = await getTranslations("gov");
  const ministryCopy = await getTranslations("ministry");
  const common = await getTranslations("common");
  const projectTypes = await getTranslations("projects.types");
  const newsCategories = await getTranslations("news.categories");

  const projects = localisedProjects.slice(0, 3);
  const [featured, ...recent] = news;
  const { formatDate } = formatters;

  function localisedType(typeKey: string, fallback: string) {
    const key = projectTypeKey(typeKey);
    return key ? projectTypes(key as never) : fallback;
  }

  function localisedCategory(category: string) {
    const key = newsCategoryKey(category);
    return key ? newsCategories(key as never) : category;
  }

  return (
    <>
      <Hero />
      <QuickAccess />
      <HomeStats stats={stats} />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                <Image
                  src={branding.homeAboutUrl ?? IMAGES.cattle}
                  alt={t("intro.imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading
                eyebrow={t("intro.eyebrow")}
                title={t("intro.title")}
              />
              <div className="prose-gov mt-6">
                <p>
                  {t("intro.paragraph1", {
                    date: gov("established"),
                    state: gov("state")
                  })}
                </p>
                <p>{ministryCopy("mission")}</p>
              </div>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="border-t-2 border-accent pt-4">
                  <dt className="text-caption font-semibold uppercase tracking-[0.1em] text-ink-faint">
                    {t("intro.commissionerLabel")}
                  </dt>
                  <dd className="mt-1 font-serif text-h4 font-bold text-primary">
                    {ministry.commissioner.name}
                  </dd>
                </div>
                <div className="border-t-2 border-secondary pt-4">
                  <dt className="text-caption font-semibold uppercase tracking-[0.1em] text-ink-faint">
                    {t("intro.establishedLabel")}
                  </dt>
                  <dd className="mt-1 font-serif text-h4 font-bold text-primary">
                    {gov("established")}
                  </dd>
                </div>
              </dl>
              <div className="mt-8">
                <Button asChild variant="secondary">
                  <Link href="/about">{t("intro.cta")}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-primary">
        <div
          className="pattern-lattice absolute inset-0 opacity-30"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <SectionHeading
            light
            eyebrow={t("mandates.eyebrow")}
            title={t("mandates.title")}
            description={t("mandates.description")}
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {mandates.map((mandate, index) => {
              const Icon = mandateIcons[index] ?? IdCard;
              return (
                <li key={mandate.id} className="bg-primary p-6">
                  <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-h4 font-bold text-white">
                    {mandate.title}
                  </h3>
                  <p className="mt-2.5 text-small text-white/70">
                    {mandate.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t("departments.eyebrow")}
              title={t("departments.title")}
              description={t("departments.description")}
            />
            <TextLink href="/departments">{t("departments.viewAll")}</TextLink>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => {
              const Icon = departmentIcons[dept.slug] ?? Building2;
              return (
                <li key={dept.slug}>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="group flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover"
                  >
                    <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                    <h3 className="mt-4 font-serif text-h4 font-bold text-primary group-hover:text-secondary">
                      {dept.name}
                    </h3>
                    <p className="mt-2.5 flex-1 text-small text-ink-muted">
                      {dept.summary}
                    </p>
                    <span className="mt-5 text-small font-semibold text-secondary">
                      {t("departments.viewDepartment")} →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t("projects.eyebrow")}
              title={t("projects.title")}
            />
            <TextLink href="/projects">{t("projects.viewAll")}</TextLink>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-mist">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={project.status} />
                      <span className="text-caption tracking-normal text-ink-faint">
                        {project.lga} {common("lgaShort")} ·{" "}
                        {localisedType(project.typeKey, project.type)}
                      </span>
                    </span>
                    <span className="mt-3 block font-serif text-h4 font-bold text-primary group-hover:text-secondary">
                      {project.title}
                    </span>
                    <span className="mt-2 line-clamp-3 block text-small text-ink-muted">
                      {project.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-secondary-light">
        <div className="mx-auto flex max-w-content flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-secondary">{t("peaceBand.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-h3 font-bold text-primary">
              {t("peaceBand.title")}
            </h2>
            <p className="mt-2.5 text-small text-ink-muted">
              {t("peaceBand.description")}
            </p>
          </div>
          <Button asChild size="lg" variant="green" className="shrink-0">
            <Link href="/peace-security#report">{t("peaceBand.cta")}</Link>
          </Button>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t("news.eyebrow")}
              title={t("news.title")}
            />
            <TextLink href="/news">{t("news.viewAll")}</TextLink>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <article>
              <Link href={`/news/${featured.slug}`} className="group block">
                <span className="relative block aspect-[16/9] overflow-hidden rounded-card bg-mist">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </span>
                <span className="mt-5 flex items-center gap-3">
                  <span className="rounded-full bg-secondary-light px-2.5 py-0.5 text-caption font-semibold tracking-normal text-secondary">
                    {localisedCategory(featured.category)}
                  </span>
                  <time
                    dateTime={featured.date}
                    className="text-caption tracking-normal text-ink-faint"
                  >
                    {formatDate(featured.date)}
                  </time>
                </span>
                <h3 className="mt-3 font-serif text-h2 font-bold text-primary group-hover:text-secondary">
                  {featured.title}
                </h3>
                <p className="mt-3 text-body text-ink-muted">
                  {featured.excerpt}
                </p>
                <span className="mt-4 inline-block text-small font-semibold text-secondary">
                  {common("readMore")} →
                </span>
              </Link>
            </article>

            <ul className="divide-y divide-line border-t border-line">
              {recent.map((post) => (
                <li key={post.slug}>
                  <Link href={`/news/${post.slug}`} className="group block py-5">
                    <span className="flex items-center gap-3">
                      <span className="text-caption font-semibold tracking-normal text-secondary">
                        {localisedCategory(post.category)}
                      </span>
                      <time
                        dateTime={post.date}
                        className="text-caption tracking-normal text-ink-faint"
                      >
                        {formatDate(post.date)}
                      </time>
                    </span>
                    <span className="mt-1.5 block font-serif text-h4 font-bold text-primary group-hover:text-secondary">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
