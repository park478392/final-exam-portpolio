import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import { auth } from '@/auth'
export const dynamic = 'force-dynamic'
export default async function Board() {
  const [postResult, session] = await Promise.all([
    getPosts().then(posts => ({ posts, available: true })).catch(() => ({ posts: [], available: false })),
    auth(),
  ])
  const { posts, available } = postResult
  return (
    <section className="wrap py-20">
      <p className="eyebrow">공부한 내용과 의견</p>
      <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
        <h1 className="text-4xl font-extrabold">실습 게시판</h1>
        {session?.user ? (
          <Link className="button" href="/board/new">
            새 글 작성 +
          </Link>
        ) : (
          <Link className="button button-secondary" href="/login">
            로그인 후 작성
          </Link>
        )}
      </div>
      <p className="muted my-8">
        실습 중 정리한 내용이나 프로젝트에 대한 의견을 남기는 공간입니다. 글은 누구나 읽을 수 있고, 작성하려면 로그인이 필요합니다.
      </p>
      <div className="grid gap-3">
        {!available ? <div role="status" className="panel p-8 sm:p-12"><h2 className="font-bold text-xl">게시판 연결을 기다리고 있습니다.</h2><p className="muted leading-7 mt-3">현재 게시글을 불러올 수 없습니다. 잠시 후 다시 방문해 주세요. 프로젝트와 학습 기록은 계속 볼 수 있습니다.</p><div className="flex flex-wrap gap-3 mt-6"><Link href="/board" className="button button-secondary">다시 불러오기</Link><Link href="/learning" className="button">학습 기록 보기</Link></div></div> : posts.length ? (
          posts.map((p) => (
            <Link
              href={`/board/${p.id}`}
              key={p.id}
              className="panel project-card p-6"
            >
              <div className="flex justify-between gap-4">
                <h2 className="font-bold text-lg">{p.title}</h2>
                <span className="text-accent">↗</span>
              </div>
              <p className="muted text-sm mt-3">
                {p.author} · {p.createdAt.slice(0, 10)}
              </p>
            </Link>
          ))
        ) : (
          <div className="panel p-10 text-center">
            <h2 className="font-bold text-xl">아직 등록된 글이 없습니다.</h2>
            <p className="muted mt-3 leading-7">실습에서 배운 내용이나 궁금한 점으로 첫 글을 남겨 주세요.</p>
            <Link className="button mt-6" href={session?.user ? '/board/new' : '/login'}>{session?.user ? '첫 글 작성하기' : '로그인하기'}</Link>
          </div>
        )}
      </div>
    </section>
  )
}
