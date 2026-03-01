import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Syne,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import SkipToMain from "@/components/layout/SkipToMain";
import PageTransition from "@/components/layout/PageTransition";
import AIChatWidget from "@/components/layout/AIChatWidget";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// ─── Metadata (server-only — cannot be in a "use client" file) ───────────────

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hypacode.vercel.app",
  ),
  title: {
    template: "%s | Hypacode — Frontend Engineer",
    default:
      "Hypacode — Frontend Engineer specializing in Fintech & B2B Platforms",
  },
  description:
    "Sodiq Atiku is a Lagos-based frontend engineer building fast, accessible React applications for fintech startups and B2B SaaS products. Available for new projects.",
  keywords: [
    "frontend engineer",
    "React developer",
    "Next.js",
    "fintech dashboard",
    "Lagos Nigeria",
    "Hypacode",
    "TypeScript",
    "Sodiq Atiku",
    "web developer",
  ],
  authors: [{ name: "Sodiq Atiku", url: "https://hypacode.vercel.app" }],
  creator: "Sodiq Atiku",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Hypacode",
    title: "Hypacode — Build Fast, Accessible Next.js",
    description:
      "I build Interfaces that earn trust and drive results with precision — built for teams that refuse slow, fragile, or forgettable products.",
    images: [
      {
        url: "/assets/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Hypacode — Frontend Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hypacode",
    images: ["/assets/og/og-default.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${geist.variable}
        ${geistMono.variable}
        ${syne.variable}
        ${plusJakartaSans.variable}
        ${jetBrainsMono.variable}
      `}
    >
      <body>
        <SkipToMain />
        <CustomCursor />
        <header role="banner">
          <Navbar />
        </header>
        <PageTransition>{children}</PageTransition>
        <AIChatWidget />
        <footer role="contentinfo">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
