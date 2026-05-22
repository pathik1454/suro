'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function CommissionForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    coachType: 'luxury-sleeper',
    requirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong.');
      }

      setStatus('success');
      // Reset status to idle after 5 seconds to allow another submission
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          fullName: '',
          company: '',
          email: '',
          phone: '',
          coachType: 'luxury-sleeper',
          requirements: ''
        });
      }, 5000);
    } catch (err: unknown) {
      console.error('Submit error:', err);
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-gold)] rounded-xl p-8 sm:p-10 shadow-[var(--shadow-card)]">
      <h3 className="font-display font-semibold text-[28px] text-[var(--text-primary)] mb-8">
        Commission Request
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="font-body font-medium text-[11px] text-[var(--text-muted)] tracking-[0.1em] uppercase">
              Full Name *
            </span>
            <input 
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={status === 'loading' || status === 'success'}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md px-4 py-3 text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition-all disabled:opacity-50"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-body font-medium text-[11px] text-[var(--text-muted)] tracking-[0.1em] uppercase">
              Company Name
            </span>
            <input 
              name="company"
              value={formData.company}
              onChange={handleChange}
              disabled={status === 'loading' || status === 'success'}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md px-4 py-3 text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition-all disabled:opacity-50"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="font-body font-medium text-[11px] text-[var(--text-muted)] tracking-[0.1em] uppercase">
              Work Email *
            </span>
            <input 
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'loading' || status === 'success'}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md px-4 py-3 text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition-all disabled:opacity-50"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-body font-medium text-[11px] text-[var(--text-muted)] tracking-[0.1em] uppercase">
              Phone Number *
            </span>
            <input 
              type="tel"
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'loading' || status === 'success'}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md px-4 py-3 text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition-all disabled:opacity-50"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-body font-medium text-[11px] text-[var(--text-muted)] tracking-[0.1em] uppercase">
            Coach Type
          </span>
          <select 
            name="coachType"
            value={formData.coachType}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md px-4 py-3 text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238AAFC8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '12px auto' }}
          >
            <option value="luxury-sleeper">Luxury Sleeper Coach</option>
            <option value="semi-sleeper">Semi-Sleeper Coach</option>
            <option value="seater">Seater Coach</option>
            <option value="school">School / Institutional Bus</option>
            <option value="other">Other Commercial Vehicle</option>
            <option value="custom">Fully Custom Build</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-body font-medium text-[11px] text-[var(--text-muted)] tracking-[0.1em] uppercase">
            Requirements
          </span>
          <textarea 
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            rows={5}
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md px-4 py-3 text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition-all resize-none disabled:opacity-50"
            placeholder="Tell us about your route, passenger capacity, and specific customizations..."
          />
        </label>

        <div className="mt-2">
          {status === 'idle' && (
            <button 
              type="submit"
              className="w-full bg-[var(--gold)] text-[var(--bg-void)] font-body font-semibold text-[14px] tracking-widest uppercase py-4 rounded-md hover:bg-[var(--gold-bright)] transition-colors flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              SUBMIT REQUEST <ArrowRight size={18} />
            </button>
          )}

          {status === 'loading' && (
            <button 
              disabled
              className="w-full bg-[var(--gold)] text-[var(--bg-void)] font-body font-semibold text-[14px] tracking-widest uppercase py-4 rounded-md flex items-center justify-center gap-2 opacity-90 cursor-wait"
            >
              <Loader2 size={18} className="animate-spin" /> SENDING...
            </button>
          )}

          {status === 'success' && (
            <div className="flex flex-col gap-3">
              <button 
                disabled
                className="w-full bg-[#1A3B2A] border border-[#2E6B4C] text-[#8DF0BD] font-body font-semibold text-[14px] tracking-widest uppercase py-4 rounded-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} /> REQUEST SENT
              </button>
              <div className="bg-[#1A3B2A]/50 border border-[#2E6B4C]/50 rounded-md p-4 text-center">
                <p className="font-body text-[13px] text-[#8DF0BD]">
                  Thank you. We&apos;ll contact you within 1 business day.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col gap-3">
              <button 
                type="button"
                onClick={() => setStatus('idle')}
                className="w-full bg-[#3B1A1A] border border-[#6B2E2E] text-[#F08D8D] font-body font-semibold text-[14px] tracking-widest uppercase py-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#4A2222] transition-colors"
              >
                <XCircle size={18} /> TRY AGAIN
              </button>
              <div className="bg-[#3B1A1A]/50 border border-[#6B2E2E]/50 rounded-md p-4 text-center">
                <p className="font-body text-[13px] text-[#F08D8D]">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}
        </div>

      </form>
    </div>
  );
}
