"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  BarChart3,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Filter,
  Calendar,
  Layers,
  MousePointerClick,
  TrendingUp,
  Clock,
} from "lucide-react";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { AgencyProvider, useAgency } from "@/context/AgencyContext";

const CONTENT_PIPELINE = [
  { step: "01", name: "Audience & Keyword Intent", desc: "Mapping buyer personas, ICP search queries, and competitor content gaps." },
  { step: "02", name: "Deep Domain Research", desc: "Synthesizing industry papers, benchmarks, data charts, and proprietary case studies." },
  { step: "03", name: "Engaging Narrative Writing", desc: "Structuring crisp, actionable, high-retention copy with developer & founder voice." },
  { step: "04", name: "Technical Editing & SEO Polish", desc: "Ensuring zero filler words, 100% human authenticity, schema, and meta tags." },
  { step: "05", name: "Distribution & Publishing", desc: "Formatting in Next.js MDX, Webflow, Notion, Substack, or Ghost CMS." },
  { step: "06", name: "Telemetry & Attribution", desc: "Tracking scroll depth, reader retention, CTA click-through rates, and pipeline revenue." },
];

const CALENDAR_ITEMS = [
  { day: "Mon", title: "Technical Deep-Dive: Next.js 15 Server Actions Architecture", views: "14.2k", dwell: "4m 12s", ctr: "5.8%" },
  { day: "Wed", title: "Founder Guide: Building Autonomous AI Agents with LangGraph", views: "28.6k", dwell: "6m 45s", ctr: "8.2%" },
  { day: "Fri", title: "Case Study: Scaling SaaS from $0 to $50k MRR Organic SEO", views: "19.4k", dwell: "5m 20s", ctr: "7.1%" },
  { day: "Sun", title: "Newsletter: Top 10 Cross-Border Tech Stacks in 2026", views: "11.8k", dwell: "3m 50s", ctr: "6.4%" },
];

