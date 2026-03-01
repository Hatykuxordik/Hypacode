import Image from "next/image";
import Link from "next/link";
import { personalInfo, projects, currentlyBuilding } from "@/lib/data";
import CodeWindow from "@/components/CodeWindow";
import MagneticButton from "@/components/ui/MagneticButton";

export default function HeroSection() {
  const filenames = ["useSpendData.ts", "api/estimate.ts", "motion.config.ts"];
  return (
    <section
      style={{
        paddingTop: `calc(var(--navbar-height) + clamp(24px, 4vw, 48px))`, // Tighter clamp, uses var for mobile/desktop
        paddingBottom: "clamp(32px, 5vw, 64px)", // Reduced for less bottom space
        minHeight: "100svh", // Changed to minHeight to allow expansion, reduce empty space
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="hero-headline"
    >
      {/* Background grid */}
      <div
        className="bg-grid"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(24px, 4vw, 48px)", // Tighter gap on mobile
            alignItems: "center",
          }}
        >
          <style>{`
              :root {
                --navbar-height: 72px; /* Desktop default */
              }
              @media (max-width: 767px) {
                :root {
                  --navbar-height: 50px; /* Mobile topbar */
                }
                .hero-section {
                  align-items: flex-start !important; /* Push content up on mobile to reduce bottom space */
                  padding-top: calc(var(--navbar-height) + 24px) !important; /* Override for even tighter top */
                }
                .hero-subheadline {
                  max-width: 90% !important; /* Better wrapping on small screens */
                }
              }
              @media (min-width: 1024px) {
                .hero-grid { grid-template-columns: 55% 1fr !important; }
                .hero-code { display: flex !important; }
              }
              @media (max-width: 767px) {
                :root {
                  --text-hero: clamp(2rem, 4vw + 1rem, 36px); /* Min 32px, fluid, max 36px */
                 }
                  
                .hero-code {
                  display: flex !important; /* Make visible and flex */
                  flex-direction: column !important;
                  align-items: center !important; /* Center child horizontally */
                  justify-content: center !important; /* Optional: vertical centering if needed */
                  width: 100%; /* Ensure full width */
                  margin: 0 auto; /* Symmetric margins */
                  padding: 0; /* Reset any asymmetric padding */
                }
                .code-window {
                  margin: 0 auto; /* Center within wrapper */
                }
              }
            `}</style>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "clamp(24px, 4vw, 48px)",
              alignItems: "center",
            }}
          >
            {/* Left: Identity block */}
            <div>
              {/* Availability pill */}
              <div
                className="availability-pill"
                style={{
                  marginBottom: "clamp(12px, 1.5vw, 20px)", // Tighter
                  display: "inline-flex",
                }}
                role="status"
                aria-label="Availability status"
              >
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--accent-success)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    fontFamily: "var(--font-code)",
                    color: "var(--accent-success)",
                    fontWeight: 600,
                  }}
                >
                  {personalInfo.availability}
                </span>
              </div>

              {/* Eyebrow */}
              <p
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "clamp(6px, 0.8vw, 10px)", // Tighter
                }}
              >
                <span style={{ color: "var(--accent-light)" }}>Hypacode</span>
                &nbsp;· Frontend Engineer · Lagos, NG
              </p>

              {/* Headline */}
              <div
                style={{
                  overflow: "hidden",
                  marginBottom: "clamp(12px, 1.5vw, 20px)", // Tighter
                }}
              >
                <h1
                  id="hero-headline"
                  className="font-display hero-headline"
                  style={{
                    fontSize: "var(--text-hero)",
                    lineHeight: 1.05,
                    color: "var(--text-primary)",
                    fontWeight: "normal",
                  }}
                >
                  Interfaces that
                  <br />
                  <span style={{ color: "var(--accent)" }}>earn trust</span>
                  <br />
                  and drive results
                </h1>
              </div>

              {/* Sub-headline */}
              <p
                className="hero-subheadline"
                style={{
                  fontSize: "var(--text-lg)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  maxWidth: "520px",
                  marginBottom: "clamp(16px, 2.5vw, 28px)", // Tighter
                }}
              >
                Next.js & React for teams that refuse slow, fragile or
                forgettable.
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  marginBottom: "clamp(20px, 2.5vw, 32px)", // Tighter
                }}
              >
                <MagneticButton
                  href="/projects"
                  className="hypa-cta-pill"
                  style={{ fontSize: 14 }}
                >
                  Explore Projects →
                </MagneticButton>
                <MagneticButton
                  href={personalInfo.calBooking30}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hypa-secondary-pill"
                >
                  Book a Call
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </MagneticButton>
              </div>

              {/* Social proof: photo + name + location */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid var(--border-strong)",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/assets/sodiq-atiku.jpg"
                    alt="Sodiq Atiku"
                    width={48}
                    height={48}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    priority
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Sodiq Atiku
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      fontFamily: "var(--font-code)",
                      color: "var(--text-muted)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    LAGOS, NG · UTC+1
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Code window (hidden on mobile) */}
            <div className="hero-right hero-code">
              {" "}
              {/* Removed inline display: none; media handles it */}
              <CodeWindow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
