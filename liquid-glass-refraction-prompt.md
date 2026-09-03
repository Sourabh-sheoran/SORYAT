# Mode E — Full-bleed Background Video + Live Liquid-Glass Refraction Card

Two linked animation systems: (1) a standard looping fullscreen background video, and (2) a floating glass card that shows a **live, per-frame refracted duplicate** of that same video, synced to the card's position every frame. Vanilla JS, no frameworks, no WebGL/canvas-3D — just a 2D canvas + one SVG filter.

---

## 1. Background video (standard loop)

```html
<video id="bg-video" class="bg-video" aria-hidden="true"
       autoplay muted loop playsinline preload="auto"
       src="VIDEO_URL_HERE"></video>
```

```css
.bg-video {
  position: fixed; top: 0; left: 0;
  display: block;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 1;
  pointer-events: none;
}
```

**Rules:**
- `autoplay muted loop playsinline` — standard silent infinite loop.
- Do **not** add `crossorigin` if the video host sends no CORS headers — it will break loading. Without it, the video still draws fine into a canvas; the canvas just becomes "tainted" (fine here since nothing reads pixel data back out).
- 100% opacity, **no overlay/scrim/tint/gradient of any kind** over the video at any breakpoint — it must stay fully visible everywhere.

---

## 2. The liquid-glass SVG filter (static, defined once)

Placed off-screen, immediately after the video:

```html
<svg class="glass-defs" width="0" height="0" aria-hidden="true" focusable="false">
  <defs>
    <filter id="liquid-glass-refraction"
            x="-30%" y="-30%" width="160%" height="160%"
            color-interpolation-filters="sRGB">

      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.015" numOctaves="3" result="noise" />

      <feColorMatrix in="SourceAlpha" type="matrix" result="boosted_alpha"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 100 0" />

      <feGaussianBlur in="boosted_alpha" stdDeviation="45" result="blurred_alpha" />

      <feComponentTransfer in="blurred_alpha" result="edge_mask">
        <feFuncA type="linear" slope="-1.3" intercept="1" />
      </feComponentTransfer>

      <feComposite in="noise" in2="edge_mask" operator="arithmetic"
                   k1="1" k2="0" k3="0" k4="0" result="masked_noise" />

      <!-- chromatic dispersion: one displacement pass per channel -->
      <feDisplacementMap in="SourceGraphic" in2="masked_noise" scale="65"
                         xChannelSelector="R" yChannelSelector="G" result="red_displaced" />
      <feColorMatrix in="red_displaced" type="matrix" result="red"
        values="1 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0" />

      <feDisplacementMap in="SourceGraphic" in2="masked_noise" scale="56"
                         xChannelSelector="R" yChannelSelector="G" result="green_displaced" />
      <feColorMatrix in="green_displaced" type="matrix" result="green"
        values="0 0 0 0 0
                0 1 0 0 0
                0 0 0 0 0
                0 0 0 1 0" />

      <feDisplacementMap in="SourceGraphic" in2="masked_noise" scale="47"
                         xChannelSelector="R" yChannelSelector="G" result="blue_displaced" />
      <feColorMatrix in="blue_displaced" type="matrix" result="blue"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 1 0 0
                0 0 0 1 0" />

      <feBlend in="red" in2="green" mode="screen" result="rg" />
      <feBlend in="rg" in2="blue" mode="screen" result="chromatic_dispersion" />
    </filter>
  </defs>
</svg>
```

**How it works (reproduce the reasoning, not just the numbers):**
1. `feTurbulence` generates a static fractal-noise field — this is the refraction "normal map."
2. `SourceAlpha` is boosted to full opacity, blurred (`stdDeviation="45"`), then inverted (`slope="-1.3" intercept="1"`) to build an **edge mask**: near-zero in the shape's interior, rising toward its borders.
3. Multiplying the noise by that mask means displacement is strong at the rim and near-nil in the center — this is what reads as a thick glass bevel.
4. The source is displaced **three separate times at different strengths (65 / 56 / 47)**, each masked to a single color channel (R/G/B), then recombined with two `screen` blends. The spread between the three offsets is the chromatic-aberration/rainbow fringe.
5. The oversized filter region (`-30%` / `160%`) gives blur and displacement room to operate past the element's own bounds.

Keep `65 / 56 / 47`, `stdDeviation="45"`, `baseFrequency="0.012 0.015"`, `numOctaves="3"`, and `slope="-1.3"` exact — they're tuned values, not placeholders.

---

## 3. The glass card — live per-frame sync (the core animation trick)

The card is a **window onto a refracted duplicate of the background video**, redrawn every animation frame so it always matches what's actually behind it.

