import type { MetadataRoute } from "next";
import { departments } from "@/lib/content/ministry";
import { newsPosts } from "@/lib/content/news";
import { FEATURED_PROJECTS } from "@/lib/content/projects";

const base = "https://nomadicafairs.nigerstate.gov.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/departments",
    "/programmes",
    "/resources",
    "/projects",
    "/education",
    "/education/schools",
    "/peace-security",
    "/data",
    "/gallery",
    "/contact",
    "/news"
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const extra = [
    ...departments.map((dept) => `/departments/${dept.slug}`),
    ...newsPosts.map((post) => `/news/${post.slug}`),
    ...FEATURED_PROJECTS.map((project) => `/projects/${project.id}`)
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...extra];
}
