"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Lock, Mail, KeyRound, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { useAgency } from "@/context/AgencyContext";
import SoryatLogo from "@/components/SoryatLogo";

export default function LoginModal() {
  const pathname = usePathname();
  const {
    isLoggedIn,
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginNotice,
    setLoginNotice,
    loginUser,
    selectedService,
  } = useAgency();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-trigger popup for new visitor after brief delay
  useEffect(() => {
    // Don't auto popup on dedicated login or signup pages
    if (pathname === "/login" || pathname === "/signup") return;
    if (isLoggedIn) return;

    const hasSeenWelcome = sessionStorage.getItem("soryat_welcome_prompt_seen");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        if (!isLoggedIn) {
          sessionStorage.setItem("soryat_welcome_prompt_seen", "true");
          setIsLoginModalOpen(true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname, isLoggedIn, setIsLoginModalOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLoginModalOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoginModalOpen]);

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setLoginNotice(null);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      loginUser(email);
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser("client@soryat.agency", "Demo Client");
    }, 400);
  };

  if (!isLoginModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      {/* Dimmed backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white/95 dark:bg-[#0c0d12]/95 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/40 backdrop-blur-2xl overflow-hidden z-10 text-neutral-900 dark:text-white transition-all">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-500 to-transparent blur-sm" />

        {/* ── Cross Sign Close Button ───────────────────────────────────── */}
        <button
          onClick={handleClose}
          aria-label="Close login popup and view website"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all group focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        >
          <X size={18} className="transition-transform group-hover:rotate-90 duration-200" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" onClick={handleClose} className="mb-4">
              <SoryatLogo className="h-8 w-auto" />
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-3">
              <Lock size={12} className="text-neutral-700 dark:text-neutral-300" />
              <span>Client Portal & Demo Access</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
              {loginNotice ? "Sign In to Access Service" : "Welcome to SORYAT"}
            </h2>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-sm">
              {loginNotice ? (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  {loginNotice}
                </span>
              ) : (
                "Sign in to unlock demo-first staging, live code previews, and direct service consultation."
              )}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                Work Email / Gmail
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Password
                </label>
                <Link
                  href="/login"
                  onClick={handleClose}
                  className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10 dark:shadow-white/10 disabled:opacity-50 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In & Continue</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-amber-500" />
              <span>One-Click Instant Demo Access</span>
            </button>
          </div>

          {/* Bottom Navigation Links */}
          <div className="mt-6 flex flex-col items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 text-center">
            <p>
              Don&#8217;t have an account?{" "}
              <Link
                href="/signup"
                onClick={handleClose}
                className="font-semibold text-black dark:text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                Sign Up Here
              </Link>
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-1 text-[11px] text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 underline"
            >
              Browse website as visitor (Cross to view)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
