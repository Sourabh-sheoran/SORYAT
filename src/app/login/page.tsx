"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAgency } from "@/context/AgencyContext";

// Falcon video — exact URL from login page template
const FALCON_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_052122_e77a27e6-17f1-4794-889b-3ceaa0e9e8cb.mp4";

// Google SVG mark — standard 4-colour
const GoogleMark = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

// Badge lightning/signal glyph
const BadgeGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 582 557" aria-hidden="true" className="shrink-0" style={{ position: "relative", top: "-1px" }}>
    <path
      fillRule="evenodd"
      fill="currentColor"
      d="M449 0 435 0 415 10 200 249 187 276 189 299 212 326 232 332 289 334 289 516 301 543 324 556 346 556 374 536 573 311 582 288 579 264 559 240 539 233 478 230 478 32 470 13ZM442 38 446 250 466 267 540 270 547 285 341 520 332 522 324 514 321 314 307 300 295 297 233 297 224 291 221 282ZM1 67 4 81 17 90 216 90 223 87 232 74 228 57 215 49 18 49 5 57ZM0 285 4 300 17 308 105 308 118 299 121 291 119 278 111 270 103 267 17 267 4 275ZM1 495 4 511 10 517 23 520 179 520 191 516 200 500 196 488 182 479 18 479 9 483Z"
    />
  </svg>
);

