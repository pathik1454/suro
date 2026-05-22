"use client";

import React from "react";
import Image from "next/image";

interface LoadingScreenProps {
  progress: number; // 0–100
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D1A24]">
      {/* Logo + Brand */}
      <div className="flex items-center gap-4 mb-14">
        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
          <Image
            src="/Logo.png"
            alt="Surendra & Co."
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
        <div>
          <p className="font-barlow font-semibold text-[#EDE8DF] text-lg tracking-widest leading-tight">
            SURENDRA &amp; CO.
          </p>
          <p className="font-mono text-[#C8851A]/60 text-[10px] tracking-[0.3em] uppercase mt-0.5">
            Coach Body Builders
          </p>
        </div>
      </div>

      {/* Spinner */}
      <div className="w-12 h-12 rounded-full border-2 border-[#C8851A]/20 border-t-[#C8851A] animate-spin mb-8" />

      {/* Label */}
      <p className="font-mono text-[#C8851A]/60 text-[11px] tracking-[0.4em] uppercase mb-5">
        Assembling Your Experience
      </p>

      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-[#C8851A]/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C8851A] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="font-mono text-[#556A7A] text-[10px] mt-2 tracking-widest">
        {Math.round(Math.min(progress, 100))}%
      </p>
    </div>
  );
}
