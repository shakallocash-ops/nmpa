"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import type { NewsPost } from "@/lib/content/news";
import { Link } from "@/i18n/navigation";
import { publicFieldClass } from "@/lib/public-ui";
import { newsCategoryKey } from "@/lib/i18n/labels";
import { useI18nFormat } from "@/lib/i18n/use-format";
import { cn } from "@/lib/utils";

const pageSize = 6;
const categories = ["All", "Press Releases", "Announcements", "Events"] as const;

export function NewsList({ posts }: { posts: NewsPost[] }) {
  const t = useTranslations("news");
  const common = useTranslations("common");
  const categoryLabels = useTranslations("news.categories");
  const { formatDate } = useI18nFormat();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== "All" && post.category !== category) return false;
      if (
        q &&
        !post.title.toLowerCase().includes(q) &&
        !post.excerpt.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [category, posts, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * pageSize, current * pageSize);

  function categoryLabel(value: string) {
    if (value === "All") return categoryLabels("all");
    const key = newsCategoryKey(value);
    return key ? categoryLabels(key as never) : value;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-card border border-line bg-ivory p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="relative w-full max-w-md">
          <label htmlFor="news-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
            aria-hidden="true"
          />
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={t("searchPlaceholder")}
            className={cn(publicFieldClass, "pl-9")}
          />
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t("filterAria")}
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
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
      </div>

      <ul className="mt-10 grid gap-8 md:grid-cols-2">
        {slice.map((post) => (
          <li key={post.slug}>
            <Link href={`/news/${post.slug}`} className="group block">
              <span className="relative block aspect-[16/9] overflow-hidden rounded-card bg-mist">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </span>
              <span className="mt-4 flex items-center gap-3">
                <span className="rounded-full bg-secondary-light px-2.5 py-0.5 text-caption font-semibold tracking-normal text-secondary">
                  {categoryLabel(post.category)}
                </span>
                <time
                  dateTime={post.date}
                  className="text-caption tracking-normal text-ink-faint"
                >
                  {formatDate(post.date)}
                </time>
              </span>
              <span className="mt-2 block font-serif text-h3 font-bold text-primary group-hover:text-secondary">
                {post.title}
              </span>
              <span className="mt-2 block text-small text-ink-muted">
                {post.excerpt}
              </span>
              <span className="mt-3 inline-block text-small font-semibold text-secondary">
                {common("readMore")} →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-card border border-line bg-white p-10 text-center text-ink-muted">
          {t("empty")}
        </p>
      ) : null}

      {pages > 1 ? (
        <nav
          aria-label={t("paginationAria")}
          className="mt-10 flex items-center gap-3"
        >
          <button
            type="button"
            disabled={current === 1}
            onClick={() => setPage((value) => value - 1)}
            className="h-11 rounded-btn border border-line-strong px-5 text-small font-semibold text-primary disabled:opacity-40"
          >
            {common("previous")}
          </button>
          <p className="text-small text-ink-muted">
            {common("pageOf", { current, total: pages })}
          </p>
          <button
            type="button"
            disabled={current === pages}
            onClick={() => setPage((value) => value + 1)}
            className="h-11 rounded-btn border border-line-strong px-5 text-small font-semibold text-primary disabled:opacity-40"
          >
            {common("next")}
          </button>
        </nav>
      ) : null}
    </div>
  );
}
