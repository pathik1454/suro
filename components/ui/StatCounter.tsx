'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function StatCounter({ value, duration = 1600, suffix = '', prefix = '' }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startTime: number | null = null;
    let animationFrame: number;
    let hasAnimated = false;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // easeOutExpo
      const easeProgress = progress === duration ? 1 : 1 - Math.pow(2, -10 * progress / duration);
      
      const currentCount = Math.min(Math.round(easeProgress * value), value);
      setCount(currentCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animationFrame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}
