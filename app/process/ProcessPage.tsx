"use client";

import Link from "next/link";
import { personalInfo } from "@/lib/data";
import {
  Search,
  Pencil,
  Code2,
  Rocket,
  ArrowRight,
  Calendar,
  MessageSquare,
  FileCheck,
  Monitor,
  CheckCircle2,
  Clock,
  Shield,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Scoping",
    icon: Search,
    duration: "1–3 days",
    color: "#006ef5",
    description:
      "We start with a focused conversation about your goals, users, and constraints. No fluff — just the information needed to scope accurately.",
    deliverables: [
      "30-min discovery call or async brief",
      "Defined feature list and priorities",
      "Technical approach and architecture outline",
      "Fixed-price quote with timeline",
      "Signed project agreement",
    ],
    what_you_get:
      "A clear, written scope document you can reference throughout the project. You'll know exactly what's being built, when, and for how much.",
  },
  {
    number: "02",
    title: "Design & Prototype",
    icon: Pencil,
    duration: "3–7 days",
    color: "#38bdf8",
    description:
      "Before a single line of production code is written, you see and approve what's being built. We iterate until it feels right.",
    deliverables: [
      "High-fidelity Figma mockups (if needed)",
      "Interactive prototype for key user flows",
      "Mobile and desktop responsive layouts",
      "Component and typography decisions",
      "Your sign-off before development begins",
    ],
    what_you_get:
      "A clickable prototype that shows the actual experience. No surprises at launch — you approved the design before it was coded.",
  },
  {
    number: "03",
    title: "Build & Ship",
    icon: Code2,
    duration: "1–8 weeks",
    color: "#34d399",
    description:
      "Development happens in weekly sprints. Every Friday, you get a live staging link showing exactly where things stand.",
    deliverables: [
      "Weekly staging preview with progress notes",
      "Clean, well-documented codebase",
      "Responsive across all screen sizes",
      "Performance-optimized (90+ Lighthouse scores)",
      "Accessibility baked in from the start",
    ],
    what_you_get:
      "A live preview link every week. You're never in the dark — you can click through real progress, leave feedback, and track milestones.",
  },
  {
    number: "04",
    title: "Launch & Handoff",
    icon: Rocket,
    duration: "2–4 days",
    color: "#f59e0b",
    description:
      "We deploy to production, run final checks, and I hand you everything — code, credentials, documentation, and a walkthrough.",
    deliverables: [
      "Production deployment (Vercel, AWS, etc.)",
      "Full source code ownership transferred",
      "Documentation and Loom video walkthrough",
      "30-day post-launch bug-fix warranty",
      "Optional ongoing maintenance plan",
    ],
    what_you_get:
      "A launched product with zero loose ends. You own everything. The 30-day warranty means I fix any bugs that surface at no extra cost.",
  },
];

