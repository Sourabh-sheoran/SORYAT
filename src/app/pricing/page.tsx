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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
          <CreditCard size={13} />
          <span>Demo-First Transparent Pricing</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight mb-4">
          Fair, Transparent Rates. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
            Only ₹3,000 Advance to Start.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-black/75 dark:text-white/75 leading-relaxed max-w-xl mx-auto">
          Experience your working prototype before full payment. Free revisions if you want changes. 1–2 week turnaround across India, Canada & global markets.
        </p>

        {/* Currency Switcher */}
        <div className="inline-flex items-center gap-2 mt-8 bg-black/10 dark:bg-white/10 p-1.5 rounded-2xl border border-black/15 dark:border-white/15 backdrop-blur-md">
          <span className="text-xs font-mono text-black/60 dark:text-white/60 px-3">Display In:</span>
          {(["INR", "USD", "CAD"] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-4 py-1.5 text-xs font-mono rounded-xl transition-all ${
                currency === curr
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-black/70 dark:text-white/70 hover:text-black dark:text-white"
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
            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative ${
              tier.recommended
                ? "bg-gradient-to-b from-white/15 to-white/5 border-neutral-400 shadow-2xl shadow-neutral-400 lg:-translate-y-2"
                : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20"
            }`}
          >
            {tier.recommended && (
              <div className="absolute top-0 right-0 bg-neutral-400 text-black font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl">
                Best Value
              </div>
            )}

            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                {tier.turnaround}
              </div>
              <h3 className="text-xl font-medium text-black dark:text-white mb-2 leading-snug">
                {tier.name}
              </h3>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-black dark:text-white mb-1">
                {formatPrice(tier.inrPrice)}
              </div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 mb-3">
                {tier.period}
              </div>
              <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed mb-6">
                {tier.desc}
              </p>

              {/* Deliverables Checklist */}
              <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2 mb-6">
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-black/80 dark:text-white/80">
                    <CheckCircle2 size={13} className="text-neutral-600 dark:text-neutral-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <button
                onClick={() => openBookingWithService(tier.name)}
                className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  tier.recommended
                    ? "bg-white text-black hover:bg-black/90 dark:hover:bg-white/90 shadow-lg"
                    : "bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 border border-black/20 dark:border-white/20"
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
      <section className="mb-24 p-8 sm:p-12 rounded-3xl bg-neutral-400 border border-neutral-400 backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <div className="w-10 h-10 rounded-xl bg-neutral-400 text-neutral-600 dark:text-neutral-400 flex items-center justify-center mb-3">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-base font-medium text-black dark:text-white mb-1">
              ₹3,000 Starting Advance
            </h4>
            <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed">
              We never ask for 50% upfront. ₹3,000 kicks off development, credited toward your total or refunded if unsatisfied.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <div className="w-10 h-10 rounded-xl bg-neutral-400 text-neutral-600 dark:text-neutral-400 flex items-center justify-center mb-3">
              <RotateCcw size={20} />
            </div>
            <h4 className="text-base font-medium text-black dark:text-white mb-1">
              Free Unlimited Revisions
            </h4>
            <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed">
              Inspect your live demo on your phone & desktop. We refine and polish until you are 100% satisfied with the build.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-400 flex items-center justify-center mb-3">
              <Clock size={20} />
            </div>
            <h4 className="text-base font-medium text-black dark:text-white mb-1">
              1-Month Free Maintenance
            </h4>
            <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed">
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
