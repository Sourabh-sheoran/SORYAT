"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator,
  ShieldCheck,
  Zap,
  Check,
  ArrowRight,
  Sparkles,
  Sliders,
  Clock,
  HelpCircle,
} from "lucide-react";
import { useAgency } from "@/context/AgencyContext";
import AnimatedCounter from "./AnimatedCounter";

interface ServiceTier {
  id: string;
  name: string;
  basePriceInr: number;
  unit: string;
  minUnits: number;
  maxUnits: number;
  defaultUnits: number;
  unitPriceInr: number;
  turnaroundDays: string;
}

const PRICING_TIERS: Record<string, ServiceTier> = {
  web: {
    id: "web",
    name: "Web Development",
    basePriceInr: 15000,
    unit: "Pages / Views",
    minUnits: 1,
    maxUnits: 15,
    defaultUnits: 4,
    unitPriceInr: 2500,
    turnaroundDays: "7–10 Days",
  },
  ai: {
    id: "ai",
    name: "AI Agent Development",
    basePriceInr: 25000,
    unit: "Custom Tools / Agents",
    minUnits: 1,
    maxUnits: 6,
    defaultUnits: 2,
    unitPriceInr: 6000,
    turnaroundDays: "10–14 Days",
  },
  seo: {
    id: "seo",
    name: "SEO & Growth Retainer",
    basePriceInr: 5000,
    unit: "Target Keywords (Sets of 5)",
    minUnits: 1,
    maxUnits: 10,
    defaultUnits: 3,
    unitPriceInr: 2000,
    turnaroundDays: "Monthly Sprint",
  },
  content: {
    id: "content",
    name: "Content & Copywriting",
    basePriceInr: 2000,
    unit: "Words (in 1,000s)",
    minUnits: 1,
    maxUnits: 20,
    defaultUnits: 3,
    unitPriceInr: 2000,
    turnaroundDays: "3–5 Days",
  },
  research: {
    id: "research",
    name: "Research & Academic Paper",
    basePriceInr: 12000,
    unit: "Pages / Sections",
    minUnits: 4,
    maxUnits: 20,
    defaultUnits: 8,
    unitPriceInr: 1500,
    turnaroundDays: "10–14 Days",
  },
};

const ADDONS = [
  { id: "ai_bot", name: "Embedded AI Chat / Knowledge Agent", priceInr: 8000 },
  { id: "speed_opt", name: "98+ Lighthouse & CWV Guarantee", priceInr: 3000 },
  { id: "admin_cms", name: "Custom Admin Dashboard / CMS", priceInr: 6000 },
  { id: "ext_maint", name: "3-Month Extended Dedicated Maintenance", priceInr: 7000 },
];

