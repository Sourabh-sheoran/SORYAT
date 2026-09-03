"use client";

import React from "react";
import {
  Clock,
  MonitorPlay,
  CreditCard,
  RotateCcw,
  Headphones,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAgency } from "@/context/AgencyContext";
import CardSwap, { Card } from "./CardSwap";

const BENEFITS = [
  {
    icon: Clock,
    title: "1–2 Week Turnaround",
    tagline: "Rapid high-velocity delivery",
    description:
      "We don't do months-long agency bloat. Full websites and AI prototypes are production-ready in 7 to 14 business days.",
    stat: "7-14 Days",
    statLabel: "Average Launch Time",
    accent: "text-amber-500 dark:text-amber-400",
  },
  {
    icon: MonitorPlay,
    title: "Demo-First Approach",
    tagline: "Inspect before final payment",
    description:
      "We build and deploy a live interactive staging preview for your team. You test every feature before paying the remaining balance.",
    stat: "100%",
    statLabel: "Transparency",
    accent: "text-blue-500 dark:text-blue-400",
  },
  {
    icon: CreditCard,
    title: "Custom Starting Advance",
    tagline: "Lowest friction in the industry",
    description:
      "Only Custom (~$36 / CAD $50) to start development. Fully credited toward project completion, or refunded if you decide not to proceed.",
    stat: "Custom",
    statLabel: "Risk-Free Kickstart",
    accent: "text-emerald-500 dark:text-emerald-400",
  },
  {
    icon: RotateCcw,
    title: "Free Revisions",
    tagline: "Satisfaction guaranteed",
    description:
      "Not completely satisfied with the initial demo? We provide free design and code revisions until the build matches your exact expectations.",
    stat: "Unlimited",
    statLabel: "Demo Iterations",
    accent: "text-rose-500 dark:text-rose-400",
  },
  {
    icon: Headphones,
    title: "24/7 Global Support",
    tagline: "IST, EST & PST Timezone overlap",
    description:
      "Direct WhatsApp and Slack access to senior engineers. Real-time debugging, instant status updates, and emergency hotfixes.",
    stat: "< 2 Hours",
    statLabel: "Response SLA",
    accent: "text-purple-500 dark:text-purple-400",
  },
  {
    icon: Wrench,
    title: "1 Month Free Maintenance",
    tagline: "Post-launch warranty included",
    description:
      "30 full days of zero-cost bug fixes, performance monitoring, server config adjustments, and minor content updates post-deployment.",
    stat: "30 Days",
    statLabel: "Free Warranty",
    accent: "text-cyan-500 dark:text-cyan-400",
  },
];

export default function BenefitsSection() {
  const { setIsConsultationOpen } = useAgency();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 backdrop-blur-md text-xs font-mono text-black/70 dark:text-white/70 mb-4">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Guaranteed in Writing</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-normal text-black dark:text-white tracking-tight"
          style={{ fontFamily: "var(--font-instrument), serif" }}
        >
          Pillars of Engineering
        </h2>
        <p className="mt-3 text-sm sm:text-base text-black/60 dark:text-white/60">
          Our core commitments to your business, baked into every milestone contract.
        </p>
      </div>

      {/* 3D Card Stack */}
      <div className="w-full max-w-[540px] relative px-4">
        <CardSwap
          width="100%"
          height={340}
          cardDistance={35}
          verticalDistance={30}
          delay={4000}
          pauseOnHover={true}
          skewAmount={4}
        >
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                className="p-6 sm:p-7 flex flex-col justify-between group cursor-pointer select-none"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.04)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.06)_0%,_transparent_70%)]" />

                <div>
                  {/* Header: Icon + Metric Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center text-black dark:text-white shadow-sm group-hover:scale-105 transition-transform">
                      <Icon size={22} className={benefit.accent} />
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-base font-bold text-black dark:text-white">
                        {benefit.stat}
                      </div>
                      <div className="text-[10px] font-mono text-black/50 dark:text-white/50 uppercase tracking-wider">
                        {benefit.statLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-black dark:text-white mb-1 tracking-tight">
                    {benefit.title}
                  </h3>
                  <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                    {benefit.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-black/75 dark:text-white/75 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom action bar */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 mt-4 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-black/60 dark:text-white/60">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Pillar 0{i + 1}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsConsultationOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-[11px] font-medium"
                  >
                    <span>Kickstart Demo</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </Card>
            );
          })}
        </CardSwap>
      </div>
    </div>
  );
}
