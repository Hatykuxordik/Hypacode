import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { personalInfo, pricing } from "@/lib/data";
import { PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services & Pricing — Remote React, Next.js & Full-Stack Development",
  description:
    "Remote React, Next.js & TypeScript development: fintech dashboards, Supabase & Stripe web apps, and landing pages. Transparent USD pricing worldwide.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Pricing — Remote React, Next.js & Full-Stack | Hypacode",
    description:
      "Landing pages from $350, business websites from $800, SaaS web apps & fintech dashboards from $1,500. Available remotely for UK, US, EU, Canada & global teams.",
    url: "/services",
  },
};

const serviceOfferings = [
  {
    id: "fintech-saas-dashboards",
    tag: "Frontend + Data Architecture",
    title: "Fintech & SaaS Dashboards",
    price: "$1,500 – $4,000+",
    timeline: "3–8 weeks",
    description:
      "Production-grade admin panels, spend management interfaces, and analytics dashboards with role-based access control (RBAC), optimistic UI, and real-time state.",
    deliverables: [
      "Next.js App Router + strict TypeScript",
      "Zustand / React Query caching & optimistic updates",
      "Granular RBAC permissions & form validation (Zod)",
      "95+ Lighthouse performance & WCAG AA accessibility",
    ],
    proofHref: "/projects/villeto",
    proofLabel: "See Villeto case study",
  },
  {
    id: "nextjs-full-stack-apps",
    tag: "Frontend + Light Backend",
    title: "Next.js Web Apps, Auth & APIs",
    price: "$1,500 – $4,000+",
    timeline: "3–8 weeks",
    description:
      "End-to-end web applications and MVPs combining polished React UIs with Next.js API routes, Supabase/PostgreSQL databases, authentication, and Stripe billing.",
    deliverables: [
      "Next.js Route Handlers & Server Actions",
      "Supabase Auth, PostgreSQL & Row-Level Security",
      "Stripe checkout, webhooks & transactional emails (Resend)",
      "Third-party REST API & AI SDK integrations",
    ],
    proofHref: "/projects/unistudyhub",
    proofLabel: "See UniStudyHub case study",
  },
  {
    id: "high-converting-landing-pages",
    tag: "Conversion + Technical SEO",
    title: "High-Converting Landing Pages & Sites",
    price: "$350 – $1,500",
    timeline: "1–3 weeks",
    description:
      "Fast, responsive marketing websites and product landing pages engineered for Core Web Vitals, technical SEO, and clear conversion paths.",
    deliverables: [
      "Custom responsive UI with Tailwind CSS & Motion",
      "Technical SEO, Open Graph, sitemap & JSON-LD schema",
      "Sub-second page loads & optimized AVIF/WebP media",
      "Lead capture forms, booking flows & analytics setup",
    ],
    proofHref: "/estimate",
    proofLabel: "Calculate your project estimate",
  },
  {
    id: "performance-accessibility-audits",
    tag: "Optimization & Refactoring",
    title: "Core Web Vitals, SEO & Code Audits",
    price: "From $400",
    timeline: "1–2 weeks",
    description:
      "Targeted engineering sprints to fix slow React/Next.js apps, eliminate layout shifts, improve Lighthouse/INP scores, and ship clean TypeScript refactors.",
    deliverables: [
      "Bundle splitting, RSC migration & hydration reduction",
      "LCP, CLS & INP profiling and concrete fixes",
      "Semantic HTML, keyboard nav & WCAG AA compliance",
      "Technical SEO & structured data implementation",
    ],
    proofHref: "/skills",
    proofLabel: "Explore technical stack",
  },
] as const;

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/services#webpage`,
      url: `${SITE_URL}/services`,
      name: "Services & Pricing — Remote React, Next.js & Full-Stack Development",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE_URL}/services`,
        },
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "Hypacode Frontend & Full-Stack Next.js Services",
      itemListElement: serviceOfferings.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@id": PERSON_ID },
        },
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <div
      style={{
        width: "100%",
        paddingTop: "calc(72px + var(--space-8))",
        paddingBottom: "var(--space-16)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <div className="container" style={{ maxWidth: 1100 }}>
        {/* Header */}
        <header style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <p
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "var(--text-xs)",
              color: "var(--accent)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            // Services &amp; Pricing · Remote Worldwide
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(30px, 5vw, 52px)",
              lineHeight: 1.08,
              color: "var(--text-primary)",
              fontWeight: "normal",
              marginBottom: 16,
              maxWidth: 820,
            }}
          >
            Frontend Engineering &amp;{" "}
            <span style={{ color: "var(--accent)" }}>Full-Stack Next.js</span>{" "}
            for Global Teams
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: 680,
              marginBottom: 24,
            }}
          >
            I partner remotely with startups, agencies, and product teams in the
            US, UK, Canada, Europe, and worldwide—shipping fast React &amp;
            Next.js interfaces backed by clean APIs, Supabase, auth, and Stripe
            integrations.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/estimate" className="hypa-cta-pill">
              Get an Instant Estimate
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <a
              href={personalInfo.calBooking30}
              target="_blank"
              rel="noopener noreferrer"
              className="hypa-secondary-pill"
            >
              Book a 30-Min Discovery Call
            </a>
          </div>
        </header>

        {/* Service Cards */}
        <section
          aria-labelledby="service-offerings-heading"
          style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}
        >
          <h2 id="service-offerings-heading" className="sr-only">
            Core Services
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
              gap: "clamp(16px, 2.5vw, 24px)",
            }}
          >
            {serviceOfferings.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="hover-border"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "clamp(22px, 3vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 14,
                    }}
                  >
                    <span className="tech-pill">{service.tag}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-code)",
                        fontSize: "var(--text-xs)",
                        color: "var(--accent-success)",
                        fontWeight: 600,
                      }}
                    >
                      {service.price} · {service.timeline}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 26px)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 10,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                      marginBottom: 18,
                    }}
                  >
                    {service.description}
                  </p>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          fontSize: "var(--text-sm)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          style={{
                            color: "var(--accent-success)",
                            flexShrink: 0,
                            marginTop: 3,
                          }}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={service.proofHref}
                  className="hover-accent-text"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {service.proofLabel}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Transparent Add-ons */}
        <section
          aria-labelledby="addons-heading"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "clamp(24px, 4vw, 36px)",
          }}
        >
          <h2
            id="addons-heading"
            className="font-display"
            style={{
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: 10,
            }}
          >
            Light Backend &amp; Feature Add-Ons
          </h2>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              marginBottom: 20,
              maxWidth: 640,
            }}
          >
            Need backend capabilities alongside your frontend? Add auth,
            payments, CMS, or third-party API integrations cleanly to any build:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {pricing.addOns.map((addon) => (
              <div
                key={addon.label}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  {addon.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "var(--text-xs)",
                    color: "var(--accent-light)",
                  }}
                >
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/estimate" className="hypa-cta-pill">
              Build Your Custom Estimate
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="hypa-secondary-pill">
              Send a Project Brief
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