const GUARANTEES = [
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Agreed timelines are commitments, not estimates. If I'm behind, you'll know immediately — not at the deadline.",
  },
  {
    icon: MessageSquare,
    title: "Weekly Updates",
    description: "Every Friday you get a staging link and a written progress note. No chasing, no silence.",
  },
  {
    icon: Shield,
    title: "30-Day Warranty",
    description: "After launch, any bugs that surface are fixed at no additional cost for 30 days.",
  },
  {
    icon: FileCheck,
    title: "Full Ownership",
    description: "You own everything — source code, design files, credentials. No lock-in, no hostage hosting.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  return (
    <div
      style={{
        paddingTop: "calc(72px + var(--space-8))",
        paddingBottom: "var(--space-16)",
      }}
    >
      <style>{`
        .process-step-card {
          position: relative;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .process-step-card:hover {
          border-color: var(--border-default) !important;
          box-shadow: 0 0 0 1px var(--border-subtle), 0 8px 32px rgba(0,0,0,0.18);
        }
        .guarantee-card {
          transition: border-color 0.2s, transform 0.2s;
        }
        .guarantee-card:hover {
          border-color: var(--border-default) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 767px) {
          .process-timeline-line { display: none !important; }
          .guarantees-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1023px) {
          .guarantees-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div className="container">
        {/* ── Header ── */}
        <div style={{ marginBottom: "var(--space-10)" }}>
          <p
            style={{
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "8px",
            }}
          >
            How I Work
          </p>
          <h1
            style={{
              fontSize: "clamp(24px, 5vw, 56px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-3)",
            }}
          >
            From Idea to Launch
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              maxWidth: "640px",
              lineHeight: 1.7,
            }}
          >
            Every project follows the same structured process — designed for
            clarity, predictability, and zero surprises. Here&apos;s exactly
            what happens after you reach out.
          </p>
        </div>

        {/* ── Process Steps ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            marginBottom: "var(--space-12)",
            position: "relative",
          }}
        >
          {/* Vertical timeline line */}
          <div
            className="process-timeline-line"
            style={{
              position: "absolute",
              left: "31px",
              top: "40px",
              bottom: "40px",
              width: "2px",
              background:
                "linear-gradient(180deg, var(--accent) 0%, var(--accent-border) 50%, var(--border-subtle) 100%)",
              zIndex: 0,
            }}
          />

          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === PROCESS_STEPS.length - 1;
            return (
              <div
                key={step.number}
                style={{
                  display: "flex",
                  gap: "24px",
                  position: "relative",
                  zIndex: 1,
                  paddingBottom: isLast ? 0 : "var(--space-6)",
                }}
              >
                {/* Step number circle */}
                <div
                  style={{
                    width: "64px",
                    minWidth: "64px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--bg-primary)",
                      border: `2px solid ${step.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 16px ${step.color}33`,
                    }}
                  >
                    <Icon size={18} style={{ color: step.color }} />
                  </div>
                </div>

                {/* Card content */}
                <div
                  className="process-step-card"
                  style={{
                    flex: 1,
                    padding: "24px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                    borderLeft: `3px solid ${step.color}`,
                  }}
                >
                  {/* Title row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "var(--text-xs)",
                          fontFamily: "var(--font-mono)",
                          color: step.color,
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                        }}
                      >
                        STEP {step.number}
                      </span>
                      <h2
                        style={{
                          fontSize: "var(--text-xl)",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          margin: 0,
                        }}
                      >
                        {step.title}
                      </h2>
                    </div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontSize: "var(--text-xs)",
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-muted)",
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <Clock size={12} />
                      {step.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div
                    style={{
                      padding: "16px",
                      background: "var(--bg-surface)",
                      borderRadius: "8px",
                      border: "1px solid var(--border-subtle)",
                      marginBottom: "12px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "var(--text-xs)",
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--text-muted)",
                        marginBottom: "10px",
                      }}
                    >
                      Deliverables
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {step.deliverables.map((item) => (
                        <li
                          key={item}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            fontSize: "var(--text-sm)",
                            color: "var(--text-secondary)",
                            lineHeight: 1.5,
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            style={{
                              color: step.color,
                              marginTop: "3px",
                              flexShrink: 0,
                            }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What you get */}
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    <strong style={{ color: "var(--text-secondary)", fontStyle: "normal" }}>
                      What this means for you:
                    </strong>{" "}
                    {step.what_you_get}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Guarantees ── */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <p
              style={{
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "8px",
              }}
            >
              Commitments
            </p>
            <h2
              style={{
                fontSize: "clamp(22px, 3vw, var(--text-3xl))",
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              What I Guarantee
            </h2>
          </div>

          <div
            className="guarantees-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {GUARANTEES.map((g) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.title}
                  className="guarantee-card"
                  style={{
                    padding: "20px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: "var(--accent-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <Icon size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "6px",
                    }}
                  >
                    {g.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {g.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          style={{
            padding: "clamp(28px, 4vw, 48px)",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(20px, 3vw, var(--text-2xl))",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            Ready to start?
          </h2>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-5)",
              maxWidth: "480px",
              margin: "0 auto var(--space-5)",
              lineHeight: 1.6,
            }}
          >
            Book a free 30-minute discovery call or get an instant project
            estimate. No commitment required.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={personalInfo.calBooking30}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                backgroundColor: "var(--accent)",
                color: "#fff",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              <Calendar size={16} />
              Book a Discovery Call
            </Link>
            <Link
              href="/estimate"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                border: "1px solid var(--border-default)",
                borderRadius: "10px",
                color: "var(--text-secondary)",
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              Get an Estimate
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
