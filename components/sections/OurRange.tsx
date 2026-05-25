'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';
import { useLenis } from 'lenis/react';

export default function OurRange() {
  useScrollReveal('.reveal-range');
  const lenis = useLenis();

  const coaches = [
    {
      title: 'Luxury Sleeper Coach',
      code: 'SC-TYPE-01 · Volvo 9600 XL',
      specs: ['› 40 Premium Berths', '› Dual-Deck Layout', '› AIS 052 Compliant'],
      image: '/images/coaches/luxury-sleeper.png',
    },
    {
      title: 'Semi-Sleeper Coach',
      code: 'SC-TYPE-02 · Volvo B7R',
      specs: ['› 45 Reclining Seats', '› Air Suspension', '› Long-Route Optimized'],
      image: '/images/coaches/semi-sleeper.png',
    },
    {
      title: 'Premium Seater Coach',
      code: 'SC-TYPE-03 · Standard',
      specs: ['› 53 Seats Capacity', '› Fleet-Ready Build', '› Maximum Efficiency'],
      image: '/images/coaches/premium-seater.png',
    },
    {
      title: 'Institutional Bus',
      code: 'SC-TYPE-04 · Safety-First',
      specs: ['› RTO Compliant Design', '› Robust Steel Cage', '› High Visibility'],
      image: '/images/coaches/institutional-bus.png',
    }
  ];

  const handleRequestSpec = () => {
    lenis?.scrollTo('#contact', { offset: -68 });
  };

  return (
    <section id="range" className="bg-[var(--bg-surface)] w-full py-24 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 reveal-range text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono font-medium text-[18px] text-[var(--text-gold)] tracking-[0.4em] uppercase leading-[1]">
              COACH RANGE
            </h3>
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
          </div>
          <br />
          <h2 className="font-display font-light text-[48px] text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.1] text-center">
            Every Coach. <em className="font-display italic font-light text-[var(--gold)] not-italic">Engineered Here.</em>
          </h2>
          <br />
        </div>

        {/* Card Grid with Mobile Snap Scroll */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 lg:pb-0 lg:overflow-x-visible lg:grid lg:grid-cols-4 scrollbar-none">
          {coaches.map((coach, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[290px] xs:w-[320px] sm:w-[350px] lg:w-auto bg-[var(--bg-card)] border border-[var(--border-subtle)] border-t-2 border-t-transparent hover:border-t-[var(--gold)] hover:shadow-[var(--shadow-gold)] hover:-translate-y-[4px] transition-all duration-[400ms] ease-out flex flex-col group rounded-none translate-x-7"
              style={{ borderRadius: '0px !important' }}
            >
              {/* Image Area (220px tall) */}
              <div className="h-[220px] w-full overflow-hidden relative bg-[var(--bg-surface)]">
                <img
                  src={coach.image}
                  alt={coach.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Code (IBM Plex Mono 500, 10px, --text-muted) */}
                <div className="font-mono font-medium text-[10px] tracking-wider uppercase text-[var(--gold)] border border-[var(--border-gold)] px-[0.8rem] py-[0.3rem] w-fit mb-3 leading-[1]">
                  {coach.code}
                </div>

                {/* Product Name (Inter 600, 16px, --text-primary) */}
                <h4 className="font-body font-semibold text-[16px] text-[var(--text-primary)] mt-1 mb-3 leading-[1.2]">
                  {coach.title}
                </h4>

                <div className="w-full h-[1px] bg-[var(--border-subtle)] my-4" />

                {/* Features (Inter 400, 13px, --text-secondary, prefix >) */}
                <ul className="flex flex-col gap-3 flex-grow mb-6">
                  {coach.specs.map((spec, specIdx) => {
                    const cleanedSpec = spec.replace(/^[›\s>]+/, '');
                    return (
                      <li key={specIdx} className="font-body font-normal text-[13px] text-[var(--text-secondary)] flex items-center gap-2 leading-[1.2] tracking-wider">
                        <span className="text-[var(--gold)] font-medium">&gt;</span>
                        {cleanedSpec}
                      </li>
                    );
                  })}
                </ul>

                <div className="w-full h-[1px] bg-[var(--border-subtle)] my-4" />

                {/* CTA Button (Ghost style: border var(--border-gold), var(--gold)) */}
                <button
                  onClick={handleRequestSpec}
                  className="w-full text-center py-3 border border-[var(--border-gold)] text-[var(--gold)] font-body font-semibold text-[12px] tracking-wider uppercase hover:border-[var(--border-gold-h)] hover:bg-[var(--gold-glow)] transition-all duration-300 cursor-pointer rounded-none"
                  style={{ borderRadius: '0px !important' }}
                >
                  Request Spec Sheet &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
