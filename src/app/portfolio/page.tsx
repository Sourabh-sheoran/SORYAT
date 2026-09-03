"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Bot,
  TrendingUp,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Filter,
  X,
} from "lucide-react";
import DeviceMockup from "@/components/DeviceMockup";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { AgencyProvider, useAgency } from "@/context/AgencyContext";

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  turnaround: string;
  challenge: string;
  solution: string;
  result: string;
}

const PROJECTS: Project[] = [
  {
    id: "apex-fintech",
    title: "Apex FinTech Portfolio Terminal",
    category: "Web Development",
    client: "Apex Capital Tech",
    location: "Toronto, Canada",
    tagline: "Sub-second Next.js 15 investment analytics platform.",
    description: "Engineered an institutional-grade financial dashboard with real-time portfolio rebalancing, edge caching, and interactive multi-currency charts.",
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Latency", value: "180ms" },
      { label: "Turnaround", value: "9 Days" },
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Motion", "Supabase", "Recharts"],
    turnaround: "9 Business Days",
    challenge: "Client struggled with legacy React bundle bloat causing 3.4-second FCP and low investor conversion on demo calls.",
    solution: "Rebuilt from scratch on Next.js App Router with server-side rendering, streaming suspense boundaries, and CSS perspective interactions.",
    result: "Achieved 99/100 performance score, 0.4s initial paint, and +65% investor trial conversions.",
  },
  {
    id: "syncpulse-agent",
    title: "SyncPulse Multi-Agent Dispatcher",
    category: "AI Agents",
    client: "SyncPulse Technologies",
    location: "Bengaluru, India",
    tagline: "Autonomous customer triage & tool-calling Slack bot.",
    description: "Built an autonomous multi-agent swarm using LangGraph and Gemini 2.5 to triage customer bug reports, execute database lookups, and auto-reply.",
    metrics: [
      { label: "Resolution Rate", value: "84%" },
      { label: "Avg Response", value: "12s" },
      { label: "Turnaround", value: "11 Days" },
    ],
    techStack: ["LangChain", "Gemini 2.5", "FastAPI", "VectorDB", "Slack API", "PostgreSQL"],
    turnaround: "11 Business Days",
    challenge: "Support team was overwhelmed by 400+ daily tier-1 support tickets and manual database verification.",
    solution: "Designed deterministic agent loops with self-correction guardrails, secure SQL read-only tool calling, and human-in-the-loop escalation.",
    result: "Automated 84% of support inquiries with zero hallucinations and reduced team response time from 4 hours to 12 seconds.",
  },
  {
    id: "zest-seo",
    title: "Zest D2C Organic Growth Machine",
    category: "SEO Marketing",
    client: "Zest Brands India",
    location: "Delhi NCR, India",
    tagline: "From 4.2k to 38k+ monthly organic search visits.",
    description: "Programmatic SEO architecture and Core Web Vitals optimization targeting high-intent eCommerce keywords in India & US.",
    metrics: [
      { label: "Organic Lift", value: "+840%" },
      { label: "Google Top 3", value: "28 Keywords" },
      { label: "Monthly Retainer", value: "₹5,000" },
    ],
    techStack: ["Ahrefs", "Google Search Console", "Schema.org", "Next.js MDX", "Semrush"],
    turnaround: "Ongoing Sprint",
    challenge: "High CAC on Meta ads was eroding margins. Zero organic traffic presence for core commercial keywords.",
    solution: "Implemented automated JSON-LD product schemas, fixed hydration layout shifts, and authored 20 high-authority comparison clusters.",
    result: "Reached #1 ranking for 14 high-volume buyer keywords and generated ₹1.2M in organic sales within 4 months.",
  },
  {
    id: "genomic-research",
    title: "Deep Genomic Variant Classification",
    category: "Research Papers",
    client: "BioInformatics Labs",
    location: "Vancouver, Canada",
    tagline: "Peer-reviewed IEEE Transactions accepted manuscript.",
    description: "Rigorous 24-page academic research paper covering deep learning algorithms for non-coding genomic variant pathogenicity prediction.",
    metrics: [
      { label: "Plagiarism", value: "< 2.8%" },
      { label: "Citations", value: "48 Papers" },
      { label: "Turnaround", value: "12 Days" },
    ],
    techStack: ["LaTeX", "Overleaf", "PyTorch", "OriginLab", "BibTeX", "Zotero"],
    turnaround: "12 Business Days",
    challenge: "Principal investigator needed camera-ready IEEE formatting, comprehensive literature benchmark tables, and zero AI-detector flags.",
    solution: "Structured complete LaTeX manuscript with statistical ablation studies, mathematical proofs, and high-D vector plots.",
    result: "Paper was accepted on first submission to IEEE Transactions on Computational Biology with zero revision requests.",
  },
  {
    id: "omnicart-storefront",
    title: "OmniCart Headless Fashion Store",
    category: "Web Development",
    client: "OmniStyle Retail",
    location: "Toronto, Canada",
    tagline: "Headless Next.js storefront with sub-second checkout.",
    description: "High-performance headless eCommerce build with animated cart drawers, instant search indexing, and automated currency conversion.",
    metrics: [
      { label: "Conversion Lift", value: "+140%" },
      { label: "Page Speed", value: "98/100" },
      { label: "Turnaround", value: "8 Days" },
    ],
    techStack: ["Next.js 15", "Tailwind CSS", "Stripe Checkout", "Shopify API", "Motion"],
    turnaround: "8 Business Days",
    challenge: "Monolithic Shopify theme suffered from 4.2-second mobile load time and 70% cart abandonment.",
    solution: "Decoupled frontend into Next.js edge-rendered storefront with optimistic UI cart updates.",
    result: "Mobile checkout completion jumped by +140% with an average order value increase of 22%.",
  },
  {
    id: "cloud-saas-copy",
    title: "Apex Cloud Developer Portal Copy",
    category: "Content & Analytics",
    client: "Apex Cloud Inc",
    location: "Seattle / Remote",
    tagline: "High-converting developer documentation & landing copy.",
    description: "Crafted in-depth technical guides, interactive API quickstarts, and comparison whitepapers for enterprise engineers.",
    metrics: [
      { label: "Signups", value: "+210%" },
      { label: "Avg Dwell Time", value: "5m 40s" },
      { label: "Turnaround", value: "5 Days" },
    ],
    techStack: ["Clearscope", "PostHog", "Notion", "Next.js MDX", "Figma"],
    turnaround: "5 Business Days",
    challenge: "Developer documentation was dry and confusing, causing a 68% drop-off during onboarding API key generation.",
    solution: "Rewrote 12 core documentation pages with interactive code snippets, clear use-case diagrams, and frictionless CTAs.",
    result: "API key generation conversion jumped from 32% to 74% within 3 weeks of release.",
  },
];

