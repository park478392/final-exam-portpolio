'use server'
import { AuthError } from 'next-auth'
import { signIn, signOut, auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'
import { Post } from '@/models/Post'
import { createPost } from '@/lib/posts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
export async function registerAction(data: FormData) {
  const name = String(data.get('name') ?? '').trim()
  const email = String(data.get('email') ?? '')
    .trim()
    .toLowerCase()
  const password = String(data.get('password') ?? '')
  if (
    name.length < 2 ||
    name.length > 50 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email.length > 254 ||
    password.length < 8 ||
    password.length > 72
  )
    redirect('/register?error=invalid')
  let result = 'registered'
  try {
    await connectDB()
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
export async function deletePostAction(data: FormData) {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (session.user.role !== 'admin') redirect('/board?error=forbidden')

  const id = data.get('postId')
  if (typeof id !== 'string' || !/^[a-f\d]{24}$/i.test(id)) {
    redirect('/board?error=invalid')
  }
  let deleted = false
  try {
    await connectDB()
    const result = await Post.deleteOne({ _id: id })
    deleted = result.deletedCount === 1
  } catch {
    redirect('/board?error=delete')
  }
  revalidatePath('/board')
  revalidatePath(`/board/${id}`)
  redirect(deleted ? '/board?deleted=1' : '/board?error=missing')
}
export async function createPostAction(data: FormData) {
  const session = await auth()
  if (!session?.user?.email) redirect('/login')
  const title = String(data.get('title') ?? '').trim()
  const content = String(data.get('content') ?? '').trim()
  if (
    title.length < 2 ||
    title.length > 120 ||
    content.length < 5 ||
    content.length > 10000
  )
    redirect('/board/new?error=invalid')
  let saved = false
  try {
    await createPost({ title, content, author: session.user.name ?? '익명', authorId: session.user.email })
    saved = true
  } catch { saved = false }
  if (!saved) redirect('/board/new?error=unavailable')
  revalidatePath('/board')
  redirect('/board')
}
