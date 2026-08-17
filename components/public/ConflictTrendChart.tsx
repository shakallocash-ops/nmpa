"use client";

import { useTranslations } from "next-intl";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useI18nFormat } from "@/lib/i18n/use-format";

export function ConflictTrendChart({
  data
}: {
  data: Array<{ monthIndex: number; year: number; resolved: number }>;
}) {
  const t = useTranslations("peace.trend");
  const { formatMonthShort } = useI18nFormat();

  const series = data.map((row) => ({
    month: formatMonthShort(row.monthIndex, row.year),
    resolved: row.resolved
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={series}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="resolvedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B6B4F" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#0B6B4F" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E0DCD5" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#4A4A4A" }} />
          <YAxis tick={{ fontSize: 11, fill: "#4A4A4A" }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E0DCD5",
              borderRadius: 8,
              fontSize: 13,
              color: "#1A1A1A"
            }}
          />
          <Area
            type="monotone"
            dataKey="resolved"
            name={t("series")}
            stroke="#0B6B4F"
            strokeWidth={2.5}
            fill="url(#resolvedFill)"
            dot={{ r: 3, fill: "#0B1F33", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#C6A15B", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
