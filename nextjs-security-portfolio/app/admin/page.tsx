import type { Metadata } from 'next'
import Link from 'next/link'
import { getRole } from '@/auth'
import { requireAdmin } from './access'
import { readAdminLists } from './data'
import styles from './admin.module.css'

export const metadata: Metadata = { title: '관리자' }

const messages = {
  invalid: '올바르지 않은 게시글입니다.',
  missing: '이미 삭제되었거나 존재하지 않는 글입니다.',
  delete: '게시글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.',
}

function pageNumber(value: unknown) {
  return typeof value === 'string' && /^[1-9]\d{0,8}$/.test(value) ? Number(value) : 1
}

function ListPagination({ page, pages, label, href }: {
  page: number
  pages: number
  label: string
  href: (page: number) => string
}) {
  if (pages <= 1) return null
  return (
    <nav aria-label={label} className="mt-3 flex flex-wrap items-center justify-end gap-3 text-sm">
      {page > 1 && <Link className="text-accent underline" href={href(page - 1)}>이전</Link>}
      <span className="muted">{page} / {pages} 페이지</span>
      {page < pages && <Link className="text-accent underline" href={href(page + 1)}>다음</Link>}
    </nav>
  )
}

function DateCell({ date }: { date?: Date }) {
  if (!date) return <span className="muted">—</span>
  const day = date.toISOString().slice(0, 10)
  return <time dateTime={day}>{day}</time>
}

export default async function AdminPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await requireAdmin()

  const query = await searchParams
  const lists = await readAdminLists(pageNumber(query.members), pageNumber(query.posts)).catch(() => null)
  const notice = typeof query.error === 'string' && Object.hasOwn(messages, query.error)
    ? messages[query.error as keyof typeof messages]
    : undefined

  return (
    <section className="wrap py-8 sm:py-12">
      <p className="eyebrow">ADMIN</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">관리자</h1>
      <p className="muted my-5">회원 정보를 확인하고 게시판을 관리합니다.</p>
      {notice && <p role="alert" className="mb-4 text-rose-300">{notice}</p>}
      {query.deleted === '1' && <p role="status" className="mb-4 text-accent">게시글을 삭제했습니다.</p>}
      {!lists ? (
        <div role="alert" className="panel p-5">
          <p className="mb-3">관리자 목록을 불러오지 못했습니다.</p>
          <Link className="text-accent underline" href="/admin">다시 불러오기</Link>
        </div>
      ) : (
        <>
          <dl className="flex flex-wrap gap-x-8 gap-y-2 border-y border-stroke py-4">
            <div className="flex items-baseline gap-2">
              <dt className="muted text-sm">전체 회원</dt>
              <dd className="font-semibold">{lists.memberCount.toLocaleString('ko-KR')}명</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="muted text-sm">전체 게시글</dt>
              <dd className="font-semibold">{lists.postCount.toLocaleString('ko-KR')}개</dd>
            </div>
          </dl>

          <section className="mt-8" id="members" aria-labelledby="members-title">
            <h2 id="members-title" className="mb-3 text-xl font-semibold">회원 목록</h2>
            <div className={`panel ${styles.tableFrame}`}>
              <table className={styles.table} aria-label="회원 목록">
                <thead>
                  <tr><th scope="col">닉네임</th><th scope="col">이메일</th><th scope="col">가입일</th><th scope="col">역할</th></tr>
                </thead>
                <tbody>
                  {lists.members.map((member) => (
                    <tr key={String(member._id)}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td><DateCell date={member.createdAt} /></td>
                      <td>{getRole(member.email) === 'admin' ? '관리자' : '일반 사용자'}</td>
                    </tr>
                  ))}
                  {!lists.members.length && <tr><td colSpan={4}>등록된 회원이 없습니다.</td></tr>}
                </tbody>
              </table>
            </div>
            <ListPagination
              label="회원 목록 페이지"
              page={lists.currentMemberPage}
              pages={lists.memberPages}
              href={(page) => `/admin?members=${page}&posts=${lists.currentPostPage}#members`}
            />
          </section>

          <section className="mt-8" id="posts" aria-labelledby="posts-title">
            <h2 id="posts-title" className="mb-3 text-xl font-semibold">게시글 목록</h2>
            <div className={`panel ${styles.tableFrame}`}>
              <table className={styles.table} aria-label="게시글 목록">
                <thead>
                  <tr><th scope="col">제목</th><th scope="col">작성자</th><th scope="col">작성일</th><th scope="col">관리</th></tr>
                </thead>
                <tbody>
                  {lists.posts.map((post) => {
                    const id = String(post._id)
                    return (
                      <tr key={id}>
                        <td><Link href={`/board/${id}`} className="font-medium hover:underline">{post.title}</Link></td>
                        <td>{post.author}</td>
                        <td><DateCell date={post.createdAt} /></td>
                        <td>
                          <Link
                            href={`/admin/posts/${id}/delete`}
                            className="text-rose-300 underline underline-offset-4"
                            aria-label={`${post.title} 삭제 확인`}
                          >
                            삭제
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                  {!lists.posts.length && <tr><td colSpan={4}>등록된 게시글이 없습니다.</td></tr>}
                </tbody>
              </table>
            </div>
            <ListPagination
              label="게시글 목록 페이지"
              page={lists.currentPostPage}
              pages={lists.postPages}
              href={(page) => `/admin?members=${lists.currentMemberPage}&posts=${page}#posts`}
            />
          </section>
        </>
      )}
    </section>
  )
}
