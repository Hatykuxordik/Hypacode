import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import MicroCaseStudy from "@/components/sections/MicroCaseStudy";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
// import HomepageCTA from "@/components/sections/HomepageCTA";

export const metadata: Metadata = {
  title: "Hypacode — Frontend Engineer | Sodiq Atiku",
  description:
    "I build fast, accessible Next.js and React apps for fintech, SaaS and product teams. Based in Lagos, Nigeria.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MicroCaseStudy />
      <FeaturedProjects />
      {/* <HomepageCTA /> */}
    </>
  );
}
