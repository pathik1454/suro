import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

// Zod validation schema
const contactSchema = z.object({
  fullName:     z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:        z.string().email('Invalid email address'),
  company:      z.string().max(100).optional(),
  phone:        z.string().min(10, 'Enter a valid phone number').max(15),
  coachType:    z.enum(['luxury-sleeper', 'semi-sleeper', 'seater', 'school', 'other', 'custom']),
  requirements: z.string().max(2000).optional(),
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

    // 1. Save to Supabase
    const supabase = createAdminClient();
    const { error: dbError } = await supabase
      .from('commission_requests')
      .insert({
        full_name:    data.fullName,
        email:        data.email,
        company:      data.company || null,
        phone:        data.phone,
        coach_type:   data.coachType,
        requirements: data.requirements || null,
        submitted_at: new Date().toISOString(),
        status:       'new',
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      // We will continue to try sending email even if DB fails, but we could also fail here.
      // Usually, it's better to capture the lead in email.
    }

    // 2. Send email to Surendra & Co. via Resend
    // We wrap this in a check in case the API key is not configured yet
    if (process.env.RESEND_API_KEY) {
      const { error: emailError } = await resend.emails.send({
        from:    'onboarding@resend.dev', // Should be a verified domain in prod
        to:      ['harshhalani89@gmail.com'],
        replyTo: data.email,
        subject: `New Commission Request — ${data.fullName} · ${data.coachType}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <div style="background: #0C1521; padding: 24px 32px; border-bottom: 3px solid #D4841A;">
              <h2 style="color: #EDE8DF; margin: 0; font-size: 20px; letter-spacing: 0.05em;">
                NEW COMMISSION REQUEST
              </h2>
              <p style="color: #8AAFC8; margin: 4px 0 0; font-size: 13px;">
                Surendra & Co.
              </p>
            </div>
            <div style="padding: 32px; background: #f9f9f9; border: 1px solid #e5e5e5;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Full Name</td>
                  <td style="padding: 10px 0; color: #1a1a1a; border-bottom: 1px solid #eee;">${data.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #D4841A;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:${data.phone}" style="color: #D4841A;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Company</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.company || '—'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; border-bottom: 1px solid #eee;">Coach Type</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.coachType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 40%; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Requirements</td>
                  <td style="padding: 10px 0; white-space: pre-wrap;">${data.requirements || '—'}</td>
                </tr>
              </table>
            </div>
            <div style="padding: 16px 32px; background: #f0f0f0; font-size: 11px; color: #888;">
              Submitted via surendra-gamma.vercel.app · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </div>
          </div>
        `,
      });

      if (emailError) {
        console.error('Resend error:', emailError);
        return NextResponse.json(
          { error: 'Email delivery failed. Please try again or contact us directly.' },
          { status: 500 }
        );
      }

      // 3. Send confirmation email to user
      await resend.emails.send({
        from:    'onboarding@resend.dev', // Should be a verified domain in prod
        to:      [data.email],
        subject: 'We received your commission request — Surendra & Co.',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0C1521; padding: 24px 32px; border-bottom: 3px solid #D4841A;">
              <h2 style="color: #EDE8DF; margin: 0; font-size: 18px;">SURENDRA & CO.</h2>
              <p style="color: #8AAFC8; margin: 4px 0 0; font-size: 12px;">Coach Body Builders · Est. 2009</p>
            </div>
            <div style="padding: 32px; background: #ffffff;">
              <p style="font-size: 15px; color: #1a1a1a; line-height: 1.6;">
                Dear ${data.fullName},
              </p>
              <p style="font-size: 15px; color: #444; line-height: 1.7;">
                Thank you for reaching out. We have received your commission request and our team will get back to you within <strong>1 business day</strong>.
              </p>
              <p style="font-size: 15px; color: #444; line-height: 1.7;">
                If you need to speak with us immediately, you can call us at <a href="tel:+919825039111" style="color: #D4841A;">+91 98250 39111</a>.
              </p>
              <p style="font-size: 14px; color: #888; margin-top: 32px;">
                — Surendra & Co. Team<br>
                NH-8, Near APMC Market, Bareja, Ahmedabad
              </p>
            </div>
          </div>
        `,
      });
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
