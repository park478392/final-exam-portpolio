import { projects } from '@/lib/data'
import { projectNotes } from '@/lib/notes'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { firstSemesterWork } from '@/lib/semesters'
type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return [...projects, ...firstSemesterWork].map(p => ({ slug: p.slug })) }
export default async function ProjectDetails({ params }: Props) {
  const { slug } = await params
  const first = firstSemesterWork.find(p => p.slug === slug)
  if (first) return <section className="wrap max-w-4xl py-20"><Link href="/projects" className="text-accent text-sm">← 프로젝트 목록</Link><p className="eyebrow mt-10">1학기 · {first.category}</p><h1 className="text-3xl sm:text-5xl font-bold mt-5">{first.title}</h1><p className="muted text-lg leading-8 mt-6">{first.summary}</p><div className="flex flex-wrap gap-2 mt-6">{first.stack.map(s => <span className="chip" key={s}>{s}</span>)}</div>{first.image && <Image src={first.image} alt="사이버 보안 교육 팀 프로젝트 화면" width={1200} height={750} className="w-full h-auto rounded-lg border border-stroke mt-10" />}<section className="panel p-8 mt-10"><h2 className="text-2xl font-bold mb-5">{slug === 'security-team' ? '내가 담당한 기능과 역할' : '직접 구현한 기능'}</h2><ul className="grid gap-4">{first.features.map(f => <li key={f}>· {f}</li>)}</ul></section>{slug === 'security-team' && <p className="muted leading-8 mt-7">피싱, 랜섬웨어, OWASP Top 10, 보안 수칙을 안내하는 팀 프로젝트입니다. 팀원들과 페이지별 역할을 나누었고, 저는 보안 수칙과 사용자 인터랙션 구현을 담당했습니다. 아래에서 당시 정리한 팀 소개와 역할 분담을 확인할 수 있습니다.</p>}<div className="flex flex-wrap gap-3 mt-8"><a href={first.href} target="_blank" rel="noreferrer" className="button">{slug === 'security-team' ? '팀 프로젝트 기록 보기' : '프로젝트 실행하기'} ↗</a>{first.github && <a href={first.github} target="_blank" rel="noreferrer" className="button button-secondary">GitHub 코드 ↗</a>}<Link href="/projects#semester-1" className="button button-secondary">1학기 학습 기록</Link></div></section>
  const p = projects.find(p => p.slug === slug)
  if (!p) notFound()
  const notes = projectNotes[slug]
  return <section className="wrap max-w-4xl py-16 sm:py-20">
    <Link href="/projects" className="text-accent text-sm">← 프로젝트 목록</Link>
    <p className="eyebrow mt-12">프로젝트 {p.number} · {p.status}</p>
    <h1 className="text-3xl sm:text-5xl font-bold mt-5">{p.title}</h1>
    <p className="muted text-lg leading-8 mt-6">{p.details}</p>
    <div className="flex flex-wrap gap-2 mt-6">{p.stack.map(s => <span className="chip" key={s}>{s}</span>)}</div>
    <section className="mt-12"><h2 className="section-title mb-4">프로젝트 목적</h2><p className="muted leading-8">{notes.purpose}</p></section>
    <div className="grid md:grid-cols-2 gap-6 mt-10">
      <section className="panel p-6 sm:p-8"><h2 className="text-xl font-bold mb-5">{slug === 'football-data' ? '구현 목표' : '주요 기능'}</h2><ul className="grid gap-4">{p.features.map(f => <li className="leading-7" key={f}>· {f}</li>)}</ul></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-xl font-bold mb-5">동작 흐름</h2><ol className="grid gap-4">{notes.flow.map((step, i) => <li className="flex gap-3 leading-7" key={step}><span className="text-accent font-bold">{i + 1}.</span><span>{step}</span></li>)}</ol></section>
    </div>
    <section className="mt-10 border-t border-stroke pt-8"><h2 className="text-xl font-bold mb-4">구현에서 다룬 내용</h2><p className="muted leading-8">{notes.focus}</p></section>
    <section className="mt-8"><h2 className="text-xl font-bold mb-4">현재 범위와 다음 과제</h2><p className="muted leading-8">{notes.next}</p></section>
    {slug === 'class-practice' && <a className="button mt-8" href="http://localhost:3002" target="_blank" rel="noreferrer">2학기 수업 사이트 열기 ↗</a>}
    {slug === 'security-board' && <Link className="button mt-8" href="/board">게시판 열기 →</Link>}
    {slug === 'football-data' && <a className="button mt-8" href="http://localhost:3001" target="_blank" rel="noreferrer">축구 웹 열기 ↗</a>}
    {slug === 'portfolio' && <Link className="button mt-8" href="/projects#semester-1">학습 기록 읽기 →</Link>}
  </section>
}
