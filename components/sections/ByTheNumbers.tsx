'use client';

import { useScrollReveal } from '@/lib/useIntersectionAnimation';
import { useEffect, useRef, useState } from 'react';

function CountUpNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayVal, setDisplayVal] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const animationTriggered = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const animate = () => {
      const duration = 1600; // 1600ms
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // ease-out cubic: t => 1 - Math.pow(1 - t, 3)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.round(easeProgress * value);

        setDisplayVal(currentCount);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayVal(value);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationTriggered.current) {
            animationTriggered.current = true;
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={elementRef} className="flex items-baseline font-display font-bold text-[80px] text-[var(--gold)]">
      {prefix && <span className="text-[var(--gold)] mr-1">{prefix}</span>}
      <span className="text-[var(--gold)]">{displayVal}</span>
      {suffix && <span className="text-[var(--gold)] ml-1">{suffix}</span>}
    </span>
  );
}

export default function ByTheNumbers() {
  useScrollReveal('.reveal-numbers');

  const stats = [
    {
      value: 40,
      suffix: '+',
      prefix: '',
      title: 'Years in Operation',
      desc: 'Manufacturing since 1984'
    },
    {
      value: 500,
      suffix: '+',
      prefix: '',
      title: 'Coaches Delivered',
      desc: 'Running across India'
    },
    {
      value: 25,
      suffix: ' Cr',
      prefix: '₹',
      title: 'Revenue Generated',
      desc: 'Trusted B2B partner'
    },
    {
      value: 40,
      suffix: '',
      prefix: '',
      title: 'Premium Berths',
      desc: 'In the Volvo 9600 XL'
    }
  ];

  return (
    <section className="bg-[var(--bg-base)] w-full py-24 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 reveal-numbers text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
            <h3 className="font-mono font-medium text-[18px] text-[var(--text-gold)] tracking-[0.4em] uppercase leading-[1]">
              NUMBERS
            </h3>
            <div className="w-[35px] h-[1px] bg-[var(--gold)]" />
          </div>
          <h2 className="font-display font-light text-[48px] text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.1] text-center">
            40 years. <em className="font-display italic font-light text-[var(--gold)] not-italic">One promise.</em>
          </h2>
          <br />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 reveal-numbers">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="interactive-card bg-[var(--bg-card)] border border-[var(--border-subtle)] border-t-[2px] border-t-[var(--gold)] px-7 py-8 rounded-none flex flex-col justify-center translate-x-7"
              style={{ borderRadius: '0px !important' }}
            >
              <div className="leading-[1] mb-2 flex items-baseline justify-start">
                <CountUpNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="font-body font-medium text-[14px] text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3 leading-[1]">
                {stat.title}
              </div>
              <div className="font-body font-normal text-[12px] text-[var(--text-muted)] leading-[1.7] tracking-wider">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
      <br />
      <br />
    </section>
  );
}
