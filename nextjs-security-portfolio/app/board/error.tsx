'use client'
export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="wrap py-24 text-center">
      <h1 className="text-2xl font-bold">게시판을 불러오지 못했습니다.</h1>
      <p className="muted my-5">일시적으로 게시글을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</p>
      <button className="button cursor-pointer" onClick={() => reset()}>
        다시 시도
      </button>
    </section>
  )
}
