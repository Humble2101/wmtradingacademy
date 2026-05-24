export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const userId = (session.user as any).id
    const portfolio = await prisma.portfolio.findUnique({ where: { userId } })

    if (!portfolio) {
      return NextResponse.json({
        totalValue: 0,
        totalInvested: 0,
        totalProfit: 0,
        roi: 0,
        riskLevel: 'MEDIUM',
        assets: [],
        performance: [],
      })
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { userId, totalValue, totalInvested, totalProfit, roi, riskLevel, assets, performance } =
      await req.json()
    if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })

    const portfolio = await prisma.portfolio.upsert({
      where: { userId },
      update: { totalValue, totalInvested, totalProfit, roi, riskLevel, assets, performance },
      create: {
        userId,
        totalValue: totalValue || 0,
        totalInvested: totalInvested || 0,
        totalProfit: totalProfit || 0,
        roi: roi || 0,
        riskLevel: riskLevel || 'MEDIUM',
        assets: assets || [],
        performance: performance || [],
      },
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 })
  }
}