export default function PricingCalculator() {
  const { formatPrice, currency, setCurrency, openBookingWithService } = useAgency();

  const [selectedServiceId, setSelectedServiceId] = useState<string>("web");
  const [units, setUnits] = useState<number>(4);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["speed_opt"]);

  const currentTier = PRICING_TIERS[selectedServiceId];

  const handleServiceChange = (id: string) => {
    setSelectedServiceId(id);
    setUnits(PRICING_TIERS[id].defaultUnits);
  };

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const calculatedTotal = useMemo(() => {
    const base = currentTier.basePriceInr;
    const additionalUnits = Math.max(0, units - currentTier.minUnits);
    const unitsCost = additionalUnits * currentTier.unitPriceInr;

    const addonsCost = selectedAddons.reduce((sum, addonId) => {
      const found = ADDONS.find((a) => a.id === addonId);
      return sum + (found ? found.priceInr : 0);
    }, 0);

    return base + unitsCost + addonsCost;
  }, [selectedServiceId, units, selectedAddons, currentTier]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full rounded-3xl bg-white/20 dark:bg-white/5 border border-white/50 dark:border-white/15 p-6 sm:p-10 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-2xl relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 dark:bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/20 dark:bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Calculator size={13} />
            <span>Interactive Investment Estimator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
            Transparent Pricing. No Surprise Invoices.
          </h3>
          <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mt-1">
            Configure your exact scope below. Pay only <strong className="text-black dark:text-white">₹3,000 advance</strong> to build and inspect the live working demo before committing to the full balance.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-black/10 dark:bg-white/10 p-1 rounded-xl border border-black/15 dark:border-white/15">
          <span className="text-xs font-mono text-black/60 dark:text-white/60 px-2">Currency:</span>
          {(["INR", "USD", "CAD"] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                currency === curr
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-black/70 dark:text-white/70 hover:text-black dark:text-white"
              }`}
            >
              {curr === "INR" ? "₹ INR" : curr === "USD" ? "$ USD" : "CA$ CAD"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Scope & Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Service Picker */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-black/80 dark:text-white/80 mb-2">
              1. Choose Service Domain
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(PRICING_TIERS).map((tier) => (
                <motion.button
                  key={tier.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleServiceChange(tier.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedServiceId === tier.id
                      ? "bg-white/60 dark:bg-white text-black font-semibold border-white dark:border-white shadow-lg shadow-white/10"
                      : "bg-white/20 dark:bg-white/5 border-white/40 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-white/40 dark:hover:bg-white/10 backdrop-blur-md"
                  }`}
                >
                  <div className="text-xs font-medium line-clamp-1">{tier.name}</div>
                  <div className="font-mono text-[10px] opacity-70 mt-1">
                    from {formatPrice(tier.basePriceInr)}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Scope Slider */}
          <div className="p-5 rounded-2xl bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono uppercase tracking-wider text-black/80 dark:text-white/80 flex items-center gap-1.5">
                <Sliders size={13} className="text-neutral-600 dark:text-neutral-400" />
                <span>2. Scope Volume ({currentTier.unit})</span>
              </label>
              <span className="font-mono text-base font-bold text-neutral-600 dark:text-neutral-400">
                {units} {currentTier.unit}
              </span>
            </div>

            <input
              type="range"
              min={currentTier.minUnits}
              max={currentTier.maxUnits}
              value={units}
              onChange={(e) => setUnits(parseInt(e.target.value))}
              className="w-full h-2 bg-black/20 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-neutral-400"
            />

            <div className="flex justify-between text-[10px] font-mono text-black/40 dark:text-white/40 mt-2">
              <span>Min: {currentTier.minUnits}</span>
              <span>Baseline: {currentTier.defaultUnits}</span>
              <span>Max: {currentTier.maxUnits}</span>
            </div>
          </div>

          {/* Add-ons Checklist */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-black/80 dark:text-white/80 mb-2">
              3. Optional High-Impact Add-ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <motion.div
                    key={addon.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 backdrop-blur-md ${
                      isSelected
                        ? "bg-white/60 dark:bg-white border-white/60 dark:border-white text-black"
                        : "bg-white/20 dark:bg-white/5 border-white/40 dark:border-white/10 text-black/70 dark:text-white/70 hover:bg-white/40 dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                          isSelected
                            ? "bg-black text-white border-black"
                            : "border-black/30 dark:border-white/30 bg-black/5 dark:bg-white/5"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-medium truncate">{addon.name}</span>
                    </div>
                    <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 font-semibold shrink-0">
                      +{formatPrice(addon.priceInr)}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Quote Summary Card (5 Cols) */}
        <motion.div
          layout
          className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-black/20 dark:border-white/20 backdrop-blur-2xl shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-black/60 dark:text-white/60">
                Estimated Total Quote
              </span>
              <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-black/90 dark:text-white/90 font-mono text-[10px] border border-black/15 dark:border-white/15">
                Demo-First Policy
              </span>
            </div>

            {/* Total Price Display */}
            <div className="mb-4">
              <div className="text-3xl sm:text-4xl font-mono font-bold text-black dark:text-white tracking-tight">
                {formatPrice(calculatedTotal)}
              </div>
              <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                Estimated all-inclusive project cost for {units} {currentTier.unit.toLowerCase()}.
              </p>
            </div>

            {/* Crucial Breakdown Details */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-black/40 dark:bg-white/40 border border-black/10 dark:border-white/10 text-xs mb-6">
              <div className="flex justify-between items-center text-black/80 dark:text-white/80">
                <span className="text-black/60 dark:text-white/60">Starting Advance to Kick Off:</span>
                <span className="font-mono font-bold text-neutral-600 dark:text-neutral-400 text-sm">
                  {formatPrice(3000)}
                </span>
              </div>
              <div className="flex justify-between items-center text-black/80 dark:text-white/80">
                <span className="text-black/60 dark:text-white/60">Balance on Demo Approval:</span>
                <span className="font-mono font-semibold text-black dark:text-white">
                  {formatPrice(calculatedTotal - 3000)}
                </span>
              </div>
              <div className="flex justify-between items-center text-black/80 dark:text-white/80 border-t border-black/10 dark:border-white/10 pt-2">
                <span className="text-black/60 dark:text-white/60 flex items-center gap-1">
                  <Clock size={12} className="text-neutral-600 dark:text-neutral-400" />
                  Estimated Turnaround:
                </span>
                <span className="font-mono font-semibold text-neutral-600 dark:text-neutral-400">
                  {currentTier.turnaroundDays}
                </span>
              </div>
              <div className="flex justify-between items-center text-black/80 dark:text-white/80">
                <span className="text-black/60 dark:text-white/60">Post-Launch Warranty:</span>
                <span className="font-mono font-semibold text-neutral-600 dark:text-neutral-400">
                  30 Days Free
                </span>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openBookingWithService(`${currentTier.name} (${units} ${currentTier.unit})`)}
              className="w-full py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-black/90 dark:hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10 text-sm"
            >
              <span>Kickstart Demo with {formatPrice(3000)}</span>
              <ArrowRight size={16} />
            </motion.button>
            <div className="text-center font-mono text-[10px] text-black/50 dark:text-white/50">
              ✓ Free revisions until you approve the demo • Fully refundable
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
