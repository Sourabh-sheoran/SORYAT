"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Search,
  BarChart3,
  Globe2,
  Compass,
  Layers,
  Award,
} from "lucide-react";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { AgencyProvider, useAgency } from "@/context/AgencyContext";

const SEO_FACTORS = [
  {
    name: "Technical Foundation",
    share: "30%",
    desc: "Core Web Vitals, SSR hydration speed, crawl budget, XML sitemaps, canonical tags, and mobile schema.",
    color: "text-neutral-600 dark:text-neutral-400",
  },
  {
    name: "High-Intent Content",
    share: "25%",
    desc: "Search intent matching, comprehensive topical authority clusters, NLP keyword optimization, and zero fluff.",
    color: "text-neutral-600 dark:text-neutral-400",
  },
  {
    name: "Authority & Backlinks",
    share: "20%",
    desc: "Editorial outreach, digital PR, niche SaaS directory citations, and high domain authority contextual links.",
    color: "text-yellow-400",
  },
  {
    name: "UX & Dwell Time",
    share: "15%",
    desc: "Interactive layout engagement, low bounce rates, high reader retention, and lightning responsive navigation.",
    color: "text-neutral-500",
  },
  {
    name: "Programmatic Schema",
    share: "10%",
    desc: "JSON-LD structured microdata, breadcrumbs, Rich Snippets, FAQ schema, and Google SGE knowledge graph optimization.",
    color: "text-purple-400",
  },
];

const SEO_PACKAGES = [
  {
    name: "Starter Growth Sprint",
    priceInr: 5000,
    period: "/ month",
    turnaround: "Setup in 5 Days",
    desc: "Ideal for early-stage startups and local businesses looking to establish ranking dominance.",
    deliverables: [
      "Full technical SEO site audit & error cleanup",
      "Keyword research matrix (Top 15 High-Intent terms)",
      "On-page optimization & Schema markup",
      "Monthly performance & ranking climb report",
      "Google Search Console & GA4 configuration",
    ],
    recommended: false,
  },
  {
    name: "Scale & Market Leader",
    priceInr: 12000,
    period: "/ month",
    turnaround: "Ongoing Monthly",
    desc: "For businesses wanting to aggressively outrank established competitors in India, Canada & US.",
    deliverables: [
      "Everything in Starter plus 40+ tracked keywords",
      "4 High-authority programmatic SEO blog posts/mo",
      "Competitor gap analysis & content refresh",
      "High-authority backlink outreach campaign",
      "Core Web Vitals & speed continuous monitoring",
      "Bi-weekly ranking sync call with lead strategist",
    ],
    recommended: true,
  },
  {
    name: "Programmatic Enterprise SEO",
    priceInr: 25000,
    period: "/ month",
    turnaround: "Full Scale",
    desc: "For SaaS, marketplaces, and large eCommerce catalogs requiring programmatic page generation.",
    deliverables: [
      "Automated programmatic SEO landing page system (100+ pages)",
      "Custom internal linking graph automation",
      "International geo-targeting (hreflang for India, Canada & US)",
      "High-tier PR link insertions in tech publications",
      "Dedicated Slack channel with 24/7 priority support",
    ],
    recommended: false,
  },
];

