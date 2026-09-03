"use client";

import React, { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4";

export default function HeroDayScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    // Only active in light mode
    if (document.documentElement.classList.contains("dark")) return;

    const vid = videoRef.current;
    const container = document.getElementById("hero-pin-container");
    if (!vid || !container) return;

    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "auto";
    vid.pause();

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const scrolled = -rect.top;
      const scrollable = containerHeight - window.innerHeight;

      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);
      targetProgressRef.current = progress;

      // Update text opacity and subtle upward translation as scrolling starts
      const textEl = document.getElementById("hero-text-content");
      if (textEl) {
        const textOpacity = Math.max(1 - progress * 3.2, 0);
        textEl.style.opacity = textOpacity.toFixed(3);
        textEl.style.transform = `translateY(-${(progress * 45).toFixed(1)}px)`;
        textEl.style.pointerEvents = textOpacity < 0.05 ? "none" : "auto";
      }
    };

    // Responsive, high-frequency RAF loop that directly directs video playback from scroll
    const tick = () => {
      if (vid.duration) {
        // Fast responsive interpolation (0.35 factor) for fluid, instantaneous scroll scrubbing
        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.0005) {
          currentProgressRef.current += diff * 0.35;
          vid.currentTime = currentProgressRef.current * vid.duration;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleLoadedData = () => {
      vid.currentTime = 0.001;
      setVideoLoaded(true);
      onScroll();
    };

    vid.addEventListener("loadeddata", handleLoadedData);
    if (vid.readyState >= 2) {
      handleLoadedData();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      vid.removeEventListener("loadeddata", handleLoadedData);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 block dark:hidden w-full h-full overflow-hidden"
      style={{ backgroundColor: "#e7e7e9" }}
    >
      {/* Full-width, edge-to-edge covering video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
          videoLoaded ? "opacity-100" : "opacity-95"
        }`}
        src={VIDEO_URL}
      />
    </div>
  );
}
