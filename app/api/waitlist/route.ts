import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/resend'
import { nanoid } from 'nanoid'
export async function POST(req: NextRequest) {
  try {
    const { email, tier = 'personal', referredBy } = await req.json()
    if (!email || !email.includes('@')) return Response.json({ error: 'Invalid email' }, { status: 400 })
    const referralCode = nanoid(8).toUpperCase()
    const { error } = await supabase.from('waitlist').insert({ email, tier, referral_code: referralCode, referred_by: referredBy || null, source: 'website' })
    if (error?.code === '23505') return Response.json({ error: 'Already registered', code: 'DUPLICATE' }, { status: 409 })
    if (error) return Response.json({ error: 'Database error' }, { status: 500 })
    await sendConfirmationEmail(email, tier, referralCode)
    return Response.json({ success: true, referralCode })
  } catch (e) { return Response.json({ error: 'Server error' }, { status: 500 }) }
}
