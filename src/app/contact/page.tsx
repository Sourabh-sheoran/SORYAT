"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Sparkles,
  Send,
  CheckCircle2,
  ShieldCheck,
  Globe,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import WorldMapGraphic from "@/components/WorldMapGraphic";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { AgencyProvider, useAgency } from "@/context/AgencyContext";

function ContactPageContent() {
  const { openBookingWithService } = useAgency();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    budget: "₹15k - ₹35k ($180 - $420)",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#22d3ee", "#38bdf8", "#34d399", "#ffffff"],
        });
      } catch {
        // Fallback
      }
    }, 800);
  };

  return (
    <div className="relative z-10 w-full pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <InteractiveConsultationModal />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-black/50 dark:text-white/50 mb-8">
        <Link href="/" className="hover:text-black dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-400">Contact & Direct Inquiries</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
          <Clock size={13} className="text-neutral-600 dark:text-neutral-400 animate-spin" style={{ animationDuration: "8s" }} />
          <span>2-Hour Guaranteed Response SLA</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight mb-4">
          Let&apos;s Build Your Working Demo. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
            Kickstart for Just Custom.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-black/75 dark:text-white/75 leading-relaxed max-w-xl mx-auto">
          Connect directly with our lead architects. We will scope your requirements, answer technical questions, and deploy your live demo within 3–5 days.
        </p>
      </div>

      {/* Main Grid: Form (7 cols) + Direct Hubs & Instant Actions (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
        {/* Left Form Card (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold">
                  Direct Inquiries & Demo Booking
                </span>
                <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  Demo First Policy
                </span>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/80 dark:text-white/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Liam Parker / Ananya Sharma"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-neutral-400 focus:bg-black/10 dark:focus:bg-white/10 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/80 dark:text-white/80 mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-neutral-400 focus:bg-black/10 dark:focus:bg-white/10 transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/80 dark:text-white/80 mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 8708248561 / +1 (416)..."
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-neutral-300 dark:border-white/15 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:outline-none focus:border-neutral-500 focus:bg-neutral-50 dark:focus:bg-white/10 transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1 font-bold">
                    Service Required
                  </label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-white/15 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-500 shadow-sm cursor-pointer"
                  >
                    <option value="Web Development" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Full-Stack Web Development (from ₹15k)</option>
                    <option value="AI Agents" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">AI Agent Development (Custom)</option>
                    <option value="SEO Marketing" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">SEO & Growth Marketing (from ₹5k/mo)</option>
                    <option value="Research Papers" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Research Papers & Academic (₹10k–₹30k)</option>
                    <option value="Content & Analytics" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Content Writing & Funnels (₹2k/1k words)</option>
                    <option value="Other" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Other Custom End-to-End Project</option>
                  </select>
                </div>
              </div>

              {/* Project Brief */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1 font-bold">
                  Project Brief & Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what you want built, desired timeline, target audience, or any specific integrations..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-neutral-300 dark:border-white/15 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:outline-none focus:border-neutral-500 focus:bg-neutral-50 dark:focus:bg-white/10 transition-colors resize-none shadow-sm"
                />
              </div>

              {/* Advance highlight notice */}
              <div className="p-4 rounded-2xl bg-neutral-400 border border-neutral-400 text-xs text-black/80 dark:text-white/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-neutral-600 dark:text-neutral-400" />
                  <span>Only <strong>low advance</strong> to begin development.</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400">
                  Refundable/Adjustable
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-black/90 dark:hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10 mt-2 text-sm disabled:opacity-50"
              >
                {submitting ? (
                  <span>Transmitting to Lead Architect...</span>
                ) : (
                  <>
                    <span>Submit & Request ₹3k Demo Kickstart</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-neutral-400 border border-neutral-400 flex items-center justify-center text-neutral-600 dark:text-neutral-400 mb-4 animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-medium text-black dark:text-white mb-2">
                Inquiry Successfully Logged!
              </h3>
              <p className="text-sm text-black/70 dark:text-white/70 max-w-md mx-auto mb-6">
                Thank you, <strong className="text-black dark:text-white">{formState.name}</strong>. Our senior engineer has received your brief for <span className="text-neutral-600 dark:text-neutral-400 font-medium">{formState.service}</span> and will connect within <strong>2 hours</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 px-6 py-2.5 text-xs text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-all"
              >
                Send Another Note
              </button>
            </div>
          )}
        </div>

        {/* Right Info: Direct Actions & Dual Hubs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Connect Actions */}
          <div className="p-6 sm:p-7 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 backdrop-blur-xl space-y-4">
            <h3 className="text-lg font-medium text-black dark:text-white">Instant Channels</h3>

            <a
              href="https://wa.me/918708248561?text=Hi%20Nova%20Studio%2C%20I%20want%20to%20start%20a%20demo-first%20project"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-neutral-400 border border-neutral-400 hover:bg-neutral-400 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <MessageSquare size={18} />
                <div>
                  <div className="text-xs font-semibold text-black dark:text-white">WhatsApp Fast Track</div>
                  <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono">+91 8708248561</div>
                </div>
              </div>
              <ArrowRight size={14} className="text-neutral-600 dark:text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="mailto:sourabhsheoran695@gmail.com"
              className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <Mail size={18} />
                <div>
                  <div className="text-xs font-semibold text-black dark:text-white">Email Consultation</div>
                  <div className="text-[11px] text-black/60 dark:text-white/60 font-mono">sourabhsheoran695@gmail.com</div>
                </div>
              </div>
              <ArrowRight size={14} className="text-black/60 dark:text-white/60 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>

      {/* Global Connection Map Section */}
      <section className="mb-20">
        <WorldMapGraphic />
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <AgencyProvider>
      <ContactPageContent />
    </AgencyProvider>
  );
}
