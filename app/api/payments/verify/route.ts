import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PATCH /api/payments/verify — admin approves or rejects a bank transfer
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { transactionId, action } = await req.json()
    if (!transactionId || !['APPROVE', 'REJECT'].includes(action)) {
      return NextResponse.json({ error: 'transactionId and action (APPROVE|REJECT) are required' }, { status: 400 })
    }

    const tx = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { user: true },
    })
    if (!tx) return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })

    const newStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED'
    await prisma.transaction.update({ where: { id: transactionId }, data: { status: newStatus } })

    // If approved subscription payment → activate subscription
    if (action === 'APPROVE' && tx.type === 'SUBSCRIPTION') {
      const planType = tx.description as any
      await prisma.subscription.upsert({
        where: { userId: tx.userId },
        update: { planName: planType, planType, status: 'ACTIVE', startDate: new Date() },
        create: { userId: tx.userId, planName: planType, planType, status: 'ACTIVE', price: tx.amount },
      })
    }

    return NextResponse.json({ message: `Payment ${newStatus.toLowerCase()} successfully` })
  } catch (error) {
    console.error('PATCH /api/payments/verify error:', error)
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 })
  }
}

// GET /api/payments/verify — admin lists pending bank transfers
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const pending = await prisma.transaction.findMany({
      where: { method: 'BANK_TRANSFER', status: 'PENDING' },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(pending)
  } catch (error) {
    console.error('GET /api/payments/verify error:', error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}
