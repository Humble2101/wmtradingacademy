import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import StudentDashboardClient from './StudentDashboardClient'

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const role = (session.user as any).role
  if (role === 'INVESTOR') redirect('/dashboard/investor')
  if (role === 'ADMIN') redirect('/admin')
  return <StudentDashboardClient user={session.user as any} />
}
