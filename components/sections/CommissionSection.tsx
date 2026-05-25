'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';
import { Phone, Mail, MapPin } from 'lucide-react';
import CommissionForm from '@/components/form/CommissionForm';

export default function CommissionSection() {
  useScrollReveal('.reveal-commission');

  const expectations = [
    'Custom-Built to Specification',
    'AIS 052 Fully Compliant',
    'Volvo-Certified Chassis',
    'Pan-India Delivery'
  ];

  return (
    <section id="contact" className="bg-[var(--bg-base)] w-full py-24 relative overflow-hidden z-10">

      {/* Ambient Glow Effects */}
      <div
        className="absolute top-0 right-[-10%] w-[500px] h-[400px] pointer-events-none opacity-100 z-0 rounded-none"
        style={{
          background: 'radial-gradient(ellipse 500px 400px at 90% 10%, rgba(212, 132, 26, 0.10), transparent)',
          borderRadius: '0px !important'
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[350px] pointer-events-none opacity-100 z-0 rounded-none"
        style={{
          background: 'radial-gradient(ellipse 400px 350px at 10% 90%, rgba(61, 94, 120, 0.08), transparent)',
          borderRadius: '0px !important'
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Section Label — full-width centered */}
        <div className="mb-16 text-center reveal-commission">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono font-medium text-[18px] text-[var(--text-gold)] tracking-[0.4em] uppercase leading-[1]">
              COMMISSION
            </h3>
            <br />

            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
            <br />
          </div>
          <br />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column */}
          <div className="flex flex-col reveal-commission">

            {/* Header */}
            <div className="mb-10 flex flex-col">
              <h2 className="font-display font-light text-[clamp(2.2rem,4vw,3.8rem)] text-[var(--text-primary)] leading-[1.1] mb-6">
                Start Your <em className="font-display italic font-light text-[var(--gold)] not-italic">Build.</em>
              </h2>
              <p className="font-body font-normal text-[15px] text-[var(--text-secondary)] leading-[1.8] tracking-wider max-w-[440px]">
                25 years of engineering coaches for India&apos;s roads. Every vehicle is commissioned individually &mdash; no stock units, no compromises. Tell us what you need.
              </p>
              < br />
            </div>

            {/* WHAT TO EXPECT */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-5">
                <h4 className="font-mono font-medium text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] shrink-0 leading-[1]">
                  WHAT TO EXPECT
                </h4>
                <div className="w-full h-[1px] bg-[var(--border-subtle)]" />
                <br />
              </div>
              <ul className="flex flex-col gap-3">
                {expectations.map((item, idx) => (
                  <li key={idx} className="font-body font-normal text-[14px] text-[var(--text-secondary)] flex items-center gap-2 tracking-wider">
                    <span className="text-[var(--gold)] font-medium">&gt;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <br />
            </div>

            {/* REACH US */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h4 className="font-mono font-medium text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] shrink-0 leading-[1]">
                  REACH US DIRECTLY
                </h4>
                <br />
                <div className="w-full h-[1px] bg-[var(--border-subtle)]" />
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="tel:+919825039111"
                  className="flex items-center gap-2.5 font-body font-normal text-[14px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors w-fit group tracking-wider"
                >
                  <Phone size={16} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors" />
                  +91 98250 39111
                </a>
                <a
                  href="mailto:surendra_bareja@yahoo.com"
                  className="flex items-center gap-2.5 font-body font-normal text-[14px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors w-fit group tracking-wider"
                >
                  <Mail size={16} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors" />
                  surendra_bareja@yahoo.com
                </a>
                <div className="flex items-start gap-2.5 font-body font-normal text-[14px] text-[var(--text-secondary)] tracking-wider leading-[1.8]">
                  <MapPin size={16} className="text-[var(--steel-silver)] mt-1 shrink-0" />
                  <span>
                    NH-8, Near APMC Market, Bareja &ndash; 382425, Ahmedabad
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Form) */}
          <div className="reveal-commission translate-x-5">
            <CommissionForm />
          </div>

        </div>
      </div>
    </section>
  );
}
