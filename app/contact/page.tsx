import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Hire Me — Get in Touch",
  description:
    "Looking to hire a frontend developer? Reach out to discuss your project. Available for remote work with clients in the UK, US, Canada, and worldwide.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Hire Sodiq Atiku — Frontend Engineer | Hypacode",
    description:
      "Available for remote frontend projects globally. React, Next.js, TypeScript specialist. Book a free discovery call or send a message.",
    url: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
