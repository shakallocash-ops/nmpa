import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon
} from "@/components/public/BrandIcons";
import { PageHero } from "@/components/public/PageHero";
import { Reveal } from "@/components/public/Reveal";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ContactForm, StaffSearch } from "@/components/public/ContactForm";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { ministry } from "@/lib/content/ministry";
import { getLocalisedStaffDirectory } from "@/lib/i18n/content";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/contact", page: "contact" });
}

const socials = [
  { href: ministry.social.twitter, label: "X (Twitter)", Icon: TwitterIcon },
  { href: ministry.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: ministry.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: ministry.social.youtube, label: "YouTube", Icon: YoutubeIcon }
];

export default async function ContactPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");
  const gov = await getTranslations("gov");
  const staff = await getLocalisedStaffDirectory();

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.meeting}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/contact", label: nav("contact") }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow={t("enquiries.eyebrow")}
                title={t("enquiries.title")}
                description={t("enquiries.description")}
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-6">
                <div className="rounded-card border border-line bg-ivory p-6 md:p-7">
                  <h2 className="font-serif text-h4 font-bold text-primary">
                    {t("hq.title")}
                  </h2>
                  <span className="accent-rule mt-3" />
                  <address className="mt-5 space-y-4 text-small not-italic text-ink-muted">
                    <span className="flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <span>
                        {ministry.headquarters}
                        <br />
                        {gov("country")}
                      </span>
                    </span>
                    <span className="flex items-start gap-3">
                      <Mail
                        className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <a
                        href={`mailto:${ministry.email}`}
                        className="link-underline text-primary"
                      >
                        {ministry.email}
                      </a>
                    </span>
                    <span className="flex items-start gap-3">
                      <Clock
                        className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <span>
                        {t("hq.hours")}
                        <br />
                        {t("hq.closed")}
                      </span>
                    </span>
                  </address>
                  <p className="mt-5 border-t border-line pt-4 text-caption tracking-normal text-ink-faint">
                    {t("hq.phoneNote")}
                  </p>
                </div>

                <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                  <iframe
                    title={t("map.title")}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=6.44%2C9.55%2C6.61%2C9.68&layer=mapnik"
                    className="h-72 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <p className="border-t border-line px-5 py-3 text-caption tracking-normal text-ink-faint">
                    {t("map.caption")}
                  </p>
                </div>

                <div className="rounded-card border border-line bg-white p-6 shadow-card">
                  <h2 className="font-serif text-h4 font-bold text-primary">
                    {t("channels.title")}
                  </h2>
                  <span className="accent-rule mt-3" />
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {socials.map(({ href, label, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          aria-label={label}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong text-primary transition-colors hover:border-primary hover:bg-ivory"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow={t("directory.eyebrow")}
            title={t("directory.title")}
            description={t("directory.description")}
          />
          <div className="mt-10">
            <StaffSearch people={staff} />
          </div>
        </div>
      </section>
    </>
  );
}
