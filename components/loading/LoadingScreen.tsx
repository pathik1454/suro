'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createFrameLoader } from '@/lib/frameLoader';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Only run on client
    const loader = createFrameLoader();
    
    loader.onEachPriorityFrame((loaded, total) => {
      const pct = (loaded / total) * 100;
      setProgress(pct);
    });

    loader.onPriorityComplete(() => {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500); // Wait for fade out animation
    });
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[var(--bg-void)] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="w-[64px] h-[64px] rounded-xl border border-[var(--border-gold)] bg-[var(--gold)]/5 flex items-center justify-center mb-6">
          <Image src="/Logo.png" alt="Logo" width={40} height={40} className="object-contain" priority />
        </div>

        {/* Brand */}
        <h1 className="font-display font-bold text-[28px] text-[var(--text-primary)] tracking-[0.15em] mb-1">
          SURENDRA & CO.
        </h1>
        <p className="font-body font-normal text-[12px] text-[var(--text-muted)] tracking-widest mb-12 uppercase">
          Coach Body Builders · Est. 2000
        </p>

        {/* Spinner */}
        <div className="w-[40px] h-[40px] rounded-full border-2 border-[var(--border-gold)] border-t-[var(--gold)] animate-spin mb-8" />

        {/* Progress */}
        <p className="font-body text-[12px] text-[var(--text-muted)] mb-3">
          Preparing your experience
        </p>
        <div className="w-[200px] sm:w-[320px] h-[2px] bg-[var(--border-subtle)] overflow-hidden rounded-full">
          <div 
            className="h-full bg-[var(--gold)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
