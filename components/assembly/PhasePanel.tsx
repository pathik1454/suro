"use client";

import React, { forwardRef } from "react";
import { PhaseContent } from "../../lib/phaseData";

interface PhasePanelProps {
  phase: PhaseContent;
  isFinale?: boolean;
}

const PhasePanel = forwardRef<HTMLDivElement, PhasePanelProps>(
  ({ phase, isFinale = false }, ref) => {
    return (
      <div
        ref={ref}
        className="glass-card-strong p-7 md:p-8 flex flex-col gap-4"
        style={{
          borderTop: `3px solid ${phase.accentColor}`,
          maxWidth: isFinale ? "580px" : "420px",
          boxShadow: isFinale
            ? `0 0 80px rgba(200,133,26,0.12), 0 0 40px rgba(200,133,26,0.08)`
            : undefined,
        }}
      >
        {/* Phase number + title */}
        <div className="flex items-start gap-4">
          <span
            className="font-barlow font-black text-[72px] leading-none select-none"
            style={{ color: `${phase.accentColor}20` }}
          >
            {phase.number}
          </span>
          <div className="pt-2">
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1"
              style={{ color: phase.accentColor }}
            >
              Phase {phase.phase}
            </p>
            <h3
              className="font-barlow font-bold text-[#EDE8DF] leading-tight"
              style={{ fontSize: isFinale ? "32px" : "26px" }}
            >
              {phase.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-[14px] text-[#8A9BAB] leading-relaxed">
          {phase.description}
        </p>

        {/* Divider */}
        {phase.specs.length > 0 && (
          <hr style={{ borderColor: "rgba(200,133,26,0.15)" }} />
        )}

        {/* Spec grid */}
        {phase.specs.length > 0 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {phase.specs.map((spec) => (
              <div key={spec.label}>
                <p className="font-mono text-[10px] text-[#556A7A] tracking-[0.2em] uppercase">
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
        {isFinale && (
          <button
            onClick={() =>
              document.querySelector("#contact-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-2 w-full py-3 rounded-xl font-barlow font-bold text-[#0D1A24] text-[18px] tracking-wide cursor-pointer transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: "#C8851A" }}
          >
            Commission Yours
          </button>
        )}
      </div>
    );
  }
);

PhasePanel.displayName = "PhasePanel";
export default PhasePanel;
