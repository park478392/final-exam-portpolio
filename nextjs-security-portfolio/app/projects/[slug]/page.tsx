import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { portfolioProjects, type PortfolioProject } from '@/lib/portfolio'
import { CertificateDialog } from '@/components/CertificateDialog'

export function generateStaticParams() {
  return portfolioProjects.map(project => ({ slug: project.slug }))
}

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug === 'security-board') redirect('/board')
  const project = portfolioProjects.find(item => item.slug === slug)
  if (!project) notFound()
  const isCoursework = project.kind === '수업'
  const sections: PortfolioProject['sections'] = [
    ...project.sections.filter(section => section.beforeFeatures),
    ...(project.features ? [{ title: isCoursework ? '주요 실습 내용' : '주요 구현 기능', items: project.features }] : []),
    ...project.sections.filter(section => !section.beforeFeatures),
  ]

  return (
    <article className="wrap editorial-page">
      <Link href="/projects" className="editorial-link">← 프로젝트 목록</Link>
      <header className="editorial-heading mt-5">
        <p className="editorial-kicker">{project.semester} · {isCoursework ? '수업 실습' : project.kind + ' 프로젝트'}</p>
        <h1>{project.title}</h1>
        <p className="muted">{project.summary}</p>
      </header>
      <dl className="editorial-facts">
        <div><dt>상태</dt><dd>{project.status}</dd></div>
        {project.period && <div><dt>개발 기간</dt><dd>{project.period}</dd></div>}
        {project.role && <div><dt>{isCoursework ? '실습 방식' : '담당 역할'}</dt><dd>{project.role}</dd></div>}
        {project.deployment && <div><dt>배포</dt><dd>{project.deployment}</dd></div>}
        {project.technologyGroups ? project.technologyGroups.map(group => (
          <div key={group.label}><dt>{group.label} 기술</dt><dd>{group.tools.join(' · ')}</dd></div>
        )) : project.stack && <div><dt>사용 기술</dt><dd>{project.stack.join(' · ')}</dd></div>}
        {project.achievement && <div><dt>활용 성과</dt><dd>{project.achievement}</dd></div>}
      </dl>
      {(project.github || project.local || project.demo) && <div className="editorial-actions mt-5">
        {project.github && <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer">GitHub 소스 코드 보기 ↗</a>}
        {project.demo && <a className="button" href={project.demo.url} target="_blank" rel="noreferrer">{project.demo.label} ↗</a>}
        {project.local && <a className={project.demo ? 'editorial-link' : 'button'} href={project.local.url} target="_blank" rel="noreferrer">{project.local.label} ↗</a>}
      </div>}
      {project.screenshots ? <section className="editorial-section">
        <h2>{slug === 'portfolio' ? '1학기와 2학기 화면 비교' : '실제 실행 화면'}</h2>
        <div className={slug === 'portfolio' ? 'editorial-pair' : undefined}>
          {project.screenshots.map(shot => <figure key={shot.src} className="editorial-shot">
            <Image src={shot.src} alt={shot.caption} width={shot.width} height={shot.height}
              sizes={slug === 'portfolio' ? '(max-width: 639px) 90vw, (max-width: 1110px) 45vw, 520px' : '(max-width: 900px) calc(100vw - 48px), 850px'} />
            <figcaption className="muted">{shot.caption}</figcaption>
          </figure>)}
        </div>
      </section> : project.image && <figure className="editorial-shot">
        <Image src={project.image} alt={project.title + ' 화면'} width={1440} height={810} sizes="(max-width: 1024px) 95vw, 1060px" />
        <figcaption className="muted">프로젝트 화면</figcaption>
      </figure>}
      <div className="editorial-reading">
        {sections.map(section => <section className="editorial-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.text && <p>{section.text}</p>}
          {section.items && <ul className="editorial-bullets">{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
          {section.files && <pre className="editorial-code"><code>{section.files.join('\n')}</code></pre>}
          {project.slug === 'network-cbt' && section.title === '활용 결과' && <CertificateDialog />}
        </section>)}
        {project.questionSource && <section className="editorial-section">
          <h2>기출문제 출처</h2>
          <a className="editorial-link" href={project.questionSource.url} target="_blank" rel="noreferrer">{project.questionSource.label} ↗</a>
        </section>}
        {project.semester === '1학기' && <Link className="editorial-link inline-block mt-5" href="/learning#web">1학기 웹 개발 실습 →</Link>}
      </div>
    </article>
  )
}
