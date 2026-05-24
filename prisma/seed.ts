import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding WM Trading Academy database...')

  // Clear existing
  await prisma.review.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.portfolio.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.course.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.user.deleteMany()

  const password = await bcrypt.hash('demo1234', 12)

  // Admin
  await prisma.user.create({
    data: { name: 'WM Admin', email: 'admin@demo.com', password, role: 'ADMIN' },
  })

  // Student
  const student = await prisma.user.create({
    data: { name: 'John Doe', email: 'student@demo.com', password, role: 'STUDENT' },
  })
  await prisma.subscription.create({
    data: { userId: student.id, planName: 'VIP', planType: 'STUDENT_VIP', status: 'ACTIVE', price: 35000 },
  })

  // Investor
  const investor = await prisma.user.create({
    data: { name: 'Amara Okafor', email: 'investor@demo.com', password, role: 'INVESTOR' },
  })
  await prisma.subscription.create({
    data: { userId: investor.id, planName: 'VIP', planType: 'INVESTOR_VIP', status: 'ACTIVE', price: 500000 },
  })
  await prisma.portfolio.create({
    data: {
      userId: investor.id,
      totalValue: 4820000, totalInvested: 3750000,
      totalProfit: 1070000, roi: 28.53, riskLevel: 'MEDIUM',
      assets: JSON.stringify([
        { name: 'BTC', value: 40, percentage: 40, color: '#F5A623' },
        { name: 'ETH', value: 25, percentage: 25, color: '#00E5FF' },
        { name: 'SOL', value: 15, percentage: 15, color: '#B388FF' },
        { name: 'Stables', value: 12, percentage: 12, color: '#00E676' },
        { name: 'Others', value: 8, percentage: 8, color: '#FF5252' },
      ]),
      performance: JSON.stringify([
        { date: '2026-01', value: 3200000, roi: 0 },
        { date: '2026-02', value: 3480000, roi: 8.75 },
        { date: '2026-03', value: 3750000, roi: 17.19 },
        { date: '2026-04', value: 4200000, roi: 31.25 },
        { date: '2026-05', value: 4820000, roi: 50.63 },
      ]),
    },
  })
  await prisma.transaction.createMany({
    data: [
      { userId: investor.id, type: 'DEPOSIT', amount: 500000, method: 'BANK_TRANSFER', status: 'APPROVED', paymentCode: 'WM-INIT01', description: 'Initial deposit' },
      { userId: investor.id, type: 'DEPOSIT', amount: 1000000, method: 'CARD', status: 'COMPLETED', description: 'Second deposit' },
      { userId: investor.id, type: 'PROFIT_CREDIT', amount: 84000, method: 'BANK_TRANSFER', status: 'COMPLETED', description: 'April profit credit' },
      { userId: investor.id, type: 'PROFIT_CREDIT', amount: 62000, method: 'BANK_TRANSFER', status: 'COMPLETED', description: 'March profit credit' },
      { userId: investor.id, type: 'WITHDRAWAL', amount: 200000, method: 'BANK_TRANSFER', status: 'PENDING', description: 'Partial withdrawal request' },
    ],
  })

  // Reviews
  await prisma.review.createMany({
    data: [
      { userId: student.id, rating: 5, title: 'Life-changing education', message: "WM Trading Academy completely transformed how I look at the crypto market. I went from zero understanding to placing profitable trades within 2 weeks.", status: 'APPROVED' },
      { userId: investor.id, rating: 5, title: '28% ROI in 3 months', message: "My portfolio has grown 28% in 3 months under their managed investment program. Daily reports, clear charts, and a dedicated account manager who genuinely cares.", status: 'APPROVED' },
      { userId: student.id, rating: 4, title: 'Finally things clicked!', message: "The crypto terminologies module finally made things click for me. Very clear explanations and the community support is amazing.", status: 'APPROVED' },
    ],
  })

  // Courses
  await prisma.course.createMany({
    data: [
      { title: 'Crypto Market Fundamentals', description: 'Master the basics of how crypto markets work, including order books, liquidity and market cycles.', category: 'Fundamentals', level: 'Beginner', planRequired: 'STUDENT_BASIC', lessons: JSON.stringify([{ id: 1, title: 'What is Blockchain?', duration: 15 }, { id: 2, title: 'Understanding Wallets', duration: 20 }, { id: 3, title: 'How Exchanges Work', duration: 25 }]) },
      { title: 'Advanced Technical Analysis', description: 'Master chart patterns, indicators, and price action for consistent profitability.', category: 'Technical Analysis', level: 'Intermediate', planRequired: 'STUDENT_PREMIUM', lessons: JSON.stringify([{ id: 1, title: 'Candlestick Patterns', duration: 30 }, { id: 2, title: 'RSI & MACD', duration: 25 }, { id: 3, title: 'Support & Resistance', duration: 20 }]) },
      { title: 'DeFi & Yield Strategies', description: 'Earn passive income through DeFi protocols, yield farming and liquidity mining.', category: 'DeFi', level: 'Advanced', planRequired: 'STUDENT_VIP', lessons: JSON.stringify([{ id: 1, title: 'Intro to DeFi', duration: 20 }, { id: 2, title: 'Yield Farming Basics', duration: 35 }]) },
    ],
  })

  // Announcement
  await prisma.announcement.create({
    data: { title: "Let's Talk Crypto 6.0 — May 30th & 31st", content: "Join us for the 6th edition. Evening sessions. Register: wa.me/2349153137682", type: 'event', active: true },
  })

  console.log('')
  console.log('✅ Database seeded successfully!')
  console.log('')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  Demo Login Credentials')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  Admin:    admin@demo.com')
  console.log('  Student:  student@demo.com')
  console.log('  Investor: investor@demo.com')
  console.log('  Password: demo1234  (all accounts)')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
