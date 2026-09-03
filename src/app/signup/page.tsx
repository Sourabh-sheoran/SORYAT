"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Mail,
  User,
  Briefcase,
  Globe,
  Lock,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Check,
} from "lucide-react";

// Falcon video asset
const FALCON_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_052122_e77a27e6-17f1-4794-889b-3ceaa0e9e8cb.mp4";

const GoogleMark = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

export default function SignUpPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState(["", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  // Step 2 State
  const [occupation, setOccupation] = useState("");
  const [websitePurpose, setWebsitePurpose] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger Send OTP
  const handleSendOtp = () => {
    if (!mobile || mobile.length < 10) {
      setOtpError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpError("");
    setOtpSent(true);
    // Auto-fill demo OTP 7294 for convenience
    setOtpValue(["7", "2", "9", "4"]);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    const code = otpValue.join("");
    if (code.length < 4) {
      setOtpError("Please enter the complete 4-digit code.");
      return;
    }
    setOtpVerified(true);
    setOtpError("");
  };

  // Move to Step 2
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please enter your first and last name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid Gmail / Email address.");
      return;
    }
    if (!mobile.trim() || mobile.length < 10) {
      setErrorMessage("Please enter your valid mobile number.");
      return;
    }
    if (!otpVerified) {
      setErrorMessage("Please verify your mobile number with the OTP.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  // Final Registration
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!occupation) {
      setErrorMessage("Please select your occupation.");
      return;
    }
    if (!websitePurpose) {
      setErrorMessage("Please select why you need a website.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success Screen
    }, 900);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f4f5f7] dark:bg-[#080a0f] transition-colors duration-300 relative overflow-x-hidden">
      {/* ── LEFT: Cinematic Media Column (Desktop) ────────────────────────── */}
      <div className="hidden lg:block relative w-[46%] min-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={FALCON_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />

        {/* Left Floating Content */}
        <div className="absolute bottom-12 left-10 right-10 z-10 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-6">
            <Sparkles size={14} className="text-amber-400" />
            <span>Join 500+ Businesses Building With SORYAT</span>
          </div>
          <h2
            className="text-4xl xl:text-5xl font-normal leading-[1.1] mb-4 text-white drop-shadow-md"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            Start Your Digital Journey With Demo-First Precision.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-lg">
            Experience high-performance web development, autonomous AI workflows, and SEO dominance. Zero upfront risk — review your live demo before paying in full.
          </p>
        </div>
      </div>

      {/* ── RIGHT: Form Card Column ────────────────────────────────────────── */}
      <div className="w-full lg:w-[54%] min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 xl:px-16">
        <div className="w-full max-w-xl rounded-3xl bg-white/95 dark:bg-[#12161e]/90 backdrop-blur-2xl border border-black/8 dark:border-white/12 shadow-2xl p-6 sm:p-10 transition-all duration-300">

          {/* Stepper Header */}
          {step < 3 && (
            <div className="flex items-center justify-between border-b border-black/8 dark:border-white/10 pb-6 mb-8">
              <div>
                <h1
                  className="text-3xl sm:text-4xl font-normal text-black dark:text-white"
                  style={{ fontFamily: "var(--font-instrument), serif" }}
                >
                  Create Your Account
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {step === 1 ? "Step 1 of 2: Personal & Contact Information" : "Step 2 of 2: Profile & Website Requirements"}
                </p>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                    step >= 1
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
                  }`}
                >
                  1
                </span>
                <span className="w-4 h-0.5 bg-neutral-300 dark:bg-neutral-700" />
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                    step >= 2
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
                  }`}
                >
                  2
                </span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════
              STEP 1: PERSONAL & CONTACT INFORMATION + MOBILE OTP
              ═════════════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <form onSubmit={handleProceedToStep2} className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-3.5 text-neutral-400" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Sourabh"
                      className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-3.5 text-neutral-400" />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Sheoran"
                      className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Gmail / Email */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Gmail / Work Email <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3.5 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sourabh@gmail.com"
                    className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Mobile Number + OTP Trigger */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Mobile Number (OTP Verification) <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-12 px-2.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-xs font-medium text-black dark:text-white focus:outline-none shrink-0"
                  >
                    <option value="+91">🇮🇳 +91 (IN)</option>
                    <option value="+1">🇨🇦 +1 (CA/US)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+971">🇦🇪 +971 (UAE)</option>
                  </select>

                  <div className="relative flex-1 flex items-center">
                    <Smartphone size={16} className="absolute left-3.5 text-neutral-400" />
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      maxLength={10}
                      placeholder="98765 43210"
                      disabled={otpVerified}
                      className="w-full h-12 pl-10 pr-20 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-80"
                    />

                    {!otpVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        {otpSent ? "Resend" : "Send OTP"}
                      </button>
                    )}

                    {otpVerified && (
                      <span className="absolute right-3 flex items-center gap-1 text-xs text-emerald-500 font-medium">
                        <CheckCircle2 size={16} /> Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* OTP Input Box (Displayed when OTP is sent) */}
              {otpSent && !otpVerified && (
                <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 mt-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      OTP sent to <b>{countryCode} {mobile}</b>
                    </p>
                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">Demo: 7294</span>
                  </div>

                  <div className="flex gap-2.5 my-3 justify-center">
                    {otpValue.map((digit, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const next = [...otpValue];
                          next[i] = e.target.value;
                          setOtpValue(next);
                        }}
                        className="w-12 h-12 text-center text-lg font-bold rounded-xl bg-white dark:bg-black/60 border border-blue-400/40 text-black dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    ))}
                  </div>

                  {otpError && (
                    <p className="text-xs text-red-500 text-center mb-2 font-medium">{otpError}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full h-10 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Confirm & Verify OTP
                  </button>
                </div>
              )}

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full h-14 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 mt-6 shadow-xl"
              >
                <span>Continue to Profile Details</span>
                <ArrowRight size={16} />
              </button>

              {/* Google Alternative */}
              <div className="pt-3">
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-[1px] bg-neutral-200 dark:bg-white/10" />
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Or</span>
                  <div className="flex-1 h-[1px] bg-neutral-200 dark:bg-white/10" />
                </div>

                <button
                  type="button"
                  className="w-full h-12 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/5 text-neutral-800 dark:text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-3 hover:bg-neutral-50 dark:hover:bg-white/10 transition-colors"
                >
                  <GoogleMark />
                  <span>Sign up with Google</span>
                </button>
              </div>

              {/* Existing Account Link */}
              <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-3">
                Already have an account?{" "}
                <Link href="/login" className="text-black dark:text-white font-semibold underline underline-offset-4">
                  Log in
                </Link>
              </p>
            </form>
          )}

          {/* ═════════════════════════════════════════════════════════════════
              STEP 2: OCCUPATION, WEBSITE PURPOSE & PASSWORD
              ═════════════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              {/* Occupation Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Your Occupation / Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-3.5 text-neutral-400" />
                  <select
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="" disabled>Select your occupation</option>
                    <option value="Founder / Business Owner">Founder / Business Owner</option>
                    <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                    <option value="Academician / Researcher">Academician / Researcher / Student</option>
                    <option value="Enterprise / Corporate Lead">Enterprise / Corporate Lead</option>
                    <option value="Agency Owner / Marketer">Agency Owner / Marketer</option>
                    <option value="Other">Other Profession</option>
                  </select>
                </div>
              </div>

              {/* Why Need Website / Purpose */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Why Do You Need A Website? (Purpose) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "professional", label: "Professional / Business", desc: "For company, agency or clients" },
                    { id: "personal", label: "Personal / Portfolio", desc: "For resume, showcase, creator" },
                    { id: "ecommerce", label: "E-Commerce / Sales", desc: "Sell physical or digital products" },
                    { id: "ai-startup", label: "AI & SaaS Startup", desc: "Custom web app or AI workflows" },
                    { id: "academic", label: "Academic / Research", desc: "Papers, journal & publication" },
                    { id: "redesign", label: "Revamp / SEO Upgrade", desc: "Modernize existing outdated site" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setWebsitePurpose(p.label)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        websitePurpose === p.label
                          ? "border-black dark:border-white bg-black/5 dark:bg-white/10 ring-1 ring-black dark:ring-white"
                          : "border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 bg-neutral-50 dark:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-black dark:text-white">{p.label}</span>
                        {websitePurpose === p.label && <Check size={14} className="text-blue-500" />}
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Create Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3.5 text-neutral-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3.5 text-neutral-400" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 h-14 rounded-full border border-neutral-300 dark:border-white/20 text-xs sm:text-sm font-medium text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete & Create Account</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ═════════════════════════════════════════════════════════════════
              STEP 3: ACCOUNT CREATED SUCCESS CONFIRMATION
              ═════════════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div className="text-center py-6 animate-in zoom-in-95 duration-400">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={32} />
              </div>

              <h2
                className="text-3xl sm:text-4xl font-normal text-black dark:text-white mb-2"
                style={{ fontFamily: "var(--font-instrument), serif" }}
              >
                Welcome to SORYAT, {firstName}!
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
                Your account has been created and verified. Our engineering team is ready to deliver your demo-first digital build.
              </p>

              {/* Account Summary Card */}
              <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-left text-xs space-y-2.5 mb-8">
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Account Name:</span>
                  <span className="font-semibold text-black dark:text-white">{firstName} {lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Gmail:</span>
                  <span className="font-semibold text-black dark:text-white">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Mobile (Verified):</span>
                  <span className="font-semibold text-black dark:text-white">{countryCode} {mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Occupation:</span>
                  <span className="font-semibold text-black dark:text-white">{occupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Website Purpose:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{websitePurpose}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="flex-1 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <span>Proceed to Login</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/"
                  className="flex-1 h-12 rounded-full border border-neutral-300 dark:border-white/15 text-xs sm:text-sm font-medium text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors"
                >
                  Explore Agency Services
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
