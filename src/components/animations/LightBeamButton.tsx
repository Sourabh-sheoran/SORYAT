"use client";

import React from "react";
import { motion } from "motion/react";

type GradientColors = [string, string, string];

interface LightBeamButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  /** Three color stops for the conic gradient beam. Default: violet→cyan→violet */
  gradientColors?: GradientColors;
  /** Button variant size */
  size?: "sm" | "md" | "lg";
}

/**
 * LightBeamButton
 *
 * A high-performance button with a rotating light beam border effect.
 * Implements the exact spec from heading promts.odt:
 * - CSS @property --gradient-angle for hardware-accelerated rotation
 * - conic-gradient border using pseudo-element + inner mask
 * - framer-motion scale on hover/tap
 * - Radial glow shine on hover
 *
 * Works best on dark backgrounds (#000 – #1a1a1a).
 */
export default function LightBeamButton({
  children,
  onClick,
  className = "",
  gradientColors = ["#8b5cf6", "#06b6d4", "#8b5cf6"],
  size = "md",
}: LightBeamButtonProps) {
  const gradientString = `conic-gradient(from var(--gradient-angle), transparent 0%, ${gradientColors[0]} 40%, ${gradientColors[1]} 50%, transparent 60%, transparent 100%)`;

  const sizeClasses = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-8 py-3.5 text-sm",
    lg: "px-10 py-4 text-base",
  }[size];

  return (
    <>
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes _border-spin {
          from { --gradient-angle: 0deg; }
          to   { --gradient-angle: 360deg; }
        }
        ._animate-beam-border {
          animation: _border-spin 2s linear infinite;
        }
      `}</style>
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className={[
          "group relative isolate overflow-hidden rounded-full",
          "bg-red-600 dark:bg-neutral-950 font-medium text-white transition-all",
          "shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)] dark:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]",
          "hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.7)] dark:hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.55)]",
          sizeClasses,
          className,
        ].join(" ")}
      >
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">{children}</span>

        {/* Rotating gradient border layer */}
        <div
          className="absolute inset-0 -z-10 rounded-full p-[1.5px] _animate-beam-border"
          style={{
            ["--gradient-angle" as string]: "0deg",
            background: gradientString,
          }}
        />

        {/* Inner background — keeps text readable through border */}
        <div className="absolute inset-[1.5px] -z-10 rounded-full bg-red-600 dark:bg-neutral-950 transition-colors" />

        {/* Radial glow shine overlay on hover */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.18)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
      </motion.button>
    </>
  );
}
