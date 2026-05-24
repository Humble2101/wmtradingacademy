import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const role = (session.user as any)?.role
  if (role === 'ADMIN') redirect('/admin')
  if (role === 'INVESTOR') redirect('/dashboard/investor')
  redirect('/dashboard/student')
}
