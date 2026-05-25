'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ScrollTrigger.clearScrollMemory();
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      <LenisSync />
      {children}
    </ReactLenis>
  );
}
