"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { PublicProject } from "@/lib/content/projects";
import { StatusBadge } from "@/components/public/StatusBadge";
import { Link } from "@/i18n/navigation";
import { NIGER_LGAS } from "@/lib/geo/niger-lgas";
import { publicFieldClass, publicLabelClass } from "@/lib/public-ui";
import { projectTypeKey, projectTypeKeyList } from "@/lib/i18n/labels";
import { cn } from "@/lib/utils";

export function ProjectsGrid({ projects }: { projects: PublicProject[] }) {
  const t = useTranslations("projects");
  const common = useTranslations("common");
  const types = useTranslations("projects.types");
  const statusLabels = useTranslations("status");

  // Filtering is done on the stable enum key, never on the translated label.
  const [typeKey, setTypeKey] = useState("All");
  const [status, setStatus] = useState("All");
  const [lga, setLga] = useState("All");

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        if (typeKey !== "All" && project.typeKey !== typeKey) return false;
        if (status !== "All" && project.status !== status) return false;
        if (lga !== "All" && project.lga !== lga) return false;
        return true;
      }),
    [lga, projects, status, typeKey]
  );

  function typeLabel(key: string) {
    const messageKey = projectTypeKey(key);
    return messageKey ? types(messageKey as never) : key;
  }

  const typeOptions = ["All", ...projectTypeKeyList];

  return (
    <div>
      <div className="rounded-card border border-line bg-ivory p-5 md:p-6">
        <fieldset>
          <legend className={publicLabelClass}>{t("filters.typeLabel")}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {typeOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTypeKey(item)}
                aria-pressed={typeKey === item}
                className={cn(
                  "inline-flex h-10 items-center rounded-btn border px-4 text-small font-medium transition-colors",
                  typeKey === item
                    ? "border-primary bg-primary text-white"
                    : "border-line-strong bg-white text-ink-muted hover:border-primary hover:text-primary"
                )}
              >
                {item === "All" ? types("all") : typeLabel(item)}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-2 lg:max-w-xl">
          <div>
            <label htmlFor="project-status" className={publicLabelClass}>
              {t("filters.statusLabel")}
            </label>
            <select
              id="project-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className={cn(publicFieldClass, "mt-2")}
            >
              <option value="All">{common("allStatuses")}</option>
              <option value="PLANNING">{statusLabels("planning")}</option>
              <option value="ONGOING">{statusLabels("ongoing")}</option>
              <option value="COMPLETED">{statusLabels("completed")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="project-lga" className={publicLabelClass}>
              {t("filters.lgaLabel")}
            </label>
            <select
              id="project-lga"
              value={lga}
              onChange={(event) => setLga(event.target.value)}
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
        </div>

        <p className="mt-5 border-t border-line pt-4 text-small text-ink-muted">
          {t("filters.showing", { count: filtered.length })}
        </p>
      </div>

      {filtered.length ? (
        <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.id}>
              <Link
                href={`/projects/${project.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-mist">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={project.status} />
                    <span className="text-caption tracking-normal text-ink-faint">
                      {project.lga} {common("lgaShort")} ·{" "}
                      {typeLabel(project.typeKey)}
                    </span>
                  </span>
                  <span className="mt-3 block font-serif text-h4 font-bold text-primary group-hover:text-secondary">
                    {project.title}
                  </span>
                  <span className="mt-2 line-clamp-3 block flex-1 text-small text-ink-muted">
                    {project.description}
                  </span>
                  <span className="mt-4 text-small font-semibold text-secondary">
                    {t("card.view")} →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-card border border-line bg-white p-10 text-center text-ink-muted">
          {t("filters.empty")}
        </p>
      )}
    </div>
  );
}
