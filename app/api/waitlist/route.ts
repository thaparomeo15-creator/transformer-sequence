import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const { email, tier, referredBy } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const referralCode = nanoid(8).toUpperCase();

    const { error } = await supabase.from('waitlist').insert({
      email,
      tier: tier || 'personal',
      referral_code: referralCode,
      referred_by: referredBy || null,
      source: 'website'
    });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Already registered', code: 'DUPLICATE' }, 
          { status: 409 }
        );
      }
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Note: Confirmation email would be sent here
    // await sendConfirmationEmail(email, tier, referralCode);

    return NextResponse.json({ success: true, referralCode });
  } catch (err) {
    console.error('Waitlist API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
