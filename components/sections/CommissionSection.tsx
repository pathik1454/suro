'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import CommissionForm from '@/components/form/CommissionForm';
import { useScrollReveal } from '@/lib/useIntersectionAnimation';

export default function CommissionSection() {
  useScrollReveal('.reveal-commission', { yOffset: 30 });

  return (
    <section id="commission" className="bg-[var(--bg-base)] w-full py-24 relative overflow-hidden z-10">
      
      {/* Ambient Light Orbs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[var(--gold)] rounded-full blur-[200px] opacity-[0.10] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[var(--steel)] rounded-full blur-[180px] opacity-[0.08] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Copy */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            <div className="mb-12 reveal-commission opacity-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--gold)]" />
                <h3 className="font-mono text-[11px] text-[var(--gold)] tracking-[0.4em] uppercase">
                  COMMISSION
                </h3>
              </div>
              <h2 className="font-display font-bold text-[48px] md:text-[56px] text-[var(--text-primary)] leading-[1.1] mb-8">
                Start<br />
                Your Build.
              </h2>
              <p className="font-body text-[15px] text-[var(--text-secondary)] leading-[1.7] max-w-[440px]">
                25 years of engineering coaches for India&apos;s roads. Every vehicle is commissioned individually — no stock units, no compromises. Tell us what you need.
              </p>
            </div>

            <div className="flex flex-col gap-12 reveal-commission opacity-0 delay-100">
              {/* What to expect */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[12px] text-[var(--text-muted)] tracking-widest uppercase">What to expect</span>
                  <div className="flex-1 h-[1px] bg-[var(--border-subtle)]" />
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    'Custom-Built to Specification',
                    'AIS 052 Fully Compliant',
                    'Volvo-Certified Chassis',
                    'Pan-India Delivery'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-body text-[14px] text-[var(--text-secondary)]">
                      <span className="text-[var(--gold)]">&gt;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[12px] text-[var(--text-muted)] tracking-widest uppercase">Reach us directly</span>
                  <div className="flex-1 h-[1px] bg-[var(--border-subtle)]" />
                </div>
                <div className="flex flex-col gap-4">
                  <a href="tel:+919825039111" className="flex items-center gap-4 font-body text-[14px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors group w-fit">
                    <Phone size={18} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors" />
                    +91 98250 39111
                  </a>
                  <a href="mailto:surendra_bareja@yahoo.com" className="flex items-center gap-4 font-body text-[14px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors group w-fit">
                    <Mail size={18} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors" />
                    surendra_bareja@yahoo.com
                  </a>
                  <div className="flex items-start gap-4 font-body text-[14px] text-[var(--text-secondary)]">
                    <MapPin size={18} className="text-[var(--steel-silver)] shrink-0 mt-1" />
                    <span className="leading-relaxed">
                      NH-8, Near APMC Market,<br />
                      Bareja – 382425, Ahmedabad
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-1/2 reveal-commission opacity-0 delay-200">
            <CommissionForm />
          </div>

        </div>
      </div>
    </section>
  );
}
