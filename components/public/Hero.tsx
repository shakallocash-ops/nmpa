import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { IMAGES } from "@/lib/content/images";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const gov = await getTranslations("gov");

  return (
    <section className="relative isolate overflow-hidden bg-primary">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${IMAGES.hero})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60"
        aria-hidden="true"
      />
      <div
        className="pattern-lattice absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-content px-4 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 border border-accent/40 bg-primary-dark/40 px-3 py-1.5 text-caption font-semibold uppercase tracking-[0.12em] text-accent">
            {gov("state")} · {t("eyebrow", { date: gov("established") })}
          </p>
          <h1 className="mt-6 font-serif text-display font-bold text-white">
            {t("title")}
          </h1>
          <span className="accent-rule mt-7" />
          <p className="mt-6 max-w-2xl text-body-lg text-white/80">
            {t("description")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/programmes">{t("ctaPrimary")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">{t("ctaSecondary")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
