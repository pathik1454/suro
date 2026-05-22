'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';

export default function Certifications() {
  useScrollReveal('.reveal-cert', { yOffset: 30 });

  const certs = [
    {
      code: 'AIS 052',
      title: 'Coach Body Standard',
      auth: 'Ministry of Road Transport & Highways, Govt. of India',
      desc: 'Coach Body Code Compliance'
    },
    {
      code: 'BS VI',
      title: 'Emission Standard',
      auth: 'Bharat Stage Emission Standards',
      desc: 'Euro VI Equivalent Compliance'
    },
    {
      code: 'ISO 9001',
      title: 'Quality Management',
      auth: 'International Organization for Standardization',
      desc: 'Manufacturing Process Quality'
    },
    {
      code: 'BIS',
      title: 'Material Standard',
      auth: 'Bureau of Indian Standards',
      desc: 'Structural Steel Certification'
    }
  ];

  return (
    <section className="bg-[var(--bg-surface)] w-full py-24 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-16 reveal-cert opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono text-[11px] text-[var(--gold)] tracking-[0.4em] uppercase">
              COMPLIANCE
            </h3>
            <div className="w-full max-w-[200px] h-[1px] bg-[var(--border-subtle)]" />
          </div>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] text-[var(--text-primary)] leading-[1.1]">
            Certified to<br />
            Every Standard.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {certs.map((cert, i) => (
            <div 
              key={i} 
              className="reveal-cert opacity-0 bg-[var(--bg-card)] border-l-[3px] border-l-[var(--gold)] border-y border-r border-y-[var(--border-subtle)] border-r-[var(--border-subtle)] p-7 md:p-8 flex flex-col justify-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-mono font-medium text-[32px] md:text-[36px] text-[var(--gold)] mb-3">
                {cert.code}
              </div>
              <h4 className="font-body font-semibold text-[16px] text-[var(--text-primary)] mb-4">
                {cert.title}
              </h4>
              <p className="font-body text-[13px] text-[var(--text-secondary)] leading-relaxed mb-2">
                {cert.auth}
              </p>
              <p className="font-body text-[12px] text-[var(--text-muted)]">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="reveal-cert opacity-0 text-center font-body text-[13px] text-[var(--text-muted)] mt-12">
          All vehicles arrive with complete RTO documentation and a pre-delivery inspection certificate.
        </div>

      </div>
    </section>
  );
}
