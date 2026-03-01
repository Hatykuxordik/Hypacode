"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// ─── Thin progress bar — the real "professional" signal ──────────────────────
// Fires immediately on route change. Users see feedback before JS even runs.
function RouteProgress({ active }: { active: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={
        active
          ? { scaleX: 0.9, opacity: 1 } // fast fill to 90%, holds
          : { scaleX: 1, opacity: 0 } // complete + fade on arrival
      }
      transition={
        active
          ? { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
          : { duration: 0.2, ease: "easeOut" }
      }
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background:
          "linear-gradient(90deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 60%, transparent) 100%)",
        transformOrigin: "left center",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Page transition variants ─────────────────────────────────────────────────
//
// Philosophy: transitions should be FELT, not SEEN.
// - Exit is nearly invisible (100ms fade) — you don't want to watch content leave
// - Enter is fast (220ms) with a 6px upward drift — suggests "content arriving"
//   not "page flying in". 6px is the sweet spot: noticeable but not theatrical.
// - No x-axis movement — horizontal motion fights the navbar and causes eye strain
// - No scale — scaling page content feels like a mobile app, not a web product
//
// This is what Linear, Vercel, and Stripe use in spirit: barely-there, purposeful.
//
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8, // 8px — subtle, not dramatic
    filter: "blur(0px)", // no blur, clean entry
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.22, // fast enough to feel instant
      ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad — decelerates naturally
      opacity: { duration: 0.18 }, // opacity slightly faster than position
    },
  },
  exit: {
    opacity: 0,
    y: -4, // tiny upward nudge on exit, barely visible
    transition: {
      duration: 0.12, // very fast exit — don't make users wait
      ease: "easeIn",
    },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [progressing, setProgressing] = useState(false);

  useEffect(() => {
    setProgressing(true);
    const t = setTimeout(() => setProgressing(false), 450);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <RouteProgress active={progressing} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          id="main-content"
          role="main"
          className="flex flex-col items-center"
          style={{
            // GPU compositing hint — browser promotes to own layer
            // Prevents transition from triggering paint on surrounding elements
            willChange: "opacity, transform",
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
