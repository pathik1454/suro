'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';

export default function Certifications() {
  useScrollReveal('.reveal-cert');

  const certs = [
    {
      code: 'AIS 052',
      name: 'Coach Body Standard',
      auth: 'Ministry of Road Transport & Highways',
      scope: 'Coach Body Code Compliance'
    },
    {
      code: 'BS VI',
      name: 'Emission Standard',
      auth: 'Bharat Stage Emission Standards',
      scope: 'Euro VI Equivalent'
    },
    {
      code: 'ISO 9001',
      name: 'Quality Management',
      auth: 'International Organization for Standardization',
      scope: 'Manufacturing Process Quality'
    },
    {
      code: 'BIS',
      name: 'Material Standard',
      auth: 'Bureau of Indian Standards',
      scope: 'Structural Steel Certification'
    }
  ];

  return (
    <section id="certifications" className="bg-[var(--bg-surface)] w-full py-24 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 reveal-cert text-center">
          <br />
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono font-medium text-[18px] text-[var(--text-gold)] tracking-[0.4em] uppercase leading-[1]">
              COMPLIANCE
            </h3>
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
          </div>
          <br />
          <h2 className="font-display font-light text-[48px] text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.1] text-center">
            Certified to Every <em className="font-display italic font-light text-[var(--gold)] not-italic">Standard.</em>
          </h2>
          <br />
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 reveal-cert">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="interactive-card bg-[var(--bg-card)] border-l-[3px] border-l-[var(--gold)] border-y border-r border-[var(--border-subtle)] p-[28px_32px] flex flex-col justify-center rounded-none translate-x-7"
              style={{ borderRadius: '0px !important' }}
            >
              {/* Code (IBM Plex Mono 500, 36px, --gold) */}
              <div className="font-mono font-medium text-[36px] text-[var(--gold)] leading-none">
                {cert.code}
              </div>

              {/* Name (Inter 600, 16px, --text-primary) */}
              <h4 className="font-body font-semibold text-[16px] text-[var(--text-primary)] mt-3 leading-[1.1]">
                {cert.name}
              </h4>

              {/* Issuing Body (Inter 400, 13px, --text-secondary) */}
              <p className="font-body font-normal text-[13px] text-[var(--text-secondary)] mt-1.5 leading-[1.3] tracking-wider">
                {cert.auth}
              </p>

              {/* Description (Inter 400, 12px, --text-muted) */}
              <p className="font-body font-normal text-[12px] text-[var(--text-muted)] mt-1 tracking-wider">
                {cert.scope}
              </p>
            </div>
          ))}
        </div>

        {/* Note Below (Inter 400, 13px, --text-muted, centered) */}
        <div className="reveal-cert text-center font-body font-normal text-[13px] text-[var(--text-muted)] italic mt-12 tracking-wider">
          &ldquo;All vehicles arrive with complete RTO documentation and a pre-delivery inspection certificate.&rdquo;
        </div>

      </div>
    </section>
  );
}