// Arrow SVG for login button
const LoginArrow = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
    <path
      d="M3 11h15.4M11 3.3l7.7 7.7-7.7 7.7"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useAgency();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      loginUser(emailInput || "client@soryat.agency");
      router.push("/");
    }, 400);
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const hl1Ref = useRef<HTMLSpanElement>(null);
  const hl2Ref = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const pwRef = useRef<HTMLDivElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const gBtnRef = useRef<HTMLButtonElement>(null);
  const bottomRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Pre-paint guard
    document.documentElement.classList.add("entry-pending");
    const fallback = window.setTimeout(() => {
      document.documentElement.classList.remove("entry-pending");
    }, 3500) as unknown as number;

    // If reduced motion or no WAAPI, bail immediately
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !Element.prototype.animate
    ) {
      document.documentElement.classList.remove("entry-pending");
      clearTimeout(fallback);
      return;
    }

    const compact = window.matchMedia("(max-width: 1023px)").matches;
    const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
    const softEase = "cubic-bezier(0.22, 1, 0.36, 1)";

    let animations: Animation[] = [];

    function releaseEntrance() {
      clearTimeout(fallback);
    }

    function runTimeline() {
      const card = cardRef.current;
      const badge = badgeRef.current;
      const hl1 = hl1Ref.current;
      const hl2 = hl2Ref.current;
      const h1 = h1Ref.current;
      const sub = subRef.current;
      const email = emailRef.current;
      const pw = pwRef.current;
      const loginBtn = loginBtnRef.current;
      const divider = dividerRef.current;
      const gBtn = gBtnRef.current;
      const bottom = bottomRef.current;

      if (!card || !badge || !hl1 || !hl2 || !h1 || !sub || !email || !pw || !loginBtn || !divider || !gBtn || !bottom) return;

      const cardFrom: Keyframe = compact
        ? { opacity: 0, transform: "translateY(16px)" }
        : { opacity: 0, transform: "translateY(14px) scale(0.985)" };

      const hlFrom: Keyframe = {
        opacity: 0,
        transform: `translateY(${compact ? 12 : 16}px)`,
        clipPath: "inset(100% 0 0 0)",
      };
      const hlTo: Keyframe = { opacity: 1, transform: "none", clipPath: "inset(0 0 0 0)" };
      const stdTo: Keyframe = { opacity: 1, transform: "none" };

      type TimelineEntry = [Element, Keyframe, Keyframe, number, number, string];
      const timeline: TimelineEntry[] = [
        [card,     cardFrom,                                             stdTo,  40,   800, ease],
        [badge,    { opacity: 0, transform: "translateY(8px)" } as Keyframe,  stdTo, 120,  480, softEase],
        [hl1,      hlFrom,                                               hlTo,  240,  740, ease],
        [hl2,      hlFrom,                                               hlTo,  330,  740, ease],
        [h1,       { opacity: 0, transform: "translateY(10px)" } as Keyframe, stdTo, 470,  600, ease],
        [sub,      { opacity: 0, transform: "translateY(10px)" } as Keyframe, stdTo, 570,  540, ease],
        [email,    { opacity: 0, transform: "translateY(8px)" } as Keyframe,  stdTo, 700,  500, softEase],
        [pw,       { opacity: 0, transform: "translateY(8px)" } as Keyframe,  stdTo, 770,  500, softEase],
        [loginBtn, { opacity: 0, transform: "translateY(8px)" } as Keyframe,  stdTo, 900,  540, ease],
        [divider,  { opacity: 0, transform: "translateY(6px)" } as Keyframe,  stdTo, 1020, 420, softEase],
        [gBtn,     { opacity: 0, transform: "translateY(8px)" } as Keyframe,  stdTo, 1100, 520, ease],
        [bottom,   { opacity: 0, transform: "translateY(6px)" } as Keyframe,  stdTo, 1200, 480, softEase],
      ];

      document.documentElement.classList.remove("entry-pending");

      animations = timeline
        .map(([el, from, to, delay, duration, easing]) => {
          if (!el) return null as unknown as Animation;
          return el.animate([from as Keyframe, to as Keyframe], { delay, duration, easing, fill: "both" });
        })
        .filter(Boolean);

      Promise.allSettled(animations.map((a) => a.finished)).then(() => {
        animations.forEach((a) => a.cancel());
        animations = [];
        releaseEntrance();
      });
    }

    const race = Promise.race([
      document.fonts.ready,
      new Promise<void>((r) => setTimeout(r, 650)),
    ]);

    race.then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          runTimeline();
        });
      });
    });

    return () => {
      animations.forEach((a) => a.cancel && a.cancel());
      clearTimeout(fallback);
      document.documentElement.classList.remove("entry-pending");
    };
  }, []);

  return (
    <>
      <style>{`
        /* Pre-paint guard: elements hidden before WAAPI takes over */
        html.entry-pending .card,
        html.entry-pending .login-badge,
        html.entry-pending .login-hl,
        html.entry-pending .login-h1,
        html.entry-pending .login-sub,
        html.entry-pending .login-field,
        html.entry-pending .login-btn,
        html.entry-pending .login-divider,
        html.entry-pending .login-gbtn,
        html.entry-pending .login-bottom {
          opacity: 0 !important;
        }

        .login-page-stage {
          position: fixed;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          background: #f4f5f7;
          transition: background-color 0.3s ease;
        }
        .dark .login-page-stage {
          background: #080a0f;
        }

        /* ── Left photo/video column ── */
        .login-photo {
          position: relative;
          width: 55%;
          min-height: 100vh;
          overflow: hidden;
        }
        .login-photo video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 100% 50%;
        }
        .login-photo-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%);
          pointer-events: none;
        }

        .login-hero {
          position: absolute;
          left: clamp(24px, 4vw, 56px);
          bottom: clamp(32px, 5vw, 64px);
          max-width: 600px;
          z-index: 10;
          pointer-events: none;
        }
        .login-badge {
          display: inline-flex;
          align-items: center;
          height: 38px;
          padding: 0 18px 0 16px;
          border-radius: 999px;
          background: rgba(24, 27, 34, 0.85);
          backdrop-filter: blur(12px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          color: #ffffff;
          white-space: nowrap;
          gap: 10px;
          font-size: 13.5px;
          margin-bottom: 20px;
        }

        .login-hl {
          display: block;
          font-family: var(--font-instrument), serif;
          line-height: 1.05;
          font-size: clamp(48px, 5.2vw, 76px);
          letter-spacing: -0.03em;
          color: #ffffff;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
        }

        /* ── Right login pane ── */
        .login-pane {
          position: relative;
          width: 45%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 84px 32px 36px;
          box-sizing: border-box;
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 520px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(30px) saturate(160%);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .dark .card {
          background: rgba(18, 22, 30, 0.88);
          backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .card-in {
          position: relative;
          width: 100%;
          padding: clamp(28px, 3.5vw, 44px) clamp(24px, 3.5vw, 48px);
          display: flex;
          flex-direction: column;
        }

        .login-h1 {
          font-size: clamp(34px, 3vw, 44px);
          font-family: var(--font-instrument), serif;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #111827;
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }
        .dark .login-h1 {
          color: #ffffff;
        }

        .login-sub {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 26px;
          line-height: 1.4;
          transition: color 0.3s ease;
        }
        .dark .login-sub {
          color: #9ca3af;
        }
        .login-sub b {
          color: #111827;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .dark .login-sub b {
          color: #ffffff;
        }

        .login-field {
          width: 100%;
          height: 58px;
          border-radius: 14px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          margin-bottom: 14px;
          transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .login-email {
          background: #f9fafb;
          border: 1.5px solid #d1d5db;
        }
        .dark .login-email {
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid rgba(255, 255, 255, 0.14);
        }
        .login-pw {
          background: #f9fafb;
          border: 1.5px solid #e5e7eb;
        }
        .dark .login-pw {
          background: rgba(255, 255, 255, 0.04);
          border: 1.5px solid rgba(255, 255, 255, 0.12);
        }

        .login-field:focus-within {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
        }
        .dark .login-field:focus-within {
          border-color: #60a5fa !important;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.22);
        }

        .login-field input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 16px;
          color: #111827;
        }
        .dark .login-field input {
          color: #ffffff;
        }
        .login-field input::placeholder {
          color: #9ca3af;
        }
        .dark .login-field input::placeholder {
          color: #6b7280;
        }

        .login-btn {
          width: 100%;
          height: 58px;
          border-radius: 999px;
          background: #111827;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          margin-top: 10px;
          margin-bottom: 20px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
          transition: transform 0.18s cubic-bezier(0.2, 0.7, 0.3, 1), box-shadow 0.18s ease, filter 0.18s ease;
        }
        .dark .login-btn {
          background: #ffffff;
          color: #090a0f;
          box-shadow: 0 10px 30px -5px rgba(255, 255, 255, 0.2);
        }
        .login-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        .login-btn:active {
          transform: translateY(1px);
        }

        .login-divider {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .login-divider i {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }
        .dark .login-divider i {
          background: rgba(255, 255, 255, 0.12);
        }
        .login-divider b {
          font-size: 12px;
          font-weight: 700;
          color: #9ca3af;
          letter-spacing: 1.2px;
        }
        .dark .login-divider b {
          color: #6b7280;
        }

        .login-gbtn {
          width: 100%;
          height: 56px;
          border-radius: 999px;
          background: #ffffff;
          border: 1.5px solid #d1d5db;
          color: #1f2937;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 24px;
          transition: background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }
        .dark .login-gbtn {
          background: rgba(255, 255, 255, 0.06);
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }
        .login-gbtn:hover {
          background: #f9fafb;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }
        .dark .login-gbtn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .login-gbtn:active {
          transform: translateY(1px);
        }

        .login-bottom {
          text-align: center;
          font-size: 15px;
          color: #4b5563;
          transition: color 0.3s ease;
        }
        .dark .login-bottom {
          color: #9ca3af;
        }
        .login-bottom a {
          color: #111827;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.3s ease;
        }
        .dark .login-bottom a {
          color: #ffffff;
        }

        /* ── Responsive adjustments (< 1024px) ── */
        @media (max-width: 1023px) {
          .login-page-stage {
            flex-direction: column;
            position: relative;
            min-height: 100svh;
          }
          .login-photo {
            width: 100%;
            height: clamp(260px, 36vh, 340px);
            min-height: unset;
          }
          .login-hero {
            left: 24px;
            bottom: 24px;
          }
          .login-hl {
            font-size: clamp(34px, 7vw, 46px);
          }
          .login-pane {
            width: 100%;
            min-height: unset;
            padding: 24px 20px 48px;
          }
          .card {
            max-width: 500px;
          }
        }
      `}</style>

      <div className="login-page-stage">
        {/* ── LEFT: Photo / Video Column ───────────────────────────────────── */}
        <section className="login-photo">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Peregrine falcon in a high-speed dive — hero visual"
          >
            <source src={FALCON_VIDEO_URL} type="video/mp4" />
          </video>

          {/* Scrim for contrast */}
          <div className="login-photo-scrim" />

          {/* Hero copy overlay */}
          <div className="login-hero" aria-hidden="true">
            <div ref={badgeRef} className="login-badge">
              <BadgeGlyph />
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13.5px" }}>
                Built for fast-moving teams
              </span>
            </div>
            <div>
              <span ref={hl1Ref} className="login-hl">Find Signal to Action</span>
              <span ref={hl2Ref} className="login-hl">Instantly</span>
            </div>
          </div>
        </section>

        {/* ── RIGHT: Pane / Login Card ──────────────────────────────────────── */}
        <section className="login-pane">
          <div ref={cardRef} className="card">
            <div className="card-in">
              <h1 ref={h1Ref} className="login-h1">Welcome Back!</h1>
              <p ref={subRef} className="login-sub">
                <b>Log in</b> to continue monitoring your signals.
              </p>

              <form onSubmit={handleFormSubmit}>
                {/* Email field */}
                <div ref={emailRef} className="login-field login-email">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    autoComplete="email"
                    aria-label="Email address"
                    placeholder="Eg. johndoe@gmail.com"
                  />
                </div>

                {/* Password field */}
                <div ref={pwRef} className="login-field login-pw">
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    autoComplete="current-password"
                    aria-label="Password"
                    placeholder="Password"
                  />
                </div>

                {/* Login button */}
                <button ref={loginBtnRef} type="submit" disabled={isSubmitting} className="login-btn">
                  <span>{isSubmitting ? "Logging in..." : "Login"}</span>
                  <LoginArrow />
                </button>
              </form>

              {/* OR Divider */}
              <div ref={dividerRef} className="login-divider">
                <i />
                <b>OR</b>
                <i />
              </div>

              {/* Google Sign-in */}
              <button ref={gBtnRef} type="button" className="login-gbtn">
                <GoogleMark />
                <span>Sign in with Google</span>
              </button>

              {/* Footer copy */}
              <p ref={bottomRef} className="login-bottom">
                Don&#8217;t have an account?{" "}
                <Link href="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
