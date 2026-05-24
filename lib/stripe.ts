// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function createPaymentIntent(amount: number, metadata: Record<string, string>) {
  return stripe.paymentIntents.create({
    amount: amount * 100, // convert to kobo/cents
    currency: 'ngn',
    metadata,
    automatic_payment_methods: { enabled: true },
  })
}
