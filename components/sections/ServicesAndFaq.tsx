import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { landingFaqs } from "@/lib/seo";

const capabilities = [
  {
    title: "Fintech & SaaS Dashboards",
    description:
      "Data-dense admin panels, RBAC workflows, and real-time analytics engineered for <100ms optimistic UI.",
    href: "/projects/villeto",
    cta: "See Villeto case study",
    tag: "Next.js · Zustand",
  },
  {
    title: "Web Apps & Light Backend",
    description:
      "Full-stack Next.js applications with API routes, Supabase/PostgreSQL, authentication, and Stripe payments.",
    href: "/services",
    cta: "View services & pricing",
    tag: "Next.js · Supabase · Stripe",
  },
  {
    title: "High-Converting Landing Pages",
    description:
      "Fast, SEO-ready marketing pages built to score 99+ on Lighthouse and turn visitors into booked calls.",
    href: "/estimate",
    cta: "Estimate your project",
    tag: "Core Web Vitals · SEO",
  },
  {
    title: "Frontend Architecture & Audits",
    description:
      "WCAG accessibility, performance profiling, and scalable component systems for growing product teams.",
    href: "/skills",
    cta: "View technical stack",
    tag: "WCAG · Performance",
  },
] as const;

export default function ServicesAndFaq() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      style={{
        padding: "0 clamp(16px, 4vw, 32px) clamp(56px, 7vw, 96px)",
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Capabilities Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "clamp(12px, 2vw, 16px)",
          marginBottom: "clamp(24px, 3vw, 36px)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "var(--text-xs)",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "clamp(8px, 1vw, 12px)",
            }}
          >
            // Capabilities
          </p>
          <h2
            id="capabilities-heading"
            className="font-display"
            style={{
              fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            What I Build for Teams
          </h2>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="/process"
            className="hover-pill-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "var(--text-sm)",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: 999,
              minHeight: 40,
            }}
          >
            How I Work
          </Link>
          <Link
            href="/about"
            className="hover-pill-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "var(--text-sm)",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: 999,
              minHeight: 40,
            }}
          >
            About Sodiq
          </Link>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: "clamp(14px, 2vw, 20px)",
          marginBottom: "clamp(48px, 6vw, 72px)",
        }}
      >
        {capabilities.map((item) => (
          <article
            key={item.title}
            className="hover-border"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "clamp(12px, 1.5vw, 16px)",
              padding: "clamp(20px, 2.5vw, 26px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 16,
              transition: "border-color 0.2s",
            }}
          >
            <div>
              <span
                className="tech-pill"
                style={{ display: "inline-block", marginBottom: 12 }}
              >
                {item.tag}
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(17px, 2vw, 20px)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                  lineHeight: 1.25,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </div>

            <Link
              href={item.href}
              className="hover-accent-text"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-code)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {item.cta}
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>

      {/* FAQ Section */}
      <div
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "clamp(12px, 2vw, 20px)",
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: "clamp(20px, 3vw, 28px)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "var(--text-xs)",
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}
            >
              // FAQ
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Common Questions
            </h2>
          </div>

          <Link
            href="/contact"
            className="hover-accent-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              textDecoration: "none",
              paddingBottom: 2,
            }}
          >
            Start a conversation
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {landingFaqs.map((faq) => (
            <details
              key={faq.question}
              className="hover-border"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "14px 18px",
                transition: "border-color 0.2s",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  lineHeight: 1.5,
                  listStylePosition: "outside",
                }}
              >
                {faq.question}
              </summary>
              <p
                style={{
                  marginTop: 10,
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

