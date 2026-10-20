'use client'
import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/lib/data'
import { firstSemesterWork } from '@/lib/semesters'
export function ProjectCollection() {
  const [semester, setSemester] = useState('전체')
  const works = [...projects.map(p => ({ ...p, semester: '2학기', detail: `/projects/${p.slug}`, launch: p.slug === 'class-practice' ? 'http://localhost:3002' : p.slug === 'football-data' ? 'http://localhost:3001' : p.slug === 'security-board' ? '/board' : undefined, launchLabel: p.slug === 'class-practice' ? '2학기 수업 사이트 열기 ↗' : p.slug === 'football-data' ? '축구 웹 열기 ↗' : '게시판 열기' })), ...firstSemesterWork.map(p => ({ ...p, semester: '1학기', status: '완료', detail: `/projects/${p.slug}`, launch: p.href, launchLabel: p.slug === 'security-team' ? '팀 활동 기록 ↗' : '실행하기 ↗' }))]
  const shown = works.filter(p => semester === '전체' || p.semester === semester)
  return <><div className="collection-toolbar"><div className="semester-tabs" aria-label="프로젝트 학기 선택">{['전체', '1학기', '2학기'].map(s => <button key={s} type="button" aria-pressed={semester === s} onClick={() => setSemester(s)}>{s}</button>)}</div><p className="muted text-sm" aria-live="polite">{shown.length}개 프로젝트</p></div><div className="grid md:grid-cols-2 gap-5">{shown.map(p => <article key={p.slug} className="panel tidy-project"><div className="flex justify-between gap-3 text-xs"><span className="text-accent">{p.semester} · {p.category}</span><span className="muted shrink-0">{p.status}</span></div><h2 className="text-2xl font-bold mt-5"><Link href={p.detail}>{p.title}</Link></h2><p className="muted mt-3 leading-7">{p.summary}</p><div className="flex flex-wrap gap-2 mt-5">{p.stack.map(s => <span className="chip" key={s}>{s}</span>)}</div><div className="project-actions"><Link href={p.detail} className="text-accent text-sm font-bold">상세 보기 →</Link>{p.launch && (p.launch === '/board' ? <Link href={p.launch} className="button button-secondary">{p.launchLabel}</Link> : <a href={p.launch} className="button button-secondary" target="_blank" rel="noreferrer">{p.launchLabel}</a>)}</div></article>)}</div></>
}
