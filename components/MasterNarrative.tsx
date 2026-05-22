"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import LoadingScreen   from "./LoadingScreen";
import Navbar          from "./Navbar";
import HeroIntro       from "./HeroIntro";
import DesktopAssembly from "./assembly/DesktopAssembly";
import MobileAssembly  from "./assembly/MobileAssembly";
import ByTheNumbers    from "./sections/ByTheNumbers";
import OurRange        from "./sections/OurRange";
import TheMaking       from "./sections/TheMaking";
import Certifications  from "./sections/Certifications";
import ConversionSection from "./ConversionSection";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   FRAME PRELOADER  (tiered, spec-compliant)
   Priority Tier 1: every 5th frame → 147 frames
   Priority Tier 2: remaining frames via requestIdleCallback
   Concurrent 6 loaders
───────────────────────────────────────────── */
const TOTAL_FRAMES    = 732;
const PRIORITY_INTERVAL = 5;
const PRIORITY_COUNT  = Math.ceil(TOTAL_FRAMES / PRIORITY_INTERVAL); // 147

function padFrame(n: number) {
  return String(n).padStart(3, "0");
}

function framePath(n: number) {
  return `/assets/ezgif-frame-${padFrame(n)}.jpg`;
}

interface FrameLoader {
  images: (HTMLImageElement | null)[];
  loaded: Set<number>;         // 0-indexed frame numbers
  priorityLoaded: number;      // count of priority frames loaded
}

function createFrameLoader(): FrameLoader {
  const loader: FrameLoader = {
    images: new Array(TOTAL_FRAMES).fill(null),
    loaded: new Set(),
    priorityLoaded: 0,
  };

  // Build priority queue (every 5th frame first, 1-indexed)
  const queue: number[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i += PRIORITY_INTERVAL) queue.push(i);
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    if ((i - 1) % PRIORITY_INTERVAL !== 0) queue.push(i);
  }

  const isPriority = (frameNum: number) =>
    (frameNum - 1) % PRIORITY_INTERVAL === 0;

  function loadNext() {
    if (queue.length === 0) return;
    const frameNum = queue.shift()!;
    const img = new Image();
    const idx = frameNum - 1; // 0-indexed
    img.onload = () => {
      loader.images[idx] = img;
      loader.loaded.add(idx);
      if (isPriority(frameNum)) loader.priorityLoaded++;
      // Background-load remaining via idle callback
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(loadNext);
      } else {
        setTimeout(loadNext, 0);
      }
    };
    img.onerror = () => {
      // Still advance even on error
      if (isPriority(frameNum)) loader.priorityLoaded++;
      loadNext();
    };
    img.src = framePath(frameNum);
  }

  // Start 6 concurrent loaders
  for (let i = 0; i < 6; i++) loadNext();

  return loader;
}

