'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';

export default function AboutSection() {
  useScrollReveal('.reveal-about');

  const stats = [
    {
      stat: '1984',
      label: 'Established',
      sub: '40+ years of manufacturing'
    },
    {
      stat: '500+',
      label: 'Coaches Built',
      sub: 'Running across India'
    },
    {
      stat: 'Ahmedabad',
      label: 'Headquarters',
      sub: 'NH-8, Near APMC Market, Bareja'
    },
    {
      stat: 'Premium',
      label: 'Luxury Bodies',
      sub: 'Bespoke coach bodies, tailored to spec'
    }
  ];

  return (
    <section id="about" className="bg-[var(--bg-base)] w-full py-24 relative z-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full">

        {/* Header Block */}
        <div className="reveal-about mb-16 text-center">
          <br />
          <br />
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono font-medium text-[18px] text-[var(--text-gold)] tracking-[0.4em] uppercase leading-[1]">
              SURENDRA &amp; CO ORIGINS
            </h3>
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
          </div>
          <br />
          <br />
          <h2 className="font-display font-light text-[48px] text-[var(--text-secondary)] max-w-[700px] mx-auto leading-[1.1] text-center">
            Built on Trust. <em className="font-display italic font-light text-[var(--gold)] not-italic">Driven by Excellence.</em>
          </h2>
          <br />
        </div>

        {/* Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20 w-full">
          {/* Left Description Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 reveal-about">
            <p className="font-body font-light text-[15px] text-[var(--text-secondary)] leading-[1.8] tracking-wider">
              Established in 1984, Surendra &amp; Co. has built a strong reputation for excellence in manufacturing premium luxury bus bodies. Based in Ahmedabad, the company is recognized for delivering superior craftsmanship, reliable service, and high-quality products tailored to customer needs.
            </p>
            <p className="font-body font-light text-[15px] text-[var(--text-secondary)] leading-[1.8] tracking-wider">
              With years of industry expertise and a commitment to innovation, Surendra &amp; Co. continues to be a trusted name among leading suppliers in the transportation sector.
            </p>
            <br />
          </div>

          {/* Right Leadership Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 reveal-about lg:-mt-12">
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] border-t-[3px] border-t-[var(--gold)] p-8 rounded-none translate-x-7" style={{ borderRadius: '0px !important' }}>
              <h4 className="font-display font-semibold text-[22px] text-[var(--gold)] mb-1 leading-none">
                Shrikant Sharma
              </h4>
              <p className="font-mono font-medium text-[10px] text-[var(--text-muted)] tracking-wider uppercase mb-6 leading-none">
                Managing Director &amp; Driving Force
              </p>
              
              <div className="flex flex-col gap-4">
                <p className="font-body font-normal text-[13px] text-[var(--text-secondary)] leading-[1.7] tracking-wider">
                  Shrikant Sharma is the driving force behind Surendra &amp; Co.. With a strong commitment to quality craftsmanship and customer satisfaction, he has played a key role in building the company’s reputation in custom bus body manufacturing and commercial vehicle fabrication.
                </p>
                <p className="font-body font-normal text-[13px] text-[var(--text-secondary)] leading-[1.7] tracking-wider">
                  Known for his practical approach, industry knowledge, and attention to detail, Mr. Sharma focuses on delivering durable, reliable, and customized fabrication solutions tailored to client requirements. His vision and dedication continue to guide the company toward excellence in the commercial vehicle industry.
                </p>
                <p className="font-body font-normal text-[13px] text-[var(--text-secondary)] leading-[1.7] tracking-wider">
                  Under his leadership, Surendra &amp; Co. has become a trusted name for precision-built vehicle bodies and dependable fabrication services in Ahmedabad and surrounding regions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-about">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="interactive-card bg-[var(--bg-card)] border border-[var(--border-subtle)] border-t-[3px] border-t-[var(--gold)] p-8 flex flex-col rounded-none translate-x-7"
              style={{ borderRadius: '0px !important' }}
            >
              <div className="font-display font-bold text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--text-primary)] leading-[1] mb-2 flex items-baseline">
                {item.stat.endsWith('+') ? (
                  <>
                    <span>{item.stat.slice(0, -1)}</span>
                    <span className="text-[var(--gold)]">+</span>
                  </>
                ) : (
                  <span>{item.stat}</span>
                )}
              </div>

              <div className="font-body font-medium text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.25em] mb-4 leading-[1]">
                {item.label}
              </div>

              <div className="font-body font-light text-[13px] text-[var(--text-muted)] leading-[1.7] tracking-wider">
                {item.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
