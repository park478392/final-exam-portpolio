import Link from 'next/link'
import { loginAction } from '@/lib/actions'
import { SubmitButton } from '@/components/SubmitButton'
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; registered?: string }>
}) {
  const p = await searchParams
  return (
    <section className="wrap max-w-xl py-24">
      <p className="eyebrow">실습 게시판 계정</p>
      <h1 className="text-4xl font-bold my-8">로그인</h1>
      <p className="muted leading-7 mb-8">가입한 이메일로 로그인하면 게시판에 글을 작성할 수 있습니다.</p>
      {p.error && (
        <p role="alert" className="text-rose-300 panel p-4 mb-5">
          {p.error === 'unavailable' ? '지금은 로그인 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해 주세요.' : '이메일 또는 비밀번호가 올바르지 않습니다.'}
        </p>
      )}
      {p.registered && (
        <p className="text-accent mb-5">
          회원가입이 완료되었습니다. 로그인해 주세요.
        </p>
      )}
      <form action={loginAction} className="panel p-8 grid gap-5">
        <label className="grid gap-2">
          이메일
          <input type="email" className="field" name="email" autoComplete="email" maxLength={254} placeholder="name@example.com" required />
        </label>
        <label className="grid gap-2">
          비밀번호
          <input type="password" className="field" name="password" autoComplete="current-password" required />
        </label>
        <SubmitButton label="로그인" />
        <p className="text-sm muted">
          계정이 없다면{' '}
          <Link className="text-accent" href="/register">
            회원가입
          </Link>
        </p>
      </form>
    </section>
  )
}
