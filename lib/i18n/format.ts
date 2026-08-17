import { formatLocaleFor, type Locale } from "@/i18n/config";

/**
 * Dates are assembled from message-supplied month names rather than `Intl`
 * alone, because Fulfulde, Nupe and Gbagyi have no CLDR data and would
 * otherwise silently render English months inside an otherwise localised page.
 */
export function createDateFormatter(monthsShort: readonly string[]) {
  return function formatDate(value: string | Date | null | undefined) {
    if (!value) return "—";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    const month = monthsShort[date.getMonth()] ?? "";
    return `${String(date.getDate()).padStart(2, "0")} ${month} ${date.getFullYear()}`;
  };
}

/** Axis and badge labels such as "Jan 25", built from message month names. */
export function createMonthFormatter(monthsShort: readonly string[]) {
  return function formatMonthShort(monthIndex: number, year: number) {
    const month = monthsShort[monthIndex] ?? "";
    return `${month} ${String(year).slice(-2)}`;
  };
}

export function formatNumber(
  value: number | null | undefined,
  locale: Locale | string,
  options?: Intl.NumberFormatOptions
) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "—";
  }
  return new Intl.NumberFormat(formatLocaleFor(locale), options).format(value);
}

export function formatMoney(
  value: number | string | null | undefined,
  locale: Locale | string
) {
  if (value === null || value === undefined || value === "") return "—";
  const amount = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat(formatLocaleFor(locale), {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercent(
  value: number | null | undefined,
  locale: Locale | string,
  fractionDigits = 0
) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "—";
  }
  return new Intl.NumberFormat(formatLocaleFor(locale), {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value / 100);
}
