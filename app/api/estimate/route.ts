import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────────────────────────────────────
// TYPES — flat body shape matching page.tsx's fetch call
// ─────────────────────────────────────────────────────────────────────────────

interface RequestBody {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  features: string[];
  timeline: string;
  budgetRange: string;
}

interface EstimateEntry {
  label: string;
  low: number;
  high: number;
}

interface EstimateResult {
  low: number;
  high: number;
  weeks: string;
  breakdown: EstimateEntry[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICING MATRIX
// ─────────────────────────────────────────────────────────────────────────────

const PROJECT_LABELS: Record<string, string> = {
  "landing-page": "Landing Page",
  "business-website": "Business Website",
  "web-app": "Web Application",
  dashboard: "Dashboard / Admin Panel",
  "mobile-app": "Mobile App (PWA / React Native)",
  custom: "Custom Project",
};

const BASE_PRICES: Record<string, [number, number]> = {
  "landing-page": [350, 900],
  "business-website": [1500, 3500],
  "web-app": [2500, 6000],
  dashboard: [3500, 8000],
  "mobile-app": [6000, 14000],
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

const FEATURE_PRICES: Record<string, [number, number]> = {
  auth: [400, 800],
  payments: [600, 1200],
  "real-time": [500, 1000],
  cms: [300, 700],
  analytics: [400, 900],
  api: [300, 700],
  animation: [200, 500],
  accessibility: [300, 600],
};

const TIMELINE_MULTIPLIERS: Record<string, number> = {
  asap: 1.35,
  "1-month": 1.1,
  "2-3-months": 1.0,
  flexible: 0.95,
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP (Priority)",
  "1-month": "1 Month",
  "2-3-months": "2–3 Months",
  flexible: "Flexible",
};

function calcWeeks(projectType: string, timeline: string): string {
  const base: Record<string, number> = {
    "landing-page": 2,
    "business-website": 4,
    "web-app": 8,
    dashboard: 10,
    "mobile-app": 16,
  };
  const w = base[projectType] ?? 4;
  if (timeline === "asap")
    return `${Math.max(1, Math.ceil(w * 0.65))}–${Math.ceil(w * 0.8)} weeks`;
  if (timeline === "1-month") return "3–4 weeks";
  if (timeline === "2-3-months") return `${w}–${w + 2} weeks`;
  return `${w}–${w + 4} weeks`;
}

function round50(n: number) {
  return Math.round(n / 50) * 50;
}

function buildEstimate(
  projectType: string,
  features: string[],
  timeline: string,
): EstimateResult | false {
  if (projectType === "custom") return false;

  const [baseLow, baseHigh] = BASE_PRICES[projectType] ?? [1000, 3000];
  const mult = TIMELINE_MULTIPLIERS[timeline] ?? 1;
  const breakdown: EstimateEntry[] = [];

  breakdown.push({
    label: PROJECT_LABELS[projectType] ?? projectType,
    low: round50(baseLow * mult),
    high: round50(baseHigh * mult),
  });

  for (const f of features) {
    const [fLow, fHigh] = FEATURE_PRICES[f] ?? [0, 0];
    if (fLow > 0) {
      breakdown.push({
        label: FEATURE_LABELS[f] ?? f,
        low: round50(fLow * mult),
        high: round50(fHigh * mult),
      });
    }
  }

  const low = breakdown.reduce((s, e) => s + e.low, 0);
  const high = breakdown.reduce((s, e) => s + e.high, 0);

  return { low, high, weeks: calcWeeks(projectType, timeline), breakdown };
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL DESIGN TOKENS
// Mirrors global.css variables as inline-style hex values
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg: "#080d14",
  elevated: "#0f1520",
  border: "#1a2540",
  accent: "#6366f1",
  accentDim: "rgba(99,102,241,0.12)",
  accentBdr: "rgba(99,102,241,0.3)",
  textPri: "#e8eaf0",
  textSec: "#8a95b0",
  textMut: "#4a5568",
};

// ─── Shared building blocks ───────────────────────────────────────────────────

function emailWrapper(inner: string): string {
  return `<!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">${inner}</div>
</body></html>`;
}

function emailCard(inner: string): string {
  return `<div style="background:${C.elevated};border:1px solid ${C.border};border-radius:12px;padding:32px;overflow:hidden;">${inner}</div>`;
}

const accentBar = `<div style="height:3px;background:linear-gradient(90deg,${C.accent} 0%,transparent 100%);margin:-32px -32px 28px;border-radius:12px 12px 0 0;"></div>`;

const brandHeader = `
<div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
  <div style="width:28px;height:28px;background:${C.accent};border-radius:7px;text-align:center;line-height:28px;">
    <span style="color:#fff;font-weight:800;font-size:13px;">H</span>
  </div>
  <span style="color:${C.textPri};font-weight:700;font-size:15px;letter-spacing:-0.02em;">Hypa<span style="color:${C.accent}">code</span></span>
</div>`;

function tableRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px 8px 0;color:${C.textMut};font-size:11px;text-transform:uppercase;letter-spacing:0.06em;font-family:monospace;white-space:nowrap;vertical-align:top;border-bottom:1px solid ${C.border};">${label}</td>
    <td style="padding:8px 0;color:${C.textPri};font-size:13px;border-bottom:1px solid ${C.border};">${value}</td>
  </tr>`;
}

function estimateBlock(estimate: EstimateResult): string {
  const rows = estimate.breakdown
    .map(
      (item) =>
        `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid ${C.border};">
          <span style="color:${C.textSec};font-size:13px;">${item.label}</span>
          <span style="color:${C.textPri};font-size:13px;font-family:monospace;">$${item.low.toLocaleString()}–$${item.high.toLocaleString()}</span>
        </div>`,
    )
    .join("");

  return `
    <div style="margin:20px 0;padding:20px;background:${C.accentDim};border:1px solid ${C.accentBdr};border-radius:10px;text-align:center;">
      <p style="color:${C.accent};font-size:11px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace;">Total Estimate</p>
      <p style="color:${C.textPri};font-size:32px;font-weight:800;margin:0;letter-spacing:-0.03em;">
        $${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}
      </p>
      <p style="color:${C.textSec};font-size:13px;margin:6px 0 0;">${estimate.weeks} · Valid 30 days</p>
    </div>
    <div style="margin-bottom:8px;">
      <p style="color:${C.textMut};font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;font-family:monospace;">Breakdown</p>
      ${rows}
    </div>`;
}

// ─── Owner notification ───────────────────────────────────────────────────────

function ownerEmailHtml(
  body: RequestBody,
  estimate: EstimateResult | false,
): string {
  const isCustom = estimate === false;

  return emailWrapper(
    emailCard(`
    ${accentBar}
    <h1 style="color:${C.accent};font-size:15px;font-weight:700;margin:0 0 20px;text-transform:uppercase;letter-spacing:0.05em;font-family:monospace;">
      New Estimate Submission
    </h1>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      ${tableRow("Name", body.name)}
      ${tableRow("Email", `<a href="mailto:${body.email}" style="color:${C.accent};text-decoration:none;">${body.email}</a>`)}
      ${tableRow("Company", body.company || "—")}
      ${tableRow("Project", PROJECT_LABELS[body.projectType] ?? body.projectType)}
      ${tableRow("Add-ons", body.features.length ? body.features.map((f) => FEATURE_LABELS[f] ?? f).join(", ") : "None")}
      ${tableRow("Timeline", TIMELINE_LABELS[body.timeline] ?? body.timeline)}
      ${tableRow("Budget", body.budgetRange || "—")}
    </table>
    ${
      isCustom
        ? `<div style="padding:16px;background:${C.accentDim};border:1px solid ${C.accentBdr};border-radius:8px;">
           <p style="color:${C.accent};font-size:12px;font-weight:600;margin:0 0 4px;">Custom Project</p>
           <p style="color:${C.textSec};font-size:13px;margin:0;">Manual quote required — book a scoping call.</p>
         </div>`
        : estimateBlock(estimate)
    }
    <p style="color:${C.textMut};font-size:11px;margin:24px 0 0;font-family:monospace;">
      Submitted: ${new Date().toISOString()}
    </p>
  `),
  );
}

// ─── Client confirmation ──────────────────────────────────────────────────────

function clientEmailHtml(
  body: RequestBody,
  estimate: EstimateResult | false,
): string {
  const firstName = body.name.split(" ")[0];
  const isCustom = estimate === false;

  return emailWrapper(
    emailCard(`
    ${accentBar}
    ${brandHeader}
    <h1 style="color:${C.textPri};font-size:22px;font-weight:700;margin:0 0 8px;letter-spacing:-0.02em;">
      ${isCustom ? "Let's scope your project" : "Your project estimate"}
    </h1>
    <p style="color:${C.textSec};font-size:14px;margin:0 0 24px;line-height:1.6;">
      Hi ${firstName}, thanks for using the estimate tool.
      ${
        isCustom
          ? " Your project needs a scoping conversation first. Let's talk — it's free and there's no commitment."
          : " Here's a summary. I'll follow up within a few hours to discuss the details."
      }
    </p>

    ${
      isCustom
        ? `<div style="text-align:center;padding:24px 0;">
           <a href="https://cal.com/sodiq-atiku-ljdgnr/30min"
              style="display:inline-block;padding:14px 28px;background:${C.accent};color:#fff;text-decoration:none;border-radius:9px;font-weight:700;font-size:14px;">
             Book a Free Discovery Call →
           </a>
         </div>`
        : `${estimateBlock(estimate as EstimateResult)}
         <div style="margin:16px 0;padding:14px 16px;background:${C.bg};border:1px solid ${C.border};border-radius:8px;">
           <p style="color:${C.textMut};font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;font-family:monospace;">Project Type</p>
           <p style="color:${C.textPri};font-size:14px;font-weight:600;margin:0;">${PROJECT_LABELS[body.projectType] ?? body.projectType}</p>
         </div>
         <div style="background:${C.accentDim};border:1px solid ${C.accentBdr};border-radius:10px;padding:20px;margin:20px 0;">
           <p style="color:${C.textPri};font-size:14px;font-weight:600;margin:0 0 8px;">Ready to lock in your timeline?</p>
           <p style="color:${C.textSec};font-size:13px;margin:0 0 16px;line-height:1.6;">
             Book a 30-min discovery call to finalise the scope and confirm your quote.
           </p>
           <a href="https://cal.com/sodiq-atiku-ljdgnr/30min"
              style="display:inline-block;padding:12px 24px;background:${C.accent};color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:13px;">
             Book a Discovery Call →
           </a>
         </div>`
    }

    <p style="color:${C.textMut};font-size:12px;margin:20px 0 0;line-height:1.6;">
      This estimate is valid for 30 days from
      ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
      Final pricing confirmed after a scoping call.
    </p>
    <div style="border-top:1px solid ${C.border};margin-top:20px;padding-top:16px;text-align:center;">
      <p style="color:${C.textMut};font-size:11px;margin:0;font-family:monospace;">
        Sodiq Atiku · Hypacode · Lagos, Nigeria ·
        <a href="https://hypacode.vercel.app" style="color:${C.accent};text-decoration:none;">hypacode.vercel.app</a>
      </p>
    </div>
  `),
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE HANDLER
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const { name, email, projectType, features = [], timeline } = body;

    // Validation
    if (!name || name.trim().length < 2)
      return NextResponse.json(
        { success: false, message: "Name is required." },
        { status: 400 },
      );
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json(
        { success: false, message: "A valid email is required." },
        { status: 400 },
      );
    if (!projectType || !timeline)
      return NextResponse.json(
        { success: false, message: "Project type and timeline are required." },
        { status: 400 },
      );

    // Compute estimate server-side
    const estimate = buildEstimate(projectType, features, timeline);

    // Send emails via Resend (both settle independently — never blocks the response)
    const contactEmail = process.env.CONTACT_EMAIL;
    if (contactEmail && process.env.RESEND_API_KEY) {
      const subjectSuffix = estimate
        ? ` ($${estimate.low.toLocaleString()}–$${estimate.high.toLocaleString()})`
        : " (Custom)";

      await Promise.allSettled([
        resend.emails.send({
          from: "Hypacode Portfolio <onboarding@resend.dev>",
          to: [contactEmail],
          replyTo: email,
          subject: `New estimate: ${PROJECT_LABELS[projectType] ?? projectType}${subjectSuffix} — ${name}`,
          html: ownerEmailHtml(body, estimate),
        }),
        resend.emails.send({
          from: "Sodiq Atiku <onboarding@resend.dev>",
          to: [email],
          subject: `Your Hypacode estimate is ready, ${name.split(" ")[0]}`,
          html: clientEmailHtml(body, estimate),
        }),
      ]);
    }

    return NextResponse.json({ success: true, estimate });
  } catch (error) {
    console.error("[/api/estimate]", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
