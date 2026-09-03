"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Eye, Star, Globe } from "lucide-react";

import HeroDayScrubVideo from "@/components/HeroDayScrubVideo";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";
import ServiceCard, { AGENCY_SERVICES } from "@/components/ServiceCard";
import WorldMapGraphic from "@/components/WorldMapGraphic";
import HowItWorksTimeline from "@/components/HowItWorksTimeline";
import BenefitsSection from "@/components/BenefitsSection";
import PricingCalculator from "@/components/PricingCalculator";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import FAQAccordion from "@/components/FAQAccordion";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useAgency } from "@/context/AgencyContext";

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

function CountUpStat({ value, prefix = "", suffix = "", label, className = "" }: any) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="text-4xl sm:text-5xl font-normal text-black dark:text-white mb-2" style={{ fontFamily: "var(--font-instrument), serif" }}>
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-xs text-black/60 dark:text-white/60 uppercase tracking-widest font-mono">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const { setIsConsultationOpen } = useAgency();
  const [heroOpacity, setHeroOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 100;
      const fadeEnd = 400;
      if (scrollY < fadeStart) {
        setHeroOpacity(1);
      } else if (scrollY > fadeEnd) {
        setHeroOpacity(0);
      } else {
        setHeroOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  return (
    <main className="relative min-h-screen bg-neutral-50 dark:bg-transparent selection:bg-black/10 dark:selection:bg-white/20">
      
      {/* ── CINEMATIC VIDEO BACKGROUND ─────────────────────────────────────── */}
      <ScrollScrubVideo />
      <InteractiveConsultationModal />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <div id="hero-pin-container" className="hero-light-bg relative w-full h-[220vh] dark:h-screen">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
          {/* Day Mode Skull Scrub Video — embedded directly inside Hero */}
          <HeroDayScrubVideo />

          <motion.section
            style={{ opacity: heroOpacity }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative flex-1 w-full px-5 sm:px-8 md:px-12 pt-20 sm:pt-24 pb-8 flex flex-col justify-between max-w-7xl mx-auto z-10 bg-transparent"
          >
            {/* Upper text content — positioned above the skull with zero overlap */}
            <div id="hero-text-content" className="flex flex-col items-center justify-start text-center w-full max-w-3xl mx-auto pt-2 sm:pt-4 transition-all duration-150">
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-black dark:text-white drop-shadow-sm"
                style={{ fontFamily: "var(--font-instrument), serif" }}
              >
                Engineering Digital Excellence
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-3 text-xs sm:text-sm text-black/70 dark:text-white/70 max-w-lg mx-auto leading-relaxed"
              >
                Delivering high-performance web development, AI solutions, SEO, and research paper services globally. Experience your working software on staging before full payment.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/portfolio"
                  className="px-6 py-2.5 rounded-full border border-black/25 dark:border-white/25 text-black dark:text-white text-xs sm:text-sm hover:bg-black/10 dark:hover:bg-white/15 transition-all bg-white/70 dark:bg-black/50 backdrop-blur-md shadow-sm font-medium flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>View Portfolio</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 text-black/80 dark:text-white/80 text-xs sm:text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm font-medium cursor-pointer"
                >
                  Explore Services
                </a>
              </motion.div>
            </div>

            {/* Bottom Social Icons — placed cleanly in bottom-right corner */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 flex items-center gap-3.5 z-20"
            >
               <button className="w-9 h-9 rounded-full border border-black/15 dark:border-white/20 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all backdrop-blur-sm bg-white/40 dark:bg-white/10">
                 <InstagramIcon size={15} />
               </button>
               <button className="w-9 h-9 rounded-full border border-black/15 dark:border-white/20 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all backdrop-blur-sm bg-white/40 dark:bg-white/10">
                 <TwitterIcon size={15} />
               </button>
               <button className="w-9 h-9 rounded-full border border-black/15 dark:border-white/20 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all backdrop-blur-sm bg-white/40 dark:bg-white/10">
                 <Globe size={15} />
               </button>
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — STATS ROW
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 backdrop-blur-md px-6 py-10 sm:py-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 divide-white/10 sm:divide-x">
            <CountUpStat value={500} suffix="+" label="Projects Delivered" />
            <CountUpStat value={98} suffix="%" label="Client Satisfaction" className="sm:pl-6" />
            <CountUpStat value={3} prefix="₹" suffix="Cr+" label="Client Revenue Generated" className="sm:pl-6" />
            <CountUpStat value={15} suffix="+" label="Countries Served" className="sm:pl-6" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — SERVICES
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-normal text-black dark:text-white" style={{ fontFamily: "var(--font-instrument), serif" }}>
            Our Services
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENCY_SERVICES && AGENCY_SERVICES.map((service: any, idx: number) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — WORLD MAP
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10">
        <WorldMapGraphic />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — HOW IT WORKS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10">
        <HowItWorksTimeline />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — BENEFITS (Cards Swap)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10">
        <BenefitsSection />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7 — PRICING
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing-calculator" className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10">
        <PricingCalculator />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 8 — TESTIMONIALS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10">
        <TestimonialsMarquee />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 9 — FAQ
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10">
        <FAQAccordion />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 10 — BOTTOM CTA BANNER
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-14 rounded-3xl bg-gradient-to-tr from-[#121212] via-white/10 to-neutral-400 border border-black/20 dark:border-white/20 backdrop-blur-2xl text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-neutral-400 blur-3xl pointer-events-none opacity-20" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-neutral-500 blur-3xl pointer-events-none opacity-20" />

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white max-w-3xl leading-tight mb-6 relative z-10"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            Build your high-converting digital product in{" "}
            <span className="italic text-neutral-600 dark:text-neutral-400">1–2 weeks.</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="rounded-full bg-black dark:bg-white text-white dark:text-black px-7 py-4 text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2"
            >
              <span>Kickstart Demo with Custom</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
