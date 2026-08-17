import { getTranslations } from "next-intl/server";
import { newsPosts, type NewsPost } from "@/lib/content/news";
import type { PublicProject } from "@/lib/content/projects";

/**
 * Overlay catalogue copy onto published records. Official names, LGA names,
 * dates, budgets and emails stay on the source object.
 */
export async function getLocalisedNewsPosts(): Promise<NewsPost[]> {
  const t = await getTranslations("records.news");
  return newsPosts.map((post) => {
    if (!t.has(`${post.slug}.title`)) return post;
    const body = t.raw(`${post.slug}.body`);
    return {
      ...post,
      title: t(`${post.slug}.title`),
      excerpt: t(`${post.slug}.excerpt`),
      body: Array.isArray(body) ? (body as string[]) : post.body
    };
  });
}

export async function getLocalisedNews(slug: string) {
  const posts = await getLocalisedNewsPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getLocalisedRelatedNews(slug: string) {
  const posts = await getLocalisedNewsPosts();
  return posts.filter((post) => post.slug !== slug).slice(0, 3);
}

export async function localiseProjects(projects: PublicProject[]) {
  const t = await getTranslations("records.projects");
  return projects.map((project) => {
    if (!t.has(`${project.id}.title`)) return project;
    const steps = t.raw(`${project.id}.timeline`);
    return {
      ...project,
      title: t(`${project.id}.title`),
      description: t(`${project.id}.description`),
      impact: t(`${project.id}.impact`),
      timeline: Array.isArray(steps)
        ? project.timeline.map((entry, index) => {
            const step = (steps as Array<{ title?: string; body?: string }>)[
              index
            ];
            return {
              ...entry,
              title: step?.title ?? entry.title,
              body: step?.body ?? entry.body
            };
          })
        : project.timeline
    };
  });
}
