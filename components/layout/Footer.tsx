'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function Footer() {
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    lenis?.scrollTo(id, { offset: -68 });
  };

  const quickLinks = [
    { label: 'About Us', id: '#about' },
    { label: 'Our Range', id: '#range' },
    { label: 'Services', id: '#services' },
    { label: 'The Process', id: '#process' },
    { label: 'Certifications', id: '#certifications' },
    { label: 'Commission', id: '#contact' }
  ];

  return (
    <footer className="bg-[var(--bg-void)] relative z-10 pt-16">

      {/* Top Border Gradient Line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px] rounded-none"
        style={{
          background: 'linear-gradient(to right, transparent, var(--gold) 30%, var(--gold) 70%, transparent)',
          borderRadius: '0px !important'
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16">

          {/* Column 1 - Brand Info */}
          <div className="flex flex-col">
            <span className="block font-display font-medium text-[1.3rem] text-[var(--text-primary)] tracking-[0.25em] uppercase mb-[1.5rem]">
              SURENDRA &amp; CO.
            </span>

            <p className="font-body font-normal text-[13px] leading-[1.9] text-[var(--text-secondary)] max-w-[280px]">
              Precision-built coaches for India&apos;s roads. Est. 1984.
            </p>


          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-mono font-medium text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-[1.5rem]">
              QUICK LINKS
            </h4>
            <div className="flex flex-col">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.id}
                  onClick={(e) => handleScroll(e, link.id)}
                  className="font-body font-normal text-[13px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors mt-2.5 w-fit tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 - Get In Touch */}
          <div className="flex flex-col">
            <h4 className="font-mono font-medium text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-[1.5rem]">
              GET IN TOUCH
            </h4>
            <div className="flex flex-col gap-3 mt-3">
              <a
                href="tel:+919825039111"
                className="flex items-center gap-2.5 font-body font-normal text-[13px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors w-fit group tracking-wider"
              >
                <Phone size={16} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors" />
                +91 98250 39111
              </a>
              <a
                href="mailto:surendra_bareja@yahoo.com"
                className="flex items-center gap-2.5 font-body font-normal text-[13px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors w-fit group tracking-wider"
              >
                <Mail size={16} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors" />
                surendra_bareja@yahoo.com
              </a>
            </div>
          </div>

          {/* Column 4 - Location */}
          <div className="flex flex-col">
            <h4 className="font-mono font-medium text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-[1.5rem]">
              FIND US
            </h4>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Surendra+%26+Co+NH+8+Bareja+Ahmedabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 font-body font-normal text-[13px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors group mt-3 leading-[1.9] tracking-wider"
            >
              <MapPin size={16} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors mt-1 shrink-0" />
              <span>
                N. H. No. 8, Near APMC Market,<br />
                Bareja &ndash; 382425, Taluka Daskroi,<br />
                District Ahmedabad
              </span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-subtle)] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-body font-normal text-[11px] text-[var(--text-muted)] tracking-wider">
            &copy; 2026 Surendra &amp; Co. All rights reserved.
          </div>

          <div className="font-display text-[15px] italic font-light text-[var(--steel-silver)]">
            Built Without Compromise
          </div>

          <div className="flex items-center gap-4 font-body font-normal text-[11px] text-[var(--text-muted)] tracking-wider">
            <a href="#" className="hover:text-[var(--gold)] transition-colors">Privacy Policy</a>
            <span>&middot;</span>
            <a href="#" className="hover:text-[var(--gold)] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
