import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SubmitButton } from '@/components/SubmitButton'
import { connectDB } from '@/lib/mongodb'
import { isPostId } from '@/lib/posts'
import { Post } from '@/models/Post'
import { requireAdmin } from '../../../access'
import { deletePostAsAdmin } from '../../../actions'

export default async function ConfirmPostDeletion({ params }: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  if (!isPostId(id)) notFound()

  await connectDB()
  const post = await Post.findById(id, { title: 1, author: 1 }).maxTimeMS(5000).lean()
  if (!post) notFound()

  return (
    <section className="wrap py-8 sm:py-12">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">ADMIN</p>
        <h1 className="my-4 text-2xl font-bold">게시글 삭제 확인</h1>
        <form action={deletePostAsAdmin} className="panel grid gap-5 p-5 sm:p-7">
          <input type="hidden" name="postId" value={id} />
          <div className="wrap-anywhere">
            <p className="font-semibold">{post.title}</p>
            <p className="muted mt-1 text-sm">작성자 {post.author}</p>
          </div>
          <p className="text-rose-300 text-sm">이 글을 삭제하면 복구할 수 없습니다.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin#posts" className="button button-secondary">취소</Link>
            <SubmitButton label="게시글 삭제" />
          </div>
        </form>
      </div>
    </section>
  )
}
