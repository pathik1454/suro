'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo('.hero-word', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, delay: 0.2, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo('.hero-tagline',
        { opacity: 0 },
        { opacity: 1, delay: 0.7, duration: 0.8, ease: 'power2.out' }
      );

      // Exit animation tied to the assembly scroll container
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '15% top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set('#hero-content', {
            opacity: 1 - self.progress,
            x: -40 * self.progress
          });
          gsap.set('.hero-vignette', {
            opacity: 1 - self.progress
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToAssembly = () => {
    const el = document.getElementById('assembly');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToCommission = () => {
    const el = document.getElementById('commission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] pointer-events-none z-10 flex flex-col justify-end lg:justify-center">
      
      {/* Dark Vignette over the left side */}
      <div className="hero-vignette absolute inset-0 w-full lg:w-[60%] pointer-events-none" 
        style={{ background: 'linear-gradient(to right, rgba(9,15,24,0.85) 0%, rgba(9,15,24,0.40) 60%, transparent 100%)' }} 
      />

      {/* Portrait mobile: bottom gradient for text readability */}
      <div className="hero-vignette absolute inset-0 lg:hidden pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(9,15,24,0.95) 0%, rgba(9,15,24,0.6) 40%, transparent 70%)' }}
      />

      {/* Content wrapper */}
      <div id="hero-content" className="relative w-full lg:w-[55%] px-6 lg:px-12 flex flex-col z-10 pointer-events-auto pb-24 lg:pb-0">
        
        {/* Subhead */}
        <div className="font-mono text-[12px] text-[var(--gold)] tracking-[0.5em] mb-6 lg:mb-8 animate-fade-in">
          VOLVO 9600 XL
          <div className="w-12 h-[1px] bg-[var(--gold)]/50 mt-4" />
        </div>

        {/* Main Headline */}
        <h1 className="font-display font-bold text-[clamp(36px,7vw,96px)] text-[var(--text-primary)] leading-[1.05] tracking-tight mb-6 lg:mb-8 uppercase flex flex-col">
          <div className="overflow-hidden"><span className="hero-word block">CRAFTED</span></div>
          <div className="overflow-hidden"><span className="hero-word block">FOR THE</span></div>
          <div className="overflow-hidden"><span className="hero-word block">ROAD.</span></div>
        </h1>

        {/* Tagline */}
        <div className="hero-tagline opacity-0 flex flex-col gap-8 lg:gap-10">
          <p className="font-body font-light text-[14px] lg:text-[16px] text-[var(--text-secondary)] max-w-[380px] leading-relaxed">
            India&apos;s finest luxury coach manufacturer.
            Commissioned individually. Delivered complete.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button onClick={scrollToCommission} className="bg-[var(--gold)] text-[var(--bg-void)] font-body font-semibold text-[13px] tracking-wider px-7 py-3.5 rounded-md hover:bg-[var(--gold-bright)] transition-colors">
              COMMISSION YOURS
            </button>
            <button onClick={scrollToAssembly} className="border border-[var(--border-gold)] text-[var(--gold)] font-body font-semibold text-[13px] tracking-wider px-7 py-3.5 rounded-md hover:bg-[var(--gold-glow)] transition-colors">
              EXPLORE THE BUILD ↓
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="hidden lg:flex absolute bottom-[40px] left-0 w-[55%] flex-col items-center justify-center opacity-70">
        <span className="font-body text-[10px] text-[var(--text-muted)] tracking-[0.4em] mb-4">
          SCROLL TO ASSEMBLE
        </span>
        <div className="w-[1px] h-[32px] bg-[var(--gold)] animate-pulse-opacity" />
      </div>

    </section>
  );
}