```html
<aside class="card" data-glass-card>
  <div id="dup-video-container"><canvas id="dup-image"></canvas></div>
  <div class="card__frost" aria-hidden="true"></div>
  <!-- real card content goes here, z-index above both -->
</aside>
```

```css
.card {
  position: relative;
  overflow: hidden;               /* clips the duplicate to the card shape */
  background: transparent;        /* the refraction IS the fill */
  border-radius: 48px;
}
#dup-video-container {
  position: absolute; left: 0; top: 0; z-index: 0;
  overflow: hidden; pointer-events: none;
}
#dup-image {
  position: absolute; inset: 0; width: 100%; height: 100%;
  filter: url(#liquid-glass-refraction);
}
.card__frost {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1.5px 2px rgba(255, 255, 255, 0.3),
              inset 0 -1px 2px rgba(0, 0, 0, 0.15);
}
```

### Per-frame sync logic (runs in a self-starting `requestAnimationFrame` loop)

```js
const DUP_PIXEL_RATIO = 1; // deliberately NOT scaled for retina — see note below

function syncGlassCard() {
  const card = document.querySelector('[data-glass-card]');
  const rect = card.getBoundingClientRect();
  const video = document.getElementById('bg-video');

  if (rect.width && rect.height && video.videoWidth && video.videoHeight) {
    const container = document.getElementById('dup-video-container');
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    // Position the duplicate so it lines up 1:1 with the real video behind the card.
    // Because it's absolutely positioned INSIDE the card, this negative offset
    // lands it exactly over the viewport origin.
    container.style.left = `${-rect.left}px`;
    container.style.top = `${-rect.top}px`;
    container.style.width = `${vw}px`;
    container.style.height = `${vh}px`;

    const canvas = document.getElementById('dup-image');
    const w = vw * DUP_PIXEL_RATIO;
    const h = vh * DUP_PIXEL_RATIO;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const ctx = canvas.getContext('2d');
    try {
      // Reproduce object-fit: cover math when drawing the video frame
      const cover = Math.max(vw / video.videoWidth, vh / video.videoHeight);
      const sw = vw / cover, sh = vh / cover;
      const sx = (video.videoWidth - sw) / 2, sy = (video.videoHeight - sh) / 2;
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
    } catch (e) {
      // frame not decodable yet — skip this tick
    }
  }

  requestAnimationFrame(syncGlassCard);
}

requestAnimationFrame(syncGlassCard);
```

### Two non-obvious decisions to preserve exactly

- **Duplicate is sized to the viewport, not the card.** The filter shifts each color channel by a different amount, so the filtered element's own edges show hard channel-separation bands. Sizing to the full viewport pushes those hard edges outside the visible card — only clean interior refraction shows through the card's clip.
- **`DUP_PIXEL_RATIO` stays at 1, even on retina displays.** The SVG filter's cost scales with pixel count; rendering at device pixel ratio (2x, 3x) would multiply filter cost for a softness gain that's invisible in a refracted, blurred result.

### Card entrance animation

```css
.card {
  animation: fade-slide-up-card 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fade-slide-up-card {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Card hover (frost brightens)

```css
.card__frost { transition: background 400ms; }
.card:hover .card__frost { background: rgba(255, 255, 255, 0.1); }
```

---

## 4. Full animation inventory (for reference)

| What | Trigger | Spec |
|---|---|---|
| Background video | page load | native `autoplay loop`, silent, `object-fit: cover` |
| Live refraction sync | every `requestAnimationFrame` | canvas redraw of video frame + SVG filter recompute |
| Card entrance | page load | `fade-slide-up-card` 900ms `cubic-bezier(0.16, 1, 0.3, 1)`, opacity 0→1 + translateY 28px→0 |
| Card frost | hover | background `rgba(255,255,255,0.05)` → `rgba(255,255,255,0.1)`, 400ms |

Respect reduced motion globally:
```css
@media (prefers-reduced-motion: reduce) { * { transition-duration: 0.01ms !important; } }
```

---

## Hard rules

- ❌ No overlay/tint/scrim/gradient over the background video — it stays 100% visible.
- ❌ Never scale the duplicate canvas above `DUP_PIXEL_RATIO = 1`.
- ❌ Never size the duplicate to the card's own dimensions — always the full viewport, or the channel-separation edges become visible inside the card.
- ✅ Wrap every canvas `drawImage` call in `try/catch` — a video frame may not be decodable yet on a given tick.
- ✅ Keep the filter's tuned values (`65/56/47`, `stdDeviation="45"`, `baseFrequency="0.012 0.015"`, `slope="-1.3"`) exact — they are not arbitrary.
- ✅ Known/accepted artifact: at narrow viewports where the card nears full width, a thin chromatic (blue) stripe appears at the card's left edge because it falls inside the filter's edge-mask zone. This is inherent to the design — do not "fix" it by changing filter values.
