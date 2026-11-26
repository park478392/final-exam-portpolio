export default function Loading() {
  return (
    <section className="wrap py-14 sm:py-20" aria-busy="true">
      <p className="eyebrow">COMMUNITY</p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">게시판</h1>
      <div className="panel mt-7 min-h-64 p-5">
        <p role="status" className="muted text-sm">게시글을 불러오는 중입니다.</p>
      </div>
    </section>
  )
}
