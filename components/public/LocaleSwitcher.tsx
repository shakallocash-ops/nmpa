"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown, Globe, Loader2 } from "lucide-react";
import { localeList, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Global locale control. Switching keeps the visitor on the same page and
 * preserves query parameters, so filters and pagination survive the change.
 */
export function LocaleSwitcher({
  variant = "bar"
}: {
  variant?: "bar" | "panel";
}) {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const active = localeList.find((item) => item.code === locale) ?? localeList[0];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function select(next: Locale) {
    setOpen(false);
    if (next === locale) return;

    // Read the query string at click time rather than with `useSearchParams`,
    // which would opt every page rendering the header out of static rendering.
    const query = window.location.search;
    const target = query ? `${pathname}${query}` : pathname;
    startTransition(() => {
      router.replace(target, { locale: next });
    });
  }

  const isPanel = variant === "panel";

  return (
    <div ref={containerRef} className={cn("relative", isPanel && "w-full")}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("current", { language: active.label })}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-btn font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1",
          isPanel
            ? "w-full justify-between border border-line-strong bg-white px-3 py-2.5 text-small text-primary focus-visible:ring-offset-white"
            : "px-1.5 py-1 text-[11px] text-white/85 hover:text-white focus-visible:ring-offset-primary"
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Globe
              className={cn(isPanel ? "h-4 w-4" : "h-3.5 w-3.5")}
              aria-hidden="true"
            />
          )}
          <span className={cn(!isPanel && "sr-only sm:not-sr-only")}>
            {isPanel ? active.label : active.short}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t("selectLabel")}
          className={cn(
            "absolute z-50 mt-1 min-w-[13rem] overflow-hidden rounded-btn border border-line bg-white py-1 shadow-card-hover",
            isPanel ? "left-0 right-0" : "right-0"
          )}
        >
          {localeList.map((item) => {
            const selected = item.code === locale;
            return (
              <li key={item.code} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  lang={item.code}
                  onClick={() => select(item.code)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-small transition-colors hover:bg-ivory focus-visible:bg-ivory focus-visible:outline-none",
                    selected ? "font-semibold text-primary" : "text-ink-muted"
                  )}
                >
                  <span>
                    {item.label}
                    {item.englishLabel !== item.label ? (
                      <span className="block text-caption text-ink-faint">
                        {item.englishLabel}
                      </span>
                    ) : null}
                  </span>
                  {selected ? (
                    <Check
                      className="h-3.5 w-3.5 shrink-0 text-secondary"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
