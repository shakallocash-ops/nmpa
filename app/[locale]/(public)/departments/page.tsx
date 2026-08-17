import { getTranslations, setRequestLocale } from "next-intl/server";
import { BarChart3, Building2, GraduationCap, Landmark, Scale } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { Reveal } from "@/components/public/Reveal";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { getLocalisedDepartments } from "@/lib/i18n/content";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({
    locale,
    path: "/departments",
    page: "departments"
  });
}

const icons: Record<string, typeof Building2> = {
  administration: Building2,
  planning: BarChart3,
  education: GraduationCap,
  peace: Scale,
  finance: Landmark
};

export default async function DepartmentsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const t = await getTranslations("departments");
  const nav = await getTranslations("nav");
  const departments = await getLocalisedDepartments();

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.landscape}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/departments", label: nav("departments") }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <ul className="grid gap-6 md:grid-cols-2">
            {departments.map((dept, index) => {
              const Icon = icons[dept.slug] ?? Building2;
              return (
                <li key={dept.slug}>
                  <Reveal delay={index * 0.04}>
                    <Link
                      href={`/departments/${dept.slug}`}
                      className="group flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover md:p-8"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-btn bg-secondary-light text-secondary">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="text-caption font-semibold tracking-normal text-ink-faint">
                          {t("directorateNumber", {
                            number: String(index + 1).padStart(2, "0")
                          })}
                        </span>
                      </div>
                      <h2 className="mt-5 font-serif text-h3 font-bold text-primary group-hover:text-secondary">
                        {dept.name}
                      </h2>
                      <span className="accent-rule mt-4" />
                      <p className="mt-4 text-body text-ink-muted">
                        {dept.summary}
                      </p>
                      <ul className="mt-5 flex-1 space-y-2">
                        {dept.functions.slice(0, 3).map((fn) => (
                          <li
                            key={fn}
                            className="flex gap-2.5 text-small text-ink-muted"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            {fn}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-6 text-small font-semibold text-secondary">
                        {t("viewDepartment")} →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
