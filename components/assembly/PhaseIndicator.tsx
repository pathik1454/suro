"use client";

import React from "react";

interface PhaseIndicatorProps {
  currentPhase: number; // 1–5
}

const PHASES = ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"];

export default function PhaseIndicator({ currentPhase }: PhaseIndicatorProps) {
  return (
    <div
      className="hidden md:flex absolute top-1/2 right-6 -translate-y-1/2 flex-col items-end gap-0 z-20"
      aria-label="Assembly phase indicator"
    >
      {PHASES.map((label, i) => {
        const phase = i + 1;
        const isActive = phase === currentPhase;
        return (
          <div key={label} className="flex flex-col items-center gap-0">
            <div className="flex items-center gap-2.5">
              {/* Label — only shown when active */}
              <span
                className="font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  color: isActive ? "#C8851A" : "transparent",
                  opacity: isActive ? 1 : 0,
                }}
              >
                {label}
              </span>

              {/* Dot */}
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "8px" : "6px",
                  height: isActive ? "8px" : "6px",
                  backgroundColor: isActive ? "#C8851A" : "transparent",
                  border: isActive ? "none" : "1px solid rgba(200,133,26,0.25)",
                  boxShadow: isActive ? "0 0 8px rgba(200,133,26,0.6)" : "none",
                }}
              />
            </div>

            {/* Connecting line between dots */}
            {i < PHASES.length - 1 && (
              <div
                className="w-[1px] h-5 ml-auto"
                style={{ backgroundColor: "rgba(200,133,26,0.15)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
