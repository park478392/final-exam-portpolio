import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.email) redirect('/login')
  if (session.user.role !== 'admin') notFound()
}
