import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { createPostAction } from '../actions'
import { PostForm } from '../PostForm'

export default async function NewPost({ searchParams }: {
  searchParams: Promise<{ error?: string | string[] }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect('/login')
  const { error } = await searchParams

  return (
    <section className="wrap py-14 sm:py-20">
      <p className="eyebrow">COMMUNITY</p>
      <h1 className="my-6 text-3xl font-bold sm:text-4xl">글 작성</h1>
      <p className="muted mb-6 leading-7">의견이나 질문을 남겨 주세요. 게시글은 누구나 읽을 수 있습니다.</p>
      <PostForm action={createPostAction} error={error} />
    </section>
  )
}
