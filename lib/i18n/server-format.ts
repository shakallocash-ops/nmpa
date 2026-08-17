import { getLocale, getTranslations } from "next-intl/server";
import {
  createDateFormatter,
  createMonthFormatter,
  formatMoney,
  formatNumber,
  formatPercent
} from "./format";

/** Server-side counterpart of `useI18nFormat`. */
export async function getFormatters() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("common")
  ]);
  const monthsShort = t.raw("monthsShort") as string[];

  return {
    locale,
    formatDate: createDateFormatter(monthsShort),
    formatMonthShort: createMonthFormatter(monthsShort),
    formatNumber: (
      value: number | null | undefined,
      options?: Intl.NumberFormatOptions
    ) => formatNumber(value, locale, options),
    formatMoney: (value: number | string | null | undefined) =>
      formatMoney(value, locale),
    formatPercent: (value: number | null | undefined, digits?: number) =>
      formatPercent(value, locale, digits)
  };
}
