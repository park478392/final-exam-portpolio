import { registerAction } from '@/lib/actions'
import { AccountForm } from '../login/_components/AccountForm'

export default async function Register({ searchParams }: {
  searchParams: Promise<{ error?: string | string[] }>
}) {
  const { error } = await searchParams
  let message: string | undefined

  if (error === 'unavailable') {
    message = '지금은 계정을 저장할 수 없습니다. 잠시 후 다시 시도해 주세요.'
  } else if (error === 'duplicate') {
    message = '이미 사용 중인 이메일입니다.'
  } else if (error === 'password-mismatch') {
    message = '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
  } else if (error === 'password-length') {
    message = '비밀번호는 최소 8자, UTF-8 기준 최대 72바이트여야 합니다.'
  } else if (typeof error === 'string' && error) {
    message = '닉네임은 2~50자로 입력하고 이메일 주소를 확인해 주세요.'
  }

  return <AccountForm mode="register" action={registerAction} error={message} />
}
