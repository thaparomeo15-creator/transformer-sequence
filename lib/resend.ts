import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendConfirmationEmail(email: string, tier: string, referralCode: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Transformer Sequence <noreply@transformer-sequence.com>',
      to: [email],
      subject: '// CLEARANCE GRANTED · TRANSFORMER SEQUENCE',
      html: `
        <div style="background-color: #080808; color: #f0f0f0; font-family: monospace; padding: 40px; border: 1px solid #1a1a1a;">
          <h1 style="color: #00E5FF; letter-spacing: 0.2em; text-transform: uppercase; font-size: 24px;">IDENTIFICATION VERIFIED</h1>
          <p style="margin: 20px 0; color: rgba(240,240,240,0.6); line-height: 1.6;">
            Welcome to the Transformer Sequence network. Your request for the <strong>${tier.toUpperCase()}</strong> tier has been processed.
          </p>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 20px; margin: 30px 0;">
            <span style="display: block; font-size: 10px; color: rgba(240,240,240,0.3); margin-bottom: 10px; letter-spacing: 0.1em;">REFERRAL TOKEN</span>
            <span style="font-size: 20px; color: #00E5FF; letter-spacing: 0.3em; font-weight: bold;">${referralCode}</span>
          </div>
          <p style="color: rgba(240,240,240,0.4); font-size: 12px;">
            You are on the secure waitlist. Use your token to increase your ranking in the deployment sequence.
          </p>
          <a href="${process.env.NEXT_PUBLIC_URL}" style="display: inline-block; background: #f0f0f0; color: #000; text-decoration: none; padding: 12px 24px; margin-top: 30px; font-weight: bold; letter-spacing: 0.1em;">ACCESS PORTAL</a>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email send failure:', err);
    return { success: false, error: err };
  }
}
