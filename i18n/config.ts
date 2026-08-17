export const locales = ["en", "ha", "ff", "nup", "gbr", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * `formatLocale` is the BCP-47 tag handed to `Intl`. Fulfulde, Nupe and Gbagyi
 * have no CLDR data, so they borrow a formatting locale while their month names
 * come from the message catalogue instead.
 */
export type LocaleMeta = {
  code: Locale;
  /** Endonym — how speakers name the language themselves. */
  label: string;
  englishLabel: string;
  short: string;
  formatLocale: string;
  dir: "ltr" | "rtl";
  /** Whether the catalogue is fully translated or still falls back to English. */
  coverage: "complete" | "partial";
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: {
    code: "en",
    label: "English",
    englishLabel: "English",
    short: "EN",
    formatLocale: "en-NG",
    dir: "ltr",
    coverage: "complete"
  },
  ha: {
    code: "ha",
    label: "Hausa",
    englishLabel: "Hausa",
    short: "HA",
    formatLocale: "ha-NG",
    dir: "ltr",
    coverage: "complete"
  },
  ff: {
    code: "ff",
    label: "Fulfulde",
    englishLabel: "Fulfulde",
    short: "FF",
    formatLocale: "en-NG",
    dir: "ltr",
    coverage: "complete"
  },
  nup: {
    code: "nup",
    label: "Nupe",
    englishLabel: "Nupe",
    short: "NUP",
    formatLocale: "en-NG",
    dir: "ltr",
    coverage: "complete"
  },
  gbr: {
    code: "gbr",
    label: "Gbagyi",
    englishLabel: "Gwari",
    short: "GBR",
    formatLocale: "en-NG",
    dir: "ltr",
    coverage: "complete"
  },
  fr: {
    code: "fr",
    label: "Français",
    englishLabel: "French",
    short: "FR",
    formatLocale: "fr-FR",
    dir: "ltr",
    coverage: "complete"
  }
};

export const localeList = locales.map((code) => localeMeta[code]);

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeDirection(locale: string) {
  return isLocale(locale) ? localeMeta[locale].dir : "ltr";
}

export function formatLocaleFor(locale: string) {
  return isLocale(locale) ? localeMeta[locale].formatLocale : "en-NG";
}
