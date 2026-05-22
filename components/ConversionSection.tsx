"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const COACH_OPTIONS = [
  "Luxury Sleeper Coach",
  "Semi-Sleeper Coach",
  "Seater Coach",
  "School / Institutional Bus",
  "Other / Custom",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ConversionSection() {
  const [formData, setFormData] = useState({
    fullName:  "",
    email:     "",
    company:   "",
    phone:     "",
    coachType: "",
    message:   "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setFormData({ fullName: "", email: "", company: "", phone: "", coachType: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit. Please try again.";
      setStatus("error");
      setErrorMessage(msg);
    }
  };

  return (
    <>
      {/* ══════════════════════════════════════════
          COMMISSION / CONTACT
          ══════════════════════════════════════════ */}
      <section
        id="contact-section"
        className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundColor: "#0D1A24" }}
      >
        {/* Ambient orbs */}
        <div
          className="absolute top-[15%] right-[8%] w-[600px] h-[600px] rounded-full pointer-events-none orb-animate"
          style={{ background: "rgba(200,133,26,0.06)", filter: "blur(160px)" }}
        />
        <div
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none orb-animate-reverse"
          style={{ background: "rgba(58,127,191,0.05)", filter: "blur(140px)" }}
        />

        <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* ── Left column ── */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[11px] text-[#C8851A] tracking-[0.4em] uppercase mb-5">
              Commission
            </p>
            <h2
              className="font-barlow font-black text-[#EDE8DF] leading-[0.9] mb-6"
              style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
            >
              Start Your
              <br />
              <span className="text-gradient-amber">Build.</span>
            </h2>
            <p className="font-body text-[16px] text-[#8A9BAB] leading-relaxed mb-10 max-w-md">
              25 years of building coaches for India&apos;s roads. Every vehicle is
              commissioned individually — no assembly lines, no stock units. Tell us
              what you need.
            </p>

            {/* Trust bullets */}
            <ul className="flex flex-col gap-3 mb-10">
              {[
                "Custom-Built to Specification",
                "AIS 052 Fully Compliant",
                "Volvo-Certified Chassis",
                "Pan-India Delivery",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <ArrowRight size={14} className="text-[#C8851A] shrink-0" />
                  <span className="font-body text-[14px] text-[#8A9BAB]">{item}</span>
                </li>
              ))}
            </ul>

            {/* Direct contact details */}
            <div
              className="flex flex-col gap-4 pt-8"
              style={{ borderTop: "1px solid rgba(200,133,26,0.15)" }}
            >
              <p className="font-mono text-[10px] text-[#556A7A] tracking-[0.3em] uppercase">
                Contact Us Directly
              </p>
              <a
                href="tel:+919825039111"
                className="flex items-center gap-3 font-body text-[14px] text-[#8A9BAB] hover:text-[#C8851A] transition-colors duration-200 group"
              >
                <Phone size={15} className="text-[#C8851A] shrink-0" />
                +91 98250 39111
              </a>
              <a
                href="mailto:surendra_bareja@yahoo.com"
                className="flex items-center gap-3 font-body text-[14px] text-[#8A9BAB] hover:text-[#C8851A] transition-colors duration-200"
              >
                <Mail size={15} className="text-[#C8851A] shrink-0" />
                surendra_bareja@yahoo.com
              </a>
              <p className="flex items-start gap-3 font-body text-[14px] text-[#8A9BAB]">
                <MapPin size={15} className="text-[#C8851A] shrink-0 mt-0.5" />
                NH-8, Near APMC Market, Bareja – 382425, Ahmedabad
              </p>
            </div>
          </div>

          {/* ── Right column: Form ── */}
          <div className="glass-card-strong p-8 md:p-10">
            <form onSubmit={onSubmit} className="space-y-7">
              {/* Full Name */}
              <div className="floating-field">
                <input id="fullName" name="fullName" type="text" required placeholder=" "
                  value={formData.fullName} onChange={handleChange} autoComplete="name" />
                <label htmlFor="fullName">Full Name</label>
              </div>

              {/* Work Email */}
              <div className="floating-field">
                <input id="email" name="email" type="email" required placeholder=" "
                  value={formData.email} onChange={handleChange} autoComplete="email" />
                <label htmlFor="email">Work Email</label>
              </div>

              {/* Company */}
              <div className="floating-field">
                <input id="company" name="company" type="text" required placeholder=" "
                  value={formData.company} onChange={handleChange} autoComplete="organization" />
                <label htmlFor="company">Company / Organisation</label>
              </div>

              {/* Phone */}
              <div className="floating-field">
                <input id="phone" name="phone" type="tel" placeholder=" "
                  value={formData.phone} onChange={handleChange} autoComplete="tel" />
                <label htmlFor="phone">Phone Number</label>
              </div>

              {/* Coach Type */}
              <div className="floating-field">
                <select
                  id="coachType"
                  name="coachType"
                  value={formData.coachType}
                  onChange={handleChange}
                  className={formData.coachType ? "has-value" : ""}
                >
                  <option value="" disabled hidden />
                  {COACH_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <label htmlFor="coachType">Coach Type Interested In</label>
              </div>

              {/* Requirements */}
              <div className="floating-field">
                <textarea id="message" name="message" required rows={4} placeholder=" "
                  value={formData.message} onChange={handleChange} className="resize-none" />
                <label htmlFor="message">Requirements</label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="submit-consultation"
                disabled={status === "loading" || status === "success"}
                className="w-full font-barlow font-bold text-[18px] text-[#0D1A24] py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                style={{ backgroundColor: "#C8851A", height: "64px" }}
                onMouseEnter={(e) => {
                  if (status === "idle")
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E8A832";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C8851A";
                }}
              >
                {status === "idle"    && <><span>Request Consultation</span><Send className="w-4 h-4" /></>}
                {status === "loading" && <div className="loading-spinner" />}
                {status === "success" && <><span>Message Sent</span><CheckCircle className="w-4 h-4" /></>}
                {status === "error"   && <span>Try Again</span>}
              </button>

              {/* Status messages */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm mt-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>We&apos;ll reach out within 1 business day.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════ */}
      <footer
        className="relative w-full py-16 md:py-20 overflow-hidden"
        style={{ backgroundColor: "#060810" }}
      >
        {/* Top amber gradient line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
          style={{
            background: "linear-gradient(to right, transparent, rgba(200,133,26,0.35), transparent)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[180px] rounded-full pointer-events-none"
          style={{ background: "rgba(200,133,26,0.04)", filter: "blur(100px)" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-14 relative z-10">

          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-sm">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm shadow-lg hover:scale-105 transition-transform duration-500">
                <Image src="/Logo.png" alt="Surendra & Co. Logo" fill className="object-contain p-2.5" />
              </div>
              <div>
                <h3 className="font-barlow font-bold text-xl text-gradient-amber tracking-wider">
                  SURENDRA &amp; CO.
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Briefcase size={11} className="text-[#C8851A]/60" />
                  <p className="font-mono text-[#C8851A]/60 text-[10px] tracking-[0.2em] uppercase">
                    Coach Body Builders
                  </p>
                </div>
              </div>
            </div>
            <p
              className="font-body text-[14px] text-[#EDE8DF]/25 leading-relaxed pl-4"
              style={{ borderLeft: "2px solid rgba(200,133,26,0.2)" }}
            >
              Precision-engineered coaches, built by hand in Ahmedabad for over 25 years.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="font-barlow font-bold text-[#EDE8DF] text-base tracking-wide flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#C8851A] inline-block rounded-full" />
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+919825039111"
                className="flex items-center gap-4 text-[#EDE8DF]/35 hover:text-[#EDE8DF] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[rgba(200,133,26,0.15)] group-hover:text-[#C8851A] transition-all">
                  <Phone size={15} />
                </div>
                <span className="font-body text-[14px] font-medium">+91 98250 39111</span>
              </a>
              <a href="mailto:surendra_bareja@yahoo.com"
                className="flex items-center gap-4 text-[#EDE8DF]/35 hover:text-[#EDE8DF] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[rgba(200,133,26,0.15)] group-hover:text-[#C8851A] transition-all">
                  <Mail size={15} />
                </div>
                <span className="font-body text-[14px] font-medium">surendra_bareja@yahoo.com</span>
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-5 max-w-xs">
            <h4 className="font-barlow font-bold text-[#EDE8DF] text-base tracking-wide flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#C8851A] inline-block rounded-full" />
              Find Us
            </h4>
            <div className="flex items-start gap-4 text-[#EDE8DF]/35 group hover:text-[#EDE8DF]/50 transition-colors">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shrink-0 mt-0.5 group-hover:bg-[rgba(200,133,26,0.15)] group-hover:text-[#C8851A] transition-all">
                <MapPin size={15} />
              </div>
              <div className="font-body text-[14px] leading-relaxed space-y-0.5">
                <p>N. H. No. 8, Near APMC Market</p>
                <p>Bareja – 382425</p>
                <p>Taluka: Daskroi, District: Ahmedabad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto px-6 md:px-12 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="font-body text-[12px] text-[#EDE8DF]/20 tracking-wide">
            &copy; {new Date().getFullYear()} Surendra &amp; Co. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-body text-[12px] text-[#EDE8DF]/20">
            <span className="hover:text-[#EDE8DF]/40 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#EDE8DF]/40 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </>
  );
}
