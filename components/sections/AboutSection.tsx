'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';
import { Building2, Award, MapPin, User } from 'lucide-react';

export default function AboutSection() {
  useScrollReveal('.reveal-about', { yOffset: 30 });

  return (
    <section id="about" className="bg-[var(--bg-surface)] w-full py-24 relative z-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-15%] right-[-5%] w-[400px] h-[400px] bg-[var(--gold)] rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-16 reveal-about opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono text-[11px] text-[var(--gold)] tracking-[0.4em] uppercase">
              ABOUT US
            </h3>
            <div className="w-full max-w-[200px] h-[1px] bg-[var(--border-subtle)]" />
          </div>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] text-[var(--text-primary)] leading-[1.1]">
            Built on Trust.<br />
            Driven by Excellence.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left — Company Story */}
          <div className="flex flex-col gap-8 reveal-about opacity-0">
            <p className="font-body text-[16px] lg:text-[17px] text-[var(--text-secondary)] leading-[1.8] max-w-[560px]">
              Established in 2009, India Surendra &amp; Co. has built a strong reputation for excellence in manufacturing premium luxury bus bodies. Based in Ahmedabad, the company is recognized for delivering superior craftsmanship, reliable service, and high-quality products tailored to customer needs.
            </p>
            <p className="font-body text-[15px] text-[var(--text-secondary)] leading-[1.8] max-w-[560px]">
              With years of industry expertise and a commitment to innovation, India Surendra &amp; Co. continues to be a trusted name among leading suppliers in the transportation sector.
            </p>
            
            {/* Proprietor Card */}
            <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border-gold)] rounded-lg p-6 max-w-[400px]">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 border border-[var(--border-gold)] flex items-center justify-center">
                  <User size={20} className="text-[var(--gold)]" />
                </div>
                <div>
                  <div className="font-body font-semibold text-[16px] text-[var(--text-primary)]">
                    MR Shrikant Sharma
                  </div>
                  <div className="font-mono text-[11px] text-[var(--gold)] tracking-wider uppercase">
                    Proprietor
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-[var(--border-subtle)] my-3" />
              <p className="font-body text-[13px] text-[var(--text-muted)] leading-relaxed">
                Leading Surendra &amp; Co. with a vision for uncompromising quality and innovation in luxury coach manufacturing.
              </p>
            </div>
          </div>

          {/* Right — Key Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-about opacity-0">
            
            {/* Card: Founded */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 rounded-sm group hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--gold)]/20 transition-colors">
                <Building2 size={20} className="text-[var(--gold)]" />
              </div>
              <div className="font-mono font-medium text-[32px] text-[var(--gold)] leading-none mb-2">
                2009
              </div>
              <div className="font-body font-medium text-[14px] text-[var(--text-primary)] uppercase tracking-wider mb-1">
                Established
              </div>
              <div className="font-body text-[12px] text-[var(--text-muted)]">
                Over 15 years of manufacturing excellence
              </div>
            </div>

            {/* Card: Location */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 rounded-sm group hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--gold)]/20 transition-colors">
                <MapPin size={20} className="text-[var(--gold)]" />
              </div>
              <div className="font-display font-semibold text-[24px] text-[var(--text-primary)] leading-tight mb-2">
                Ahmedabad
              </div>
              <div className="font-body font-medium text-[14px] text-[var(--text-primary)] uppercase tracking-wider mb-1">
                India
              </div>
              <div className="font-body text-[12px] text-[var(--text-muted)]">
                NH-8, Near APMC Market, Bareja
              </div>
            </div>

            {/* Card: Quality */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 rounded-sm group hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--gold)]/20 transition-colors">
                <Award size={20} className="text-[var(--gold)]" />
              </div>
              <div className="font-mono font-medium text-[32px] text-[var(--gold)] leading-none mb-2">
                500+
              </div>
              <div className="font-body font-medium text-[14px] text-[var(--text-primary)] uppercase tracking-wider mb-1">
                Coaches Built
              </div>
              <div className="font-body text-[12px] text-[var(--text-muted)]">
                Premium luxury buses on Indian roads
              </div>
            </div>

            {/* Card: Speciality */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 rounded-sm group hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--gold)]/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)]">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="font-display font-semibold text-[24px] text-[var(--text-primary)] leading-tight mb-2">
                Premium
              </div>
              <div className="font-body font-medium text-[14px] text-[var(--text-primary)] uppercase tracking-wider mb-1">
                Luxury Bodies
              </div>
              <div className="font-body text-[12px] text-[var(--text-muted)]">
                Bespoke coach bodies tailored to spec
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
