'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';

export default function TheMaking() {
  useScrollReveal('.reveal-process', { yOffset: 30 });

  const steps = [
    {
      id: '01',
      title: 'DESIGN &\nCONSULTATION',
      weeks: 'Wk 1–2',
      desc: 'We begin with your requirements — route type, passenger load, comfort tier, and customizations.'
    },
    {
      id: '02',
      title: 'CHASSIS\nFABRICATION',
      weeks: 'Wk 3–8',
      desc: 'Steel cage welded to AIS 052. Drivetrain integration and structural framing.'
    },
    {
      id: '03',
      title: 'INTERIOR\nFIT-OUT',
      weeks: 'Wk 9–14',
      desc: 'Berths, upholstery, flooring, AC, electrical, and exterior aerodynamic panels.'
    },
    {
      id: '04',
      title: 'QC &\nDELIVERY',
      weeks: 'Wk 15–16',
      desc: 'Full inspection, RTO documentation, and pan-India transport to your facility.'
    }
  ];

  return (
    <section id="process" className="bg-[var(--bg-base)] w-full py-24 relative z-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-20 reveal-process opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono text-[11px] text-[var(--gold)] tracking-[0.4em] uppercase">
              THE PROCESS
            </h3>
            <div className="w-full max-w-[200px] h-[1px] bg-[var(--border-subtle)]" />
          </div>
          <h2 className="font-display font-bold text-[48px] md:text-[56px] text-[var(--text-primary)] leading-[1.1]">
            From Order<br />
            to Road.
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-[120px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-[var(--border-gold)] z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="reveal-process opacity-0 flex flex-col relative"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Mobile/Tablet Connecting Line */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute top-[100px] left-[32px] bottom-[-32px] w-[1px] border-l border-dashed border-[var(--border-gold)] z-0" />
                )}

                {/* Card Container */}
                <div className="bg-transparent lg:px-6 relative z-10">
                  
                  {/* Watermark Number */}
                  <div className="absolute top-[-20px] left-0 lg:left-6 font-display font-bold text-[72px] text-[var(--text-primary)] opacity-[0.08] leading-none pointer-events-none select-none z-0">
                    {step.id}
                  </div>

                  {/* Desktop Dot */}
                  <div className="hidden lg:block w-[6px] h-[6px] rounded-full bg-[var(--gold)] mx-auto mb-16 relative z-10" />

                  {/* Content */}
                  <div className="relative z-10 mt-16 lg:mt-0 pl-12 lg:pl-0">
                    {/* Mobile Dot */}
                    <div className="lg:hidden absolute top-2 left-[-4px] w-[8px] h-[8px] rounded-full bg-[var(--gold)] z-10" />

                    <h4 className="font-body font-semibold text-[18px] text-[var(--text-primary)] leading-[1.3] whitespace-pre-line mb-4">
                      {step.title}
                    </h4>
                    
                    <div className="font-mono text-[11px] text-[var(--gold)] tracking-widest uppercase mb-4">
                      {step.weeks}
                    </div>
                    
                    <p className="font-body text-[14px] text-[var(--text-secondary)] leading-[1.6]">
                      {step.desc}
                    </p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
