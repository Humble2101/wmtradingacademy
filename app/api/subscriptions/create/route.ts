export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generatePaymentCode } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { planId, method } = await req.json()
    if (!planId || !method) {
      return NextResponse.json({ error: 'planId and method are required' }, { status: 400 })
    }

    const PLAN_PRICES: Record<string, number> = {
      STUDENT_BASIC: 5000,
      STUDENT_PREMIUM: 15000,
      STUDENT_VIP: 35000,
      INVESTOR_BASIC: 50000,
      INVESTOR_PREMIUM: 200000,
      INVESTOR_VIP: 500000,
    }

    const amount = PLAN_PRICES[planId]
    if (!amount) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const userId = (session.user as any).id
    const paymentCode = generatePaymentCode()

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type: 'SUBSCRIPTION',
        amount,
        method: method === 'CARD' ? 'CARD' : 'BANK_TRANSFER',
        status: 'PENDING',
        paymentCode,
        description: planId,
      },
    })

    return NextResponse.json(
      {
        transactionId: transaction.id,
        paymentCode,
        amount,
        bankDetails: {
          bankName: process.env.BANK_NAME || 'GTBank',
          accountName: process.env.BANK_ACCOUNT_NAME || 'WM Trading Academy Ltd',
          accountNumber: process.env.BANK_ACCOUNT_NUMBER || '0123456789',
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/subscriptions/create error:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const userId = (session.user as any).id
    const subscription = await prisma.subscription.findUnique({ where: { userId } })
    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 })
  }
}
