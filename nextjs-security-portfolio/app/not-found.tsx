import Link from 'next/link'
export default function NotFound() {
  return (
    <section className="wrap py-32 text-center">
      <p className="text-accent font-bold">404</p>
      <h1 className="text-3xl font-bold my-5">페이지를 찾을 수 없습니다.</h1>
      <Link href="/" className="button mt-4">
        홈으로 이동
      </Link>
    </section>
  )
}
