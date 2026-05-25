import { useEffect } from 'react';

export function useScrollReveal(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('reveal-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl.classList.contains('reveal-visible')) {
        htmlEl.classList.add('reveal-init');
      }
      observer.observe(htmlEl);
    });

    return () => observer.disconnect();
  }, [selector]);
}
