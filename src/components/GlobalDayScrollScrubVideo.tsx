"use client";

import React, { useEffect, useRef, useState } from "react";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4";

export default function GlobalDayScrollScrubVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cacheReady, setCacheReady] = useState(false);
  const [videoHasFrame, setVideoHasFrame] = useState(false);
  const framesRef = useRef<ImageBitmap[]>([]);
  const scrollSmoothedRef = useRef(0);
  const targetScrollRef = useRef(0);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      // Multiply by 4 so it completes 4 loops over the full page, making it scrub faster
      targetScrollRef.current = (window.scrollY / maxScroll) * 4;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // RAF loop for smoothing and drawing
  useEffect(() => {
    let animId: number;
    let lastSeekTime = -1;

    const loop = () => {
      // 0.08 for smoother interpolation
      scrollSmoothedRef.current += (targetScrollRef.current - scrollSmoothedRef.current) * 0.08;
      const smoothed = scrollSmoothedRef.current;

      if (cacheReady && framesRef.current.length > 0) {
        // Draw from cache
        const len = framesRef.current.length;
        const rawIndex = Math.floor(smoothed * (len - 1));
        const frameIndex = ((rawIndex % len) + len) % len;
        
        const bmp = framesRef.current[frameIndex];
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        
        if (canvas && ctx && bmp) {
          // Object-cover math
          const cw = canvas.width;
          const ch = canvas.height;
          const iw = bmp.width;
          const ih = bmp.height;
          const scale = Math.max(cw / iw, ch / ih);
          const drawW = iw * scale;
          const drawH = ih * scale;
          const dx = (cw - drawW) / 2;
          const dy = (ch - drawH) / 2;
          
          ctx.clearRect(0, 0, cw, ch);
          ctx.drawImage(bmp, dx, dy, drawW, drawH);
        }
      } else if (videoRef.current && videoRef.current.readyState >= 2) {
        // Fallback: Seek video directly
        const vid = videoRef.current;
        const rawTime = smoothed * (vid.duration - 0.05);
        const targetTime = ((rawTime % vid.duration) + vid.duration) % vid.duration;
        
        if (Math.abs(vid.currentTime - targetTime) > 0.04 && Math.abs(vid.currentTime - lastSeekTime) > 0.01) {
          vid.currentTime = targetTime;
          lastSeekTime = vid.currentTime;
        }
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [cacheReady]);

  // Frame Extraction Cache
  useEffect(() => {
    const extractFrames = async () => {
      if (!videoRef.current) return;
      const vid = videoRef.current;
      
      // Wait for metadata and first frame
      if (vid.readyState < 2) {
        await new Promise(r => {
          const onLoaded = () => { vid.removeEventListener("loadeddata", onLoaded); r(null); };
          vid.addEventListener("loadeddata", onLoaded);
        });
      }
      setVideoHasFrame(true);

      // Yield a bit so UI doesn't block immediately
      await new Promise(r => setTimeout(r, 300));

      const offscreenVideo = document.createElement("video");
      offscreenVideo.muted = true;
      offscreenVideo.playsInline = true;
      offscreenVideo.crossOrigin = "anonymous";
      offscreenVideo.src = VIDEO_URL;
      await new Promise(r => {
        offscreenVideo.addEventListener("loadeddata", r, { once: true });
        offscreenVideo.load();
      });

      const duration = offscreenVideo.duration || 5;
      const numFrames = Math.max(24, Math.min(90, Math.floor(duration * 12)));
      const frames: ImageBitmap[] = [];

      const offscreenCanvas = document.createElement("canvas");
      const offscreenCtx = offscreenCanvas.getContext("2d");
      
      // Downscale to max 960px width
      const scale = Math.min(1, 960 / offscreenVideo.videoWidth);
      offscreenCanvas.width = offscreenVideo.videoWidth * scale;
      offscreenCanvas.height = offscreenVideo.videoHeight * scale;

      for (let i = 0; i < numFrames; i++) {
        const time = (i / (numFrames - 1)) * (duration - 0.05);
        offscreenVideo.currentTime = time;
        await new Promise(r => {
          offscreenVideo.addEventListener("seeked", r, { once: true });
        });
        if (offscreenCtx) {
          offscreenCtx.drawImage(offscreenVideo, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
          const bmp = await createImageBitmap(offscreenCanvas);
          frames.push(bmp);
        }
      }
      
      framesRef.current = frames;
      setCacheReady(true);
    };

    extractFrames().catch(err => console.error("Frame extraction error:", err));
  }, []);

  // Handle Resize for Canvas Dimentions
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width * dpr;
        canvasRef.current.height = rect.height * dpr;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none block dark:hidden opacity-30">
      
      {/* 2. Video fallback (visible only until cache is ready) */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
          videoHasFrame && !cacheReady ? "opacity-100" : "opacity-0"
        }`}
        src={VIDEO_URL}
      />

      {/* 3. Canvas for cached frames (visible when cache is ready) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
          cacheReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
