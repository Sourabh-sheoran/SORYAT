"use client";

import React from "react";
import Link from "next/link";
import {
  CreditCard,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  Clock,
  RotateCcw,
} from "lucide-react";
import PricingCalculator from "@/components/PricingCalculator";
import FAQAccordion from "@/components/FAQAccordion";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { AgencyProvider, useAgency } from "@/context/AgencyContext";

const TIERS = [
  {
    name: "Basic Website & Starter",
    inrPrice: 15000,
    period: "one-time",
    tagline: "Essential fast Next.js storefront or portfolio.",
    turnaround: "7 Days Delivery",
    desc: "For startups and creators needing a fast, high-converting digital presence with 95+ Lighthouse score.",
    features: [
      "Up to 5 custom animated pages / sections",
      "Next.js 15 App Router + Tailwind CSS",
      "Mobile responsive & touch optimized",
      "Interactive contact form + WhatsApp direct link",
      "1 Month Free Warranty & Hosting Setup",
    ],
    recommended: false,
  },
  {
    name: "Professional Full-Stack & AI",
    inrPrice: 35000,
    period: "one-time",
    tagline: "Dynamic SaaS app, database & custom AI agents.",
    turnaround: "10–14 Days Delivery",
    desc: "Our most popular tier. Complete web application with authentication, database, payment gateways, or custom AI agent loops.",
    features: [
      "Everything in Basic plus custom database (Supabase / Postgres)",
      "User authentication & dashboard state management",
      "Embedded AI Agent / LLM workflow integration",
      "Stripe / Razorpay payment gateway checkout",
      "Core Web Vitals 98+ guaranteed score",
      "1 Month Free Dedicated Developer Maintenance",
    ],
    recommended: true,
  },
  {
    name: "Growth Retainer (SEO + Copy)",
    inrPrice: 12000,
    period: "per month",
    tagline: "Continuous organic search traffic & weekly content.",
    turnaround: "Monthly Sprint",
    desc: "For businesses wanting ongoing organic customer acquisition, technical SEO audits, and high-retention technical articles.",
    features: [
      "40+ Tracked high-intent search keywords",
      "4 In-depth technical articles (1,500 words each)",
      "Technical Core Web Vitals audit & schema markup",
      "High-authority backlink outreach & PR citations",
      "Bi-weekly ranking reports & strategy calls",
      "Cancel or pause anytime with zero penalty",
    ],
    recommended: false,
  },
  {
    name: "Academic Research & Papers",
    inrPrice: 20000,
    period: "per manuscript",
    tagline: "IEEE, Springer & Scopus grade scholarly writing.",
    turnaround: "1–2 Weeks Delivery",
    desc: "Comprehensive academic paper drafting, literature review synthesis, experimental data modeling, and LaTeX formatting.",
    features: [
      "Camera-ready LaTeX / Overleaf manuscript formatting",
      "Plagiarism & AI score guaranteed below 5%",
      "Complete BibTeX citation matrix & statistical plots",
      "Unlimited advisor and committee revisions",
      "Zero payment balance until initial draft approval",
    ],
    recommended: false,
  },
];

function PricingPageContent() {
  const { formatPrice, currency, setCurrency, openBookingWithService } = useAgency();

  return (
    <div className="relative z-10 w-full pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <InteractiveConsultationModal />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-black/50 dark:text-white/50 mb-8">
        <Link href="/" className="hover:text-black dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-400">Pricing & Packages</span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/15 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] uppercase tracking-wider mb-4">
          <CreditCard size={13} />
          <span>Demo-First Transparent Pricing</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-neutral-950 dark:text-white leading-tight tracking-tight mb-4">
          Fair, Transparent Rates. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-500 dark:from-white dark:via-neutral-300 dark:to-neutral-400">
            Only ₹3,000 Advance to Start.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl mx-auto">
          Experience your working prototype before full payment. Free revisions if you want changes. 1–2 week turnaround across India, Canada & global markets.
        </p>

        {/* Currency Switcher */}
        <div className="inline-flex items-center gap-2 mt-8 bg-neutral-100 dark:bg-white/10 p-1.5 rounded-2xl border border-neutral-200 dark:border-white/15 backdrop-blur-md">
          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 px-3">Display In:</span>
          {(["INR", "USD", "CAD"] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-4 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                currency === curr
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold shadow-md"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {curr === "INR" ? "₹ INR" : curr === "USD" ? "$ USD" : "CA$ CAD"}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative shadow-lg ${
              tier.recommended
                ? "bg-white/95 dark:bg-white/10 border-neutral-400 dark:border-white/40 shadow-2xl lg:-translate-y-2"
                : "bg-white/90 dark:bg-[#0f1117]/90 border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/20"
            }`}
          >
            {tier.recommended && (
              <div className="absolute top-0 right-0 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                Best Value
              </div>
            )}

            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                {tier.turnaround}
              </div>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-2 leading-snug">
                {tier.name}
              </h3>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-950 dark:text-white mb-1">
                {formatPrice(tier.inrPrice)}
              </div>
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-3">
                {tier.period}
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                {tier.desc}
              </p>

              {/* Deliverables Checklist */}
              <div className="border-t border-neutral-200 dark:border-white/10 pt-4 space-y-2 mb-6">
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-800 dark:text-neutral-200">
                    <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
              <button
                onClick={() => openBookingWithService(tier.name)}
                className={`w-full py-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  tier.recommended
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-black dark:hover:bg-neutral-200 shadow-md"
                    : "bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/20 border border-neutral-300 dark:border-white/20"
                }`}
              >
                <span>Kickstart with ₹3,000</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 — INTERACTIVE SCOPE CALCULATOR */}
      {/* ========================================================================= */}
      <section className="mb-24">
        <PricingCalculator />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — DEMO-FIRST GUARANTEE CALLOUT */}
      {/* ========================================================================= */}
      <section className="mb-20 p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#0f1117]/90 border border-neutral-200 dark:border-white/15 backdrop-blur-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/80 dark:border-white/10 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/20">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-base font-bold text-neutral-950 dark:text-white mb-1.5">
              ₹3,000 Starting Advance
            </h4>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We never ask for 50% upfront. ₹3,000 kicks off development, credited toward your total or refunded if unsatisfied.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/80 dark:border-white/10 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 border border-blue-500/20">
              <RotateCcw size={22} />
            </div>
            <h4 className="text-base font-bold text-neutral-950 dark:text-white mb-1.5">
              Free Unlimited Revisions
            </h4>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Inspect your live demo on your phone & desktop. We refine and polish until you are 100% satisfied with the build.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/80 dark:border-white/10 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 border border-purple-500/20">
              <Clock size={22} />
            </div>
            <h4 className="text-base font-bold text-neutral-950 dark:text-white mb-1.5">
              1-Month Free Maintenance
            </h4>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Every package includes 30 days of post-launch warranty, bug fixes, server monitoring, and minor tweaks.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            Pricing & Payment FAQs
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            Common questions regarding invoices, cross-border payments, and milestones.
          </p>
        </div>

        <FAQAccordion />
      </section>
    </div>
  );
}

export default function PricingPage() {
  return (
    <AgencyProvider>
      <PricingPageContent />
    </AgencyProvider>
  );
}
