import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { StatusBadge } from "@/components/public/StatusBadge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/config";
import { getPublicProject, getPublicProjects } from "@/actions/public";
import { localiseProjects } from "@/lib/i18n/records";
import { getFormatters } from "@/lib/i18n/server-format";
import { projectTypeKey } from "@/lib/i18n/labels";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 120;

export async function generateMetadata({
  params
}: {
  params: { locale: string; id: string };
}) {
  const raw = await getPublicProject(params.id);
  const [project] = raw ? await localiseProjects([raw]) : [null];
  if (!project) {
    return buildPageMetadata({
      locale: params.locale,
      path: `/projects/${params.id}`,
      page: "notFound"
    });
  }
  return buildPageMetadata({
    locale: params.locale,
    path: `/projects/${project.id}`,
    title: project.title,
    description: project.description,
    images: [project.image]
  });
}

export default async function ProjectDetailPage({
  params
}: {
  params: { locale: string; id: string };
}) {
  if (isLocale(params.locale)) setRequestLocale(params.locale);

  const raw = await getPublicProject(params.id);
  if (!raw) notFound();
  const [project] = await localiseProjects([raw]);

  const t = await getTranslations("projects.detail");
  const nav = await getTranslations("nav");
  const common = await getTranslations("common");
  const types = await getTranslations("projects.types");
  const { formatDate, formatMoney } = await getFormatters();

  const others = (await localiseProjects(await getPublicProjects()))
    .filter((item) => item.id !== project.id)
    .slice(0, 3);

  function typeLabel(key: string, fallback: string) {
    const messageKey = projectTypeKey(key);
    return messageKey ? types(messageKey as never) : fallback;
  }

  const projectType = typeLabel(project.typeKey, project.type);

  const facts = [
    { key: "lga", value: `${project.lga} ${common("lgaShort")}` },
    { key: "type", value: projectType },
    {
      key: "budget",
      value: project.budget ? formatMoney(project.budget) : common("notPublished")
    },
    {
      key: "commenced",
      value: project.startDate
        ? formatDate(project.startDate)
        : common("notPublished")
    },
    {
      key: "completed",
      value: project.endDate ? formatDate(project.endDate) : t("inProgress")
    }
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={`${projectType} · ${project.lga} ${common("lgaShort")}`}
        title={project.title}
        image={project.image}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/projects", label: nav("programmesProjects") },
          { href: `/projects/${project.id}`, label: project.title }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <StatusBadge status={project.status} />
              <h2 className="mt-6 font-serif text-h2 font-bold text-primary">
                {t("descriptionTitle")}
              </h2>
              <span className="accent-rule mt-4" />
              <p className="mt-5 text-body-lg text-ink-muted">
                {project.description}
              </p>

              <h2 className="mt-12 font-serif text-h3 font-bold text-primary">
                {t("impactTitle")}
              </h2>
              <span className="accent-rule mt-3" />
              <p className="mt-5 rounded-card border border-line border-l-4 border-l-secondary bg-secondary-light/60 p-6 text-body text-ink-muted">
                {project.impact}
              </p>

              {project.timeline.length ? (
                <>
                  <h2 className="mt-12 font-serif text-h3 font-bold text-primary">
                    {t("timelineTitle")}
                  </h2>
                  <span className="accent-rule mt-3" />
                  <ol className="mt-6 border-l-2 border-line">
                    {project.timeline.map((entry) => (
                      <li
                        key={`${entry.date}-${entry.title}`}
                        className="relative pb-8 pl-8 last:pb-0"
                      >
                        <span
                          className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent"
                          aria-hidden="true"
                        />
                        <p className="text-caption font-semibold tracking-[0.1em] text-secondary">
                          {entry.date}
                        </p>
                        <h3 className="mt-1.5 font-serif text-h4 font-bold text-primary">
                          {entry.title}
                        </h3>
                        <p className="mt-1.5 text-small text-ink-muted">
                          {entry.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </>
              ) : null}
            </div>

            <aside>
              <dl className="rounded-card border border-line bg-ivory p-6">
                {facts.map((fact) => (
                  <div
                    key={fact.key}
                    className="border-b border-line py-3.5 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-caption font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      {t(fact.key as never)}
                    </dt>
                    <dd className="mt-1 text-small font-medium text-primary">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <Button asChild variant="secondary" className="mt-6 w-full">
                <Link href="/projects">{t("back")}</Link>
              </Button>
            </aside>
          </div>

          {project.gallery.length ? (
            <div className="mt-16">
              <h2 className="font-serif text-h3 font-bold text-primary">
                {t("galleryTitle")}
              </h2>
              <span className="accent-rule mt-3" />
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((src, index) => (
                  <li key={`${src}-${index}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line">
                      <Image
                        src={src}
                        alt={t("galleryAlt", {
                          title: project.title,
                          index: index + 1
                        })}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {others.length ? (
        <section className="border-t border-line bg-ivory">
          <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
            <SectionHeading
              eyebrow={t("othersEyebrow")}
              title={t("othersTitle")}
            />
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/projects/${item.id}`}
                    className="group flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <StatusBadge status={item.status} className="self-start" />
                    <span className="mt-3 block font-serif text-h4 font-bold text-primary group-hover:text-secondary">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-caption tracking-normal text-ink-faint">
                      {item.lga} {common("lgaShort")} ·{" "}
                      {typeLabel(item.typeKey, item.type)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
