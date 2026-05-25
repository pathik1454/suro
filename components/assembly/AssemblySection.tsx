'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createFrameLoader, TOTAL_FRAMES } from '@/lib/frameLoader';
import { initCanvas, drawFrameCover, drawFrameContain, isPortrait } from '@/lib/canvasRenderer';

import { useLenis } from 'lenis/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BLOCKS_DATA = [
  {
    counter: '01 / 05',
    title: 'The Bare Foundation',
    body: 'Every coach begins here. High-tensile structural steel, precision-cut and welded to exact specification. The framework is the promise — built to carry weight, absorb force, and endure decades.',
    specs: [
      { label: 'FRAMEWORK', value: 'High-Tensile Steel' },
      { label: 'COMPLIANCE', value: 'AIS 052' },
      { label: 'WELD TYPE', value: 'MIG / TIG' },
      { label: 'SURFACE', value: 'Anti-Corrosion' },
      { label: 'AXLE TYPE', value: 'Commercial Grade' },
      { label: 'UNDERFRAME', value: 'Load-Rated' },
    ]
  },
  {
    counter: '02 / 05',
    title: 'The Drivetrain',
    body: 'The Volvo B11R engine — 430 horsepower, 2,100 Nm of torque — is seated into the rear compartment. Four heavy-duty axle assemblies are mounted. The mechanical soul of the coach takes form.',
    specs: [
      { label: 'ENGINE', value: 'Volvo B11R' },
      { label: 'OUTPUT', value: '430 HP' },
      { label: 'TORQUE', value: '2,100 Nm' },
      { label: 'EMISSION', value: 'Euro VI' },
      { label: 'TRANS.', value: 'I-Shift 12-Spd' },
      { label: 'FUEL', value: '400L Capacity' },
    ]
  },
  {
    counter: '03 / 05',
    title: 'Interior Architecture',
    body: 'A bespoke double-decker steel cage rises from the frame. Individual sleeper pods are fitted with premium leather. Theatre floors. Everything designed for the passenger.',
    specs: [
      { label: 'LAYOUT', value: 'Double Deck' },
      { label: 'BERTHS', value: '40 Premium' },
      { label: 'DECK SPLIT', value: '20 + 20' },
      { label: 'UPHOLSTERY', value: 'Leather' },
      { label: 'FLOORING', value: 'Theatre-Grade' },
      { label: 'AC', value: 'Dual-Zone' },
    ]
  },
  {
    counter: '04 / 05',
    title: 'The Exterior Shell',
    body: 'Aerodynamic silver metallic body panels encase the completed interior. Panoramic tinted glass units seated in precision-machined frames. The coach\'s silhouette is sealed.',
    specs: [
      { label: 'PANELS', value: 'Silver Metallic' },
      { label: 'GLASS', value: 'Panoramic Tinted' },
      { label: 'WINDSHIELD', value: 'Laminated' },
      { label: 'SEALING', value: 'Weatherproof' },
      { label: 'PROFILE', value: 'Aerodynamic' },
      { label: 'LIVERY', value: 'Custom Available' },
    ]
  },
  {
    counter: '05 / 05',
    title: 'The Masterpiece',
    body: '25 years. 500 coaches. One philosophy: no compromises. The finished vehicle is the beginning of its story — and yours.',
    specs: null // Handled custom
  }
];

