"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function MicroCaseStudy() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 32px) clamp(48px, 6vw, 80px)",
      }}
    >
      <div
        style={{
          borderRadius: "clamp(12px, 2vw, 20px)",
          overflow: "hidden",
          background: `linear-gradient(135deg, var(--bg-elevated) 0%, rgba(15, 23, 41, 0.8) 100%)`,
          border: "1px solid var(--border)",
          position: "relative",
        }}
      >
        {/* Accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, var(--accent) 0%, transparent 100%)`,
          }}
        />

        <div
          style={{
            padding: "clamp(24px, 5vw, 48px)",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(24px, 4vw, 48px)",
            alignItems: "center",
          }}
          className="micro-case-grid"
        >
          <style>{`
        @media (min-width: 768px) {
          .micro-case-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>

          {/* Left */}
          <div>
            {/* Section label */}
            <p
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "var(--text-xs)",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 16px)",
              }}
            >
              ★ Featured Case Study
            </p>

            {/* Headline */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "clamp(16px, 2vw, 24px)",
                lineHeight: 1.1,
                color: "var(--text-primary)",
              }}
            >
              Villeto
            </h2>

            {/* Rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(12px, 2vw, 20px)",
              }}
            >
              {[
                {
                  label: "Problem",
                  value:
                    "Businesses lacked real-time visibility into spend, cards, and vendor workflows",
                },
                {
                  label: "What I Built",
                  value:
                    "Full spend management dashboard: onboarding, card ops, role-based access, vendor management",
                },
                {
                  label: "Result",
                  value:
                    "Production-grade platform serving live business users at Villeto",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{ display: "flex", gap: "clamp(8px, 1.5vw, 16px)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "var(--text-xs)",
                      color: "var(--accent)",
                      width: "clamp(70px, 10vw, 90px)",
                      flexShrink: 0,
                      paddingTop: 2,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech pills */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: "clamp(16px, 2vw, 24px)",
              }}
            >
              {[
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Zustand",
                "REST APIs",
              ].map((t) => (
                <span
                  key={t}
                  className="tech-pill"
                  style={{
                    padding: "3px 8px",
                    background: "var(--accent-secondary-muted)",
                    border: "1px solid var(--accent-secondary-border)",
                    borderRadius: 4,
                    fontFamily: "var(--font-code)",
                    fontSize: "var(--text-xs)",
                    color: "var(--accent-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA link */}
            <Link
              href="/projects/villeto"
              aria-label="View the full Villeto case study"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: "clamp(16px, 2vw, 24px)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
                borderBottom: `1px solid var(--accent-border)`,
                paddingBottom: 2,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent-light)";
                e.currentTarget.style.borderBottomColor = "var(--accent-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderBottomColor =
                  "var(--accent-border)";
              }}
            >
              View Case Study
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right — decorative card */}
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "clamp(8px, 1.5vw, 16px)",
              padding: "clamp(16px, 3vw, 32px)",
              border: "1px solid var(--border)",
              position: "relative",
            }}
          >
            {/* Top accent */}
            <div
              style={{
                position: "absolute",
                top: -1,
                left: "clamp(16px, 2vw, 24px)",
                right: "clamp(16px, 2vw, 24px)",
                height: 2,
                background: "var(--accent-success)",
                borderRadius: 1,
              }}
            />

            {/* Code comment */}
            <p
              style={{
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-code)",
                color: "var(--text-muted)",
                marginBottom: "clamp(16px, 2vw, 24px)",
              }}
            >
              // dashboard.metrics.tsx
            </p>

            {/* Metrics */}
            {[
              {
                label: "Total Spend",
                value: "$124,850",
                delta: "+12.4%",
                positive: true,
              },
              {
                label: "Active Cards",
                value: "47",
                delta: "3 pending",
                positive: null,
              },
              {
                label: "Vendors",
                value: "128",
                delta: "+8 this month",
                positive: true,
              },
              {
                label: "Pending Approvals",
                value: "14",
                delta: "2 urgent",
                positive: false,
              },
            ].map((metric) => (
              <div
                key={metric.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "clamp(8px, 1.5vw, 12px) 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {metric.label}
                </span>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: "clamp(13px, 1.5vw, 15px)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-code)",
                    }}
                  >
                    {metric.value}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color:
                        metric.positive === true
                          ? "var(--accent-success)"
                          : metric.positive === false
                            ? "var(--error)"
                            : "var(--text-muted)",
                    }}
                  >
                    {metric.delta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
