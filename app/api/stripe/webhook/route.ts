import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' })

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Stripe webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const planId = session.metadata?.planId

        if (userId && planId) {
          // Activate subscription
          await prisma.subscription.upsert({
            where: { userId },
            update: { planName: planId, planType: planId as any, status: 'ACTIVE', stripeId: session.id, startDate: new Date() },
            create: { userId, planName: planId, planType: planId as any, status: 'ACTIVE', price: (session.amount_total || 0) / 100, stripeId: session.id },
          })

          // Record transaction
          await prisma.transaction.create({
            data: {
              userId,
              type: 'SUBSCRIPTION',
              amount: (session.amount_total || 0) / 100,
              method: 'CARD',
              status: 'COMPLETED',
              stripeId: session.id,
              description: planId,
            },
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        // Handle failed payment — notify user, update sub status
        console.log('Payment failed for customer:', customerId)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
