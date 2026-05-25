'use client';

export default function MarqueeStrip() {
  const phrases = [
    "AIS 052 Compliant.",
    "Volvo Certified.",
    "500+ Coaches.",
    "Est. 1984."
  ];

  // Duplicate items to ensure smooth infinite loop
  const items = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <div className="w-full bg-[var(--color-blue)] py-5 overflow-hidden select-none relative z-10 flex items-center border-t border-b border-[rgba(255,255,255,0.10)]">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-8">
            <span className="font-display font-medium text-[1.4rem] tracking-[0.05em] uppercase text-white">
              {phrase}
            </span>
            <div
              className="w-[6px] h-[6px] bg-white opacity-30 shrink-0"
              style={{ borderRadius: '50% !important' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
