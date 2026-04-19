import { NextRequest } from 'next/server'
import { stripe } from '@/lib/stripe'
export async function POST(req: NextRequest) {
  try {
    const { tier, email } = await req.json()
    const prices: Record<string, string> = { personal: process.env.STRIPE_PRICE_PERSONAL!, pro: process.env.STRIPE_PRICE_PRO! }
    if (!prices[tier]) return Response.json({ error: 'Invalid tier' }, { status: 400 })
    const session = await stripe.checkout.sessions.create({ mode:'subscription', payment_method_types:['card'], customer_email: email, line_items:[{ price: prices[tier], quantity:1 }], success_url:`${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`, cancel_url:`${process.env.NEXT_PUBLIC_URL}/#pricing` })
    return Response.json({ url: session.url })
  } catch (e) { return Response.json({ error: 'Checkout error' }, { status: 500 }) }
}
