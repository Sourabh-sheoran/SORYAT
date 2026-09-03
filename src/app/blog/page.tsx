"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Clock,
  ArrowRight,
  ArrowUpRight,
  X,
  Share2,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { useAgency } from "@/context/AgencyContext";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  author: string;
  authorRole: string;
  content: string[];
}

const ARTICLES: Article[] = [
  {
    id: "nextjs-15-architecture",
    title: "Why Next.js 15 Server Actions & 2D Motion Outperform 3D Bloat",
    category: "Engineering",
    readTime: "6 min read",
    date: "August 2026",
    author: "Sourabh S.",
    authorRole: "Principal Architect",
    excerpt: "Heavy WebGL models cause 4-second initial loads and mobile overheating. Here is how we build cinematic 60fps agency experiences with pure CSS perspective and Motion.",
    content: [
      "In modern web development, many agencies fall into the trap of embedding 30MB 3D glTF models and Three.js canvases just to make a hero section look 'futuristic'. The unfortunate result is 4-second First Contentful Paint (FCP), battery drain on mobile phones, and poor Lighthouse scores.",
      "At our agency, we exclusively leverage CSS 3D perspective transforms (`perspective: 1000px`, `transform-style: preserve-3d`), hardware-accelerated scroll-scrubbed canvas rendering, and the lightweight Motion library (`motion/react`).",
      "By pairing Next.js 15 streaming server components with optimistic client actions, our pages load in under 400ms globally while retaining cinematic interactive cards, fluid parallax, and crisp typography.",
    ],
  },
  {
    id: "langgraph-agent-swarms",
    title: "Building Autonomous Agent Swarms: Beyond Simple LLM Chatbots",
    category: "AI & Agents",
    readTime: "8 min read",
    date: "July 2026",
    author: "Arjun Nambiar",
    authorRole: "Lead AI Engineer",
    excerpt: "How deterministic tool calling, multi-agent evaluation loops, and LangGraph prevent hallucinations in enterprise customer support workflows.",
    content: [
      "A simple OpenAI chatbot prompt is no longer enough for enterprise automation. When customers ask complex questions involving order tracking, refund verification, and inventory lookups, single-turn LLMs inevitably hallucinate.",
      "We design multi-agent swarms using LangGraph where specialized sub-agents handle specific tasks: a Triage Agent classifies intent, a SQL Tool Agent safely queries read-only database replicas, and an Evaluator Agent double-checks the final output against company policies.",
      "The result is an 84% reduction in manual support tickets with 99.8% factual accuracy across WhatsApp, Slack, and web chat.",
    ],
  },
  {
    id: "programmatic-seo-guide",
    title: "From $0 to $50k MRR: The Programmatic SEO Playbook for 2026",
    category: "SEO & Growth",
    readTime: "7 min read",
    date: "July 2026",
    author: "Devon Vance",
    authorRole: "Head of Growth",
    excerpt: "How to generate hundreds of high-ranking, zero-fluff comparison pages that Google SGE and human buyers actually love.",
    content: [
      "Programmatic SEO in 2026 is not about generating thousands of low-quality AI spam pages that get penalized on the next Google core update. It is about structured data architecture.",
      "By analyzing high-intent search matrices (e.g. '[Tool A] vs [Tool B] in [Industry]', 'Best [Service] for [City]'), we build dynamic Next.js static templates fed by clean markdown and structured JSON-LD schemas.",
      "Each page answers specific user intent with interactive calculators, comparison tables, and verified data benchmarks. This strategy delivered over 140k organic impressions in 4 months for our SaaS clients.",
    ],
  },
  {
    id: "ieee-paper-methodology",
    title: "Structuring Camera-Ready IEEE Research Papers with Zero AI Flags",
    category: "Academic Research",
    readTime: "9 min read",
    date: "June 2026",
    author: "Dr. Pooja Kulkarni",
    authorRole: "Lead Academic Researcher",
    excerpt: "A rigorous guide to experimental methodology, ablation study design, mathematical proofs, and Turnitin-compliant LaTeX authoring.",
    content: [
      "Publishing in Scopus and IEEE Transactions requires rigorous mathematical formalization and comprehensive benchmark comparisons against baseline models.",
      "We outline the essential 7-phase academic paper structure: formulating a novel hypothesis, executing systematic literature mapping, running statistical significance tests (p < 0.01), and compiling in clean LaTeX with Overleaf.",
      "Our papers maintain strict Turnitin similarity scores below 5%, ensuring immediate reviewer credibility and accelerated publication timelines.",
    ],
  },
];

const BLOG_CATEGORIES = ["All", "Engineering", "AI & Agents", "SEO & Growth", "Academic Research"];

export default function BlogPage() {
  const { openBookingWithService } = useAgency();
  const [selectedCat, setSelectedCat] = useState("All");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const filtered = selectedCat === "All"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCat);

  return (
    <div className="relative z-10 w-full pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <InteractiveConsultationModal />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-black/50 dark:text-white/50 mb-8">
        <Link href="/" className="hover:text-black dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-400">Engineering & Research Insights</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
            <BookOpen size={13} />
            <span>Editorial & Thought Leadership</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight">
            Engineering Insights. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
              No Fluff, Just Code & Data.
            </span>
          </h1>
        </div>

        <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-md">
          Deep dives on Next.js 15, autonomous multi-agent pipelines, programmatic SEO, and IEEE research methodologies from our engineering leads.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              selectedCat === cat
                ? "bg-white text-black font-bold shadow-md shadow-white/10"
                : "bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {filtered.map((art) => (
          <div
            key={art.id}
            onClick={() => setActiveArticle(art)}
            className="p-6 sm:p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neutral-400 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 uppercase tracking-wider">
                  {art.category}
                </span>
                <div className="flex items-center gap-1.5 text-black/50 dark:text-white/50">
                  <Clock size={12} />
                  <span>{art.readTime}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-medium text-black dark:text-white mb-3 group-hover:text-neutral-600 dark:text-neutral-400 transition-colors leading-snug">
                {art.title}
              </h3>

              <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 leading-relaxed line-clamp-3 mb-6">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-black dark:text-white">{art.author}</div>
                <div className="text-[10px] font-mono text-black/50 dark:text-white/50">{art.authorRole} • {art.date}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 font-medium group-hover:translate-x-1 transition-transform">
                <span>Read Article</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 bg-black/85 dark:bg-white/85 backdrop-blur-xl animate-in fade-in"
          />

          <div className="relative w-full max-w-3xl bg-[#111111] border border-black/20 dark:border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black/70 dark:text-white/70 hover:text-black dark:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                <span>{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-3 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 pt-2 border-t border-black/10 dark:border-white/10 text-xs text-black/60 dark:text-white/60">
                <span>By <strong className="text-black dark:text-white">{activeArticle.author}</strong> ({activeArticle.authorRole})</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-sm text-black/80 dark:text-white/80 leading-relaxed mb-8">
              {activeArticle.content.map((paragraph, i) => (
                <p key={i} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Bottom Modal CTA */}
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-black dark:text-white">Want this built for your product?</div>
                <div className="text-[11px] text-black/60 dark:text-white/60">Demo-first build with low advance.</div>
              </div>
              <button
                onClick={() => {
                  const svc = activeArticle.category;
                  setActiveArticle(null);
                  openBookingWithService(`Consultation regarding ${svc}`);
                }}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Book 15-Mins Call</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
