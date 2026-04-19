import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  const session = event.data.object as any;

  switch (event.type) {
    case 'checkout.session.completed':
      // Update waitlist/users table with subscription status
      await supabase
        .from('waitlist')
        .update({ metadata: { status: 'paid', stripe_session_id: session.id } })
        .eq('email', session.customer_email);
      break;

    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      await supabase
        .from('waitlist')
        .update({ metadata: { status: 'cancelled' } })
        .eq('email', session.customer_email);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
