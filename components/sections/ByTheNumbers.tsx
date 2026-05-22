'use client';

import StatCounter from '@/components/ui/StatCounter';
import { useScrollReveal } from '@/lib/useIntersectionAnimation';

export default function ByTheNumbers() {
  useScrollReveal('.reveal-stats', { yOffset: 30 });

  const stats = [
    {
      value: 25,
      suffix: '+',
      title: 'Years in Operation',
      desc: 'Manufacturing since 2009'
    },
    {
      value: 500,
      suffix: '+',
      title: 'Coaches Delivered',
      desc: 'Running across India'
    },
    {
      value: 800,
      prefix: '₹',
      suffix: 'Cr',
      title: 'Revenue Generated',
      desc: 'Trusted B2B Partner'
    },
    {
      value: 40,
      suffix: '',
      title: 'Premium Berths',
      desc: 'In our flagship Volvo 9600 XL'
    }
  ];

  return (
    <section className="bg-[var(--bg-base)] w-full py-24 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-16 reveal-stats opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono text-[11px] text-[var(--gold)] tracking-[0.4em] uppercase">
              THE NUMBERS
            </h3>
            <div className="w-full max-w-[200px] h-[1px] bg-[var(--border-subtle)]" />
          </div>
          <h2 className="font-display font-light text-[48px] text-[var(--text-secondary)]">
            25 years. One promise.
          </h2>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="reveal-stats opacity-0 bg-[var(--bg-card)] border border-[var(--border-subtle)] border-t-[2px] border-t-[var(--gold)] px-7 py-8 rounded-[4px]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-display font-bold text-[64px] lg:text-[80px] text-[var(--gold)] leading-none mb-4">
                <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="font-body font-medium text-[14px] text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                {stat.title}
              </div>
              <div className="font-body text-[12px] text-[var(--text-muted)]">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
