'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';

const NAV_LINKS = [
  { label: 'Our Work', id: 'our-work' },
  { label: 'About', id: 'about' },
  { label: 'Range', id: 'range' },
  { label: 'Services', id: 'services' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      // Transition past canvas area (roughly 100vh or when scrolled > 300px)
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'hero') {
      lenis?.scrollTo(0);
    } else {
      lenis?.scrollTo(`#${id}`, { offset: -68 });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-[400ms] ease-out"
        style={{
          height: '80px',
          background: isScrolled
            ? 'var(--bg-surface)'
            : 'linear-gradient(to bottom, rgba(9,15,24,0.90) 0%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid var(--border-gold)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          {/* LEFT: Brand with Logo Box */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 text-left cursor-pointer focus:outline-none"
          >
            <div 
              className="w-[42px] h-[42px] bg-[rgba(212,132,26,0.08)] border border-[var(--border-gold)] rounded-10 flex items-center justify-center shrink-0"
              style={{ borderRadius: '10px !important' }}
            >
              <span className="font-display font-bold text-[1.2rem] text-[var(--gold)]">S</span>
            </div>
            <span className="hidden md:block font-body font-semibold text-[14px] text-[var(--text-primary)] tracking-[0.15em] uppercase">
              SURENDRA &amp; CO.
            </span>
          </button>

          {/* CENTER: Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="nav-link-hover font-body font-medium text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer tracking-wider uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* RIGHT: CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded-pill hidden lg:block border border-[var(--border-gold)] bg-[rgba(212,132,26,0.10)] text-[var(--gold)] font-body font-semibold text-[12px] tracking-wider px-5 py-2.5 hover:bg-[rgba(212,132,26,0.22)] hover:border-[var(--border-gold-h)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              style={{ borderRadius: '9999px !important' }}
            >
              START YOUR BUILD
            </button>

            <button
              className="lg:hidden text-[#EEF0F7] p-2 cursor-pointer focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Full-screen Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0B0C14] transition-opacity duration-300 lg:hidden flex flex-col justify-center items-center ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close Button on Mobile Overlay */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#EEF0F7] hover:text-[#8B96B0] p-2 cursor-pointer focus:outline-none"
            aria-label="Close navigation menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* Overlay Navigation Links */}
        <div className="flex flex-col gap-8 items-center justify-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-display font-medium text-[1.5rem] text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          <div className="h-[1px] w-[180px] bg-[var(--border-subtle)] my-4" />

          {/* Pill CTA button in Mobile Overlay */}
          <button
            onClick={() => scrollToSection('contact')}
            className="rounded-pill border border-[var(--border-gold)] bg-[rgba(212,132,26,0.10)] text-[var(--gold)] font-body font-semibold text-[13px] tracking-wider px-8 py-3.5 hover:bg-[rgba(212,132,26,0.22)] hover:border-[var(--border-gold-h)] transition-all duration-300 cursor-pointer"
            style={{ borderRadius: '9999px !important' }}
          >
            START YOUR BUILD
          </button>
        </div>
      </div>
    </>
  );
}
