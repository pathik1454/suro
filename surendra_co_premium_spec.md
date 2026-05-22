# Surendra & Co. — Premium UI Specification
## "The Showcase" — Cinematic Automotive Aesthetic
### Complete Project Specification v1.0

**Concept Name:** The Showcase  
**Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Supabase, Resend, Vercel  
**Frames:** 300 total · every 6th preloaded (~50 frames, ~1.8MB) · rest lazy-loaded (~10.8MB total)

---

## Table of Contents

1. Concept Philosophy
2. Color Palette — Derived from Frame 300
3. Typography System
4. Asset & Frame Loading Strategy
5. Page Architecture Overview
6. Section-by-Section Flow
   - 6.1 Loading State
   - 6.2 Navigation Bar
   - 6.3 Hero
   - 6.4 Assembly Section — Desktop
   - 6.4M Assembly Section — Mobile
   - 6.5 By the Numbers
   - 6.6 Our Range
   - 6.7 The Making
   - 6.8 Certifications
   - 6.9 Commission / Contact Form
   - 6.10 Footer
7. GSAP Scroll Architecture
8. Canvas & Frame Rendering
9. Backend — Resend API Integration
10. Backend — Supabase Integration
11. Environment Variables
12. Component Inventory
13. Responsive Breakpoints
14. Performance Checklist
15. File & Folder Structure
16. Vercel Deployment Guide
17. Known Risks & Mitigations

---

## 1. Concept Philosophy

### What Makes This Different
The primary UI (cinematic dark) had everything overlaid directly on the canvas — glassmorphic panels floating over the bus. The Blueprint UI added annotation overlays and a mood transition system. Both share a common pattern: content fights with the animation for viewport space.

The Showcase resolves this with a hard architectural decision: **the bus is never obscured**. The canvas occupies the left 55% of the desktop viewport. Content lives in a dedicated right panel at all times. The bus is always fully visible, uninterrupted, like a car on a showroom floor under a spotlight.

This is the visual language of premium automotive — how BMW, Volvo, and Mercedes-Benz present commercial vehicles. The product is the hero. Everything else supports it.

### The Sunset Palette as the Emotional Anchor
Frame 300 — a finished Volvo 9600 XL driving at golden hour — is the emotional destination of the entire page. The user begins in darkness (bare chassis, cold studio light) and arrives at that frame: a completed, magnificent coach at sunset, wheels on the road. The color palette is extracted directly from that destination frame and used throughout the site. The user subconsciously associates the brand colors with that aspirational final image.

### Three Principles
1. Never cover the bus. The canvas is always clean.
2. Warm, not cold. Every design decision should feel like premium automotive, not enterprise SaaS.
3. Content earns its place. No section exists unless it serves the B2B buyer's decision.

---

## 2. Color Palette — Derived from Frame 300

All colors are extracted directly from the uploaded reference frame (the finished bus at golden-hour sunset).

```css
:root {
  /* === BACKGROUNDS === */
  --bg-void:       #090F18;   /* Deepest dark. Road shadow, void behind the bus. */
  --bg-base:       #0C1521;   /* Primary page background. Deep highway night. */
  --bg-surface:    #111E2C;   /* Elevated surfaces. Bus dark panel tone. */
  --bg-card:       #172435;   /* Cards, form inputs. Slightly lifted. */
  --bg-overlay:    rgba(11, 21, 33, 0.82); /* Canvas text/panel overlay. */

  /* === ACCENTS — from the sunset sky === */
  --gold:          #D4841A;   /* Primary. The dominant sunset amber-gold. */
  --gold-bright:   #F0A030;   /* Hover states, highlights, active. */
  --gold-dim:      #A06010;   /* Muted gold — borders, inactive states. */
  --gold-glow:     rgba(212, 132, 26, 0.18); /* Ambient glow behind cards. */

  /* === ACCENTS — from the bus body === */
  --steel:         #3D5E78;   /* Bus body slate-blue. Secondary accent. */
  --steel-light:   #5A7A95;   /* Lighter steel — hover, focus. */
  --steel-silver:  #8AAFC8;   /* Bus trim silver. Muted text accent. */

  /* === TEXT === */
  --text-primary:  #EDE8DF;   /* Warm off-white. Sky highlight near the sun. */
  --text-secondary:#8AAFC8;   /* Steel silver. Supporting text. */
  --text-muted:    #4A6478;   /* Very muted. Labels, metadata. */
  --text-gold:     #D4841A;   /* Gold text — labels, CTAs. */

  /* === BORDERS === */
  --border-gold:   rgba(212, 132, 26, 0.22);
  --border-gold-h: rgba(212, 132, 26, 0.55); /* Hover state border. */
  --border-steel:  rgba(90, 122, 149, 0.22);
  --border-subtle: rgba(255, 255, 255, 0.06);

  /* === SHADOWS === */
  --shadow-gold:   0 0 60px rgba(212, 132, 26, 0.14);
  --shadow-steel:  0 0 40px rgba(58, 90, 120, 0.20);
  --shadow-card:   0 4px 32px rgba(9, 15, 24, 0.60);
}
```

### How the Palette Is Used

Gold (`--gold`, `--gold-bright`) is the sole primary action color. It appears on: CTA buttons, active states, hover effects, section labels, important numbers, the loading spinner. It is the sunset.

Steel (`--steel`, `--steel-light`, `--steel-silver`) is the secondary color. It appears on: nav links, supporting text, borders, secondary badges. It is the bus.

The backgrounds create depth through layering: `--bg-void` for the deepest recessions, `--bg-base` for the page, `--bg-surface` for raised areas, `--bg-card` for interactive elements.

---

## 3. Typography System

```css
/* === DISPLAY — Large headings, hero text === */
/* Cormorant Garamond — elegant, high-contrast, premium automotive feel */
@import: next/font/google — family: 'Cormorant Garamond', weights: 300, 500, 600, 700

/* === UI — Navigation, buttons, labels, body === */
/* Inter — clean, neutral, highly legible at small sizes */
@import: next/font/google — family: 'Inter', weights: 300, 400, 500, 600

/* === TECHNICAL — Spec values, numbers, codes === */
/* IBM Plex Mono — precision without feeling like a code editor */
@import: next/font/google — family: 'IBM Plex Mono', weights: 400, 500
```

### Why Cormorant Garamond for Display
It is the choice of premium automotive brands (several luxury vehicle manufacturers use high-contrast serifs for their hero headings). It has exceptional thin strokes at large sizes that feel expensive and architectural. The pairing with Inter for UI is the standard luxury-brand formula: expressive display + invisible UI font.

### Usage Rules

Cormorant Garamond 700 — Hero heading ("CRAFTED FOR THE ROAD."), section main titles, phase titles in assembly panels. Sizes: 5vw–12vw for hero, 36–56px for sections.

Cormorant Garamond 300 — Subtitle/supporting headline text. Lighter weight for contrast.

Inter 600 — Navigation links, button text, section label tags, badge text.

Inter 400 — Body paragraphs, form field text, descriptions, footer text.

IBM Plex Mono 500 — All spec values: HP figures, berth counts, dimensions, compliance codes, form field reference codes. Distinctly technical without being harsh.

---

## 4. Asset & Frame Loading Strategy

### Frame Count Change: 300 Frames
With 300 frames (down from 732), the animation is tighter but all five assembly phases still exist. Frame-to-phase mapping:

| Phase | Frame Range | Scroll Range |
|---|---|---|
| 1 — Bare Foundation | 1–60 | 0–20% |
| 2 — Drivetrain | 61–120 | 20–40% |
| 3 — Interior | 121–180 | 40–60% |
| 4 — Exterior Shell | 181–240 | 60–80% |
| 5 — The Masterpiece | 241–300 | 80–100% |

60 frames per phase. At 24fps, each phase represents 2.5 seconds of the original video — enough for smooth, controlled transitions.

### Priority Load: Every 6th Frame

