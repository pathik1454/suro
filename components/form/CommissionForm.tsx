'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function CommissionForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    coachType: '',
    requirements: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'fullName') {
      if (!value.trim()) {
        error = 'Full name is required.';
      } else if (value.trim().length < 2) {
        error = 'Full name must be at least 2 characters.';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Work email is required.';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          error = 'Please enter a valid email address.';
        }
      }
    } else if (name === 'phone') {
      if (!value.trim()) {
        error = 'Phone number is required.';
      } else {
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
          error = 'Phone number must be at least 10 digits.';
        }
      }
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const newTouched = { fullName: true, email: true, phone: true };
    setTouched(newTouched);

    const nameErr = validateField('fullName', formData.fullName);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);

    const newErrors = {
      fullName: nameErr,
      email: emailErr,
      phone: phoneErr
    };

    setErrors(newErrors);

    if (nameErr || emailErr || phoneErr) {
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className="bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[0_0_60px_rgba(212,132,26,0.06)] p-10 flex flex-col items-center text-center justify-center min-h-[400px] rounded-none"
        style={{ borderRadius: '0px !important' }}
      >
        <CheckCircle2 size={36} className="text-[var(--gold)] mb-4" />
        <h4 className="font-body font-semibold text-[16px] text-[var(--text-primary)] mb-2">
          Your request has been received.
        </h4>
        <p className="font-body font-normal text-[14px] text-[var(--text-secondary)]">
          We&apos;ll contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[0_0_60px_rgba(212,132,26,0.06)] p-8 sm:p-10 rounded-none"
      style={{ borderRadius: '0px !important' }}
    >
      <h4 className="font-display font-semibold text-[28px] text-[var(--text-primary)] mb-8">
        Commission Request
      </h4>
      <br />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="font-mono font-medium text-[14px] text-[var(--text-secondary)] uppercase tracking-[0.25em] mb-2 leading-[1]">
              Full Name *
            </span>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === 'loading'}
              className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-body text-[14px] px-[14px] py-[12px] focus:border-[var(--gold-bright)] focus:ring-[var(--gold-glow)] focus:shadow-[0_0_8px_var(--gold-glow)] focus:outline-none transition-all placeholder-[#454F68] rounded-none"
              style={{ borderRadius: '0px !important' }}
            />
            {touched.fullName && errors.fullName && (
              <span className="font-body text-[13px] text-[#E05555] mt-1.5">
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-mono font-medium text-[14px] text-[var(--text-secondary)] uppercase tracking-[0.25em] mb-2 leading-[1]">
              Company Name
            </span>
            <input
              type="text"
              name="company"
              placeholder="e.g. Transport Co."
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === 'loading'}
              className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-body text-[14px] px-[14px] py-[12px] focus:border-[var(--gold-bright)] focus:ring-[var(--gold-glow)] focus:shadow-[0_0_8px_var(--gold-glow)] focus:outline-none transition-all placeholder-[#454F68] rounded-none"
              style={{ borderRadius: '0px !important' }}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="font-mono font-medium text-[14px] text-[var(--text-secondary)] uppercase tracking-[0.25em] mb-2 leading-[1]">
              Work Email *
            </span>
            <input
              type="email"
              name="email"
              placeholder="e.g. name@company.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === 'loading'}
              className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-body text-[14px] px-[14px] py-[12px] focus:border-[var(--gold-bright)] focus:ring-[var(--gold-glow)] focus:shadow-[0_0_8px_var(--gold-glow)] focus:outline-none transition-all placeholder-[#454F68] rounded-none"
              style={{ borderRadius: '0px !important' }}
            />
            {touched.email && errors.email && (
              <span className="font-body text-[13px] text-[#E05555] mt-1.5">
                {errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-mono font-medium text-[14px] text-[var(--text-secondary)] uppercase tracking-[0.25em] mb-2 leading-[1]">
              Phone Number *
            </span>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +91 98250 39111"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === 'loading'}
              className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-body text-[14px] px-[14px] py-[12px] focus:border-[var(--gold-bright)] focus:ring-[var(--gold-glow)] focus:shadow-[0_0_8px_var(--gold-glow)] focus:outline-none transition-all placeholder-[#454F68] rounded-none"
              style={{ borderRadius: '0px !important' }}
            />
            {touched.phone && errors.phone && (
              <span className="font-body text-[13px] text-[#E05555] mt-1.5">
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col">
          <span className="font-mono font-medium text-[14px] text-[var(--text-secondary)] uppercase tracking-[0.25em] mb-2 leading-[1]">
            Coach Type
          </span>
          <select
            name="coachType"
            value={formData.coachType}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={status === 'loading'}
            className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-body text-[14px] px-[14px] py-[12px] focus:border-[var(--gold-bright)] focus:ring-[var(--gold-glow)] focus:shadow-[0_0_8px_var(--gold-glow)] focus:outline-none transition-all placeholder-[#454F68] appearance-none cursor-pointer rounded-none"
            style={{
              borderRadius: '0px !important',
              backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23D4841A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px top 50%',
              backgroundSize: '12px auto'
            }}
          >
            <option value="" className="text-[#454F68] bg-[var(--bg-base)]">Select coach type...</option>
            <option value="Luxury Sleeper Coach" className="bg-[var(--bg-base)] text-[var(--text-primary)]">Luxury Sleeper Coach</option>
            <option value="Semi-Sleeper Coach" className="bg-[var(--bg-base)] text-[var(--text-primary)]">Semi-Sleeper Coach</option>
            <option value="Seater Coach" className="bg-[var(--bg-base)] text-[var(--text-primary)]">Seater Coach</option>
            <option value="School / Institutional Bus" className="bg-[var(--bg-base)] text-[var(--text-primary)]">School / Institutional Bus</option>
            <option value="Other Commercial Vehicle" className="bg-[var(--bg-base)] text-[var(--text-primary)]">Other Commercial Vehicle</option>
            <option value="Fully Custom Build" className="bg-[var(--bg-base)] text-[var(--text-primary)]">Fully Custom Build</option>
          </select>
        </div>

        {/* Row 4 */}
        <div className="flex flex-col">
          <span className="font-mono font-medium text-[14px] text-[var(--text-secondary)] uppercase tracking-[0.25em] mb-2 leading-[1]">
            Requirements
          </span>
          <textarea
            name="requirements"
            rows={5}
            placeholder="Describe your route, passenger capacity, comfort tier, and any specific requirements..."
            value={formData.requirements}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={status === 'loading'}
            className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-body text-[14px] px-[14px] py-[12px] focus:border-[var(--gold-bright)] focus:ring-[var(--gold-glow)] focus:shadow-[0_0_8px_var(--gold-glow)] focus:outline-none transition-all placeholder-[#454F68] resize-none rounded-none"
            style={{ borderRadius: '0px !important' }}
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full h-[52px] bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[var(--bg-void)] font-body font-semibold text-[12px] tracking-[0.25em] uppercase hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-350 rounded-none flex items-center justify-center gap-2 cursor-pointer"
            style={{ borderRadius: '0px !important' }}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={20} className="animate-spin text-[var(--bg-void)]" />
                <span>SENDING...</span>
              </>
            ) : (
              'SUBMIT REQUEST'
            )}
          </button>

          {status === 'error' && (
            <p className="font-body text-[13px] text-[#E05555] text-center">
              Submission failed. Please try again or call +91 98250 39111.
            </p>
          )}
        </div>

      </form>
    </div>
  );
}
