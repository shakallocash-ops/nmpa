"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { List, Map as MapIcon, Search } from "lucide-react";
import { NIGER_LGAS } from "@/lib/geo/niger-lgas";
import type { DirectorySchool } from "@/lib/content/schools-directory";
import { StatusBadge } from "@/components/public/StatusBadge";
import { Link } from "@/i18n/navigation";
import { publicFieldClass, publicLabelClass } from "@/lib/public-ui";
import { useI18nFormat } from "@/lib/i18n/use-format";
import { cn } from "@/lib/utils";

const MapLoading = () => {
  const common = useTranslations("common");
  return (
    <div className="flex h-[min(70vh,640px)] items-center justify-center bg-mist">
      <p className="text-small text-ink-muted">{common("loadingMap")}</p>
    </div>
  );
};

const SchoolsMap = dynamic(
  () => import("@/components/public/SchoolsMap").then((mod) => mod.SchoolsMap),
  { ssr: false, loading: () => <MapLoading /> }
);

const pageSize = 25;

export function SchoolsExplorer({ schools }: { schools: DirectorySchool[] }) {
  const t = useTranslations("schools");
  const common = useTranslations("common");
  const statusLabels = useTranslations("status");
  const { formatNumber } = useI18nFormat();

  const [query, setQuery] = useState("");
  const [lga, setLga] = useState("All");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState<"map" | "list">("map");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return schools.filter((school) => {
      if (lga !== "All" && school.lga !== lga) return false;
      if (status !== "All" && school.status !== status) return false;
      if (
        q &&
        !school.name.toLowerCase().includes(q) &&
        !school.lga.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [lga, query, schools, status]);

  const viable = filtered.filter((school) => school.status === "VIABLE").length;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * pageSize, current * pageSize);

  function resetPage<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <div>
      <div className="rounded-card border border-line bg-ivory p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="school-search" className={publicLabelClass}>
              {t("filters.searchLabel")}
            </label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              />
              <input
                id="school-search"
                type="search"
                value={query}
                onChange={(event) => resetPage(setQuery)(event.target.value)}
                placeholder={t("filters.searchPlaceholder")}
                className={cn(publicFieldClass, "pl-9")}
              />
            </div>
          </div>
          <div>
            <label htmlFor="school-lga" className={publicLabelClass}>
              {t("filters.lgaLabel")}
            </label>
            <select
              id="school-lga"
              value={lga}
              onChange={(event) => resetPage(setLga)(event.target.value)}
              className={cn(publicFieldClass, "mt-2")}
            >
              <option value="All">{common("allLgas")}</option>
              {NIGER_LGAS.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="school-status" className={publicLabelClass}>
              {t("filters.statusLabel")}
            </label>
            <select
              id="school-status"
              value={status}
              onChange={(event) => resetPage(setStatus)(event.target.value)}
              className={cn(publicFieldClass, "mt-2")}
            >
              <option value="All">{common("allStatuses")}</option>
              <option value="VIABLE">{statusLabels("viable")}</option>
              <option value="NON_VIABLE">{statusLabels("nonViable")}</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-ink-muted">
            <p>
              {t("summary.count", {
                shown: formatNumber(filtered.length),
                total: formatNumber(schools.length)
              })}
            </p>
            <p className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full bg-success"
                aria-hidden="true"
              />
              {t("summary.viable", { count: formatNumber(viable) })}
            </p>
            <p className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full bg-error"
                aria-hidden="true"
              />
              {t("summary.nonViable", {
                count: formatNumber(filtered.length - viable)
              })}
            </p>
          </div>

          <div
            className="inline-flex overflow-hidden rounded-btn border border-line-strong"
            role="group"
            aria-label={t("view.label")}
          >
            <button
              type="button"
              onClick={() => setView("map")}
              aria-pressed={view === "map"}
              className={cn(
                "inline-flex h-10 items-center gap-2 px-4 text-small font-semibold",
                view === "map"
                  ? "bg-primary text-white"
                  : "bg-white text-ink-muted hover:text-primary"
              )}
            >
              <MapIcon className="h-4 w-4" aria-hidden="true" />
              {t("view.map")}
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={cn(
                "inline-flex h-10 items-center gap-2 border-l border-line-strong px-4 text-small font-semibold",
                view === "list"
                  ? "bg-primary text-white"
                  : "bg-white text-ink-muted hover:text-primary"
              )}
            >
              <List className="h-4 w-4" aria-hidden="true" />
              {t("view.list")}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-card border border-line bg-white shadow-card">
        {view === "map" ? (
          <SchoolsMap schools={filtered} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-small">
                <caption className="sr-only">{t("table.caption")}</caption>
                <thead className="bg-primary text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {t("table.school")}
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {t("table.lga")}
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {t("table.enrolment")}
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {t("table.status")}
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {t("table.action")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((school, index) => (
                    <tr
                      key={school.id}
                      className={cn(
                        "border-t border-line",
                        index % 2 === 1 && "bg-ivory"
                      )}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-primary"
                      >
                        {school.name}
                      </th>
                      <td className="px-4 py-3 text-ink-muted">{school.lga}</td>
                      <td className="px-4 py-3 text-ink-muted">
                        {formatNumber(
                          school.enrolmentMale + school.enrolmentFemale
                        )}{" "}
                        (
                        {t("popup.bySex", {
                          male: school.enrolmentMale,
                          female: school.enrolmentFemale
                        })}
                        )
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={school.status} />
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/education/schools/${school.id}`}
                          className="font-semibold text-secondary hover:text-primary"
                        >
                          {t("table.viewRecord")}
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 ? (
                    <tr className="border-t border-line">
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-ink-muted"
                      >
                        {t("table.empty")}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            {pages > 1 ? (
              <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3">
                <p className="text-caption tracking-normal text-ink-faint">
                  {common("pageOf", { current, total: pages })}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                    disabled={current === 1}
                    className="h-10 rounded-btn border border-line-strong px-4 text-small font-semibold text-primary disabled:opacity-40"
                  >
                    {common("previous")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((value) => Math.min(pages, value + 1))}
                    disabled={current === pages}
                    className="h-10 rounded-btn border border-line-strong px-4 text-small font-semibold text-primary disabled:opacity-40"
                  >
                    {common("next")}
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