50 priority frames: 001, 007, 013, 019 ... 295, 301 (clamped to 300). Average 36.9KB per frame × 50 = ~1.85MB preload.

These are loaded before the page reveals. On a 10Mbps connection (common mid-tier Indian broadband), this downloads in under 2 seconds.

### Background Load: Remaining 250 Frames

~250 frames × 36.9KB = ~9.2MB. Loaded after page reveals via requestIdleCallback queue. 6 concurrent Image() loaders running at idle priority. Full download on a 10Mbps connection: ~7-8 seconds — well within the time the user spends reading the hero section and first assembly phase.

### Loader Implementation

```typescript
// lib/frameLoader.ts

const TOTAL_FRAMES = 300;
const PRIORITY_INTERVAL = 6;

export interface FrameLoader {
  getNearestFrame: (target: number) => HTMLImageElement | null;
  getLoadProgress: () => number;
  onPriorityComplete: (callback: () => void) => void;
}

export function createFrameLoader(): FrameLoader {
  const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
  const loaded = new Set<number>();
  const queue: number[] = [];
  let priorityTotal = 0;
  let priorityLoaded = 0;
  const priorityCallbacks: (() => void)[] = [];

  // Build priority queue first (every 6th frame)
  for (let i = 1; i <= TOTAL_FRAMES; i += PRIORITY_INTERVAL) {
    queue.push(i);
    priorityTotal++;
  }
  // Then fill in remaining frames
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    if ((i - 1) % PRIORITY_INTERVAL !== 0) queue.push(i);
  }

  const isPriority = (n: number) => (n - 1) % PRIORITY_INTERVAL === 0;

  function padFrame(n: number): string {
    return String(n).padStart(3, '0');
  }

  function loadNext() {
    if (queue.length === 0) return;
    const frameNum = queue.shift()!;
    const img = new Image();
    img.onload = () => {
      loaded.add(frameNum);
      images[frameNum - 1] = img;
      if (isPriority(frameNum)) {
        priorityLoaded++;
        if (priorityLoaded >= priorityTotal) {
          priorityCallbacks.forEach(cb => cb());
        }
      }
      requestIdleCallback(() => loadNext(), { timeout: 500 });
    };
    img.onerror = () => {
      // Skip failed frames silently — getNearestFrame handles the gap
      requestIdleCallback(() => loadNext(), { timeout: 500 });
    };
    img.src = `/assets/frames/frame-${padFrame(frameNum)}.jpg`;
    images[frameNum - 1] = img;
  }

  // Fire 6 concurrent loaders
  for (let i = 0; i < 6; i++) loadNext();

  return {
    getNearestFrame(target: number): HTMLImageElement | null {
      if (loaded.has(target) && images[target - 1]) return images[target - 1];
      let lo = target - 1, hi = target + 1;
      while (lo >= 1 || hi <= TOTAL_FRAMES) {
        if (lo >= 1 && loaded.has(lo) && images[lo - 1]) return images[lo - 1];
        if (hi <= TOTAL_FRAMES && loaded.has(hi) && images[hi - 1]) return images[hi - 1];
        lo--; hi++;
      }
      return null;
    },
    getLoadProgress(): number {
      return priorityLoaded / priorityTotal;
    },
    onPriorityComplete(callback: () => void) {
      if (priorityLoaded >= priorityTotal) callback();
      else priorityCallbacks.push(callback);
    }
  };
}
```

### Canvas Drawing

```typescript
// lib/canvasRenderer.ts

export function drawFrameCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;
  let dW: number, dH: number, dX: number, dY: number;

  if (imgRatio > canvasRatio) {
    dH = canvasH;
    dW = canvasH * imgRatio;
    dX = (canvasW - dW) / 2;
    dY = 0;
  } else {
    dW = canvasW;
    dH = canvasW / imgRatio;
    dX = 0;
    dY = (canvasH - dH) / 2;
  }
  ctx.drawImage(img, dX, dY, dW, dH);
}

export function initCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  return { ctx, dpr };
}
```

---

## 5. Page Architecture Overview

### Desktop Layout During Assembly

The most important architectural decision: the canvas and content are side-by-side, not overlaid.

```
+---------------------------+------------------------+
|                           |                        |
|   CANVAS                  |   CONTENT PANEL        |
|   (55% viewport width)    |   (45% viewport width) |
|                           |                        |
|   Fixed position          |   Fixed position       |
|   Full viewport height    |   Full viewport height |
|   Frame scrubbing active  |   Phase content inside |
|                           |   Cross-fades between  |
|                           |   phases               |
+---------------------------+------------------------+
```

The canvas is fixed. The content panel is fixed. The actual scroll container is a transparent 300vh element that GSAP's ScrollTrigger uses as the scroll distance. Neither the canvas nor the content panel moves — only the frames inside the canvas change.

This means the bus is NEVER obscured by any panel or overlay. At all times, the full canvas width shows an unobstructed view of the bus in whatever assembly state it is in.

### Below the Assembly

Once the assembly section ends, a standard scrolling page layout begins. The canvas stays fixed but a solid `--bg-base` div covers it as the user scrolls further. The content sections are full-width, standard scrolling layout.

```
+----------------------------------------------------------------------+
|  LOADING SCREEN                              (full screen, z-100)   |
|  NAVIGATION BAR                              (fixed, z-50)          |
+----------------------------------------------------------------------+
|  [CANVAS — fixed full-screen behind everything]                     |
|                                                                     |
|  HERO                                        (100vh)                |
|  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   |
|  ASSEMBLY SECTION                            (300vh)                |
|   [Left 55%: canvas visible]                                        |
|   [Right 45%: content panel, phase-aware]                           |
|  [Canvas fades to solid bg as assembly ends]                        |
+----------------------------------------------------------------------+
|  BY THE NUMBERS                              (full width, static)   |
|  OUR RANGE                                   (full width, static)   |
|  THE MAKING                                  (full width, static)   |
|  CERTIFICATIONS                              (full width, static)   |
|  COMMISSION / CONTACT FORM                   (full width, static)   |
|  FOOTER                                      (full width, static)   |
+----------------------------------------------------------------------+
```

---

## 6. Section-by-Section Flow

---

### 6.1 Loading State

**Shown immediately on mount. Page content underneath is already rendered but invisible.**  
**Dismissed when:** All 50 priority frames are loaded (loader.onPriorityComplete fires).

**Layout:**
```
Full screen · background: --bg-void · z-index: 100

+-----------------------------------------------------------+
|                                                           |
|   [Surendra & Co. logo — 64px, centered]                  |
|                                                           |
|   SURENDRA & CO.                                          |
|   Coach Body Builders · Est. 2000                         |
|                                                           |
|   [Gold spinner — 40px circle, 2px border]               |
|                                                           |
|   Preparing your experience                               |
|   [Progress bar — 320px wide, 2px tall]                   |
|                                                           |
+-----------------------------------------------------------+
```

**SURENDRA & CO.:** Cormorant Garamond 700, 28px, --text-primary, letter-spacing: 0.15em.  
**Subtitle:** Inter 400, 12px, --text-muted, tracking-widest.  
**Spinner:** 40px, `border: 2px solid var(--border-gold)`, `border-top-color: var(--gold)`, CSS spin animation.  
**"Preparing your experience":** Inter 400, 12px, --text-muted.  
**Progress bar track:** 320px × 2px, --border-subtle.  
**Progress bar fill:** gold, animates from 0 to 100% as frames load.

Progress updates are fired from the loader every time a priority frame loads:
```typescript
frameLoader.onEachPriorityFrame((loaded, total) => {
  const pct = (loaded / total) * 100;
  progressBarFill.style.width = pct + '%';
});
```

**Exit:** `opacity: 0` transition over 500ms, then `display: none`.

---

### 6.2 Navigation Bar

**Fixed, full-width, z-50.**

**Transparent state (top of page / over canvas area):**
- Background: `linear-gradient(to bottom, rgba(9,15,24,0.90) 0%, transparent 100%)`, height 80px
- Bottom border: none

