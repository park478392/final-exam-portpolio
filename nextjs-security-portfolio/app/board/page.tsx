import Link from 'next/link'
import { auth } from '@/auth'
import { RefreshBoardButton } from '@/components/RefreshBoardButton'
import { boardCategories, boardCategoryLabel, isBoardCategory } from '@/lib/board-categories'
import { getPosts, isBoardSearchField } from '@/lib/posts'
import styles from './board.module.css'

export const dynamic = 'force-dynamic'

type BoardQuery = Record<string, string | string[] | undefined>

const errors: Record<string, string> = {
  forbidden: '게시글이 없거나 작성자만 수정·삭제할 수 있습니다.',
  invalid: '올바르지 않은 게시글입니다.',
  delete: '글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.',
}

export default async function Board({ searchParams }: {
  searchParams: Promise<BoardQuery>
}) {
  const params = await searchParams
  const category = isBoardCategory(params.category) ? params.category : undefined
  const field = isBoardSearchField(params.field) ? params.field : 'title'
  const query = typeof params.q === 'string' ? params.q.trim().slice(0, 120) : ''
  const page = typeof params.page === 'string' && /^[1-9]\d{0,8}$/.test(params.page)
    ? Number(params.page)
    : 1
  const flashError = typeof params.error === 'string' && Object.hasOwn(errors, params.error)
    ? errors[params.error]
    : undefined

  function boardHref(nextCategory: typeof category, nextPage = 1) {
    const url = new URLSearchParams()
    if (nextCategory) url.set('category', nextCategory)
    if (query) {
      url.set('field', field)
      url.set('q', query)
    }
    if (nextPage > 1) url.set('page', String(nextPage))
    return url.size ? `/board?${url}` : '/board'
  }

  const [result, session] = await Promise.all([
    getPosts({ category, field, query, page }).catch((error: unknown) => {
      const code = error && typeof error === 'object' && 'code' in error ? error.code : undefined
      console.error('Board post query failed', {
        type: error instanceof Error ? error.name : 'UnknownError',
        code: typeof code === 'number' || typeof code === 'string' ? code : undefined,
      })
      return null
    }),
    auth(),
  ])
  const canWrite = Boolean(session?.user?.email)
  const categories = [{ value: undefined, label: '전체' }, ...boardCategories]
  const activePage = result?.currentPage ?? 1
  const lastPage = result?.pageCount ?? 1
  const startPage = Math.max(1, Math.min(activePage - 2, lastPage - 4))
  const pageNumbers = Array.from(
    { length: Math.min(5, lastPage) },
    (_, index) => startPage + index,
  )

  return (
    <section className="wrap pt-6 pb-14 sm:pt-11 sm:pb-20">
      <p className="eyebrow">COMMUNITY</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">게시판</h1>
        <Link className="button" href={canWrite ? '/board/new' : '/login'}>
          {canWrite ? '글 작성' : '로그인 후 작성'}
        </Link>
      </div>
      <p className="muted mt-[18px] mb-7 leading-7">
        프로젝트에 대한 의견과 질문, 자유로운 이야기를 나누는 공간입니다. 게시글은 누구나 읽을 수 있으며, 작성하려면 로그인이 필요합니다.
      </p>
      {flashError && <p role="alert" className="mb-5 text-rose-300">{flashError}</p>}
      {params.deleted === '1' && <p role="status" className="muted mb-5">글이 삭제되었습니다.</p>}

      <nav aria-label="게시글 카테고리" className={styles.categories}>
        {categories.map(({ value, label }) => (
          <Link
            key={label}
            href={boardHref(value)}
            aria-current={category === value ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      {result ? (
        <>
          <p className="muted mb-2 text-sm">게시글 {result.total.toLocaleString('ko-KR')}개</p>
          <div className={styles.tablePanel}>
            <table className={styles.table}>
              <caption className="sr-only">게시글 목록</caption>
              <colgroup>
                <col className={styles.sideColumn} style={{ width: '5rem' }} />
                <col />
                <col className={styles.sideColumn} style={{ width: '10rem' }} />
                <col className={styles.sideColumn} style={{ width: '8rem' }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className={styles.desktopOnly}>번호</th>
                  <th scope="col">제목</th>
                  <th scope="col" className={styles.desktopOnly}>작성자</th>
                  <th scope="col" className={styles.desktopOnly}>작성일</th>
                </tr>
              </thead>
              <tbody>
                {result.posts.map((post, index) => {
                  const number = result.total - result.offset - index
                  const date = post.createdAt.slice(0, 10)
                  return (
                    <tr key={post.id}>
                      <td className={styles.desktopOnly}>{number}</td>
                      <td>
                        <div className={styles.subject}>
                          <span className={styles.category}>{boardCategoryLabel(post.category)}</span>
                          <Link className={styles.title} href={`/board/${post.id}`}>{post.title}</Link>
                        </div>
                        <div className={`muted ${styles.mobileMeta}`}>
                          <span><span className="sr-only">번호 </span>{number}</span>
                          <span><span className="sr-only">작성자 </span>{post.author}</span>
                          <time dateTime={date}>{date}</time>
                        </div>
                      </td>
                      <td className={styles.desktopOnly}>{post.author}</td>
                      <td className={styles.desktopOnly}><time dateTime={date}>{date}</time></td>
                    </tr>
                  )
                })}
                {!result.posts.length && (
                  <tr className={styles.empty}>
                    <td colSpan={4}>{query ? '검색 결과가 없습니다.' : '등록된 게시글이 없습니다.'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {lastPage > 1 && (
            <nav aria-label="게시판 페이지" className={styles.pagination}>
              {activePage > 1 && <Link href={boardHref(category, activePage - 1)}>이전</Link>}
              {pageNumbers.map((number) => (
                <Link
                  key={number}
                  aria-current={activePage === number ? 'page' : undefined}
                  aria-label={`${number}페이지`}
                  href={boardHref(category, number)}
                >
                  {number}
                </Link>
              ))}
              {activePage < lastPage && <Link href={boardHref(category, activePage + 1)}>다음</Link>}
            </nav>
          )}
        </>
      ) : (
        <div role="status" className="panel p-8 sm:p-12">
          <h2 className="text-lg font-semibold">게시글을 불러오지 못했습니다.</h2>
          <p className="muted my-4">연결을 확인한 후 다시 불러와 주세요.</p>
          <RefreshBoardButton />
        </div>
      )}

      <form action="/board" method="get" role="search" aria-label="게시글 검색" className={styles.search}>
        {category && <input type="hidden" name="category" value={category} />}
        <label>
          <span className="sr-only">검색 기준</span>
          <select name="field" className="field" defaultValue={field}>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="author">작성자</option>
          </select>
        </label>
        <label className={styles.query}>
          <span className="sr-only">검색어</span>
          <input type="search" name="q" className="field" maxLength={120} defaultValue={query} placeholder="검색어 입력" />
        </label>
        <button type="submit" className="button">검색</button>
        {query && (
          <Link className="text-accent text-sm underline" href={category ? `/board?category=${category}` : '/board'}>
            검색 초기화
          </Link>
        )}
      </form>
    </section>
  )
}
