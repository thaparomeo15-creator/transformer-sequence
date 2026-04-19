import { NextRequest } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  try {
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any
      await supabase.from('waitlist').update({ tier: 'paid' }).eq('email', session.customer_email)
    }
  } catch (e) { return new Response('Webhook error', { status: 400 }) }
  return new Response('ok', { status: 200 })
}
