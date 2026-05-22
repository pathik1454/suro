import { useEffect } from 'react';
import gsap from 'gsap';

export interface AnimationOptions {
  threshold?: number;
  yOffset?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}

export function useScrollReveal(selector: string, options?: AnimationOptions) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, y: options?.yOffset ?? 24 },
            { 
              opacity: 1, 
              y: 0, 
              duration: options?.duration ?? 0.7, 
              ease: 'power2.out',
              delay: options?.delay ?? 0
            }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: options?.threshold ?? 0.15 });

    elements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [selector, options]);
}
