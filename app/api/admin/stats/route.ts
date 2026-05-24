import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const [
      totalUsers,
      totalStudents,
      totalInvestors,
      activeSubscriptions,
      pendingPayments,
      pendingReviews,
      totalRevenue,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'INVESTOR' } }),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      prisma.transaction.count({ where: { status: 'PENDING', method: 'BANK_TRANSFER' } }),
      prisma.review.count({ where: { status: 'PENDING' } }),
      prisma.transaction.aggregate({
        where: { status: { in: ['APPROVED', 'COMPLETED'] } },
        _sum: { amount: true },
      }),
    ])

    return NextResponse.json({
      totalUsers,
      totalStudents,
      totalInvestors,
      activeSubscriptions,
      pendingPayments,
      pendingReviews,
      totalRevenue: totalRevenue._sum.amount || 0,
    })
  } catch (error) {
    console.error('GET /api/admin/stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
