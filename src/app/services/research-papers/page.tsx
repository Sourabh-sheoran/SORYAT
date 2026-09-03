"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  FileText,
  Binary,
  Microscope,
  TrendingUp,
  BrainCircuit,
  Award,
} from "lucide-react";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { AgencyProvider, useAgency } from "@/context/AgencyContext";

const SUBJECT_DOMAINS = [
  {
    id: "cs-ai",
    title: "AI, ML & Computer Science",
    icon: BrainCircuit,
    count: "95+ Papers",
    sampleTitle: "Transformer-based Multi-Modal Agent Architectures for Autonomous Decision Systems",
    journals: "IEEE Transactions, ACM, Springer",
    methods: "PyTorch, Python, LaTeX, GPU benchmarks",
  },
  {
    id: "biomedical",
    title: "Biomedical & Bioinformatics",
    icon: Microscope,
    count: "60+ Papers",
    sampleTitle: "Deep Learning Approaches to Genomic Variant Classification in Oncology",
    journals: "Bioinformatics, Nature Scientific Reports, Elsevier",
    methods: "R, BioPython, Statistical Survival Analysis",
  },
  {
    id: "economics",
    title: "Finance & Quantitative Economics",
    icon: TrendingUp,
    count: "45+ Papers",
    sampleTitle: "Econometric Modeling of Cross-Border Digital Currency Liquidity in Emerging Markets",
    journals: "Journal of Financial Economics, Springer",
    methods: "Stata, GARCH modeling, Time-series regression",
  },
  {
    id: "engineering",
    title: "Electrical & Mechanical Engg",
    icon: Binary,
    count: "50+ Papers",
    sampleTitle: "Optimization of Distributed Energy Storage in Smart Grid Micro-Networks",
    journals: "IEEE Access, ScienceDirect",
    methods: "MATLAB, Simulink, Finite Element Analysis",
  },
];

const ACADEMIC_PROCESS = [
  { step: "01", name: "Problem Definition & Question", desc: "Formulating novel research hypothesis, objective scope, and academic contribution." },
  { step: "02", name: "Systematic Literature Review", desc: "Scrutinizing 40–80 Scopus/Web of Science indexed papers to identify research gaps." },
  { step: "03", name: "Methodology & Formalization", desc: "Mathematical formulations, algorithm pseudo-code, and system architecture design." },
  { step: "04", name: "Data Collection & Simulation", desc: "Dataset curation, experimental benchmark execution, and metric logging." },
  { step: "05", name: "Statistical Data Analysis", desc: "Hypothesis testing, ablation studies, p-value verification, and high-D visualizations." },
  { step: "06", name: "Camera-Ready Writing", desc: "Structuring manuscript in LaTeX according to IEEE/Springer guidelines with zero plagiarism." },
  { step: "07", name: "Peer-Review & Submission Support", desc: "Assisting with rebuttal letters, reviewer comments, and journal revisions." },
];

