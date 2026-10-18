'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const links = [{href:'/',label:'홈'},{href:'/about',label:'소개'},{href:'/projects',label:'프로젝트·기록'},{href:'/board',label:'게시판'}]
export function MainNav() {
  const pathname = usePathname()
  return <nav aria-label="주 메뉴" className="main-nav">{links.map(l => {
    const active = l.href === '/' ? pathname === '/' : pathname === l.href || pathname.startsWith(`${l.href}/`)
    return <Link key={l.href} href={l.href} aria-current={active ? 'page' : undefined}>{l.label}</Link>
  })}</nav>
}