const CATEGORIES = ["All", "Web Development", "AI Agents", "SEO Marketing", "Research Papers", "Content & Analytics"];

function PortfolioPageContent() {
  const { openBookingWithService } = useAgency();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="relative z-10 w-full pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <InteractiveConsultationModal />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-black/50 dark:text-white/50 mb-8">
        <Link href="/" className="hover:text-black dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-400">Portfolio & Case Studies</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>Verified Work</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight">
            Proof of Work. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
              Built in 1–2 Weeks.
            </span>
          </h1>
        </div>

        <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-md">
          Explore real production builds delivered across India, Canada, and global startups. Click any project to open the full technical case study.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeCategory === cat
                ? "bg-white text-black font-bold shadow-md shadow-white/10"
                : "bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid with 3D Tilt Mockups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            className="cursor-pointer group flex flex-col justify-between"
          >
            <DeviceMockup
              title={proj.title}
              badge={proj.category}
              stats={proj.metrics}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-black/50 dark:text-white/50">
                  <span>{proj.client}</span>
                  <span className="text-neutral-600 dark:text-neutral-400">{proj.location}</span>
                </div>
                <h3 className="text-lg font-medium text-black dark:text-white group-hover:text-neutral-600 dark:text-neutral-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed line-clamp-2">
                  {proj.tagline}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {proj.techStack.slice(0, 3).map((t) => (
                    <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80">
                      {t}
                    </span>
                  ))}
                  {proj.techStack.length > 3 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50">
                      +{proj.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </DeviceMockup>
          </div>
        ))}
      </div>

      {/* Technical Case Study Modal / Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 dark:bg-white/85 backdrop-blur-xl animate-in fade-in"
          />

          <div className="relative w-full max-w-3xl bg-[#111111] border border-black/20 dark:border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black/70 dark:text-white/70 hover:text-black dark:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span>{selectedProject.location}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-2">
                {selectedProject.title}
              </h2>
              <div className="text-sm text-black/70 dark:text-white/70 font-mono">
                Client: {selectedProject.client} • Turnaround: {selectedProject.turnaround}
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-6 text-center">
              {selectedProject.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono text-black/50 dark:text-white/50 uppercase mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Deep Dive Narrative */}
            <div className="space-y-4 text-xs sm:text-sm text-black/80 dark:text-white/80 leading-relaxed mb-6">
              <div className="p-4 rounded-2xl bg-black/40 dark:bg-white/40 border border-black/10 dark:border-white/10">
                <strong className="text-red-300 font-mono text-xs uppercase block mb-1">
                  The Challenge
                </strong>
                <p>{selectedProject.challenge}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 dark:bg-white/40 border border-black/10 dark:border-white/10">
                <strong className="text-neutral-600 dark:text-neutral-400 font-mono text-xs uppercase block mb-1">
                  Our Engineering Solution
                </strong>
                <p>{selectedProject.solution}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 dark:bg-white/40 border border-black/10 dark:border-white/10">
                <strong className="text-neutral-600 dark:text-neutral-400 font-mono text-xs uppercase block mb-1">
                  The Result & ROI
                </strong>
                <p>{selectedProject.result}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <div className="text-xs font-mono uppercase tracking-wider text-black/60 dark:text-white/60 mb-2">
                Full Production Stack:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-xs font-mono text-black/90 dark:text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-black/60 dark:text-white/60 font-mono">
                Want a similar solution built for your business?
              </span>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  openBookingWithService(`Project like ${selectedProject.title}`);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Request Working Demo (Custom)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/10 via-neutral-400 to-white/10 border border-black/20 dark:border-white/20 backdrop-blur-2xl text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-3">
          Have a unique product or workflow in mind?
        </h3>
        <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mb-6">
          We will build and deploy a live interactive prototype with a low advance. Free revisions until you are completely satisfied.
        </p>
        <button
          onClick={() => openBookingWithService("Custom Portfolio Request")}
          className="rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
        >
          <span>Kickstart Your Custom Demo (Custom)</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <AgencyProvider>
      <PortfolioPageContent />
    </AgencyProvider>
  );
}
