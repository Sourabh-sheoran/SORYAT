"use client";

import React, { useEffect, useRef, useState } from "react";

// Cinematic hero video from hero page .txt template
const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4";

// Particle data type
interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
}

/**
 * ScrollScrubVideo
 *
 * Full-screen cinematic video background with:
 * - RAF-based 500ms fade-in / 500ms fade-out on loop (no CSS transitions — exact hero page .txt spec)
 * - Video shifted down 17% so interesting lower-frame content shows
 * - Canvas particle field overlay (45 cyan ambient particles)
 * - Cinematic vignette gradient
 * - Scroll-scrub: past 20% scroll, video currentTime tracks scroll progress
 */
export default function ScrollScrubVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // RAF fade system refs — exact spec from hero page .txt
  const fadingOutRef = useRef(false);
  const fadeRafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // ── RAF Fade helpers ──────────────────────────────────────────────────────
    function cancelFade() {
      if (fadeRafRef.current !== null) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
    }

    function fadeIn(startOpacity: number) {
      cancelFade();
      const startTime = performance.now();
      const DURATION = 500;
      function step(now: number) {
        const t = Math.min((now - startTime) / DURATION, 1);
        video!.style.opacity = String(startOpacity + (1 - startOpacity) * t);
        if (t < 1) fadeRafRef.current = requestAnimationFrame(step);
      }
      fadeRafRef.current = requestAnimationFrame(step);
    }

    function fadeOut(startOpacity: number, onDone: () => void) {
      cancelFade();
      const startTime = performance.now();
      const DURATION = 500;
      function step(now: number) {
        const t = Math.min((now - startTime) / DURATION, 1);
        video!.style.opacity = String(startOpacity * (1 - t));
        if (t < 1) {
          fadeRafRef.current = requestAnimationFrame(step);
        } else {
          fadeRafRef.current = null;
          onDone();
        }
      }
      fadeRafRef.current = requestAnimationFrame(step);
    }

    // ── Set up video ──────────────────────────────────────────────────────────
    video.muted = true;
    video.playsInline = true;
    video.loop = false; // We manage loops manually for the fade system
    video.autoplay = true;
    video.style.opacity = "0";

    const handleCanPlay = () => {
      fadingOutRef.current = false;
      fadeIn(0);
      setVideoLoaded(true);
      video.play().catch(() => {});
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        const currentOpacity = parseFloat(video.style.opacity || "1");
        fadeOut(currentOpacity, () => {
          video.style.opacity = "0";
          setTimeout(() => {
            video.currentTime = 0;
            video.play().then(() => {
              fadingOutRef.current = false;
              fadeIn(0);
            });
          }, 100);
        });
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);
    if (video.readyState >= 2) {
      handleCanPlay();
    }
    video.addEventListener("timeupdate", handleTimeUpdate);

    // ── Scroll scrub ──────────────────────────────────────────────────────────
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Fade out the video completely over the first 600px of scrolling
      const fadeProgress = Math.max(1 - scrollY / 600, 0);
      const container = document.getElementById("scroll-video-container");
      if (container) {
        container.style.opacity = fadeProgress.toString();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── Canvas particle render loop ───────────────────────────────────────────
    const particles: Particle[] = Array.from({ length: 45 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.0003,
      speedY: -Math.random() * 0.0005 - 0.0002,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    let animId: number;
    const ctx = canvas.getContext("2d");

    const renderCanvas = () => {
      currentProgress += (targetProgress - currentProgress) * 0.1;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = window.innerWidth;
      const H = window.innerHeight;

      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
      }

      if (ctx) {
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, W, H);

        // Video scrub logic completely removed for performance as requested.

        // Particles only
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.y < 0) p.y = 1;
          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;

          ctx.beginPath();
          ctx.arc(p.x * W, p.y * H, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.65})`;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 7;
          ctx.fill();
        });

        ctx.restore();
      }

      animId = requestAnimationFrame(renderCanvas);
    };
    animId = requestAnimationFrame(renderCanvas);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      window.removeEventListener("scroll", handleScroll);
      cancelFade();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div id="scroll-video-container" aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden dark:block bg-white dark:bg-black transition-opacity duration-300">
      {/* Ambient gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 dark:from-[#0a0a0a]/80 via-transparent to-white dark:to-[#0a0a0a] z-10 pointer-events-none" />
      
      {/* CSS Cinematic vignette */}
      <div 
        className="absolute inset-0 z-15 pointer-events-none [background:radial-gradient(circle_at_center,transparent_10%,rgba(255,255,255,1)_65%)] dark:[background:radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,1)_65%)]" 
      />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-black/5 dark:bg-white/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-black/5 dark:bg-white/5 blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Cinematic hero video — shifted 17% down so lower portion shows */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%] transition-[filter] duration-500"
        style={{ opacity: 0 }} // RAF fade controls opacity; no CSS transition
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 transition-[filter] duration-500"
      />

      {/* Dot texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-30"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
