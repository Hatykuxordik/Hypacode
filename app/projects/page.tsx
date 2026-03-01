"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const displayedProjects = projects.filter(
  (p) => !["hypacode-portfolio", "e-commerce", "wild-oasis"].includes(p.slug),
);

const CATEGORIES = [
  "All",
  ...Array.from(new Set(displayedProjects.flatMap((p) => p.category))),
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? displayedProjects
      : displayedProjects.filter((p) => p.category.includes(activeCategory));

  return (
    <div
      style={{
        paddingTop: "calc(72px + var(--space-8))",
        paddingBottom: "var(--space-16)",
      }}
    >
      <div className="container">
        {/* Header */}
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
            Work
          </p>
          <h1
            style={{
              fontSize: "var(--text-5xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Projects
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              maxWidth: "560px",
            }}
          >
            Production software built for real users. Each project is a case
            study in solving a specific problem with the right tools.
          </p>
        </div>

        {/* Category filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "var(--space-8)",
          }}
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                minHeight: "36px",
                border:
                  activeCategory === cat
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border-subtle)",
                backgroundColor:
                  activeCategory === cat
                    ? "var(--accent)"
                    : "var(--bg-elevated)",
                color:
                  activeCategory === cat
                    ? "var(--text-inverse)"
                    : "var(--text-muted)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          {filtered.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article
                key={project.slug}
                className={`project-card-full ${isEven ? "" : "project-odd"}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "2.5rem",
                  padding: "var(--space-5)",
                  backgroundColor: "var(--bg-elevated)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-subtle)",
                  transition: "border-color 0.3s ease",
                  alignItems: "center",
                }}
              >
                {/* Image with hover overlay */}
                <div className="image-wrapper">
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "10px",
                      aspectRatio: "16/10",
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      className="project-img"
                    />
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
                        background: "rgba(8, 13, 24, 0.85)",
                      }}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 18px",
                          backgroundColor: "var(--accent)",
                          color: "var(--text-inverse)",
                          borderRadius: "6px",
                          fontWeight: 600,
                          fontSize: "var(--text-sm)",
                          minHeight: "44px",
                          textDecoration: "none",
                        }}
                      >
                        Case Study <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="content-wrapper">
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        style={{
                          padding: "3px 8px",
                          backgroundColor: "var(--bg-overlay)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "4px",
                          fontSize: "var(--text-xs)",
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                    <span
                      style={{
                        padding: "3px 8px",
                        backgroundColor:
                          project.status === "Live"
                            ? "var(--success-muted)"
                            : "var(--warning-muted)",
                        border: `1px solid ${project.status === "Live" ? "var(--success)" : "var(--warning)"}`,
                        borderRadius: "4px",
                        fontSize: "var(--text-xs)",
                        color:
                          project.status === "Live"
                            ? "var(--success)"
                            : "var(--warning)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: "var(--text-3xl)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "8px",
                    }}
                  >
                    {project.name}
                  </h2>
                  <p
                    style={{
                      fontSize: "var(--text-base)",
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    {project.tagline}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--accent)",
                      fontWeight: 600,
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {project.outcome}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    {project.overview}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "3px 8px",
                          backgroundColor: "var(--bg-overlay)",
                          borderRadius: "4px",
                          fontSize: "var(--text-xs)",
                          color: "var(--text-secondary)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 18px",
                        backgroundColor: "var(--accent)",
                        color: "var(--text-inverse)",
                        borderRadius: "6px",
                        fontWeight: 600,
                        fontSize: "var(--text-sm)",
                        minHeight: "44px",
                        textDecoration: "none",
                      }}
                    >
                      Case Study <ArrowRight size={14} />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "var(--text-sm)",
                          color: "var(--text-muted)",
                          minHeight: "44px",
                          textDecoration: "none",
                        }}
                        aria-label={`View ${project.name} live`}
                      >
                        Live <ExternalLink size={12} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "var(--text-sm)",
                          color: "var(--text-muted)",
                          minHeight: "44px",
                          textDecoration: "none",
                        }}
                        aria-label={`View ${project.name} on GitHub`}
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "var(--space-16) 0",
              color: "var(--text-muted)",
            }}
          >
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>

      {/* Global styles for alternating layout + hover effects */}
      <style>{`
        .project-img {
          transition: transform 0.5s ease;
        }
        .project-card-full:hover {
          border-color: var(--border-strong);
        }
        .project-card-full:hover .project-img {
          transform: scale(1.03);
        }
        .project-card-full:hover .hover-overlay {
          opacity: 1 !important;
        }

        /* Mobile-first: always image on top */
        @media (min-width: 1024px) {
          .project-card-full {
            grid-template-columns: 1fr 1fr !important;
          }
          .project-card-full .image-wrapper { order: 1; }
          .project-card-full .content-wrapper { order: 2; }
          .project-card-full.project-odd .image-wrapper { order: 2; }
          .project-card-full.project-odd .content-wrapper { order: 1; }
        }
      `}</style>
    </div>
  );
}
