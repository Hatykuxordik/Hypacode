"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { ExternalLink } from "lucide-react";

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function FeaturedProjects() {
  return (
    <section
      style={{
        padding:
          "clamp(48px, 6vw, 80px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 80px)",
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
      }}
      aria-labelledby="featured-projects-heading"
    >
      {/* Section header */}
      <div style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "clamp(12px, 2vw, 16px)",
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
              Selected Work
            </p>
            <h2
              id="featured-projects-heading"
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              border: "1px solid var(--border)",
              padding: "8px clamp(12px, 1.5vw, 16px)",
              borderRadius: 999,
              transition: "color 0.2s, border-color 0.2s, transform 0.2s",
              minHeight: 40,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            All Projects
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Global styles for layout + hover (only once) */}
      <style>{`
        @media (min-width: 1024px) {
          .project-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .project-grid .image-wrapper { order: 1; }
          .project-grid .content-wrapper { order: 2; }
          .project-grid.project-odd .image-wrapper { order: 2; }
          .project-grid.project-odd .content-wrapper { order: 1; }
        }
        .group:hover .project-img {
          transform: scale(1.03);
        }
        .group:hover .hover-overlay {
          opacity: 1 !important;
        }
      `}</style>

      {/* Project cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(48px, 8vw, 80px)",
        }}
      >
        {featured.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={project.slug}
              className={`group project-grid ${isEven ? "" : "project-odd"}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "clamp(24px, 4vw, 32px)",
                alignItems: "center",
              }}
              aria-label={`Project: ${project.name}`}
            >
              {/* Image - always on top on mobile */}
              <div className="image-wrapper">
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "clamp(8px, 1.5vw, 16px)",
                    border: "1px solid var(--border)",
                    aspectRatio: "16/10",
                    background: "var(--bg-secondary)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.name} — ${project.tagline}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                    className="project-img"
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                  {/* Hover overlay */}
                  <div
                    className="hover-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      background: "rgba(8, 13, 24, 0.8)",
                    }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 20px",
                        background: "var(--accent)",
                        color: "var(--text-on-accent)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        borderRadius: "clamp(6px, 1vw, 12px)",
                        textDecoration: "none",
                        transition: "background 0.2s, transform 0.2s",
                        minHeight: 40,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "var(--accent-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--accent)";
                      }}
                    >
                      View Case Study
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Content - always below image on mobile */}
              <div className="content-wrapper">
                {/* Project category + status */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: "clamp(8px, 1vw, 12px)",
                  }}
                >
                  <span
                    className="tech-pill"
                    aria-label={`Category: ${project.category.join(", ")}`}
                    style={{
                      borderRadius: 999,
                      background: "var(--accent-muted)",
                      border: "1px solid var(--accent-border)",
                      color: "var(--accent)",
                    }}
                  >
                    {project.category.join(" · ")}
                  </span>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      fontFamily: "var(--font-code)",
                      padding: "2px 8px",
                      borderRadius: 999,
                      border: `1px solid ${project.status === "Live" ? "var(--accent-success-border)" : "var(--accent-highlight-border)"}`,
                      background: `${project.status === "Live" ? "var(--accent-success-muted)" : "var(--accent-highlight-muted)"}`,
                      color: `${project.status === "Live" ? "var(--accent-success)" : "var(--accent-highlight)"}`,
                    }}
                    aria-label={`Status: ${project.status}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "clamp(8px, 1vw, 12px)",
                  }}
                >
                  {project.name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    marginBottom: "clamp(12px, 1.5vw, 16px)",
                  }}
                >
                  {project.tagline}
                </p>

                {/* Outcome badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "clamp(4px, 0.75vw, 8px) clamp(8px, 1.5vw, 12px)",
                    borderRadius: "clamp(4px, 0.75vw, 8px)",
                    border: `1px solid ${project.color}30`,
                    background: `${project.color}0d`,
                    marginBottom: "clamp(12px, 1.5vw, 16px)",
                  }}
                  aria-label={`Outcome: ${project.outcome}`}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: project.color,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {project.outcome}
                  </span>
                </div>

                {/* Tech pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: "clamp(12px, 1.5vw, 16px)",
                  }}
                  role="list"
                  aria-label="Technologies used"
                >
                  {project.stack.slice(0, 4).map((tag) => (
                    <span key={tag} className="tech-pill" role="listitem">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(12px, 2vw, 24px)",
                  }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--accent)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    aria-label={`View case study for ${project.name}`}
                  >
                    View Case Study
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: "var(--text-sm)",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                      aria-label={`Visit live site for ${project.name} (opens in new tab)`}
                    >
                      Live Site
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
