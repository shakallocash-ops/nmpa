"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, X } from "lucide-react";
import {
  galleryCategories,
  galleryItems,
  videos
} from "@/lib/content/gallery";
import { galleryCategoryKey } from "@/lib/i18n/labels";
import { cn } from "@/lib/utils";

type GalleryItem = (typeof galleryItems)[number];

export function GalleryGrid() {
  const t = useTranslations("gallery");
  const categories = useTranslations("gallery.categories");
  const items_ = useTranslations("gallery.items");
  const videoItems = useTranslations("gallery.video.items");

  const [category, setCategory] =
    useState<(typeof galleryCategories)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () =>
      category === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === category),
    [category]
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function categoryLabel(value: string) {
    const key = galleryCategoryKey(value);
    return key ? categories(key as never) : value;
  }

  function title(item: GalleryItem) {
    return items_(`${item.id}.title` as never);
  }

  function caption(item: GalleryItem) {
    return items_(`${item.id}.caption` as never);
  }

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t("filterAria")}
      >
        {galleryCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={cn(
              "inline-flex h-10 items-center rounded-btn border px-4 text-small font-medium transition-colors",
              category === item
                ? "border-primary bg-primary text-white"
                : "border-line-strong bg-white text-ink-muted hover:border-primary hover:text-primary"
            )}
          >
            {categoryLabel(item)}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group block w-full overflow-hidden rounded-card border border-line bg-white text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={item.image}
                  alt={title(item)}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </span>
              <span className="block p-5">
                <span className="text-caption font-semibold tracking-normal text-secondary">
                  {categoryLabel(item.category)}
                </span>
                <span className="mt-1.5 block font-serif text-h4 font-bold text-primary">
                  {title(item)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <section
        aria-labelledby="video-library"
        className="mt-16 rounded-card border border-line bg-ivory p-6 md:p-8"
      >
        <h2
          id="video-library"
          className="font-serif text-h3 font-bold text-primary"
        >
          {t("video.title")}
        </h2>
        <span className="accent-rule mt-3" />
        <p className="mt-4 max-w-2xl text-small text-ink-muted">
          {t("video.description")}
        </p>
        <ul className="mt-5 space-y-2">
          {videos.map((video) => (
            <li key={video.id}>
              <a
                href={video.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-small font-semibold text-secondary hover:text-primary"
              >
                {videoItems(video.id as never)}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title(active)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-primary-dark/95 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label={t("lightbox.close")}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-btn border border-white/30 text-white hover:border-accent hover:text-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <figure
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={active.image}
                alt={title(active)}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <figcaption className="mt-4 text-white">
              <p className="text-caption font-semibold tracking-normal text-accent">
                {categoryLabel(active.category)}
              </p>
              <p className="mt-1 font-serif text-h3 font-bold text-white">
                {title(active)}
              </p>
              <p className="mt-2 max-w-3xl text-small text-white/75">
                {caption(active)}
              </p>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
