import type { Metadata } from "next";
import ProjectsPage from "./ProjectsPage";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "Real-world case studies: fintech platforms, SaaS dashboards, and web apps built with React and Next.js. See the technical approach, problems solved, and measurable results.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects & Case Studies — Hypacode",
    description:
      "Production software built for real users — fintech dashboards, enterprise SaaS, and web apps. Each project documents the problem, process, and outcome.",
    url: "/projects",
  },
};

export default function Page() {
  return <ProjectsPage />;
}
