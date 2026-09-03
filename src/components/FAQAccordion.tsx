"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "PAYMENT & DEMO",
    question: "How does the low advance & Demo-First approach work?",
    answer:
      "Unlike traditional agencies that demand 50% upfront before writing a single line of code, we charge only Custom (~$36 / CAD $50) to start development. We build your core prototype or working staging build within 3–5 days. You click through the live demo, verify the speed and UI on your own devices, and only pay the remaining project milestone when you are 100% satisfied. The Custom is fully credited toward the final invoice, or 100% refundable if you decide not to proceed.",
  },
  {
    category: "REVISIONS",
    question: "What happens if I need changes on the demo?",
    answer:
      "All revisions on the demo are 100% free of charge. Whether you need layout modifications, color refinements, content tweaks, or API adjustments, our engineering team iterates on the live staging environment until the final product completely aligns with your specifications.",
  },
  {
    category: "DELIVERY TIMELINE",
    question: "What is your standard delivery turnaround?",
    answer:
      "Most projects (Next.js web apps, AI agent pipelines, academic research papers, SEO setups) are completed in 1 to 2 weeks (7–14 business days). Content writing batches are turned around in 3 to 5 days. We also offer 48-hour emergency sprint deliveries for time-critical launches.",
  },
  {
    category: "GLOBAL BILLING",
    question: "How do international payments work for Canadian / US clients?",
    answer:
      "We support seamless global invoicing. Clients in Canada and the US can pay in CAD ($) or USD ($) via Stripe, Wise, Interac e-Transfer, or international wire. Clients in India can pay via UPI, NEFT/RTGS, or Corporate Net Banking in INR (₹). Invoices include complete tax documentation (GST / Corporate Tax receipts).",
  },
  {
    category: "MAINTENANCE",
    question: "What is included in the 1-Month Free Maintenance post-launch?",
    answer:
      "Every project includes 30 days of comprehensive post-launch warranty at zero additional cost. This includes bug fixes, server and DNS configuration support, security patch updates, mobile responsiveness checks, and minor copy updates so your launch is smooth and worry-free.",
  },
  {
    category: "CODE OWNERSHIP",
    question: "Do I get full ownership of the source code and intellectual property?",
    answer:
      "Yes, 100%. Upon settlement of the final milestone, we transfer complete ownership of the GitHub repository, Figma design files, deployment credentials, database schemas, and all intellectual property to your team with zero licensing lock-ins.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.question}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-black/10 dark:bg-white/10 border-black/25 dark:border-white/25 shadow-xl shadow-black/40"
                : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:border-white/20"
            }`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shrink-0">
                  {faq.category}
                </span>
                <span className="text-base sm:text-lg font-medium text-black dark:text-white">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-black/60 dark:text-white/60 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-black dark:text-white" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-black/75 dark:text-white/75 leading-relaxed border-t border-black/10 dark:border-white/10">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
