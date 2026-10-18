import { getPost } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const p = await getPost(id)
  if (!p) notFound()
  return (
    <section className="wrap max-w-4xl py-20">
      <Link className="text-accent text-sm" href="/board">
        ← 게시판
      </Link>
      <p className="eyebrow mt-14">BOARD / POST</p>
      <h1 className="text-4xl font-extrabold mt-4">{p.title}</h1>
      <p className="muted text-sm my-6">
        {p.author} · {p.createdAt.slice(0, 10)}
      </p>
      <div className="panel p-8 whitespace-pre-wrap leading-8 min-h-64">
        {p.content}
      </div>
    </section>
  )
}