**Solid state (triggered after assembly section ends, or after 100px scroll):**
- Background: `--bg-surface`, `backdrop-filter: blur(12px)`
- Bottom border: `1px solid var(--border-gold)`
- Transition: `background 400ms ease, border 400ms ease`

**Left side:**
- Logo: 42×42px container, `background: rgba(212,132,26,0.08)`, `border: 1px solid var(--border-gold)`, `border-radius: 10px`, logo image inside 30×30px
- Brand name: "SURENDRA & CO." — Inter 600, 14px, --text-primary, tracking-widest, hidden below md

**Center (desktop only):**
- Nav links: "Our Work" · "Range" · "Process" · "Contact"
- Inter 500, 13px, --text-secondary
- Hover: --text-primary, with a 1px gold underline appearing via `::after` pseudo-element (`width: 0% -> 100%`, transition 200ms)
- Each is a smooth-scroll anchor

**Right side:**
- "START YOUR BUILD" — pill button
- `border: 1px solid var(--border-gold)`, `background: rgba(212,132,26,0.10)`, `color: var(--gold)`
- Inter 600, 12px, tracking-wider, padding: 10px 20px, border-radius: 999px
- Hover: `background: rgba(212,132,26,0.22)`, `border-color: var(--border-gold-h)`, scale 1.02
- Clicking smooth-scrolls to #commission section

**Mobile:** Hamburger icon → full-screen drawer (right-slide, 300px wide, bg: --bg-surface).

---

### 6.3 Hero

**Height:** 100vh. Canvas is fixed behind it, showing frame 001 (bare chassis).

**Content position:** The hero content is not centered — it sits in the LEFT 55% of the viewport on desktop, aligned with the canvas. This means the text appears to be "on top of" the bus as it sits in frame 001.

**A dark gradient vignette** covers the left side of the canvas during the hero: `linear-gradient(to right, rgba(9,15,24,0.75) 0%, rgba(9,15,24,0.20) 60%, transparent 100%)`. This ensures the hero text is legible without covering the bus.

**Layout:**
```
[Left half — text content, vertically centered]

   VOLVO 9600 XL
   ─────────────────────────────
   CRAFTED
   FOR THE
   ROAD.

   India's finest luxury coach manufacturer.
   Commissioned individually. Delivered complete.

   [COMMISSION YOURS]  [EXPLORE THE BUILD ↓]
```

**"VOLVO 9600 XL":** IBM Plex Mono 500, 12px, --text-gold, tracking-[0.5em]. Appears first, fades in at 0ms delay.

**"CRAFTED FOR THE ROAD.":** Cormorant Garamond 700, clamp(48px, 7vw, 96px), --text-primary. Each word on its own line. Stagger entrance: each word fades + slides up 20px, 150ms stagger, starting at 200ms.

**Tagline:** Inter 300, 16px, --text-secondary, max-width: 380px. Appears at 700ms delay.

**Buttons:**
- "COMMISSION YOURS" — solid gold: `background: var(--gold)`, `color: var(--bg-void)`, Inter 600, 13px, tracking-wider, border-radius: 6px, padding: 14px 28px. Hover: `background: var(--gold-bright)`.
- "EXPLORE THE BUILD ↓" — ghost: `border: 1px solid var(--border-gold)`, `color: var(--gold)`, same dimensions. Hover: `background: var(--gold-glow)`. Clicking smooth-scrolls to assembly section.

**Bottom indicator (desktop only):**
- Fixed to bottom: 40px, left: 0, width: 55% — aligning with the canvas
- Centered: `SCROLL TO ASSEMBLE` — Inter 400, 10px, --text-muted, tracking-[0.4em]
- Below: a vertical line 32px, 1px, gold, animated breathing fade-pulse

**Exit animation:** As user scrolls down, the hero text container fades out and slides left by 40px simultaneously over the first 15% of the assembly scroll range (GSAP scrub).

---

### 6.4 Assembly Section — DESKTOP

**Height:** 300vh  
**Canvas:** Fixed, left 55% of viewport, full height. Frame scrubbing active.  
**Content Panel:** Fixed, right 45% of viewport, full height.

#### Canvas Column

The canvas `<canvas>` element is styled:
```css
.assembly-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 55vw;
  height: 100vh;
}
```

A subtle dark gradient on the RIGHT edge of the canvas column creates a seamless blend into the content panel:
```css
.canvas-edge-gradient {
  position: fixed;
  top: 0;
  left: calc(55vw - 80px);
  width: 80px;
  height: 100vh;
  background: linear-gradient(to right, transparent, var(--bg-surface));
  z-index: 3;
  pointer-events: none;
}
```

This avoids a harsh cut between canvas and content panel.

#### Content Panel Column

```css
.content-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 45vw;
  height: 100vh;
  background: var(--bg-surface);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5vw;
  border-left: 1px solid var(--border-subtle);
}
```

The panel background is `--bg-surface` — always visible, always solid. The content inside it cross-fades between phases.

#### Content Panel Internals

The panel has 5 "pages" stacked on top of each other, one per phase. Only the active phase is `opacity: 1`. Others are `opacity: 0`. Transitions are GSAP-driven cross-fades (400ms).

**Each phase page layout:**
```
[Phase number + phase name]
────────────────────────────────
[Large phase title — Cormorant]

[Description — 2-3 sentences, Inter 400]

[Spec grid — 2×3 or 2×4 key-value pairs]

[Phase progress indicator — 5 dots at bottom]
```

**Phase number tag:**
```
  01  THE FOUNDATION
```
IBM Plex Mono 500, 11px. The number is gold, the label is --text-muted. Tracking wide. A horizontal rule 40px below it in gold.

**Phase title:** Cormorant Garamond 600, clamp(28px, 3vw, 44px), --text-primary.

**Description:** Inter 400, 15px, --text-secondary, line-height: 1.7, max 3 lines.

**Spec grid (2 columns):**
```
+-------------------+-------------------+
|  FRAMEWORK        |  COMPLIANCE       |
|  High-Tensile     |  AIS 052          |
|  Steel            |  Certified        |
+-------------------+-------------------+
|  WELD TYPE        |  SURFACE          |
|  MIG / TIG        |  Anti-Corrosion   |
|  Structural       |  Primer Coat      |
+-------------------+-------------------+
```
Label: Inter 500, 10px, --text-muted, tracking-[0.2em], UPPERCASE. Value: IBM Plex Mono 500, 14px, --text-primary. Cell background: --bg-card. Border: 1px solid --border-subtle. No border-radius.

**5-dot phase indicator (bottom of panel):**
```
  ●  ○  ○  ○  ○
  1  2  3  4  5
```
Active dot: 10px, solid gold. Inactive: 6px, --border-gold. Connecting line: --border-subtle. IBM Plex Mono, 9px labels below each dot.

#### Phase Content Data

**Phase 01 — The Bare Foundation (frames 1–60):**
- Title: "The Bare Foundation"
- Description: "Every coach begins here. High-tensile structural steel, precision-cut and welded to exact specification. The framework is the promise — built to carry weight, absorb force, and endure decades."
- Specs: FRAMEWORK / High-Tensile Steel | COMPLIANCE / AIS 052 | WELD TYPE / MIG-TIG | SURFACE / Anti-Corrosion | AXLE TYPE / Commercial Grade | UNDERFRAME / Load-Rated

**Phase 02 — Drivetrain (frames 61–120):**
- Title: "The Drivetrain"
- Description: "The Volvo B11R engine — 430 horsepower, 2,100 Nm of torque — is seated into the rear compartment. Four heavy-duty axle assemblies are mounted. The mechanical soul of the coach takes form."
- Specs: ENGINE / Volvo B11R | OUTPUT / 430 HP | TORQUE / 2,100 Nm | EMISSION / Euro VI | TRANS. / I-Shift 12-Spd | FUEL / 400L Capacity

