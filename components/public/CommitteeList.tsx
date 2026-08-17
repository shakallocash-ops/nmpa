"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, Search, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { publicFieldClass } from "@/lib/public-ui";
import { committeeRoleKey, committeeTypeKey } from "@/lib/i18n/labels";
import { cn } from "@/lib/utils";

type Member = {
  id: string;
  name: string;
  role: string;
  committeeType: string;
  phone: string | null;
};

export function CommitteeList({
  groups
}: {
  groups: Array<{ lga: string; zone: string; members: Member[] }>;
}) {
  const t = useTranslations("peace.committees");
  const common = useTranslations("common");
  const roles = useTranslations("peace.roles");
  const types = useTranslations("peace.committeeTypes");
  const [query, setQuery] = useState("");

  function roleLabel(role: string) {
    const key = committeeRoleKey(role);
    return key ? roles(key as never) : role;
  }

  function typeLabel(type: string) {
    const key = committeeTypeKey(type);
    return key ? types(key as never) : type;
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        members: group.members.filter(
          (member) =>
            member.name.toLowerCase().includes(q) ||
            roleLabel(member.role).toLowerCase().includes(q)
        )
      }))
      .filter(
        (group) => group.lga.toLowerCase().includes(q) || group.members.length > 0
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, query, roles]);

  return (
    <div>
      <div className="relative max-w-md">
        <label htmlFor="committee-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          aria-hidden="true"
        />
        <input
          id="committee-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className={cn(publicFieldClass, "pl-9")}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-card border border-line bg-white p-6 text-small text-ink-muted shadow-card">
          {common("noResults")}
        </p>
      ) : (
        <Accordion
          type="multiple"
          className="mt-6 overflow-hidden rounded-card border border-line bg-white shadow-card"
        >
          {filtered.map((group) => (
            <AccordionItem
              key={group.lga}
              value={group.lga}
              className="border-b border-line px-5 last:border-b-0"
            >
              <AccordionTrigger className="py-4 text-left text-small font-semibold text-primary hover:text-secondary">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-serif text-h4 font-bold">
                    {group.lga}
                  </span>
                  <span className="text-caption font-normal tracking-normal text-ink-faint">
                    {common("zone")} {group.zone} ·{" "}
                    {t("memberCount", { count: group.members.length })}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {group.members.length ? (
                  <ul className="grid gap-3 pb-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.members.map((member) => (
                      <li
                        key={member.id}
                        className="rounded-card border border-line bg-ivory p-4"
                      >
                        <p className="font-medium text-primary">{member.name}</p>
                        <p className="mt-1 text-caption font-semibold tracking-normal text-secondary">
                          {roleLabel(member.role)}
                        </p>
                        <p className="mt-2 text-small text-ink-muted">
                          {typeLabel(member.committeeType)}
                        </p>
                        {member.phone ? (
                          <a
                            href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="mt-2 inline-flex items-center gap-2 text-small text-secondary hover:text-primary"
                          >
                            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                            {member.phone}
                          </a>
                        ) : (
                          <p className="mt-2 text-caption tracking-normal text-ink-faint">
                            {t("contactVia")}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="flex items-start gap-3 pb-5 text-small text-ink-muted">
                    <Users
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint"
                      aria-hidden="true"
                    />
                    {t("notPublished", { lga: group.lga })}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
