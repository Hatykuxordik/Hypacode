"use client";

import { useState } from "react";
import { personalInfo } from "@/lib/data";
import {
  CheckCircle2,
  Download,
  Calendar,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  {
    value: "landing-page",
    label: "Landing Page",
    desc: "Single-page marketing or product site",
    price: "From $350",
  },
  {
    value: "business-website",
    label: "Business Website",
    desc: "Multi-page professional website",
    price: "From $1,500",
  },
  {
    value: "web-app",
    label: "Web Application",
    desc: "Feature-rich app with user accounts",
    price: "From $2,500",
  },
  {
    value: "dashboard",
    label: "Dashboard",
    desc: "Data-heavy analytics or admin panel",
    price: "From $3,500",
  },
  {
    value: "mobile-app",
    label: "Mobile App",
    desc: "React Native or PWA",
    price: "From $6,000",
  },
  {
    value: "custom",
    label: "Custom / Something Else",
    desc: "Let's scope it together",
    price: "Custom quote",
  },
];

const PROJECT_LABELS: Record<string, string> = {
  "landing-page": "Landing Page",
  "business-website": "Business Website",
  "web-app": "Web Application",
  dashboard: "Dashboard",
  "mobile-app": "Mobile App",
  custom: "Custom Project",
};

const FEATURE_LABELS: Record<string, string> = {
  auth: "Authentication & User Accounts",
  payments: "Payment Processing (Stripe)",
  "real-time": "Real-Time Data & Live Updates",
  cms: "Content Management System",
  analytics: "Analytics Dashboard",
  api: "Third-Party API Integrations",
  animation: "Advanced Animations",
  accessibility: "Full Accessibility Audit & Fixes",
};

const FEATURES = Object.entries(FEATURE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const TIMELINES = [
  {
    value: "asap",
    label: "ASAP",
    desc: "Priority scheduling and accelerated delivery",
  },
  {
    value: "1-month",
    label: "1 Month",
    desc: "Standard timeline, good for straightforward projects",
  },
  {
    value: "2-3-months",
    label: "2–3 Months",
    desc: "Comfortable pace for complex projects",
  },
  {
    value: "flexible",
    label: "Flexible",
    desc: "Flexible timeline — best for thoughtful execution",
  },
];

const BUDGETS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-6k", label: "$3,000 – $6,000" },
  { value: "6k-plus", label: "$6,000+" },
  { value: "lets-talk", label: "Let's talk" },
];

