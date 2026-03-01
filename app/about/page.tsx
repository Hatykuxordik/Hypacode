"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import {
  personalInfo,
  aboutNarrative,
  experience,
  certificates,
} from "@/lib/data";

export default function AboutPage() {
  const [activeExp, setActiveExp] = useState<number | null>(0);

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
            About
          </p>
          <h1
            style={{
              fontSize: "clamp(24px, 5vw, 56px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            }}
          >
            The Person Behind the Code
          </h1>
        </div>

        {/* ── Two-column layout ── */}
        <div className="about-grid">
          {/* ── LEFT COLUMN ── */}
          <aside className="about-left">
            {/* Profile image */}
            <div className="profile-img-wrap">
              <Image
                src="/assets/sodiq-atiku.jpg"
                alt="Sodiq Atiku — Frontend Engineer based in Lagos, Nigeria"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                style={{ objectFit: "cover", objectPosition: "top" }}
                priority
              />
              {/* Accent bar */}
              <div className="profile-accent-bar" aria-hidden="true" />
            </div>

            {/* Stats strip */}
            <div className="stats-strip">
              {aboutNarrative.stats.map((s) => (
                <div key={s.label} className="stat-cell">
                  <p className="stat-value">{s.value}</p>
                  <p className="stat-label">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Download Resume */}
            <a
              href={personalInfo.resumeUrl}
              download="Sodiq-Atiku-Frontend-Developer-Resume-CV.pdf"
              className="resume-btn"
              aria-label={`Download ${personalInfo.name}'s resume PDF`}
            >
              <Download size={14} aria-hidden="true" />
              Download Resume / CV
            </a>

            {/* Open to collaboration */}
            <div className="collab-card">
              <p className="collab-title">Open to Collaboration</p>
              <p className="flex flex-wrap gap-2 collab-body">
                {[
                  "Open-source contributions",
                  "Developer partnerships",
                  "Mentorship",
                  "Community engagement",
                ].map((item) => (
                  <span key={item} className="tech-pill text-[0.7rem]">
                    {item}
                  </span>
                ))}
              </p>
            </div>
          </aside>

          {/* ── RIGHT COLUMN ── */}
          <div className="about-right">
            {/* Blockquote */}
            <blockquote className="about-quote">
              &ldquo;{aboutNarrative.pullQuote}&rdquo;
            </blockquote>

            {/* Story paragraphs */}
            <div className="about-story">
              {aboutNarrative.story.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* ── Experience ── */}
            <div style={{ marginTop: "var(--space-10)" }}>
              <p className="section-mono-label">Experience</p>

              <div className="exp-list" role="list">
                {experience.map((e, i) => {
                  const isOpen = activeExp === i;
                  return (
                    <div
                      key={i}
                      role="listitem"
                      className={`exp-item${isOpen ? " open" : ""}${i === 0 ? " first" : ""}${i === experience.length - 1 ? " last" : ""}`}
                      onClick={() => setActiveExp(isOpen ? null : i)}
                      onKeyDown={(k) =>
                        k.key === "Enter" && setActiveExp(isOpen ? null : i)
                      }
                      tabIndex={0}
                      aria-expanded={isOpen}
                    >
                      <div className="exp-header">
                        <div>
                          <h3 className="exp-role">
                            {e.role} —{" "}
                            <span className="exp-co">{e.company}</span>
                          </h3>
                          <div className="exp-period">
                            {e.period} · {e.type}
                          </div>
                        </div>
                        <span className="exp-type">{e.type}</span>
                      </div>

                      {isOpen && (
                        <div className="exp-body">
                          <p className="exp-desc">{e.description}</p>
                          <ul
                            className="exp-achievements"
                            aria-label="Key achievements"
                          >
                            {e.highlights.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                          <div
                            className="exp-stack-row"
                            role="list"
                            aria-label="Technologies used"
                          >
                            {e.stack.map((t) => (
                              <span key={t} className="exp-tag" role="listitem">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Certifications ── */}
            <div style={{ marginTop: "var(--space-10)" }}>
              <p className="section-mono-label">Certifications</p>
              <div className="certs-grid">
                {certificates.map((c) => (
                  <a
                    key={c.n}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card"
                    aria-label={`${c.n} — Udemy ${c.y} (opens in new tab)`}
                  >
                    <div className="cert-icon" aria-hidden="true">
                      🎓
                    </div>
                    <div>
                      <div className="cert-name">{c.n}</div>
                      <div className="cert-meta">Udemy · {c.y}</div>
                    </div>
                    <ExternalLink
                      size={12}
                      className="cert-meta"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Values ── */}
            <div style={{ marginTop: "var(--space-10)" }}>
              <p className="section-mono-label">Values</p>
              <div className="values-grid">
                {aboutNarrative.values.map((v) => (
                  <div key={v.title} className="value-card">
                    <p className="value-title">{v.title}</p>
                    <p className="value-body">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Education ── */}
            <div style={{ marginTop: "var(--space-10)" }}>
              <p className="section-mono-label">Education</p>
              <div className="edu-card">
                <div className="edu-inner">
                  <div>
                    <p className="edu-degree">
                      B.Sc. Biochemistry &amp; Molecular Biology
                    </p>
                    <p className="edu-school">
                      Obafemi Awolowo University · 2019–2024
                    </p>
                  </div>
                  <div className="edu-tags">
                    <span
                      style={{
                        padding: "3px 10px",
                        backgroundColor: "var(--accent-muted)",
                        border: "1px solid var(--accent-border)",
                        borderRadius: "4px",
                        fontSize: "var(--text-xs)",
                        color: "var(--accent)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Second Class Honors · 4.32/5.0
                    </span>
                    <span
                      style={{
                        padding: "3px 10px",
                        backgroundColor: "var(--bg-overlay)",
                        border: "1px solid var(--border-default)",
                        borderRadius: "4px",
                        fontSize: "var(--text-xs)",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Research Grant Recipient
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ─────────────────────────────────────────────
           LAYOUT
        ───────────────────────────────────────────── */
        .about-grid {
          display: flex;
          gap: 64px;
          align-items: flex-start;
        }

        /* ─────────────────────────────────────────────
           LEFT COLUMN
        ───────────────────────────────────────────── */
        .about-left {
          flex: 0 0 300px;
          position: sticky;
          top: calc(72px + 24px);
        }

        .profile-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          background: var(--bg-elevated);
        }

        .profile-accent-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent) 0%, transparent 70%);
          pointer-events: none;
        }

        .stats-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          margin-top: 12px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        .stat-cell {
          padding: 14px 8px;
          background: var(--bg-elevated);
          text-align: center;
        }

        .stat-value {
          font-weight: 700;
          font-size: var(--text-base);
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 2px;
          font-family: var(--font-mono);
        }

        .resume-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-top: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid var(--border-default);
          background: var(--bg-elevated);
          color: var(--text-primary);
          font-size: var(--text-sm);
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          min-height: 44px;
        }

        .resume-btn:hover {
          border-color: var(--accent-border);
          background: var(--accent-muted);
          color: var(--accent);
        }

        .collab-card {
          margin-top: 12px;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid var(--accent-border);
          background: var(--accent-muted);
        }

        .collab-title {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 4px;
        }

        .collab-body {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* ─────────────────────────────────────────────
           RIGHT COLUMN
        ───────────────────────────────────────────── */
        .about-right {
          flex: 1;
          min-width: 0;
        }

        .about-quote {
          font-size: clamp(18px, 2.5vw, 26px);
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          border-left: 3px solid var(--accent);
          padding-left: 24px;
          margin: 0 0 var(--space-6) 0;
        }

        .about-story {
          font-size: var(--text-base);
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-mono-label {
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        /* ─────────────────────────────────────────────
           EXPERIENCE ACCORDION
        ───────────────────────────────────────────── */
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .exp-item {
          padding: 28px 32px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
          outline: none;
        }

        .exp-item.first { border-radius: 12px 12px 0 0; }
        .exp-item.last  { border-radius: 0 0 12px 12px; }
        .exp-item.first.last { border-radius: 12px; }

        .exp-item:hover,
        .exp-item.open {
          background: var(--bg-overlay);
          border-color: var(--accent-border);
        }

        .exp-item:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: -2px;
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .exp-role {
          font-weight: 700;
          font-size: var(--text-lg);
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0;
        }

        .exp-co { color: var(--accent); }

        .exp-period {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
          letter-spacing: 0.04em;
        }

        .exp-type {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-secondary);
          background: var(--bg-overlay);
          border: 1px solid var(--border-default);
          padding: 4px 10px;
          border-radius: 99px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .exp-body {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          animation: expExpand 0.18s ease;
        }

        @keyframes expExpand {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .exp-desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin-bottom: 16px;
          line-height: 1.65;
        }

        .exp-achievements {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .exp-achievements li {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          padding-left: 18px;
          position: relative;
          line-height: 1.6;
        }

        .exp-achievements li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-size: 11px;
          top: 2px;
        }

        .exp-stack-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .exp-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-overlay);
          border: 1px solid var(--border-subtle);
          padding: 3px 8px;
          border-radius: 5px;
        }

        /* ─────────────────────────────────────────────
           CERTIFICATIONS
        ───────────────────────────────────────────── */
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 10px;
        }

        .cert-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          text-decoration: none;
          color: var(--text-primary);
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .cert-card:hover {
          border-color: var(--accent-border);
          background: var(--accent-muted);
        }

        .cert-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--accent-muted);
          border: 1px solid var(--accent-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 16px;
        }

        .cert-name {
          font-size: var(--text-sm);
          font-weight: 500;
          line-height: 1.4;
          color: var(--text-primary);
        }

        .cert-meta {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
          font-family: var(--font-mono);
        }

        /* ─────────────────────────────────────────────
           VALUES
        ───────────────────────────────────────────── */
        .values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .value-card {
          padding: 16px;
          border-radius: 10px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          transition: border-color 0.2s ease;
        }

        .value-card:hover {
          border-color: var(--accent-border);
        }

        .value-title {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 6px;
        }

        .value-body {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ─────────────────────────────────────────────
           EDUCATION
        ───────────────────────────────────────────── */
        .edu-card {
          padding: 24px;
          border-radius: 12px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
        }

        .edu-inner {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .edu-degree {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text-primary);
        }

        .edu-school {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .edu-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* ─────────────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────────────── */

        /* Tablet — unstick sidebar, reduce gap */
        @media (max-width: 1024px) {
          .about-grid {
            gap: 40px;
          }
          .about-left {
            flex: 0 0 260px;
            position: static;
          }
        }

        /* Mobile — stack columns */
        @media (max-width: 768px) {
          .about-grid {
            flex-direction: column;
            gap: var(--space-8);
          }

          .about-left {
            flex: none;
            width: 100%;
            position: static;
            /* Horizontal layout on mobile: image left, stats/actions right */
            display: grid;
            grid-template-columns: 140px 1fr;
            grid-template-rows: auto auto auto;
            gap: 12px;
            align-items: start;
          }

          .profile-img-wrap {
            grid-row: 1 / 4;
            aspect-ratio: 3 / 4;
          }

          .stats-strip {
            margin-top: 0;
            grid-column: 2;
          }

          .resume-btn {
            grid-column: 2;
            margin-top: 0;
          }

          .collab-card {
            grid-column: 1 / -1;
            margin-top: 0;
          }

          .exp-item {
            padding: 20px 18px;
          }

          .exp-role {
            font-size: var(--text-base);
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .certs-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Very small screens */
        @media (max-width: 480px) {
          .about-left {
            grid-template-columns: 110px 1fr;
          }

          .about-quote {
            font-size: var(--text-xl);
            padding-left: 16px;
          }

          .exp-header {
            flex-direction: column;
            gap: 8px;
          }

          .exp-type {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
