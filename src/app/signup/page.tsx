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
import { useAgency } from "@/context/AgencyContext";

// Falcon video asset
const FALCON_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_052122_e77a27e6-17f1-4794-889b-3ceaa0e9e8cb.mp4";

export default function SignUpPage() {
  const { loginUser } = useAgency();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");

  // Email OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState(["", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Step 2 State
  const [occupation, setOccupation] = useState("");
  const [websitePurpose, setWebsitePurpose] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger Send Email OTP
  const handleSendEmailOtp = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setOtpError("Please enter a valid Gmail / Email address.");
      return;
    }
    setOtpError("");
    setOtpSent(true);
    // Auto-fill demo OTP 8492 for convenient testing
    setOtpValue(["8", "4", "9", "2"]);
  };

  // Verify Email OTP
  const handleVerifyEmailOtp = () => {
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
    if (!otpVerified) {
      setErrorMessage("Please verify your email address with the verification code.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  // Handle Final Submission (Account Creation)
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!occupation) {
      setErrorMessage("Please select your occupation.");
      return;
    }
    if (!websitePurpose) {
      setErrorMessage("Please tell us why you need a website.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    // Simulate account provisioning
    setTimeout(() => {
      setIsSubmitting(false);
      loginUser(email, firstName);
      setStep(3);
    }, 900);
  };

  const purposes = [
    { id: "business", label: "Professional / Business Website", desc: "Corporate branding & high-converting agency design" },
    { id: "personal", label: "Personal Brand / Portfolio", desc: "Showcase proof of work, projects, & consulting" },
    { id: "ecommerce", label: "E-Commerce / Online Store", desc: "Sell physical or digital products globally" },
    { id: "startup", label: "AI & SaaS Startup MVP", desc: "Rapid prototype with live LLMs and backend tools" },
    { id: "academic", label: "Academic / Research Publication", desc: "Peer-reviewed paper & academic credentials" },
    { id: "revamp", label: "Website Redesign & SEO Upgrade", desc: "Sub-second speed boost & top search rankings" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#08090c] text-white selection:bg-white/20 selection:text-white">
      
      {/* ── LEFT COLUMN: Cinematic Video & Brand Value ────────────────────── */}
      <div className="lg:w-1/2 relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-65"
          src={FALCON_VIDEO_URL}
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#08090c]" />

        {/* Top Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white text-lg font-semibold tracking-wider">
            <span>SORYAT</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80">
              CLIENT PORTAL
            </span>
          </Link>
        </div>

        {/* Bottom Hero Pitch */}
        <div className="relative z-10 max-w-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono text-white/90">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Email-Verified Client Registration</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-normal leading-tight tracking-tight text-white"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            Create Your Account. <br />
            Experience Demo-First Delivery.
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Join founders, researchers, and enterprises across India, Canada, and global markets. Zero risk with our working demo guarantee.
          </p>

          {/* Value props */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Free Revisions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>1–2 Week Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Low Advance Demo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>NDA Protected</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="relative z-10 text-[11px] text-neutral-500 font-mono">
          © {new Date().getFullYear()} SORYAT DIGITAL EXCELLENCE. All rights reserved.
        </div>
      </div>

      {/* ── RIGHT COLUMN: Multi-Step Sign-up Form ─────────────────────────── */}
      <div className="lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-10 md:p-16 relative">
        <div className="w-full max-w-xl bg-white/90 dark:bg-[#0f1117]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative">
          
          {/* Header Progress Indicators */}
          {step < 3 && (
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10 dark:border-white/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Step {step} of 2
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mt-0.5">
                  {step === 1 ? "Personal & Email Verification" : "Profile & Website Purpose"}
                </h2>
              </div>

              {/* Progress dots */}
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
                <div className="w-6 h-0.5 bg-neutral-300 dark:bg-neutral-700" />
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
              STEP 1: PERSONAL & CONTACT INFORMATION + EMAIL OTP
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

              {/* Gmail / Email with Email Verification Button */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Gmail / Work Email (Email Verification) <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3.5 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sourabh@gmail.com"
                    disabled={otpVerified}
                    className="w-full h-12 pl-10 pr-28 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-80"
                  />

                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendEmailOtp}
                      className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      {otpSent ? "Resend Code" : "Send Code"}
                    </button>
                  )}

                  {otpVerified && (
                    <span className="absolute right-3 flex items-center gap-1 text-xs text-emerald-500 font-medium">
                      <CheckCircle2 size={16} /> Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Email OTP Input Box (Displayed when verification code is sent) */}
              {otpSent && !otpVerified && (
                <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 mt-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      Verification code sent to <b>{email}</b>
                    </p>
                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">Demo Code: 8492</span>
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
                    <p className="text-xs text-red-500 text-center mb-2">{otpError}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleVerifyEmailOtp}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Check size={15} />
                    <span>Confirm & Verify Email</span>
                  </button>
                </div>
              )}

              {/* Mobile Number (Standard contact info, no SMS OTP needed) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Mobile / WhatsApp Number <span className="text-neutral-400 font-normal">(For project delivery updates)</span>
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
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      maxLength={10}
                      placeholder="98765 43210"
                      className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="w-full h-14 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 mt-6 shadow-xl cursor-pointer"
              >
                <span>Continue to Profile & Purpose</span>
                <ArrowRight size={16} />
              </button>

              <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-2">
                Already registered?{" "}
                <Link href="/login" className="font-semibold text-black dark:text-white underline underline-offset-4">
                  Log in
                </Link>
              </p>
            </form>
          )}

          {/* ═════════════════════════════════════════════════════════════════
              STEP 2: OCCUPATION, WEBSITE GOAL & PASSWORD
              ═════════════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              {/* Occupation Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Your Occupation / Role <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Briefcase size={16} className="absolute left-3.5 text-neutral-400 pointer-events-none" />
                  <select
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full h-12 pl-10 pr-8 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none"
                  >
                    <option value="" disabled>Select your occupation</option>
                    <option value="Founder / Business Owner">Founder / Business Owner</option>
                    <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                    <option value="Academician / Researcher">Academician / Researcher</option>
                    <option value="Enterprise Product Lead">Enterprise Product Lead</option>
                    <option value="Agency Owner / Marketer">Agency Owner / Marketer</option>
                    <option value="E-Commerce Brand Operator">E-Commerce Brand Operator</option>
                    <option value="Other Professional">Other Professional</option>
                  </select>
                </div>
              </div>

              {/* Why need website — Interactive Purpose Grid */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Why do you need a website? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {purposes.map((p) => {
                    const isSelected = websitePurpose === p.label;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setWebsitePurpose(p.label)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400 shadow-sm"
                            : "bg-neutral-100/70 dark:bg-white/5 border-neutral-300/80 dark:border-white/10 hover:border-neutral-400 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span>{p.label}</span>
                          {isSelected && <Check size={14} className="text-blue-500" />}
                        </div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                          {p.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3.5 text-neutral-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                      placeholder="••••••••"
                      className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/12 text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 h-14 rounded-full border border-neutral-300 dark:border-white/20 text-xs sm:text-sm font-medium text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 shadow-xl disabled:opacity-50 cursor-pointer"
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
                Your account has been created and your email verified. Our engineering team is ready to deliver your demo-first digital build.
              </p>

              {/* Account Summary Card */}
              <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-left text-xs space-y-2.5 mb-8">
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Account Name:</span>
                  <span className="font-semibold text-black dark:text-white">{firstName} {lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Email (Verified):</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={14} /> {email}
                  </span>
                </div>
                {mobile && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">Mobile:</span>
                    <span className="font-semibold text-black dark:text-white">{countryCode} {mobile}</span>
                  </div>
                )}
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
