import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Building2,
  FileBarChart,
  GraduationCap,
  Handshake,
  Mail,
  Newspaper
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const services = [
  { key: "departments", href: "/departments", Icon: Building2 },
  { key: "schools", href: "/education/schools", Icon: GraduationCap },
  { key: "report", href: "/peace-security#report", Icon: Handshake },
  { key: "projects", href: "/projects", Icon: FileBarChart },
  { key: "news", href: "/news", Icon: Newspaper },
  { key: "contact", href: "/contact", Icon: Mail }
] as const;

export async function QuickAccess() {
  const t = await getTranslations("home.quickAccess");

  return (
    <section aria-labelledby="quick-access" className="bg-white">
      <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-secondary">{t("eyebrow")}</p>
            <h2
              id="quick-access"
              className="mt-3 font-serif text-h2 font-bold text-primary"
            >
              {t("title")}
            </h2>
            <span className="accent-rule mt-4" />
          </div>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, href, Icon }) => (
            <li key={key}>
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-card border border-line bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-secondary-light text-secondary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-center gap-2 font-serif text-h4 font-bold text-primary">
                    {t(key)}
                    <ArrowRight
                      className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1.5 block text-small text-ink-muted">
                    {t(`${key}Description`)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
