import { auth } from '@/auth'
import { getPost } from '@/lib/posts'
import { notFound, redirect } from 'next/navigation'
import { updatePostAction } from '../../actions'
import { PostForm } from '../../PostForm'

export default async function EditPost({ params, searchParams }: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string | string[] }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect('/login')
  const { id } = await params
  const post = await getPost(id)
  if (!post || post.authorId !== session.user.email) notFound()
  const { error } = await searchParams

  return (
    <section className="wrap py-14 sm:py-20">
      <p className="eyebrow">COMMUNITY</p>
      <h1 className="my-6 text-3xl font-bold sm:text-4xl">글 수정</h1>
      <PostForm action={updatePostAction} post={post} error={error} />
    </section>
  )
}
