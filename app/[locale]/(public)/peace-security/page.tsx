import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/public/PageHero";
import { Reveal } from "@/components/public/Reveal";
import { SectionHeading } from "@/components/public/SectionHeading";
import { CommitteeList } from "@/components/public/CommitteeList";
import { ConflictReportForm } from "@/components/public/ConflictReportForm";
import { ConflictTrendChart } from "@/components/public/ConflictTrendChart";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { peaceStories, peaceTimeline, rallyGallery } from "@/lib/content/peace";
import { getFormatters } from "@/lib/i18n/server-format";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import {
  getPublicCommittee,
  getPublicConflictDashboard
} from "@/actions/public";

export const revalidate = 120;

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({
    locale,
    path: "/peace-security",
    page: "peace"
  });
}

export default async function PeaceSecurityPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const [dashboard, committee] = await Promise.all([
    getPublicConflictDashboard(),
    getPublicCommittee()
  ]);

  const t = await getTranslations("peace");
  const nav = await getTranslations("nav");
  const common = await getTranslations("common");
  const { formatNumber, formatDate } = await getFormatters();

  const cards = [
    { key: "total", value: dashboard.total, accent: "border-l-primary" },
    { key: "resolved", value: dashboard.resolved, accent: "border-l-success" },
    { key: "mediation", value: dashboard.mediation, accent: "border-l-warning" },
    { key: "pending", value: dashboard.pending, accent: "border-l-line-strong" }
  ] as const;

  const stories = t.raw("stories") as Array<{ title: string; body: string }>;
  const timeline = t.raw("timeline") as Array<{ title: string; body: string }>;
  const rallyCaptions = t.raw("rallies.captions") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.rally}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/programmes", label: nav("programmes") },
          { href: "/peace-security", label: nav("programmesPeace") }
        ]}
      />

      {/* Dashboard */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("dashboard.eyebrow")}
            title={t("dashboard.title")}
            description={t("dashboard.description")}
          />

          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.key}
                className={`rounded-card border border-line border-l-4 ${card.accent} bg-white p-6 shadow-card`}
              >
                <dd className="font-serif text-h1 font-bold text-primary">
                  {formatNumber(card.value)}
                </dd>
                <dt className="mt-1 text-small text-ink-muted">
                  {t(`dashboard.${card.key}` as never)}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-10 rounded-card border border-line bg-white p-6 shadow-card md:p-8">
            <h3 className="font-serif text-h4 font-bold text-primary">
              {t("trend.title")}
            </h3>
            <p className="mt-1.5 text-small text-ink-muted">
              {t("trend.description")}
            </p>
            <div className="mt-6">
              <ConflictTrendChart data={dashboard.trend} />
            </div>
          </div>

          {dashboard.recent.length ? (
            <div className="mt-10">
              <h3 className="font-serif text-h3 font-bold text-primary">
                {t("recent.title")}
              </h3>
              <span className="accent-rule mt-3" />
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {dashboard.recent.map((item) => (
                  <li key={item.id} className="py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-serif text-h4 font-bold text-primary">
                        {item.title}
                      </p>
                      <span className="text-caption tracking-normal text-ink-faint">
                        {item.lga} {common("lgaShort")} ·{" "}
                        {formatDate(item.resolvedAt)}
                      </span>
                    </div>
                    {item.resolution ? (
                      <p className="mt-2 text-small text-ink-muted">
                        {item.resolution}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12">
            <h3 className="font-serif text-h3 font-bold text-primary">
              {t("settlements.title")}
            </h3>
            <span className="accent-rule mt-3" />
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {peaceStories.map((story, index) => (
                <li
                  key={story.lga}
                  className="rounded-card border border-line bg-ivory p-6"
                >
                  <p className="text-caption font-semibold tracking-normal text-secondary">
                    {story.lga} {common("lgaShort")}
                  </p>
                  <h4 className="mt-2 font-serif text-h4 font-bold text-primary">
                    {stories[index]?.title ?? story.title}
                  </h4>
                  <p className="mt-3 text-small text-ink-muted">
                    {stories[index]?.body ?? story.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="border-y border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("committees.eyebrow")}
            title={t("committees.title")}
            description={t("committees.description")}
          />
          <div className="mt-10">
            <CommitteeList groups={committee} />
          </div>
        </div>
      </section>

      {/* Rallies & timeline */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("rallies.eyebrow")}
            title={t("rallies.title")}
            description={t("rallies.description")}
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rallyGallery.map((item, index) => {
              const caption = rallyCaptions[index] ?? item.caption;
              return (
                <li key={item.src}>
                  <figure className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.src}
                        alt={caption}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <figcaption className="p-4 text-small text-ink-muted">
                      {caption}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>

          <ol className="mt-14 border-l-2 border-line">
            {peaceTimeline.map((entry, index) => (
              <li
                key={`${entry.year}-${index}`}
                className="relative pb-10 pl-8 last:pb-0"
              >
                <span
                  className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent"
                  aria-hidden="true"
                />
                <p className="text-caption font-semibold tracking-[0.1em] text-secondary">
                  {entry.year}
                </p>
                <h3 className="mt-1.5 font-serif text-h4 font-bold text-primary">
                  {timeline[index]?.title ?? entry.title}
                </h3>
                <p className="mt-2 max-w-3xl text-small text-ink-muted">
                  {timeline[index]?.body ?? entry.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Report */}
      <section id="report" className="scroll-mt-32 border-t border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow={t("report.eyebrow")}
                title={t("report.title")}
                description={t("report.description")}
              />
              <ul className="mt-8 space-y-3 text-small text-ink-muted">
                {(t.raw("report.steps") as string[]).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <ConflictReportForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
