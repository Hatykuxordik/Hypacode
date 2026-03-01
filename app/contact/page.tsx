"use client";

import { useState } from "react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";
import {
  Github,
  Linkedin,
  Mail,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
} from "lucide-react";

const PROJECT_TYPES = [
  { value: "landing-page", label: "Landing Page" },
  { value: "business-website", label: "Business Website" },
  { value: "web-app", label: "Web Application" },
  { value: "dashboard", label: "Dashboard" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "api-integration", label: "API Integration" },
  { value: "other", label: "Other" },
];

const BUDGETS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-6k", label: "$3,000 – $6,000" },
  { value: "6k-plus", label: "$6,000+" },
  { value: "lets-talk", label: "Let's talk" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMsg, setStatusMsg] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name || form.name.length < 2)
      e.name = "Name must be at least 2 characters";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.projectType) e.projectType = "Please select a project type";
    if (!form.message || form.message.length < 20)
      e.message = "Message must be at least 20 characters";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setStatusMsg(data.message);
        setForm({
          name: "",
          email: "",
          projectType: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus("error");
        setStatusMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please try again.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "var(--bg-elevated)",
    border: "1px solid var(--border-default)",
    borderRadius: "8px",
    color: "var(--text-primary)",
    fontSize: "var(--text-sm)",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "var(--font-body)",
    minHeight: "44px",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--text-secondary)",
    marginBottom: "8px",
  };

  return (
    <div
      style={{
        width: "100vw",
        paddingTop: "calc(72px + var(--space-8))",
        paddingBottom: "var(--space-16)",
      }}
    >
      <div className="container">
        {/* ── Header with availability pill ── */}
        <div style={{ marginBottom: "var(--space-10)" }}>
          {/* Section label */}
          <p
            style={{
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "var(--space-4)",
            }}
          >
            Contact
          </p>

          {/* Availability pill */}
          <div
            className="availability-pill"
            role="status"
            style={{ marginBottom: "var(--space-4)" }}
          >
            <div className="pulse-dot" aria-hidden="true" />
            <span>Currently available for new projects</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Let&apos;s Build Something
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}
          >
            I build fast, accessible React apps for fintech, SaaS, and
            hospitality brands. Let&apos;s talk about your project.
          </p>

          {/* Response time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "var(--space-3)",
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
            }}
          >
            <Clock
              size={14}
              style={{ color: "var(--accent-success, #22c55e)", flexShrink: 0 }}
              aria-hidden="true"
            />
            <span>I typically respond within a few hours</span>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="contact-grid">
          {/* ── LEFT: Form ── */}
          <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
            {/* Success alert */}
            {status === "success" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "var(--space-3)",
                  backgroundColor: "var(--success-muted)",
                  border: "1px solid var(--success)",
                  borderRadius: "10px",
                  marginBottom: "var(--space-4)",
                }}
                role="alert"
              >
                <CheckCircle2
                  size={20}
                  style={{ color: "var(--success)", flexShrink: 0 }}
                />
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--success)",
                  }}
                >
                  {statusMsg}
                </p>
              </div>
            )}

            {/* Error alert */}
            {status === "error" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "var(--space-3)",
                  backgroundColor: "var(--error-muted)",
                  border: "1px solid var(--error)",
                  borderRadius: "10px",
                  marginBottom: "var(--space-4)",
                }}
                role="alert"
              >
                <AlertCircle
                  size={20}
                  style={{ color: "var(--error)", flexShrink: 0 }}
                />
                <p
                  style={{ fontSize: "var(--text-sm)", color: "var(--error)" }}
                >
                  {statusMsg}
                </p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {/* Name */}
              <div>
                <label htmlFor="contact-name" style={labelStyle}>
                  Your name{" "}
                  <span
                    aria-label="required"
                    style={{ color: "var(--accent)" }}
                  >
                    *
                  </span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  style={inputStyle}
                  placeholder="Jane Smith"
                  className="contact-input"
                />
                {errors.name && (
                  <p
                    id="name-error"
                    role="alert"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--error)",
                      marginTop: "4px",
                    }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" style={labelStyle}>
                  Email address{" "}
                  <span
                    aria-label="required"
                    style={{ color: "var(--accent)" }}
                  >
                    *
                  </span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  style={inputStyle}
                  placeholder="jane@company.com"
                  className="contact-input"
                />
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--error)",
                      marginTop: "4px",
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Name + Budget row */}
              <div className="form-row">
                {/* Project Type */}
                <div style={{ flex: 1 }}>
                  <label htmlFor="project-type" style={labelStyle}>
                    Project type{" "}
                    <span
                      aria-label="required"
                      style={{ color: "var(--accent)" }}
                    >
                      *
                    </span>
                  </label>
                  <select
                    id="project-type"
                    name="projectType"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.projectType}
                    aria-describedby={
                      errors.projectType ? "projectType-error" : undefined
                    }
                    value={form.projectType}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, projectType: e.target.value }))
                    }
                    style={{ ...inputStyle, cursor: "pointer" }}
                    className="contact-input"
                  >
                    <option value="">Select type...</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p
                      id="projectType-error"
                      role="alert"
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--error)",
                        marginTop: "4px",
                      }}
                    >
                      {errors.projectType}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div style={{ flex: 1 }}>
                  <label htmlFor="contact-budget" style={labelStyle}>
                    Budget{" "}
                    <span
                      style={{ color: "var(--text-muted)", fontWeight: 400 }}
                    >
                      (optional)
                    </span>
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={form.budget}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, budget: e.target.value }))
                    }
                    style={{ ...inputStyle, cursor: "pointer" }}
                    className="contact-input"
                  >
                    <option value="">Prefer not to say</option>
                    {BUDGETS.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" style={labelStyle}>
                  Message{" "}
                  <span
                    aria-label="required"
                    style={{ color: "var(--accent)" }}
                  >
                    *
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "140px",
                  }}
                  placeholder="Tell me about your project — what you're building, who it's for, and what success looks like..."
                  className="contact-input"
                />
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--error)",
                      marginTop: "4px",
                    }}
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor:
                    status === "loading"
                      ? "var(--bg-overlay)"
                      : "var(--accent)",
                  color:
                    status === "loading"
                      ? "var(--text-muted)"
                      : "var(--text-inverse)",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "var(--text-base)",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  minHeight: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </form>

          {/* ── RIGHT: Sidebar ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {/* Book a call */}
            <div
              style={{
                padding: "var(--space-4)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "var(--space-2)",
                }}
              >
                <Calendar
                  size={18}
                  style={{ color: "var(--accent)", flexShrink: 0 }}
                />
                <h2
                  style={{
                    fontSize: "var(--text-base)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  Prefer to talk?
                </h2>
              </div>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  marginBottom: "var(--space-3)",
                  lineHeight: 1.6,
                }}
              >
                Book a call directly — no back-and-forth email required.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <a
                  href={personalInfo.calBooking30}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "11px",
                    backgroundColor: "var(--accent)",
                    color: "var(--text-inverse)",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "var(--text-sm)",
                    minHeight: "44px",
                    textDecoration: "none",
                  }}
                >
                  Book a 30-min call →
                </a>
                <a
                  href={personalInfo.calBooking15}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "11px",
                    border: "1px solid var(--border-default)",
                    backgroundColor: "var(--bg-elevated)",
                    color: "var(--text-secondary)",
                    borderRadius: "8px",
                    fontWeight: 500,
                    fontSize: "var(--text-sm)",
                    minHeight: "44px",
                    textDecoration: "none",
                  }}
                >
                  15-min intro call
                </a>
              </div>
            </div>

            {/* Quick estimate tool */}
            <div
              style={{
                padding: "var(--space-4)",
                borderRadius: "12px",
                border: "1px solid var(--accent-border)",
                backgroundColor: "var(--accent-muted)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "8px",
                }}
              >
                Want a quick quote?
              </p>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--text-secondary)",
                  marginBottom: "var(--space-3)",
                  lineHeight: 1.6,
                }}
              >
                Use the estimate tool — 2 minutes, instant ballpark, branded
                PDF.
              </p>
              <Link
                href="/estimate"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  padding: "11px 16px",
                  backgroundColor: "var(--accent)",
                  color: "var(--text-inverse)",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                  minHeight: "44px",
                  textDecoration: "none",
                }}
                aria-label="Use the project estimate tool"
              >
                Get an Estimate <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            {/* Contact details */}
            <div
              style={{
                padding: "var(--space-4)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "12px",
              }}
            >
              <h2
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Contact Details
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {[
                  {
                    href: `mailto:${personalInfo.displayEmail}`,
                    icon: <Mail size={14} />,
                    label: "Email",
                    external: false,
                  },
                  {
                    href: personalInfo.github,
                    icon: <Github size={14} />,
                    label: "Github",
                    external: true,
                  },
                  {
                    href: personalInfo.linkedin,
                    icon: <Linkedin size={14} />,
                    label: "LinkedIn",
                    external: true,
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "var(--text-sm)",
                        color: "var(--text-secondary)",
                        minHeight: "40px",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                      }}
                      className="contact-link"
                    >
                      <span
                        style={{ color: "var(--text-muted)", flexShrink: 0 }}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value prop */}
            {/* <div
              style={{
                padding: "var(--space-3)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                &ldquo;I build fast, accessible React apps for fintech, SaaS,
                and hospitality brands.&rdquo;
              </p>
            </div> */}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Availability pill ── */
        .availability-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--accent-success-border, rgba(34,197,94,0.25));
          background: var(--accent-success-muted, rgba(34,197,94,0.08));
          font-size: var(--text-xs);
          font-family: var(--font-mono);
          color: var(--accent-success, #22c55e);
          letter-spacing: 0.02em;
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-success, #22c55e);
          flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }

        /* ── Grid ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 55% 1fr;
          gap: 4rem;
          align-items: start;
          width: 100%;
        }

        @media (max-width: 1100px) {
          .contact-grid {
            gap: 2.5rem;
          }
        }

        /* ── Inline selects row ── */
        .form-row {
          display: flex;
          gap: var(--space-3);
        }

        /* ── Input focus ring ── */
        .contact-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px var(--accent-muted);
        }

        /* ── Contact link hover ── */
        .contact-link:hover {
          color: var(--text-primary);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }
        }

        @media (max-width: 520px) {
          .form-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
