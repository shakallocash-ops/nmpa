"use client";

import { useMemo, useState, type ReactElement } from "react";
import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { downloadCsv, downloadPdf } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { publicLabelClass } from "@/lib/public-ui";
import { demographicKey } from "@/lib/i18n/labels";
import { useI18nFormat } from "@/lib/i18n/use-format";
import { cn } from "@/lib/utils";

export type ExplorerPayload = {
  source: "live" | "published";
  byLga: Array<{
    lga: string;
    zone: "A" | "B" | "C";
    households: number;
    cattle: number;
    sheep: number;
    goats: number;
    livestock: number;
  }>;
  gender: Array<{ name: string; value: number }>;
  settlement: Array<{ name: string; value: number }>;
  age: Array<{ name: string; value: number }>;
  composition: Array<{ name: string; value: number; fill: string }>;
};

const NAVY = "#0B1F33";
const GREEN = "#0B6B4F";
const GOLD = "#C6A15B";

const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E0DCD5",
  borderRadius: 8,
  color: "#1A1A1A",
  fontSize: 13,
  boxShadow: "0 12px 28px rgba(11,31,51,0.12)"
};

const axisStyle = { fontSize: 11, fill: "#4A4A4A" };

export function DataExplorer({ data }: { data: ExplorerPayload }) {
  const t = useTranslations("data");
  const charts = useTranslations("data.charts");
  const common = useTranslations("common");
  const { formatNumber } = useI18nFormat();
  const [zone, setZone] = useState<"All" | "A" | "B" | "C">("All");

  const rows = useMemo(
    () =>
      zone === "All" ? data.byLga : data.byLga.filter((row) => row.zone === zone),
    [data.byLga, zone]
  );

  const totals = rows.reduce(
    (acc, row) => ({
      households: acc.households + row.households,
      livestock: acc.livestock + row.livestock,
      cattle: acc.cattle + row.cattle
    }),
    { households: 0, livestock: 0, cattle: 0 }
  );

  /** Chart series carry translated `name` values while keys stay in English. */
  function localiseSeries<T extends { name: string }>(series: T[]) {
    return series.map((slice) => {
      const key = demographicKey(slice.name);
      return { ...slice, name: key ? charts(key as never) : slice.name };
    });
  }

  const gender = localiseSeries(data.gender);
  const settlement = localiseSeries(data.settlement);
  const composition = localiseSeries(data.composition);

  function exportCsv() {
    downloadCsv(
      zone === "All"
        ? "nmpa-baseline-all-lgas.csv"
        : `nmpa-baseline-zone-${zone}.csv`,
      [
        "LGA",
        "Zone",
        "Households",
        "Cattle",
        "Sheep",
        "Goats",
        "Total livestock"
      ],
      rows.map((row) => [
        row.lga,
        row.zone,
        row.households,
        row.cattle,
        row.sheep,
        row.goats,
        row.livestock
      ])
    );
  }

  async function exportPdf() {
    await downloadPdf(
      "nmpa-baseline-report.pdf",
      t("downloads.reportTitle"),
      ["LGA", "Zone", "Households", "Total livestock"],
      rows.map((row) => [
        row.lga,
        `${common("zone")} ${row.zone}`,
        formatNumber(row.households),
        formatNumber(row.livestock)
      ])
    );
  }

  function exportLga(name: string) {
    const row = data.byLga.find((item) => item.lga === name);
    if (!row) return;
    downloadCsv(
      `nmpa-${name.toLowerCase()}-report.csv`,
      [t("downloads.indicator"), t("downloads.value")],
      [
        [common("lga"), row.lga],
        [common("senatorialZone"), `${common("zone")} ${row.zone}`],
        [t("downloads.householdsEnumerated"), row.households],
        [charts("cattle"), row.cattle],
        [charts("sheep"), row.sheep],
        [charts("goats"), row.goats],
        [t("downloads.totalLivestock"), row.livestock]
      ]
    );
  }

  const totalCards = [
    { key: "households", value: totals.households },
    { key: "livestock", value: totals.livestock },
    { key: "cattle", value: totals.cattle }
  ] as const;

  return (
    <div className="space-y-12">
      <section className="rounded-card border border-line bg-ivory p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className={publicLabelClass}>{t("zone.label")}</p>
            <div
              className="mt-3 inline-flex overflow-hidden rounded-btn border border-line-strong"
              role="group"
              aria-label={t("zone.aria")}
            >
              {(["All", "A", "B", "C"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setZone(item)}
                  aria-pressed={zone === item}
                  className={cn(
                    "h-10 border-l border-line-strong px-4 text-small font-semibold first:border-l-0",
                    zone === item
                      ? "bg-primary text-white"
                      : "bg-white text-ink-muted hover:text-primary"
                  )}
                >
                  {item === "All"
                    ? t("zone.all")
                    : t("zone.named", { zone: item })}
                </button>
              ))}
            </div>
          </div>
          <p className="text-caption tracking-normal text-ink-faint">
            {common("source")}:{" "}
            {data.source === "live" ? t("sourceLive") : t("sourcePublished")}
          </p>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
          {totalCards.map((item) => (
            <div key={item.key} className="border-l-2 border-secondary pl-4">
              <dd className="font-serif text-h2 font-bold text-primary">
                {formatNumber(item.value)}
              </dd>
              <dt className="mt-1 text-small text-ink-muted">
                {t(`totals.${item.key}` as never)}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <ChartPanel
        title={charts("byLgaTitle")}
        description={charts("byLgaDescription")}
        height="h-[22rem]"
      >
        <BarChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="#E0DCD5" vertical={false} />
          <XAxis
            dataKey="lga"
            tick={axisStyle}
            interval={0}
            angle={-40}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={axisStyle} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="households" name={charts("households")} fill={NAVY} />
          <Bar dataKey="livestock" name={charts("livestock")} fill={GOLD} />
        </BarChart>
      </ChartPanel>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartPanel
          title={charts("ageTitle")}
          description={charts("ageDescription")}
        >
          <BarChart data={data.age}>
            <CartesianGrid stroke="#E0DCD5" vertical={false} />
            <XAxis dataKey="name" tick={axisStyle} />
            <YAxis tick={axisStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" name={charts("share")} fill={NAVY} />
          </BarChart>
        </ChartPanel>

        <ChartPanel title={charts("genderTitle")}>
          <PieChart>
            <Pie
              data={gender}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={84}
            >
              {gender.map((slice, index) => (
                <Cell key={slice.name} fill={index === 0 ? NAVY : GOLD} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ChartPanel>

        <ChartPanel title={charts("settlementTitle")}>
          <PieChart>
            <Pie
              data={settlement}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={84}
            >
              {settlement.map((slice, index) => (
                <Cell
                  key={slice.name}
                  fill={[NAVY, GOLD, GREEN][index] ?? "#8A7A5A"}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ChartPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPanel
          title={charts("herdTitle")}
          description={charts("herdDescription")}
          height="h-[22rem]"
        >
          <BarChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#E0DCD5" vertical={false} />
            <XAxis
              dataKey="lga"
              tick={axisStyle}
              interval={0}
              angle={-40}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={axisStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="cattle"
              stackId="a"
              name={charts("cattle")}
              fill={NAVY}
            />
            <Bar dataKey="sheep" stackId="a" name={charts("sheep")} fill={GOLD} />
            <Bar dataKey="goats" stackId="a" name={charts("goats")} fill={GREEN} />
          </BarChart>
        </ChartPanel>

        <ChartPanel
          title={charts("compositionTitle")}
          description={charts("compositionDescription")}
          height="h-[22rem]"
        >
          <PieChart>
            <Pie
              data={composition}
              dataKey="value"
              nameKey="name"
              innerRadius={64}
              outerRadius={110}
            >
              {composition.map((slice) => (
                <Cell key={slice.name} fill={slice.fill} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ChartPanel>
      </div>

      <section
        aria-labelledby="downloads"
        className="rounded-card border border-line bg-ivory p-6 md:p-8"
      >
        <h2 id="downloads" className="font-serif text-h3 font-bold text-primary">
          {t("downloads.title")}
        </h2>
        <span className="accent-rule mt-3" />
        <p className="mt-4 max-w-2xl text-small text-ink-muted">
          {t("downloads.description")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="ink" onClick={() => void exportPdf()}>
            <FileText className="h-4 w-4" aria-hidden="true" />
            {t("downloads.pdf")}
          </Button>
          <Button type="button" variant="paper" onClick={exportCsv}>
            <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
            {t("downloads.csv")}
          </Button>
        </div>

        <h3 className="mt-10 text-small font-semibold text-primary">
          {t("downloads.lgaTitle")}
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {data.byLga.map((row) => (
            <li key={row.lga}>
              <button
                type="button"
                onClick={() => exportLga(row.lga)}
                className="flex w-full items-center justify-between gap-2 rounded-btn border border-line bg-white px-3 py-2.5 text-left text-small text-primary transition-colors hover:border-primary"
              >
                {row.lga}
                <Download className="h-4 w-4 text-accent" aria-hidden="true" />
                <span className="sr-only">{common("download")}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ChartPanel({
  title,
  description,
  height = "h-64",
  children
}: {
  title: string;
  description?: string;
  height?: string;
  children: ReactElement;
}) {
  return (
    <section className="rounded-card border border-line bg-white p-5 shadow-card md:p-6">
      <h3 className="font-serif text-h4 font-bold text-primary">{title}</h3>
      {description ? (
        <p className="mt-1.5 text-small text-ink-muted">{description}</p>
      ) : null}
      <div className={cn("mt-5", height)}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
