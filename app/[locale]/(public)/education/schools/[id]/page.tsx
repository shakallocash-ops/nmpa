import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/public/PageHero";
import { StatusBadge } from "@/components/public/StatusBadge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";
import { getPublicSchool } from "@/actions/public";
import { getFormatters } from "@/lib/i18n/server-format";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: { locale: string; id: string };
}) {
  const school = await getPublicSchool(params.id);
  if (!school) {
    return buildPageMetadata({
      locale: params.locale,
      path: `/education/schools/${params.id}`,
      page: "notFound"
    });
  }
  const t = await getTranslations({
    locale: params.locale,
    namespace: "schools.detail"
  });
  return buildPageMetadata({
    locale: params.locale,
    path: `/education/schools/${school.id}`,
    title: school.name,
    description: t("metaDescription", { name: school.name, lga: school.lga })
  });
}

export default async function SchoolDetailPage({
  params
}: {
  params: { locale: string; id: string };
}) {
  if (isLocale(params.locale)) setRequestLocale(params.locale);

  const school = await getPublicSchool(params.id);
  if (!school) notFound();

  const t = await getTranslations("schools.detail");
  const nav = await getTranslations("nav");
  const common = await getTranslations("common");
  const { formatNumber } = await getFormatters();

  const enrolment = school.enrolmentMale + school.enrolmentFemale;
  const teachers = school.teachersMale + school.teachersFemale;
  const classrooms = school.classroomsGood + school.classroomsBad;

  const records = [
    { key: "lga", value: `${school.lga} ${common("lgaShort")}` },
    { key: "zone", value: `${common("zone")} ${school.zone}` },
    { key: "enrolmentTotal", value: formatNumber(enrolment) },
    {
      key: "enrolmentBySex",
      value: t("bySexLong", {
        male: school.enrolmentMale,
        female: school.enrolmentFemale
      })
    },
    { key: "teachersTotal", value: formatNumber(teachers) },
    {
      key: "teachersBySex",
      value: t("bySexLong", {
        male: school.teachersMale,
        female: school.teachersFemale
      })
    },
    { key: "classrooms", value: t("classroomsTotal", { count: classrooms }) },
    {
      key: "classroomCondition",
      value: t("classroomsCondition", {
        good: school.classroomsGood,
        bad: school.classroomsBad
      })
    },
    {
      key: "solar",
      value: school.hasSolar ? t("installed") : t("notInstalled")
    },
    {
      key: "borehole",
      value: school.hasBorehole ? t("present") : t("notPresent")
    },
    {
      key: "ratio",
      value:
        teachers > 0
          ? `${Math.round(enrolment / teachers)}:1`
          : common("notAvailable")
    },
    {
      key: "coordinates",
      value: `${school.lat.toFixed(4)}, ${school.lng.toFixed(4)}`
    }
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={`${school.lga} ${common("lga")}`}
        title={school.name}
        description={t("heroDescription")}
        image={IMAGES.classroom}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/education", label: nav("programmesEducation") },
          { href: "/education/schools", label: nav("resourcesSchools") },
          { href: `/education/schools/${school.id}`, label: school.name }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge status={school.status} />
            <p className="text-small text-ink-muted">
              {school.status === "VIABLE"
                ? t("viableNote")
                : t("nonViableNote")}
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-card border border-line shadow-card">
            <table className="w-full text-left text-small">
              <caption className="sr-only">{t("tableCaption")}</caption>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={record.key}
                    className={index % 2 === 1 ? "bg-ivory" : "bg-white"}
                  >
                    <th
                      scope="row"
                      className="w-1/2 border-b border-line px-5 py-4 text-left font-medium text-ink-muted"
                    >
                      {t(`fields.${record.key}` as never)}
                    </th>
                    <td className="border-b border-line px-5 py-4 font-semibold text-primary">
                      {record.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/education/schools">{t("backToRegister")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contact">{t("reportError")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
