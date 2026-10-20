'use client'

import { useFormStatus } from 'react-dom'
import { deletePostAction } from '@/lib/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="button button-secondary text-rose-300" disabled={pending}>
      {pending ? '삭제 중…' : '글 삭제'}
    </button>
  )
}

export function DeletePostButton({ postId }: { postId: string }) {
  return (
    <form
      action={deletePostAction}
      className="mt-6"
      onSubmit={(event) => {
        if (!window.confirm('이 글을 삭제하시겠습니까? 삭제한 글은 복구할 수 없습니다.')) {
          event.preventDefault()
        }
      }}
    >
      <input type="hidden" name="postId" value={postId} />
      <SubmitButton />
    </form>
  )
}
