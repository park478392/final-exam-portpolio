import Link from 'next/link'
import { SubmitButton } from '@/components/SubmitButton'
import { PasswordField } from './PasswordField'
import styles from './account.module.css'

export function AccountForm({
  mode,
  action,
  error,
  notice,
}: {
  mode: 'login' | 'register'
  action: (formData: FormData) => Promise<void>
  error?: string
  notice?: string
}) {
  const registering = mode === 'register'
  const title = registering ? '회원가입' : '로그인'

  return (
    <section className={styles.account}>
      <header className="mb-6 text-center">
        <p className="eyebrow">ACCOUNT</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="muted mt-3 leading-7">
          {registering ? '게시판에 글을 남길 때 사용할 계정을 만들어 보세요.' : '로그인하고 게시판에 참여해 보세요.'}
        </p>
      </header>

      <form action={action} className={`panel ${styles.form}`}>
        {error && <p role="alert" className={`text-rose-300 ${styles.message}`}>{error}</p>}
        {notice && <p role="status" className={`text-accent ${styles.message}`}>{notice}</p>}

        {registering && (
          <label className={styles.label}>
            닉네임
            <input
              className="field"
              name="name"
              autoComplete="name"
              placeholder="게시판에서 사용할 닉네임"
              minLength={2}
              maxLength={50}
              required
            />
          </label>
        )}

        <label className={styles.label}>
          이메일
          <input
            type="email"
            className="field"
            name="email"
            autoComplete="email"
            maxLength={254}
            placeholder="name@example.com"
            required
          />
        </label>

        <PasswordField registering={registering} />
        {registering && <PasswordField registering confirmation />}

        <SubmitButton label={title} />

        {registering && (
          <p className="muted text-sm leading-6">
            닉네임과 작성한 글은 게시판에 공개됩니다. 이메일과 비밀번호는 계정 관리에 사용됩니다.{' '}
            <Link href="/register/privacy" className="text-accent underline underline-offset-4">개인정보 처리방침</Link>
          </p>
        )}
        <p className="muted text-center text-sm">
          {registering ? '이미 계정이 있다면 ' : '계정이 없다면 '}
          <Link className="text-accent font-semibold underline underline-offset-4" href={registering ? '/login' : '/register'}>
            {registering ? '로그인' : '회원가입'}
          </Link>
        </p>
      </form>
    </section>
  )
}
