'use client';

import { useEffect, useState, useRef } from 'react';
import { createFrameLoader } from '@/lib/frameLoader';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const loaderInitialized = useRef(false);

  useEffect(() => {
    if (loaderInitialized.current) return;
    loaderInitialized.current = true;

    const loader = createFrameLoader();

    loader.onEachPriorityFrame((loaded: number, total: number) => {
      const pct = total > 0 ? (loaded / total) * 100 : 0;
      setProgress(pct);
    });

    loader.onPriorityComplete(() => {
      // 500ms exit transition
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    });
  }, []);

  // Terminate DOM node after transition finishes
  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[var(--bg-void)] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="flex flex-col items-center text-center">
        {/* Logo Box */}
        <div 
          className="w-[42px] h-[42px] bg-[rgba(212,132,26,0.08)] border border-[var(--border-gold)] rounded-10 flex items-center justify-center mb-6"
          style={{ borderRadius: '10px !important' }}
        >
          <span className="font-display font-bold text-[1.4rem] text-[var(--gold)]">S</span>
        </div>

        {/* Brand Header */}
        <h1
          className="font-display font-bold text-[28px] text-[var(--text-primary)] tracking-[0.15em] uppercase leading-[1.2]"
        >
          SURENDRA &amp; CO.
        </h1>
        <p className="font-body font-normal text-[12px] text-[var(--text-muted)] tracking-widest uppercase mt-[8px] leading-[1]">
          Coach Body Builders
        </p>

        {/* 40px gap */}
        <div className="h-[40px]" />

        {/* Spinner */}
        <div
          className="w-[40px] h-[40px] border-2 border-[var(--border-gold)] border-t-[var(--gold)] animate-spin-loader"
          style={{ borderRadius: '50% !important' }}
        />

        {/* 24px gap */}
        <div className="h-[24px]" />

        {/* Label */}
        <p className="font-body font-normal text-[12px] text-[var(--text-muted)] uppercase tracking-widest leading-[1]">
          Preparing your experience
        </p>

        {/* 16px gap */}
        <div className="h-[16px]" />

        {/* Progress bar: 320px x 2px */}
        <div 
          className="w-[320px] h-[2px] bg-[var(--border-subtle)] overflow-hidden"
          style={{ borderRadius: '0px !important' }}
        >
          <div
            className="h-full bg-[var(--gold)] transition-all duration-300 ease-out"
            style={{ 
              width: `${Math.min(progress, 100)}%`,
              borderRadius: '0px !important'
            }}
          />
        </div>
      </div>
    </div>
  );
}
