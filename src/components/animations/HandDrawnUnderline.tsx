"use client";

import React, { useEffect, useRef, useState } from "react";

interface HandDrawnUnderlineProps {
  children: React.ReactNode;
  /** Color of the SVG underline stroke */
  color?: string;
  /** Stroke width (default 3) */
  strokeWidth?: number;
  className?: string;
}

/**
 * HandDrawnUnderline
 *
 * Wraps children in a <span> and renders a hand-drawn wavy SVG underline
 * beneath that animates (draws on) when scrolled into view.
 *
 * Spec from heading promts.odt: stroke-dashoffset technique, triggers on scroll.
 */
export default function HandDrawnUnderline({
  children,
  color = "#22d3ee",
  strokeWidth = 3,
  className = "",
}: HandDrawnUnderlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      {/* SVG underline positioned absolutely below the text */}
      <span
        aria-hidden="true"
        className="absolute left-0 -bottom-1 w-full overflow-visible pointer-events-none"
        style={{ height: "12px" }}
      >
        <svg
          width="100%"
          height="12"
          viewBox="0 0 300 12"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={svgRef}
            d="M2,8 C30,2 70,11 110,6 C150,1 190,10 230,5 C260,1 280,8 298,6"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`underline-draw ${visible ? "is-visible" : ""}`}
          />
        </svg>
      </span>
    </span>
  );
}
