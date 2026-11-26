'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import { isPostId } from '@/lib/posts'
import { Post } from '@/models/Post'
import { requireAdmin } from './access'

export async function deletePostAsAdmin(data: FormData) {
  await requireAdmin()
  const id = data.get('postId')
  if (!isPostId(id)) redirect('/admin?error=invalid')

  let deleted: boolean
  try {
    await connectDB()
    const result = await Post.deleteOne({ _id: id }).maxTimeMS(5000)
    deleted = result.deletedCount === 1
  } catch {
    redirect('/admin?error=delete')
  }
  if (!deleted) redirect('/admin?error=missing')

  revalidatePath('/admin')
  revalidatePath('/board')
  revalidatePath(`/board/${id}`)
  redirect('/admin?deleted=1')
}
