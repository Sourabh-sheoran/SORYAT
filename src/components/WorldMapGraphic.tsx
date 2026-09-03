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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/15 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Globe size={13} />
            <span>Cross-Continental Engineering Network</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            India Delivery Engine • Canadian Business Presence
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mt-1">
            Combining rapid high-velocity Indian full-stack development with North American business alignment, rigorous code standards, and 24/7 cross-timezone coverage.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/15 text-xs text-neutral-900 dark:text-white font-mono flex items-center gap-1.5 shadow-sm"
          >
            <Zap size={13} className="text-amber-500 dark:text-yellow-400" />
            <span className="font-semibold">1–2 Wk Turnaround</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/15 text-xs text-neutral-900 dark:text-white font-mono flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold">Low Advance Demo</span>
          </motion.div>
        </div>
      </div>

      {/* SVG Map Layout with Motion Line Drawing */}
      <div className="relative w-full aspect-[2/1] min-h-[320px] max-h-[440px] bg-neutral-100 dark:bg-[#0c0c0c]/90 rounded-2xl border border-neutral-200 dark:border-white/10 p-4 flex items-center justify-center overflow-hidden shadow-inner">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full text-neutral-300 dark:text-white/10 select-none pointer-events-none"
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

          {/* Continents Outlines - Black in Light Mode, Luminous in Dark Mode */}
          {/* North America */}
          <path
            d="M 65 65 L 120 50 L 160 55 L 200 45 L 240 50 L 255 70 L 290 65 L 305 85 L 285 105 L 255 100 L 250 120 L 275 130 L 270 155 L 250 170 L 230 165 L 220 185 L 205 195 L 195 220 L 180 230 L 165 210 L 155 170 L 135 155 L 115 150 L 95 125 L 75 110 L 55 90 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20 transition-colors duration-300"
            strokeWidth="1.2"
          />
          {/* Greenland */}
          <path
            d="M 330 40 L 370 35 L 390 60 L 375 90 L 340 85 L 325 65 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20 transition-colors duration-300"
            strokeWidth="1"
          />
          {/* South America */}
          <path
            d="M 215 240 L 245 240 L 275 255 L 315 280 L 320 310 L 300 350 L 285 390 L 265 440 L 250 440 L 240 390 L 235 340 L 220 300 L 210 265 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20 transition-colors duration-300"
            strokeWidth="1.2"
          />
          {/* Europe */}
          <path
            d="M 450 85 L 485 75 L 505 60 L 525 75 L 540 95 L 520 115 L 535 135 L 515 150 L 490 155 L 465 150 L 450 135 L 440 105 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20 transition-colors duration-300"
            strokeWidth="1.2"
          />
          {/* UK & Ireland */}
          <path
            d="M 435 95 L 448 90 L 445 110 L 430 115 Z M 420 105 L 428 100 L 425 112 L 418 110 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20 transition-colors duration-300"
            strokeWidth="1"
          />
          {/* Africa */}
          <path
            d="M 455 165 L 510 160 L 545 180 L 575 210 L 570 245 L 550 280 L 540 330 L 515 375 L 495 365 L 475 320 L 455 260 L 440 215 L 445 185 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20 transition-colors duration-300"
            strokeWidth="1.2"
          />
          {/* Madagascar */}
          <path
            d="M 570 310 L 580 315 L 575 350 L 565 345 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20"
            strokeWidth="1"
          />
          {/* Asia */}
          <path
            d="M 545 65 L 620 50 L 710 45 L 800 50 L 870 70 L 890 100 L 860 120 L 825 115 L 810 145 L 835 175 L 805 200 L 760 185 L 740 220 L 720 225 L 685 285 L 655 265 L 640 215 L 610 220 L 580 190 L 565 175 L 550 135 L 560 105 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20 transition-colors duration-300"
            strokeWidth="1.2"
          />
          {/* Japan */}
          <path
            d="M 875 130 L 890 145 L 880 170 L 865 155 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20"
            strokeWidth="1"
          />
          {/* Australia & Oceania */}
          <path
            d="M 770 315 L 820 305 L 865 320 L 870 355 L 850 395 L 810 405 L 765 380 L 755 345 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20 transition-colors duration-300"
            strokeWidth="1.2"
          />
          {/* New Zealand */}
          <path
            d="M 895 390 L 910 400 L 895 425 L 885 415 Z"
            className="fill-[#18181b] dark:fill-white/10 stroke-[#27272a] dark:stroke-white/20"
            strokeWidth="1"
          />

          {/* Animated Connecting Arc: Toronto (x: 235, y: 145) to India (x: 670, y: 245) */}
          <motion.path
            d="M 235 145 Q 450 30, 670 245"
            stroke="url(#beamGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />

          {/* Secondary Arc: Vancouver (x: 140, y: 125) to India (x: 670, y: 245) */}
          <motion.path
            d="M 140 125 Q 400 15, 670 245"
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
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Node: Canada Gateway */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-[29%] left-[23.5%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        >
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-blue-500/40 animate-ping" />
            <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-neutral-900 shadow-lg" />
          </div>
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl bg-white/95 dark:bg-[#111111]/95 border border-neutral-200 dark:border-white/20 backdrop-blur-md text-center shadow-xl transition-transform"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-neutral-950 dark:text-white">
              <MapPin size={11} className="text-blue-600 dark:text-blue-400" />
              <span>Canada Gateway</span>
            </div>
            <div className="text-[10px] text-neutral-600 dark:text-neutral-400 font-mono mt-0.5 font-medium">
              Toronto & Vancouver (EST/PST)
            </div>
            <div className="text-[9px] text-neutral-800 dark:text-neutral-200 font-mono mt-1 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/10 font-semibold border border-neutral-200 dark:border-white/10">
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
          className="absolute top-[49%] left-[67%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        >
          <div className="relative">
            <span className="absolute -inset-3 rounded-full bg-emerald-500/40 animate-ping" />
            <div className="w-5 h-5 rounded-full bg-emerald-600 border-2 border-white dark:border-neutral-900 shadow-lg flex items-center justify-center text-[9px] font-bold text-white">
              ★
            </div>
          </div>
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 p-2.5 rounded-xl bg-white/95 dark:bg-[#111111]/95 border border-neutral-200 dark:border-white/20 backdrop-blur-md text-center shadow-xl transition-transform"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-neutral-950 dark:text-white">
              <MapPin size={11} className="text-emerald-600 dark:text-emerald-400" />
              <span>India Engineering Hub</span>
            </div>
            <div className="text-[10px] text-neutral-600 dark:text-neutral-400 font-mono mt-0.5 font-medium">
              Bengaluru & Gurugram
            </div>
            <div className="text-[9px] text-emerald-700 dark:text-emerald-300 font-mono mt-1 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 font-semibold">
              Low Advance • 1-2 Wk Sprints
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Grid of 3 Global Advantages with animated counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="p-4 rounded-2xl bg-white/90 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm"
        >
          <div className="flex items-center gap-2 text-neutral-950 dark:text-white font-bold text-sm mb-1">
            <Clock size={16} className="text-blue-600 dark:text-blue-400" />
            <span>24/7 Overlapping Sprints</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            While North America sleeps, our India engineering clusters build and push revisions. You wake up to fresh commits.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="p-4 rounded-2xl bg-white/90 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm"
        >
          <div className="flex items-center gap-2 text-neutral-950 dark:text-white font-bold text-sm mb-1">
            <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span>Demo-First Guarantee</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            Inspect the live staging demo on your phone and laptop before paying final milestones. Zero risk.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="p-4 rounded-2xl bg-white/90 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm"
        >
          <div className="flex items-center gap-2 text-neutral-950 dark:text-white font-bold text-sm mb-1">
            <Globe size={16} className="text-purple-600 dark:text-purple-400" />
            <span>Dual-Currency Invoicing</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            Pay seamlessly via UPI/NEFT in INR (₹) or Stripe/Wise/Interac in CAD ($) and USD ($).
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
