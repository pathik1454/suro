"use client";

import React, { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PhasePanel from "./PhasePanel";
import PhaseIndicator from "./PhaseIndicator";
import { PHASE_DATA } from "../../lib/phaseData";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 732;
const PHASE_BOUNDARIES = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

function getCurrentPhase(progress: number): number {
  for (let i = 0; i < 5; i++) {
    if (progress >= PHASE_BOUNDARIES[i] && progress < PHASE_BOUNDARIES[i + 1]) {
      return i + 1;
    }
  }
  return 5;
}

interface DesktopAssemblyProps {
  drawFrame: (index: number) => void;
}

export default function DesktopAssembly({ drawFrame }: DesktopAssemblyProps) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState(1);
  const currentPhaseRef = useRef(1);
  const panelRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));

  const setPanelRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      panelRefs.current[index] = el;
    },
    []
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate in phase 1 panel immediately
      const firstPanel = panelRefs.current[0];
      if (firstPanel) {
        gsap.fromTo(
          firstPanel,
          { x: 500, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power2.out" }
        );
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          // Update canvas frame
          const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
          drawFrame(frameIndex);

          // Detect phase change
          const phase = getCurrentPhase(progress);
          if (phase !== currentPhaseRef.current) {
            // Kill ALL in-flight tweens on every panel
            panelRefs.current.forEach((panel) => {
              if (panel) gsap.killTweensOf(panel);
            });

            // Instantly hide ALL panels except the incoming one
            panelRefs.current.forEach((panel, i) => {
              if (panel && i !== phase - 1) {
                gsap.set(panel, { x: 500, opacity: 0 });
              }
            });

            // Animate in only the active phase panel
            const newPanel = panelRefs.current[phase - 1];
            if (newPanel) {
              gsap.fromTo(
                newPanel,
                { x: 500, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
              );
            }

            currentPhaseRef.current = phase;
            setCurrentPhase(phase);
          }
        },
      });
    },
    { scope: sectionRef, dependencies: [drawFrame] }
  );

  return (
    <div
      id="assembly-section"
      ref={sectionRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Phase panels — right aligned (phases 1–4), centered (phase 5) */}
        {PHASE_DATA.map((phase, i) => {
          const isFinale = i === 4;
          return (
            <div
              key={phase.number}
              ref={setPanelRef(i)}
              className="absolute"
              style={{
                top: "50%",
                transform: isFinale
                  ? "translate(-50%, -50%)"
                  : "translateY(-50%)",
                left: isFinale ? "50%" : "auto",
                right: isFinale ? "auto" : "5vw",
                width: isFinale
                  ? "min(580px, 92vw)"
                  : "min(420px, 90vw)",
                opacity: 0,
                zIndex: 10,
              }}
            >
              <PhasePanel phase={phase} isFinale={isFinale} />
            </div>
          );
        })}

        {/* Phase indicator HUD */}
        <PhaseIndicator currentPhase={currentPhase} />
      </div>
    </div>
  );
}
