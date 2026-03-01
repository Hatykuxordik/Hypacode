import Link from "next/link";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const socialLinks = [
  { label: "GitHub", url: personalInfo.github },
  { label: "LinkedIn", url: personalInfo.linkedin },
  { label: "Book a Call", url: personalInfo.calBooking30 },
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

function IconDownload() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconArrowUpRight() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        maxWidth: "100vw",
        padding: "clamp(32px, 4vw, 48px) clamp(20px, 4vw, 64px)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-center ">
        {/* ── COL 1: Brand ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Link href="/" className="hypa-logo" aria-label="Hypacode — homepage">
            <div className="hypa-logo-mark">
              <Image
                src="/assets/Hypacodelogo.svg"
                alt="Hypacode"
                width={26}
                height={26}
              />
            </div>
            <span className="hypa-logo-name">
              Hypa<span style={{ color: "var(--accent)" }}>code</span>
            </span>
          </Link>
          <p
            style={{
              fontSize: "12.5px",
              lineHeight: 1.7,
              color: "var(--text-muted, #5a5a7a)",
              fontFamily: "var(--font-code, monospace)",
              letterSpacing: "0.2px",
              margin: 0,
            }}
          >
            Sodiq Atiku &nbsp;·&nbsp; Lagos, Nigeria
            <br />
            Frontend Engineer
          </p>
        </div>

        {/* ── COL 2: Social links — hidden on mobile ── */}
        <nav
          className="hidden md:flex gap-1 items-center justify-around"
          aria-label="Footer links"
        >
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                width: "fit-content",
                padding: "8px 12px",
                borderRadius: "9px",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid transparent",
                color: "var(--text-secondary)",
                transition: "all 150ms",
                /* Hover styles (color, bg, border) cannot be expressed in pure inline styles.
                   Use React state + onMouseEnter/onMouseLeave or a CSS class if needed. */
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── COL 3: Actions — hidden on mobile ── */}
        <div className="hidden md:flex md:flex-col gap-2.5 items-end">
          <Link
            href={personalInfo.resumeUrl}
            download="Sodiq-Atiku-Frontend-Developer-Resume.pdf"
            aria-label="Download Sodiq Atiku's resume as PDF"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 20px",
              borderRadius: "11px",
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.05)",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              color: "var(--text-primary)",
              transition: "all 180ms ease-out",
              /* Hover / active / focus-visible styles (translate, bg, border, shadow, outline)
                 cannot be expressed in pure inline styles.
                 Use React state or a CSS class if needed. */
            }}
          >
            <IconDownload />
            Download Resume / CV
          </Link>

          <Link
            href="/uses"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontFamily: "var(--font-code, monospace)",
              padding: "4px 2px",
              textDecoration: "none",
              color: "var(--text-muted)",
              transition: "color 150ms",
              /* Hover color cannot be expressed in pure inline styles.
                 Use React state or a CSS class if needed. */
            }}
          >
            Built with Next.js · Tailwind · Motion
            <IconArrowUpRight />
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "32px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          fontSize: "11px",
          fontFamily: "var(--font-code, monospace)",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        <span>© {new Date().getFullYear()} Hypacode. All rights reserved.</span>
        <span>Lagos, NG</span>
      </div>
    </section>
  );
};

export default Footer;
