"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MessageSquare,
  FileCheck,
  CreditCard,
  Cpu,
  MonitorPlay,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { useAgency } from "@/context/AgencyContext";

interface Step {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: any;
  highlight?: boolean;
  tag?: string;
}

const TIMELINE_STEPS: Step[] = [
  {
    num: "01",
    title: "15-Min Discovery Consultation",
    subtitle: "Define goals, deliverables & tech stack",
    desc: "We discuss your target audience, functional specifications, and architectural constraints over Google Meet or WhatsApp.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "Scope & Transparent Proposal",
    subtitle: "Clear pricing, no surprise fees",
    desc: "We provide an itemized blueprint, guaranteed delivery timeline (1–2 weeks), and flat-rate quote in INR, CAD, or USD.",
    icon: FileCheck,
  },
  {
    num: "03",
    title: "Low Advance Kickstart",
    subtitle: "Risk-free entry point",
    desc: "You pay only Custom (~$36 / CAD $50) to start development. 100% credited toward your final total, or refundable if unsatisfied.",
    icon: CreditCard,
    highlight: true,
    tag: "Lowest Risk Entry",
  },
  {
    num: "04",
    title: "Rapid Sprint Development",
    subtitle: "Engineering with daily progress sync",
    desc: "Our full-stack team builds your application with Next.js, AI workflows, or research papers in high-velocity agile sprints.",
    icon: Cpu,
  },
  {
    num: "05",
    title: "Working Demo Ready",
    subtitle: "Live staging URL on your phone & desktop",
    desc: "We deploy a fully interactive staging link. You click through real buttons, test responsive states, and experience the build first-hand.",
    icon: MonitorPlay,
    highlight: true,
    tag: "Demo-First Milestone",
  },
  {
    num: "06",
    title: "Interactive Client Feedback",
    subtitle: "Collaborative review & notes",
    desc: "You review the working demo with your team and submit requested tweaks or feature polish via Loom, Slack, or call.",
    icon: MessageSquare,
  },
  {
    num: "07",
    title: "Free Revisions & Polish",
    subtitle: "Zero extra charges for revisions",
    desc: "We implement your modifications immediately until the live build strictly matches your exact vision.",
    icon: RotateCcw,
    highlight: true,
    tag: "Free Revisions Guarantee",
  },
  {
    num: "08",
    title: "Final Delivery & Free Maintenance",
    subtitle: "Source code handover + 1 Month Free Support",
    desc: "Upon your 100% satisfaction, final milestone is settled. We transfer the Git repo, deploy production DNS, and provide 30 days free maintenance.",
    icon: CheckCircle2,
  },
];

export default function HowItWorksTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const { setIsConsultationOpen } = useAgency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      {/* Top Banner Notice */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 dark:border-emerald-500/30 backdrop-blur-md mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <div className="text-xs sm:text-sm text-neutral-900 dark:text-white">
            <strong>The Demo-First Guarantee:</strong> You never pay in full until you test a functional, live staging preview.
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsConsultationOpen(true)}
          className="px-4 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold text-xs hover:bg-black dark:hover:bg-neutral-200 transition-colors shrink-0 shadow-md cursor-pointer"
        >
          Start with ₹3k Advance
        </motion.button>
      </div>

      {/* Interactive Step Navigator for desktop */}
      <div className="hidden lg:grid grid-cols-8 gap-2 mb-8">
        {TIMELINE_STEPS.map((step, idx) => (
          <motion.button
            key={step.num}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveStep(idx)}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
              activeStep === idx
                ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg"
                : step.highlight
                ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:text-white"
            }`}
          >
            <div className="font-mono text-[11px] font-bold">
              {step.num}
            </div>
            <div className="text-xs font-medium line-clamp-2 mt-2">
              {step.title}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Main Grid: Selected Active Card Focus + Full Interactive Step Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Step Highlight Spotlight */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-1 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-black/20 dark:border-white/20 backdrop-blur-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-neutral-400 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 font-bold px-3 py-1 rounded bg-black/10 dark:bg-white/10">
                Phase {TIMELINE_STEPS[activeStep].num} of 08
              </span>
              {TIMELINE_STEPS[activeStep].tag && (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-black/90 dark:text-white/90 border border-black/15 dark:border-white/15">
                  {TIMELINE_STEPS[activeStep].tag}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-medium text-black dark:text-white mb-2">
              {TIMELINE_STEPS[activeStep].title}
            </h3>
            <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4 font-mono">
              {TIMELINE_STEPS[activeStep].subtitle}
            </div>
            <p className="text-sm text-black/75 dark:text-white/75 leading-relaxed">
              {TIMELINE_STEPS[activeStep].desc}
            </p>
          </div>

          <div className="pt-6 border-t border-black/10 dark:border-white/10 mt-6 flex items-center justify-between">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/10 text-xs text-black/70 dark:text-white/70 hover:text-black dark:text-white disabled:opacity-30"
            >
              Previous
            </button>
            <span className="font-mono text-xs text-black/50 dark:text-white/50">
              {activeStep + 1} / 8
            </span>
            <button
              disabled={activeStep === TIMELINE_STEPS.length - 1}
              onClick={() => setActiveStep((prev) => Math.min(TIMELINE_STEPS.length - 1, prev + 1))}
              className="px-3 py-1.5 rounded-lg bg-black/20 dark:bg-white/20 text-xs text-black dark:text-white font-medium hover:bg-black/30 dark:hover:bg-white/30 disabled:opacity-30 flex items-center gap-1"
            >
              <span>Next</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>

        {/* Right 2 Columns: Complete Step List with animated progress connector */}
        <div className="lg:col-span-2 space-y-3">
          {TIMELINE_STEPS.map((step, index) => {
            const isCurrent = activeStep === index;
            return (
              <motion.div
                key={step.num}
                whileHover={{ x: 4 }}
                onClick={() => setActiveStep(index)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isCurrent
                    ? "bg-black/15 dark:bg-white/15 border-neutral-400 shadow-lg shadow-neutral-400"
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                    isCurrent
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                      : "bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80"
                  }`}
                >
                  {step.num}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base font-medium text-black dark:text-white">
                      {step.title}
                    </h4>
                    {step.tag && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-black/90 dark:text-white/90 border border-black/15 dark:border-white/15">
                        {step.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-black/60 dark:text-white/60 mt-1 line-clamp-2">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
