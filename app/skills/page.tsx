import type { Metadata } from "next";
import SkillsPage from "./SkillsPage";

export const metadata: Metadata = {
  title: "Skills & Tech Stack",
  description:
    "Expert in React 19, Next.js 16, TypeScript, and modern frontend architecture. Specialized in fintech dashboards, performance optimization, and web accessibility.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Skills & Tech Stack — Hypacode",
    description:
      "Every skill used in production: React, Next.js, TypeScript, Supabase, Tailwind CSS, Framer Motion, and more. Real experience, not tutorials.",
    url: "/skills",
  },
};

export default function Page() {
  return <SkillsPage />;
}
