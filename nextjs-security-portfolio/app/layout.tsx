import type { Metadata } from 'next'
import { SiteHeader } from '@/components/SiteHeader'
import './globals.css'
import { ThemeInit } from '@/components/ThemeInit'
export const metadata: Metadata = {
  title: '박시우 | 2026 통합 포트폴리오',
  description: 'HTML·CSS·JavaScript부터 Next.js·데이터·보안까지, 박시우의 1·2학기 프로젝트와 학습 기록',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head><ThemeInit /></head>
      <body>
        <a href="#main-content" className="skip-link">본문 바로가기</a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="wrap border-t border-stroke mt-24 py-10 text-sm muted flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} 박시우 · 2026 통합 포트폴리오</span>
          <span>웹 기초 · 2학기 수업 실습 · 동아리 프로젝트</span>
        </footer>
      </body>
    </html>
  )
}
