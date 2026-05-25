'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from 'lenis/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial states to avoid flash if not reduced motion
    if (!prefersReduced) {
      gsap.set('#hero-content-wrapper', { x: 0 });
      gsap.set('.hero-tag', { opacity: 0, y: 8, x: 0 });
      gsap.set('.hero-line', { opacity: 0, y: 20, x: 0 });
      gsap.set('.hero-sub', { opacity: 0, x: 0 });
      gsap.set('.hero-cta-btn', { opacity: 0, y: 12, x: 0 });
      gsap.set('.hero-scroll-indicator', { opacity: 0, x: 0 });
    }

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Instant visual for accessibility
        gsap.set('.hero-tag, .hero-line, .hero-sub, .hero-cta-btn, .hero-scroll-indicator', {
          opacity: 1,
          y: 0,
          x: 0
        });
        return;
      }

      // 1. Tag line — Volvo 9600 XL (fade in at 0ms)
      gsap.to('.hero-tag', {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.6,
        delay: 0,
        ease: 'power2.out',
      });

      // 2. Main heading (stagger fade + translateY(20px -> 0), 150ms stagger, starting 200ms)
      gsap.to('.hero-line', {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.2,
        ease: 'power2.out',
      });

      // 3. Tagline (appears at 700ms)
      gsap.to('.hero-sub', {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.7,
        ease: 'power2.out',
      });

      // 4. CTA Buttons (appears after tagline)
      gsap.to('.hero-cta-btn', {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.7,
        delay: 0.9,
        ease: 'power2.out',
      });

      // 5. Scroll indicator
      gsap.to('.hero-scroll-indicator', {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 1.2,
        ease: 'power2.out',
      });

      // Scroll Exit animation: opacity 0 + translateX(-40px) over first 15% of scroll range
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom 85%',
        scrub: true,
        onUpdate: (self) => {
          gsap.set('#hero-content-wrapper', {
            opacity: 1 - self.progress,
            x: -40 * self.progress,
          });
          gsap.set('.hero-overlay-dark', {
            opacity: 1 - self.progress,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    lenis?.scrollTo('#contact', { offset: -68 });
  };

  const scrollToOurWork = () => {
    lenis?.scrollTo('#our-work', { offset: -68 });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden z-10 bg-transparent"
    >
      {/* Left-aligned dark vignette overlay */}
      <div
        className="hero-overlay-dark absolute inset-0 z-5 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to right, rgba(9, 15, 24, 0.75) 0%, rgba(9, 15, 24, 0.20) 60%, transparent 100%)',
        }}
      />

      {/* Hero Content Container (centered horizontally and vertically on the page) */}
      <div
        id="hero-content-wrapper"
        className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center text-center pb-12 mx-auto pointer-events-auto"
        style={{
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Main Wrapper */}
        <div className="flex flex-col items-center justify-center text-center w-full">

          {/* Model Tag */}
          <div className="hero-tag flex items-center justify-center gap-4 mb-4 w-full">
            <span className="font-mono font-medium text-[12px] text-[var(--text-gold)] tracking-[0.5em] uppercase focus:outline-none block w-full text-center">
              SINCE 1984
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display font-bold text-[clamp(48px,7vw,96px)] text-[var(--text-primary)] leading-[1.0] tracking-tight mb-8 select-none flex flex-col gap-1 items-center justify-center text-center w-full">

            <div className="overflow-hidden h-fit py-1 w-full text-center">
              <span className="hero-line block w-full text-center"></span>
            </div>

            <div className="overflow-hidden h-fit py-1 w-full text-center">
              <span className="hero-line block w-full text-center">SURENDRA</span>
            </div>

            <div className="overflow-hidden h-fit py-1 w-full text-center">
              <span className="hero-line block w-full text-center">& CO.</span>
            </div>

            <div className="overflow-hidden h-fit py-1 w-full text-center">
              <span className="hero-line block w-full text-center text-[var(--gold)]">
                BAREJA , AHMEDABAD
              </span>
            </div>
          </h1>

          {/* Tagline */}
          <p className="hero-sub font-body font-light text-[16px] text-[var(--text-secondary)] tracking-wider leading-[1.8] max-w-[380px] mb-10 text-center mx-auto">
            India&apos;s finest luxury coach manufacturer.
            <br />
            Commissioned individually. Delivered complete.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-btn flex flex-row items-center justify-center gap-[16px] w-full max-w-[400px]">

            <button
              onClick={scrollToContact}
              className="flex-1 bg-[var(--gold)] text-[var(--bg-void)] hover:bg-[var(--gold-bright)] hover:-translate-y-[1px] font-body font-semibold text-[13px] tracking-wider px-[28px] py-[14px] rounded-6 transition-all duration-300 cursor-pointer text-center"
              style={{ borderRadius: '6px' }}
            >
              COMMISSION YOURS
            </button>

            <button
              onClick={scrollToOurWork}
              className="flex-1 border border-[var(--border-gold)] text-[var(--gold)] hover:bg-[var(--gold-glow)] hover:-translate-y-[1px] font-body font-normal text-[13px] tracking-wider px-[28px] py-[14px] rounded-6 transition-all duration-300 cursor-pointer text-center"
              style={{ borderRadius: '6px' }}
            >
              EXPLORE THE BUILD ↓
            </button>

          </div>
        </div>
      </div>

      {/* Scroll Indicator (IBM Plex Mono, 10px, --text-muted, tracking-[0.4em] + 32px gold line) */}
      <div className="hero-scroll-indicator absolute bottom-[36px] left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none select-none">
        <span className="font-mono font-normal text-[10px] text-[var(--text-muted)] tracking-[0.4em] uppercase mb-4 leading-[1]">
          SCROLL TO ASSEMBLE
        </span>
        <div className="w-[1px] h-[32px] bg-[var(--gold)] animate-pulse-opacity" />
      </div>
    </section>
  );
}
