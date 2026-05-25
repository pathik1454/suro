'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';

export default function PopularServices() {
  useScrollReveal('.reveal-services');

  const services = [
    {
      num: '01',
      title: 'Commercial Vehicle Diagnostics',
      desc: 'Advanced diagnostic systems for commercial vehicles. We identify mechanical, electrical, and performance issues with precision.',
      bullets: ['›  Engine diagnostics', '›  Electrical system analysis', '›  Performance testing']
    },
    {
      num: '02',
      title: 'Repair & Maintenance',
      desc: 'Comprehensive repair and scheduled maintenance services. From routine servicing to complex mechanical overhauls, we deliver reliability.',
      bullets: ['›  Scheduled maintenance', '›  Brake & suspension', '›  AC & electrical']
    },
    {
      num: '03',
      title: 'Vehicle Restoration',
      desc: 'Complete restoration services that bring aging coaches back to life. We rebuild, refinish, and re-engineer to modern standards.',
      bullets: ['›  Body restoration', '›  Interior overhaul', '›  Structural reinforcement']
    },
    {
      num: '04',
      title: 'Fleet Vehicle Repair',
      desc: 'Dedicated fleet repair with priority scheduling and bulk maintenance programs. Keep your fleet road-ready with minimal downtime.',
      bullets: ['›  Priority scheduling', '›  Bulk maintenance', '›  Downtime minimization']
    }
  ];

  return (
    <section id="services" className="bg-[var(--bg-surface)] w-full py-24 relative z-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 reveal-services text-center">
          <br />
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono font-medium text-[18px] text-[var(--text-gold)] tracking-[0.4em] uppercase leading-[1]">
              OUR EXPERTISE
            </h3>
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
          </div>
          <h2 className="font-display font-light text-[48px] text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.1] text-center">
            Popular <em className="font-display italic font-light text-[var(--gold)] not-italic">Services.</em>
          </h2>
          <br />
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-services">
          {services.map((svc, i) => (
            <div
              key={i}
              className="interactive-card bg-[var(--bg-card)] border border-[var(--border-subtle)] border-t-[3px] border-t-[var(--gold)] p-8 sm:p-10 relative overflow-hidden flex flex-col rounded-none translate-x-7"
              style={{ borderRadius: '0px !important' }}
            >
              {/* Large Watermark Number (Cormorant Garamond 700, 72px, 8% opacity) */}
              <div className="absolute top-4 right-6 font-display font-bold text-[72px] text-[var(--gold)] opacity-[0.08] leading-none pointer-events-none select-none">
                {svc.num}
              </div>

              {/* Title (Cormorant Garamond 600, 1.4rem) */}
              <h4 className="font-display font-semibold text-[1.4rem] text-[var(--text-primary)] mb-4 relative z-10 leading-[1.2]">
                {svc.title}
              </h4>

              {/* Description (Inter 400, 15px, --text-secondary) */}
              <p className="font-body font-normal text-[15px] text-[var(--text-secondary)] leading-[1.8] tracking-wider mb-6 relative z-10">
                {svc.desc}
              </p>

              {/* Bullets (Inter 400, 13px, prefixed with >) */}
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 mt-auto pt-4 border-t border-[var(--border-subtle)] relative z-10">
                {svc.bullets.map((bullet, j) => {
                  const cleanedBullet = bullet.replace(/^[›\s>]+/, '');
                  return (
                    <li key={j} className="font-body font-normal text-[13px] text-[var(--text-secondary)] flex items-center gap-1.5 leading-[1] tracking-wider">
                      <span className="text-[var(--gold)] font-medium">&gt;</span>
                      {cleanedBullet}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

      </div>
      <br />
      <br />
    </section>
  );
}
