import Link from 'next/link'
import { auth } from '@/auth'
import { logoutAction } from '@/lib/actions'
import { MainNav } from '@/components/MainNav'
export async function SiteHeader() {
  const session = await auth()
  return (
    <header className="border-b border-stroke/70 sticky top-0 z-20 backdrop-blur-xl bg-ink/90">
      <div className="wrap site-header-inner">
        <Link href="/" className="font-extrabold tracking-tight text-lg">
          박시우<span className="text-accent">.</span><span className="text-xs font-normal muted ml-3">2026 PORTFOLIO</span>
        </Link>
        <MainNav />
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          {session?.user ? (
            <form action={logoutAction}>
              <button className="text-accent cursor-pointer">로그아웃</button>
            </form>
          ) : (
            <Link className="text-accent" href="/login">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
