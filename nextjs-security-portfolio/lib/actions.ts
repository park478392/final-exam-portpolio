'use server'
import { AuthError } from 'next-auth'
import { signIn, signOut } from '@/auth'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'
import { redirect } from 'next/navigation'
export async function registerAction(data: FormData) {
  const rawName = data.get('name')
  const rawEmail = data.get('email')
  const password = data.get('password')
  const confirmation = data.get('passwordConfirmation')
  if (typeof rawName !== 'string' || typeof rawEmail !== 'string' ||
      typeof password !== 'string' || typeof confirmation !== 'string') {
    redirect('/register?error=invalid')
  }

  const name = rawName.trim()
  const email = rawEmail.trim().toLowerCase()
  if (
    name.length < 2 ||
    name.length > 50 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email.length > 254
  )
    redirect('/register?error=invalid')
  if (bcrypt.truncates(password) || Array.from(password).length < 8) {
    redirect('/register?error=password-length')
  }
  if (password !== confirmation) redirect('/register?error=password-mismatch')
  let result = 'registered'
  try {
    await connectDB()
    await User.init()
    const existing = await User.findOne({ email })
    if (existing) result = 'duplicate'
    else await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) })
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) result = 'duplicate'
    else result = 'unavailable'
  }
  if (result !== 'registered') redirect(`/register?error=${result}`)
  redirect('/login?registered=1')
}
export async function loginAction(data: FormData) {
  try {
    await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirectTo: '/board',
    })
  } catch (e) {
    if (e instanceof AuthError) redirect(`/login?error=${e.type === 'CredentialsSignin' ? 'invalid' : 'unavailable'}`)
    throw e
  }
}
export async function logoutAction() {
  await signOut({ redirectTo: '/' })
}
