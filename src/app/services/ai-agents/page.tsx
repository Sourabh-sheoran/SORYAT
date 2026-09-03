"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Database,
  Network,
  Workflow,
  Send,
  MessageSquare,
  Terminal,
  Activity,
} from "lucide-react";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import { AgencyProvider, useAgency } from "@/context/AgencyContext";

const AI_CAPABILITIES = [
  {
    title: "Autonomous Multi-Agent Systems",
    desc: "Deploy specialized agent swarms that coordinate across research, code generation, database querying, and Slack/email notifications using LangGraph & CrewAI.",
    badge: "Multi-Agent Orchestration",
  },
  {
    title: "Enterprise RAG & Document Intelligence",
    desc: "Connect your private PDFs, Notion workspaces, and SQL databases to low-latency vector search with zero hallucination guardrails.",
    badge: "Vector Search + RAG",
  },
  {
    title: "Customer Support & Lead Gen Bots",
    desc: "Human-grade conversational agents deployed to WhatsApp, Telegram, and web chat that qualify prospects and book meetings automatically.",
    badge: "Omnichannel Deployment",
  },
  {
    title: "Autonomous Browser & Tool Agents",
    desc: "Agents that can navigate web interfaces, scrape dynamic data, execute API calls, and perform multi-step back-office workflows autonomously.",
    badge: "Tool Calling & Action",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    name: "Input & Context Ingestion",
    detail: "User prompt, API payload, webhooks, or multi-modal audio/PDF data ingested into the pipeline.",
    icon: Terminal,
  },
  {
    step: "02",
    name: "LLM Reasoning & Plan",
    detail: "Agent decomposes goals, verifies safety guardrails, and creates a deterministic execution plan.",
    icon: Cpu,
  },
  {
    step: "03",
    name: "Tool Execution & Analysis",
    detail: "Agent invokes external APIs, queries vector stores, runs Python code, or fetches web data.",
    icon: Workflow,
  },
  {
    step: "04",
    name: "Synthesized Output & Action",
    detail: "Structured JSON response, completed webhook action, or human-ready formatted answer returned.",
    icon: Zap,
  },
];

