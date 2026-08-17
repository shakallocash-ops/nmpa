"use client";

import { useTranslations } from "next-intl";

export default function PublicLoading() {
  const t = useTranslations("errors");

  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-content px-4 py-20 md:px-8"
    >
      <span className="sr-only">{t("loadingLabel")}</span>
      <div className="h-3 w-24 animate-pulse rounded bg-mist" />
      <div className="mt-6 h-10 w-full max-w-2xl animate-pulse rounded bg-mist" />
      <div className="mt-3 h-10 w-full max-w-xl animate-pulse rounded bg-mist" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-card border border-line bg-mist"
          />
        ))}
      </div>
    </div>
  );
}
