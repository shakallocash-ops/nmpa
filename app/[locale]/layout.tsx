import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { LocaleDocument } from "@/components/public/LocaleDocument";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/i18n/metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (!isLocale(locale)) return {};
  return buildPageMetadata({ locale, path: "/", page: "home" });
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(locale)) {
    notFound();
  }

  // Enables static rendering for this subtree instead of forcing every page to
  // be resolved per request.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LocaleDocument locale={locale as Locale} />
      {children}
    </NextIntlClientProvider>
  );
}
