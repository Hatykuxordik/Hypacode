"use client";

import { animate } from "motion"; // Import from "motion" (Motion One library)
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  range?: number;
  href?: string;
  [key: string]: any;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  range = 100,
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null); // Simplified ref type
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const container = containerRef.current;
    if (!element || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = Math.min(Math.max(e.clientX - centerX, -range), range);
      const distanceY = Math.min(Math.max(e.clientY - centerY, -range), range);

      // Animate with Motion One's spring physics
      animate(
        container,
        {
          x: distanceX * strength,
          y: distanceY * strength,
          rotateY: (distanceX / range) * -5, // Invert for natural 3D feel
          rotateX: (distanceY / range) * 5,
        } as any, // Cast to any to bypass TypeScript error on shorthand properties
        {
          duration: 0.3, // Spring-like timing
          type: "spring", // Use Motion One's spring type
          stiffness: 300,
          damping: 30,
        },
      );
    };

    const handleMouseLeave = () => {
      // Animate back to reset
      animate(
        container,
        {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
        } as any, // Cast to any to bypass TypeScript error on shorthand properties
        {
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      );
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, range]);

  // Determine component based on href
  let Component: any = "button";
  if (href) {
    Component = href.startsWith("/") || href.startsWith("#") ? Link : "a";
  }

  return (
    <div
      ref={containerRef}
      className="inline-block group"
      style={{
        perspective: 1000, // For 3D transforms
        willChange: "transform", // Optimize for GPU
        transformStyle: "preserve-3d", // Enable 3D context
      }}
    >
      <Component
        ref={ref}
        href={href} // Pass href if present
        className={cn(
          "relative overflow-hidden transition-all duration-300 ease-out",
          "group-hover:shadow-[0_0_16px_var(--accent-glow)]", // CSS hover for no re-renders
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
}
