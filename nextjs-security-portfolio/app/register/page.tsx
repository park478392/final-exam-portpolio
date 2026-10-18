import Link from 'next/link'
import { registerAction } from '@/lib/actions'
import { SubmitButton } from '@/components/SubmitButton'
export default async function Register({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  return (
    <section className="wrap max-w-xl py-24">
      <p className="eyebrow">실습 게시판 계정</p>
      <h1 className="text-4xl font-bold my-8">회원가입</h1>
      <p className="muted leading-7 mb-8">
        게시판에 글을 남길 때 사용할 계정입니다. 프로젝트와 학습 기록은 가입
        없이 볼 수 있습니다.
      </p>
      {error && (
        <p role="alert" className="text-rose-300 panel p-4 mb-5">
          {error === 'unavailable'
            ? '지금은 계정을 저장할 수 없습니다. 잠시 후 다시 시도해 주세요.'
            : error === 'duplicate'
              ? '이미 사용 중인 이메일입니다.'
              : '입력값을 확인해 주세요.'}
        </p>
      )}
      <form action={registerAction} className="panel p-8 grid gap-5">
        <label className="grid gap-2">
          이름
          <input
            className="field"
            name="name"
            autoComplete="name"
            placeholder="게시글에 표시할 이름"
            minLength={2}
            maxLength={50}
            required
          />
        </label>
        <label className="grid gap-2">
          이메일
          <input
            className="field"
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            placeholder="name@example.com"
            required
          />
        </label>
        <label className="grid gap-2">
          비밀번호 (8자 이상)
          <input
            className="field"
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
          />
        </label>
        <SubmitButton label="회원가입" />
        <p className="muted text-sm leading-6">
          비밀번호는 8~72자로 입력해 주세요. 작성한 글과 이름은 게시판에
          공개됩니다.
        </p>
        <p className="text-sm muted">
          이미 계정이 있다면{' '}
          <Link className="text-accent" href="/login">
            로그인
          </Link>
        </p>
      </form>
    </section>
  )
}
