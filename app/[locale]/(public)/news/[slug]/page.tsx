import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link2 } from "lucide-react";
import { FacebookIcon, TwitterIcon } from "@/components/public/BrandIcons";
import { PageHero } from "@/components/public/PageHero";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Link } from "@/i18n/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getNews, newsPosts } from "@/lib/content/news";
import {
  getLocalisedNews,
  getLocalisedRelatedNews
} from "@/lib/i18n/records";
import { getFormatters } from "@/lib/i18n/server-format";
import { newsCategoryKey } from "@/lib/i18n/labels";
import { buildPageMetadata, SITE_URL } from "@/lib/i18n/metadata";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    newsPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const post = (await getLocalisedNews(params.slug)) ?? getNews(params.slug);
  if (!post) {
    return buildPageMetadata({
      locale: params.locale,
      path: `/news/${params.slug}`,
      page: "notFound"
    });
  }
  return buildPageMetadata({
    locale: params.locale,
    path: `/news/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    images: [post.image]
  });
}

export default async function NewsDetailPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  if (isLocale(params.locale)) setRequestLocale(params.locale);

  const post = await getLocalisedNews(params.slug);
  if (!post) notFound();

  const t = await getTranslations("news.detail");
  const nav = await getTranslations("nav");
  const categoryLabels = await getTranslations("news.categories");
  const { formatDate } = await getFormatters();

  const related = await getLocalisedRelatedNews(post.slug);
  const url = `${SITE_URL}/${params.locale}/news/${post.slug}`;

  function categoryLabel(value: string) {
    const key = newsCategoryKey(value);
    return key ? categoryLabels(key as never) : value;
  }

  return (
    <>
      <PageHero
        eyebrow={`${categoryLabel(post.category)} · ${formatDate(post.date)}`}
        title={post.title}
        image={post.image}
        crumbs={[
          { href: "/", label: nav("home") },
          { href: "/news", label: nav("news") },
          { href: `/news/${post.slug}`, label: post.title }
        ]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
            <article>
              <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-line">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              <p className="mt-8 border-l-4 border-accent pl-5 text-body-lg font-medium text-primary">
                {post.excerpt}
              </p>

              <div className="prose-gov mt-8 max-w-prose">
                {post.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                <p className="text-caption font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  {t("share")}
                </p>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t("shareTwitter")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong text-primary hover:border-primary hover:bg-ivory"
                  >
                    <TwitterIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t("shareFacebook")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong text-primary hover:border-primary hover:bg-ivory"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={url}
                    aria-label={t("permalink")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong text-primary hover:border-primary hover:bg-ivory"
                  >
                    <Link2 className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>

            <aside>
              <div className="rounded-card border border-line bg-ivory p-6">
                <h2 className="font-serif text-h4 font-bold text-primary">
                  {t("itemDetails")}
                </h2>
                <span className="accent-rule mt-3" />
                <dl className="mt-5 space-y-3.5 text-small">
                  <div>
                    <dt className="text-caption font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      {t("category")}
                    </dt>
                    <dd className="mt-0.5 font-medium text-primary">
                      {categoryLabel(post.category)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-caption font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      {t("datePublished")}
                    </dt>
                    <dd className="mt-0.5 font-medium text-primary">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-caption font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      {t("issuedBy")}
                    </dt>
                    <dd className="mt-0.5 font-medium text-primary">
                      {t("issuingUnit")}
                    </dd>
                  </div>
                </dl>
                <Link
                  href="/news"
                  className="mt-6 inline-block text-small font-semibold text-secondary hover:text-primary"
                >
                  ← {t("allNews")}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-line bg-ivory">
          <div className="mx-auto max-w-content px-4 py-16 md:px-8 md:py-20">
            <SectionHeading
              eyebrow={t("relatedEyebrow")}
              title={t("relatedTitle")}
            />
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/news/${item.slug}`} className="group block">
                    <span className="relative block aspect-[16/9] overflow-hidden rounded-card border border-line">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </span>
                    <span className="mt-4 flex items-center gap-3">
                      <span className="text-caption font-semibold tracking-normal text-secondary">
                        {categoryLabel(item.category)}
                      </span>
                      <time
                        dateTime={item.date}
                        className="text-caption tracking-normal text-ink-faint"
                      >
                        {formatDate(item.date)}
                      </time>
                    </span>
                    <span className="mt-1.5 block font-serif text-h4 font-bold text-primary group-hover:text-secondary">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
