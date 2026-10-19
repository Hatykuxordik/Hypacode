import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hypacode.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/skills`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/estimate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/process`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/uses`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  // Dynamic project case study routes — these are your most content-rich pages
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => !["hypacode-portfolio", "e-commerce", "wild-oasis"].includes(p.slug))
    .map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

  return [...staticRoutes, ...projectRoutes];
}
