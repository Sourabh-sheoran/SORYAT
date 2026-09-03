"use client";

import React from "react";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  service: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marcus Vance",
    role: "Co-Founder & CTO",
    company: "SyncPulse AI",
    location: "Toronto, Canada",
    avatar: "MV",
    service: "AI Agent Development",
    quote:
      "The demo-first model completely eliminated our anxiety. We paid only Custom to kick off, tested the working multi-agent Slack bot within 5 days, and approved the final build seamlessly. Exceptional velocity.",
    rating: 5,
  },
  {
    name: "Ananya Deshmukh",
    role: "Head of Product",
    company: "Lumina Healthcare",
    location: "Bengaluru, India",
    avatar: "AD",
    service: "Full-Stack Web App",
    quote:
      "Delivered our Next.js dashboard in 9 days flat with a 99 Lighthouse performance score. Their 1-month free maintenance saved us countless hours during our public beta launch.",
    rating: 5,
  },
  {
    name: "Dr. Ethan Becker",
    role: "Principal Investigator",
    company: "BioInformatics Labs",
    location: "Vancouver, Canada",
    avatar: "EB",
    service: "Research Paper Writing",
    quote:
      "Their team formatted and structured our 24-page IEEE manuscript with exceptional mathematical precision and zero plagiarism. The paper was accepted into IEEE Transactions on the first submission.",
    rating: 5,
  },
  {
    name: "Kabir Sharma",
    role: "Founder",
    company: "Zest eCommerce",
    location: "Delhi NCR, India",
    avatar: "KS",
    service: "SEO & Growth Marketing",
    quote:
      "Our organic traffic jumped from 4,200 to over 38,000 monthly visits in 4 months. Their ₹5,000/mo package gave us 10x more ROI than legacy marketing agencies charging 10 times more.",
    rating: 5,
  },
  {
    name: "Sophia Chen",
    role: "VP of Growth",
    company: "Apex Cloud Solutions",
    location: "Seattle / Remote",
    avatar: "SC",
    service: "Content Writing & Funnels",
    quote:
      "The technical copy they wrote for our developer landing pages doubled our trial signup conversion rate. Fast, responsive, and incredibly easy to work with across time zones.",
    rating: 5,
  },
];

export default function TestimonialsMarquee() {
  // Duplicate array for seamless infinite loop
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="w-full relative overflow-hidden py-4" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
      <motion.div 
        className="flex w-max gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
      >
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="w-[350px] shrink-0 p-6 sm:p-7 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40 relative overflow-hidden group"
          >
            {/* Top Glow on hover */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-400 rounded-full blur-xl group-hover:bg-neutral-400 transition-colors" />

            <div>
              {/* Service & Rating Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                  {item.service}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-black/80 dark:text-white/80 leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neutral-400 to-neutral-500 flex items-center justify-center text-xs font-bold text-black shrink-0">
                {item.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-black dark:text-white flex items-center gap-1.5">
                  <span className="truncate">{item.name}</span>
                  <ShieldCheck size={13} className="text-neutral-600 dark:text-neutral-400 shrink-0" />
                </div>
                <div className="text-[11px] text-black/60 dark:text-white/60 truncate">
                  {item.role}, {item.company}
                </div>
                <div className="text-[10px] font-mono text-black/40 dark:text-white/40 flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-neutral-600 dark:text-neutral-400" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
