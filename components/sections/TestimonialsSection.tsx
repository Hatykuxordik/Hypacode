import { testimonials } from "@/lib/data";
import { MessageSquareQuote } from "lucide-react";

export default function TestimonialsSection() {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      style={{
        padding:
          "0 clamp(16px, 4vw, 32px) clamp(48px, 6vw, 80px)",
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
      }}
      aria-labelledby="testimonials-heading"
    >
      {/* Section Header */}
      <div style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
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
          // Recommendations
        </p>
        <h2
          id="testimonials-heading"
          className="font-display"
          style={{
            fontSize: "clamp(26px, 3.5vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
          }}
        >
          What Collaborators Say
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div
        className="testimonials-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: "clamp(16px, 2.5vw, 24px)",
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "clamp(12px, 1.5vw, 16px)",
              padding: "clamp(20px, 3vw, 32px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top gradient highlight */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  i === 0
                    ? "linear-gradient(90deg, var(--accent) 0%, transparent 100%)"
                    : "linear-gradient(90deg, var(--accent-success) 0%, transparent 100%)",
              }}
            />

            {/* Quote content */}
            <div>
              <MessageSquareQuote
                size={28}
                style={{
                  color: "var(--accent-light)",
                  opacity: 0.8,
                  marginBottom: 14,
                }}
                aria-hidden="true"
              />
              <p
                style={{
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  lineHeight: 1.65,
                  color: "var(--text-primary)",
                  fontStyle: "normal",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {t.author}
                </p>
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-code)",
                  }}
                >
                  {t.role} · {t.company}
                </p>
              </div>

              {t.project && (
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-code)",
                    padding: "3px 8px",
                    borderRadius: 999,
                    background: "var(--accent-muted)",
                    border: "1px solid var(--accent-border)",
                    color: "var(--accent-light)",
                  }}
                >
                  {t.project}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
