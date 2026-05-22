'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';
import { Activity, Wrench, RotateCcw, Truck } from 'lucide-react';

const services = [
  {
    icon: Activity,
    title: 'Commercial Vehicle Diagnostics',
    description: 'Advanced diagnostic systems for commercial vehicles. We identify mechanical, electrical, and performance issues with precision, ensuring your fleet operates at peak efficiency.',
    features: ['Engine diagnostics', 'Electrical system analysis', 'Performance testing'],
  },
  {
    icon: Wrench,
    title: 'Commercial Vehicle Repair & Maintenance',
    description: 'Comprehensive repair and scheduled maintenance services for all commercial vehicles. From routine servicing to complex mechanical overhauls, we deliver reliability.',
    features: ['Scheduled maintenance', 'Brake & suspension', 'AC & electrical'],
  },
  {
    icon: RotateCcw,
    title: 'Commercial Vehicle Restoration',
    description: 'Complete restoration services that bring aging commercial vehicles back to life. We rebuild, refinish, and re-engineer coaches to meet modern standards.',
    features: ['Body restoration', 'Interior overhaul', 'Structural reinforcement'],
  },
  {
    icon: Truck,
    title: 'Fleet Vehicle Repair',
    description: 'Dedicated fleet repair services with priority scheduling and bulk maintenance programs. Keep your entire fleet road-ready with minimal downtime.',
    features: ['Priority scheduling', 'Bulk maintenance', 'Downtime minimization'],
  },
];

export default function PopularServices() {
  useScrollReveal('.reveal-services', { yOffset: 30 });

  return (
    <section id="services" className="bg-[var(--bg-base)] w-full py-24 relative z-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[var(--steel)] rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-16 reveal-services opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono text-[11px] text-[var(--gold)] tracking-[0.4em] uppercase">
              OUR EXPERTISE
            </h3>
            <div className="w-full max-w-[200px] h-[1px] bg-[var(--border-subtle)]" />
          </div>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] text-[var(--text-primary)] leading-[1.1]">
            Popular<br />
            Services.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div 
                key={i}
                className="reveal-services opacity-0 group relative bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col overflow-hidden hover:shadow-[var(--shadow-gold)] transition-all duration-400"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Gold left border accent */}
                <div className="absolute top-0 left-0 w-[3px] h-full bg-[var(--gold)] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out" />
                
                {/* Large watermark number */}
                <div className="absolute top-4 right-4 font-display font-bold text-[72px] text-[var(--text-primary)] opacity-[0.04] leading-none pointer-events-none select-none">
                  0{i + 1}
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[var(--gold)]/10 border border-[var(--border-gold)] flex items-center justify-center mb-6 group-hover:bg-[var(--gold)]/20 group-hover:border-[var(--border-gold-h)] transition-all duration-300">
                    <Icon size={24} className="text-[var(--gold)]" />
                  </div>

                  {/* Title */}
                  <h4 className="font-body font-semibold text-[17px] text-[var(--text-primary)] mb-4 leading-snug">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="font-body text-[13px] text-[var(--text-secondary)] leading-[1.7] mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-[var(--border-subtle)] mb-5" />

                  {/* Feature bullets */}
                  <ul className="flex flex-col gap-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 font-body text-[12px] text-[var(--text-muted)]">
                        <span className="w-1 h-1 rounded-full bg-[var(--gold)] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
