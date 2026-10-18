'use client'
import { useFormStatus } from 'react-dom'
export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      type="submit"
      className="button disabled:opacity-50 cursor-pointer"
    >
      {pending ? '처리 중...' : label}
    </button>
  )
}
