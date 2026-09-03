"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ChevronDown, ArrowUpRight, ShieldCheck, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useAgency, Currency } from "@/context/AgencyContext";
import ThemeToggle from "@/components/ThemeToggle";
import SoryatLogo from "@/components/SoryatLogo";

export default function Navbar() {
  const pathname = usePathname();
  const {
    currency,
    setCurrency,
    setIsConsultationOpen,
    isLoggedIn,
    user,
    logoutUser,
    setIsLoginModalOpen,
  } = useAgency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const useThemeColors = true;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services", isServices: true },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceSublinks = [
    { name: "Full-Stack Web Development", href: "/services/web-development", tag: "From ₹15k" },
    { name: "AI Agent Development", href: "/services/ai-agents", tag: "Custom" },
    { name: "SEO & Growth Marketing", href: "/services/seo", tag: "From ₹5k/mo" },
    { name: "Research Papers", href: "/services/research-papers", tag: "₹10k–₹30k" },
    { name: "Content Writing", href: "/services/content-analytics", tag: "₹2k/1k words" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isAuthPage
          ? "bg-white/85 dark:bg-black/85 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">

        {/* ── Official Company Logo ───────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md py-1"
          aria-label="SORYAT Home"
        >
          <SoryatLogo className="h-7 sm:h-8 w-auto" priority />
        </Link>

        {/* ── Desktop Center Links ────────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.isServices) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  useThemeColors ? "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" : "text-white/70 hover:text-white"
                } py-1 focus:outline-none`}>
                    {link.name}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${useThemeColors ? "text-black/50 dark:text-white/50" : "text-white/50"} ${servicesDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-1.5 rounded-2xl bg-white/95 dark:bg-[#111]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/80">
                      <div className="px-3 py-2 border-b border-black/10 dark:border-white/10 mb-1 flex items-center justify-between">
                        <span className="text-xs text-black/50 dark:text-white/50">Services</span>
                        <span className="flex items-center gap-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                          <ShieldCheck size={11} />
                          Demo-First
                        </span>
                      </div>
                      {serviceSublinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center px-3 py-2.5 rounded-xl hover:bg-black/8 dark:hover:bg-white/8 transition-colors group"
                        >
                          <span className="text-sm text-black/85 dark:text-white/85 group-hover:text-black dark:text-white transition-colors">
                            {sub.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors ${
                  useThemeColors 
                    ? (pathname === link.href ? "text-black dark:text-white" : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white")
                    : (pathname === link.href ? "text-white" : "text-white/70 hover:text-white")
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ── Right: Currency + Sign Up + Login ──────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Currency toggle — minimal, no mono styling */}
          <div className={`hidden sm:flex items-center gap-0.5 rounded-lg p-0.5 ${
            useThemeColors ? "bg-black/8 dark:bg-white/8" : "bg-white/10"
          }`}>
            {(["INR", "USD", "CAD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                  currency === c
                    ? "bg-white text-black font-semibold"
                    : useThemeColors ? "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {c === "INR" ? "₹" : c === "USD" ? "$" : "CA$"}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          {mounted && <ThemeToggle scrolled={useThemeColors} />}

          {/* Sign Up / Login or User Session */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-green-500/10 border border-green-500/25 text-green-600 dark:text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {user?.name || "Client"}
              </span>
              <button
                onClick={logoutUser}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  useThemeColors
                    ? "text-neutral-600 dark:text-neutral-300 border-black/20 dark:border-white/20 hover:border-black/50 dark:hover:border-white/50"
                    : "text-white/80 border-white/20 hover:border-white/50"
                }`}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/signup"
                className={`hidden sm:block text-sm transition-colors px-2 py-1 ${
                  useThemeColors
                    ? "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Sign Up
              </Link>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`text-sm font-medium px-5 py-2 rounded-full border transition-all cursor-pointer ${
                  useThemeColors
                    ? "text-black dark:text-white border-black/30 dark:border-white/30 hover:border-black/70 dark:hover:border-white/70 hover:bg-black/5 dark:hover:bg-white/10"
                    : "text-white border-black/30 dark:border-white/30 hover:border-black/70 dark:hover:border-white/70 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                Login
              </button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              useThemeColors ? "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10" : "text-white hover:bg-black/10 dark:hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 px-6 py-6">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-base border-b border-black/8 dark:border-white/8 ${
                  pathname === link.href ? "text-black dark:text-white font-medium" : "text-black/70 dark:text-white/70 hover:text-black dark:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); setIsConsultationOpen(true); }}
                className="w-full py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Free Demo <ArrowUpRight size={15} />
              </button>
              {isLoggedIn ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); logoutUser(); }}
                  className="w-full py-3 rounded-full border border-red-500/30 text-red-500 text-sm text-center hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  Sign Out ({user?.name || "Client"})
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-full border border-black/25 dark:border-white/25 text-black dark:text-white text-sm text-center hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                  >
                    Sign Up
                  </Link>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setIsLoginModalOpen(true); }}
                    className="py-3 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm text-center hover:bg-black/20 dark:hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
