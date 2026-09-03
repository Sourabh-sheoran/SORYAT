"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, Globe, ShieldCheck, Clock, Zap } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

export default function WorldMapGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full rounded-3xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 p-6 sm:p-10 backdrop-blur-xl overflow-hidden shadow-2xl"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-neutral-400 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-neutral-500 blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Globe size={13} />
            <span>Cross-Continental Engineering Network</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
            India Delivery Engine • Canadian Business Presence
          </h3>
          <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mt-1">
            Combining rapid high-velocity Indian full-stack development with North American business alignment, rigorous code standards, and 24/7 cross-timezone coverage.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-xs text-black/90 dark:text-white/90 font-mono flex items-center gap-1.5"
          >
            <Zap size={13} className="text-yellow-400" />
            <span>1–2 Wk Turnaround</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-xs text-black/90 dark:text-white/90 font-mono flex items-center gap-1.5"
          >
            <ShieldCheck size={13} className="text-black/60 dark:text-white/60" />
            <span>Low Advance Demo</span>
          </motion.div>
        </div>
      </div>

      {/* SVG Map Layout with Motion Line Drawing */}
      <div className="relative w-full aspect-[2/1] min-h-[320px] max-h-[440px] bg-[#0c0c0c]/90 rounded-2xl border border-black/10 dark:border-white/10 p-4 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full text-black/10 dark:text-white/10 select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle World Grid Lines */}
          <line x1="0" y1="125" x2="1000" y2="125" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="0" y1="250" x2="1000" y2="250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="0" y1="375" x2="1000" y2="375" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="250" y1="0" x2="250" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="750" y1="0" x2="750" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />

          {/* Continents Outlines */}
          <path
            d="M 120 90 Q 200 70, 290 90 T 320 170 Q 280 230, 200 240 Q 150 200, 120 150 Z"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
          />
          <path
            d="M 240 260 Q 300 280, 290 380 Q 240 440, 210 390 Q 200 320, 240 260 Z"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          <path
            d="M 460 100 Q 550 90, 560 170 Q 500 200, 470 170 Z"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          <path
            d="M 480 200 Q 560 210, 560 330 Q 510 390, 480 320 Z"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          <path
            d="M 580 90 Q 750 80, 850 160 Q 780 250, 710 240 Q 690 320, 660 320 Q 640 240, 580 180 Z"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
          />
          <path
            d="M 780 330 Q 860 340, 850 410 Q 790 420, 780 330 Z"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />

          {/* Animated Connecting Arcs / Flow Beams with motion.path */}
          {/* Arc 1: Toronto (x: 260, y: 140) to India (x: 670, y: 260) */}
          <motion.path
            d="M 260 140 Q 460 40, 670 260"
            stroke="url(#beamGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="animate-beam"
          />

          {/* Arc 2: Vancouver (x: 160, y: 120) to India (x: 670, y: 260) */}
          <motion.path
            d="M 160 120 Q 400 20, 670 260"
            stroke="url(#beamGradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.8, delay: 0.3, ease: "easeInOut" }}
          />

          <defs>
            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Node: Canada Gateway */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-[28%] left-[24%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        >
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-neutral-400 animate-ping" />
            <div className="w-4 h-4 rounded-full bg-neutral-400 border-2 border-black dark:border-white shadow-lg shadow-neutral-400" />
          </div>
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl bg-white/90 dark:bg-black/90 border border-black/20 dark:border-white/20 backdrop-blur-md text-center shadow-xl transition-transform"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-black dark:text-white">
              <MapPin size={11} className="text-black/60 dark:text-white/60" />
              <span>Canada Gateway</span>
            </div>
            <div className="text-[10px] text-black/60 dark:text-white/60 font-mono mt-0.5">
              Toronto & Vancouver (EST/PST)
            </div>
            <div className="text-[9px] text-black/80 dark:text-white/80 font-mono mt-1 px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">
              CAD $ / USD Billing
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Node: India Core Engine */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute top-[52%] left-[67%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        >
          <div className="relative">
            <span className="absolute -inset-3 rounded-full bg-neutral-400 animate-ping" />
            <div className="w-5 h-5 rounded-full bg-neutral-400 border-2 border-black dark:border-white shadow-lg shadow-neutral-400 flex items-center justify-center text-[9px] font-bold text-black">
              ★
            </div>
          </div>
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 p-2.5 rounded-xl bg-white/90 dark:bg-black/90 border border-black/20 dark:border-white/20 backdrop-blur-md text-center shadow-xl transition-transform"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-black dark:text-white">
              <MapPin size={11} className="text-black/60 dark:text-white/60" />
              <span>India Engineering Hub</span>
            </div>
            <div className="text-[10px] text-black/60 dark:text-white/60 font-mono mt-0.5">
              Bengaluru & Gurugram
            </div>
            <div className="text-[9px] text-black/80 dark:text-white/80 font-mono mt-1 px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10">
              Low Advance • 1-2 Wk Sprints
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Grid of 3 Global Advantages with animated counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
        >
          <div className="flex items-center gap-2 text-black dark:text-white font-medium text-sm mb-1">
            <Clock size={16} className="text-neutral-600 dark:text-neutral-400" />
            <span>24/7 Overlapping Sprints</span>
          </div>
          <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
            While North America sleeps, our India engineering clusters build and push revisions. You wake up to fresh commits.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
        >
          <div className="flex items-center gap-2 text-black dark:text-white font-medium text-sm mb-1">
            <ShieldCheck size={16} className="text-neutral-600 dark:text-neutral-400" />
            <span>Demo-First Guarantee</span>
          </div>
          <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
            Inspect the live staging demo on your phone and laptop before paying final milestones. Zero risk.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
        >
          <div className="flex items-center gap-2 text-black dark:text-white font-medium text-sm mb-1">
            <Globe size={16} className="text-neutral-500" />
            <span>Dual-Currency Invoicing</span>
          </div>
          <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
            Pay seamlessly via UPI/NEFT in INR (₹) or Stripe/Wise/Interac in CAD ($) and USD ($).
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
