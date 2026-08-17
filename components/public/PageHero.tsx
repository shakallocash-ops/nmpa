import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  crumbs?: Array<{ href: string; label: string }>;
}) {
  const t = await getTranslations("nav");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70"
          aria-hidden="true"
        />
        <div
          className="pattern-lattice absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          {eyebrow ? <p className="eyebrow text-accent">{eyebrow}</p> : null}
          <h1 className="mt-3 max-w-4xl font-serif text-h1 font-bold text-white">
            {title}
          </h1>
          <span className="accent-rule mt-5" />
          {description ? (
            <p className="mt-5 max-w-2xl text-body-lg text-white/80">
              {description}
            </p>
          ) : null}
        </div>
      </section>

      {crumbs?.length ? (
        <nav
          aria-label={t("breadcrumbLabel")}
          className="border-b border-line bg-ivory"
        >
          <ol className="mx-auto flex max-w-content flex-wrap items-center gap-1 px-4 py-3 text-caption text-ink-muted md:px-8">
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-1">
                  {index > 0 ? (
                    <ChevronRight
                      className="h-3.5 w-3.5 text-line-strong"
                      aria-hidden="true"
                    />
                  ) : null}
                  {last ? (
                    <span
                      aria-current="page"
                      className="font-semibold text-primary"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-secondary">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
    </>
  );
}
