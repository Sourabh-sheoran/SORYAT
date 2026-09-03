"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Code2,
  Bot,
  TrendingUp,
  GraduationCap,
  FileText,
  BarChart3,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAgency } from "@/context/AgencyContext";

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: any;
  startingInr: number;
  priceNote: string;
  timeline: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  slug: string;
}

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development",
    category: "ENGINEERING",
    icon: Code2,
    startingInr: 15000,
    priceNote: "from ₹15,000 ($180 / CAD $245)",
    timeline: "1–2 Weeks",
    tagline: "Ultra-fast Next.js apps with animated interactions & high conversion.",
    description:
      "Engineered with Next.js App Router, TypeScript, Tailwind CSS, and Motion. Server-rendered, 95+ Lighthouse score, built for scale.",
    deliverables: [
      "Custom responsive UI with micro-interactions",
      "Next.js App Router + Tailwind CSS architecture",
      "Full CMS or database integration",
      "1 month free post-launch maintenance",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Node.js"],
    slug: "/services/web-development",
  },
  {
    id: "ai-agents",
    title: "AI Agent Development",
    category: "GEN AI & AUTOMATION",
    icon: Bot,
    startingInr: 25000,
    priceNote: "Custom Quote (from ₹25,000 / $300)",
    timeline: "1–2 Weeks",
    tagline: "Autonomous multi-agent workflows, customer bots & tool integration.",
    description:
      "Build production LLM pipelines, autonomous browser/API agents, intelligent Slack/WhatsApp bots, and document retrieval (RAG) engines.",
    deliverables: [
      "Custom LangGraph/Agent architecture",
      "Multi-modal LLM orchestration (Gemini/OpenAI)",
      "Database & CRM API webhooks",
      "Working staging demo before completion",
    ],
    techStack: ["LangChain", "OpenAI", "Gemini 2.5", "FastAPI", "VectorDB", "Node.js"],
    slug: "/services/ai-agents",
  },
  {
    id: "seo-marketing",
    title: "SEO & Growth Marketing",
    category: "ORGANIC RANKING",
    icon: TrendingUp,
    startingInr: 5000,
    priceNote: "from ₹5,000 / month ($60 / CAD $82)",
    timeline: "Monthly Retainer",
    tagline: "Dominate search rankings in India, Canada & global markets.",
    description:
      "Data-driven technical SEO, Core Web Vitals optimization, programmatic landing pages, keyword clustering, and high-authority link acquisition.",
    deliverables: [
      "Comprehensive technical site audit",
      "High-intent keyword matrix & roadmaps",
      "On-page schema & structured data markup",
      "Monthly ranking & traffic growth reports",
    ],
    techStack: ["Ahrefs", "Semrush", "Google Search Console", "Screaming Frog", "Schema.org"],
    slug: "/services/seo",
  },
  {
    id: "research-papers",
    title: "Research Papers & Academic",
    category: "RESEARCH & SCHOLARLY",
    icon: GraduationCap,
    startingInr: 10000,
    priceNote: "₹10,000 – ₹30,000 ($120 – $360)",
    timeline: "1–2 Weeks",
    tagline: "Rigorous academic writing conforming to IEEE, Springer & Scopus.",
    description:
      "Peer-reviewed grade literature reviews, experimental methodology design, statistical data modeling, and camera-ready formatting.",
    deliverables: [
      "IEEE / Springer / Elsevier style formatting",
      "Plagiarism & AI check certification (<5%)",
      "Full citation graph (BibTeX / Mendeley)",
      "Unlimited revisions until advisor approval",
    ],
    techStack: ["LaTeX", "Overleaf", "Python / R", "Zotero", "OriginLab", "MATLAB"],
    slug: "/services/research-papers",
  },
  {
    id: "content-writing",
    title: "Content Writing & Copy",
    category: "COPYWRITING",
    icon: FileText,
    startingInr: 2000,
    priceNote: "₹2,000 per 1,000 words ($25 / CAD $33)",
    timeline: "3–5 Days",
    tagline: "High-retention technical documentation, whitepapers & sales copy.",
    description:
      "Engaging, deeply researched copy tailored for developer audiences, SaaS founders, and enterprise clients. Written for conversions.",
    deliverables: [
      "High-converting landing page & sales copy",
      "In-depth technical articles & blog posts",
      "Investor pitch decks & whitepapers",
      "100% human-crafted with AI-enhanced editing",
    ],
    techStack: ["Notion", "Grammarly Pro", "Clearscope", "Hemingway", "Figma Copy"],
    slug: "/services/content-analytics",
  },
  {
    id: "analytics-funnels",
    title: "Conversion & Data Analytics",
    category: "DATA & INSIGHTS",
    icon: BarChart3,
    startingInr: 8000,
    priceNote: "from ₹8,000 ($95 / CAD $130)",
    timeline: "1 Week",
    tagline: "Turn raw telemetry into high-converting customer funnels.",
    description:
      "End-to-end event taxonomy design, GA4/Mixpanel implementation, custom Executive dashboards, and user drop-off attribution.",
    deliverables: [
      "GA4 / PostHog custom event taxonomy",
      "Interactive funnel & retention dashboards",
      "Heatmap & session replay integration",
      "Actionable conversion rate optimization (CRO)",
    ],
    techStack: ["PostHog", "Mixpanel", "GA4", "Looker Studio", "BigQuery", "Segment"],
    slug: "/services/content-analytics",
  },
];

