'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';

export default function OurRange() {
  useScrollReveal('.reveal-range', { yOffset: 30 });

  const coaches = [
    {
      title: 'Luxury Sleeper Coach',
      code: 'SC-TYPE-01 · Volvo 9600 XL',
      specs: ['> 40 Premium Berths', '> Dual-Deck Layout', '> AIS 052 Compliant'],
      image: 'bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-void)]'
    },
    {
      title: 'Semi-Sleeper Coach',
      code: 'SC-TYPE-02 · Volvo B7R',
      specs: ['> 45 Reclining Seats', '> Air Suspension', '> Long-Route Optimized'],
      image: 'bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-void)]'
    },
    {
      title: 'Premium Seater Coach',
      code: 'SC-TYPE-03 · Standard',
      specs: ['> 53 Seats Capacity', '> Fleet-Ready Build', '> Maximum Efficiency'],
      image: 'bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-void)]'
    },
    {
      title: 'Institutional Bus',
      code: 'SC-TYPE-04 · Safety-First',
      specs: ['> High-Visibility Yellow', '> RTO Safety Compliant', '> Robust Steel Cage'],
      image: 'bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-void)]'
    }
  ];

  const scrollToCommission = () => {
    const el = document.getElementById('commission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="range" className="bg-[var(--bg-surface)] w-full py-24 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-16 reveal-range opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono text-[11px] text-[var(--gold)] tracking-[0.4em] uppercase">
              COACH RANGE
            </h3>
            <div className="w-full max-w-[200px] h-[1px] bg-[var(--border-subtle)]" />
          </div>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] text-[var(--text-primary)] leading-[1.1]">
            Every Coach.<br />
            Engineered Here.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {coaches.map((coach, i) => (
            <div 
              key={i} 
              className="reveal-range opacity-0 group flex flex-col bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:shadow-[var(--shadow-gold)] transition-all duration-400 ease-out relative overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Top Hover Border */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out z-10" />
              
              {/* Image Placeholder area */}
              <div className={`w-full h-[220px] ${coach.image} relative overflow-hidden flex items-center justify-center`}>
                <div className="font-mono text-[12px] text-[var(--text-muted)] group-hover:scale-105 transition-transform duration-700 ease-out">
                  IMAGE: {coach.title}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h4 className="font-body font-semibold text-[16px] text-[var(--text-primary)] mb-1">
                  {coach.title}
                </h4>
                <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest mb-6 uppercase">
                  {coach.code}
                </div>
                
                <div className="w-full h-[1px] bg-[var(--border-subtle)] mb-6" />
                
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  {coach.specs.map((spec, j) => (
                    <li key={j} className="font-body text-[13px] text-[var(--text-secondary)]">
                      {spec}
                    </li>
                  ))}
                </ul>
                
                <div className="w-full h-[1px] bg-[var(--border-subtle)] mb-6" />

                <button 
                  onClick={scrollToCommission}
                  className="w-full py-3 border border-[var(--border-gold)] text-[var(--gold)] font-body font-semibold text-[12px] tracking-wider uppercase rounded hover:bg-[var(--gold)]/10 transition-colors"
                >
                  Request Spec Sheet →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
