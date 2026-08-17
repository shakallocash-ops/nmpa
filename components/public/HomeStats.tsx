"use client";

import { useTranslations } from "next-intl";
import { CountUp } from "@/components/public/CountUp";

export type HeadlineStats = {
  lgas: number;
  schools: number;
  households: number;
  livestock: number;
  conflictsResolved: number;
  appointments: number;
};

export function HomeStats({ stats }: { stats: HeadlineStats }) {
  const t = useTranslations("home.stats");

  const items = [
    { key: "lgas", value: stats.lgas },
    { key: "schools", value: stats.schools },
    { key: "households", value: stats.households },
    {
      key: "livestock",
      value: Number((stats.livestock / 1_000_000).toFixed(2)),
      decimals: 2,
      suffix: "M"
    },
    { key: "conflicts", value: stats.conflictsResolved },
    { key: "appointments", value: stats.appointments }
  ] as const;

  return (
    <section
      aria-labelledby="key-figures"
      className="border-y border-line bg-ivory"
    >
      <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
        <h2 id="key-figures" className="font-serif text-h3 font-bold text-primary">
          {t("title")}
        </h2>
        <span className="accent-rule mt-3" />
        <dl className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.key} className="border-l-2 border-secondary pl-5">
              <dd className="font-serif text-h1 font-bold text-primary">
                <CountUp
                  value={item.value}
                  decimals={"decimals" in item ? item.decimals : 0}
                  suffix={"suffix" in item ? item.suffix : ""}
                />
              </dd>
              <dt className="mt-1 text-small font-semibold text-primary">
                {t(item.key)}
              </dt>
              <p className="mt-1 text-caption tracking-normal text-ink-faint">
                {t(`${item.key}Context`)}
              </p>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-caption tracking-normal text-ink-faint">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
