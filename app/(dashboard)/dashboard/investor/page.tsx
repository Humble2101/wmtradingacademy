import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import InvestorDashboardClient from './InvestorDashboardClient'

export default async function InvestorDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const role = (session.user as any).role
  if (role === 'STUDENT') redirect('/dashboard/student')
  if (role === 'ADMIN') redirect('/admin')
  return <InvestorDashboardClient user={session.user as any} />
}
