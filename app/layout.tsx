import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import SkipToMain from "@/components/layout/SkipToMain";
import PageTransition from "@/components/layout/PageTransition";
import LazyChatWidget from "@/components/layout/LazyChatWidget";
import { SITE_URL, getGlobalJsonLd } from "@/lib/seo";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-code",
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

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080d18",
  colorScheme: "dark",
};

// ─── Metadata (server-only — cannot be in a "use client" file) ───────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Hypacode — Remote Next.js & React Engineer",
    default:
      "Hypacode — Remote React, Next.js & Full-Stack Engineer for Hire",
  },
  description:
    "Remote React, Next.js & TypeScript engineer building fast web apps, fintech dashboards, Supabase APIs, and landing pages for US, UK & global teams.",
  authors: [{ name: "Sodiq Atiku", url: SITE_URL }],
  creator: "Sodiq Atiku",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_CA", "en_AU"],
    url: "/",
    siteName: "Hypacode",
    title: "Hypacode — Remote React, Next.js & Full-Stack Engineer for Hire",
    description:
      "Fast, accessible web apps, fintech dashboards, Supabase & Stripe integrations, and landing pages built with React, Next.js, and TypeScript. Working remotely with UK, US, EU & global teams.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hypacode",
    title: "Hypacode — Remote React, Next.js & Full-Stack Engineer",
    description:
      "Remote React, Next.js & TypeScript engineer building web apps, fintech dashboards, API integrations, and landing pages for teams worldwide.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "KOr8VD45R0eIUNpYmD5DlevdY31QNE_sXoY0dNbmpMI",
    other: { "msvalidate.01": "A2EEB7B5D7316FD54C09F1E639B6B579" },
  },
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
        ${jetBrainsMono.variable}
      `}
    >
      <head>
        {/* Remote/worldwide service signal */}
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        {/* MS application tile */}
        <meta name="msapplication-TileColor" content="#080d18" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getGlobalJsonLd()),
          }}
        />
      </head>
      <body>
        <SkipToMain />
        <CustomCursor />
        <header role="banner">
          <Navbar />
        </header>
        <PageTransition>{children}</PageTransition>
        <LazyChatWidget />
        <footer role="contentinfo">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