**Phase 03 — Interior Architecture (frames 121–180):**
- Title: "Interior Architecture"
- Description: "A bespoke double-decker steel cage rises from the frame. Individual sleeper pods are fitted with blue and tan leather. Wood-pattern theatre floors. Yellow privacy curtains on both decks. Every square centimetre is designed for the passenger."
- Specs: LAYOUT / Double Deck | BERTHS / 40 Premium | DECK SPLIT / 20 + 20 | UPHOLSTERY / Leather | FLOORING / Theatre-Grade | AC / Dual-Zone

**Phase 04 — The Exterior Shell (frames 181–240):**
- Title: "The Exterior Shell"
- Description: "Aerodynamic silver metallic body panels encase the completed interior. Panoramic tinted glass units are seated into precision-machined frames. The coach's silhouette is sealed — elegant, weatherproof, and built to move."
- Specs: PANELS / Silver Metallic | GLASS / Panoramic Tinted | WINDSHIELD / Laminated | SEALING / Weatherproof | PROFILE / Aerodynamic | LIVERY / Custom Available

**Phase 05 — The Masterpiece (frames 241–300):**
- Title: "The Masterpiece"
- Description: "25 years. 500 coaches. One philosophy: no compromises. The finished vehicle is the beginning of its story — and yours."
- Specs replaced by two trust lines and a CTA button:
  - "25+ Years of Manufacturing" — IBM Plex Mono, gold
  - "500+ Coaches on India's Roads" — IBM Plex Mono, gold
  - Button: "Begin Your Commission →" (links to #commission, smooth scroll)

#### Phase Transition Animation

When GSAP ScrollTrigger detects a phase boundary crossing:

```typescript
let currentPhase = 0;

function onPhaseChange(newPhase: number) {
  if (newPhase === currentPhase) return;

  // Fade out current phase page
  gsap.to(`#phase-page-${currentPhase}`, {
    opacity: 0, y: -12, duration: 0.35, ease: 'power2.in'
  });

  // Fade in new phase page
  gsap.fromTo(`#phase-page-${newPhase}`,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.1 }
  );

  currentPhase = newPhase;
}
```

A 12px vertical offset on enter/exit creates a subtle "turning page" feeling without being distracting.

---

### 6.4M Assembly Section — MOBILE

**On screens < 768px, the side-by-side layout is not feasible.**

Mobile layout stacks vertically:
- Canvas: full-width, 60vh tall, fixed at top.
- Content panel: positioned below the canvas, 40vh visible. Scrollable internally if content overflows.

```
+------------------------------------------+
|  [Canvas — 60vh, full width]             |
|  [Frame scrubbing active]                |
|  [Phase number overlay — bottom-right]   |
+------------------------------------------+
|  [Content panel — 40vh]                  |
|  [Phase content cross-fades]             |
|  [Spec grid — 2 columns]                 |
|  [5-dot phase indicator]                 |
+------------------------------------------+
```

**Canvas on mobile:**
- `position: sticky; top: 0; width: 100%; height: 60vh`
- DPR capped at 1.5× for performance
- A phase number badge fixed to the bottom-right of the canvas area: "02 / 05" — IBM Plex Mono, 11px, gold, in a small dark pill

**Content panel on mobile:**
- `background: --bg-surface`
- `padding: 24px 20px`
- The spec grid collapses to a single-column key-value list on screens < 480px

**Mobile scroll behavior:** The assembly section is still 300vh tall. GSAP ScrollTrigger works the same way. The difference is purely CSS layout — canvas width changes from 55vw to 100vw, content panel moves below.

**Mobile canvas DPR:**
```typescript
const isMobile = window.innerWidth < 768;
const dpr = isMobile
  ? Math.min(window.devicePixelRatio, 1.5)
  : Math.min(window.devicePixelRatio, 2);
```

---

### 6.5 By the Numbers

**Transition from animation:** As the assembly section ends, a full-width `--bg-base` element slides up over the canvas with a `clip-path` wipe animation (bottom-to-top, 800ms). This is more cinematic than a simple fade and signals a clear chapter break.

**Background:** --bg-base. Full-width layout.

**Header:**
```
  ─── THE NUMBERS ───────────────────────────────────
  25 years. One promise.
```
IBM Plex Mono 500, 11px, --text-gold, tracking-[0.4em] for the label. Cormorant Garamond 300, 48px, --text-secondary for the subtitle.

**Stat cards — 4-column desktop, 2-column mobile:**

Each card:
- Background: --bg-card
- Border: 1px solid --border-subtle
- Border-top: 2px solid --gold (all cards) — a consistent visual anchor
- No border-radius (or very minimal: 4px)
- Padding: 32px 28px

Layout inside:
```
+--------------------------------+
|                                |
|  25+                           |  <- Cormorant Garamond 700, 80px, gold
|                                |
|  Years in Operation            |  <- Inter 500, 14px, text-secondary, uppercase, tracked
|  Manufacturing since 2000      |  <- Inter 400, 12px, text-muted
|                                |
+--------------------------------+
```

Stats: 25+ Years · 500+ Coaches · ₹800Cr Revenue · 40 Premium Berths

Numbers animate from 0 on scroll-into-view (IntersectionObserver, not scroll event). Duration: 1600ms, ease-out cubic.

---

### 6.6 Our Range

**Background:** --bg-surface (slightly lighter than base for rhythm).

**Header:**
```
  COACH RANGE ──────────────────────────────────
  Every Coach.
  Engineered Here.
```
IBM Plex Mono label, Cormorant Garamond 700 for the 2-line heading (56px).

**Grid:** 3-column desktop, 2-column tablet, 1-column mobile.

**Coach card:**
```
+--------------------------------------------+
|  [Image area — 220px tall]                 |
|  Background: --bg-card                     |
|  [Coach silhouette or photo, object-cover] |
|                                            |
|  [2px gold top border — appears on hover] |
|                                            |
|  LUXURY SLEEPER                            |  <- Inter 600, 16px, text-primary
|  SC-TYPE-01 · Volvo B11R                  |  <- IBM Plex Mono, 10px, text-muted
|  ──────────────────────────────────        |
|  > 40 Premium Berths                       |  <- Inter 400, 13px, text-secondary
|  > Dual-Deck Layout                        |
|  > AIS 052 Compliant                       |
|  ──────────────────────────────────        |
|  [ Request Spec Sheet  → ]                 |
+--------------------------------------------+
```

Hover state: card lifts with `box-shadow: var(--shadow-gold)`, the top border appears (gold, 2px). The image area very subtly scales 1.03 (CSS transition 400ms).

"Request Spec Sheet" button: ghost style, border gold, color gold. On click: smooth scroll to #commission, pre-fills dropdown.

**Coach types:**
1. Luxury Sleeper Coach — Volvo 9600 XL (the hero)
2. Semi-Sleeper Coach — Volvo B7R chassis
3. Seater Coach — Standard long-route
4. School / Institutional Bus — Safety-first, robust

---

### 6.7 The Making

**Background:** --bg-base.

**Header:**
```
  THE PROCESS ───────────────────────────────
  From Order
  to Road.
```

**Layout:** 4 steps in a horizontal timeline on desktop, vertical stack on mobile.

**Step card design — premium, editorial:**
```
+------------------------------------------+
|                                          |
|  01                                      |  <- Cormorant Garamond 700, 72px, text at 8% opacity (bg watermark)
|                                          |
|  DESIGN &                                |  <- Inter 600, 20px, text-primary
|  CONSULTATION                            |
|                                          |
|  Wk 1–2                                 |  <- IBM Plex Mono 500, 11px, gold
|                                          |
|  We begin with your requirements —       |  <- Inter 400, 14px, text-secondary
|  route type, passenger load, comfort     |     line-height 1.6
|  tier, and customizations.              |
|                                          |
+------------------------------------------+
```

The large watermark number is NOT a label — it is a design element in the background of the card. The actual step number is implicit from order.

Connecting element between cards on desktop: a thin horizontal dashed line (`border-top: 1px dashed var(--border-gold)`) with a gold dot midway — purely decorative, 40px between cards.

**Step data:**
1. DESIGN & CONSULTATION · Wk 1–2 · Floor plan, specification sheet, requirements analysis.
2. CHASSIS FABRICATION · Wk 3–8 · Steel cage welded to AIS 052. Drivetrain integration.
3. INTERIOR FIT-OUT · Wk 9–14 · Berths, upholstery, flooring, AC, electrical, exterior panels.
4. QC & DELIVERY · Wk 15–16 · Full inspection, RTO documentation, pan-India transport.

**Mobile:** Cards stack vertically. Connecting element rotates to a vertical dashed left border.

---

### 6.8 Certifications

**Background:** --bg-surface.

**Header:**
```
  COMPLIANCE ────────────────────────────────
  Certified to
  Every Standard.
