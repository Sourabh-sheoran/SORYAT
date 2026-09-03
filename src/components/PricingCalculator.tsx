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
      className="w-full rounded-3xl bg-white/95 dark:bg-[#0f1117]/90 border border-neutral-200 dark:border-white/15 p-6 sm:p-10 backdrop-blur-2xl shadow-xl relative overflow-hidden text-neutral-900 dark:text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/15 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Calculator size={13} />
            <span>Interactive Investment Estimator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            Custom Project Scope & Pricing Calculator
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mt-1">
            Configure deliverables and add-ons in real time. We never ask for full upfront commitment—just ₹3,000 to launch development.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-white/10 p-1 rounded-xl border border-neutral-200 dark:border-white/10 shrink-0">
          {(["INR", "USD", "CAD"] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                currency === curr
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {curr === "INR" ? "₹ INR" : curr === "USD" ? "$ USD" : "CA$ CAD"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configurator Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Select Core Service Tier */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
              1. Choose Service Architecture
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(PRICING_TIERS).map((key) => {
                const isSelected = selectedServiceId === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleServiceChange(key)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-md"
                        : "bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">
                      {PRICING_TIERS[key].name}
                    </div>
                    <div className={`text-[11px] font-mono mt-1 ${isSelected ? "text-neutral-300 dark:text-neutral-700" : "text-neutral-500 dark:text-neutral-400"}`}>
                      from {formatPrice(PRICING_TIERS[key].basePriceInr)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Interactive Slider for Units */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/80 dark:border-white/10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-bold">
                2. Scope Volume ({currentTier.unit})
              </label>
              <span className="font-mono text-base font-bold text-neutral-950 dark:text-white px-2.5 py-0.5 rounded-lg bg-neutral-200 dark:bg-white/10 border border-neutral-300 dark:border-white/10">
                {units} {currentTier.unit}
              </span>
            </div>

            <input
              type="range"
              min={currentTier.minUnits}
              max={currentTier.maxUnits}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />

            <div className="flex justify-between text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-2">
              <span>Min: {currentTier.minUnits} {currentTier.unit.toLowerCase()}</span>
              <span>Max: {currentTier.maxUnits} {currentTier.unit.toLowerCase()}</span>
            </div>
          </div>

          {/* 3. Optional Add-ons Toggle Grid */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
              3. Optional High-Impact Add-Ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <motion.div
                    key={addon.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 shadow-sm ${
                      isSelected
                        ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-md"
                        : "bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                          isSelected
                            ? "bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white border-white dark:border-neutral-950"
                            : "border-neutral-400 dark:border-white/30 bg-white dark:bg-black/30"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-semibold truncate">{addon.name}</span>
                    </div>
                    <span className={`font-mono text-xs font-bold shrink-0 ${isSelected ? "text-neutral-200 dark:text-neutral-800" : "text-neutral-700 dark:text-neutral-300"}`}>
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
          className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/15 backdrop-blur-2xl shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10 mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-bold">
                Estimated Total Quote
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                Demo-First Policy
              </span>
            </div>

            {/* Total Price Display */}
            <div className="mb-4">
              <div className="text-3xl sm:text-4xl font-mono font-bold text-neutral-950 dark:text-white tracking-tight">
                {formatPrice(calculatedTotal)}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Estimated all-inclusive project cost for {units} {currentTier.unit.toLowerCase()}.
              </p>
            </div>

            {/* Crucial Breakdown Details */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-white dark:bg-black/40 border border-neutral-200 dark:border-white/10 text-xs mb-6 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400 font-medium">Starting Advance to Kick Off:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatPrice(3000)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400 font-medium">Balance on Demo Approval:</span>
                <span className="font-mono font-semibold text-neutral-950 dark:text-white">
                  {formatPrice(calculatedTotal - 3000)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-neutral-200 dark:border-white/10 pt-2">
                <span className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1 font-medium">
                  <Clock size={12} className="text-neutral-500 dark:text-neutral-400" />
                  Estimated Turnaround:
                </span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-200">
                  {currentTier.turnaroundDays}
                </span>
              </div>
            </div>

            {/* Perks included */}
            <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-6">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Working prototype deployed on live URL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>Free revisions until 100% demo satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>30-day post-launch technical warranty</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openBookingWithService(`${currentTier.name} (Estimate: ${formatPrice(calculatedTotal)})`)}
            className="w-full py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-neutral-100 transition-all shadow-xl cursor-pointer"
          >
            <span>Kickstart Demo with {formatPrice(3000)}</span>
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