/* ─────────────────────────────────────────────
   CANVAS DRAW — cover-fit with DPR support
───────────────────────────────────────────── */
function drawFrameCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio    = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;
  let drawW: number, drawH: number, offsetX: number, offsetY: number;
  if (imgRatio > canvasRatio) {
    drawH   = canvasH;
    drawW   = canvasH * imgRatio;
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW   = canvasW;
    drawH   = canvasW / imgRatio;
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function MasterNarrative() {
  const mainRef      = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const loaderRef    = useRef<FrameLoader | null>(null);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);

  const [isMobile,   setIsMobile]   = useState(false);
  const [loaded,     setLoaded]     = useState(false);
  const [progress,   setProgress]   = useState(0);

  /* ── Scroll to top on every load (disable browser scroll restoration) ── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  /* ── Detect mobile at mount ── */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Frame preloader (desktop only) ── */
  useEffect(() => {
    if (isMobile) {
      // Mobile: dismiss loading immediately
      setProgress(100);
      setLoaded(true);
      return;
    }

    const loader = createFrameLoader();
    loaderRef.current = loader;

    // Poll progress every 200ms
    const poll = setInterval(() => {
      const pct = (loader.priorityLoaded / PRIORITY_COUNT) * 100;
      setProgress(pct);

      // Gate: all 147 priority frames loaded
      if (loader.priorityLoaded >= PRIORITY_COUNT) {
        clearInterval(poll);
        setLoaded(true);
      }
    }, 200);

    // Hard fallback: dismiss after 10s no matter what
    const fallback = setTimeout(() => {
      clearInterval(poll);
      setLoaded(true);
    }, 10000);

    return () => {
      clearInterval(poll);
      clearTimeout(fallback);
    };
  }, [isMobile]);

  /* ── Canvas setup + resize ── */
  useEffect(() => {
    if (isMobile || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    const sizeCanvas = () => {
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctxRef.current = ctx;
        // Redraw current frame on resize
        const loader = loaderRef.current;
        if (loader && loader.images[0]?.complete) {
          drawFrameCover(ctx, loader.images[0]!, window.innerWidth, window.innerHeight);
        }
      }
    };

    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    return () => window.removeEventListener("resize", sizeCanvas);
  }, [isMobile]);

  /* ── drawFrame callback (passed to DesktopAssembly) ── */
  const drawFrame = useCallback((index: number) => {
    const ctx    = ctxRef.current;
    const loader = loaderRef.current;
    if (!ctx || !loader) return;

    let img = loader.images[index] ?? null;

    // Nearest-frame fallback
    if (!img || !img.complete) {
      for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
        const lo = index - delta;
        const hi = index + delta;
        if (lo >= 0 && loader.images[lo]?.complete) { img = loader.images[lo]; break; }
        if (hi < TOTAL_FRAMES && loader.images[hi]?.complete) { img = loader.images[hi]; break; }
      }
    }

    if (!img || !img.complete) return;
    const canvas = canvasRef.current!;
    const W = canvas.width  / (window.devicePixelRatio || 1);
    const H = canvas.height / (window.devicePixelRatio || 1);
    drawFrameCover(ctx, img, W, H);
  }, []);

  /* ── Draw first frame when loaded ── */
  useGSAP(() => {
    if (!loaded || isMobile) return;
    // Small delay so canvas is sized
    setTimeout(() => drawFrame(0), 100);
  }, { dependencies: [loaded, isMobile, drawFrame] });

  /* ── Loading screen fade-out animation ── */
  const loadingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (loaded && loadingRef.current) {
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          if (loadingRef.current) loadingRef.current.style.display = "none";
        },
      });
    }
  }, [loaded]);

  return (
    <main ref={mainRef} className="relative w-full" style={{ backgroundColor: "#0D1A24" }}>

      {/* ── LOADING SCREEN ── */}
      <div ref={loadingRef} style={{ display: loaded ? "none" : "block" }}>
        <LoadingScreen progress={progress} />
      </div>

      {/* ── NAVIGATION ── */}
      <Navbar />

      {/* ── FIXED CANVAS (desktop only) ── */}
      {!isMobile && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
          {/* Dark overlay for legibility */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(13,26,36,0.30)" }}
          />
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      <div className="relative z-10 w-full flex flex-col">

        {/* Hero + Assembly (canvas area — transparent background) */}
        <div className="relative">
          <HeroIntro />

          {isMobile
            ? <MobileAssembly />
            : <DesktopAssembly drawFrame={drawFrame} />
          }
        </div>

        {/* ── STATIC SECTIONS (solid background) ── */}
        <div className="relative z-20" style={{ backgroundColor: "#0D1A24" }}>
          <ByTheNumbers />
          <OurRange />
          <TheMaking />
          <Certifications />

          {/* Contact + Footer */}
          <section
            id="contact-section-wrapper"
            className="pointer-events-auto"
          >
            <ConversionSection />
          </section>
        </div>
      </div>
    </main>
  );
}