```

**Grid:** 2×2 desktop, single column mobile.

**Certification card — no illustrations, text-driven:**
```
+--------------------------------------+
|                                      |
|  AIS 052                             |  <- IBM Plex Mono 500, 36px, gold
|                                      |
|  Coach Body Standard                 |  <- Inter 600, 16px, text-primary
|                                      |
|  Ministry of Road Transport          |  <- Inter 400, 13px, text-secondary
|  & Highways, Govt. of India          |
|                                      |
|  Coach Body Code Compliance          |  <- Inter 400, 12px, text-muted
|                                      |
+--------------------------------------+
```

Border-left: 3px solid --gold. Background: --bg-card. Padding: 28px 32px.

This border-left treatment is cleaner and more premium than a top border or a stamp design.

**4 certifications:** AIS 052 · BS VI / Euro VI · ISO 9001 (if confirmed) · BIS (if confirmed).

**Bottom note:** "All vehicles arrive with complete RTO documentation and a pre-delivery inspection certificate." — Inter 400, 13px, text-muted, centered.

---

### 6.9 Commission / Contact Form

**Background:** --bg-base with two ambient light orbs: gold at top-right (500px, blur 200px, opacity 0.10), steel blue at bottom-left (400px, blur 180px, opacity 0.08).

**Layout:** 50/50 split on desktop, stacked on mobile.

**Left Column:**
```
  COMMISSION ─────────────────────────────
  Start
  Your Build.

  25 years of engineering coaches for India's
  roads. Every vehicle is commissioned
  individually — no stock units, no compromises.
  Tell us what you need.

  ── What to expect ──────────────────────
  > Custom-Built to Specification
  > AIS 052 Fully Compliant
  > Volvo-Certified Chassis
  > Pan-India Delivery

  ── Reach us directly ───────────────────
  [Phone icon]  +91 98250 39111
  [Mail icon]   surendra_bareja@yahoo.com
  [Pin icon]    NH-8, Near APMC Market,
                Bareja – 382425, Ahmedabad
```

IBM Plex Mono for the section label. Cormorant Garamond 700 for the "Start Your Build." heading (56px). The ">" bullets match the Our Range card language. Contact info icons: Lucide React, 16px, --steel-silver.

**Right Column (The Form):**

Container: `background: --bg-card`, `border: 1px solid --border-gold`, `border-radius: 12px`, `padding: 40px`, `box-shadow: --shadow-card`.

The form is intentionally minimal and elegant. No heavy top banner. Just a clean heading inside:
```
Commission Request

[Full Name *]           [Company Name]
[Work Email *]          [Phone Number *]
[Coach Type ↓]          (select dropdown)
[Requirements — textarea, 5 rows]

[SUBMIT REQUEST]
```

**Field styling:**
- Labels: Inter 500, 11px, --text-muted, tracking-[0.1em], UPPERCASE
- Inputs: `background: --bg-surface`, `border: 1px solid --border-subtle`, `border-radius: 6px`, `color: --text-primary`, Inter 400, 14px
- Focus: `border-color: --gold`, `box-shadow: 0 0 0 3px rgba(212,132,26,0.12)`
- Two-column grid layout on the first two rows

**Dropdown (Coach Type):** Custom styled, matching input style. Options: Luxury Sleeper / Semi-Sleeper / Seater Coach / School–Institutional / Other / Custom

**Submit button:** Full-width, 52px tall, `background: --gold`, `color: --bg-void`, Inter 600, 14px, tracking-widest, UPPERCASE "SUBMIT REQUEST". Hover: `--gold-bright`, scale 1.01. `border-radius: 6px`.

**Form states:**

| State | Button | Below button |
|---|---|---|
| Idle | "SUBMIT REQUEST" + ArrowRight | — |
| Loading | Spinner (white) + "SENDING..." | — |
| Success | CheckCircle + "REQUEST SENT" | Green card: "Thank you. We'll contact you within 1 business day." |
| Error | XCircle + "TRY AGAIN" | Red message: specific error or "Something went wrong. Email us directly." |

On success, the form fields do not reset immediately — they stay filled so the user can see what was submitted. A "Send another →" link appears 5 seconds later if they need it.

---

### 6.10 Footer

**Background:** --bg-void (deepest dark).

**Top separator:** A single 1px line, `background: linear-gradient(to right, transparent, var(--gold) 30%, var(--gold) 70%, transparent)`. Width: 100%. This golden gradient line is the footer's entire "decoration."

**Layout:** 4 columns desktop, 2×2 tablet, stacked mobile.

Column 1 — Brand:
- Logo box (42×42px, gold border) + "SURENDRA & CO."
- "Coach Body Builders" — IBM Plex Mono, 10px, --text-gold, tracked
- One line: "Precision-built coaches for India's roads. Est. 2000."

Column 2 — Pages:
- Quick Links header — Inter 600, 11px, --text-muted
- Our Range · The Process · Certifications · Commission
- All: Inter 400, 13px, --text-secondary, hover: --text-primary

Column 3 — Contact:
- GET IN TOUCH — header
- +91 98250 39111 (tel: link, phone icon)
- surendra_bareja@yahoo.com (mailto:, mail icon)
- Icons: 16px, Lucide React, gold on hover

Column 4 — Location:
- FIND US — header
- N. H. No. 8, Near APMC Market, Bareja – 382425, Taluka Daskroi, District Ahmedabad
- Map pin icon linking to Google Maps (new tab)

**Bottom bar:** `border-top: 1px solid var(--border-subtle)`, `padding: 16px 0`, flex row. Left: © 2025 Surendra & Co. All rights reserved. — Inter 400, 12px, --text-muted. Right: Privacy Policy · Terms of Service — same style.

---

## 7. GSAP Scroll Architecture

### ScrollTrigger Setup

```typescript
// components/assembly/AssemblySection.tsx

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 300;
const PHASE_BOUNDARIES = [0, 0.20, 0.40, 0.60, 0.80, 1.0];

function getPhase(progress: number): number {
  for (let i = 0; i < 5; i++) {
    if (progress >= PHASE_BOUNDARIES[i] && progress < PHASE_BOUNDARIES[i + 1]) return i + 1;
  }
  return 5;
}

useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: '#assembly-scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      pin: '#assembly-sticky',   // pins the left+right panel split
      scrub: 0.8,                // slight lag for smooth feel
      onUpdate: (self) => {
        const progress = self.progress;
        const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
        renderFrame(frameIndex);
        const phase = getPhase(progress);
        if (phase !== currentPhase) {
          onPhaseChange(phase);
          currentPhase = phase;
        }
      }
    });
  }, assemblyRef);

  return () => ctx.revert();
}, []);
```

`scrub: 0.8` gives 800ms easing lag — premium feel, like the bus responds to a heavy wheel.

### Hero Exit

```typescript
ScrollTrigger.create({
  trigger: '#assembly-scroll-container',
  start: 'top top',
  end: '15% top',
  scrub: true,
  onUpdate: (self) => {
    gsap.set('#hero-content', {
      opacity: 1 - self.progress,
      x: -40 * self.progress
    });
  }
});
```

Hero fades and slides left as the assembly begins.

### Canvas Cover (Assembly End)

```typescript
ScrollTrigger.create({
  trigger: '#post-assembly-cover',
  start: 'top bottom',
  end: 'top top',
  scrub: true,
  onUpdate: (self) => {
    gsap.set('#canvas-cover', {
      clipPath: `inset(${(1 - self.progress) * 100}% 0 0 0)`
    });
  }
});
```

A solid `--bg-base` div covers the canvas with a clip-path wipe from bottom as the user scrolls past the assembly section.

### Static Section Animations

All static sections below the animation use IntersectionObserver (not GSAP scroll) for simpler, more performant entry animations:

```typescript
// lib/useIntersectionAnimation.ts
export function useScrollReveal(selector: string, options?: AnimationOptions) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}
```

---

## 8. Canvas & Frame Rendering

### requestAnimationFrame Loop

The canvas does NOT update on every scroll event. Instead, a pending frame index is stored on scroll, and the RAF loop renders it:

```typescript
let pendingFrame = 1;
let isRendering = false;

