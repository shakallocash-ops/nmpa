"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { localeDirection } from "@/i18n/config";

/**
 * The root layout owns `<html>` because `/admin` and `/api` live outside the
 * locale tree, so the active locale is reconciled onto the document element
 * here. Direction is applied at the same time, which is what makes adding an
 * RTL locale a configuration change rather than a layout rewrite.
 */
export function LocaleDocument({ locale }: { locale: Locale }) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = localeDirection(locale);
  }, [locale]);

  return null;
}
