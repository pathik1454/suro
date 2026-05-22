'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createFrameLoader, TOTAL_FRAMES } from '@/lib/frameLoader';
import { initCanvas, drawFrameCover, drawFrameContain, isPortrait } from '@/lib/canvasRenderer';
import { PHASE_DATA } from '@/lib/phaseData';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASE_BOUNDARIES = [0, 0.20, 0.40, 0.60, 0.80, 1.0];

function getPhase(progress: number): number {
  for (let i = 0; i < 5; i++) {
    if (progress >= PHASE_BOUNDARIES[i] && progress < PHASE_BOUNDARIES[i + 1]) {
      return i + 1;
    }
  }
  return 5;
}

export default function AssemblySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressDesktopRef = useRef<HTMLDivElement>(null);
  const progressMobileRef = useRef<HTMLDivElement>(null);
  const progressTrackDesktopRef = useRef<HTMLDivElement>(null);
  const progressTrackMobileRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState(1);
  const loaderRef = useRef(typeof window !== 'undefined' ? createFrameLoader() : null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !loaderRef.current) return;

    const canvas = canvasRef.current;
    let { ctx } = initCanvas(canvas);
    const loader = loaderRef.current;

    let pendingFrame = 1;
    let isRendering = false;
    let currentRenderedFrame = 0;
    let useContain = isPortrait() && window.innerWidth < 1024;

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

    // Initial render
    loader.onEachPriorityFrame(() => {
      if (currentRenderedFrame === 0) {
        scheduleFrame(1);
      }
    });

    // Handle Resize
    const handleResize = () => {
      const res = initCanvas(canvas);
      ctx = res.ctx;
      useContain = isPortrait() && window.innerWidth < 1024;
      currentRenderedFrame = 0; // force redraw
      scheduleFrame(pendingFrame);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    let activePhase = 1;

    // Setup GSAP
    const ctxGsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#assembly-scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        pin: '#assembly-sticky',
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
          scheduleFrame(frameIndex);
          
          // Update scroll progress bar
          if (progressDesktopRef.current) {
            progressDesktopRef.current.style.height = `${progress * 100}%`;
          }
          if (progressMobileRef.current) {
            progressMobileRef.current.style.width = `${progress * 100}%`;
          }

          // Show/hide progress tracks
          const visible = progress > 0.01 && progress < 0.99;
          if (progressTrackDesktopRef.current) {
            progressTrackDesktopRef.current.classList.toggle('visible', visible);
          }
          if (progressTrackMobileRef.current) {
            progressTrackMobileRef.current.classList.toggle('visible', visible);
          }

          const phase = getPhase(progress);
          if (phase !== activePhase) {
            // Animate phase change
            gsap.to(`#phase-page-${activePhase}`, {
              opacity: 0, y: -12, duration: 0.35, ease: 'power2.in'
            });
            gsap.fromTo(`#phase-page-${phase}`,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.1 }
            );
            
            activePhase = phase;
            setCurrentPhase(phase);
          }
        }
      });
      
      // Post assembly cover
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

    return () => {
      resizeObserver.disconnect();
      ctxGsap.revert();
    };
  }, []);

  const scrollToCommission = () => {
    const el = document.getElementById('commission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="assembly" className="relative w-full" ref={containerRef}>
      {/* Scroll Progress Bar — Desktop (vertical) */}
      <div 
        ref={progressTrackDesktopRef}
        className="scroll-progress-track scroll-progress-track--desktop"
      >
        <div ref={progressDesktopRef} className="scroll-progress-fill--desktop" />
      </div>

      {/* Scroll Progress Bar — Mobile (horizontal) */}
      <div 
        ref={progressTrackMobileRef}
        className="scroll-progress-track scroll-progress-track--mobile"
      >
        <div ref={progressMobileRef} className="scroll-progress-fill--mobile" />
      </div>

      {/* Scroll container that dictates scroll distance */}
      <div id="assembly-scroll-container" className="h-[300vh] w-full" />

      {/* Sticky container that holds canvas & panel */}
      <div id="assembly-sticky" className="absolute top-0 left-0 w-full h-[100vh] overflow-hidden flex flex-col lg:flex-row">
        
        {/* Canvas Column */}
        <canvas 
          ref={canvasRef}
          className="assembly-canvas"
        />
        
        {/* Edge Gradient Desktop */}
        <div className="canvas-edge-gradient" />

        {/* Phase Indicator Mobile */}
        <div className="lg:hidden fixed bottom-[40vh] right-4 bg-[var(--bg-card)] border border-[var(--border-gold)] text-[var(--gold)] font-mono text-[11px] px-3 py-1.5 rounded-full z-10">
          0{currentPhase} / 05
        </div>

        {/* Content Panel Column */}
        <div className="content-panel relative">
          {PHASE_DATA.map((phase) => (
            <div 
              key={phase.id}
              id={`phase-page-${phase.id}`}
              className="absolute inset-0 flex flex-col justify-center px-6 lg:px-[5vw]"
              style={{ 
                opacity: phase.id === 1 ? 1 : 0,
                pointerEvents: phase.id === currentPhase ? 'auto' : 'none',
              }}
            >
              {/* Phase Number Tag */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[11px] text-[var(--gold)]">0{phase.id}</span>
                <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase">{phase.title}</span>
              </div>
              
              <div className="w-10 h-[1px] bg-[var(--gold)] mb-8" />

              {/* Title & Desc */}
              <h2 className="font-display font-semibold text-[28px] lg:text-[40px] text-[var(--text-primary)] leading-tight mb-6">
                {phase.title}
              </h2>
              <p className="font-body text-[14px] lg:text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-[400px] mb-10 lg:mb-12">
                {phase.description}
              </p>

              {/* Specs Grid */}
              {phase.id < 5 ? (
                <div className="grid grid-cols-2 gap-[1px] bg-[var(--border-subtle)] border border-[var(--border-subtle)] w-fit max-w-full">
                  {phase.specs.map((spec, i) => (
                    <div key={i} className="bg-[var(--bg-card)] px-4 lg:px-5 py-3 lg:py-4 min-w-[120px] lg:min-w-[160px]">
                      <div className="font-body font-medium text-[9px] lg:text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase mb-1">
                        {spec.label}
                      </div>
                      <div className="font-mono font-medium text-[12px] lg:text-[14px] text-[var(--text-primary)]">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="font-mono text-[13px] text-[var(--gold)]">
                    15+ Years of Manufacturing
                  </div>
                  <div className="font-mono text-[13px] text-[var(--gold)]">
                    500+ Coaches on India&apos;s Roads
                  </div>
                  <button 
                    onClick={scrollToCommission}
                    className="mt-4 w-fit bg-[var(--gold)] text-[var(--bg-void)] font-body font-semibold text-[13px] tracking-wider px-6 py-3.5 rounded hover:bg-[var(--gold-bright)] transition-colors flex items-center gap-2"
                  >
                    BEGIN YOUR COMMISSION <span className="text-[16px]">→</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* 5-Dot Indicator (Desktop) */}
          <div className="hidden lg:flex absolute bottom-[8vh] left-[5vw] items-center gap-6">
            {PHASE_DATA.map((phase, i) => (
              <div key={phase.id} className="flex flex-col items-center gap-3 relative">
                {/* Connecting Line */}
                {i < PHASE_DATA.length - 1 && (
                  <div className="absolute top-[4px] left-[10px] w-12 h-[1px] bg-[var(--border-subtle)]" />
                )}
                
                {/* Dot */}
                <div 
                  className={`rounded-full transition-all duration-300 ${
                    currentPhase === phase.id 
                      ? 'w-[10px] h-[10px] bg-[var(--gold)]' 
                      : 'w-[6px] h-[6px] border border-[var(--border-gold)]'
                  }`}
                />
                
                {/* Label */}
                <span className={`font-mono text-[9px] ${currentPhase === phase.id ? 'text-[var(--gold)]' : 'text-[var(--text-muted)]'}`}>
                  {phase.id}
                </span>
              </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* Post Assembly Canvas Cover Element */}
      <div id="post-assembly-cover" className="h-[1px] w-full" />
      <div 
        id="canvas-cover" 
        className="fixed inset-0 bg-[var(--bg-base)] z-[4] pointer-events-none"
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      />
    </div>
  );
}
