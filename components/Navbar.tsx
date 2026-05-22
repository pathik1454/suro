"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Our Work", href: "#assembly-section" },
  { label: "Range",    href: "#our-range"        },
  { label: "Process",  href: "#the-making"       },
  { label: "Contact",  href: "#contact-section"  },
];

function smoothScrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [drawerOpen,  setDrawerOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setDrawerOpen(false);
    smoothScrollTo(href);
  };

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 flex items-center justify-between transition-all duration-300"
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: scrolled
            ? "rgba(21,32,48,0.92)"
            : "linear-gradient(to bottom, rgba(13,26,36,0.85), transparent)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,133,26,0.15)" : "none",
        }}
      >
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
            <Image src="/Logo.png" alt="Surendra & Co." width={36} height={36} className="object-contain" />
          </div>
          <span className="hidden md:block font-barlow font-semibold text-[#EDE8DF] text-[15px] tracking-wider">
            SURENDRA &amp; CO.
          </span>
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLink(link.href)}
              className="font-body text-[13px] font-medium text-[#8A9BAB] hover:text-[#C8851A] transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLink("#contact-section")}
            className="px-5 py-2 rounded-full border border-[#C8851A] bg-[rgba(200,133,26,0.10)] font-body text-[13px] font-medium text-[#C8851A] hover:bg-[rgba(200,133,26,0.20)] hover:border-[rgba(200,133,26,0.6)] transition-all duration-200 cursor-pointer tracking-wide"
          >
            START YOUR BUILD
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#EDE8DF] p-1 cursor-pointer"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer panel */}
          <div className="fixed top-0 right-0 bottom-0 z-[61] w-[280px] bg-[#152030] flex flex-col shadow-2xl">
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(200,133,26,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Image src="/Logo.png" alt="Surendra & Co." width={28} height={28} className="object-contain" />
                </div>
                <span className="font-barlow font-semibold text-[#EDE8DF] text-sm tracking-wider">
                  SURENDRA &amp; CO.
                </span>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="text-[#8A9BAB] cursor-pointer" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLink(link.href)}
                  className="h-14 px-6 text-left font-barlow font-semibold text-xl text-[#EDE8DF] hover:text-[#C8851A] transition-colors cursor-pointer"
                  style={{ borderBottom: "1px solid rgba(200,133,26,0.10)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="p-6">
              <button
                onClick={() => handleLink("#contact-section")}
                className="w-full py-4 rounded-xl bg-[#C8851A] font-barlow font-bold text-[#0D1A24] text-lg tracking-wide hover:bg-[#E8A832] transition-colors cursor-pointer"
              >
                START YOUR BUILD
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
