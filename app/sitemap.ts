import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-11-13T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/projects`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/estimate`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/process`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/skills`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => !["hypacode-portfolio", "e-commerce", "wild-oasis"].includes(p.slug))
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

  return [...staticRoutes, ...projectRoutes];
}
