import { getPost } from '@/lib/posts'
import { boardCategoryLabel } from '@/lib/board-categories'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Markdown from 'react-markdown'
import { auth } from '@/auth'
import { DeletePostButton } from '@/components/DeletePostButton'
import styles from './post.module.css'

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [post, session] = await Promise.all([getPost(id), auth()])
  if (!post) notFound()
  const email = session?.user?.email
  const isAuthor = Boolean(email && email === post.authorId)
  const publishedDate = post.createdAt.slice(0, 10)

  return (
    <section className="wrap py-14 sm:py-20">
      <Link className="text-accent text-sm" href="/board">← 게시판</Link>
      <p className="eyebrow mt-8">{boardCategoryLabel(post.category)}</p>
      <h1 className="mt-3 text-2xl font-semibold leading-snug wrap-anywhere sm:text-3xl">{post.title}</h1>
      <p className="muted my-5 text-sm wrap-anywhere">
        {post.author} · <time dateTime={publishedDate}>{publishedDate}</time>
      </p>
      <div className={`panel min-h-56 p-5 sm:p-8 ${styles.content}`}>
        <Markdown components={{ h1: ({ children }) => <h2>{children}</h2> }}>
          {post.content}
        </Markdown>
      </div>
      {isAuthor && (
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/board/${post.id}/edit`} className="button button-secondary">글 수정</Link>
          <DeletePostButton postId={post.id} />
        </div>
      )}
    </section>
  )
}