const STEP_LABELS = ["Project Type", "Timeline", "Your Info", "Estimate"];

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface EstimateResult {
  low: number;
  high: number;
  weeks: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

// Reads a CSS custom property from :root and converts it to an RGB triple.
// jsPDF only accepts [r, g, b] — CSS variables like var(--accent) are resolved
// at runtime via getComputedStyle so the PDF always matches the live theme.
function cssVarToRGB(
  variable: string,
  fallback: string,
): [number, number, number] {
  try {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
    // Handle hex shorthand (#abc) and full hex (#aabbcc)
    const hex = raw.startsWith("#") ? raw : fallback;
    const full =
      hex.length === 4
        ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
        : hex;
    const n = parseInt(full.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  } catch {
    const n = parseInt(fallback.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
}

async function generateQuotePDF(opts: {
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  projectType: string;
  features: string[];
  timeline: string;
  estimate: EstimateResult;
}): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 20;
  const col2 = pageW / 2;

  // ── Resolve colors from your global.css CSS variables at runtime ──
  // Fallbacks are used only if the variable is missing or unparseable.
  const navy: [number, number, number] = cssVarToRGB("--bg-primary", "#080d14");
  const dark: [number, number, number] = cssVarToRGB(
    "--bg-elevated",
    "#0f1520",
  );
  const border: [number, number, number] = cssVarToRGB(
    "--border-subtle",
    "#1a2540",
  );
  const amber: [number, number, number] = cssVarToRGB("--accent", "#6366f1");
  const white: [number, number, number] = cssVarToRGB(
    "--text-primary",
    "#e8eaf0",
  );
  const muted: [number, number, number] = cssVarToRGB(
    "--text-muted",
    "#4a5568",
  );
  const green: [number, number, number] = cssVarToRGB(
    "--accent-success",
    "#22c55e",
  );

  // Background
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageW, pageH, "F");

  // Header accent bar
  doc.setFillColor(...amber);
  doc.rect(0, 0, pageW, 2, "F");

  // Brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...amber);
  doc.text("HYPACODE", margin, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text(
    "hypacode.com  ·  sodiq@hypacode.com  ·  Lagos, Nigeria",
    margin,
    27,
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...white);
  doc.text("PROJECT QUOTE", pageW - margin, 18, { align: "right" });

  const quoteNum = `HC-${Date.now()}`;
  const issueDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const validDate = new Date(Date.now() + 30 * 86400000).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "short", year: "numeric" },
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text(`Quote #: ${quoteNum}`, pageW - margin, 25, { align: "right" });
  doc.text(`Issued: ${issueDate}`, pageW - margin, 30, { align: "right" });
  doc.text(`Valid until: ${validDate}`, pageW - margin, 35, { align: "right" });

  doc.setDrawColor(...border);
  doc.setLineWidth(0.4);
  doc.line(margin, 42, pageW - margin, 42);

  // Prepared for / by
  let y = 52;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  doc.text("PREPARED FOR", margin, y);
  doc.text("PREPARED BY", col2, y);

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...white);
  doc.text(opts.clientName, margin, y);
  doc.text("Sodiq Atiku", col2, y);

  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text(opts.clientEmail, margin, y);
  doc.text("Frontend Engineer", col2, y);
  y += 4;
  if (opts.clientCompany) doc.text(opts.clientCompany, margin, y);
  doc.text("Hypacode · Lagos, Nigeria", col2, y);

  // Estimate highlight box
  y += 14;
  doc.setFillColor(...dark);
  doc.setDrawColor(...amber);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, pageW - margin * 2, 28, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text("TOTAL ESTIMATE", margin + 6, y + 8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...amber);
  doc.text(
    `$${opts.estimate.low.toLocaleString()} – $${opts.estimate.high.toLocaleString()}`,
    margin + 6,
    y + 20,
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text(`Timeline: ${opts.estimate.weeks}`, pageW - margin - 6, y + 12, {
    align: "right",
  });
  doc.text("Valid for 30 days from issue date", pageW - margin - 6, y + 18, {
    align: "right",
  });

  // Section helper
  const sectionLabel = (label: string, yPos: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text(label, margin, yPos);
    doc.setDrawColor(...border);
    doc.setLineWidth(0.3);
    doc.line(
      margin + doc.getTextWidth(label) + 3,
      yPos - 1,
      pageW - margin,
      yPos - 1,
    );
  };

  // Scope
  y += 38;
  sectionLabel("PROJECT SCOPE", y);

  y += 6;
  const scopeRows: [string, string][] = [
    ["Project Type", PROJECT_LABELS[opts.projectType] ?? opts.projectType],
    [
      "Estimated Timeline",
      opts.timeline === "asap"
        ? "ASAP (Priority)"
        : opts.timeline === "1-month"
          ? "1 Month"
          : opts.timeline === "2-3-months"
            ? "2–3 Months"
            : "Flexible",
    ],
  ];
  for (const [label, value] of scopeRows) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text(label, margin, y);
    doc.setTextColor(...white);
    doc.text(value, pageW - margin, y, { align: "right" });
    y += 6;
  }

  // Add-ons
  if (opts.features.length > 0) {
    y += 6;
    sectionLabel("INCLUDED ADD-ONS", y);
    y += 6;
    for (const f of opts.features) {
      doc.setFillColor(...green);
      doc.circle(margin + 1.5, y - 1.5, 1.2, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...white);
      doc.text(FEATURE_LABELS[f] ?? f, margin + 5, y);
      y += 6;
    }
  }

  // Disclaimer
  y += 8;
  doc.setFillColor(20, 26, 44);
  doc.roundedRect(margin, y, pageW - margin * 2, 16, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...amber);
  doc.text("⚠  IMPORTANT", margin + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...muted);
  doc.text(
    "Final pricing is confirmed after a scoping call. This estimate is based on the",
    margin + 4,
    y + 10,
  );
  doc.text(
    "information provided and may change if scope evolves.",
    margin + 4,
    y + 14,
  );

  // CTA
  y += 28;
  sectionLabel("READY TO PROCEED?", y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...muted);
  doc.text("Book a discovery call:", margin, y);
  doc.setTextColor(...amber);
  doc.text(personalInfo.calBooking30, margin + 38, y);
  y += 5;
  doc.setTextColor(...muted);
  doc.text("Email:", margin, y);
  doc.setTextColor(...amber);
  doc.text(personalInfo.displayEmail, margin + 14, y);

  // Footer bar
  doc.setFillColor(...amber);
  doc.rect(0, pageH - 2, pageW, 2, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  doc.text(
    `Hypacode  ·  Lagos, Nigeria  ·  hypacode.com  ·  ${quoteNum}`,
    pageW / 2,
    pageH - 6,
    { align: "center" },
  );

  doc.save(
    `Hypacode-Quote-${opts.clientName.replace(/\s+/g, "-")}-${Date.now()}.pdf`,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function EstimatePage() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>(
    {},
  );
  const [estimate, setEstimate] = useState<EstimateResult | null | false>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function toggleFeature(val: string) {
    setFeatures((prev) =>
      prev.includes(val) ? prev.filter((f) => f !== val) : [...prev, val],
    );
  }

  function validateContact() {
    const e: Record<string, string> = {};
    if (!contact.name || contact.name.length < 2) e.name = "Name required";
    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
      e.email = "Valid email required";
    return e;
  }

  async function handleGetEstimate() {
    const errs = validateContact();
    setContactErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          features,
          timeline,
          budgetRange: budget || "lets-talk",
          ...contact,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEstimate(data.estimate ?? false);
        setStep(4);
      } else {
        setApiError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDownloadPDF() {
    if (!estimate) return;
    setIsPdfLoading(true);
    try {
      await generateQuotePDF({
        clientName: contact.name,
        clientEmail: contact.email,
        clientCompany: contact.company || undefined,
        projectType,
        features,
        timeline,
        estimate,
      });
    } finally {
      setIsPdfLoading(false);
    }
  }

  // ── Shared style helpers ──────────────────────────────────────────────────

  const cardStyle = (selected: boolean): React.CSSProperties => ({
    padding: "var(--space-3)",
    backgroundColor: selected ? "var(--accent-muted)" : "var(--bg-elevated)",
    border: `1px solid ${selected ? "var(--accent)" : "var(--border-subtle)"}`,
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
    width: "100%",
  });

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "var(--bg-elevated)",
    border: "1px solid var(--border-default)",
    borderRadius: "8px",
    color: "var(--text-primary)",
    fontSize: "var(--text-sm)",
    outline: "none",
    minHeight: "44px",
    fontFamily: "var(--font-body)",
    boxSizing: "border-box",
  };

  const btnPrimary = (disabled = false): React.CSSProperties => ({
    padding: "14px",
    backgroundColor: disabled ? "var(--bg-overlay)" : "var(--accent)",
    color: disabled ? "var(--text-muted)" : "var(--text-inverse)",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "var(--text-base)",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "52px",
    transition: "all 0.2s ease",
  });

  const btnSecondary: React.CSSProperties = {
    padding: "14px",
    border: "1px solid var(--border-default)",
    borderRadius: "8px",
    color: "var(--text-secondary)",
    background: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "var(--text-base)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "52px",
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        width: "100vw",
        paddingTop: "calc(72px + var(--space-8))",
        paddingBottom: "var(--space-16)",
      }}
    >
      <div className="container">
        {/* ── Page header ── */}
        <div style={{ marginBottom: "var(--space-8)" }}>
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
            Pricing
          </p>
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, var(--text-4xl))",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Get a Project Estimate
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
            }}
          >
            Answer a few questions and get a ballpark estimate instantly.{" "}
            <span style={{ color: "var(--text-muted)" }}>
              No commitment required.
            </span>
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div
          style={{ marginBottom: "var(--space-8)" }}
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={4}
          aria-label={`Step ${step} of 4`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              gap: "4px",
            }}
          >
            {STEP_LABELS.map((label, idx) => {
              const state =
                step > idx + 1 ? "done" : step === idx + 1 ? "active" : "idle";
              return (
                <span
                  key={label}
                  style={{
                    fontSize: "var(--text-xs)",
                    fontFamily: "var(--font-mono)",
                    color:
                      state === "done"
                        ? "var(--accent-success, #22c55e)"
                        : state === "active"
                          ? "var(--accent)"
                          : "var(--text-muted)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {state === "done" ? "✓ " : `0${idx + 1}. `}
                  {label}
                </span>
              );
            })}
          </div>
          <div
            style={{
              height: "2px",
              backgroundColor: "var(--border-subtle)",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${((step - 1) / 3) * 100}%`,
                background:
                  "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 70%, transparent))",
                borderRadius: "1px",
                transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            STEP 1 — Project type + add-ons
        ══════════════════════════════════════════════ */}
        {step === 1 && (
          <div>
            <h2
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "var(--space-4)",
              }}
            >
              What are we building?
            </h2>

            {/* Project type grid */}
            <div
              className="type-grid"
              style={{ marginBottom: "var(--space-6)" }}
            >
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setProjectType(type.value)}
                  style={cardStyle(projectType === type.value)}
                  aria-pressed={projectType === type.value}
                >
                  {projectType === type.value && (
                    <CheckCircle2
                      size={16}
                      style={{ color: "var(--accent)", marginBottom: "6px" }}
                    />
                  )}
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 700,
                      color:
                        projectType === type.value
                          ? "var(--accent)"
                          : "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {type.label}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {type.desc}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                      marginTop: "8px",
                    }}
                  >
                    {type.price}
                  </p>
                </button>
              ))}
            </div>

            {/* Add-ons — only shown when a non-custom type is selected */}
            {projectType && projectType !== "custom" && (
              <>
                <h3
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Add-ons
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 400,
                      color: "var(--text-muted)",
                      marginLeft: "8px",
                    }}
                  >
                    (optional)
                  </span>
                </h3>
                <div
                  className="type-grid"
                  style={{ marginBottom: "var(--space-6)" }}
                >
                  {FEATURES.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => toggleFeature(f.value)}
                      style={cardStyle(features.includes(f.value))}
                      aria-pressed={features.includes(f.value)}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            border: `2px solid ${features.includes(f.value) ? "var(--accent)" : "var(--border-default)"}`,
                            borderRadius: "4px",
                            backgroundColor: features.includes(f.value)
                              ? "var(--accent)"
                              : "transparent",
                            flexShrink: 0,
                            transition: "all 0.15s ease",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "var(--text-sm)",
                            color: features.includes(f.value)
                              ? "var(--accent)"
                              : "var(--text-secondary)",
                          }}
                        >
                          {f.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!projectType}
              style={{ ...btnPrimary(!projectType), width: "100%" }}
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 2 — Timeline + budget
        ══════════════════════════════════════════════ */}
        {step === 2 && (
          <div>
            <h2
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "var(--space-4)",
              }}
            >
              When and how much?
            </h2>

            {/* Timeline */}
            <div style={{ marginBottom: "var(--space-5)" }}>
              <h3
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  marginBottom: "var(--space-2)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Timeline
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {TIMELINES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTimeline(t.value)}
                    style={{
                      ...cardStyle(timeline === t.value),
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                    aria-pressed={timeline === t.value}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        border: `2px solid ${timeline === t.value ? "var(--accent)" : "var(--border-default)"}`,
                        borderRadius: "50%",
                        backgroundColor:
                          timeline === t.value
                            ? "var(--accent)"
                            : "transparent",
                        flexShrink: 0,
                        transition: "all 0.15s ease",
                      }}
                    />
                    <div style={{ textAlign: "left" }}>
                      <p
                        style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: 600,
                          color:
                            timeline === t.value
                              ? "var(--accent)"
                              : "var(--text-primary)",
                        }}
                      >
                        {t.label}
                      </p>
                      <p
                        style={{
                          fontSize: "var(--text-xs)",
                          color: "var(--text-muted)",
                          marginTop: "2px",
                        }}
                      >
                        {t.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div style={{ marginBottom: "var(--space-6)" }}>
              <h3
                style={{
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Budget Range{" "}
                <span
                  style={{
                    textTransform: "none",
                    fontWeight: 400,
                    letterSpacing: 0,
                  }}
                >
                  (optional)
                </span>
              </h3>
              <div className="budget-grid">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => setBudget(b.value)}
                    style={cardStyle(budget === b.value)}
                    aria-pressed={budget === b.value}
                  >
                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        color:
                          budget === b.value
                            ? "var(--accent)"
                            : "var(--text-secondary)",
                        fontWeight: budget === b.value ? 700 : 400,
                      }}
                    >
                      {b.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <button onClick={() => setStep(1)} style={btnSecondary}>
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!timeline}
                style={btnPrimary(!timeline)}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 3 — Contact info
        ══════════════════════════════════════════════ */}
        {step === 3 && (
          <div>
            <h2
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}
            >
              Almost there — your estimate is ready
            </h2>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
                marginBottom: "var(--space-5)",
              }}
            >
              Enter your details to reveal your estimate and receive a copy by
              email.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="est-name"
                  style={{
                    display: "block",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                  }}
                >
                  Full name <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <input
                  id="est-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={contact.name}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, name: e.target.value }))
                  }
                  style={{
                    ...inputStyle,
                    borderColor: contactErrors.name
                      ? "var(--error, #ef4444)"
                      : "var(--border-default)",
                  }}
                  placeholder="Jane Smith"
                  aria-invalid={!!contactErrors.name}
                  aria-describedby={
                    contactErrors.name ? "est-name-error" : undefined
                  }
                />
                {contactErrors.name && (
                  <p
                    id="est-name-error"
                    role="alert"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--error, #ef4444)",
                      marginTop: "4px",
                    }}
                  >
                    {contactErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="est-email"
                  style={{
                    display: "block",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                  }}
                >
                  Email address{" "}
                  <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <input
                  id="est-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={contact.email}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, email: e.target.value }))
                  }
                  style={{
                    ...inputStyle,
                    borderColor: contactErrors.email
                      ? "var(--error, #ef4444)"
                      : "var(--border-default)",
                  }}
                  placeholder="jane@company.com"
                  aria-invalid={!!contactErrors.email}
                  aria-describedby={
                    contactErrors.email ? "est-email-error" : undefined
                  }
                />
                {contactErrors.email && (
                  <p
                    id="est-email-error"
                    role="alert"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--error, #ef4444)",
                      marginTop: "4px",
                    }}
                  >
                    {contactErrors.email}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="est-company"
                  style={{
                    display: "block",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                  }}
                >
                  Company{" "}
                  <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                    (optional)
                  </span>
                </label>
                <input
                  id="est-company"
                  type="text"
                  autoComplete="organization"
                  value={contact.company}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, company: e.target.value }))
                  }
                  style={inputStyle}
                  placeholder="Acme Corp"
                />
              </div>

              {/* API error */}
              {apiError && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "var(--space-3)",
                    backgroundColor: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: "8px",
                  }}
                  role="alert"
                >
                  <AlertCircle
                    size={16}
                    style={{ color: "var(--error, #ef4444)", flexShrink: 0 }}
                  />
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--error, #ef4444)",
                    }}
                  >
                    {apiError}
                  </p>
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "var(--space-5)",
              }}
            >
              <button onClick={() => setStep(2)} style={btnSecondary}>
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={handleGetEstimate}
                disabled={isLoading}
                style={btnPrimary(isLoading)}
              >
                {isLoading ? (
                  "Calculating…"
                ) : (
                  <>
                    Get My Estimate <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 4 — Estimate result
        ══════════════════════════════════════════════ */}
        {step === 4 && (
          <div>
            {/* Custom project — no estimate */}
            {estimate === false && (
              <div
                style={{ textAlign: "center", padding: "var(--space-10) 0" }}
              >
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "12px",
                  }}
                >
                  Custom scope
                </p>
                <h2
                  style={{
                    fontSize: "var(--text-3xl)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Let&apos;s scope it together
                </h2>
                <p
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--space-6)",
                    maxWidth: "480px",
                    margin: "0 auto var(--space-6)",
                  }}
                >
                  Your project needs a scoping conversation before I can give
                  you an accurate estimate. It&apos;s free and there&apos;s no
                  commitment.
                </p>
                <a
                  href={personalInfo.calBooking30}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    backgroundColor: "var(--accent)",
                    color: "var(--text-inverse)",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "var(--text-base)",
                    minHeight: "52px",
                    textDecoration: "none",
                  }}
                >
                  <Calendar size={18} /> Book a Discovery Call
                </a>
              </div>
            )}

            {/* Estimate result */}
            {estimate && (
              <div>
                {/* Estimate range */}
                <div
                  style={{
                    padding: "var(--space-6)",
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--accent-border)",
                    borderLeft: "4px solid var(--accent)",
                    borderRadius: "12px",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Your estimate
                  </p>
                  <div
                    style={{
                      fontSize: "clamp(2rem, 6vw, 3.5rem)",
                      fontWeight: 800,
                      color: "var(--accent)",
                      lineHeight: 1.1,
                      marginBottom: "10px",
                    }}
                  >
                    ${estimate.low.toLocaleString()} – $
                    {estimate.high.toLocaleString()}
                  </div>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      marginBottom: "4px",
                    }}
                  >
                    Estimated timeline:{" "}
                    <strong style={{ color: "var(--text-primary)" }}>
                      {estimate.weeks}
                    </strong>
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                    }}
                  >
                    Valid for 30 days · Final pricing confirmed after a scoping
                    call
                  </p>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "var(--space-6)",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isPdfLoading}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 22px",
                      border: "1px solid var(--accent)",
                      color: isPdfLoading
                        ? "var(--text-muted)"
                        : "var(--accent)",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "var(--text-sm)",
                      minHeight: "44px",
                      background: "none",
                      cursor: isPdfLoading ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Download size={15} />
                    {isPdfLoading ? "Generating PDF…" : "Download Quote PDF"}
                  </button>
                  <a
                    href={personalInfo.calBooking30}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 22px",
                      backgroundColor: "var(--accent)",
                      color: "var(--text-inverse)",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "var(--text-sm)",
                      minHeight: "44px",
                      textDecoration: "none",
                    }}
                  >
                    <Calendar size={15} /> Book a Discovery Call
                  </a>
                </div>

                {/* Maintenance upsell */}
                <div
                  style={{
                    padding: "var(--space-5)",
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    Want ongoing support after launch?
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    Monthly maintenance from{" "}
                    <strong style={{ color: "var(--accent)" }}>
                      $150/month
                    </strong>
                    :
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {[
                      "Performance monitoring",
                      "Dependency updates",
                      "Bug fixes within 48h",
                      "Monthly analytics review",
                    ].map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          fontSize: "var(--text-sm)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "var(--accent)",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Responsive helpers ── */}
      <style>{`
        .type-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .budget-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        input:focus,
        select:focus,
        textarea:focus {
          border-color: var(--accent) !important;
          outline: none;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent);
        }
        @media (max-width: 600px) {
          .type-grid   { grid-template-columns: 1fr !important; }
          .budget-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
