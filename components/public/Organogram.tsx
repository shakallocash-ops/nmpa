"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { leadership } from "@/lib/content/ministry";
import { cn } from "@/lib/utils";

export function Organogram() {
  const t = useTranslations("about.organogram");
  const roles = useTranslations("ministry.roles");
  const dept = useTranslations("ministry.departments");
  const [active, setActive] = useState(0);

  // Index matches the order of `leadership`, so the aside always describes the
  // selected node.
  const nodes = [
    { id: 0, label: roles("commissioner"), detail: leadership[0].name },
    {
      id: 1,
      label: roles("permanentSecretary"),
      detail: t("permanentSecretaryDetail")
    },
    {
      id: 2,
      label: dept("administration.name"),
      detail: t("administrationDetail")
    },
    { id: 3, label: dept("planning.name"), detail: t("planningDetail") },
    { id: 4, label: dept("education.name"), detail: t("educationDetail") },
    { id: 5, label: dept("peace.name"), detail: t("peaceDetail") },
    { id: 6, label: dept("finance.name"), detail: t("financeDetail") }
  ];

  const profile = leadership[active] ?? leadership[0];
  const profileRole = [
    roles("commissioner"),
    roles("permanentSecretary"),
    roles("directorAdministration"),
    roles("directorPlanning"),
    roles("directorEducation"),
    roles("directorPeace"),
    roles("directorFinance")
  ][active];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
      <div>
        <button
          type="button"
          onClick={() => setActive(0)}
          aria-pressed={active === 0}
          className={cn(
            "mx-auto block w-full max-w-md rounded-card border px-6 py-5 text-center transition-colors",
            active === 0
              ? "border-primary bg-primary text-white"
              : "border-line-strong bg-white hover:border-primary"
          )}
        >
          <span
            className={cn(
              "text-caption font-semibold uppercase tracking-[0.12em]",
              active === 0 ? "text-accent" : "text-secondary"
            )}
          >
            {nodes[0].label}
          </span>
          <span
            className={cn(
              "mt-1.5 block font-serif text-h4 font-bold",
              active === 0 ? "text-white" : "text-primary"
            )}
          >
            {nodes[0].detail}
          </span>
        </button>

        <div className="mx-auto h-8 w-px bg-line-strong" aria-hidden="true" />

        <button
          type="button"
          onClick={() => setActive(1)}
          aria-pressed={active === 1}
          className={cn(
            "mx-auto block w-full max-w-sm rounded-card border px-6 py-4 text-center transition-colors",
            active === 1
              ? "border-primary bg-primary text-white"
              : "border-line-strong bg-white hover:border-primary"
          )}
        >
          <span
            className={cn(
              "text-caption font-semibold uppercase tracking-[0.12em]",
              active === 1 ? "text-accent" : "text-secondary"
            )}
          >
            {nodes[1].label}
          </span>
          <span
            className={cn(
              "mt-1 block text-small",
              active === 1 ? "text-white/80" : "text-ink-muted"
            )}
          >
            {nodes[1].detail}
          </span>
        </button>

        <div className="mx-auto h-8 w-px bg-line-strong" aria-hidden="true" />

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {nodes.slice(2).map((node) => (
            <li key={node.id}>
              <button
                type="button"
                onClick={() => setActive(node.id)}
                aria-pressed={active === node.id}
                className={cn(
                  "h-full w-full rounded-card border px-3 py-4 text-left transition-colors",
                  active === node.id
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-white hover:border-primary"
                )}
              >
                <span
                  className={cn(
                    "block text-caption font-semibold tracking-normal",
                    active === node.id ? "text-accent" : "text-secondary"
                  )}
                >
                  {roles("director")}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-small font-medium leading-snug",
                    active === node.id ? "text-white" : "text-primary"
                  )}
                >
                  {node.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-card border border-line bg-ivory p-6 md:p-8">
        <p className="eyebrow text-secondary">{profileRole ?? profile.role}</p>
        <h3 className="mt-3 font-serif text-h3 font-bold text-primary">
          {profile.name}
        </h3>
        <span className="accent-rule mt-4" />
        <p className="mt-5 text-body text-ink-muted">{profile.bio}</p>
      </aside>
    </div>
  );
}
