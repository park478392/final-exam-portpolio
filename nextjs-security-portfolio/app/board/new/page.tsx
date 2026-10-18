import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { createPostAction } from '@/lib/actions'
import { SubmitButton } from '@/components/SubmitButton'
export default async function NewPost({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')
  const { error } = await searchParams
  return (
    <section className="wrap max-w-3xl py-20">
      <p className="eyebrow">실습 게시판</p>
      <h1 className="text-4xl font-bold my-7">새 글 작성</h1>
      <p className="muted leading-7 mb-6">공부한 내용이나 프로젝트에 대한 의견을 남겨 주세요. 작성한 글은 공개되니 개인정보와 비밀번호는 적지 마세요.</p>
      {error && (
        <p role="alert" className="text-rose-300 mb-5">
          {error === 'unavailable' ? '글을 저장하지 못했습니다. 연결이 복구된 후 다시 시도해 주세요.' : '제목은 2~120자, 내용은 5~10,000자로 입력해 주세요.'}
        </p>
      )}
      <form action={createPostAction} className="panel p-8 grid gap-5">
        <label className="grid gap-2">
          제목
          <input
            required
            minLength={2}
            maxLength={120}
            name="title"
            className="field"
          />
        </label>
        <label className="grid gap-2">
          내용
          <textarea
            required
            minLength={5}
            maxLength={10000}
            name="content"
            rows={10}
            className="field"
          />
        </label>
        <div>
          <SubmitButton label="게시글 저장" />
        </div>
      </form>
    </section>
  )
}
