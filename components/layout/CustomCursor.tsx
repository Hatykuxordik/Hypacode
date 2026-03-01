"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — dual-layer cursor (ring + dot).
 * Only active on pointer:fine (mouse/trackpad) — never on touch devices.
 * Hidden when prefers-reduced-motion is set.
 * pointer-events: none on all elements — never blocks interactions.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Check for fine pointer (mouse/trackpad) and reduced-motion
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!isFine || isReduced) return;

    setVisible(true);

    let ringX = 0,
      ringY = 0;
    let dotX = 0,
      dotY = 0;
    let targetX = 0,
      targetY = 0;
    let rafId: number;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      // Outer ring lags (lerp 0.12), inner dot snaps fast (lerp 0.85)
      ringX = lerp(ringX, targetX, 0.12);
      ringY = lerp(ringY, targetY, 0.12);
      dotX = lerp(dotX, targetX, 0.85);
      dotY = lerp(dotY, targetY, 0.85);

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`;
        dotRef.current.style.top = `${dotY}px`;
      }
      rafId = requestAnimationFrame(tick);
    }

    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function onMouseEnter(e: MouseEvent) {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest(
        "a, button, [data-cursor='card'], input, textarea, select, [tabindex]",
      );
      setHovering(!!isInteractive);
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseEnter, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — lags behind cursor */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        data-hovering={hovering}
      >
        <div className="cursor-ring-inner" />
      </div>

      {/* Inner dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        data-hovering={hovering}
      >
        <div className="cursor-dot-inner" />
      </div>
    </>
  );
}
