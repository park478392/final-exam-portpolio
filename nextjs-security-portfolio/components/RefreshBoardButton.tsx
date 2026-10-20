'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function RefreshBoardButton() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return <button type="button" className="button button-secondary" disabled={pending} aria-busy={pending} onClick={() => startTransition(() => router.refresh())}>{pending ? '불러오는 중…' : '다시 불러오기'}</button>
}