function scheduleFrame(frameIndex: number) {
  pendingFrame = frameIndex;
  if (!isRendering) {
    isRendering = true;
    requestAnimationFrame(renderPending);
  }
}

function renderPending() {
  const img = frameLoader.getNearestFrame(pendingFrame);
  if (img) {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    drawFrameCover(ctx, img, canvas.offsetWidth, canvas.offsetHeight);
  }
  isRendering = false;
}
```

This ensures exactly one canvas draw per animation frame, never more, regardless of scroll velocity.

### Canvas Resize Handler

```typescript
function handleResize() {
  const { ctx: newCtx } = initCanvas(canvas);
  ctx = newCtx;
  // Re-render current frame after resize
  scheduleFrame(currentFrameIndex);
}

const resizeObserver = new ResizeObserver(handleResize);
resizeObserver.observe(canvas);

return () => resizeObserver.disconnect();
```

---

## 9. Backend — Resend API Integration

### Installation

```bash
npm install resend
```

### API Route

```typescript
// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Zod validation schema
const contactSchema = z.object({
  fullName:     z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:        z.string().email('Invalid email address'),
  company:      z.string().max(100).optional(),
  phone:        z.string().min(10, 'Enter a valid phone number').max(15),
  coachType:    z.enum(['luxury-sleeper', 'semi-sleeper', 'seater', 'school', 'other']),
  requirements: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 1. Save to Supabase
    const supabase = createClient();
    const { error: dbError } = await supabase
      .from('commission_requests')
      .insert({
        full_name:    data.fullName,
        email:        data.email,
        company:      data.company || null,
        phone:        data.phone,
        coach_type:   data.coachType,
        requirements: data.requirements || null,
        submitted_at: new Date().toISOString(),
        status:       'new',
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      // Don't fail the whole request — email is more important than DB
    }

    // 2. Send email to Surendra & Co. via Resend
    const { error: emailError } = await resend.emails.send({
      from:    'Surendra & Co. Website <noreply@yourdomain.com>',
      to:      ['surendra_bareja@yahoo.com'],
      replyTo: data.email,
      subject: `New Commission Request — ${data.fullName} · ${data.coachType}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0C1521; padding: 24px 32px; border-bottom: 3px solid #D4841A;">
            <h2 style="color: #EDE8DF; margin: 0; font-size: 20px; letter-spacing: 0.05em;">
              NEW COMMISSION REQUEST
            </h2>
            <p style="color: #8AAFC8; margin: 4px 0 0; font-size: 13px;">
              Surendra & Co. — Volvo 9600 XL Website
            </p>
          </div>
          <div style="padding: 32px; background: #f9f9f9; border: 1px solid #e5e5e5;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Full Name</td>
                <td style="padding: 10px 0; color: #1a1a1a; border-bottom: 1px solid #eee;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #D4841A;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:${data.phone}" style="color: #D4841A;">${data.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.company || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Coach Type</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.coachType}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Requirements</td>
                <td style="padding: 10px 0; white-space: pre-wrap;">${data.requirements || '—'}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #f0f0f0; font-size: 11px; color: #888;">
            Submitted via surendra-co.in · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json(
        { error: 'Email delivery failed. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    // 3. Send confirmation email to user
    await resend.emails.send({
      from:    'Surendra & Co. <noreply@yourdomain.com>',
      to:      [data.email],
      subject: 'We received your commission request — Surendra & Co.',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0C1521; padding: 24px 32px; border-bottom: 3px solid #D4841A;">
            <h2 style="color: #EDE8DF; margin: 0; font-size: 18px;">SURENDRA & CO.</h2>
            <p style="color: #8AAFC8; margin: 4px 0 0; font-size: 12px;">Coach Body Builders · Est. 2000</p>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <p style="font-size: 15px; color: #1a1a1a; line-height: 1.6;">
              Dear ${data.fullName},
            </p>
            <p style="font-size: 15px; color: #444; line-height: 1.7;">
              Thank you for reaching out. We have received your commission request and our team will get back to you within <strong>1 business day</strong>.
            </p>
            <p style="font-size: 15px; color: #444; line-height: 1.7;">
              If you need to speak with us immediately, you can call us at <a href="tel:+919825039111" style="color: #D4841A;">+91 98250 39111</a>.
            </p>
            <p style="font-size: 14px; color: #888; margin-top: 32px;">
              — Surendra & Co. Team<br>
              NH-8, Near APMC Market, Bareja, Ahmedabad
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
```

### Rate Limiting (Important for Production)

Install upstash/ratelimit or use a simple in-memory approach:
```bash
npm install @upstash/ratelimit @upstash/redis
```

Add at the top of the API route:
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 requests per minute per IP
});

const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
const { success } = await ratelimit.limit(ip);
if (!success) {
  return NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 });
}
```

---

## 10. Backend — Supabase Integration

### Installation

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Client Setup

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          try { cookieStore.set({ name, value, ...options }); } catch {}
        },
        remove(name: string, options: CookieOptions) {
          try { cookieStore.set({ name, value: '', ...options }); } catch {}
        },
      },
    }
  );
}
```

### Database Table

Run this SQL in your Supabase dashboard under SQL Editor:

```sql
-- Create commission_requests table
CREATE TABLE commission_requests (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  company         TEXT,
  phone           TEXT NOT NULL,
  coach_type      TEXT NOT NULL CHECK (coach_type IN ('luxury-sleeper', 'semi-sleeper', 'seater', 'school', 'other')),
  requirements    TEXT,
  status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes           TEXT,        -- internal notes field for Surendra & Co. use
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for sorting by most recent
CREATE INDEX idx_commission_requests_submitted_at ON commission_requests (submitted_at DESC);

-- Row Level Security: only authenticated users (admin) can read
ALTER TABLE commission_requests ENABLE ROW LEVEL SECURITY;

-- Policy: allow inserts from service role (API route uses service key for insert)
CREATE POLICY "Allow service role inserts" ON commission_requests
  FOR INSERT TO service_role WITH CHECK (true);

-- Policy: allow reads only for authenticated admin users
CREATE POLICY "Allow authenticated reads" ON commission_requests
  FOR SELECT TO authenticated USING (true);
```

### Service Role Usage in API Route

For the INSERT operation in the API route, use the **service role key** (not the anon key) to bypass RLS:

```typescript
// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!  // Server-side only, never expose to client
  );
}
```

Update the API route to use `createAdminClient()` for the insert.

### Viewing Submissions

The Supabase dashboard's Table Editor provides a built-in interface to view, filter, and update commission requests. The `status` field allows Surendra & Co. to track leads: new → contacted → quoted → closed.

---

## 11. Environment Variables

### Required Variables

```env
# .env.local (never commit this file to git)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...     # Safe to expose (RLS protects data)
SUPABASE_SERVICE_ROLE_KEY=eyJ...         # NEVER expose — server-side only

# Resend
RESEND_API_KEY=re_...

# Upstash (optional — for rate limiting)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### Variable Security Rules
- `NEXT_PUBLIC_*` variables are bundled into the client-side JS. Only use this prefix for values safe to be public.
- `SUPABASE_SERVICE_ROLE_KEY` must NEVER have the `NEXT_PUBLIC_` prefix. It is only accessible in server-side code (API routes, server components).
- `RESEND_API_KEY` must NEVER have the `NEXT_PUBLIC_` prefix.

### Adding to Vercel
All variables in `.env.local` must be added to Vercel project settings manually (see Deployment Guide section).

---

## 12. Component Inventory

```
src/
  app/
    layout.tsx                    — Root layout: fonts, metadata, global CSS
    page.tsx                      — Main page: assembles all sections in order
    api/
      contact/
        route.ts                  — POST handler: validation, Supabase, Resend

  components/
    layout/
      Navbar.tsx                  — Fixed nav, transparent/solid state, mobile drawer
      MobileDrawer.tsx            — Slide-in mobile menu
      Footer.tsx                  — 4-column footer

    loading/
      LoadingScreen.tsx           — Full-screen gate with spinner + progress bar

    canvas/
      FrameCanvas.tsx             — Canvas element: fixed left, frame rendering
      AssemblyOrchestrator.tsx    — Coordinates GSAP, frame loader, phase state

    assembly/
      AssemblySection.tsx         — 300vh scroll container + sticky inner wrapper
      ContentPanel.tsx            — Right panel: renders active phase page
      PhasePage.tsx               — Single phase content: title, desc, spec grid
      PhaseIndicator.tsx          — 5-dot progress indicator (bottom of panel)
      CanvasEdgeGradient.tsx      — The blend gradient between canvas and panel

    hero/
      HeroSection.tsx             — 100vh overlay: text, buttons, scroll indicator

    sections/
      ByTheNumbers.tsx            — 4-stat counter section
      OurRange.tsx                — Coach type card grid
      TheMaking.tsx               — 4-step process section
      Certifications.tsx          — Compliance card grid
      CommissionSection.tsx       — Left copy + right form

    form/
      CommissionForm.tsx          — Form state machine, validation, API call
      FormField.tsx               — Reusable labeled input component
      FormSelect.tsx              — Custom styled select dropdown

    ui/
      Button.tsx                  — Primary (gold solid) / Secondary (ghost) / Text
      SectionLabel.tsx            — IBM Plex Mono label tag above section titles
      StatCounter.tsx             — Animated number counter
      ScrollReveal.tsx            — IntersectionObserver-based reveal wrapper
      CanvasCover.tsx             — Clip-path wipe cover for post-assembly

  lib/
    frameLoader.ts                — Priority tier frame preloader
    canvasRenderer.ts             — drawFrameCover, initCanvas
    phaseData.ts                  — Static data: all 5 phase titles, desc, specs
    supabase/
      client.ts                   — Browser Supabase client
      server.ts                   — Server Supabase client
      admin.ts                    — Service role client (API routes only)

  styles/
    globals.css                   — CSS variables, base resets, font faces
```

---

## 13. Responsive Breakpoints

```
xs:  < 480px    — Small mobile. Single column. Canvas 60vh. Spec as list.
sm:  480–767px  — Mobile. Same as xs with more padding.
md:  768–1023px — Tablet. Still stacked (canvas top, panel bottom). 2-col grids.
lg:  1024px+    — Desktop. Side-by-side split (55/45). Full layout.
xl:  1280px+    — Large desktop. Max-width 1440px container.
2xl: 1536px+    — XL monitors. Canvas remains 55vw, content panel has more breathing room.
```

The critical breakpoint is `lg` (1024px). Below it: stacked. Above it: side-by-side. This is one breakpoint wider than the typical `md` (768px) — this ensures that tablets in portrait mode get the legible stacked layout rather than a cramped 55/45 split.

---

## 14. Performance Checklist

### Asset Preparation (Before Dev)
- [ ] All 300 frames exported as JPEG at quality 75-80 from video source
- [ ] All frames resized to match display resolution (1920×1080 max — no need for 4K)
- [ ] Frame file names: frame-001.jpg through frame-300.jpg (3-digit zero-padded)
- [ ] Total frames folder size verified ~10.8MB before deployment
- [ ] 5 key-frame exports saved separately for og:image and other uses

### Next.js Configuration
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
  },
  // Ensure frames folder is served as static files
  // They live in /public/assets/frames/ — no config needed for this
};
export default nextConfig;
```

### Runtime
- [ ] Canvas DPR capped at 2× desktop, 1.5× mobile
- [ ] requestAnimationFrame batching — only 1 canvas draw per RAF tick
- [ ] GSAP ScrollTrigger cleaned up on component unmount (`ctx.revert()`)
- [ ] ResizeObserver used for canvas resize (not window resize event)
- [ ] IntersectionObserver used for static section animations (not GSAP scroll)
- [ ] All event listeners use `{ passive: true }` where applicable
- [ ] No console.log() in production (use NODE_ENV check or strip via build config)

### Forms & API
- [ ] Zod validation runs on both client (pre-submit feedback) and server (API route)
- [ ] API route has rate limiting (Upstash or similar) before going live
- [ ] Resend domain verified (see Deployment Guide § 16.5)
- [ ] Supabase RLS policies verified with a test insert

---

## 15. File & Folder Structure

```
surendra-co/
  .env.local                      — Never commit. Contains all secrets.
  .env.example                    — Commit this. Shows variable names without values.
  .gitignore                      — Must include .env.local and /public/assets/frames/
  next.config.mjs
  tailwind.config.ts
  tsconfig.json
  package.json

  public/
    Logo.png
    assets/
      frames/
        frame-001.jpg
        frame-002.jpg
        ...
        frame-300.jpg
      keyframes/
        phase-1.jpg               — Frame ~030 (chassis)
        phase-2.jpg               — Frame ~090 (drivetrain)
        phase-3.jpg               — Frame ~150 (interior)
        phase-4.jpg               — Frame ~210 (exterior)
        phase-5.jpg               — Frame ~280 (complete — the golden-hour shot)

  src/
    app/
      layout.tsx
      page.tsx
      globals.css                 — or src/styles/globals.css
      api/
        contact/
          route.ts

    components/
      layout/         — Navbar, MobileDrawer, Footer
      loading/        — LoadingScreen
      canvas/         — FrameCanvas, AssemblyOrchestrator
      assembly/       — AssemblySection, ContentPanel, PhasePage, PhaseIndicator
      hero/           — HeroSection
      sections/       — ByTheNumbers, OurRange, TheMaking, Certifications, CommissionSection
      form/           — CommissionForm, FormField, FormSelect
      ui/             — Button, SectionLabel, StatCounter, ScrollReveal, CanvasCover

    lib/
      frameLoader.ts
      canvasRenderer.ts
      phaseData.ts
      supabase/
        client.ts
        server.ts
        admin.ts

    styles/
      globals.css                 — If not using app/globals.css
```

### .gitignore Additions
```
# Environment variables
.env.local
.env.*.local

# Frames folder (10.8MB — do not commit to git, deploy via Vercel public folder upload or CDN)
/public/assets/frames/
```

**Important note on frames:** The frames folder is 10.8MB. Committing it to git will bloat your repository history permanently. The options:
- Option A: Add to .gitignore, upload manually to Vercel via CLI (`vercel --public`) or Vercel's dashboard file upload.
- Option B: Host frames on a CDN (Cloudflare R2 or Vercel Blob Storage) and update frame paths accordingly. This is recommended for production.

---

## 16. Vercel Deployment Guide

### 16.1 Prerequisites

Before deploying, ensure you have:
- [ ] A Vercel account (free tier is sufficient for this project)
- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] A GitHub/GitLab repository with the project (excluding .env.local and frames folder)
- [ ] Supabase project created and table migrated (SQL from § 10 run)
- [ ] Resend account created and sending domain configured (§ 16.5)
- [ ] All environment variable values ready

