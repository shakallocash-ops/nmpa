"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { ChevronDown, Lock, Menu, X } from "lucide-react";
import { LocaleSwitcher } from "@/components/public/LocaleSwitcher";
import { MinistryMark } from "@/components/public/MinistryMark";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NavChild = { href: string; label: string };
type NavItem = { href: string; label: string; children?: NavChild[] };

export function SiteHeader({ logoUrl }: { logoUrl?: string | null }) {
  const t = useTranslations("nav");
  const gov = useTranslations("gov");
  const tLang = useTranslations("language");
  const dept = useTranslations("ministry.departments");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onClickAway(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickAway);
    };
  }, []);

  const nav: NavItem[] = [
    { href: "/", label: t("home") },
    {
      href: "/about",
      label: t("about"),
      children: [
        { href: "/about", label: t("aboutOverview") },
        { href: "/about#mandates", label: t("aboutMandates") },
        { href: "/about#leadership", label: t("aboutLeadership") }
      ]
    },
    {
      href: "/departments",
      label: t("departments"),
      children: [
        { href: "/departments", label: t("departmentsAll") },
        { href: "/departments/administration", label: dept("administration.name") },
        { href: "/departments/planning", label: dept("planning.name") },
        { href: "/departments/education", label: dept("education.name") },
        { href: "/departments/peace", label: dept("peace.name") },
        { href: "/departments/finance", label: dept("finance.name") }
      ]
    },
    {
      href: "/programmes",
      label: t("programmes"),
      children: [
        { href: "/programmes", label: t("programmesAll") },
        { href: "/education", label: t("programmesEducation") },
        { href: "/peace-security", label: t("programmesPeace") },
        { href: "/projects", label: t("programmesProjects") }
      ]
    },
    {
      href: "/resources",
      label: t("resources"),
      children: [
        { href: "/resources", label: t("resourcesDownloads") },
        { href: "/data", label: t("resourcesData") },
        { href: "/education/schools", label: t("resourcesSchools") }
      ]
    },
    { href: "/news", label: t("news") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") }
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-header">
      <div className="gov-stripe" />

      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-1.5 md:px-8">
          <p className="eyebrow text-[11px] text-white/85">{gov("government")}</p>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <NextLink
              href="/admin"
              className="hidden items-center gap-1.5 text-[11px] font-medium text-white/85 hover:text-accent sm:inline-flex"
            >
              <Lock className="h-3 w-3" aria-hidden="true" />
              {t("staffLogin")}
            </NextLink>
          </div>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-4 py-4 md:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 md:gap-4"
            aria-label={t("homeAria")}
          >
            <MinistryMark
              src={logoUrl}
              className="h-11 w-11 shrink-0 md:h-14 md:w-14"
            />
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                {gov("government")}
              </span>
              <span className="block truncate font-serif text-[15px] font-bold leading-tight text-primary md:text-[19px]">
                {gov("ministry")}
              </span>
              <span className="hidden text-caption text-ink-faint md:block">
                {gov("place")}
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong text-primary lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        ref={navRef}
        aria-label={t("mainNavLabel")}
        className="hidden border-b-[3px] border-primary bg-ivory lg:block"
      >
        <div className="mx-auto flex max-w-content items-stretch px-4 md:px-8">
          {nav.map((item) => {
            const active = isActive(item.href);
            const open = openMenu === item.href;
            return (
              <div key={item.href} className="relative">
                {item.children ? (
                  <button
                    type="button"
                    onClick={() => setOpenMenu(open ? null : item.href)}
                    onMouseEnter={() => setOpenMenu(item.href)}
                    aria-expanded={open}
                    className={cn(
                      "flex h-full items-center gap-1.5 border-b-[3px] px-4 py-3.5 text-small font-semibold transition-colors",
                      active
                        ? "border-accent text-primary"
                        : "border-transparent text-ink-muted hover:border-accent/50 hover:text-primary"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        open && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onMouseEnter={() => setOpenMenu(null)}
                    className={cn(
                      "flex h-full items-center border-b-[3px] px-4 py-3.5 text-small font-semibold transition-colors",
                      active
                        ? "border-accent text-primary"
                        : "border-transparent text-ink-muted hover:border-accent/50 hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {item.children && open ? (
                  <div
                    onMouseLeave={() => setOpenMenu(null)}
                    className="absolute left-0 top-full z-30 w-72 border-x border-b border-line bg-white py-2 shadow-card-hover"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block border-l-2 border-transparent px-4 py-2.5 text-small text-ink-muted hover:border-accent hover:bg-ivory hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>

      {mobileOpen ? (
        <nav
          id="mobile-navigation"
          aria-label={t("mainNavLabel")}
          className="max-h-[75vh] overflow-y-auto border-b-[3px] border-primary bg-ivory lg:hidden"
        >
          <div className="px-4 py-2">
            {nav.map((item) => (
              <div key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  className={cn(
                    "block py-3 text-small font-semibold",
                    isActive(item.href) ? "text-primary" : "text-ink-muted"
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="pb-3">
                    {item.children.slice(1).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block border-l-2 border-line py-2 pl-3 text-small text-ink-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            <div className="border-t border-line py-4">
              <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ink-faint">
                {tLang("label")}
              </p>
              <LocaleSwitcher variant="panel" />
            </div>

            <NextLink
              href="/admin"
              className="flex items-center gap-2 border-t border-line py-4 text-small font-semibold text-secondary"
            >
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              {t("staffLogin")}
            </NextLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