function ResearchPapersPageContent() {
  const { formatPrice, openBookingWithService } = useAgency();
  const [selectedSubject, setSelectedSubject] = useState(0);

  return (
    <div className="relative z-10 w-full pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <InteractiveConsultationModal />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-black/50 dark:text-white/50 mb-8">
        <Link href="/" className="hover:text-black dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/#services" className="hover:text-black dark:text-white transition-colors">Services</Link>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-400">Research & Academic Content</span>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
        {/* Left Copy (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
            <GraduationCap size={13} />
            <span>Scholarly Research & Publication</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight mb-6">
            Peer-Reviewed Grade. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
              IEEE, Springer & Scopus Standards.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-black/75 dark:text-white/75 leading-relaxed mb-8 max-w-xl">
            We provide rigorous academic paper writing, systematic literature reviews, statistical modeling, and LaTeX formatting for researchers, professors, and postgraduate scholars across India, Canada, and global universities.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => openBookingWithService("Research Paper Writing")}
              className="rounded-full bg-black dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
            >
              <span>Draft Outline (Low Advance)</span>
              <ArrowUpRight size={16} />
            </button>
            <Link
              href="#subject-library"
              className="rounded-full border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-all"
            >
              Browse Subject Library
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-black/10 dark:border-white/10 pt-6">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-black dark:text-white">250+</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Published Papers</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">&lt; 5%</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Plagiarism / AI Score</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">₹10k–₹30k</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Transparent Pricing</div>
            </div>
          </div>
        </div>

        {/* Right Quality Assurance Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 backdrop-blur-2xl shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-neutral-600 dark:text-neutral-400" />
              <span className="font-mono text-xs text-black/80 dark:text-white/80">Publication Integrity Standard</span>
            </div>
            <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 bg-neutral-400 px-2 py-0.5 rounded border border-neutral-400">
              Verified
            </span>
          </div>

          <div className="space-y-3 text-xs text-black/80 dark:text-white/80">
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-neutral-600 dark:text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black dark:text-white">Strict Turnitin & Zero AI Guarantee:</strong> Every manuscript is accompanied by an official Turnitin similarity report below 5%.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-neutral-600 dark:text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black dark:text-white">LaTeX & Overleaf Camera-Ready:</strong> Clean source code with BibTeX citations and IEEE / Springer style templates.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-neutral-600 dark:text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black dark:text-white">Unlimited Advisor Revisions:</strong> We implement all feedback and committee review notes at zero extra cost.
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-black/60 dark:text-white/60 font-mono">
            <span>IEEE • Springer • Scopus • Elsevier</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 — SUBJECT DOMAINS LIBRARY */}
      {/* ========================================================================= */}
      <section id="subject-library" className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <BookOpen size={13} />
            <span>Interdisciplinary Library</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            Academic Fields & Subject Domains
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            Click on any domain to inspect research methods, target journals, and sample paper titles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUBJECT_DOMAINS.map((domain, idx) => {
            const Icon = domain.icon;
            const isSelected = selectedSubject === idx;
            return (
              <div
                key={domain.id}
                onClick={() => setSelectedSubject(idx)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-black/15 dark:bg-white/15 border-neutral-400 shadow-2xl shadow-neutral-400"
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                      {domain.count}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-black dark:text-white mb-2">{domain.title}</h3>

                  <div className="p-3.5 rounded-2xl bg-black/40 dark:bg-white/40 border border-black/10 dark:border-white/10 my-3 text-xs text-black/80 dark:text-white/80">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                      Sample Manuscript Title:
                    </div>
                    <div className="italic">&ldquo;{domain.sampleTitle}&rdquo;</div>
                  </div>

                  <div className="space-y-1.5 text-xs text-black/70 dark:text-white/70 pt-2">
                    <div>
                      <strong className="text-black/90 dark:text-white/90">Target Indexed Journals:</strong> {domain.journals}
                    </div>
                    <div>
                      <strong className="text-black/90 dark:text-white/90">Tools & Frameworks:</strong> {domain.methods}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 mt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-black/50 dark:text-white/50">
                    Investment: ₹10k–₹30k
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openBookingWithService(`Research: ${domain.title}`);
                    }}
                    className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:text-white font-medium flex items-center gap-1"
                  >
                    <span>Request Manuscript Demo</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — 7-STEP HORIZONTAL RESEARCH PIPELINE */}
      {/* ========================================================================= */}
      <section className="mb-24 p-8 sm:p-12 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 backdrop-blur-xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <span>Rigorous Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            7-Step Academic Publication Process
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            How we take your research idea from initial hypothesis to camera-ready manuscript acceptance.
          </p>
        </div>

        <div className="space-y-3">
          {ACADEMIC_PROCESS.map((item) => (
            <div
              key={item.step}
              className="p-4 sm:p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neutral-400 transition-all flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-400 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-medium text-black dark:text-white mb-0.5">{item.name}</h4>
                <p className="text-xs text-black/70 dark:text-white/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/10 via-neutral-400 to-white/10 border border-black/20 dark:border-white/20 backdrop-blur-2xl text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-3">
          Get Your Research Paper Outline Drafted
        </h3>
        <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mb-6">
          Pay a low advance to receive a comprehensive abstract, literature review matrix, and methodology blueprint. Free revisions guaranteed.
        </p>
        <button
          onClick={() => openBookingWithService("Research Paper Writing")}
          className="rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
        >
          <span>Kickstart Research Draft (Custom)</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function ResearchPapersPage() {
  return (
    <AgencyProvider>
      <ResearchPapersPageContent />
    </AgencyProvider>
  );
}
