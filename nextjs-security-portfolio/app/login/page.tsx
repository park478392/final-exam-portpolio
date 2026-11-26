import { loginAction } from '@/lib/actions'
import { AccountForm } from './_components/AccountForm'

export default async function Login({ searchParams }: {
  searchParams: Promise<{ error?: string | string[]; registered?: string | string[] }>
}) {
  const { error, registered } = await searchParams
  const message = error === 'unavailable'
    ? '지금은 로그인 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해 주세요.'
    : typeof error === 'string' && error
      ? '이메일 또는 비밀번호가 올바르지 않습니다.'
      : undefined

  return (
    <AccountForm
      mode="login"
      action={loginAction}
      error={message}
      notice={registered === '1' ? '회원가입이 완료되었습니다. 로그인해 주세요.' : undefined}
    />
  )
}
