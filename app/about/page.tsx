import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About Sodiq Atiku — Frontend Engineer",
  description:
    "Sodiq Atiku is a frontend engineer with 3+ years building fintech dashboards and B2B SaaS products using React and Next.js. Available for remote projects worldwide.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Sodiq Atiku — Frontend Engineer | Hypacode",
    description:
      "3+ years building production React apps for fintech and B2B teams. Based in Lagos, available to work remotely with clients in the UK, US, Canada, and globally.",
    url: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
