"use client";

import React, { useState, useRef, useEffect } from "react";
import { PHASE_DATA } from "../../lib/phaseData";

// 5 dot phase nav
function MobilePhaseNav({
  currentPhase,
  onSelect,
}: {
  currentPhase: number;
  onSelect: (phase: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      {PHASE_DATA.map((_, i) => {
        const phase = i + 1;
        const isActive = phase === currentPhase;
        return (
          <button
            key={phase}
            onClick={() => onSelect(phase)}
            aria-label={`Phase ${phase}`}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? "12px" : "8px",
                height: isActive ? "12px" : "8px",
                backgroundColor: isActive ? "#C8851A" : "transparent",
                border: isActive ? "none" : "1px solid rgba(200,133,26,0.35)",
                boxShadow: isActive ? "0 0 8px rgba(200,133,26,0.6)" : "none",
              }}
            />
            <span
              className="font-mono text-[9px] tracking-widest"
              style={{ color: isActive ? "#C8851A" : "#556A7A" }}
            >
              {phase}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function MobileAssembly() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [prevPhase, setPrevPhase] = useState(1);
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));

  // Observe which phase is in view using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    phaseRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const newPhase = i + 1;
            if (newPhase !== currentPhase) {
              setPrevPhase(currentPhase);
              setFading(true);
              setTimeout(() => setFading(false), 400);
            }
            setCurrentPhase(newPhase);
          }
        },
        { threshold: 0.55 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToPhase = (phase: number) => {
    const el = phaseRefs.current[phase - 1];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      id="assembly-section"
      className="relative"
      style={{
        scrollSnapType: "y mandatory",
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      {/* Sticky phase nav at the very top within the scroll container */}
      <div
        className="sticky top-0 z-30 w-full py-3 px-4"
        style={{ background: "rgba(13,26,36,0.8)", backdropFilter: "blur(8px)" }}
      >
        <MobilePhaseNav currentPhase={currentPhase} onSelect={scrollToPhase} />
      </div>

      {PHASE_DATA.map((phase, i) => (
        <div
          key={phase.number}
          ref={(el) => { phaseRefs.current[i] = el; }}
          className="relative flex flex-col justify-end"
          style={{
            scrollSnapAlign: "start",
            height: "calc(100vh - 52px)", // subtract nav height
            minHeight: "calc(100vh - 52px)",
          }}
        >
          {/* Background key frame */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${phase.mobileFrameSrc})` }}
          />

          {/* Dark gradient overlay — bottom 60% */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,26,36,0.97) 0%, rgba(13,26,36,0.80) 45%, rgba(13,26,36,0.15) 70%, transparent 100%)",
            }}
          />

          {/* Content card — bottom 45% */}
          <div className="relative z-10 px-5 pb-8 pt-6">
            {/* Phase header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-[2px] rounded-full"
                style={{ backgroundColor: phase.accentColor }}
              />
              <p
                className="font-mono text-[11px] tracking-[0.3em] uppercase"
                style={{ color: phase.accentColor }}
              >
                {phase.number} · {phase.title}
              </p>
            </div>

            {/* Description */}
            <p className="font-body text-[14px] text-[#8A9BAB] leading-relaxed mb-5">
              {phase.description}
            </p>

            {/* Spec grid — 2 columns */}
            {phase.specs.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {phase.specs.slice(0, 4).map((spec) => (
                  <div
                    key={spec.label}
                    className="glass-card px-3 py-2.5"
                    style={{ borderRadius: "10px" }}
                  >
                    <p className="font-mono text-[9px] text-[#556A7A] tracking-[0.2em] uppercase">
                      {spec.label}
                    </p>
                    <p
                      className="font-mono text-[12px] font-medium mt-0.5"
                      style={{ color: phase.accentColor }}
                    >
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Finale CTA */}
            {i === 4 && (
              <button
                onClick={() =>
                  document
                    .querySelector("#contact-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full py-3.5 rounded-xl font-barlow font-bold text-[#0D1A24] text-lg tracking-wide cursor-pointer"
                style={{ backgroundColor: "#C8851A" }}
              >
                Commission Yours
              </button>
            )}

            {/* Swipe hint */}
            {i < 4 && (
              <p className="text-center font-mono text-[10px] text-[#556A7A] tracking-[0.2em] uppercase mt-3">
                ↓ Swipe to next phase
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
