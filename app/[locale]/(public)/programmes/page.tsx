import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Droplets,
  GraduationCap,
  Handshake,
  IdCard,
  Milk,
  Sprout
} from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { Reveal } from "@/components/public/Reveal";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({
    locale,
    path: "/programmes",
    page: "programmes"
  });
}

/**
 * `key` addresses the `programmes` namespace; `statusKey` addresses `status`.
 * Only structure lives here — every visible string comes from messages.
 */
const programmes = [
  {
    key: "education",
    statusKey: "continuous",
    Icon: GraduationCap,
    image: IMAGES.school,
    actions: [
      { href: "/education", labelKey: "actionPrimary" },
      { href: "/education/schools", labelKey: "actionSecondary" }
    ]
  },
  {
    key: "peace",
    statusKey: "continuous",
    Icon: Handshake,
    image: IMAGES.rally,
    actions: [
      { href: "/peace-security", labelKey: "actionPrimary" },
      { href: "/peace-security#report", labelKey: "actionSecondary" }
    ]
  },
  {
    key: "water",
    statusKey: "ongoingDelivery",
    Icon: Droplets,
    image: IMAGES.borehole,
    actions: [{ href: "/projects", labelKey: "actionPrimary" }]
  },
  {
    key: "grazing",
    statusKey: "ongoingDelivery",
    Icon: Sprout,
    image: IMAGES.landscape,
    actions: [{ href: "/projects", labelKey: "actionPrimary" }]
  },
  {
    key: "livestock",
    statusKey: "ongoingDelivery",
    Icon: Milk,
    image: IMAGES.cattle,
    actions: [{ href: "/projects", labelKey: "actionPrimary" }]
  },
  {
    key: "registration",
    statusKey: "continuous",
    Icon: IdCard,
    image: IMAGES.field,
    actions: [
      { href: "/data", labelKey: "actionPrimary" },
      { href: "/resources", labelKey: "actionSecondary" }
    ]
  }
] as const;

export default async function ProgrammesPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const t = await getTranslations("programmes");
  const nav = await getTranslations("nav");
  const status = await getTranslations("status");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.dusk}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/programmes", label: nav("programmes") }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <SectionHeading
            eyebrow={t("section.eyebrow")}
            title={t("section.title")}
            description={t("section.description")}
          />

          <div className="mt-14 space-y-12">
            {programmes.map((programme, index) => {
              const label = t(`${programme.key}.label` as never);
              return (
                <Reveal key={programme.key}>
                  <article className="grid items-center gap-8 border-t border-line pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                    <div
                      className={
                        index % 2 === 1
                          ? "relative aspect-[16/10] overflow-hidden rounded-card lg:order-2"
                          : "relative aspect-[16/10] overflow-hidden rounded-card"
                      }
                    >
                      <Image
                        src={programme.image}
                        alt={label}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-btn bg-secondary-light text-secondary">
                          <programme.Icon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="rounded-full border border-line-strong bg-mist px-2.5 py-0.5 text-caption font-semibold tracking-normal text-ink-muted">
                          {status(programme.statusKey)}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-h2 font-bold text-primary">
                        {label}
                      </h3>
                      <span className="accent-rule mt-4" />
                      <p className="mt-5 text-body-lg text-ink-muted">
                        {t(`${programme.key}.body` as never)}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {programme.actions.map((action) => (
                          <Link
                            key={action.href}
                            href={action.href}
                            className="inline-flex h-11 items-center rounded-btn border border-primary px-5 text-small font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                          >
                            {t(`${programme.key}.${action.labelKey}` as never)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
