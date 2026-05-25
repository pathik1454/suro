import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey || 're_dummy');

// Zod validation schema
const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional().nullable(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20),
  coachType: z.string().max(100).optional().nullable(),
  requirements: z.string().max(2000).optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check if live credentials are configured
    const hasSupabaseKeys = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hasResendKey = !!resendApiKey && resendApiKey !== 're_dummy';

    // 1. Save to Supabase (only if keys exist, else simulate in dev)
    if (hasSupabaseKeys) {
      try {
        const supabase = createAdminClient();
        const { error: dbError } = await supabase
          .from('commission_requests')
          .insert({
            full_name:    data.fullName,
            email:        data.email,
            company:      data.company || null,
            phone:        data.phone,
            coach_type:   data.coachType || null,
            requirements: data.requirements || null,
            submitted_at: new Date().toISOString(),
            status:       'new',
          });

        if (dbError) {
          console.error('Supabase DB Insert Error:', dbError);
        }
      } catch (dbEx) {
        console.error('Supabase Client/Connection Error:', dbEx);
      }
    } else {
      console.log('--- DEV FALLBACK: Supabase keys not set. Simulating DB insert. ---');
    }

    // 2. Send emails via Resend
    if (hasResendKey) {
      // Email A: to surendra_bareja@yahoo.com
      const emailARespons = await resend.emails.send({
        from:    'onboarding@resend.dev', // Default sender in sandbox / dev
        to:      ['surendra_bareja@yahoo.com'],
        replyTo: data.email,
        subject: `New Commission Request — ${data.fullName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #EEF0F7; background-color: #07080D; border: 1px solid rgba(43,91,168,0.20);">
            <div style="background-color: #0B0C14; padding: 28px 32px; border-bottom: 3px solid #2B5BA8;">
              <h2 style="color: #EEF0F7; margin: 0; font-size: 20px; font-weight: 500; letter-spacing: 0.05em; font-family: serif;">
                NEW COMMISSION REQUEST
              </h2>
              <p style="color: #8B96B0; margin: 4px 0 0; font-size: 13px;">
                Surendra & Co. · Flagship Showroom
              </p>
            </div>
            <div style="padding: 32px; background-color: #10121C;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #8B96B0;">
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.06); color: #454F68; width: 35%;">Full Name</td>
                  <td style="padding: 12px 0; color: #EEF0F7; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.06); color: #454F68;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);"><a href="mailto:${data.email}" style="color: #2B5BA8; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.06); color: #454F68;">Phone</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);"><a href="tel:${data.phone}" style="color: #2B5BA8; text-decoration: none;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.06); color: #454F68;">Company</td>
                  <td style="padding: 12px 0; color: #EEF0F7; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.company || '—'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.06); color: #454F68;">Coach Type</td>
                  <td style="padding: 12px 0; color: #EEF0F7; border-bottom: 1px solid rgba(255,255,255,0.06);">${data.coachType || '—'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; color: #454F68; vertical-align: top;">Requirements</td>
                  <td style="padding: 12px 0; color: #EEF0F7; white-space: pre-wrap; line-height: 1.6;">${data.requirements || '—'}</td>
                </tr>
              </table>
            </div>
            <div style="padding: 20px 32px; background-color: #07080D; font-size: 11px; color: #454F68; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
              Submitted via Surendra & Co. Showroom Portal · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </div>
          </div>
        `,
      });

      if (emailARespons.error) {
        console.error('Resend Email A Error:', emailARespons.error);
        return NextResponse.json(
          { error: 'Email delivery failed. Please try again or call +91 98250 39111 directly.' },
          { status: 500 }
        );
      }

      // Email B: Confirmation to Submitter
      const emailBRespons = await resend.emails.send({
        from:    'onboarding@resend.dev', // Default sender in sandbox / dev
        to:      [data.email],
        subject: 'We received your request — Surendra & Co.',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #EEF0F7; background-color: #07080D; border: 1px solid rgba(43,91,168,0.20);">
            <div style="background-color: #0B0C14; padding: 28px 32px; border-bottom: 3px solid #2B5BA8;">
              <h2 style="color: #EEF0F7; margin: 0; font-size: 18px; font-weight: 500; letter-spacing: 0.05em; font-family: serif;">
                SURENDRA & CO.
              </h2>
              <p style="color: #8B96B0; margin: 4px 0 0; font-size: 12px;">
                Coach Body Builders · Est. 2009
              </p>
            </div>
            <div style="padding: 32px; background-color: #10121C; line-height: 1.75; font-size: 14px; color: #8B96B0;">
              <p style="color: #EEF0F7; font-size: 15px; margin-top: 0;">
                Dear ${data.fullName},
              </p>
              <p>
                Thank you for reaching out. We have received your commission request and our team will contact you within <strong>24 hours</strong>.
              </p>
              <p>
                For urgent enquiries, please reach us directly at <a href="tel:+919825039111" style="color: #2B5BA8; text-decoration: none; font-weight: 600;">+91 98250 39111</a>.
              </p>
              <br />
              <p style="font-size: 13px; color: #454F68; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px; margin-bottom: 0;">
                Surendra & Co. Team<br />
                NH-8, Near APMC Market, Bareja, Ahmedabad
              </p>
            </div>
          </div>
        `,
      });

      if (emailBRespons.error) {
        console.error('Resend Email B Error:', emailBRespons.error);
      }
    } else {
      console.log('--- DEV FALLBACK: Resend key not set. Simulating email sending. ---');
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
