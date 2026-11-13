import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import MicroCaseStudy from "@/components/sections/MicroCaseStudy";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServicesAndFaq from "@/components/sections/ServicesAndFaq";
import { getHomePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute:
      "Hypacode — Remote React, Next.js & Full-Stack Engineer for Hire",
  },
  description:
    "Hire Sodiq Atiku (Hypacode) for fast, accessible React, Next.js & TypeScript web apps, fintech dashboards, Supabase & Stripe integrations, and landing pages. Remote worldwide (US, UK, EU, CA).",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hypacode — Remote React, Next.js & Full-Stack Engineer for Hire",
    description:
      "Fast, accessible React, Next.js & TypeScript web apps, fintech dashboards, Supabase/API integrations, and landing pages. Working remotely with US, UK, EU & global teams.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomePageJsonLd()),
        }}
      />
      <HeroSection />
      <MicroCaseStudy />
      <FeaturedProjects />
      <TestimonialsSection />
      <ServicesAndFaq />
    </>
  );
}
