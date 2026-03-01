"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects, personalInfo, skills } from "@/lib/data"; // for calBooking30 URL

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const projectCount = projects.length;
const skillCount = skills.core.length;

const navLinks = [
  {
    label: "Work",
    href: "/projects",
    defaultSub: `${projectCount} projects`,
    hoverSub: "Villeto · Fastpay · ODM →",
    icon: IconWork,
  },
  {
    label: "Skills",
    href: "/skills",
    defaultSub: `${skillCount} core techs`,
    hoverSub: "Next.js · React · TS →",
    icon: IconSkills,
  },
  {
    label: "About",
    href: "/about",
    defaultSub: "LIVE_TIME",
    hoverSub: "3yr exp · Full-stack →",
    icon: IconAbout,
  },
  {
    label: "Contact",
    href: "/contact",
    defaultSub: "Replies in ~1hr",
    hoverSub: "Book a call →",
    icon: IconContact,
  },
];

const socialLinks = [
  { name: "X", href: "https://x.com/hypacode", icon: IconX },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/hatykuxordik",
    icon: IconLinkedIn,
  },
  { name: "GitHub", href: "https://github.com/hatykuxordik", icon: IconGitHub },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getLagosTime(): string {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function resolveSubLabel(defaultSub: string, liveTime: string): string {
  return defaultSub === "LIVE_TIME" ? `Lagos · ${liveTime}` : defaultSub;
}

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

function IconWork({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}

function IconSkills({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconAbout({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4 3.58-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconContact({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function IconX({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedIn({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconGitHub({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED HAMBURGER → X
// ─────────────────────────────────────────────────────────────────────────────

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <motion.line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        animate={
          open
            ? { x1: 5, y1: 5, x2: 19, y2: 19 }
            : { x1: 3, y1: 6, x2: 21, y2: 6 }
        }
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.line
        x1="3"
        y1="12"
        x2="16"
        y2="12"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.14 }}
      />
      <motion.line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        animate={
          open
            ? { x1: 5, y1: 19, x2: 19, y2: 5 }
            : { x1: 3, y1: 18, x2: 21, y2: 18 }
        }
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP HEADER
// ─────────────────────────────────────────────────────────────────────────────

interface DesktopHeaderProps {
  scrolled: boolean;
  liveTime: string;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  activeIndex: number;
}

function DesktopHeader({
  scrolled,
  liveTime,
  hoveredIndex,
  setHoveredIndex,
  activeIndex,
}: DesktopHeaderProps) {
  return (
    <div
      className="hypa-navbar-header"
      data-scrolled={String(scrolled)}
      role="banner"
    >
      <motion.div
        className="hypa-header-inner"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <Link href="/" className="hypa-logo" aria-label="Hypacode — homepage">
          <div className="hypa-logo-mark">
            <Image
              src="/assets/Hypacodelogo.svg"
              alt="Hypacode"
              width={28}
              height={28}
            />
          </div>
          <span className="hypa-logo-name">
            Hypa<span style={{ color: "var(--accent)" }}>code</span>
          </span>
        </Link>

        <nav className="hypa-nav" aria-label="Main navigation">
          {navLinks.map((link, i) => {
            const isActive = activeIndex === i;
            const isHovered = hoveredIndex === i;
            const subDisplay = isHovered
              ? link.hoverSub
              : resolveSubLabel(link.defaultSub, liveTime);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="hypa-nav-item"
                data-scattered={String(!scrolled)}
                data-active={String(isActive)}
                data-hovered={String(isHovered)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="hypa-nav-label">{link.label}</span>
                <span
                  className="hypa-nav-sub"
                  data-collapsed={String(scrolled)}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={subDisplay}
                      className="hypa-nav-sub-text"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {subDisplay}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {isActive && (
                  <motion.span
                    layoutId="hypa-nav-dot"
                    className="hypa-nav-dot"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link href="/estimate" className="hypa-cta-pill">
          Get an Estimate
        </Link>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE DRAWER
// ─────────────────────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  liveTime: string;
}

function MobileDrawer({ open, onClose, liveTime }: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — z:9998 */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              zIndex: 9998,
            }}
          />

          {/* Drawer panel — z:9999 */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 36,
              mass: 0.85,
            }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(86vw, 340px)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "var(--bg-elevated, #0f0f0f)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Accent top line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, var(--accent, #6ee7b7) 50%, transparent)",
                opacity: 0.5,
              }}
            />

            {/* ── Header ── */}
            <div
              style={{
                padding: "22px 20px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                flexShrink: 0,
              }}
            >
              <Link
                href="/"
                onClick={onClose}
                aria-label="Hypacode — homepage"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Image
                  src="/assets/Hypacodelogo.svg"
                  alt="Hypacode"
                  width={30}
                  height={30}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display, inherit)",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "var(--text-primary, #fff)",
                      letterSpacing: "-0.4px",
                      lineHeight: 1.15,
                    }}
                  >
                    Hypa<span style={{ color: "var(--accent)" }}>code</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-code, monospace)",
                      fontSize: "8px",
                      letterSpacing: "2px",
                      color: "var(--text-muted, #444)",
                      marginTop: "3px",
                      textTransform: "uppercase",
                    }}
                  >
                    Frontend Engineer
                  </div>
                </div>
              </Link>

              <motion.button
                onClick={onClose}
                aria-label="Close navigation"
                whileTap={{ scale: 0.85 }}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  color: "var(--text-secondary, #777)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            </div>

            {/* ── Nav links ── */}
            <nav
              aria-label="Primary navigation"
              style={{ flex: 1, padding: "14px 12px 10px", overflowY: "auto" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-code, monospace)",
                  fontSize: "9px",
                  letterSpacing: "2.2px",
                  color: "var(--text-muted, #3a3a3a)",
                  textTransform: "uppercase",
                  padding: "0 8px 8px",
                }}
              >
                Menu
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                {navLinks.map((link, i) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(link.href + "/");
                  const Icon = link.icon;
                  const subLabel = resolveSubLabel(link.defaultSub, liveTime);

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.055 + 0.08,
                        duration: 0.32,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "11px 12px",
                          borderRadius: "12px",
                          textDecoration: "none",
                          background: isActive
                            ? "rgba(var(--accent-rgb, 110,231,183), 0.07)"
                            : "transparent",
                          border: `1px solid ${isActive ? "rgba(var(--accent-rgb,110,231,183), 0.14)" : "transparent"}`,
                          transition: "background 0.15s, border-color 0.15s",
                        }}
                      >
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isActive
                              ? "rgba(var(--accent-rgb, 110,231,183), 0.1)"
                              : "rgba(255,255,255,0.04)",
                            border: `1px solid ${isActive ? "rgba(var(--accent-rgb,110,231,183), 0.18)" : "rgba(255,255,255,0.05)"}`,
                            color: isActive
                              ? "var(--accent, #6ee7b7)"
                              : "var(--text-muted, #505050)",
                            transition: "all 0.15s",
                          }}
                        >
                          <Icon size={17} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: "15px",
                              fontWeight: 600,
                              letterSpacing: "-0.25px",
                              color: isActive
                                ? "var(--accent, #6ee7b7)"
                                : "var(--text-primary, #e6e6e6)",
                              lineHeight: 1.2,
                            }}
                          >
                            {link.label}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              marginTop: "2px",
                              color: isActive
                                ? "rgba(var(--accent-rgb,110,231,183), 0.5)"
                                : "var(--text-muted, #404040)",
                              fontFamily: "var(--font-code, monospace)",
                              letterSpacing: "0.2px",
                            }}
                          >
                            {subLabel}
                          </div>
                        </div>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 0.5, x: 0 }}
                              exit={{ opacity: 0 }}
                              style={{
                                color: "var(--accent, #6ee7b7)",
                                flexShrink: 0,
                              }}
                            >
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* ── Socials ── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.28 }}
              style={{
                padding: "14px 20px 10px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-code, monospace)",
                  fontSize: "9px",
                  letterSpacing: "2.2px",
                  color: "var(--text-muted, #3a3a3a)",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Elsewhere
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        color: "var(--text-muted, #484848)",
                        textDecoration: "none",
                        transition:
                          "color 0.15s, border-color 0.15s, background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.color = "var(--accent, #6ee7b7)";
                        el.style.borderColor =
                          "rgba(var(--accent-rgb,110,231,183),0.22)";
                        el.style.background =
                          "rgba(var(--accent-rgb,110,231,183),0.06)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.color = "var(--text-muted, #484848)";
                        el.style.borderColor = "rgba(255,255,255,0.07)";
                        el.style.background = "rgba(255,255,255,0.03)";
                      }}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* ── CTA buttons + copyright ── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.28 }}
              style={{
                padding: "14px 20px 32px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {/* Primary — Get an Estimate */}
              <Link
                href="/estimate"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "13px",
                  background: "var(--accent, #6ee7b7)",
                  color: "var(--text-on-accent, #080808)",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  letterSpacing: "-0.2px",
                }}
              >
                Get an Estimate
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              {/* Secondary — Book a Call */}
              <a
                href={personalInfo.calBooking30}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "13px",
                  borderRadius: "13px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  color: "var(--text-secondary, #9090a8)",
                  fontWeight: 600,
                  fontSize: "13px",
                  textDecoration: "none",
                  letterSpacing: "-0.1px",
                  transition:
                    "border-color 0.18s, background 0.18s, color 0.18s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor =
                    "rgba(var(--accent-rgb,110,231,183),0.2)";
                  el.style.background =
                    "rgba(var(--accent-rgb,110,231,183),0.05)";
                  el.style.color = "var(--accent, #6ee7b7)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.color = "var(--text-secondary, #9090a8)";
                }}
              >
                Book a Call
                {/* Calendar icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </a>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "4px",
                  fontSize: "9px",
                  fontFamily: "var(--font-code, monospace)",
                  color: "var(--text-muted, #333)",
                  letterSpacing: "1.3px",
                  textTransform: "uppercase",
                }}
              >
                © {new Date().getFullYear()} Hypacode · Lagos, NG
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE TOP BAR
// ─────────────────────────────────────────────────────────────────────────────

interface MobileTopBarProps {
  scrolled: boolean;
  liveTime: string;
}

function MobileTopBar({ scrolled, liveTime }: MobileTopBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="hypa-mobile-topbar"
        data-scrolled={String(scrolled)}
        role="banner"
      >
        <Link
          href="/"
          aria-label="Hypacode — homepage"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <Image
            src="/assets/Hypacodelogo.svg"
            alt="Hypacode"
            width={28}
            height={28}
          />
          <span
            style={{
              fontFamily: "var(--font-display, inherit)",
              fontWeight: 700,
              fontSize: "16px",
              color: "var(--text-primary, #fff)",
              letterSpacing: "-0.35px",
            }}
          >
            Hypa<span style={{ color: "var(--accent, #6ee7b7)" }}>code</span>
          </span>
        </Link>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          whileTap={{ scale: 0.88 }}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "11px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${open ? "rgba(var(--accent-rgb,110,231,183),0.2)" : "rgba(255,255,255,0.09)"}`,
            background: open
              ? "rgba(var(--accent-rgb,110,231,183),0.06)"
              : "rgba(255,255,255,0.04)",
            color: open
              ? "var(--accent, #6ee7b7)"
              : "var(--text-secondary, #888)",
            transition: "background 0.2s, border-color 0.2s, color 0.2s",
          }}
        >
          <MenuIcon open={open} />
        </motion.button>
      </div>

      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        liveTime={liveTime}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [liveTime, setLiveTime] = useState(getLagosTime());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => setLiveTime(getLagosTime()), 60_000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const activeIndex = navLinks.findIndex(
    (l) => pathname === l.href || pathname.startsWith(l.href + "/"),
  );

  return (
    <>
      <DesktopHeader
        scrolled={scrolled}
        liveTime={liveTime}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        activeIndex={activeIndex}
      />
      <MobileTopBar scrolled={scrolled} liveTime={liveTime} />
    </>
  );
}