function SEOPageContent() {
  const { formatPrice, openBookingWithService } = useAgency();

  // Keyword Ranking Climb simulation state
  const [selectedKeyword, setSelectedKeyword] = useState(0);
  const keywords = [
    { term: "Next.js AI Agency India", startPos: 48, currentPos: 1, traffic: "+840%", volume: "4.8k / mo" },
    { term: "Full Stack Development Canada", startPos: 62, currentPos: 3, traffic: "+620%", volume: "3.2k / mo" },
    { term: "Hire AI Agent Developer", startPos: 39, currentPos: 2, traffic: "+1,120%", volume: "6.5k / mo" },
    { term: "Academic Research Writing Service", startPos: 55, currentPos: 1, traffic: "+490%", volume: "2.1k / mo" },
  ];

  return (
    <div className="relative z-10 w-full pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <InteractiveConsultationModal />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-black/50 dark:text-white/50 mb-8">
        <Link href="/" className="hover:text-black dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/#services" className="hover:text-black dark:text-white transition-colors">Services</Link>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-400">SEO & Growth Marketing</span>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
        {/* Left Copy (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
            <TrendingUp size={13} />
            <span>Organic Search Engine Dominance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight mb-6">
            Rank #1 On Google. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
              Zero Ad Spend Required.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-black/75 dark:text-white/75 leading-relaxed mb-8 max-w-xl">
            We engineer data-backed programmatic SEO campaigns, technical Core Web Vitals optimization, and high-intent keyword strategies that consistently drive buyer traffic.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => openBookingWithService("SEO Marketing")}
              className="rounded-full bg-black dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
            >
              <span>Get Free SEO Audit (₹3k Kickstart)</span>
              <ArrowUpRight size={16} />
            </button>
            <Link
              href="#ranking-visualizer"
              className="rounded-full border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-all"
            >
              View Ranking Climber
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-black/10 dark:border-white/10 pt-6">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-black dark:text-white">From ₹5,000</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Monthly Retainer</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">Top 3</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Google Position Target</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">+480%</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Average Traffic Lift</div>
            </div>
          </div>
        </div>

        {/* Right Animated SEO Metric Visualizer (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={15} className="text-neutral-600 dark:text-neutral-400" />
              <span className="font-mono text-xs text-black/80 dark:text-white/80">Search Impressions Trajectory</span>
            </div>
            <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 bg-neutral-400 px-2 py-0.5 rounded border border-neutral-400">
              +142.8k Impressions
            </span>
          </div>

          {/* SVG Animated Growth Curve */}
          <div className="relative w-full aspect-[4/3] flex items-end justify-center p-2">
            <svg viewBox="0 0 320 180" className="w-full h-full" fill="none">
              {/* Grid Lines */}
              <line x1="0" y1="45" x2="320" y2="45" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="320" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="135" x2="320" y2="135" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

              {/* Area Gradient */}
              <defs>
                <linearGradient id="seoArea" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <path
                d="M 20 160 Q 90 145, 150 110 T 240 50 L 300 20 L 300 160 Z"
                fill="url(#seoArea)"
              />

              {/* Glowing Line */}
              <path
                d="M 20 160 Q 90 145, 150 110 T 240 50 L 300 20"
                stroke="#22d3ee"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-beam"
              />

              {/* Markers */}
              <circle cx="20" cy="160" r="4" fill="#ffffff" />
              <circle cx="150" cy="110" r="4" fill="#ffffff" />
              <circle cx="300" cy="20" r="6" fill="#34d399" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* Position Badges */}
            <div className="absolute top-4 right-4 p-2 rounded-xl bg-black/80 dark:bg-white/80 border border-neutral-400 text-center font-mono">
              <div className="text-[10px] text-black/50 dark:text-white/50">Google Rank</div>
              <div className="text-base font-bold text-neutral-600 dark:text-neutral-400">Position #1</div>
            </div>
            <div className="absolute bottom-4 left-4 p-2 rounded-xl bg-black/80 dark:bg-white/80 border border-black/10 dark:border-white/10 text-center font-mono">
              <div className="text-[10px] text-black/50 dark:text-white/50">Baseline</div>
              <div className="text-xs text-black/70 dark:text-white/70">Position #48</div>
            </div>
          </div>

          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex justify-between text-xs text-black/60 dark:text-white/60 font-mono">
            <span>Month 1 (Audit & Fixes)</span>
            <span>Month 3 (Top Rankings)</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 — KEYWORD RANKING CLIMBER INTERACTIVE VISUALIZER */}
      {/* ========================================================================= */}
      <section id="ranking-visualizer" className="mb-24 p-8 sm:p-12 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
              <Search size={13} />
              <span>Keyword Ranking Climber</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white">
              Watch Search Positions Climb Upward
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 max-w-md">
            Click on any tracked keyword to inspect its real trajectory from obscurity to top 3 Google positions.
          </p>
        </div>

        {/* Keyword Selection Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {keywords.map((kw, i) => (
            <button
              key={kw.term}
              onClick={() => setSelectedKeyword(i)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedKeyword === i
                  ? "bg-white text-black border-black dark:border-white shadow-lg"
                  : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              <div className="text-xs font-semibold line-clamp-1 mb-1">{kw.term}</div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className={selectedKeyword === i ? "text-black/70" : "text-black/50 dark:text-white/50"}>
                  #{kw.startPos} → <strong className={selectedKeyword === i ? "text-neutral-600 dark:text-neutral-400" : "text-neutral-600 dark:text-neutral-400"}>#{kw.currentPos}</strong>
                </span>
                <span className={selectedKeyword === i ? "text-neutral-600 dark:text-neutral-400 font-bold" : "text-neutral-600 dark:text-neutral-400"}>
                  {kw.traffic}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Keyword Details Card */}
        <div className="p-6 rounded-2xl bg-black/50 dark:bg-white/50 border border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs font-mono text-black/50 dark:text-white/50 uppercase">Current Position</div>
            <div className="text-3xl font-mono font-bold text-neutral-600 dark:text-neutral-400 mt-1">
              #{keywords[selectedKeyword].currentPos} on Google
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-black/50 dark:text-white/50 uppercase">Starting Position</div>
            <div className="text-3xl font-mono font-bold text-black/60 dark:text-white/60 mt-1">
              #{keywords[selectedKeyword].startPos}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-black/50 dark:text-white/50 uppercase">Monthly Search Volume</div>
            <div className="text-3xl font-mono font-bold text-neutral-600 dark:text-neutral-400 mt-1">
              {keywords[selectedKeyword].volume}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-black/50 dark:text-white/50 uppercase">Traffic Growth</div>
            <div className="text-3xl font-mono font-bold text-neutral-600 dark:text-neutral-400 mt-1">
              {keywords[selectedKeyword].traffic}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — 5 CORE SEO FACTORS (Radial / Architecture Layout) */}
      {/* ========================================================================= */}
      <section className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Compass size={13} />
            <span>Algorithm Formula</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            The 5 Pillars of Our Ranking Architecture
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            We don&apos;t use spammy tactics or black-hat shortcuts. Our 5-pillar approach aligns strictly with Google Search Essentials and SGE AI standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEO_FACTORS.map((factor) => (
            <div
              key={factor.name}
              className="p-6 sm:p-7 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20 backdrop-blur-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-sm font-bold ${factor.color}`}>
                    {factor.share} Weight
                  </span>
                  <Award size={18} className="text-black/40 dark:text-white/40" />
                </div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-2">{factor.name}</h3>
                <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 leading-relaxed">{factor.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — SEO PRICING TIERS */}
      {/* ========================================================================= */}
      <section className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            Transparent SEO Monthly Retainers
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            No long-term lock-in contracts. Cancel or pause anytime. Starts from just ₹5,000/month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SEO_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between relative ${
                pkg.recommended
                  ? "bg-gradient-to-b from-white/15 to-white/5 border-neutral-400 shadow-2xl shadow-neutral-400"
                  : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"
              }`}
            >
              {pkg.recommended && (
                <div className="absolute top-0 right-0 bg-neutral-400 text-black font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl">
                  Recommended
                </div>
              )}

              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                  {pkg.turnaround}
                </div>
                <h3 className="text-2xl font-medium text-black dark:text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-mono font-bold text-black dark:text-white mb-3">
                  {formatPrice(pkg.priceInr)}
                  <span className="text-sm font-normal text-black/60 dark:text-white/60 ml-1">{pkg.period}</span>
                </div>
                <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed mb-6">{pkg.desc}</p>

                <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2">
                  {pkg.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-black/80 dark:text-white/80">
                      <CheckCircle2 size={14} className="text-neutral-600 dark:text-neutral-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => openBookingWithService(`SEO: ${pkg.name}`)}
                  className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    pkg.recommended
                      ? "bg-white text-black hover:bg-black/90 dark:hover:bg-white/90 shadow-lg"
                      : "bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 border border-black/20 dark:border-white/20"
                  }`}
                >
                  <span>Start SEO Campaign</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/10 via-neutral-400 to-white/10 border border-black/20 dark:border-white/20 backdrop-blur-2xl text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-3">
          Get Your Free 15-Point SEO Audit Today
        </h3>
        <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mb-6">
          We inspect your competitor gaps, indexing errors, and high-impact ranking opportunities.
        </p>
        <button
          onClick={() => openBookingWithService("SEO Audit Request")}
          className="rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
        >
          <span>Request Free SEO Audit (₹3k Kickstart)</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function SEOPage() {
  return (
    <AgencyProvider>
      <SEOPageContent />
    </AgencyProvider>
  );
}