export default function ServiceCard({ service, index }: { service: ServiceItem, index: number }) {
  const { formatPrice, openBookingWithService } = useAgency();
  const Icon = service.icon;
  
  const isWhiteKey = index % 2 === 0;

return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`relative w-full h-full min-h-[600px] rounded-none sm:rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-300 ${
        isWhiteKey 
          ? "bg-black/20 dark:bg-white backdrop-blur-3xl dark:backdrop-blur-none border-white/40 dark:border-white/20 text-white dark:text-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:border-white/60 dark:hover:border-white" 
          : "bg-white/20 dark:bg-black backdrop-blur-3xl dark:backdrop-blur-none border-white/50 dark:border-white/20 text-black dark:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:border-white/80 dark:hover:border-white"
      }`}
    >
      <div className="p-6 sm:p-8 flex flex-col h-full z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-md ${
            isWhiteKey ? "bg-white/10 dark:bg-black/10 text-white/60 dark:text-black/60" : "bg-black/10 dark:bg-white/10 text-black/60 dark:text-white/60"
          }`}>
            {service.category}
          </span>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isWhiteKey ? "bg-white dark:bg-black text-black dark:text-white" : "bg-black dark:bg-white text-white dark:text-black"
          }`}>
            <Icon size={24} />
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl font-bold leading-tight mb-2" style={{ fontFamily: "var(--font-instrument), serif" }}>
          {service.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${
          isWhiteKey ? "text-white/70 dark:text-black/70" : "text-black/70 dark:text-white/70"
        }`}>
          {service.tagline}
        </p>

        {/* Deliverables List */}
        <div className="flex-grow">
          <div className={`text-[10px] font-mono uppercase tracking-wider font-semibold mb-3 ${
            isWhiteKey ? "text-white/50 dark:text-black/50" : "text-black/50 dark:text-white/50"
          }`}>
            Key Deliverables
          </div>
          <ul className="space-y-2 text-xs">
            {service.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-bold shrink-0 mt-0.5">✓</span>
                <span className="leading-snug opacity-90">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-6 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 rounded-md text-[10px] font-mono font-medium border ${
                  isWhiteKey ? "bg-white/5 dark:bg-black/5 border-white/10 dark:border-black/10 text-white/80 dark:text-black/80" : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/80 dark:text-white/80"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className={`pt-4 border-t flex flex-col gap-3 ${
          isWhiteKey ? "border-white/10 dark:border-black/10" : "border-black/10 dark:border-white/10"
        }`}>
          <div className="flex items-end justify-between">
            <div>
              <div className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                isWhiteKey ? "text-white/50 dark:text-black/50" : "text-black/50 dark:text-white/50"
              }`}>
                Starting Investment
              </div>
              <div className="text-lg font-bold font-mono">
                {formatPrice(service.startingInr)}
                <span className="text-xs font-normal opacity-60 ml-1">
                  {service.id === "seo-marketing" ? "/mo" : service.id === "content-writing" ? "/1k words" : ""}
                </span>
              </div>
            </div>
            
            <div className={`flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold ${
              isWhiteKey ? "text-white/60 dark:text-black/60" : "text-black/60 dark:text-white/60"
            }`}>
              <ShieldCheck size={14} className="mb-0.5" />
              Demo First
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Link
              href={service.slug}
              className={`flex-1 py-3 rounded-xl border text-center text-xs font-bold transition-colors ${
                isWhiteKey ? "bg-transparent border-white/20 dark:border-black/20 text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10" : "bg-transparent border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              Deep Dive
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); openBookingWithService(service.title); }}
              className={`flex-1 py-3 rounded-xl text-center text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isWhiteKey ? "bg-white dark:bg-black text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90" : "bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
              }`}
            >
              <span>Kickstart Demo</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
