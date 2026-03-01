import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} — Case Study`,
    description: project.tagline + " · " + project.outcome,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const projectIdx = projects.findIndex((p) => p.slug === slug);
  const prevProject = projectIdx > 0 ? projects[projectIdx - 1] : null;
  const nextProject =
    projectIdx < projects.length - 1 ? projects[projectIdx + 1] : null;

  return (
    <div
      style={{
        paddingTop: "calc(72px + var(--space-6))",
        paddingBottom: "var(--space-16)",
        width: "100%",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          padding: "0 20px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-5)" }}>
          <ol
            style={{
              display: "flex",
              gap: "8px",
              listStyle: "none",
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
              flexWrap: "wrap", // let items wrap on very narrow screens
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link href="/" style={{ color: "var(--text-muted)" }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/projects" style={{ color: "var(--text-muted)" }}>
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              style={{
                color: "var(--text-secondary)",
                // Truncate long project names on mobile
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "40vw",
              }}
              aria-current="page"
            >
              {project.name}
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <header style={{ marginBottom: "var(--space-10)" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "var(--space-3)",
            }}
          >
            {project.category.map((cat) => (
              <span
                key={cat}
                style={{
                  padding: "4px 11px",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  borderRadius: "999px",
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-code)",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </span>
            ))}
            <span
              style={{
                padding: "4px 11px",
                backgroundColor:
                  project.status === "Live"
                    ? "var(--accent-success-muted)"
                    : "var(--accent-highlight-muted)",
                border: `1px solid ${project.status === "Live" ? "var(--accent-success-border)" : "var(--accent-highlight-border)"}`,
                color:
                  project.status === "Live"
                    ? "var(--accent-success)"
                    : "var(--accent-highlight)",
                borderRadius: "999px",
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-code)",
                whiteSpace: "nowrap",
              }}
            >
              {project.status}
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              // Lowered minimum from 42px → 28px so it scales gracefully on small screens
              fontSize: "clamp(28px, 8vw, 58px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
              lineHeight: 1.05,
              marginBottom: "var(--space-3)",
              // Prevent the heading from blowing out the container width
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {project.name}
          </h1>

          <p
            style={{
              fontSize: "var(--text-xl)",
              color: "var(--text-secondary)",
              maxWidth: "680px",
              lineHeight: 1.4,
            }}
          >
            {project.tagline}
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "var(--space-5)",
            }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "16px",
                  backgroundColor: "var(--accent)",
                  color: "var(--text-on-accent)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  minHeight: "48px",
                  textDecoration: "none",
                }}
              >
                View Live Site <ExternalLink size={15} />
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
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  minHeight: "48px",
                  textDecoration: "none",
                }}
              >
                <Github size={16} /> View on GitHub
              </a>
            )}
          </div>
        </header>

        {/* Hero Image */}
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "var(--space-10)",
            border: "1px solid var(--border)",
            boxShadow: "0 10px 40px -15px rgba(0,0,0,0.6)",
          }}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={920}
            height={580}
            sizes="(max-width: 920px) 100vw, 920px"
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>

        {/* Meta Bar — 2-col on mobile, 4-col on larger screens */}
        <div
          style={{
            display: "grid",
            // On very small screens minmax(160px) can overflow; use 1fr 1fr instead
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(1rem, 3vw, 2rem)",
            padding: "var(--space-5)",
            backgroundColor: "var(--bg-elevated)",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            marginBottom: "var(--space-10)",
          }}
        >
          {[
            { label: "Role", value: "Frontend Engineer" },
            { label: "Category", value: project.category.join(" · ") },
            { label: "Status", value: project.status },
            { label: "Outcome", value: project.outcome },
          ].map((meta) => (
            <div key={meta.label}>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-code)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "6px",
                }}
              >
                {meta.label}
              </p>
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {meta.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p
            style={{
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-code)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "var(--space-3)",
            }}
          >
            Tech Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "4px 11px",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  borderRadius: "999px",
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-code)",
                  whiteSpace: "nowrap",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study Content */}
        {[
          { title: "Overview", content: project.overview },
          { title: "The Problem", content: project.problem },
          { title: "Process", content: project.process },
          { title: "Technical Deep-Dive", content: project.technicalDeepDive },
        ].map((section) => (
          <section
            key={section.title}
            style={{ marginBottom: "var(--space-12)" }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "var(--space-4)",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
              }}
            >
              {section.content}
            </p>
          </section>
        ))}

        {/* Code Sample */}
        <section style={{ marginBottom: "var(--space-12)" }}>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Code Sample
          </h2>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
              marginBottom: "var(--space-3)",
            }}
          >
            {project.codeSnippet.description}
          </p>

          <div
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backgroundColor: "#1e1e1e",
              // Critical: constrain width so code block doesn't overflow on mobile
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                height: "32px",
                backgroundColor: "#282a36",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#ff5f56",
                  }}
                />
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#ffbd2e",
                  }}
                />
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#27c93f",
                  }}
                />
              </div>
              <span
                style={{
                  color: "#9e9e9e",
                  fontSize: "13px",
                  fontFamily: "system-ui",
                }}
              >
                {project.codeSnippet.language}
              </span>
            </div>
            {/* overflow-x: auto here so code scrolls horizontally within its box */}
            <div
              style={{
                padding: "16px",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                fontFamily: "var(--font-code)",
              }}
            >
              <SyntaxHighlighter
                language={project.codeSnippet.language}
                style={oneDark}
                customStyle={{
                  background: "transparent",
                  padding: 0,
                  margin: 0,
                  fontSize: "var(--text-sm)",
                }}
              >
                {project.codeSnippet.code}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ marginBottom: "var(--space-10)" }}>
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Results
          </h2>
          <div
            style={{
              padding: "var(--space-4)",
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--accent-border)",
              borderLeft: "4px solid var(--accent)",
              borderRadius: "8px",
            }}
          >
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
              }}
            >
              {project.results}
            </p>
          </div>
        </section>

        {/* Prev / Next */}
        <nav
          aria-label="Project navigation"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "var(--space-8)",
          }}
        >
          <div
            style={{
              display: "grid",
              // Single column on mobile — minmax(300px) would overflow a 375px screen
              gridTemplateColumns: "1fr",
              gap: "1.5rem",
            }}
          >
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                style={{
                  padding: "var(--space-5)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
              >
                <ArrowLeft
                  size={22}
                  style={{
                    color: "var(--text-muted)",
                    flexShrink: 0,
                    transition: "color 0.25s ease",
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-code)",
                    }}
                  >
                    Previous
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginTop: "4px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {prevProject.name}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--accent)",
                      marginTop: "2px",
                    }}
                  >
                    {prevProject.outcome}
                  </p>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                style={{
                  padding: "var(--space-5)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "16px",
                  textDecoration: "none",
                  textAlign: "right",
                  transition: "all 0.25s ease",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-code)",
                    }}
                  >
                    Next
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginTop: "4px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {nextProject.name}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--accent)",
                      marginTop: "2px",
                    }}
                  >
                    {nextProject.outcome}
                  </p>
                </div>
                <ArrowRight
                  size={22}
                  style={{
                    color: "var(--text-muted)",
                    flexShrink: 0,
                    transition: "color 0.25s ease",
                  }}
                />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
