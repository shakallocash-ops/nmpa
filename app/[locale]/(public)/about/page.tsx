import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BarChart3,
  Droplets,
  GraduationCap,
  IdCard,
  Milk,
  Scale,
  Sprout
} from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { Reveal } from "@/components/public/Reveal";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Organogram } from "@/components/public/Organogram";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { ministry } from "@/lib/content/ministry";
import {
  getLocalisedLeadership,
  getLocalisedMandates
} from "@/lib/i18n/content";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/about", page: "about" });
}

const mandateIcons = [IdCard, GraduationCap, Scale, Sprout, Droplets, Milk, BarChart3];

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const t = await getTranslations("about");
  const nav = await getTranslations("nav");
  const gov = await getTranslations("gov");
  const ministryCopy = await getTranslations("ministry");
  const [mandates, leadership] = await Promise.all([
    getLocalisedMandates(),
    getLocalisedLeadership()
  ]);

  const facts = [
    { label: t("facts.established"), value: gov("established") },
    { label: t("facts.commissioner"), value: ministry.commissioner.name },
    { label: t("facts.governor"), value: ministry.governor.name },
    { label: t("facts.headquarters"), value: gov("headquarters") },
    { label: t("facts.directorates"), value: t("facts.directoratesValue") },
    { label: t("facts.coverage"), value: t("facts.coverageValue") }
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description", {
          date: gov("established"),
          state: gov("state")
        })}
        image={IMAGES.savanna}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/about", label: nav("about") }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow={t("background.eyebrow")}
                title={t("background.title")}
              />
              <div className="prose-gov mt-6 max-w-prose">
                <p>
                  {t("background.paragraph1", {
                    date: gov("established"),
                    governor: ministry.governor.name,
                    governorTitle: gov("governorTitle"),
                    state: gov("state")
                  })}
                </p>
                <p>
                  {t("background.paragraph2", {
                    commissioner: ministry.commissioner.name,
                    commissionerTitle: gov("commissionerTitle")
                  })}
                </p>
                <p>{t("background.paragraph3")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="divide-y divide-line rounded-card border border-line bg-ivory p-6">
                {facts.map((item) => (
                  <div key={item.label} className="py-3.5 first:pt-0 last:pb-0">
                    <dt className="text-caption font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-small font-medium text-primary">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: t("vision"),
                body: ministryCopy("vision"),
                accent: "border-accent"
              },
              {
                title: t("mission"),
                body: ministryCopy("mission"),
                accent: "border-secondary"
              }
            ].map((item) => (
              <Reveal key={item.title}>
                <article
                  className={`h-full rounded-card border border-line border-t-4 ${item.accent} bg-white p-7 shadow-card md:p-8`}
                >
                  <h2 className="font-serif text-h3 font-bold text-primary">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-body text-ink-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="mandates" className="scroll-mt-32 bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <SectionHeading
            eyebrow={t("mandates.eyebrow")}
            title={t("mandates.title")}
            description={t("mandates.description")}
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mandates.map((mandate, index) => {
              const Icon = mandateIcons[index] ?? IdCard;
              return (
                <li
                  key={mandate.id}
                  className="rounded-card border border-line bg-white p-6 shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-btn bg-secondary-light text-secondary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-caption font-semibold tracking-normal text-ink-faint">
                      {t("mandates.number", {
                        number: String(index + 1).padStart(2, "0")
                      })}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-h4 font-bold text-primary">
                    {mandate.title}
                  </h3>
                  <p className="mt-2.5 text-small text-ink-muted">
                    {mandate.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <SectionHeading
            eyebrow={t("organogram.eyebrow")}
            title={t("organogram.title")}
            description={t("organogram.description")}
          />
          <div className="mt-12">
            <Organogram />
          </div>
        </div>
      </section>

      <section id="leadership" className="scroll-mt-32 bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <SectionHeading
            eyebrow={t("leadership.eyebrow")}
            title={t("leadership.title")}
            description={t("leadership.description")}
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <li
                key={person.role}
                className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card"
              >
                <p className="text-caption font-semibold uppercase tracking-[0.1em] text-secondary">
                  {person.role}
                </p>
                <h3 className="mt-2 font-serif text-h4 font-bold text-primary">
                  {person.name}
                </h3>
                <span className="accent-rule mt-4" />
                <p className="mt-4 flex-1 text-small text-ink-muted">
                  {person.bio}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="accessibility"
        className="scroll-mt-32 border-t border-line bg-primary"
      >
        <div className="mx-auto grid max-w-content gap-10 px-4 py-16 md:grid-cols-[1fr_1fr] md:px-8 md:py-20">
          <div>
            <SectionHeading
              light
              eyebrow={t("accessibility.eyebrow")}
              title={t("accessibility.title")}
              description={t("accessibility.description")}
            />
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/contact">{t("accessibility.cta")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src={IMAGES.meeting}
              alt={t("accessibility.imageAlt")}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
