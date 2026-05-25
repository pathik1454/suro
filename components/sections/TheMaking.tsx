'use client';

import { useEffect, useRef, useState } from 'react';
import { Ruler, Wrench, Layers, ShieldCheck } from 'lucide-react';

const steps = [
  {
    num: '01',
    weeks: 'WK 1–2',
    title: 'DESIGN & CONSULTATION',
    desc: 'We begin with your requirements — route type, passenger load, comfort tier, and any customizations. Our engineers produce a detailed floor plan and specification sheet before a single frame is cut.',
    icon: Ruler,
  },
  {
    num: '02',
    weeks: 'WK 3–8',
    title: 'CHASSIS FABRICATION',
    desc: 'The chassis arrives from Volvo. Our structural team begins the steel cage — every weld, every joint performed to AIS 052 specification. This phase produces the fundamental architecture of the coach.',
    icon: Wrench,
  },
  {
    num: '03',
    weeks: 'WK 9–14',
    title: 'INTERIOR FIT-OUT',
    desc: 'Interior installation: berths, upholstery, flooring, electrical, AC systems, curtains, lighting. Simultaneously, exterior panels are fitted and painted to your specified livery.',
    icon: Layers,
  },
  {
    num: '04',
    weeks: 'WK 15–16',
    title: 'QC & DELIVERY',
    desc: 'Full quality control pass: structural integrity check, road-load simulation, electrical systems test, RTO documentation. Coach is then transported to your depot — fully compliant, fully yours.',
    icon: ShieldCheck,
  },
];

export default function TheMaking() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-[#0B0C14] w-full py-24 relative z-10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-16 text-center">
          <br />
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono font-medium text-[18px] text-[var(--text-gold)] tracking-[0.4em] uppercase leading-[1]">
              THE PROCESS
            </h3>
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
          </div>
          <br />
          <h2 className="font-display font-light text-[48px] text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.1] text-center">
            From Order to <em className="font-display italic font-light text-[var(--gold)] not-italic">Road.</em>
          </h2>
          <br />
        </div>

        {/* Layout Wrapper with Connecting Lines */}
        <div className="relative mt-12 md:mt-20">

          {/* Desktop Horizontal Line */}
          <div
            className="hidden md:block absolute top-[20px] h-[1px] bg-[#2B5BA8] z-0 origin-left"
            style={{
              left: '12.5%',
              width: '75%',
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transition: prefersReducedMotion
                ? 'none'
                : 'transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Mobile Vertical Line */}
          <div
            className="md:hidden absolute left-[20px] w-[1px] bg-[#2B5BA8] z-0 origin-top"
            style={{
              top: '20px',
              bottom: '20px',
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transition: prefersReducedMotion
                ? 'none'
                : 'transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Steps Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              // Animated step timings
              const dotDelay = prefersReducedMotion ? 0 : 300 + idx * 200;
              const contentDelay = prefersReducedMotion ? 0 : 800 + idx * 150;

              return (
                <div
                  key={idx}
                  className="group relative flex flex-row md:flex-col items-start md:items-center gap-5 md:gap-0 px-0 md:px-[28px] py-0 md:py-[32px] overflow-hidden translate-x-7"
                >

                  {/* Step Dot Marker */}
                  <div
                    className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#161824] border border-[#2B5BA8] md:border-[rgba(43,91,168,0.30)] z-10 transition-all duration-250 ease-in-out group-hover:bg-[rgba(43,91,168,0.20)] group-hover:border-[#2B5BA8] shrink-0"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : `opacity 400ms ease-out ${dotDelay}ms, transform 400ms ease-out ${dotDelay}ms, background-color 250ms ease, border-color 250ms ease`,
                    }}
                  >
                    <Icon
                      size={18}
                      className="text-[#2B5BA8] transition-colors duration-250 ease-in-out group-hover:text-[#3A72CE]"
                    />
                  </div>

                  {/* Card Content Block */}
                  <div
                    className="flex flex-col items-start md:items-center w-full relative md:mt-6"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelay}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelay}ms`,
                    }}
                  >

                    {/* Step Number Watermark */}
                    <div className="absolute top-0 right-0 md:top-[16px] md:right-[16px] font-display font-bold text-[96px] text-[#EEF0F7] opacity-[0.05] leading-none pointer-events-none select-none z-0 user-select-none">
                      {step.num}
                    </div>

                    {/* Week Badge */}
                    <div className="border border-[rgba(43,91,168,0.30)] bg-transparent px-[10px] py-[3px] inline-block mb-[10px] transition-colors duration-250 ease-in-out group-hover:border-[rgba(43,91,168,0.70)] z-10">
                      <span className="font-jost font-normal text-[0.55rem] tracking-[0.25em] text-[#2B5BA8] uppercase">
                        {step.weeks}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h4 className="font-display font-normal text-[1.4rem] text-[#EEF0F7] uppercase tracking-[0.05em] mb-3 leading-[1.2] z-10 relative transition-colors duration-250 ease-in-out group-hover:text-white">
                      {step.title}
                    </h4>

                    {/* Step Description */}
                    <p className="font-jost font-light text-[0.85rem] text-[#8B96B0] leading-[1.8] z-10 relative md:max-w-[260px] w-full text-left md:text-center">
                      {step.desc}
                    </p>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
