"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Code2,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Layout,
  Layers,
  Cpu,
  Database,
  Globe,
  Gauge,
  Smartphone,
} from "lucide-react";
import DeviceMockup from "@/components/DeviceMockup";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { useAgency } from "@/context/AgencyContext";

const PACKAGES = [
  {
    id: "starter",
    name: "Essential Web Launch",
    inrPrice: 15000,
    turnaround: "7 Days",
    tagline: "Ultra-fast landing page or multi-section business website.",
    description: "Designed for early-stage startups, service providers, and creators who need a stunning, high-converting digital storefront.",
    features: [
      "Up to 5 Custom Pages / Dynamic Sections",
      "Next.js 15 + Tailwind CSS + Motion 2D animations",
      "95+ Google Lighthouse Score Guaranteed",
      "Fully Responsive (Mobile, Tablet, Desktop)",
      "Contact Form with Email & WhatsApp direct trigger",
      "1 Month Free Warranty & Hosting Configuration",
    ],
    recommended: false,
  },
  {
    id: "fullstack",
    name: "Full-Stack SaaS / Dynamic App",
    inrPrice: 35000,
    turnaround: "10–14 Days",
    tagline: "Custom database, user authentication, and interactive dashboards.",
    description: "Ideal for SaaS products, booking platforms, custom client portals, and web applications requiring robust backend state.",
    features: [
      "Custom React / Next.js App Router Architecture",
      "Supabase / PostgreSQL Database Integration",
      "Authentication (OAuth, Google, Magic Link, Email)",
      "Interactive Client Dashboard & State Management",
      "Stripe / Razorpay / PayPal Payment Gateway",
      "Role-Based Access Control (RBAC)",
      "1 Month Free Post-Launch Engineering Maintenance",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Custom Platform",
    inrPrice: 65000,
    turnaround: "2–3 Weeks",
    tagline: "Complex multi-tenant architectures & custom API integrations.",
    description: "Tailored for scaling businesses needing multi-region deployments, AI-powered features, and high-concurrency architecture.",
    features: [
      "Microservice / Edge-ready Serverless Architecture",
      "AI Workflow & Autonomous Agent Integration",
      "Custom Admin CMS & Analytics Instrumentation",
      "SOC-2 / GDPR compliant security hardening",
      "Automated CI/CD Pipeline & GitHub Handover",
      "3 Months Dedicated Engineering Support",
    ],
    recommended: false,
  },
];

const TECH_STACK = [
  { name: "Next.js 15", desc: "Server Actions & App Router", color: "from-zinc-400 to-white" },
  { name: "React 19", desc: "Concurrent Rendering", color: "from-neutral-400 to-neutral-500" },
  { name: "TypeScript", desc: "Type-safe Scalability", color: "from-neutral-500 to-neutral-500" },
  { name: "Tailwind CSS", desc: "Utility-first Styling", color: "from-teal-400 to-neutral-400" },
  { name: "Motion", desc: "60fps Smooth Micro-interactions", color: "from-pink-400 to-purple-500" },
  { name: "PostgreSQL", desc: "Relational Data Modeling", color: "from-neutral-300 to-neutral-500" },
  { name: "Supabase", desc: "Auth, Storage & Realtime", color: "from-neutral-400 to-green-600" },
  { name: "Node.js", desc: "High-throughput APIs", color: "from-lime-400 to-neutral-400" },
];

const SHOWCASE_PROJECTS = [
  {
    title: "Apex FinTech Dashboard",
    client: "Toronto Banking Tech",
    tag: "Next.js + Tailwind + Charts",
    lighthouse: "99/100",
    turnaround: "9 Days",
    desc: "Real-time investment portfolio tracking with interactive cashflow visualizations and dark glassmorphism aesthetic.",
  },
  {
    title: "OmniCart D2C Storefront",
    client: "Delhi Fashion Brand",
    tag: "Next.js + Stripe + CMS",
    lighthouse: "98/100",
    turnaround: "8 Days",
    desc: "Blazing fast headless eCommerce experience with sub-second page transitions and seamless UPI / Card checkout.",
  },
  {
    title: "MedSync Telehealth Portal",
    client: "Healthcare Vancouver",
    tag: "React + WebRTC + Supabase",
    lighthouse: "97/100",
    turnaround: "12 Days",
    desc: "HIPAA-ready patient appointment scheduling and secure video consultation room with automated doctor notes.",
  },
];

export default function WebDevPage() {
  const { formatPrice, setIsConsultationOpen, openBookingWithService } = useAgency();
  const [expandedPackage, setExpandedPackage] = useState<string>("fullstack");
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      title: "FinTech Enterprise Platform",
      metric: "99.8% Uptime • 0.3s Load Time",
      desc: "Architected with Next.js App Router, Tailwind CSS, and edge caching for sub-300ms global latency.",
    },
    {
      title: "AI-Powered SaaS Hub",
      metric: "10,000+ Daily Active Users",
      desc: "Integrated with OpenAI/Gemini pipelines, real-time streaming answers, and multi-tenant authentication.",
    },
    {
      title: "High-Conversion E-Commerce",
      metric: "+140% Checkout Conversion",
      desc: "Headless e-commerce with animated product quick-view, dynamic currency switching, and instant checkout.",
    },
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
        <span className="text-neutral-600 dark:text-neutral-400">Web Development</span>
      </div>

      {/* Hero Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
        {/* Left Header Copy (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
            <Code2 size={13} />
            <span>Full-Stack Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight mb-6">
            Ultra-Fast Next.js Apps. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
              Built to Wow & Convert.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-black/75 dark:text-white/75 leading-relaxed mb-8 max-w-xl">
            We engineer production-grade websites and web apps with Next.js 15, TypeScript, Tailwind CSS, and buttery 2D micro-interactions. Lighthouse scores of 95+ guaranteed.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openBookingWithService("Web Development")}
              className="rounded-full bg-black dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
            >
              <span>Build Demo (Low Advance)</span>
              <ArrowUpRight size={16} />
            </motion.button>
            <Link
              href="#packages"
              className="rounded-full border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-all"
            >
              View Packages & Pricing
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-black/10 dark:border-white/10 pt-6">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-black dark:text-white">95–100</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Lighthouse Score</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">1–2 Wks</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Rapid Delivery</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">Custom</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Starting Advance</div>
            </div>
          </div>
        </motion.div>

        {/* Right Interactive Laptop Device Mockup with Carousel (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <DeviceMockup
            title="Next.js Production Build"
            url="https://app.auradigital.agency"
            badge="Live Interactive Staging"
            stats={[
              { label: "Performance", value: "99/100" },
              { label: "FCP", value: "0.4s" },
              { label: "CLS", value: "0.00" },
            ]}
          >
            <div className="flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider">
                    {heroSlides[activeSlide].title}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 bg-neutral-400 px-2 py-0.5 rounded border border-neutral-400">
                    {heroSlides[activeSlide].metric}
                  </span>
                </div>
                <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed">
                  {heroSlides[activeSlide].desc}
                </p>
              </div>

              {/* Slide switcher dots */}
              <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10 mt-4">
                <div className="flex items-center gap-1.5">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeSlide === i ? "w-6 bg-neutral-400" : "w-2 bg-black/30 dark:bg-white/30 hover:bg-black/60 dark:hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-black/50 dark:text-white/50">
                  Slide {activeSlide + 1} of 3
                </span>
              </div>
            </div>
          </DeviceMockup>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 — EXPANDABLE SERVICE PACKAGES */}
      {/* ========================================================================= */}
      <section id="packages" className="mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>Structured Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            Choose Your Web Architecture Tier
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            Click on any tier to unfold its full feature breakdown and delivery timeline. All packages include a demo-first build with a low advance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => {
            const isExpanded = expandedPackage === pkg.id;
            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -6 }}
                onClick={() => setExpandedPackage(pkg.id)}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  pkg.recommended
                    ? "bg-gradient-to-b from-white/15 to-white/5 border-neutral-400 shadow-2xl shadow-neutral-400"
                    : isExpanded
                    ? "bg-black/10 dark:bg-white/10 border-black/30 dark:border-white/30"
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute top-0 right-0 bg-neutral-400 text-black font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      {pkg.turnaround} Sprint
                    </span>
                    <span className="text-xs font-mono text-black/50 dark:text-white/50">
                      ₹3k Advance
                    </span>
                  </div>

                  <h3 className="text-2xl font-medium text-black dark:text-white mb-2">{pkg.name}</h3>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-black dark:text-white mb-3">
                    {formatPrice(pkg.inrPrice)}
                  </div>
                  <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-black/50 dark:text-white/50 mb-2">
                      Included Deliverables:
                    </div>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-black/80 dark:text-white/80">
                        <CheckCircle2 size={14} className="text-neutral-600 dark:text-neutral-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openBookingWithService(pkg.name);
                    }}
                    className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      pkg.recommended
                        ? "bg-white text-black hover:bg-black/90 dark:hover:bg-white/90 shadow-lg shadow-white/10"
                        : "bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 border border-black/20 dark:border-white/20"
                    }`}
                  >
                    <span>Kickstart Demo with Custom</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — FLOATING TECH STACK GRID */}
      {/* ========================================================================= */}
      <section className="mb-24 p-8 sm:p-12 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
              <Cpu size={13} />
              <span>Modern Tooling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white">
              Engineered With The Modern Web Stack
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 max-w-md">
            Zero legacy bloat. We build exclusively on high-performance frameworks with automated CI/CD and strict TypeScript verification.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neutral-400 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-base font-medium text-black dark:text-white group-hover:text-neutral-600 dark:text-neutral-400 transition-colors">
                {tech.name}
              </div>
              <div className="text-xs text-black/60 dark:text-white/60 mt-1">
                {tech.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — PROJECT SHOWCASE WITH 3D TILT MOCKUPS */}
      {/* ========================================================================= */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
              <Layers size={13} />
              <span>Recent Builds</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white">
              Proven Web Apps In Production
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:text-white flex items-center gap-1 font-medium transition-colors"
          >
            <span>View all case studies</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHOWCASE_PROJECTS.map((proj) => (
            <DeviceMockup
              key={proj.title}
              title={proj.title}
              badge={proj.lighthouse}
              stats={[
                { label: "Delivery", value: proj.turnaround },
                { label: "Performance", value: "99" },
                { label: "Audit", value: "Passed" },
              ]}
            >
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  {proj.tag}
                </span>
                <h4 className="text-lg font-medium text-black dark:text-white">{proj.title}</h4>
                <div className="text-xs text-black/50 dark:text-white/50 font-mono">{proj.client}</div>
                <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed line-clamp-3 mt-2">
                  {proj.desc}
                </p>
              </div>
            </DeviceMockup>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/10 via-neutral-400 to-white/10 border border-black/20 dark:border-white/20 backdrop-blur-2xl text-center flex flex-col items-center"
      >
        <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-3">
          Ready to see your working website prototype?
        </h3>
        <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mb-6">
          Kickstart your custom Next.js project with a low advance. Inspect the live staging build within 5 business days.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openBookingWithService("Web Development")}
          className="rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
        >
          <span>Claim Demo Build</span>
          <ArrowUpRight size={16} />
        </motion.button>
      </motion.div>
    </div>
  );
}
