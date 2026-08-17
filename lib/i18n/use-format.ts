"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import {
  createDateFormatter,
  createMonthFormatter,
  formatMoney,
  formatNumber,
  formatPercent
} from "./format";

/** Locale-aware date, number, currency and percentage helpers for the client. */
export function useI18nFormat() {
  const locale = useLocale();
  const t = useTranslations("common");

  return useMemo(() => {
    const monthsShort = t.raw("monthsShort") as string[];
    return {
      locale,
      formatDate: createDateFormatter(monthsShort),
      formatMonthShort: createMonthFormatter(monthsShort),
      formatNumber: (value: number | null | undefined, options?: Intl.NumberFormatOptions) =>
        formatNumber(value, locale, options),
      formatMoney: (value: number | string | null | undefined) =>
        formatMoney(value, locale),
      formatPercent: (value: number | null | undefined, digits?: number) =>
        formatPercent(value, locale, digits)
    };
  }, [locale, t]);
}
