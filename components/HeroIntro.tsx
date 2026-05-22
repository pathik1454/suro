"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;
    gsap.to(contentRef.current, {
      scale: 1.3,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="h-[100vh] flex flex-col items-center justify-center relative"
    >
      {/* Main content */}
      <div ref={contentRef} className="flex flex-col items-center text-center px-4">
        <p
          className="font-barlow font-semibold text-[#C8851A] text-[13px] md:text-[14px] tracking-[0.6em] uppercase mb-6"
          style={{ textShadow: "0 0 20px rgba(200,133,26,0.5)" }}
        >
          Master Coachbuilders
        </p>

        <h1
          className="font-barlow font-black leading-none tracking-tighter mix-blend-overlay"
          style={{
            fontSize: "clamp(64px, 10vw, 120px)",
            color: "rgba(237,232,223,0.85)",
            textShadow: "0 4px 60px rgba(13,26,36,0.9)",
          }}
        >
          CRAFTED<span style={{ color: "#C8851A" }}>.</span>
        </h1>

        <p className="font-body font-light text-[18px] text-[#8A9BAB] mt-4">
          From bare steel to the road.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="font-mono text-[10px] text-[#556A7A] tracking-[0.3em] uppercase">
          Scroll to Build
        </p>
        <div
          className="w-[1px] h-10 scroll-line-animate"
          style={{ background: "linear-gradient(to bottom, #C8851A, transparent)" }}
        />
      </div>
    </section>
  );
}
