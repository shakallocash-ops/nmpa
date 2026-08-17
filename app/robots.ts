import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/unauthorized"]
      }
    ],
    sitemap: "https://nomadicafairs.nigerstate.gov.ng/sitemap.xml"
  };
}
