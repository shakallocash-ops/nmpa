"use client";

import { useTranslations } from "next-intl";
import { FileSpreadsheet, FileText } from "lucide-react";
import { downloadCsv, downloadPdf } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { useI18nFormat } from "@/lib/i18n/use-format";
import type { DirectorySchool } from "@/lib/content/schools-directory";
import type { PublicProject } from "@/lib/content/projects";
import type { ExplorerPayload } from "@/components/public/DataExplorer";

export function ResourceDownloads({
  baseline,
  schools,
  projects
}: {
  baseline: ExplorerPayload["byLga"];
  schools: DirectorySchool[];
  projects: PublicProject[];
}) {
  const t = useTranslations("resources");
  const common = useTranslations("common");
  const status = useTranslations("status");
  const { formatNumber } = useI18nFormat();

  // Column identifiers inside the exported files stay in English so that
  // downstream spreadsheets and scripts keep a stable schema across locales;
  // everything the visitor reads on the page is localised.
  const resources = [
    {
      key: "baseline",
      updated: t("baseline.updated"),
      csv: () =>
        downloadCsv(
          "nmpa-baseline-by-lga.csv",
          [
            "LGA",
            "Zone",
            "Households",
            "Cattle",
            "Sheep",
            "Goats",
            "Total livestock"
          ],
          baseline.map((row) => [
            row.lga,
            row.zone,
            row.households,
            row.cattle,
            row.sheep,
            row.goats,
            row.livestock
          ])
        ),
      pdf: () =>
        downloadPdf(
          "nmpa-baseline-by-lga.pdf",
          t("baseline.title"),
          ["LGA", "Zone", "Households", "Total livestock"],
          baseline.map((row) => [
            row.lga,
            `${common("zone")} ${row.zone}`,
            formatNumber(row.households),
            formatNumber(row.livestock)
          ])
        )
    },
    {
      key: "schools",
      updated: t("schools.updated", { count: schools.length }),
      csv: () =>
        downloadCsv(
          "nmpa-nomadic-schools.csv",
          [
            "School",
            "LGA",
            "Zone",
            "Status",
            "Enrolment (male)",
            "Enrolment (female)",
            "Teachers (male)",
            "Teachers (female)",
            "Classrooms sound",
            "Classrooms poor",
            "Solar",
            "Borehole"
          ],
          schools.map((school) => [
            school.name,
            school.lga,
            school.zone,
            school.status === "VIABLE"
              ? status("viable")
              : status("nonViable"),
            school.enrolmentMale,
            school.enrolmentFemale,
            school.teachersMale,
            school.teachersFemale,
            school.classroomsGood,
            school.classroomsBad,
            school.hasSolar ? common("yes") : common("no"),
            school.hasBorehole ? common("yes") : common("no")
          ])
        ),
      pdf: () =>
        downloadPdf(
          "nmpa-nomadic-schools.pdf",
          t("schools.title"),
          ["School", "LGA", "Enrolment", "Status"],
          schools.map((school) => [
            school.name,
            school.lga,
            String(school.enrolmentMale + school.enrolmentFemale),
            school.status === "VIABLE" ? status("viable") : status("nonViable")
          ])
        )
    },
    {
      key: "projects",
      updated: t("projects.updated", { count: projects.length }),
      csv: () =>
        downloadCsv(
          "nmpa-projects.csv",
          ["Project", "LGA", "Type", "Status", "Budget (NGN)"],
          projects.map((project) => [
            project.title,
            project.lga,
            project.type,
            project.status,
            project.budget ?? ""
          ])
        ),
      pdf: () =>
        downloadPdf(
          "nmpa-projects.pdf",
          t("projects.title"),
          ["Project", "LGA", "Type", "Status"],
          projects.map((project) => [
            project.title,
            project.lga,
            project.type,
            project.status
          ])
        )
    }
  ] as const;

  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {resources.map((resource) => (
        <li
          key={resource.key}
          className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card"
        >
          <h3 className="font-serif text-h4 font-bold text-primary">
            {t(`${resource.key}.title` as never)}
          </h3>
          <span className="accent-rule mt-3" />
          <p className="mt-4 flex-1 text-small text-ink-muted">
            {t(`${resource.key}.description` as never)}
          </p>
          <p className="mt-4 text-caption tracking-normal text-ink-faint">
            {resource.updated}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="ink"
              onClick={() => void resource.pdf()}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {common("pdf")}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="paper"
              onClick={resource.csv}
            >
              <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
              {common("csv")}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
