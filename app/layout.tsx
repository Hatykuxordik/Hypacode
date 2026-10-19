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
    default: "Hypacode — Frontend Engineer | React & Next.js Developer for Hire",
  },
  description:
    "Sodiq Atiku is a frontend engineer available for remote projects worldwide. I build websites, web apps, dashboards, and landing pages with React, Next.js, and TypeScript. Open to clients in the UK, US, Canada, Australia, Nigeria, UAE, and beyond.",
  keywords: [
    // ── Hire-intent ──
    "hire frontend developer",
    "hire React developer",
    "hire Next.js developer",
    "hire TypeScript developer",
    "frontend developer for hire",
    "frontend engineer for hire",
    "freelance frontend developer",
    "freelance frontend engineer",
    "freelance React developer",
    "remote frontend developer",
    "remote React developer",
    "remote web developer for hire",
    "frontend engineer remote",
    "Next.js developer remote",
    // ── Project-type ──
    "web developer for small business",
    "website developer for hire",
    "landing page developer",
    "web app developer",
    "web application developer",
    "dashboard developer",
    "fintech dashboard developer",
    "React developer for website",
    "React developer for startups",
    "Next.js website developer",
    // ── Geography ──
    "frontend developer UK",
    "frontend engineer UK",
    "frontend developer US",
    "frontend engineer US",
    "frontend developer Canada",
    "frontend engineer Canada",
    "frontend developer Australia",
    "frontend developer Germany",
    "frontend developer Netherlands",
    "frontend developer UAE",
    "frontend developer Nigeria",
    "web developer Nigeria",
    // ── Brand / name ──
    "Sodiq Atiku",
    "Hypacode",
  ],
  authors: [{ name: "Sodiq Atiku", url: "https://hypacode.vercel.app" }],
  creator: "Sodiq Atiku",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_CA", "en_AU", "en_NG"],
    url: "/",
    siteName: "Hypacode",
    title: "Hypacode — Frontend Developer for Hire | React & Next.js",
    description:
      "I build websites, web apps, dashboards, and landing pages with React and Next.js. Available remotely to clients in the UK, US, Canada, Australia, UAE, Nigeria, and worldwide.",
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
    title: "Hypacode — Frontend Developer for Hire",
    description: "React & Next.js developer available for remote projects worldwide. Websites, web apps, dashboards, and landing pages.",
    images: ["/assets/og/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  verification: {
    google: "KOr8VD45R0eIUNpYmD5DlevdY31QNE_sXoY0dNbmpMI",
    other: { "msvalidate.01": "A2EEB7B5D7316FD54C09F1E639B6B579" },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "en-GB": "/",
      "en-CA": "/",
      "en-AU": "/",
      "en-NG": "/",
      "x-default": "/",
    },
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
        ${syne.variable}
        ${plusJakartaSans.variable}
        ${jetBrainsMono.variable}
      `}
    >
      <head>
        {/* Bing / Edge / MSN geo targeting */}
        <meta name="geo.region" content="NG-LA" />
        <meta name="geo.placename" content="Lagos, Nigeria" />
        <meta name="geo.position" content="6.5244;3.3792" />
        <meta name="ICBM" content="6.5244, 3.3792" />
        {/* Remote/worldwide service signal for Bing */}
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        {/* MS application tile */}
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="theme-color" content="#0f172a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Sodiq Atiku",
                url: "https://hypacode.vercel.app",
                jobTitle: "Frontend Engineer",
                description: "Frontend engineer building websites, web apps, dashboards, and landing pages with React, Next.js, and TypeScript. Available for remote work with clients worldwide.",
                worksFor: { "@type": "Organization", name: "Villeto" },
                address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
                sameAs: [
                  "https://github.com/Hatykuxordik",
                  "https://linkedin.com/in/sodiq-atiku",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Hypacode — Frontend Engineering",
                url: "https://hypacode.vercel.app",
                description: "Freelance frontend engineering services for clients worldwide. I build websites, landing pages, web apps, e-commerce stores, dashboards, and admin panels using React, Next.js, and TypeScript. Available remotely to clients in the UK, US, Canada, Australia, UAE, Germany, Netherlands, Nigeria, and anywhere else.",
                provider: { "@type": "Person", name: "Sodiq Atiku" },
                areaServed: ["GB", "US", "CA", "AU", "NG", "AE", "DE", "NL", "ZA", "GH", "Worldwide"],
                serviceType: [
                  "Frontend Development",
                  "React Development",
                  "Next.js Development",
                  "Website Development",
                  "Landing Page Development",
                  "Web App Development",
                  "Dashboard Development",
                  "E-commerce Development",
                  "UI Development",
                ],
                priceRange: "$350 – $10,000+",
                availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://hypacode.vercel.app/contact" },
              },
            ]),
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
        <AIChatWidget />
        <footer role="contentinfo">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
