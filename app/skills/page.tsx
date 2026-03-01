"use client";

import { useState } from "react";
import Link from "next/link";
import { skills } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function SkillsPage() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const toggle = (name: string) =>
    setActiveSkill((prev) => (prev === name ? null : name));

  return (
    <div
      style={{
        paddingTop: "calc(72px + var(--space-8))",
        paddingBottom: "var(--space-16)",
      }}
    >
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
            Capabilities
          </p>
          <h1
            style={{
              fontSize: "var(--text-5xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Skills
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              maxWidth: "560px",
              lineHeight: 1.7,
            }}
          >
            Every skill listed here has been used in a production codebase
          </p>
        </div>

        {/* ── Core Stack ── */}
        <section
          aria-labelledby="core-stack-heading"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <h2
            id="core-stack-heading"
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-5)",
            }}
          >
            Core Stack
          </h2>

          {/* Accordion grid */}
          <div className="skills-grid" role="list" aria-label="Core skills">
            {skills.core.map((skill) => {
              const isActive = activeSkill === skill.name;
              return (
                <div
                  key={skill.name}
                  role="listitem"
                  className={`skill-item${isActive ? " active" : ""}`}
                  onClick={() => toggle(skill.name)}
                  onKeyDown={(e) => e.key === "Enter" && toggle(skill.name)}
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={`${skill.name} — ${skill.proficiency}`}
                >
                  {/* Header row */}
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-badge">{skill.proficiency}</span>
                  </div>

                  {/* Always-visible meta */}
                  <div className="skill-meta">
                    {skill.yearsInUse}+ yrs · {skill.seeIn.project}
                  </div>

                  {/* Expanded content */}
                  {isActive && (
                    <>
                      <div className="skill-desc">{skill.description}</div>
                      <Link
                        href={`/projects/${skill.seeIn.slug}`}
                        className="skill-project"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`See ${skill.name} used in ${skill.seeIn.project}`}
                      >
                        → See in {skill.seeIn.project}{" "}
                        <ArrowRight size={11} aria-hidden="true" />
                      </Link>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Also Familiar With ── */}
        <section
          aria-labelledby="familiar-heading"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <h2
            id="familiar-heading"
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Also Familiar With
          </h2>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Tools and libraries I&apos;ve worked with across various projects —
            not my daily drivers, but no strangers either.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.alsoFamiliar.map((tag, idx) => {
              const sizeVariants = [
                "var(--text-sm)",
                "var(--text-base)",
                "var(--text-sm)",
                "var(--text-lg)",
                "var(--text-sm)",
              ];
              return (
                <span
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "6px",
                    fontSize: sizeVariants[idx % sizeVariants.length],
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    transition: "all 0.2s ease",
                  }}
                  className="tag-pill"
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </section>

        {/* ── Currently Exploring ── */}
        <section aria-labelledby="learning-heading">
          <h2
            id="learning-heading"
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Currently Exploring
          </h2>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-4)",
              maxWidth: "560px",
            }}
          >
            Learning is ongoing. These are the areas I&apos;m actively exploring
            right now — not polished skills yet, but intentional investments.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {skills.currentlyLearning.map((item) => (
              <div
                key={item.topic}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "var(--space-3)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "10px",
                }}
              >
                <span
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  →
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {item.topic}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {item.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        /* ── Skills accordion grid ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          overflow: hidden;
        }

        @media (max-width: 600px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }

        .skill-item {
          padding: 24px 28px;
          background: var(--bg-elevated);
          border: 1px solid transparent;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
          outline: none;
          position: relative;
        }

        .skill-item:hover {
          background: var(--bg-overlay);
          border-color: var(--accent-border);
        }

        .skill-item.active {
          background: var(--accent-muted);
          border-color: var(--accent-border);
        }

        /* Focus ring for keyboard nav */
        .skill-item:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: -2px;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
          gap: 8px;
        }

        .skill-name {
          font-weight: 700;
          font-size: var(--text-base);
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .skill-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent);
          background: var(--accent-muted);
          border: 1px solid var(--accent-border);
          padding: 3px 8px;
          border-radius: 4px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .skill-meta {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 8px;
          font-family: var(--font-mono);
        }

        .skill-desc {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 10px;
          /* Smooth reveal */
          animation: skillExpand 0.18s ease;
        }

        .skill-project {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--accent);
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: opacity 0.15s ease;
        }

        .skill-project:hover {
          opacity: 0.75;
        }

        @keyframes skillExpand {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Tag pills ── */
        .tag-pill:hover {
          border-color: var(--accent-border);
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
