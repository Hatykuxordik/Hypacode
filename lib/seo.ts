import { personalInfo, projects } from "@/lib/data";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hypacode.vercel.app"
).replace(/\/+$/, "");

export const INDEXNOW_KEY = "46d9d51704a346c885dd34524d24a0e1";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#service`;

export function getGlobalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: personalInfo.brandName,
        url: SITE_URL,
        description:
          "Frontend engineering portfolio of Sodiq Atiku (Hypacode) — React, Next.js, and TypeScript web apps, fintech dashboards, and landing pages.",
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: personalInfo.name,
        alternateName: personalInfo.brandName,
        url: SITE_URL,
        image: `${SITE_URL}/assets/sodiq-atiku.jpg`,
        email: `mailto:${personalInfo.displayEmail}`,
        jobTitle: personalInfo.title,
        description:
          "Frontend engineer building websites, web apps, dashboards, and landing pages with React, Next.js, and TypeScript. Available for remote work with clients worldwide.",
        worksFor: {
          "@type": "Organization",
          name: "Villeto",
          url: "https://villeto.com",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressRegion: "LA",
          addressCountry: "NG",
        },
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Full-Stack Next.js",
          "REST APIs",
          "Supabase",
          "PostgreSQL",
          "Stripe Integration",
          "Tailwind CSS",
          "Zustand",
          "Web Performance",
          "Core Web Vitals",
          "Web Accessibility",
          "Fintech Dashboards",
          "SaaS Applications",
        ],
        sameAs: [
          personalInfo.github,
          personalInfo.linkedin,
          personalInfo.twitter,
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": SERVICE_ID,
        name: "Hypacode — Remote React, Next.js & Full-Stack Engineering",
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        description:
          "Remote frontend and full-stack Next.js engineering for startups and teams worldwide: SaaS web apps, fintech dashboards, Supabase & Stripe integrations, API routes, and high-converting landing pages.",
        provider: { "@id": PERSON_ID },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Netherlands" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Nigeria" },
        ],
        serviceType: [
          "Frontend Development",
          "Full-Stack Next.js Development",
          "React Development",
          "Next.js Development",
          "SaaS MVP Development",
          "Supabase & API Integration",
          "Stripe Payment Integration",
          "Dashboard Development",
          "Landing Page Development",
          "UI Engineering",
        ],
        priceRange: "$350 – $15,000",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/contact`,
          availableLanguage: ["English"],
        },
      },
    ],
  };
}

export const landingFaqs = [
  {
    question: "What types of frontend and full-stack projects do you build?",
    answer:
      "I build React, Next.js, and TypeScript web applications, fintech and SaaS dashboards, marketing landing pages, and full-stack Next.js builds with API routes, Supabase/PostgreSQL, authentication, and Stripe payments.",
  },
  {
    question: "How much does a website or web app cost?",
    answer:
      "Landing pages start from $350, business websites from $800–$1,500, and full web apps or SaaS dashboards from $1,500–$4,000+ (with optional auth, Stripe payments, or API integrations). You can get an instant ballpark quote on the Estimate page.",
  },
  {
    question: "Do you work remotely with clients in the US, UK, Canada, and Europe?",
    answer:
      "Yes. Operating in UTC+1 gives full workday overlap with UK and European teams and strong morning overlap with US East Coast and Canadian teams. I work remotely with international clients and bill in USD, GBP, or EUR.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Landing pages typically ship in 1–2 weeks, business websites in 2–3 weeks, and custom web applications or dashboards in 3–8 weeks with weekly progress updates.",
  },
  {
    question: "How do we start working together?",
    answer:
      "You can generate an instant project estimate, send a brief via the Contact page, or book a free 30-minute discovery call to align on scope, timeline, and deliverables.",
  },
] as const;

export function getHomePageJsonLd() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Hypacode — Frontend Engineer | React & Next.js Developer for Hire",
        description:
          "Sodiq Atiku (Hypacode) builds fast, accessible Next.js and React web apps, fintech dashboards, and landing pages for teams worldwide.",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#featured-projects`,
        name: "Featured Frontend Engineering Projects",
        itemListElement: featured.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.name,
            description: `${project.tagline}. ${project.outcome}`,
            url: `${SITE_URL}/projects/${project.slug}`,
            image: `${SITE_URL}${project.image}`,
            creator: { "@id": PERSON_ID },
            keywords: project.stack.join(", "),
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: landingFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

