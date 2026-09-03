"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ShieldCheck, Clock, Send, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useAgency } from "@/context/AgencyContext";
import { AGENCY_SERVICES } from "@/components/ServiceCard";

export default function InteractiveConsultationModal() {
  const {
    isConsultationOpen,
    setIsConsultationOpen,
    selectedService,
    setSelectedService,
    currency,
    formatPrice,
  } = useAgency();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "India",
    timeline: "1-2 Weeks",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isConsultationOpen) return null;

  const services = [
    "Full-Stack Web Development",
    "AI Agent Development",
    "SEO & Organic Growth",
    "Research Paper & Academic",
    "Content Writing & Analytics",
    "Custom End-to-End Solution",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#22d3ee", "#38bdf8", "#ffffff", "#34d399"],
        });
      } catch {
        // Safe fallback
      }
    }, 900);
  };

  const handleClose = () => {
    setIsConsultationOpen(false);
    setTimeout(() => setIsSuccess(false), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-white/20 dark:bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white/30 dark:bg-[#111111]/95 border border-white/50 dark:border-white/20 rounded-3xl p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-2xl dark:shadow-black/90 backdrop-blur-3xl z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black/70 dark:text-white/70 hover:text-black dark:text-white transition-colors focus:outline-none"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-400 border border-neutral-400 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
                <Sparkles size={13} />
                <span>Demo-First Project Kickoff</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal text-black dark:text-white">
                Get Your Working Demo Built
              </h3>
              <p className="text-sm text-black/70 dark:text-white/70 mt-1">
                Start with just <strong className="text-black dark:text-white font-semibold">low advance</strong>. Free revisions on the working demo. 1–2 week turnaround.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black/80 dark:text-white/80 mb-2">
                  Select Project Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {services.map((svc) => (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => setSelectedService(svc)}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        selectedService === svc
                          ? "bg-white text-black font-semibold border-black dark:border-white shadow-md shadow-white/10"
                          : "bg-black/5 dark:bg-white/5 text-black/80 dark:text-white/80 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:border-white/20"
                      }`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Liam Parker / Rajesh Mehta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-neutral-400 focus:bg-black/10 dark:focus:bg-white/10 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-neutral-400 focus:bg-black/10 dark:focus:bg-white/10 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 / +1 (Country code & number)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-neutral-400 focus:bg-black/10 dark:focus:bg-white/10 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1 font-bold">
                    Your Location / Market
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-white/15 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-500 shadow-sm cursor-pointer"
                  >
                    <option value="India" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">India (IST Timezone)</option>
                    <option value="Canada" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Canada (EST / PST)</option>
                    <option value="USA" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">United States</option>
                    <option value="UK / Europe" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">UK / Europe</option>
                    <option value="Other" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">Other International</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70 mb-1">
                  Brief Project Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the features, target audience, or specific requirements you need for your demo..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-neutral-400 focus:bg-black/10 dark:focus:bg-white/10 transition-colors resize-none"
                />
              </div>

              {/* Guarantee highlights */}
              <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-black/80 dark:text-white/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-neutral-600 dark:text-neutral-400" />
                  <span>Only low advance to build live demo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-neutral-600 dark:text-neutral-400" />
                  <span>2h response guarantee</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-black/90 dark:hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10 mt-2 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Preparing Your Consultation...</span>
                ) : (
                  <>
                    <span>Submit & Claim Demo Build Kickstart</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-neutral-400 border border-neutral-400 flex items-center justify-center text-neutral-600 dark:text-neutral-400 mb-4 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-medium text-black dark:text-white mb-2">
              Consultation Request Received!
            </h3>
            <p className="text-sm text-black/70 dark:text-white/70 max-w-md mx-auto mb-6">
              Thank you, <strong className="text-black dark:text-white">{formData.name || "friend"}</strong>. Our lead developer will review your request for <span className="text-neutral-600 dark:text-neutral-400 font-medium">{selectedService}</span> and connect with you on WhatsApp / Email within <strong>2 hours</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-left w-full max-w-md mb-6 space-y-2 text-xs text-black/80 dark:text-white/80">
              <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
                <span className="text-black/50 dark:text-white/50">Next Step:</span>
                <span className="text-black dark:text-white font-medium">15-min discovery call & demo scope</span>
              </div>
              <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
                <span className="text-black/50 dark:text-white/50">Advance Required:</span>
                <span className="text-neutral-600 dark:text-neutral-400 font-mono font-medium">Low Advance (Adjustable)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50 dark:text-white/50">Demo Delivery:</span>
                <span className="text-neutral-600 dark:text-neutral-400 font-mono font-medium">3-5 business days</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="rounded-full bg-black dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
