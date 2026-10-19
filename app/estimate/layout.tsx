import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Project Estimate",
  description:
    "Get an instant project estimate. Landing pages from $350, business websites from $1,500, web apps from $2,500, dashboards from $3,500. Transparent pricing, no surprises.",
  alternates: { canonical: "/estimate" },
  openGraph: {
    title: "Get a Project Estimate — Hypacode",
    description:
      "Instant project quotes with transparent pricing. Tell me what you need and get a ballpark in minutes — landing pages, web apps, dashboards, and more.",
    url: "/estimate",
  },
};

export default function EstimateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
