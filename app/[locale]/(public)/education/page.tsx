import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookOpen, MapPin, School, Users } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { Reveal } from "@/components/public/Reveal";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { getPublicSchools } from "@/actions/public";
import { getFormatters } from "@/lib/i18n/server-format";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 300;

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return buildPageMetadata({ locale, path: "/education", page: "education" });
}

export default async function EducationPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (isLocale(locale)) setRequestLocale(locale);

  const schools = await getPublicSchools();
  const t = await getTranslations("education");
  const nav = await getTranslations("nav");
  const { formatNumber } = await getFormatters();

  const viable = schools.filter((school) => school.status === "VIABLE").length;
  const enrolment = schools.reduce(
    (sum, school) => sum + school.enrolmentMale + school.enrolmentFemale,
    0
  );
  const teachers = schools.reduce(
    (sum, school) => sum + school.teachersMale + school.teachersFemale,
    0
  );

  const figures = [
    { key: "schools", value: schools.length, Icon: School },
    { key: "viable", value: viable, Icon: MapPin },
    { key: "enrolment", value: enrolment, Icon: Users },
    { key: "teachers", value: teachers, Icon: BookOpen }
  ] as const;

  const points = t.raw("programme.points") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        image={IMAGES.school}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/programmes", label: nav("programmes") },
          { href: "/education", label: nav("programmesEducation") }
        ]}
      />

      <section className="border-b border-line bg-ivory">
        <div className="mx-auto max-w-content px-4 py-12 md:px-8">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {figures.map(({ key, value, Icon }) => (
              <div key={key} className="border-l-2 border-secondary pl-5">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <dd className="mt-3 font-serif text-h1 font-bold text-primary">
                  {formatNumber(value)}
                </dd>
                <dt className="mt-1 text-small text-ink-muted">
                  {t(`figures.${key}` as never)}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow={t("programme.eyebrow")}
                title={t("programme.title")}
              />
              <div className="prose-gov mt-6">
                <p>{t("programme.paragraph1")}</p>
                <p>{t("programme.paragraph2")}</p>
              </div>
              <ul className="mt-8 space-y-3">
                {points.map((item) => (
                  <li key={item} className="flex gap-3 text-small text-ink-muted">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/education/schools">
                    {t("programme.ctaRegister")}
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/departments/education">
                    {t("programme.ctaDepartment")}
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-card">
                  <Image
                    src={IMAGES.classroom}
                    alt={t("programme.classroomAlt")}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-card">
                  <Image
                    src={IMAGES.children}
                    alt={t("programme.pupilsAlt")}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-primary">
        <div className="mx-auto flex max-w-content flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent">{t("band.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-h3 font-bold text-white">
              {t("band.title")}
            </h2>
            <p className="mt-2.5 text-small text-white/75">
              {t("band.description")}
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href="/education/schools">{t("band.cta")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
