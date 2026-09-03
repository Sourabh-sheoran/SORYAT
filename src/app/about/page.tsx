"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  Globe,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Users,
  Code2,
  Terminal,
  Zap,
  MapPin,
  Clock,
} from "lucide-react";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { useAgency } from "@/context/AgencyContext";

const FOUNDER_PORTRAIT =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85";

const TEAM = [
  {
    name: "Sourabh S.",
    role: "Founder & Principal Architect",
    location: "Bengaluru & Delhi",
    avatar: FOUNDER_PORTRAIT,
    bio: "Full-Stack Architect specializing in Next.js 15, LangGraph autonomous agent pipelines, and high-performance frontend engineering. Oversees all demo builds.",
    skills: ["Next.js 15", "LangGraph", "TypeScript", "System Architecture", "React 19"],
  },
  {
    name: "Devon Vance",
    role: "Head of Canadian Operations & Growth",
    location: "Toronto, Canada",
    avatar: "",
    initials: "DV",
    bio: "Product strategist with 8+ years experience scaling North American SaaS startups. Manages client alignment, SLA guarantees, and enterprise compliance.",
    skills: ["Product Strategy", "SaaS Growth", "SOC-2 Compliance", "Client Success"],
  },
  {
    name: "Dr. Pooja Kulkarni",
    role: "Lead Academic Researcher & Data Scientist",
    location: "Pune / Remote",
    avatar: "",
    initials: "PK",
    bio: "PhD in Computational Sciences. Author of 18+ IEEE/Springer publications. Directs academic manuscript drafting, statistical modeling, and LaTeX peer-reviews.",
    skills: ["LaTeX", "PyTorch", "Statistical Modeling", "IEEE Standards", "R"],
  },
  {
    name: "Arjun Nambiar",
    role: "Senior Full-Stack & AI Engineer",
    location: "Bengaluru, India",
    avatar: "",
    initials: "AN",
    bio: "Specialist in Supabase, Vector databases, automated tool-calling workflows, and headless eCommerce integrations.",
    skills: ["Supabase", "FastAPI", "OpenAI / Gemini", "PostgreSQL", "Tailwind CSS"],
  },
];

const STATS = [
  { label: "Projects Completed", value: "120+", detail: "Across Web, AI & Research" },
  { label: "Client Satisfaction", value: "99.4%", detail: "Verified CSAT Score" },
  { label: "Avg Sprint Turnaround", value: "7–12 Days", detail: "Fast-Track Agile Delivery" },
  { label: "Global Presence", value: "India & Canada", detail: "24/7 Timezone Overlap" },
];

const CERTIFICATIONS = [
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services" },
  { name: "Google Cloud Professional ML Engineer", issuer: "Google Cloud" },
  { name: "IEEE Senior Member Scholarly Review", issuer: "IEEE Publications" },
  { name: "Vercel Next.js Enterprise Verified", issuer: "Vercel Ecosystem" },
  { name: "Meta Certified Digital Marketing Strategist", issuer: "Meta Blueprint" },
  { name: "Turnitin Integrity Verified Partner", issuer: "Academic Standards" },
];

export default function AboutPage() {
  const { openBookingWithService } = useAgency();
  const [activeMember, setActiveMember] = useState<number | null>(null);

  return (
    <div className="relative z-10 w-full pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <InteractiveConsultationModal />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-black/50 dark:text-white/50 mb-8">
        <Link href="/" className="hover:text-black dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-400">About Us</span>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
        {/* Left Copy (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
            <Users size={13} />
            <span>Our Origin & Purpose</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight mb-6">
            Bridging Indian Engineering Velocity With Canadian Product Standards.
          </h1>

          <p className="text-base sm:text-lg text-black/75 dark:text-white/75 leading-relaxed mb-8 max-w-xl">
            We founded our digital agency to eliminate traditional agency bloat. No 6-month timelines, no 50% upfront hostage deposits. Just high-velocity full-stack engineering, autonomous AI agent systems, and academic precision with a demo-first guarantee.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => openBookingWithService("Discovery Consultation")}
              className="rounded-full bg-black dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
            >
              <span>Meet the Team (Demo Build)</span>
              <ArrowUpRight size={16} />
            </button>
            <Link
              href="/portfolio"
              className="rounded-full border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-all"
            >
              View Verified Work
            </Link>
          </div>
        </div>

        {/* Right Stats Grid (5 Cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="font-mono text-3xl font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                {stat.value}
              </div>
              <div>
                <div className="text-xs font-medium text-black dark:text-white">{stat.label}</div>
                <div className="text-[10px] font-mono text-black/50 dark:text-white/50 mt-0.5">
                  {stat.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 — CORE TEAM MEMBERS */}
      {/* ========================================================================= */}
      <section className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Users size={13} />
            <span>Leadership & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            The Engineers Building Your Software
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            Hover or tap any team member card to reveal their background, technical specializations, and direct focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              onMouseEnter={() => setActiveMember(i)}
              onMouseLeave={() => setActiveMember(null)}
              className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neutral-400 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Avatar / Portrait */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-4 border border-black/20 dark:border-white/20 bg-gradient-to-tr from-neutral-400 to-neutral-500 flex items-center justify-center">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-mono text-xl font-bold text-neutral-600 dark:text-neutral-400">
                      {member.initials}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-medium text-black dark:text-white group-hover:text-neutral-600 dark:text-neutral-400 transition-colors">
                  {member.name}
                </h3>
                <div className="font-mono text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                  {member.role}
                </div>
                <div className="text-[10px] font-mono text-black/50 dark:text-white/50 flex items-center gap-1 mb-4">
                  <MapPin size={10} className="text-neutral-600 dark:text-neutral-400" />
                  <span>{member.location}</span>
                </div>

                <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed line-clamp-4">
                  {member.bio}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 mt-4 flex flex-wrap gap-1">
                {member.skills.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — CERTIFICATIONS & INDUSTRY STANDARDS */}
      {/* ========================================================================= */}
      <section className="mb-24 p-8 sm:p-12 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 backdrop-blur-xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Award size={13} />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            Certifications & Industry Accreditations
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            Our engineering and research practices adhere strictly to international enterprise standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-400 border border-neutral-400 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-xs font-semibold text-black dark:text-white">{cert.name}</div>
                <div className="text-[10px] font-mono text-black/50 dark:text-white/50">{cert.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/10 via-neutral-400 to-white/10 border border-black/20 dark:border-white/20 backdrop-blur-2xl text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-3">
          Partner with our team for your next release
        </h3>
        <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mb-6">
          Start with low advance. Inspect your working demo in 3–5 days. 100% satisfaction guaranteed.
        </p>
        <button
          onClick={() => openBookingWithService("About Us Kickstart")}
          className="rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
        >
          <span>Kickstart With Low Advance</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}
