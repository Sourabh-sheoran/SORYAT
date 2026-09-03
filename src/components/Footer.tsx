"use client";

import React from "react";
import Link from "next/link";
import { Hexagon, Mail, Phone, MessageSquare, ArrowUpRight, Globe, ShieldCheck, Clock, MapPin } from "lucide-react";
import { useAgency } from "@/context/AgencyContext";
import SoryatLogo from "@/components/SoryatLogo";

export default function Footer() {
  const { setIsConsultationOpen } = useAgency();

  return (
    <footer className="relative z-20 bg-white/20 dark:bg-black/60 backdrop-blur-3xl border-t border-white/50 dark:border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.05)] pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-neutral-400 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Top Feature Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/10 dark:shadow-black">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="text-neutral-600 dark:text-neutral-400" size={26} />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-600 dark:text-neutral-400">
                  Risk-Free Partnership
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70">
                  Demo-First Guarantee
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-black dark:text-white mt-1">
                Experience your working software before paying in full.
              </h3>
              <p className="text-sm text-black/70 dark:text-white/70 mt-1 max-w-2xl">
                Start your demo-first build. Free revisions until you are 100% satisfied. 1–2 week turnaround.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="rounded-full bg-black dark:bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-black/10 dark:shadow-white/10"
            >
              <span>Kickstart Project</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-black/10 dark:border-white/10">
          {/* Brand & Dual Hubs */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="SORYAT Home">
              <SoryatLogo className="h-8 sm:h-9 w-auto" />
            </Link>
            <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed max-w-sm">
              Full-stack web development, AI agents, academic research, and SEO agency based in India, delivering rapid solutions for businesses in India, Canada, and global markets.
            </p>

            {/* Live Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 text-xs font-mono w-fit mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <span>Dev Team Active • 2h Response SLA</span>
            </div>

          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-black/90 dark:text-white/90">
              Core Capabilities
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-black/70 dark:text-white/70">
              <li>
                <Link href="/services/web-development" className="hover:text-black dark:text-white transition-colors">
                  Web App Development
                </Link>
              </li>
              <li>
                <Link href="/services/ai-agents" className="hover:text-black dark:text-white transition-colors">
                  AI Agents & Workflows
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-black dark:text-white transition-colors">
                  SEO & Organic Growth
                </Link>
              </li>
              <li>
                <Link href="/services/research-papers" className="hover:text-black dark:text-white transition-colors">
                  Research Papers & Academic
                </Link>
              </li>
              <li>
                <Link href="/services/content-analytics" className="hover:text-black dark:text-white transition-colors">
                  Content Writing & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-black/90 dark:text-white/90">
              Company
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-black/70 dark:text-white/70">
              <li>
                <Link href="/portfolio" className="hover:text-black dark:text-white transition-colors">
                  Case Studies & Proof
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-black dark:text-white transition-colors">
                  Pricing & Cost Estimator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black dark:text-white transition-colors">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-black dark:text-white transition-colors">
                  Engineering Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black dark:text-white transition-colors">
                  Direct Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Connect */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-black/90 dark:text-white/90">
              Direct Inquiries
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-black/80 dark:text-white/80">
              <a
                href="mailto:sourabhsheoran695@gmail.com"
                className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-2.5"
              >
                <Mail size={14} className="text-neutral-600 dark:text-neutral-400 shrink-0" />
                <span className="truncate">sourabhsheoran695@gmail.com</span>
              </a>
              <a
                href="https://wa.me/918708248561?text=Hi%20Aura%20Digital%2C%20I%20want%20to%20start%20a%20demo-first%20project"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-2.5 text-black/80 dark:text-white/80"
              >
                <MessageSquare size={14} className="shrink-0" />
                <span>WhatsApp: +91 8708248561</span>
              </a>
              <div className="flex items-center gap-2 text-[11px] text-black/50 dark:text-white/50 pt-1">
                <Clock size={12} className="text-black/40 dark:text-white/40" />
                <span>24/7 Dedicated Client Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/50 dark:text-white/50">
          <div>
            © {new Date().getFullYear()} SORYAT DIGITAL EXCELLENCE. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>1–2 Week Turnaround</span>
            <span>•</span>
            <span>Free Revisions</span>
            <span>•</span>
            <span>Low Advance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
