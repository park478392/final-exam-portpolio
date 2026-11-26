'use client'

import { useId, useState } from 'react'
import styles from './account.module.css'

export function PasswordField({ registering, confirmation = false }: {
  registering: boolean
  confirmation?: boolean
}) {
  const [visible, setVisible] = useState(false)
  const id = useId()
  const label = confirmation ? '비밀번호 확인' : '비밀번호'
  const showHint = registering && !confirmation

  return (
    <div className={styles.label}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.password}>
        <input
          className="field"
          id={id}
          type={visible ? 'text' : 'password'}
          name={confirmation ? 'passwordConfirmation' : 'password'}
          autoComplete={registering ? 'new-password' : 'current-password'}
          minLength={registering ? 8 : undefined}
          aria-describedby={showHint ? id + '-hint' : undefined}
          required
        />
        <button
          type="button"
          className={styles.toggle}
          aria-controls={id}
          aria-label={label + (visible ? ' 숨기기' : ' 표시')}
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? '숨기기' : '표시'}
        </button>
      </div>
      {showHint && <p id={id + '-hint'} className="muted text-sm">최소 8자, UTF-8 기준 최대 72바이트로 입력해 주세요. 한글 음절은 보통 3바이트입니다.</p>}
    </div>
  )
}
