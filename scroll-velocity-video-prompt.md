# Mode D — Scroll-Velocity-Driven Video Playback

Use this when the video should **actually play forward continuously** (like a real video, not scrubbed to a fixed frame), but its **playback speed reacts to how fast the user scrolls**. Faster/harder scrolling = faster playback. Slow or no scrolling = normal or near-stopped playback. This is different from Mode B (position-scrub) — here the video's native `currentTime` keeps advancing on its own, and scroll velocity only modulates the *rate* of that advance.

---

## Core idea

```
scroll speed (px/ms) → mapped to → video.playbackRate
```

The video keeps playing continuously (like `autoPlay`), but instead of a fixed `playbackRate = 1`, the rate is recalculated in real time based on how fast the user is scrolling.

---

## Setup

```jsx
<div className="fixed inset-0 z-0 pointer-events-none">
  <video
    ref={videoRef}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
    src="VIDEO_URL_HERE"
  />
</div>
```

- `autoPlay loop muted playsInline` stays — video always plays by itself.
- We do NOT pause/seek it manually like Mode B. We only adjust `playbackRate`.

---

## Tracking scroll velocity

```js
let lastScrollY = window.scrollY;
let lastTime = performance.now();
let velocity = 0; // px per ms

function onScroll() {
  const now = performance.now();
  const deltaY = window.scrollY - lastScrollY;
  const deltaT = Math.max(now - lastTime, 1); // avoid divide-by-zero

  velocity = deltaY / deltaT; // signed: positive = scrolling down, negative = scrolling up

  lastScrollY = window.scrollY;
  lastTime = now;
}

window.addEventListener('scroll', onScroll, { passive: true });
```

---

## Mapping velocity → playbackRate

Smooth the raw velocity first (it's noisy/spiky), then map it to a safe playback rate range.

```js
let smoothedVelocity = 0;

function updatePlaybackRate() {
  // lerp toward the latest measured velocity
  smoothedVelocity += (velocity - smoothedVelocity) * 0.15;

  // decay velocity back toward 0 when user stops scrolling
  velocity *= 0.9;

  const intensity = Math.min(Math.abs(smoothedVelocity) * 8, 1); // normalize 0–1
  const BASE_RATE = 0.3;   // near-idle speed when not scrolling
  const MAX_RATE = 4.0;    // fastest allowed speed at high scroll intensity

  const targetRate = BASE_RATE + intensity * (MAX_RATE - BASE_RATE);

  if (videoRef.current) {
    videoRef.current.playbackRate = Math.max(0.1, Math.min(targetRate, 16)); // HTMLMediaElement hard limit
  }

  requestAnimationFrame(updatePlaybackRate);
}

requestAnimationFrame(updatePlaybackRate);
```

**Tuning knobs:**
- `BASE_RATE` — how fast the video plays when the user is idle/not scrolling (keep it low but non-zero so the video never feels frozen).
- `MAX_RATE` — the ceiling speed during aggressive/fast scrolling. Browsers cap `playbackRate` around 16, but anything above ~4–6 usually looks chaotic — tune to taste.
- The `* 8` multiplier in `intensity` calibrates how much scroll speed is needed to hit max intensity — increase it if fast scrolling doesn't feel "fast enough" on screen, decrease if it maxes out too easily.
- `smoothedVelocity` lerp factor (`0.15`) and decay factor (`0.9`) control how snappy vs. smooth the speed changes feel — lower lerp = smoother/laggier, higher = snappier/twitchier.

---

## Optional: direction-aware behavior

If scrolling **up** should visually feel different from scrolling **down** (e.g., you want the video to still only ever play forward, never reverse — since native HTML video can't play backward smoothly), keep `playbackRate` always positive and just use `Math.abs(smoothedVelocity)` for intensity regardless of direction — which is already what the code above does. Both up and down fast scrolling increase speed equally.

If you instead want scrolling **up** to slow the video toward a stop (rather than also speeding it up), branch on sign:

```js
const targetRate = smoothedVelocity >= 0
  ? BASE_RATE + intensity * (MAX_RATE - BASE_RATE) // scrolling down → speed up
  : BASE_RATE * 0.3;                                // scrolling up → slow way down
```

---

## Cleanup

```js
useEffect(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  const raf = requestAnimationFrame(updatePlaybackRate);
  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(raf);
  };
}, []);
```

---

## Hard rules

- ❌ Never set `playbackRate` to exactly `0` — video will just look paused/frozen; always keep a small `BASE_RATE` floor.
- ❌ Don't manually set `video.currentTime` in this mode — that's Mode B's job. This mode only touches `playbackRate`, letting the browser's own playback clock run.
- ✅ Always smooth/lerp the raw scroll velocity before mapping it to rate — raw per-event deltas are too jittery and cause visible stutter.
- ✅ Clamp the final rate between a sane min (e.g. `0.1`) and max (e.g. `4`–`6`) so it never looks broken even during erratic fast scrolling.
- ✅ Keep `pointer-events-none` and `z-0` on the video container as in the other modes — it's still just a background layer.
