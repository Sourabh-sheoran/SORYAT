"use client";

import { useEffect, useRef } from "react";

const WAVE_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

export default function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateOpacity = () => {
      const heroH = window.innerHeight;
      // Starts fading in at 60% of hero height, fully visible by 100%
      const progress = Math.min(
        Math.max((window.scrollY - heroH * 0.6) / (heroH * 0.4), 0),
        1
      );
      el.style.opacity = (progress * 0.45).toString();
    };

    window.addEventListener("scroll", updateOpacity, { passive: true });
    updateOpacity(); // run once on mount

    return () => window.removeEventListener("scroll", updateOpacity);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none hidden dark:block"
      style={{ opacity: 0 }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover pointer-events-none"
        src={WAVE_URL}
      />
    </div>
  );
}
