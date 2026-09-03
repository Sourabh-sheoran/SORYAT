"use client";

import React, { useEffect, useRef } from "react";

// Using a fallback Day Mode video. The user can update this URL if they have a specific new one.
const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4";

export default function HeroDayVelocityVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;
    let smoothedVelocity = 0;
    let animId: number;

    const onScroll = () => {
      const now = performance.now();
      const deltaY = window.scrollY - lastScrollY;
      const deltaT = Math.max(now - lastTime, 1);
      
      velocity = deltaY / deltaT;
      
      lastScrollY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const updatePlaybackRate = () => {
      smoothedVelocity += (velocity - smoothedVelocity) * 0.15;
      velocity *= 0.9;

      const intensity = Math.min(Math.abs(smoothedVelocity) * 8, 1);
      const BASE_RATE = 0.3;
      const MAX_RATE = 4.0;
      
      const targetRate = BASE_RATE + intensity * (MAX_RATE - BASE_RATE);
      
      if (videoRef.current) {
        videoRef.current.playbackRate = Math.max(0.1, Math.min(targetRate, 16));
      }
      
      animId = requestAnimationFrame(updatePlaybackRate);
    };
    
    animId = requestAnimationFrame(updatePlaybackRate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-screen z-0 pointer-events-none block dark:hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-60"
        src={VIDEO_URL}
      />
    </div>
  );
}
