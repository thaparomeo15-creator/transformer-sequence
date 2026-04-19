import { Resend } from 'resend'
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
export async function sendConfirmationEmail(email: string, tier: string, referralCode: string) {
  if (!resend) { console.warn('RESEND_API_KEY not set — skipping email'); return }
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'hello@transformer-sequence.dev',
    to: email,
    subject: '// CLEARANCE GRANTED · TRANSFORMER SEQUENCE',
    html: `
// ACCESS QUEUED

You have been added to the ${tier.toUpperCase()} waitlist for Transformer Sequence.

YOUR REFERRAL CODE

${referralCode}

Share this code to move up the queue.

`
  })
}
