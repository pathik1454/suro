'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Our Work', id: 'assembly' },
  { label: 'About', id: 'about' },
  { label: 'Range', id: 'range' },
  { label: 'Services', id: 'services' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'commission' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-in-out ${
          isScrolled
            ? 'bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-gold)] h-[72px]'
            : 'bg-gradient-to-b from-[#090F18]/90 to-transparent h-[80px] border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-[10px] border border-[var(--border-gold)] bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
              <Image src="/Logo.png" alt="Surendra & Co." width={24} height={24} className="object-contain" />
            </div>
            <div className="hidden md:block font-body font-semibold text-[14px] text-[var(--text-primary)] tracking-widest">
              SURENDRA & CO.
            </div>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className="font-body font-medium text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative group transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('commission')}
              className="hidden sm:block border border-[var(--border-gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-body font-semibold text-[12px] tracking-wider px-5 py-2.5 rounded-full hover:bg-[var(--gold)]/20 hover:border-[rgba(212,132,26,0.55)] transition-all hover:scale-[1.02]"
            >
              START YOUR BUILD
            </button>
            
            <button 
              className="lg:hidden text-[var(--text-primary)] p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-[60] bg-[var(--bg-void)]/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 bottom-0 w-[300px] bg-[var(--bg-surface)] border-l border-[var(--border-subtle)] transition-transform duration-300 ease-out flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-6 px-8 mt-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className="text-left font-display font-medium text-2xl text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors"
              >
                {link.label}
              </button>
            ))}
            
            <div className="h-[1px] w-full bg-[var(--border-subtle)] my-4" />
            
            <button
              onClick={() => scrollToSection('commission')}
              className="border border-[var(--border-gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-body font-semibold text-[13px] tracking-wider px-5 py-3 rounded text-center hover:bg-[var(--gold)]/20 transition-all"
            >
              START YOUR BUILD
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