### 16.2 Initial Deployment

#### Method A: Vercel Dashboard (Recommended for first-time)

1. Push your code to GitHub (without .env.local and without the frames folder).
2. Go to vercel.com → New Project.
3. Import your GitHub repository.
4. Configure project settings:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `.` (default)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
5. Add environment variables (see § 16.3 before proceeding).
6. Click Deploy.

#### Method B: Vercel CLI

```bash
# In project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? surendra-co
# - Directory? ./
# - Override settings? No

# After initial deploy, add env variables:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY

# Re-deploy to apply env variables:
vercel --prod
```

### 16.3 Adding Environment Variables in Vercel Dashboard

1. Go to your project in Vercel Dashboard.
2. Settings → Environment Variables.
3. Add each variable with the correct value for Production (and optionally Preview/Development environments):

| Variable Name | Environment | Sensitive |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Production, Preview | No |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Production, Preview | No |
| SUPABASE_SERVICE_ROLE_KEY | Production only | Yes |
| RESEND_API_KEY | Production only | Yes |
| UPSTASH_REDIS_REST_URL | Production only | Yes (if used) |
| UPSTASH_REDIS_REST_TOKEN | Production only | Yes (if used) |

4. Mark sensitive variables as "Sensitive" — they will be hidden after saving.
5. After adding all variables, trigger a redeploy: Deployments → three-dot menu → Redeploy.

