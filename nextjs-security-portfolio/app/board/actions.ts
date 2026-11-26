'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { isBoardCategory } from '@/lib/board-categories'
import { createPost, deleteOwnedPost, isPostId, updateOwnedPost } from '@/lib/posts'

function readPostFields(data: FormData) {
  const rawTitle = data.get('title')
  const rawContent = data.get('content')
  const category = data.get('category')
  if (typeof rawTitle !== 'string' || typeof rawContent !== 'string' || !isBoardCategory(category)) return
  const title = rawTitle.trim()
  const content = rawContent.trim()
  if (title.length < 2 || title.length > 120 || content.length < 5 || content.length > 10000) return
  return { title, content, category }
}

export async function createPostAction(data: FormData) {
  const session = await auth()
  const authorId = session?.user?.email
  if (!authorId) redirect('/login')

  const fields = readPostFields(data)
  if (!fields) redirect('/board/new?error=invalid')

  let id: string
  try {
    id = await createPost({ ...fields, author: session.user.name ?? '익명', authorId })
  } catch {
    redirect('/board/new?error=unavailable')
  }

  revalidatePath('/board')
  redirect(`/board/${id}`)
}

export async function updatePostAction(data: FormData) {
  const session = await auth()
  const authorId = session?.user?.email
  if (!authorId) redirect('/login')

  const id = data.get('postId')
  if (!isPostId(id)) redirect('/board?error=invalid')
  const fields = readPostFields(data)
  if (!fields) redirect(`/board/${id}/edit?error=invalid`)

  let updated: boolean
  try {
    updated = await updateOwnedPost(id, authorId, fields)
  } catch {
    redirect(`/board/${id}/edit?error=unavailable`)
  }
  if (!updated) redirect('/board?error=forbidden')

  revalidatePath('/board')
  revalidatePath(`/board/${id}`)
  redirect(`/board/${id}`)
}

export async function deletePostAction(data: FormData) {
  const session = await auth()
  const authorId = session?.user?.email
  if (!authorId) redirect('/login')

  const id = data.get('postId')
  if (!isPostId(id)) redirect('/board?error=invalid')

  let deleted: boolean
  try {
    deleted = await deleteOwnedPost(id, authorId)
  } catch {
    redirect('/board?error=delete')
  }
  if (!deleted) redirect('/board?error=forbidden')

  revalidatePath('/board')
  revalidatePath(`/board/${id}`)
  redirect('/board?deleted=1')
}