function AIAgentsPageContent() {
  const { formatPrice, openBookingWithService } = useAgency();

  // Interactive Live Chatbot Agent Playground State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "agent",
      text: "Hello! I am Nova's Autonomous Agent Assistant. Ask me how we can automate your customer support, data extraction, or internal workflows in 1–2 weeks.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendPrompt = (promptText?: string) => {
    const textToSend = promptText || inputVal;
    if (!textToSend.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    if (!promptText) setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply =
        "Our team can build an end-to-end agent pipeline for that using Next.js, LangGraph, and Gemini 2.5/OpenAI. You can test a working staging demo with a low advance!";
      if (textToSend.toLowerCase().includes("support") || textToSend.toLowerCase().includes("bot")) {
        botReply =
          "We can build an omnichannel support bot for WhatsApp & Web that answers customer queries from your company documentation and syncs leads directly to your CRM.";
      } else if (textToSend.toLowerCase().includes("rag") || textToSend.toLowerCase().includes("document")) {
        botReply =
          "Our Enterprise RAG pipelines process thousands of PDFs and spreadsheets with semantic hybrid search, generating citations with under 400ms latency.";
      }

      setChatMessages((prev) => [...prev, { sender: "agent", text: botReply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="relative z-10 w-full pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <InteractiveConsultationModal />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-black/50 dark:text-white/50 mb-8">
        <Link href="/" className="hover:text-black dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/#services" className="hover:text-black dark:text-white transition-colors">Services</Link>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-400">AI Agent Development</span>
      </div>

      {/* Hero Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
        {/* Left Copy (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-4">
            <Bot size={13} />
            <span>Autonomous Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black dark:text-white leading-tight tracking-tight mb-6">
            Production AI Agents. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-400">
              Deterministic, Fast & Scalable.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-black/75 dark:text-white/75 leading-relaxed mb-8 max-w-xl">
            We architect autonomous AI agent systems, multi-modal workflows, intelligent WhatsApp bots, and enterprise RAG engines that automate business operations 24/7.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => openBookingWithService("AI Agent Development")}
              className="rounded-full bg-black dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
            >
              <span>Build AI Demo (Low Advance)</span>
              <ArrowUpRight size={16} />
            </button>
            <Link
              href="#interactive-demo"
              className="rounded-full border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-all"
            >
              Try Interactive Agent Demo
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-black/10 dark:border-white/10 pt-6">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-black dark:text-white">Custom</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Architecture</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">1–2 Wks</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Sprint Turnaround</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-600 dark:text-neutral-400">Custom</div>
              <div className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase">Staging Advance</div>
            </div>
          </div>
        </div>

        {/* Right Animated Neural Network SVG Visual (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-neutral-600 dark:text-neutral-400 animate-pulse" />
              <span className="font-mono text-xs text-black/80 dark:text-white/80">Neural Workflow Mesh</span>
            </div>
            <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 bg-neutral-400 px-2 py-0.5 rounded border border-neutral-400">
              Live Topology
            </span>
          </div>

          {/* SVG Neural Mesh */}
          <div className="relative w-full aspect-square max-h-[300px] flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full text-black/20 dark:text-white/20" fill="none">
              {/* Connection Beams */}
              <line x1="60" y1="80" x2="200" y2="60" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1.5" className="animate-beam" />
              <line x1="60" y1="150" x2="200" y2="150" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
              <line x1="60" y1="220" x2="200" y2="240" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1.5" className="animate-beam" />
              <line x1="200" y1="60" x2="340" y2="150" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" className="animate-beam" />
              <line x1="200" y1="150" x2="340" y2="150" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
              <line x1="200" y1="240" x2="340" y2="150" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" className="animate-beam" />

              {/* Input Nodes */}
              <circle cx="60" cy="80" r="14" fill="#0c0c0c" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="60" cy="150" r="14" fill="#0c0c0c" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="60" cy="220" r="14" fill="#0c0c0c" stroke="#38bdf8" strokeWidth="2" />

              {/* Processing Nodes */}
              <circle cx="200" cy="60" r="18" fill="#111111" stroke="#22d3ee" strokeWidth="2.5" />
              <circle cx="200" cy="150" r="18" fill="#111111" stroke="#22d3ee" strokeWidth="2.5" />
              <circle cx="200" cy="240" r="18" fill="#111111" stroke="#22d3ee" strokeWidth="2.5" />

              {/* Output Agent Node */}
              <circle cx="340" cy="150" r="22" fill="#0c0c0c" stroke="#34d399" strokeWidth="3" />
            </svg>

            {/* Floating Node Labels */}
            <div className="absolute top-[22%] left-[10%] -translate-x-1/2 text-[9px] font-mono text-black/70 dark:text-white/70">Data Input</div>
            <div className="absolute top-[48%] left-[10%] -translate-x-1/2 text-[9px] font-mono text-black/70 dark:text-white/70">APIs / Web</div>
            <div className="absolute top-[72%] left-[10%] -translate-x-1/2 text-[9px] font-mono text-black/70 dark:text-white/70">CRM Payloads</div>
            <div className="absolute top-[45%] left-[50%] -translate-x-1/2 text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-400">LLM Swarm</div>
            <div className="absolute top-[45%] right-[2%] text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-400">Autonomous Action</div>
          </div>

          <div className="pt-3 border-t border-black/10 dark:border-white/10 text-center font-mono text-[11px] text-black/60 dark:text-white/60">
            Self-healing LangGraph loops with fallback agents
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 — HORIZONTAL 4-STAGE PROCESS FLOW DIAGRAM */}
      {/* ========================================================================= */}
      <section className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 text-neutral-600 dark:text-neutral-400 font-mono text-[11px] uppercase tracking-wider mb-2">
            <Workflow size={13} />
            <span>Deterministic Pipelines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-3">
            How Our AI Agent Pipeline Operates
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            From raw multimodal inputs to verified API execution, every step is logged, evaluated, and deterministic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-neutral-400 transition-all backdrop-blur-xl relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
                      STEP {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center text-black dark:text-white">
                      <Icon size={16} className="text-neutral-600 dark:text-neutral-400" />
                    </div>
                  </div>

                  <h3 className="text-base font-medium text-black dark:text-white mb-2">
                    {step.name}
                  </h3>
                  <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-neutral-600 dark:text-neutral-400 font-bold">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — INTERACTIVE AGENT PLAYGROUND & CAPABILITIES */}
      {/* ========================================================================= */}
      <section id="interactive-demo" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start">
        {/* Left: Interactive Chatbot Widget (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-[#0e0e0e] border border-neutral-400 backdrop-blur-2xl shadow-2xl flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-400 animate-ping" />
                <span className="text-sm font-medium text-black dark:text-white">Nova AI Agent Sandbox</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded">
                Live Interactive Demo
              </span>
            </div>

            {/* Chat History Box */}
            <div className="space-y-3 mb-4 max-h-[260px] overflow-y-auto pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-neutral-400 text-black font-medium rounded-tr-none"
                        : "bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-tl-none border border-black/10 dark:border-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 animate-pulse">
                  Agent reasoning & executing plan...
                </div>
              )}
            </div>

            {/* Preset prompt pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <button
                onClick={() => handleSendPrompt("Build customer support bot on WhatsApp")}
                className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] text-black/70 dark:text-white/70 hover:bg-black/15 dark:hover:bg-white/15 hover:text-black dark:text-white transition-colors"
              >
                + WhatsApp Support Bot
              </button>
              <button
                onClick={() => handleSendPrompt("Connect PDF documents with Vector RAG")}
                className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] text-black/70 dark:text-white/70 hover:bg-black/15 dark:hover:bg-white/15 hover:text-black dark:text-white transition-colors"
              >
                + Enterprise RAG
              </button>
            </div>
          </div>

          {/* Input Bar */}
          <div className="flex items-center gap-2 pt-3 border-t border-black/10 dark:border-white/10">
            <input
              type="text"
              placeholder="Ask the agent about your automation use case..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-xs text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:border-neutral-400"
            />
            <button
              onClick={() => handleSendPrompt()}
              className="p-2.5 rounded-xl bg-neutral-400 text-black font-semibold hover:bg-neutral-400 transition-colors shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Right: Core AI Capabilities (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {AI_CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="p-5 sm:p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/25 dark:border-white/25 backdrop-blur-xl transition-all"
            >
              <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold mb-1">
                {cap.badge}
              </div>
              <h4 className="text-base font-medium text-black dark:text-white mb-1.5">{cap.title}</h4>
              <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/10 via-neutral-400 to-white/10 border border-black/20 dark:border-white/20 backdrop-blur-2xl text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-3">
          Deploy Your Custom AI Agent In 1–2 Weeks
        </h3>
        <p className="text-sm text-black/70 dark:text-white/70 max-w-xl mb-6">
          Only low advance to build and test your working agent on staging. Zero risk, free revisions until your pipeline is production-ready.
        </p>
        <button
          onClick={() => openBookingWithService("AI Agent Development")}
          className="rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
        >
          <span>Kickstart AI Agent Demo (Custom)</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function AIAgentsPage() {
  return (
    <AgencyProvider>
      <AIAgentsPageContent />
    </AgencyProvider>
  );
}
