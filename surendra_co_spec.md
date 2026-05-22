# Surendra & Co. — Complete Project Specification
## Volvo 9600 XL Landing Page · Technical & Design Blueprint

**Version:** 1.0  
**Prepared for:** Development Handoff  
**Project Stack:** Next.js 14 (App Router), React, Tailwind CSS, GSAP ScrollTrigger  

---

## Table of Contents

1. [Project Philosophy](#1-project-philosophy)
2. [Asset Strategy](#2-asset-strategy)
3. [Device Strategy — Desktop vs Mobile](#3-device-strategy)
4. [Theme & Design System](#4-theme--design-system)
5. [Page Architecture Overview](#5-page-architecture-overview)
6. [Section-by-Section Flow](#6-section-by-section-flow)
   - 6.1 Loading State
   - 6.2 Navigation Bar
   - 6.3 Hero Intro
   - 6.4 Assembly Animation (Desktop)
   - 6.4M Assembly Animation (Mobile)
   - 6.5 By the Numbers
   - 6.6 Our Range
   - 6.7 The Making
   - 6.8 Certifications
   - 6.9 Contact / Commission
   - 6.10 Footer
7. [GSAP & Scroll Architecture](#7-gsap--scroll-architecture)
8. [Frame Loading Strategy (Desktop)](#8-frame-loading-strategy-desktop)
9. [Video Scrubbing Strategy (Mobile)](#9-video-scrubbing-strategy-mobile)
10. [Component Inventory](#10-component-inventory)
11. [Responsive Breakpoints](#11-responsive-breakpoints)
12. [Performance Checklist](#12-performance-checklist)
13. [File & Folder Structure](#13-file--folder-structure)
14. [Known Risks & Mitigations](#14-known-risks--mitigations)

---

## 1. Project Philosophy

### What this site must communicate
Surendra & Co. is a 25-year-old coach body manufacturer based in Ahmedabad. Their buyer is not a consumer — it is a fleet operator, a state transport corporation, a travel company signing a multi-coach contract. That buyer needs to feel **trust in engineering precision**, not excitement about a tech product.

The site has one job before the contact form: convince a serious B2B buyer that Surendra & Co. is the kind of manufacturer whose work is worth a phone call.

### What the animation is for
The bus assembly sequence is not decoration. It is the argument. It says: we know every single component of this vehicle because we built it from the ground up. Every phase of the animation should feel like a master craftsman walking a client through the shop floor.

### Guiding principle for every design decision
> *"If a fleet manager from a state transport corporation opened this on their office computer, would this feel like a company they could trust with a ₹10 Cr order?"*

If the answer is yes, proceed. If the answer is "it looks cool but feels like a startup," revise.

---

## 2. Asset Strategy

### The Core Problem (Solved)
- 732 JPEGs at original quality ≈ 60MB+ — too large for initial load
- Compressed video ≈ 17MB — acceptable for preload on desktop broadband
- 5 key frames extracted from the video ≈ ~500KB — perfect for mobile

### Desktop: Hybrid Frame + Priority Loading

**DO NOT preload all 732 frames at once.** The strategy is layered:

#### Priority Tier 1 — Immediate load (frames loaded before page reveals)
Load every 5th frame first: frames `001, 006, 011, 016 ... 726, 731`.  
That is approximately **147 frames**. These are the "skeleton" of the animation.  
At ~40–60KB per compressed frame, this is roughly **6–9MB** — acceptable as a preload.

When the user scrolls and lands on frame 23, the browser checks:  
- Is frame 023 loaded? → Show it.  
- Not loaded yet? → Show the nearest loaded priority frame (e.g., frame 021). This is imperceptible at normal scroll speed.

#### Priority Tier 2 — Background loading (starts after Tier 1 completes)
All remaining frames load in ascending order in the background using an `Image()` preloader queue. This runs at low priority using `requestIdleCallback` so it never competes with user interaction.

#### Priority Tier 3 — On-demand load
If the user scrolls faster than the background loader, and the exact frame is not available, the nearest loaded frame is shown and the target frame is immediately promoted to the front of the load queue.

#### Implementation Detail — Frame Preloader
```
function createFrameLoader(totalFrames, priorityInterval = 5) {
  const loaded = new Set();
  const images = new Array(totalFrames);
  const queue = [];

  // Build priority queue: every 5th frame first
  for (let i = 1; i <= totalFrames; i += priorityInterval) queue.push(i);
  // Then fill remaining frames
  for (let i = 1; i <= totalFrames; i++) {
    if (i % priorityInterval !== 1) queue.push(i);
  }

  function loadNext() {
    if (queue.length === 0) return;
    const frameNum = queue.shift();
    const img = new Image();
    img.onload = () => {
      loaded.add(frameNum);
      requestIdleCallback(loadNext);
    };
    img.src = `/assets/frames/ezgif-frame-${String(frameNum).padStart(3, '0')}.jpg`;
    images[frameNum - 1] = img;
  }

  // Start loading — concurrently fire 6 loaders
  for (let i = 0; i < 6; i++) loadNext();

  function getNearestFrame(target) {
    if (loaded.has(target)) return images[target - 1];
    let lo = target - 1, hi = target + 1;
    while (lo >= 1 || hi <= totalFrames) {
      if (lo >= 1 && loaded.has(lo)) return images[lo - 1];
      if (hi <= totalFrames && loaded.has(hi)) return images[hi - 1];
      lo--; hi++;
    }
    return null;
  }

  return { getNearestFrame, loaded, images };
}
```

#### Loading Gate
The page will not reveal itself (loading screen will not dismiss) until:
- Priority Tier 1 (all 147 priority frames) are fully loaded, AND
- The first 30 frames are loaded (to ensure a smooth start)

This ensures that even if the user immediately starts scrolling fast, the experience is never blank.

---

### Mobile: Video Scrubbing

The 17MB compressed MP4 is the single asset for mobile.

```html
<video
  id="assembly-video"
  src="/assets/assembly.mp4"
  preload="auto"
  muted
  playsinline
  webkit-playsinline
>
```

`preload="auto"` tells the browser to download the entire video before playback. On a typical 4G connection (10–15 Mbps), 17MB downloads in 9–14 seconds — acceptable given that the loading screen hides this wait.

The video must be:
- Encoded as H.264 (broad device compatibility)
- Resolution: 1280×720 (720p sufficient for mobile viewport)
- Frame rate: 24fps (matches the original)
- Audio track: none (strip it entirely — saves ~0.5MB)

The loading gate on mobile does not dismiss until the video's `readyState >= 3` (HAVE_FUTURE_DATA), meaning enough is buffered to begin controlled scrubbing.

---

### 5 Key Frames (Mobile Static Sections)

Save the following frames as high-quality static JPEGs (~150–200KB each):

| File Name | Source Frame | Represents |
|---|---|---|
| `phase-1-chassis.jpg` | Frame ~080 | Best view of bare chassis |
| `phase-2-drivetrain.jpg` | Frame ~220 | Engine + wheels mounted |
| `phase-3-interior.jpg` | Frame ~380 | Interior fully exposed |
| `phase-4-exterior.jpg` | Frame ~540 | Panels installed, glass in |
| `phase-5-complete.jpg` | Frame ~720 | Fully finished bus |

These are used as section backgrounds in the mobile 5-phase layout. Total: ~750KB–1MB.

---

## 3. Device Strategy

The site renders two fundamentally different experiences based on screen width. The decision point is `768px` (Tailwind's `md` breakpoint).

```
≥ 768px  →  Desktop Experience
< 768px  →  Mobile Experience
```

This is determined at mount time in React:
```js
const isMobile = window.innerWidth < 768;
```

Both experiences share: navigation, all content sections below the animation, contact form, footer, and the theme.

They differ only in the **assembly animation section**.

---

## 4. Theme & Design System

### Aesthetic Direction: Industrial Premium

Not dark tech, not luxury fashion, not startup SaaS. Think: the inside of a precision engineering facility — **purposeful, warm, credible**. Every surface should feel like it was designed to last 25 years, not to win a Awwwards award.

Reference mental models: Rolls-Royce aerospace, Tata Motors commercial vehicles, precision German machine toolmakers (Trumpf, Schunk).

### Color Palette

```css
:root {
  /* Backgrounds */
  --bg-base:        #0D1A24;   /* Deep steel blue-black. Warm, not cold. */
  --bg-surface:     #152030;   /* Cards, panels, elevated surfaces */
  --bg-elevated:    #1C2D3E;   /* Hover states, active cards */

  /* Accents */
  --accent-amber:   #C8851A;   /* Primary. Industrial amber-gold. Instrument dials. */
  --accent-amber-l: #E8A832;   /* Lighter amber — hover states, highlights */
  --accent-blue:    #3A7FBF;   /* Secondary. Volvo's brand blue. Technical detail. */
  --accent-blue-l:  #5599D4;   /* Lighter blue — hover, focus rings */

  /* Text */
  --text-primary:   #EDE8DF;   /* Warm off-white. Never harsh pure white. */
  --text-secondary: #8A9BAB;   /* Muted steel blue-grey. Metadata, labels. */
  --text-tertiary:  #556A7A;   /* Very muted. Timestamps, captions. */

  /* Borders */
  --border-subtle:  rgba(200, 133, 26, 0.15);   /* Amber tint border */
  --border-strong:  rgba(200, 133, 26, 0.40);   /* Hover / active borders */
  --border-blue:    rgba(58, 127, 191, 0.20);   /* Technical section borders */

  /* Overlays */
  --overlay-dark:   rgba(13, 26, 36, 0.70);     /* Canvas text overlay */
  --overlay-glass:  rgba(21, 32, 48, 0.55);     /* Glassmorphic cards */

  /* Shadows */
  --shadow-amber:   0 0 40px rgba(200, 133, 26, 0.18);
  --shadow-blue:    0 0 30px rgba(58, 127, 191, 0.15);
}
```

### Typography

```css
/* Display / Headlines */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&display=swap');

/* Body / UI */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

/* Technical labels / specs / metadata */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

**Usage rules:**
- `Barlow Condensed 800` — hero headings, phase numbers, section titles
- `Barlow Condensed 600` — sub-headings, card titles
- `DM Sans 400/500` — body text, descriptions, form labels
- `JetBrains Mono 400` — spec values (HP figures, berth counts, measurements), compliance codes

The combination reads as: engineered, not designed. The condensed display font gives headlines presence without taking width. The mono font on spec values signals precision and accuracy.

### Spacing System
Use Tailwind's default scale. Never use arbitrary values except for `h-screen` equivalents in scroll sections.

### Glassmorphic Cards
```css
.glass-card {
  background: var(--overlay-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
}

.glass-card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-amber);
}
```

---

## 5. Page Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  LOADING SCREEN                          (hidden on ready)  │
├─────────────────────────────────────────────────────────────┤
│  NAVIGATION BAR                          (fixed, z-50)      │
├─────────────────────────────────────────────────────────────┤
│  CANVAS (desktop) / VIDEO (mobile)       (fixed full-screen)│
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  HERO INTRO OVERLAY                      (100vh)            │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  ASSEMBLY SECTION                        (500vh desktop)    │
│    Phase 1: Foundation                                      │
│    Phase 2: Drivetrain                                      │
│    Phase 3: Interior                                        │
│    Phase 4: Exterior                                        │
│    Phase 5: Masterpiece                                     │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  [Canvas section ends here — solid background below]        │
├─────────────────────────────────────────────────────────────┤
│  BY THE NUMBERS                          (static section)   │
├─────────────────────────────────────────────────────────────┤
│  OUR RANGE                               (static section)   │
├─────────────────────────────────────────────────────────────┤
│  THE MAKING (process timeline)           (static section)   │
├─────────────────────────────────────────────────────────────┤
│  CERTIFICATIONS & COMPLIANCE             (static section)   │
├─────────────────────────────────────────────────────────────┤
│  COMMISSION / CONTACT FORM               (static section)   │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                  (static section)   │
└─────────────────────────────────────────────────────────────┘
```

The `<canvas>` (or `<video>`) element is `position: fixed` covering the full screen. Everything layered on top of it during the scroll-tied animation phase uses `position: relative` with transparent backgrounds so the canvas shows through.

Once the assembly section ends, a solid `--bg-base` background slides over the canvas visually, and from that point forward the page is standard static layout.

---

## 6. Section-by-Section Flow

---

### 6.1 Loading State

**Trigger:** Shown immediately on mount, before any content is visible.  
**Dismiss:** When loading gate conditions are met (see Asset Strategy § 2).

**Layout:**
```
Full screen · background: var(--bg-base) · z-index: 100
┌─────────────────────────────────────────────┐
│                                             │
│              [Logo — 60x60px]               │
│           SURENDRA & CO.                    │
│                                             │
│              [Spinner — 48x48]              │
│                                             │
│         ASSEMBLING YOUR EXPERIENCE          │
│         ████████████░░░░░░░░  63%           │
│                                             │
└─────────────────────────────────────────────┘
```

**Spinner:** 48px circle, 2px border. Color: `var(--accent-amber)` at 20% opacity. Top border: full `var(--accent-amber)`. Rotation: CSS `animate-spin`.

**Progress bar:** Reflects actual frame loading progress. Updated every 200ms by polling `loader.loaded.size / 147` (total priority frames). This gives the user real feedback, not a fake animation.

**Text:** "ASSEMBLING YOUR EXPERIENCE" — `Barlow Condensed 600`, `var(--accent-amber)` at 60%, `tracking-[0.4em]`, 11px.

**Exit animation:** When gate conditions are met, the entire loading screen fades out over 600ms. The page content is already rendered beneath it.

---

### 6.2 Navigation Bar

**Type:** Fixed, full-width, `z-50`.

**Initial state (over canvas/animation):**
- Background: fully transparent
- A very subtle gradient: `linear-gradient(to bottom, rgba(13,26,36,0.8), transparent)` fades out over 80px — enough to make the nav legible without boxing it in

**Scrolled state (triggered after 80px scroll):**
- Background transitions to `var(--bg-surface)` with `backdrop-filter: blur(10px)`
- Bottom border: `1px solid var(--border-subtle)` fades in
- Transition: `300ms ease`

**Left side:**
- Logo container: `48x48px`, glassmorphic pill (`bg-white/5`, `backdrop-blur`, `border border-white/10`, `rounded-xl`)
- Logo image: `/Logo.png`, `36x36px`, `object-contain`
- Company name: "SURENDRA & CO." — `Barlow Condensed 600`, 15px, `var(--text-primary)`, `tracking-wider` — hidden below `md`

**Right side (desktop):**
- Nav links: "Our Work", "Range", "Process", "Contact" — `DM Sans 500`, 13px, `var(--text-secondary)`, hover: `var(--accent-amber)` with `200ms` transition. Each is a smooth-scroll anchor.
- CTA button: "START YOUR BUILD" — pill shape, `border: 1px solid var(--accent-amber)`, background `rgba(200, 133, 26, 0.10)`, `DM Sans 500`, 13px, `var(--accent-amber)`. Hover: background `rgba(200, 133, 26, 0.20)`, border opacity to 60%.

**Right side (mobile):**
- Hamburger icon only — `24x24px`, `var(--text-primary)`
- Opens a full-screen mobile menu (described in 6.2M below)

**Mobile menu (`z-60` drawer):**
- Slides in from right. Background: `var(--bg-surface)`. Width: 280px.
- Top: logo + close button
- Links stacked vertically: each 56px tall, 20px `Barlow Condensed 600`, border-bottom `var(--border-subtle)`
- Bottom: "START YOUR BUILD" full-width button in amber

---

### 6.3 Hero Intro

**Type:** Scroll section layered over the canvas. Canvas is showing the very beginning of the video/frames — the pristine chassis shot.

**Height:** `100vh`

**Layout:** Centered vertically and horizontally.

```
                  MASTER COACHBUILDERS
                  ─────────────────────
                     CRAFTED.
               From bare steel to the road.
```

**"MASTER COACHBUILDERS":**
- `Barlow Condensed 600`, `tracking-[0.6em]`, `var(--accent-amber)`, 12–14px
- Drop shadow: `0 0 20px rgba(200, 133, 26, 0.5)` — glowing amber

**"CRAFTED.":**
- `Barlow Condensed 800`, `10vw` (clamp to max `120px`), `var(--text-primary)`
- Text shadow: `0 4px 60px rgba(13, 26, 36, 0.9)` — ensures legibility over any frame
- The period in "CRAFTED." is colored `var(--accent-amber)` — a subtle detail that rewards attention

**"From bare steel to the road.":**
- `DM Sans 300`, `18px`, `var(--text-secondary)`, `mt-4`
- Fades in 400ms after the heading

**Scroll indicator:**
- Positioned at `bottom: 48px`, centered
- Text: "SCROLL TO BUILD" — `JetBrains Mono`, 10px, `var(--text-tertiary)`, `tracking-[0.3em]`
- Below it: a vertical line, `1px wide`, `40px tall`, amber, animating a top-to-bottom fill/drain loop

**Exit animation:**
As user scrolls down, this entire overlay scales up and fades out (GSAP: `scale: 1.3, opacity: 0` over the first 20% of the assembly section scroll range).

---

### 6.4 Assembly Section — DESKTOP

**Height:** `500vh` (5 phases × 100vh equivalent scroll distance each)

**The canvas is fixed and full-screen behind everything.**

The assembly section `<div>` is a tall scroll container. GSAP's `ScrollTrigger` pins a sticky inner `<div>` to the viewport for the full 500vh duration.

#### Phase Progress Indicator

A persistent HUD element fixed to the right edge of the screen during the assembly section.

```
  ─── Phase 1 ●  [only label of active phase shown]
      Phase 2 ○
      Phase 3 ○
      Phase 4 ○
      Phase 5 ○
```

- Vertical stack, centered to right edge, 24px from right
- Each phase: a 6px circle + 12px `JetBrains Mono` label
- Active phase: amber circle + amber text
- Inactive: `var(--border-subtle)` circle + `var(--text-tertiary)` text
- Thin vertical connecting line between circles: `var(--border-subtle)`
- Hidden below `md`

#### Frame Scrubbing Logic

The scroll progress within the 500vh section (0.0 → 1.0) maps linearly to frames 1–732:

```js
const frameIndex = Math.round(scrollProgress * (TOTAL_FRAMES - 1)) + 1;
const img = frameLoader.getNearestFrame(frameIndex);
if (img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
```

Canvas `drawImage` is called inside a `requestAnimationFrame` loop tied to the GSAP ticker for smoothness.

#### Phase Boundaries & Content Panels

The 500vh scroll range is divided into 5 equal 100vh sub-ranges:

| Phase | Scroll Range | Frame Range | Canvas View |
|---|---|---|---|
| 1 — Foundation | 0–20% | 1–146 | Bare chassis, steel framework |
| 2 — Drivetrain | 20–40% | 147–292 | Engine block, wheels mounting |
| 3 — Interior | 40–60% | 293–438 | Interior cage, sleeper pods, curtains |
| 4 — Exterior | 60–80% | 439–584 | Body panels, glass installation |
| 5 — Masterpiece | 80–100% | 585–732 | Final assembled bus, livery |

#### Content Panel Behavior Per Phase

Each phase has a content panel. The panel is a glassmorphic card positioned to the **right side** of the viewport during phases 1–4, and **centered** during phase 5 (finale).

**Panel dimensions:** `max-width: 420px`, `min-height: 280px`, right-aligned with `right: 5vw`.

**Panel lifecycle (each phase):**
1. Enters: slides in from `right: -500px` → `right: 5vw`, `opacity: 0 → 1`, over `400ms ease-out`. Triggered when phase begins.
2. Holds: stationary for the middle 60% of the phase's scroll duration.
3. Exits: slides out to `right: -500px`, `opacity: 1 → 0`, over `300ms ease-in`. Triggered when phase ends.

**Panel Content Structure:**
```
┌──────────────────────────────────────────────┐
│ [color accent bar — 3px full width, amber/   │
│  purple/blue depending on phase]             │
│                                              │
│  01              [Phase title in Barlow 800] │
│                  [Large number, 72px, muted] │
│                                              │
│  PHASE TITLE                                 │
│  [Barlow Condensed 700, 28px, text-primary]  │
│                                              │
│  [Description paragraph — DM Sans 400, 14px,│
│   text-secondary, max 3 lines]               │
│                                              │
│  ──────────────────────────────────────────  │
│                                              │
│  [Spec grid — 2 columns]                     │
│  LABEL          VALUE                        │
│  [Mono 10px]    [Mono 12px amber]            │
│  LABEL          VALUE                        │
│  LABEL          VALUE                        │
│                                              │
└──────────────────────────────────────────────┘
```

**Phase 1 — The Foundation:**
- Accent: `var(--accent-amber)` bar
- Title: "The Bare Foundation"
- Description: "Every Surendra coach begins the same way — raw high-tensile structural steel, precision-cut and welded by hand. The chassis is the covenant. Everything else is built upon it."
- Specs:
  - FRAMEWORK: High-Tensile Steel
  - COMPLIANCE: AIS 052 Certified
  - WELD TYPE: MIG/TIG Structural
  - UNDERCARRIAGE: Commercial Grade

**Phase 2 — The Drivetrain:**
- Accent: `var(--accent-blue)` bar
- Title: "Drivetrain Integration"
- Description: "The Volvo B11R engine — 430 horsepower, Euro VI compliant — is seated into the rear compartment. Four heavy-duty commercial axle assemblies lock into position."
- Specs:
  - ENGINE: Volvo B11R
  - OUTPUT: 430 HP
  - TORQUE: 2100 Nm
  - EMISSION: Euro VI
  - TRANSMISSION: I-Shift 12-speed

**Phase 3 — The Interior:**
- Accent: `#8B5CF6` (purple) bar
- Title: "Bespoke Interior Architecture"
- Description: "A custom double-decker steel cage rises around the sleeper layout. Individual berths are upholstered in blue and tan leather. Theatre-gradient wood flooring. Yellow privacy curtains on both decks."
- Specs:
  - BERTHS: 40 Premium Sleepers
  - UPHOLSTERY: Italian-Grade Leather
  - FLOORING: Wood-Pattern Theatre
  - DECKS: Double — Upper + Lower
  - CLIMATE: Dual-Zone AC

**Phase 4 — The Exterior:**
- Accent: `var(--accent-blue)` bar
- Title: "The Exterior Shell"
- Description: "Aerodynamic silver metallic body panels slide into place over the structural cage. Panoramic glass units are precision-fitted — keeping the interior fully visible and the exterior fully sealed."
- Specs:
  - PANELS: Silver Metallic Alloy
  - GLASS: Panoramic Tinted
  - WINDSHIELD: Laminated Safety
  - SEALING: Weatherproof Gasket
  - AERODYNAMICS: Wind-Tunnel Tested

**Phase 5 — The Masterpiece:**
- Accent: `var(--accent-amber)` bar, full width gradient glow behind panel
- Title: "The Finished Masterpiece"
- Description: "25 years of craft. One coach at a time."
- Panel is centered, wider (`max-width: 580px`), with an additional "Commission Yours" button linking to the contact form
- Specs: None — replaced by trust statement and CTA

---

### 6.4M Assembly Section — MOBILE

**This replaces the desktop canvas section entirely on screens < 768px.**

**No canvas. No video scrubbing on-scroll.** Instead: 5 full-screen scroll-snap sections.

#### Container
```css
.mobile-assembly {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}
.mobile-phase {
  scroll-snap-align: start;
  height: 100vh;
  position: relative;
}
```

Each `.mobile-phase` is a full-viewport section. The key frame JPEG for that phase is the `background-image`, cover-fitted.

#### Phase Navigation Bar (mobile)
A fixed element at the top of the mobile assembly section (below the main nav):
```
  ●─────────────────────────────────
  1    2    3    4    5
  ─────────●───────────────────────
```
5 numbered dots connected by a line. Active dot: filled amber, 12px. Inactive: outlined, 8px. Updates as user snaps between phases. Tapping a dot scrolls to that phase instantly.

#### Each Phase Layout (mobile)
```
┌─────────────────────────────────┐
│                                 │
│  [Key frame as full-bleed bg]   │
│                                 │
│  [Dark gradient overlay from    │
│   bottom 60% of screen]         │
│                                 │
│                                 │
│                                 │
│  ───────────────────────────    │
│  01 · THE FOUNDATION            │ ← Barlow Condensed 700, 24px
│                                 │
│  [Description — DM Sans 14px]   │
│                                 │
│  ┌────────┐ ┌────────┐          │
│  │ LABEL  │ │ LABEL  │          │
│  │ Value  │ │ Value  │          │
│  └────────┘ └────────┘          │
│  ┌────────┐ ┌────────┐          │
│  │ LABEL  │ │ LABEL  │          │
│  │ Value  │ │ Value  │          │
│  └────────┘ └────────┘          │
│                                 │
│     ↓  Swipe to next phase      │
└─────────────────────────────────┘
```

The content card at the bottom is a glassmorphic panel occupying the bottom 45% of the viewport.

**Crossfade between phases:**
When the user swaps between phases (scroll-snap fires), the background image crossfades over `400ms`. This is achieved by layering two `<img>` elements — current phase is `opacity: 1`, next phase is `opacity: 0` preloaded underneath. On snap, they swap.

---

### 6.5 By the Numbers

**Type:** Static section (no canvas behind it).  
**Background:** `var(--bg-base)`. At the very top of this section, a `2px` amber gradient bar marks the visual transition out of the canvas sequence.

**Layout (desktop):** 4 large number cards in a horizontal row.  
**Layout (mobile):** 2×2 grid.

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│           BUILT OVER DECADES                             │
│           The Numbers Don't Lie                          │
│                                                          │
│   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐    │
│   │  25+   │   │  500+  │   │ ₹800Cr │   │   40   │    │
│   │ Years  │   │Coaches │   │Revenue │   │ Berths │    │
│   └────────┘   └────────┘   └────────┘   └────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Number cards:**
- Background: `var(--bg-surface)`, border `var(--border-subtle)`, `rounded-2xl`
- Number: `Barlow Condensed 800`, `72px`, `var(--accent-amber)`
- Label: `DM Sans 500`, `14px`, `var(--text-secondary)`, uppercase, tracked
- On scroll-into-view: the number animates from 0 to its final value over `1800ms` using `CountUp.js` or a custom RAF counter

---

### 6.6 Our Range

**Type:** Static section.  
**Background:** `var(--bg-surface)` — slightly lighter than base for visual separation.

**Purpose:** Show that Surendra & Co. builds more than just the 9600 XL. Even if content is sparse initially, the structure is in place.

**Section header:**
- "OUR RANGE" — `JetBrains Mono`, `11px`, `var(--accent-blue)`, `tracking-[0.4em]`
- "Every Coach. Engineered Here." — `Barlow Condensed 800`, `clamp(32px, 5vw, 56px)`, `var(--text-primary)`

**Coach type cards (grid: 3 columns desktop, 1 column mobile):**

Each card:
```
┌─────────────────────────────────────┐
│  [Illustration / Silhouette / Photo]│ ← 200px tall image area
│  ─────────────────────────────────  │
│  LUXURY SLEEPER                     │ ← Barlow Condensed 700, 20px
│  2×1 berth · 40 seats               │ ← DM Sans 14px, text-secondary
│                                     │
│  ● Volvo B11R Chassis               │ ← Feature bullets, 13px
│  ● Italian Leather Upholstery       │
│  ● Dual-Zone Climate Control        │
│                                     │
│  [Know More →]                      │ ← anchor or modal trigger
└─────────────────────────────────────┘
```

**Initial coach types to include (populate with client later):**
1. Luxury Sleeper Coach (9600 XL style) — already documented
2. Semi-Sleeper Coach — 2+1 seating, partially reclining seats
3. Seater Coach — standard long-route day travel coach
4. School / Institutional Bus — robust, safety-focused

If actual photos are unavailable, use SVG side-profile silhouettes of each bus type. These can be simple but precise line drawings — they convey product range without needing photography.

---

### 6.7 The Making — Process Timeline

**Type:** Static section.  
**Background:** `var(--bg-base)`.

**Purpose:** Answer the unspoken B2B buyer question: "What does the process look like if I commission you?" Builds trust by demonstrating transparency.

**Section header:**
- "THE PROCESS" — mono label, amber
- "From Order to Road." — Barlow Condensed 800

**Layout (desktop):** Horizontal 4-step timeline with connecting line.  
**Layout (mobile):** Vertical timeline, left-aligned, with vertical connecting line.

**Steps:**
```
Step 1: DESIGN & CONSULTATION
Icon: Blueprint/ruler icon (Lucide)
"We begin with your requirements — route type, passenger load, comfort tier, and any customizations. Our engineers produce a detailed floor plan and specification sheet before a single frame is cut."
Timeline callout: "Week 1–2"

Step 2: FABRICATION
Icon: Wrench/settings icon
"The chassis arrives from Volvo. Our structural team begins the steel cage — every weld, every joint performed to AIS 052 specification. This phase produces the fundamental architecture of the coach."
Timeline callout: "Week 3–8"

Step 3: FIT-OUT & FINISHING
Icon: Layers icon
"Interior installation: berths, upholstery, flooring, electrical, AC systems, curtains, lighting. Simultaneously, exterior panels are fitted and painted to your specified livery."
Timeline callout: "Week 9–14"

Step 4: QC & DELIVERY
Icon: Shield-check icon
"Full quality control pass: structural integrity check, road-load simulation, electrical systems test, RTO documentation. Coach is then transported to your depot — fully compliant, fully yours."
Timeline callout: "Week 15–16"
```

Each step card has a step number in large muted text (`Barlow Condensed 800`, `96px`, `var(--text-tertiary)`) behind the content — a visual "watermark" that gives depth without competing.

The connecting line between steps is amber on desktop (horizontal), amber on mobile (vertical). It animates — drawing from left to right as the section scrolls into view.

---

### 6.8 Certifications & Compliance

**Type:** Static section.  
**Background:** `var(--bg-surface)`.

**Purpose:** Disproportionately important for fleet buyers and institutional procurement. A single "AIS 052 Certified" badge can be the deciding factor.

**Layout:** A centered 2-column or 3-column grid of certification cards.

**Certification cards:**
```
┌──────────────────────────────────────┐
│                                      │
│     [Icon — Shield, Award, etc.]     │  ← 40px, amber
│                                      │
│     AIS 052                          │  ← Barlow Condensed 700, 22px
│     Body Code Compliance             │  ← DM Sans 14px, text-secondary
│                                      │
│     Ministry of Road Transport       │  ← JetBrains Mono 11px, text-tertiary
│     & Highways, Govt. of India       │
│                                      │
└──────────────────────────────────────┘
```

**Known certifications to include:**
1. AIS 052 — Coach Body Standards (MoRTH)
2. BS VI / Euro VI — Emission compliance (Volvo engine-level, worth mentioning)
3. ISO 9001 — Quality Management (if applicable — confirm with client)
4. BIS Certification — If applicable

Below the cards, a small note:
> "All vehicles are subject to full pre-delivery inspection and arrive with complete RTO documentation."

---

### 6.9 Commission Section (Contact Form)

**Type:** Static section.  
**Background:** `var(--bg-base)` with two ambient glow orbs — one amber at top-left, one blue at bottom-right — `600px` diameter, `blur(160px)`, `opacity: 0.12`.

**Layout:** Two columns on desktop (50/50), stacked on mobile.

**Left Column:**
```
COMMISSION                              ← mono label
Start Your Build.                       ← Barlow Condensed 800, with
                                          "Build." in amber gradient
─────────────────────────────────────
25 years of building coaches for
India's roads. Every vehicle is
commissioned individually — no
assembly lines, no stock units.
Tell us what you need.
─────────────────────────────────────
● Custom-Built to Specification
● AIS 052 Fully Compliant
● Volvo-Certified Chassis
● Pan-India Delivery
─────────────────────────────────────
Contact us directly:
📞  +91 98250 39111
✉   surendra_bareja@yahoo.com
📍  NH-8, Near APMC Market,
    Bareja – 382425, Ahmedabad
```

**Right Column (Form):**

Form is a glassmorphic card (`glass-card`, `rounded-3xl`, `p-8`).

Fields (all use floating label pattern):
1. Full Name — text input
2. Work Email — email input
3. Company / Organisation — text input
4. Phone Number — tel input (added — standard for Indian B2B contact)
5. Coach Type Interested In — `<select>` dropdown with options: Luxury Sleeper, Semi-Sleeper, Seater Coach, School/Institutional, Other/Custom
6. Requirements — `<textarea>`, 4 rows, with placeholder "Number of coaches, route type, any specific requirements..."

**Submit Button:**
Full-width, `64px` tall, `border-radius: 12px`, background `var(--accent-amber)`, text "Request Consultation" in `Barlow Condensed 700`, 18px, dark text (`var(--bg-base)`).
Hover: background `var(--accent-amber-l)`, scale `1.01`, transition `200ms`.

**Form States:**

| State | Button Content | Below-button message |
|---|---|---|
| Idle | "Request Consultation" + ArrowRight icon | — |
| Loading | Spinning loader, no text | — |
| Success | CheckCircle + "Message Sent" | "We'll reach out within 1 business day." in green |
| Error | XCircle + "Try Again" | Error message in red |

Form submission targets a Next.js API route `/api/contact` which uses Nodemailer or Resend to send an email to `surendra_bareja@yahoo.com`.

---

### 6.10 Footer

**Background:** `#060810` (deepest dark — visually distinct from the rest).  
**Top border:** `1px solid` amber gradient (left-to-right: transparent → amber → transparent).

**Layout:** 3 columns + bottom bar.

**Column 1 — Brand:**
- Logo box (same as navbar) + "SURENDRA & CO." heading
- "COACH BODY BUILDERS" — `JetBrains Mono`, amber, tracked
- One sentence description: "Precision-engineered coaches, built by hand in Ahmedabad for over 25 years."
- Social icons (if any — placeholder for now)

**Column 2 — Contact:**
- Title: "GET IN TOUCH"
- +91 98250 39111 — with phone icon, amber on hover
- surendra_bareja@yahoo.com — with mail icon, amber on hover
- Both are `<a href>` links (tel: and mailto:)

**Column 3 — Location:**
- Title: "FIND US"
- N. H. No. 8, Near APMC Market
- Bareja – 382425
- Taluka: Daskroi, District: Ahmedabad
- Small embedded Google Maps link (opens in new tab)

**Bottom Bar:**
- Left: © 2025 Surendra & Co. All rights reserved.
- Right: Privacy Policy · Terms of Service (placeholder links)
- Both in `DM Sans 400`, 12px, `var(--text-tertiary)`

---

## 7. GSAP & Scroll Architecture

### Scroll Sections Summary

```
Section                    GSAP Role           Height
─────────────────────────────────────────────────────
Hero Intro                ScrollTrigger        100vh
Assembly Section          ScrollTrigger pin    500vh (desktop)
  Phase 1 (frames 1-146)  tween progress       100vh
  Phase 2 (147-292)       tween progress       100vh
  Phase 3 (293-438)       tween progress       100vh
  Phase 4 (439-584)       tween progress       100vh
  Phase 5 (585-732)       tween progress       100vh
By the Numbers            ScrollTrigger once   auto
Our Range                 ScrollTrigger once   auto
The Making                ScrollTrigger once   auto
Certifications            ScrollTrigger once   auto
Commission                ScrollTrigger once   auto
```

### Core Timeline Setup

```js
// Assembly section — pin and drive frame scrubbing
ScrollTrigger.create({
  trigger: '#assembly-section',
  start: 'top top',
  end: 'bottom bottom',
  pin: '#assembly-sticky',
  scrub: 0.5,           // 0.5s lag for silkiness
  onUpdate: (self) => {
    updateFrame(self.progress);
    updatePhase(self.progress);
    updateContentPanel(self.progress);
  }
});
```

`scrub: 0.5` means the animation lags 500ms behind actual scroll position — this smooths out fast scroll movements and prevents jarring jumps.

### Phase Detection Logic

```js
const PHASE_BOUNDARIES = [0, 0.20, 0.40, 0.60, 0.80, 1.0];

function getCurrentPhase(progress) {
  for (let i = 0; i < 5; i++) {
    if (progress >= PHASE_BOUNDARIES[i] && progress < PHASE_BOUNDARIES[i + 1]) {
      return i + 1; // phases 1-5
    }
  }
  return 5;
}

function getPhaseProgress(progress, phase) {
  const start = PHASE_BOUNDARIES[phase - 1];
  const end = PHASE_BOUNDARIES[phase];
  return (progress - start) / (end - start); // 0.0 → 1.0 within the phase
}
```

### Content Panel Animations (GSAP)

```js
let currentPanel = null;

function updateContentPanel(globalProgress) {
  const phase = getCurrentPhase(globalProgress);
  const phaseProgress = getPhaseProgress(globalProgress, phase);

  if (currentPanel !== phase) {
    // Animate out old panel
    if (currentPanel) gsap.to(`#panel-${currentPanel}`, {
      x: 500, opacity: 0, duration: 0.3, ease: 'power2.in'
    });
    // Animate in new panel
    gsap.fromTo(`#panel-${phase}`,
      { x: 500, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    currentPanel = phase;
  }
}
```

---

## 8. Frame Loading Strategy — Desktop (Detailed)

### File Naming Convention
```
/public/assets/frames/ezgif-frame-001.jpg
/public/assets/frames/ezgif-frame-002.jpg
...
/public/assets/frames/ezgif-frame-732.jpg
```
Always 3-digit zero-padded. The loader builds paths using:
```js
const pad = (n) => String(n).padStart(3, '0');
const framePath = (n) => `/assets/frames/ezgif-frame-${pad(n)}.jpg`;
```

### Concurrency
6 concurrent `Image()` loaders run simultaneously. On modern connections, this fills the HTTP/2 multiplexed connection without starving other resources.

### Frame Quality
All frames should be:
- JPEG quality: 75–80 (not 100 — the difference is invisible at display size, the file size difference is 40%)
- Resolution: matching viewport display — if the canvas is `1920x1080`, no need for frames to be `3840x2160`
- Consider running a batch `ffmpeg` or ImageMagick pass to re-encode all frames at 75% quality if they aren't already

### Canvas DPR (Device Pixel Ratio)
```js
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);
```
This prevents blurry frames on retina displays.

### drawImage Centering (Cover Fit)
The bus frame may not be the exact same aspect ratio as the viewport. Use object-fit: cover logic:
```js
function drawFrameCover(ctx, img, canvasW, canvasH) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;
  let drawW, drawH, offsetX, offsetY;

  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = canvasH * imgRatio;
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = canvasW;
    drawH = canvasW / imgRatio;
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}
```

---

## 9. Video Scrubbing Strategy — Mobile (Detailed)

### Video Preparation (ffmpeg command)
```bash
ffmpeg -i input_assembly_video.mp4 \
  -vcodec libx264 \
  -crf 23 \
  -preset slow \
  -vf "scale=1280:720" \
  -an \
  -movflags faststart \
  output_assembly_mobile.mp4
```
- `-crf 23` — visually lossless for this type of content
- `-vf scale=1280:720` — 720p is sufficient for mobile
- `-an` — strip audio track entirely
- `-movflags faststart` — moves the moov atom to the beginning of the file, enabling the browser to start seeking before the full file is downloaded

### Scrubbing Implementation
```js
const video = document.getElementById('assembly-video');
const scrollSection = document.getElementById('assembly-section-mobile');

function onScroll() {
  const rect = scrollSection.getBoundingClientRect();
  const totalHeight = scrollSection.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;
  const progress = Math.max(0, Math.min(1, scrolled / totalHeight));

  if (video.readyState >= 2) {
    video.currentTime = progress * video.duration;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
```

Note: `{ passive: true }` is important for mobile scroll performance.

### Loading Gate for Mobile
```js
video.addEventListener('canplaythrough', () => {
  // Video is fully buffered — safe to dismiss loading screen
  dismissLoadingScreen();
});

// Fallback: if canplaythrough doesn't fire within 20s, dismiss anyway
setTimeout(dismissLoadingScreen, 20000);
```

---

## 10. Component Inventory

```
/components
  /layout
    Navbar.tsx              — Fixed header, responsive, scroll-aware
    Footer.tsx              — Footer with brand/contact/location columns
    LoadingScreen.tsx       — Full-screen loading gate with progress bar

  /canvas
    FrameCanvas.tsx         — Canvas element + frame preloader + drawImage logic
    FrameLoader.ts          — The preloader class/function (importable)
    VideoScrubber.tsx       — Mobile video element + scrub-on-scroll logic

  /assembly
    AssemblySection.tsx     — The 500vh scroll container + GSAP setup (desktop)
    MobileAssembly.tsx      — 5-phase scroll-snap sections (mobile)
    PhasePanel.tsx          — Individual content panel card
    PhaseIndicator.tsx      — Right-rail progress HUD (desktop)
    MobilePhaseNav.tsx      — Top 5-dot phase nav (mobile)

  /sections
    HeroIntro.tsx           — Opening overlay with "CRAFTED." heading
    ByTheNumbers.tsx        — 4-stat counter section
    OurRange.tsx            — Coach type card grid
    TheMaking.tsx           — 4-step process timeline
    Certifications.tsx      — Compliance badge grid
    CommissionForm.tsx      — Contact form with floating labels and states

  /ui
    GlassCard.tsx           — Reusable glassmorphic card wrapper
    StatCounter.tsx         — Animated number counter
    PhaseContentData.ts     — Static data for all 5 phase panels (no JSX)
    Button.tsx              — Primary, secondary, ghost button variants
```

---

## 11. Responsive Breakpoints

```
Base (< 640px)  — Mobile portrait. Single column everything. Video scrubbing.
sm (640-767px)  — Mobile landscape / small tablet. Same as base.
md (768-1023px) — Tablet. Transitions to desktop canvas. Some 2-col layouts.
lg (1024-1279px)— Standard desktop. Full desktop layout.
xl (1280px+)    — Large desktop. Max-width content container.
```

The **critical breakpoint is `md` (768px)**. Below this, mobile experience. Above, desktop experience.

For the canvas/video switch:
```tsx
// In AssemblyOrchestrator.tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);

return isMobile ? <MobileAssembly /> : <DesktopAssembly />;
```

Note: Using a React state + `useEffect` for this, not a CSS media query, because we need to conditionally render entirely different component trees — not just hide/show with CSS. This avoids loading 732 frames on mobile even if hidden.

---

## 12. Performance Checklist

### Images & Assets
- [ ] All 732 frames re-encoded to JPEG quality 75
- [ ] Key frames (5 mobile images) exported at JPEG quality 85
- [ ] Video encoded with ffmpeg at CRF 23, 720p, H.264, faststart, no audio
- [ ] Logo and any icon SVGs optimized with SVGO
- [ ] All static section images (coach type illustrations/photos) served as WebP with JPEG fallback

### Next.js Specific
- [ ] Frames served from `/public/assets/frames/` — no `next/image` needed (direct canvas use)
- [ ] Video served from `/public/assets/assembly_mobile.mp4`
- [ ] Key frames use `next/image` with `priority` on the first phase
- [ ] Static section images use `next/image` with `loading="lazy"`
- [ ] Fonts loaded via `next/font/google` (not via @import in CSS)

### Runtime
- [ ] Canvas `requestAnimationFrame` properly cancelled on unmount
- [ ] GSAP ScrollTriggers killed on component unmount
- [ ] Scroll event listeners all use `{ passive: true }`
- [ ] `IntersectionObserver` used for counter animations (not scroll event)
- [ ] No `console.log` in production

### Perceived Performance
- [ ] Loading screen accurately reflects frame loading progress
- [ ] Loading screen never dismissed before at least 147 priority frames loaded
- [ ] Hero section is not visible until loading is complete
- [ ] Phase panel slides in feel instant (< 400ms)

---

## 13. File & Folder Structure

```
surendra-co/
├── public/
│   ├── assets/
│   │   ├── frames/
│   │   │   ├── ezgif-frame-001.jpg
│   │   │   ├── ...
│   │   │   └── ezgif-frame-732.jpg
│   │   ├── mobile/
│   │   │   ├── phase-1-chassis.jpg
│   │   │   ├── phase-2-drivetrain.jpg
│   │   │   ├── phase-3-interior.jpg
│   │   │   ├── phase-4-exterior.jpg
│   │   │   └── phase-5-complete.jpg
│   │   └── assembly_mobile.mp4
│   └── Logo.png
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          — Root layout, font imports, metadata
│   │   ├── page.tsx            — Main page composition
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts    — Email API route
│   │
│   ├── components/
│   │   └── [as per Component Inventory above]
│   │
│   ├── lib/
│   │   ├── frameLoader.ts      — Frame preloading logic
│   │   └── phaseData.ts        — Phase content static data
│   │
│   └── styles/
│       └── globals.css         — CSS variables, base resets, custom utilities
│
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 14. Known Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Frame scrubbing stutters on mid-range laptops | Medium | High | Priority frame skeleton ensures fallback frame always available. GSAP `scrub: 0.5` dampens scroll velocity. |
| Video scrubbing on Android lags | Medium | Medium | `passive` scroll listener. Check `readyState >= 2` before seeking. Fallback to static key-frame if `readyState` never advances. |
| 17MB video takes too long on slow connections | Low-Medium | Medium | Loading gate + progress indicator manages expectation. 20s timeout fallback dismisses loading screen so user isn't stuck. |
| Client requests more frames later (higher fps) | Low | Low | Frame folder structure supports adding frames. Loader is dynamic. |
| `canplaythrough` never fires on some iOS devices | Medium | Medium | `setTimeout` fallback at 20s always dismisses loader. |
| Phase panel obscures key bus detail in frame | Possible | Medium | Panel positioned `right: 5vw` — right side of bus in 3/4 view. Review with actual frames to verify non-overlap. |
| Contact form deliverability to Yahoo Mail | Medium | Medium | Test SMTP configuration specifically for Yahoo. Consider using Resend.com (better deliverability than raw SMTP). |
| Client adds many more coach types to Our Range | — | — | Card grid is designed to be data-driven from an array. Adding a new type is a one-line data entry. |

---

*End of Specification Document.*  
*All section names, content, and data marked [CONFIRM WITH CLIENT] should be verified before development begins.*
