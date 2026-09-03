"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  /** The final numeric value to count to */
  value: number;
  /** Optional prefix, e.g. "₹" */
  prefix?: string;
  /** Optional suffix, e.g. "+" or "%" or "Cr" */
  suffix?: string;
  /** Duration of count animation in ms (default 1800) */
  duration?: number;
  /** Label text below the number */
  label: string;
  className?: string;
}

/**
 * CountUpStat
 *
 * Displays a large statistic number that counts up from 0 when scrolled
 * into the viewport. Matches the count-up animation spec from heading promts.odt.
 */
export default function CountUpStat({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  label,
  className = "",
}: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;

    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [triggered, value, duration]);

  return (
    <div ref={ref} className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div className="stat-number text-4xl sm:text-5xl lg:text-6xl font-light text-black dark:text-white tracking-tight">
        {prefix}
        <span className="tabular-nums">{count.toLocaleString("en-IN")}</span>
        {suffix}
      </div>
      <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.12em] text-black/60 dark:text-white/60">
        {label}
      </div>
    </div>
  );
}
