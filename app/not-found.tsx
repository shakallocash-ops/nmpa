import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MinistryMark } from "@/components/public/MinistryMark";
import { Button } from "@/components/ui/button";
import { defaultLocale } from "@/i18n/config";

/**
 * Reached only for addresses outside the locale tree (the middleware sends
 * everything else to `/<locale>/…`), so this renders in the default locale.
 */
export default async function NotFound() {
  const t = await getTranslations({
    locale: defaultLocale,
    namespace: "errors.notFound"
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ivory px-4 py-20 text-center">
      <MinistryMark className="h-16 w-16" />
      <p className="eyebrow mt-8 text-secondary">{t("code")}</p>
      <h1 className="mt-3 max-w-2xl font-serif text-h1 font-bold text-primary">
        {t("title")}
      </h1>
      <span className="accent-rule mt-6" />
      <p className="mt-6 max-w-xl text-body text-ink-muted">{t("description")}</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href={`/${defaultLocale}`}>{t("home")}</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/${defaultLocale}/contact`}>{t("contact")}</Link>
        </Button>
      </div>
    </main>
  );
}
