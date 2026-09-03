"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Globe, Lock, ExternalLink, Sparkles } from "lucide-react";

interface DeviceMockupProps {
  type?: "laptop" | "browser" | "phone";
  title: string;
  url?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  children?: React.ReactNode;
}

export default function DeviceMockup({
  type = "browser",
  title,
  url = "https://demo.novastudio.agency",
  badge,
  stats,
  children,
}: DeviceMockupProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.03);
    setRotateY(x * 0.03);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="w-full rounded-2xl bg-[#111111] border border-black/20 dark:border-white/20 shadow-2xl shadow-black/80 overflow-hidden group"
    >
      {/* Browser Chrome Header */}
      <div className="bg-[#181818] border-b border-black/10 dark:border-white/10 px-4 py-3 flex items-center justify-between gap-4">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-auto flex items-center gap-2 px-3 py-1 rounded-lg bg-black/50 dark:bg-white/50 border border-black/10 dark:border-white/10 text-xs text-black/60 dark:text-white/60 font-mono">
          <Lock size={10} className="text-neutral-600 dark:text-neutral-400" />
          <span className="truncate">{url}</span>
        </div>

        {/* Badge or status */}
        {badge && (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-400 text-neutral-600 dark:text-neutral-400 border border-neutral-400">
            {badge}
          </span>
        )}
      </div>

      {/* Screen Body */}
      <div className="relative min-h-[260px] sm:min-h-[320px] bg-[#0c0c0c] p-6 flex flex-col justify-between overflow-hidden">
        {children}

        {/* Optional overlay stats bar at bottom of mockup */}
        {stats && (
          <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 grid grid-cols-3 gap-2 text-center bg-black/40 dark:bg-white/40 -mx-6 -mb-6 p-4">
            {stats.map((st) => (
              <div key={st.label}>
                <div className="font-mono text-sm font-bold text-neutral-600 dark:text-neutral-400">
                  {st.value}
                </div>
                <div className="text-[10px] font-mono text-black/50 dark:text-white/50 uppercase">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
