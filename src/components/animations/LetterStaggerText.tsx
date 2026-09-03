"use client";

import React, { useEffect, useRef, useState } from "react";

interface LetterStaggerTextProps {
  text: string;
  /** Delay in ms before the first letter starts (default 0) */
  baseDelay?: number;
  /** Delay between each letter in ms (default 40) */
  staggerMs?: number;
  className?: string;
  /** If true, triggers immediately on mount; if false, waits for IntersectionObserver */
  triggerOnMount?: boolean;
}

/**
 * LetterStaggerText
 *
 * Animates text letter-by-letter: each character fades in, slides up, and
 * blur reduces — matching the heading animation spec from heading promts.odt.
 *
 * Words are wrapped in non-breaking spans so lines don't break mid-word.
 */
export default function LetterStaggerText({
  text,
  baseDelay = 0,
  staggerMs = 38,
  className = "",
  triggerOnMount = false,
}: LetterStaggerTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(triggerOnMount);

  useEffect(() => {
    if (triggerOnMount) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnMount]);

  // Split into words; each word is a non-breaking unit
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((char) => {
            const idx = globalIndex++;
            const delay = baseDelay + idx * staggerMs;
            return (
              <span
                key={idx}
                className="letter-animate"
                style={
                  visible
                    ? { animationDelay: `${delay}ms` }
                    : { opacity: 0, filter: "blur(6px)" }
                }
              >
                {char}
              </span>
            );
          })}
          {/* space between words (not animated, just structural) */}
          {wi < words.length - 1 && (
            <span className="letter-animate" style={visible ? { animationDelay: `${baseDelay + globalIndex++ * staggerMs}ms` } : { opacity: 0 }}>
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
