import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-void)] relative z-10 pt-16">
      {/* Top Golden Line */}
      <div 
        className="absolute top-0 left-0 w-full h-[1px]" 
        style={{ background: 'linear-gradient(to right, transparent, var(--gold) 30%, var(--gold) 70%, transparent)' }} 
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-[10px] border border-[var(--border-gold)] bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                <Image src="/Logo.png" alt="Surendra & Co." width={24} height={24} className="object-contain" />
              </div>
              <div>
                <div className="font-body font-semibold text-[14px] text-[var(--text-primary)] tracking-widest">
                  SURENDRA & CO.
                </div>
                <div className="font-mono text-[10px] text-[var(--text-gold)] tracking-widest uppercase">
                  Coach Body Builders
                </div>
              </div>
            </div>
            <p className="font-body text-[13px] text-[var(--text-secondary)] leading-relaxed mt-2 max-w-[240px]">
              Precision-built coaches for India&apos;s roads. Est. 2009.
            </p>
            <div className="mt-2 flex flex-col gap-1">
              <div className="font-body text-[12px] text-[var(--text-muted)]">
                Proprietor
              </div>
              <div className="font-body font-medium text-[13px] text-[var(--text-secondary)]">
                MR Shrikant Sharma
              </div>
            </div>
          </div>

          {/* Column 2 - Pages */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-[11px] text-[var(--text-muted)] tracking-wider uppercase mb-2">
              Quick Links
            </h4>
            {[
              { label: 'About Us', href: '#about' },
              { label: 'Our Range', href: '#range' },
              { label: 'Services', href: '#services' },
              { label: 'The Process', href: '#process' },
              { label: 'Certifications', href: '#certifications' },
              { label: 'Commission', href: '#commission' },
            ].map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="font-body text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3 - Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-[11px] text-[var(--text-muted)] tracking-wider uppercase mb-2">
              Get In Touch
            </h4>
            <a href="tel:+919825039111" className="flex items-center gap-3 font-body text-[13px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors w-fit group">
              <Phone size={16} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors" />
              +91 98250 39111
            </a>
            <a href="mailto:surendra_bareja@yahoo.com" className="flex items-center gap-3 font-body text-[13px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors w-fit group break-all">
              <Mail size={16} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors shrink-0" />
              surendra_bareja@yahoo.com
            </a>
          </div>

          {/* Column 4 - Location */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-[11px] text-[var(--text-muted)] tracking-wider uppercase mb-2">
              Find Us
            </h4>
            <a 
              href="https://www.google.com/maps/search/Surendra+%26+Co+NH+8+Bareja+Ahmedabad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-3 font-body text-[13px] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors group"
            >
              <MapPin size={16} className="text-[var(--steel-silver)] group-hover:text-[var(--gold)] transition-colors shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                N. H. No. 8, Near APMC Market,<br />
                Bareja – 382425,<br />
                Taluka Daskroi, District Ahmedabad
              </span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-subtle)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-body text-[12px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} Surendra & Co. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-body text-[12px] text-[var(--text-muted)]">
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
