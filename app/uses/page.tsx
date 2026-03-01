import type { Metadata } from "next";
import { usesPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Uses — The Stack Behind Hypacode",
  description:
    "The technology stack, tools, and decisions behind the Hypacode portfolio.",
  robots: { index: false, follow: false },
};

export default function UsesPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stack = [
    {
      key: "FRAMEWORK",
      name: usesPage.framework.name,
      reason: usesPage.framework.reason,
    },
    {
      key: "LANGUAGE",
      name: usesPage.language.name,
      reason: usesPage.language.reason,
    },
    {
      key: "STYLING",
      name: usesPage.styling.name,
      reason: usesPage.styling.reason,
    },
    {
      key: "ANIMATIONS",
      name: usesPage.animations.name,
      reason: usesPage.animations.reason,
    },
    {
      key: "FORMS & VALIDATION",
      name: usesPage.forms.name,
      reason: usesPage.forms.reason,
    },
    {
      key: "STATE MANAGEMENT",
      name: usesPage.state.name,
      reason: usesPage.state.reason,
    },
    {
      key: "UI COMPONENTS",
      name: usesPage.ui.name,
      reason: usesPage.ui.reason,
    },
    {
      key: "PDF GENERATION",
      name: usesPage.pdf.name,
      reason: usesPage.pdf.reason,
    },
    {
      key: "FONTS",
      name: usesPage.fonts.name,
      reason: usesPage.fonts.reason,
    },
    {
      key: "AI INTEGRATION",
      name: usesPage.ai.name,
      reason: usesPage.ai.reason,
    },
    {
      key: "EMAIL",
      name: usesPage.email.name,
      reason: usesPage.email.reason,
    },
    {
      key: "DEPLOYMENT",
      name: usesPage.deployment.name,
      reason: usesPage.deployment.reason,
    },
    {
      key: "DESIGN SYSTEM",
      name: usesPage.design.name,
      reason: undefined,
    },
  ];

  return (
    <div
      style={{
        width: "100vw",
        paddingTop: "calc(72px + var(--space-8))",
        paddingBottom: "var(--space-16)",
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ maxWidth: "680px" }}>
        {/* ── Terminal header ── */}
        <div
          style={{
            backgroundColor: "var(--code-bg)",
            border: "1px solid var(--code-border)",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "var(--space-8)",
          }}
        >
          {/* macOS traffic lights */}
          <div
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid var(--code-border)",
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#FF5F57",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#FFBD2E",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#28C840",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                marginLeft: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--text-muted)",
              }}
            >
              stack.config.ts
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: "var(--space-4)" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
                color: "#d4be98",
                marginBottom: "4px",
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>// </span>
              stack.config.ts — the technology behind this site
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--text-muted)",
                marginTop: "var(--space-2)",
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>// </span>
              LAST UPDATED: {currentDate}
            </p>
          </div>
        </div>

        {/* ── Stack entries ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {stack.map((item) => (
            <div
              key={item.key}
              style={{
                padding: "var(--space-3) var(--space-4)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                transition: "border-color 0.2s ease",
              }}
              className="stack-item"
            >
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "5px",
                }}
              >
                {item.key}
              </p>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: item.reason ? "4px" : "0",
                }}
              >
                {item.name}
              </p>
              {item.reason && (
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)",
                      marginRight: "6px",
                      opacity: 0.5,
                    }}
                  >
                    //
                  </span>
                  {item.reason}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── Performance note ── */}
        <div
          style={{
            marginTop: "var(--space-6)",
            padding: "var(--space-3) var(--space-4)",
            backgroundColor: "var(--code-bg)",
            border: "1px solid var(--code-border)",
            borderRadius: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "8px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "var(--text-xs)",
            }}
          >
            <span style={{ opacity: 0.5, marginRight: "6px" }}>//</span>
            PERFORMANCE
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <p style={{ color: "var(--text-secondary)" }}>
              Lighthouse:{" "}
              <span style={{ color: "var(--success)" }}>All green</span>
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              Core Web Vitals:{" "}
              <span style={{ color: "var(--success)" }}>Passing</span>
            </p>
          </div>
        </div>

        {/* ── Footer note ── */}
        <p
          style={{
            marginTop: "var(--space-6)",
            fontSize: "var(--text-sm)",
            color: "var(--text-muted)",
            textAlign: "center",
            fontFamily: "var(--font-mono)",
          }}
        >
          You found the secret page. 👀
        </p>
      </div>

      <style>{`
        .stack-item:hover {
          border-color: var(--border-strong);
        }
      `}</style>
    </div>
  );
}
