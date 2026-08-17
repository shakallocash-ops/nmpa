import type { AbstractIntlMessages } from "next-intl";
import type { Locale } from "@/i18n/config";
import en, { type Messages } from "./en";

/**
 * Any locale may translate as much or as little as it likes; whatever is absent
 * is inherited from English.
 *
 * `en` is declared `as const` so that key paths are checked, which also makes
 * every value a string literal — widened here so translations are accepted
 * while the shape stays enforced.
 */
export type PartialMessages = TranslatableShape<Messages>;

type TranslatableShape<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? readonly TranslatableShape<U>[]
      : T extends object
        ? { [K in keyof T]?: TranslatableShape<T[K]> }
        : T;

const loaders: Record<Locale, () => Promise<{ default: PartialMessages }>> = {
  en: async () => ({ default: en }),
  ha: () => import("./ha"),
  ff: () => import("./ff"),
  nup: () => import("./nup"),
  gbr: () => import("./gbr"),
  fr: () => import("./fr")
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/** Arrays are replaced wholesale; objects merge key by key. */
function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override as T;
  }

  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = key in base ? deepMerge(base[key], value) : value;
  }
  return result as T;
}

export async function loadMessages(locale: Locale) {
  const { default: translated } = await loaders[locale]();
  const merged = locale === "en" ? en : deepMerge(en, translated);
  return merged as unknown as AbstractIntlMessages;
}

export { en };