function ContentAnalyticsPageContent() {
  const { formatPrice, openBookingWithService } = useAgency();

  // Funnel numbers
  const funnelStages = [
    { name: "Top-of-Funnel Visitors", count: "100,000", pct: "100%", width: "w-full", color: "bg-black/20 dark:bg-white/20" },
    { name: "Engaged Readers (>2 mins dwell)", count: "48,000", pct: "48%", width: "w-4/5", color: "bg-neutral-400" },
    { name: "High-Intent Conversions (Demo clicks)", count: "12,400", pct: "12.4%", width: "w-3/5", color: "bg-neutral-400" },
    { name: "Paying Customers & Retainers", count: "3,800", pct: "3.8%", width: "w-2/5", color: "bg-neutral-400" },
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
        <span className="text-neutral-600 dark:text-neutral-400">Content Writing & Analytics</span>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
        {/* Left Copy (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
            <FileText size={13} />
            <span>High-Retention Copy & Analytics</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight mb-6">
            Words That Convert. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
              Data That Proves It.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-black/75 dark:text-white/75 leading-relaxed mb-8 max-w-xl">
            We write compelling technical articles, developer landing page copy, whitepapers, and build end-to-end telemetry funnels that turn curious readers into high-value paying clients.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => openBookingWithService("Content Writing & Analytics")}
              className="rounded-full bg-black dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
            >
              <span>Sample 1,000 Words (₹2,000)</span>
              <ArrowUpRight size={16} />
            </button>
            <Link
              href="#funnel-visualizer"
              className="rounded-full border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-all"
            >
              View Conversion Funnel
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-black/10 dark:border-white/10 pt-6">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-black dark:text-white">₹2,000</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Per 1,000 Words</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">3–5 Days</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Average Turnaround</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">100%</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Human-Crafted</div>
            </div>
          </div>
        </div>

        {/* Right Funnel Preview Graphic (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-neutral-600 dark:text-neutral-400" />
              <span className="font-mono text-xs text-black/80 dark:text-white/80">Reader Conversion Funnel</span>
            </div>
            <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 bg-neutral-400 px-2 py-0.5 rounded border border-neutral-400">
              3.8% Overall Conversion
            </span>
          </div>

          <div className="space-y-3 my-4">
            {funnelStages.map((stage) => (
              <div key={stage.name} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-black/80 dark:text-white/80">{stage.name}</span>
                  <span className="text-neutral-600 dark:text-neutral-400 font-bold">{stage.count} ({stage.pct})</span>
                </div>
                <div className="h-3.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden border border-black/10 dark:border-white/10">
                  <div className={`h-full ${stage.width} ${stage.color} rounded-full transition-all duration-700`} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-black/10 dark:border-white/10 text-center font-mono text-[11px] text-black/60 dark:text-white/60">
            PostHog / GA4 multi-touch attribution instrumentation
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 — 6-STAGE CONTENT & ANALYTICS PIPELINE */}
      {/* ========================================================================= */}
      <section className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <span>Systematic Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            Our 6-Stage High-Velocity Content Pipeline
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            From initial ICP search intent to telemetry-backed post-launch performance audits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTENT_PIPELINE.map((pipe) => (
            <div
              key={pipe.step}
              className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neutral-400 transition-all backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-2 block">
                  STAGE {pipe.step}
                </span>
                <h4 className="text-base font-medium text-black dark:text-white mb-2">{pipe.name}</h4>
                <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed">{pipe.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — LIVE CONTENT CALENDAR & PERFORMANCE GRID */}
      {/* ========================================================================= */}
      <section id="funnel-visualizer" className="mb-24 p-8 sm:p-12 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
              <Calendar size={13} />
              <span>Editorial Performance Grid</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white">
              Consistent Publishing Cadence
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 max-w-md">
            Hover over any published article below to inspect verified dwell time, reading engagement, and conversion CTR.
          </p>
        </div>

        <div className="space-y-3">
          {CALENDAR_ITEMS.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/25 dark:border-white/25 hover:bg-black/10 dark:hover:bg-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-400 border border-neutral-400 text-neutral-600 dark:text-neutral-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {item.day}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-black dark:text-white group-hover:text-neutral-600 dark:text-neutral-400 transition-colors">
                    {item.title}
                  </h4>
                  <div className="text-[11px] font-mono text-black/50 dark:text-white/50 mt-0.5">
                    Written for SaaS Founders & Tech Leaders
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-center font-mono text-xs border-t sm:border-t-0 pt-2 sm:pt-0 border-black/10 dark:border-white/10">
                <div>
                  <div className="text-black dark:text-white font-bold">{item.views}</div>
                  <div className="text-[10px] text-black/40 dark:text-white/40 uppercase">Views</div>
                </div>
                <div>
                  <div className="text-neutral-600 dark:text-neutral-400 font-bold">{item.dwell}</div>
                  <div className="text-[10px] text-black/40 dark:text-white/40 uppercase">Avg Dwell</div>
                </div>
                <div>
                  <div className="text-neutral-600 dark:text-neutral-400 font-bold">{item.ctr}</div>
                  <div className="text-[10px] text-black/40 dark:text-white/40 uppercase">Demo CTR</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/10 via-neutral-400 to-white/10 border border-black/20 dark:border-white/20 backdrop-blur-2xl text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-3">
          Order Your First 1,000-Word Content Batch
        </h3>
        <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mb-6">
          High-retention technical copy at just ₹2,000 / 1,000 words ($25 / CAD $33). Delivered within 3–5 days with unlimited free revisions.
        </p>
        <button
          onClick={() => openBookingWithService("Content Writing Batch")}
          className="rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
        >
          <span>Order Content Batch (₹2,000)</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function ContentAnalyticsPage() {
  return (
    <AgencyProvider>
      <ContentAnalyticsPageContent />
    </AgencyProvider>
  );
}
