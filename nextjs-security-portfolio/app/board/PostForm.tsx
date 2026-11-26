import Link from 'next/link'
import { SubmitButton } from '@/components/SubmitButton'
import { boardCategories, defaultBoardCategory, type BoardCategory } from '@/lib/board-categories'

export function PostForm({
  action,
  post,
  error,
}: {
  action: (data: FormData) => Promise<void>
  post?: { id: string; title: string; content: string; category: BoardCategory }
  error?: string | string[]
}) {
  return (
    <>
      {error === 'unavailable' && (
        <p role="alert" className="text-rose-300 mb-5">글을 저장하지 못했습니다. 연결을 확인한 후 다시 시도해 주세요.</p>
      )}
      {error === 'invalid' && (
        <p role="alert" className="text-rose-300 mb-5">카테고리를 선택하고 제목은 2~120자, 내용은 5~10,000자로 입력해 주세요.</p>
      )}
      <form action={action} className="panel grid gap-5 p-5 sm:p-8">
        {post && <input type="hidden" name="postId" value={post.id} />}
        <label className="grid gap-2">
          카테고리
          <select required name="category" className="field sm:w-56" defaultValue={post?.category ?? defaultBoardCategory}>
            {boardCategories.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          제목
          <input required minLength={2} maxLength={120} name="title" className="field" defaultValue={post?.title} />
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
            aria-describedby="post-content-hint"
            defaultValue={post?.content}
          />
          <span id="post-content-hint" className="muted text-sm">Markdown으로 소제목, 목록, 코드 블록을 작성할 수 있습니다.</span>
        </label>
        <div className="flex flex-wrap gap-3">
          <SubmitButton label={post ? '수정 저장' : '게시글 저장'} />
          <Link href={post ? `/board/${post.id}` : '/board'} className="button button-secondary">취소</Link>
        </div>
      </form>
    </>
  )
}