### 16.4 Uploading the Frames Folder

Since the frames folder is in .gitignore, it needs to be added separately.

**Option A: Vercel CLI Upload (Simplest)**
```bash
# Do NOT put frames in .gitignore if using this method
# Instead, deploy once with frames included:
vercel --prod --public

# After first deploy, add frames to .gitignore to avoid future bloat
# This only works if you are okay with frames being in git once
```

**Option B: Vercel Blob Storage (Recommended for Production)**
```bash
npm install @vercel/blob

# In your Vercel project dashboard:
# Storage → Create Database → Blob
# Copy the BLOB_READ_WRITE_TOKEN to your env variables
```

Update frame paths in frameLoader.ts:
```typescript
img.src = `https://[your-blob-store-url]/frames/frame-${padFrame(frameNum)}.jpg`;
```

Upload frames to Vercel Blob:
```bash
# Script to upload all frames
node scripts/uploadFrames.mjs
```

```javascript
// scripts/uploadFrames.mjs
import { put } from '@vercel/blob';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const framesDir = './public/assets/frames';
const files = readdirSync(framesDir).filter(f => f.endsWith('.jpg'));

for (const file of files) {
  const buffer = readFileSync(join(framesDir, file));
  const blob = await put(`frames/${file}`, buffer, {
    access: 'public',
    contentType: 'image/jpeg'
  });
  console.log(`Uploaded: ${blob.url}`);
}
```

**Option C: Cloudflare R2 (Cheapest for high-traffic)**
If the site gets significant traffic, R2 has no egress fees and is cheaper than Vercel Blob at scale. Setup is similar but uses the R2 SDK.

### 16.5 Resend Domain Setup

Resend requires a verified sending domain so emails don't land in spam.

1. Go to resend.com → Domains → Add Domain.
2. Enter your domain (e.g., surendra-co.in).
3. Resend provides DNS records to add:
   - MX record
   - TXT record (for DKIM)
   - CNAME record (for tracking, optional)
4. Add these records in your domain registrar's DNS settings.
5. Wait for verification (5 minutes to 24 hours depending on DNS propagation).
6. Once verified, update the `from` address in route.ts:
   ```
   from: 'Surendra & Co. <noreply@surendra-co.in>'
   ```
7. Test with Resend's test mode before going live.

**If you do not have a custom domain yet:** Use Resend's onboarding domain `onboarding@resend.dev` for initial testing only. It has a 100 emails/day limit and is not suitable for production.

### 16.6 Custom Domain Setup in Vercel

1. Buy a domain (e.g., `surendra-co.in` from GoDaddy, Google Domains, or Namecheap).
2. Vercel Dashboard → Project → Settings → Domains.
3. Add your domain.
4. Vercel provides nameservers or A/CNAME records.
5. Update your domain registrar with Vercel's DNS records.
6. Propagation takes 5 minutes to 48 hours.
7. Vercel automatically provisions an SSL certificate via Let's Encrypt.

### 16.7 Supabase CORS Configuration

In your Supabase project:
1. Go to Settings → API.
2. Under "Allowed Origins", add your production URL: `https://surendra-co.in` and your Vercel preview URL pattern `https://*.vercel.app`.
3. Save.

### 16.8 Continuous Deployment

Once connected to GitHub, every push to the `main` branch automatically triggers a production deployment on Vercel. Pushes to other branches create preview deployments with unique URLs.

Recommended branching strategy:
```
main        → production deployment (surendra-co.in)
staging     → preview deployment (staging.surendra-co.in or Vercel URL)
feature/*   → per-feature preview deployments
```

### 16.9 Vercel Analytics (Optional)

Enable Vercel Analytics in your project dashboard (Speed Insights + Web Analytics). This is free on the hobby tier and gives you Core Web Vitals data — useful for verifying the canvas animation doesn't degrade LCP/CLS scores.

```bash
npm install @vercel/analytics @vercel/speed-insights
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 16.10 Post-Deployment Verification Checklist

After every production deployment:
- [ ] Open the live URL on Chrome desktop — verify loading screen, animation, all sections
- [ ] Open on Safari desktop — canvas + GSAP can behave differently on Safari
- [ ] Open on an Android mobile (Chrome) — verify stacked layout, canvas scrubbing
- [ ] Open on iPhone (Safari) — webkit-specific canvas issues can occur
- [ ] Submit a test form — verify email arrives at surendra_bareja@yahoo.com
- [ ] Check Supabase Table Editor — verify test submission was saved
- [ ] Verify Resend dashboard shows the test email as delivered (not bounced)
- [ ] Check Vercel Function Logs — verify no 500 errors in the contact API route
- [ ] Confirm SSL certificate is active (green padlock in browser)
- [ ] Test the smooth-scroll anchors (Our Work, Range, Process, Contact in nav)

---

## 17. Known Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| 55/45 split feels too narrow for bus on 1024px screens | Medium | Medium | Test at exactly 1024px. If canvas feels cramped, shift split to 60/40 or lower desktop breakpoint to 1100px. |
| Cormorant Garamond renders poorly at small sizes on Windows | Low | Low | Only use Cormorant for headings 28px and above. Inter handles all small text. |
| Canvas frame stutters on 8-year-old laptops | Medium | Medium | scrub: 0.8 smoothing, RAF-batched drawing, DPR cap at 2×. Test on a 2016-era laptop specifically. |
| Resend emails land in Yahoo Mail spam | Medium | High | Verify sending domain properly (DKIM + SPF). Add SPF record. Test with mail-tester.com before launch. |
| Supabase free tier has a 500MB database limit | Low | Low | Commission requests are tiny (~1KB each). 500MB holds ~500,000 records. Not a concern for years. |
| Vercel hobby tier has 100GB bandwidth per month | Low | Low | 10.8MB frames × estimated monthly visitors. Monitor Vercel usage dashboard. Upgrade to Pro ($20/mo) if bandwidth approaches limit. |
| Yahoo email address may block automated emails | Medium | High | Test thoroughly. If Yahoo blocks, add surendra_bareja@yahoo.com to Resend's allowlist and whitelist on the Yahoo side. Consider a Gmail as backup. |
| Client requests changes to frame content after frames are fixed | Possible | Medium | The frame-to-phase mapping is in phaseData.ts as a constant. Changing PHASE_BOUNDARIES is a 1-line change. Frame content cannot change without a new video export. |
| navigator.deviceMemory API not available on all browsers | Low | Low | Default to 4GB if unavailable (the \|\| 4 fallback). Safari does not support this API but Safari on iPhone 12+ has sufficient RAM for 1.5× DPR. |

---

*End of Specification — "The Showcase" Premium UI*  
*Version 1.0 — Ready for development handoff.*
