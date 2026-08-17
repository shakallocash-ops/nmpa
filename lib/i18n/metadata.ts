import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";
import { IMAGES } from "@/lib/content/images";

export const SITE_URL = "https://nomadicafairs.nigerstate.gov.ng";

const ogLocales: Record<Locale, string> = {
  en: "en_NG",
  ha: "ha_NG",
  ff: "ff_NG",
  nup: "en_NG",
  gbr: "en_NG",
  fr: "fr_FR"
};

/** `/en/projects`, `/ha/projects`, … for a given unprefixed path. */
function localisedPaths(path: string) {
  const suffix = path === "/" ? "" : path;
  return Object.fromEntries(
    locales.map((code) => [code, `/${code}${suffix}`])
  ) as Record<Locale, string>;
}

type PageMetaOptions = {
  locale: string;
  /** Path without the locale prefix, e.g. `/projects`. */
  path: string;
  /** Key inside the `meta` namespace, e.g. `projects`. */
  page?: string;
  title?: string;
  description?: string;
  images?: string[];
};

/**
 * Builds locale-aware metadata including `hreflang` alternates, so that each
 * translation is indexed as its own document rather than a duplicate.
 */
export async function buildPageMetadata({
  locale,
  path,
  page,
  title,
  description,
  images
}: PageMetaOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const gov = await getTranslations({ locale, namespace: "gov" });

  const resolvedTitle = title ?? (page ? t(`${page}.title` as never) : undefined);
  const resolvedDescription =
    description ?? (page ? t(`${page}.description` as never) : undefined);

  const suffix = path === "/" ? "" : path;
  const canonical = `/${locale}${suffix}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: {
        ...localisedPaths(path),
        "x-default": `/${"en"}${suffix}`
      }
    },
    openGraph: {
      siteName: `${gov("ministry")}, ${gov("state")}`,
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      type: "website",
      locale: ogLocales[locale as Locale] ?? "en_NG",
      images: (images ?? [IMAGES.hero]).map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: t("ogAlt")
      }))
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: images ?? [IMAGES.hero]
    }
  };
}