export default function AssemblySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDot, setActiveDot] = useState(0);
  const lenis = useLenis();

  const loaderRef = useRef(typeof window !== 'undefined' ? createFrameLoader() : null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !loaderRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    let { ctx } = initCanvas(canvas);
    const loader = loaderRef.current;

    let pendingFrame = 1;
    let isRendering = false;
    let currentRenderedFrame = 0;
    let useContain = isPortrait();

    function renderPending() {
      if (!ctx || !canvas) return;
      const img = loader.getNearestFrame(pendingFrame);
      if (img && pendingFrame !== currentRenderedFrame) {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        if (useContain) {
          drawFrameContain(ctx, img, canvas.offsetWidth, canvas.offsetHeight);
        } else {
          drawFrameCover(ctx, img, canvas.offsetWidth, canvas.offsetHeight);
        }
        currentRenderedFrame = pendingFrame;
      }
      isRendering = false;
    }

    function scheduleFrame(frameIndex: number) {
      pendingFrame = frameIndex;
      if (!isRendering) {
        isRendering = true;
        requestAnimationFrame(renderPending);
      }
    }

    // Initial render when frames load
    loader.onEachPriorityFrame(() => {
      if (currentRenderedFrame === 0) {
        scheduleFrame(1);
      }
    });

    const handleResize = () => {
      const res = initCanvas(canvas);
      ctx = res.ctx;
      useContain = isPortrait();
      currentRenderedFrame = 0; // force redraw
      scheduleFrame(pendingFrame);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Easing function
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const updateContentBlocks = (progress: number) => {
      let currentActiveDot = 0;

      for (let i = 0; i < 5; i++) {
        const segStart = i * 0.20;
        const segEnd = (i + 1) * 0.20;
        const segSize = 0.20;

        // localP: progress within this block's segment, scaled 0 to 1
        let localP = (progress - segStart) / segSize;
        localP = Math.max(0, Math.min(1, localP));

        const block = blocksRef.current[i];
        if (!block) continue;

        // Is Odd index block (0, 2, 4 -> block 1, 3, 5): FROM LEFT (-1)
        // Is Even index block (1, 3 -> block 2, 4): FROM RIGHT (1)
        const isOddIndex = i % 2 === 0;
        const directionSign = isOddIndex ? -1 : 1;

        if (progress < segStart || progress > segEnd) {
          // Offscreen
          gsap.set(block, {
            visibility: 'hidden',
            opacity: 0,
            x: `${directionSign * 100}vw`
          });
          continue;
        }

        // Within segment
        gsap.set(block, { visibility: 'visible' });

        if (localP >= 0 && localP < 0.25) {
          // ENTRY PHASE (localP 0 -> 0.25)
          const entryProgress = localP / 0.25;
          const translateX = directionSign * 100 * (1 - easeOut(entryProgress));
          const opacity = entryProgress;
          gsap.set(block, { x: `${translateX}vw`, opacity: opacity });
        } else if (localP >= 0.25 && localP < 0.80) {
          // DWELL PHASE (localP 0.25 -> 0.80)
          gsap.set(block, { x: '0px', opacity: 1 });
          currentActiveDot = i;
        } else {
          // EXIT PHASE (localP 0.80 -> 1.00)
          const exitProgress = (localP - 0.80) / 0.20;
          const translateX = directionSign * (-100) * exitProgress;
          const opacity = 1 - exitProgress;
          gsap.set(block, { x: `${translateX}vw`, opacity: opacity });
        }
      }

      setActiveDot(currentActiveDot);
    };

    // Primary ScrollTrigger setup for fixed canvas scrubbing
    const ctxGsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#assembly-scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        pin: '#assembly-sticky',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Frame scrub mapping (1 to 300)
          const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(p * (TOTAL_FRAMES - 1)) + 1));
          scheduleFrame(frameIndex);

          // 2. Content blocks
          updateContentBlocks(p);
        }
      });

      // Canvas Cover wipe ScrollTrigger
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
    }, containerRef);

    // Initial positioning of offscreen blocks
    BLOCKS_DATA.forEach((_, i) => {
      const block = blocksRef.current[i];
      if (block) {
        const isOddIndex = i % 2 === 0;
        gsap.set(block, {
          visibility: 'hidden',
          opacity: 0,
          x: isOddIndex ? '-100vw' : '100vw'
        });
      }
    });

    return () => {
      resizeObserver.disconnect();
      ctxGsap.revert();
    };
  }, []);

  const scrollToContact = () => {
    lenis?.scrollTo('#contact', { offset: -68 });
  };

  // prefers-reduced-motion detector
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  if (reducedMotion) {
    return (
      <div id="our-work" className="relative w-full bg-[#0B0C14] py-24">
        {/* Static background frame */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center z-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'url(/assets/frame_150.webp)' }}
        />
        <div className="relative z-10 max-w-[700px] mx-auto px-6 flex flex-col gap-16">
          {BLOCKS_DATA.map((block, i) => (
            <div
              key={i}
              className="bg-[#10121C]/80 border-t border-[rgba(43,91,168,0.30)] p-8 shadow-2xl backdrop-blur-md rounded-none"
              style={{ borderRadius: '0px !important' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono font-normal text-[0.6rem] text-[var(--color-silver)] tracking-[0.3em] uppercase leading-[1]">
                  {block.counter}
                </span>
                <div className="w-8 h-[1px] bg-[var(--color-blue)]" />
              </div>
              <h2 className="font-display font-normal text-[1.8rem] text-[var(--color-cream)] leading-tight mb-4">
                {block.title}
              </h2>
              <p className="font-body font-light text-[0.85rem] text-[var(--color-silver-light)] leading-[1.8] tracking-[0.12em] mb-6">
                {block.body}
              </p>

              {block.specs ? (
                <div className="grid grid-cols-2 gap-x-4 border-t border-[rgba(255,255,255,0.05)] pt-4">
                  {block.specs.map((spec, j) => (
                    <div
                      key={j}
                      className="py-3 border-b border-[rgba(255,255,255,0.05)]"
                    >
                      <div className="font-body font-normal text-[0.65rem] text-[var(--color-silver)] tracking-[0.25em] uppercase leading-[1]">
                        {spec.label}
                      </div>
                      <div className="font-mono font-normal text-[0.85rem] text-white mt-1 leading-[1]">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4 border-t border-[rgba(255,255,255,0.05)] pt-6">
                  <div className="font-display font-light text-[1.4rem] text-[var(--color-cream)]">
                    15+ Years of Manufacturing
                  </div>
                  <div className="font-display font-light text-[1.4rem] text-[var(--color-cream)]">
                    500+ Coaches on India&apos;s Roads
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="w-fit bg-[var(--color-blue)] text-[#0B0C14] hover:bg-[#3A72CE] hover:-translate-y-[1px] font-body font-medium text-[0.68rem] tracking-[0.25em] uppercase px-6 py-3 rounded-none transition-all duration-300 cursor-pointer mt-4"
                    style={{ borderRadius: '0px !important' }}
                  >
                    BEGIN YOUR COMMISSION →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="our-work" className="relative w-full" ref={containerRef}>
      {/* 300-Frame Fixed Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* 550vh transparent scroll tracking container */}
      <div id="assembly-scroll-container" className="h-[550vh] w-full" />

      {/* Sticky 100vh overlay viewport */}
      <div
        id="assembly-sticky"
        className="absolute top-0 left-0 w-full h-[100vh] overflow-hidden"
      >
        {/* Canvas Dark Vignette Overlay */}
        <div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{ background: 'rgba(7, 8, 13, 0.50)' }}
        />

        {/* Floating Content Blocks */}
        <div className="relative w-full h-full z-10 pointer-events-none">
          {BLOCKS_DATA.map((block, i) => {
            const isOddIndex = i % 2 === 0;
            const parts = block.counter.split(' / ');

            return (
              <div
                key={i}
                ref={(el) => { blocksRef.current[i] = el; }}
                className="absolute pointer-events-auto w-full max-w-[520px] mx-[5vw] lg:mx-0 top-[50%] transform translateY(-50%) border shadow-2xl transition-all duration-300 select-none rounded-none"

                style={{
                  left: isOddIndex ? '8vw' : 'auto',
                  right: isOddIndex ? 'auto' : '8vw',
                  borderLeft: isOddIndex ? '3px solid var(--gold)' : '1px solid rgba(255,255,255,0.08)',
                  borderRight: isOddIndex ? '1px solid rgba(255,255,255,0.08)' : '3px solid var(--gold)',
                  borderRadius: '0px',
                  background: 'rgba(11, 12, 20, 0.55)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',

                }}
              >
                <div className="px-10 py-9 flex flex-col">
                  {/* 1. Counter (IBM Plex Mono 500, 11px. Number in --gold, label in --text-muted. Followed by a 40px gold rule) */}
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="font-mono font-medium text-[11px] tracking-wider leading-[1]">
                      <span className="text-[var(--gold)]">{parts[0]}</span>
                      <span className="text-[var(--text-muted)]"> / {parts[1]}</span>
                    </div>
                    <div className="w-[40px] h-[1px] bg-[var(--gold)]" />
                  </div>

                  {/* 2. Title (Cormorant Garamond 600, clamp(28px, 3vw, 44px)) */}
                  <h2 className="font-display font-semibold text-[clamp(28px,3vw,44px)] text-[var(--text-primary)] leading-[1.1] mb-4">
                    {block.title}
                  </h2>

                  {/* 3. Body paragraph (Inter 400, 15px, --text-secondary, line-height 1.7) */}
                  <p className="font-body font-normal text-[15px] text-[var(--text-secondary)] leading-[1.7] tracking-wider mb-6">
                    {block.body}
                  </p>

                  {/* 4. Thin divider */}
                  <div className="h-[1px] w-full bg-[var(--border-subtle)] mb-6" />

                  {/* 5. Spec grid or Stats CTA */}
                  {block.specs ? (
                    <div className="grid grid-cols-2 gap-px bg-[var(--border-subtle)]">
                      {block.specs.map((spec, j) => {
                        const isLeftCol = j % 2 === 0;
                        return (
                          <div
                            key={j}
                            className="bg-[rgba(22,24,36,0.45)] p-4 flex flex-col justify-center"
                            style={{ borderRadius: '0px !important' }}
                          >
                            <div className="font-body font-semibold text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] leading-[1]">
                              {spec.label}
                            </div>
                            <div className="font-mono font-medium text-[14px] text-[var(--text-primary)] mt-1.5 leading-[1]">
                              {spec.value}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 pt-1">
                      <div className="flex flex-col gap-2">
                        <div className="font-display font-light text-[1.4rem] text-[var(--text-primary)]">
                          15+ Years of Manufacturing
                        </div>
                        <div className="font-display font-light text-[1.4rem] text-[var(--text-primary)]">
                          500+ Coaches on India&apos;s Roads
                        </div>
                      </div>
                      <div className="h-[10px]" />
                      <button
                        onClick={scrollToContact}
                        className="w-fit bg-[var(--gold)] text-[var(--bg-void)] hover:bg-[var(--gold-bright)] hover:-translate-y-[1px] font-body font-semibold text-[11px] tracking-widest uppercase px-6 py-3.5 transition-all duration-300 cursor-pointer"
                        style={{ borderRadius: '0px !important' }}
                      >
                        BEGIN YOUR COMMISSION →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 5-Dot Vertical HUD Progress Indicator (Right side of screen, centered) */}
        <div className="absolute right-8 top-[50%] transform -translate-y-1/2 z-20 flex flex-col items-center gap-[28px]">
          {/* Vertical connecting line */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-[var(--border-subtle)] z-0" />

          {BLOCKS_DATA.map((_, idx) => (
            <div
              key={idx}
              className="relative transition-all duration-[250ms] ease-out flex flex-col items-center justify-center z-10"
              style={{
                width: '12px',
                height: '12px',
              }}
            >
              {/* Dot */}
              <div
                className="transition-all duration-[250ms] ease-out"
                style={{
                  width: activeDot === idx ? '10px' : '6px',
                  height: activeDot === idx ? '10px' : '6px',
                  backgroundColor: activeDot === idx ? 'var(--gold)' : 'transparent',
                  border: activeDot === idx ? 'none' : '1px solid var(--border-gold)',
                  borderRadius: '50% !important'
                }}
              />
              {/* IBM Plex Mono 9px label below the dot */}
              <span className="absolute top-[16px] font-mono text-[9px] text-[var(--text-muted)] tracking-tighter">
                {`0${idx + 1}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Solid Canvas Cover Wipe Layer */}
      <div id="post-assembly-cover" className="h-[80px] w-full" />
      <div
        id="canvas-cover"
        className="fixed inset-0 bg-[var(--bg-base)] z-[4] pointer-events-none"
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      />
    </div>
  );
}
