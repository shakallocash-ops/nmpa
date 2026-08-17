"use client";

import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";
import { MinistryMark } from "@/components/public/MinistryMark";
import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon
} from "@/components/public/BrandIcons";
import { Link } from "@/i18n/navigation";
import { ministry } from "@/lib/content/ministry";

export function SiteFooter({ logoUrl }: { logoUrl?: string | null }) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const gov = useTranslations("gov");
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: t("ministryColumn"),
      links: [
        { href: "/about", label: t("aboutMinistry") },
        { href: "/about#mandates", label: nav("aboutMandates") },
        { href: "/about#leadership", label: nav("aboutLeadership") },
        { href: "/departments", label: nav("departments") }
      ]
    },
    {
      heading: t("programmesColumn"),
      links: [
        { href: "/education", label: nav("programmesEducation") },
        { href: "/peace-security", label: nav("programmesPeace") },
        { href: "/projects", label: nav("programmesProjects") },
        { href: "/programmes", label: nav("programmesAll") }
      ]
    },
    {
      heading: t("resourcesColumn"),
      links: [
        { href: "/data", label: nav("resourcesData") },
        { href: "/education/schools", label: nav("resourcesSchools") },
        { href: "/resources", label: t("downloads") },
        { href: "/news", label: t("newsUpdates") },
        { href: "/gallery", label: nav("gallery") }
      ]
    }
  ];

  return (
    <footer className="bg-primary text-white/75">
      <div className="gov-stripe" />
      <div className="mx-auto max-w-content px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-start gap-4">
              <MinistryMark src={logoUrl} className="h-14 w-14 shrink-0" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {gov("government")}
                </p>
                <p className="mt-1 font-serif text-h4 font-bold leading-tight text-white">
                  {gov("ministry")}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-small leading-relaxed">
              {t("description", { date: gov("established") })}
            </p>
            <address className="mt-6 space-y-2 text-small not-italic">
              <span className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                {gov("headquarters")}
              </span>
              <span className="flex items-start gap-2.5">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <a href={`mailto:${ministry.email}`} className="hover:text-accent">
                  {ministry.email}
                </a>
              </span>
            </address>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-caption font-semibold uppercase tracking-[0.12em] text-accent">
                {column.heading}
              </h2>
              <span className="accent-rule mt-3" />
              <ul className="mt-4 space-y-2.5 text-small">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-white/10 pt-8">
          <p className="text-caption font-semibold uppercase tracking-[0.12em] text-accent">
            {t("follow")}
          </p>
          <div className="flex items-center gap-3">
            {[
              {
                href: ministry.social.facebook,
                label: "Facebook",
                Icon: FacebookIcon
              },
              {
                href: ministry.social.tiktok,
                label: "TikTok",
                Icon: TiktokIcon
              },
              {
                href: ministry.social.youtube,
                label: "YouTube",
                Icon: YoutubeIcon
              }
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-white/20 text-white/80 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-primary-dark">
        <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-5 text-caption md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {year} {gov("ministry")}, {gov("state")}. {t("rights")}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/about#accessibility" className="hover:text-accent">
              {t("accessibility")}
            </Link>
            <Link href="/contact" className="hover:text-accent">
              {t("privacy")}
            </Link>
            <NextLink href="/admin" className="hover:text-accent">
              {nav("staffLogin")}
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
