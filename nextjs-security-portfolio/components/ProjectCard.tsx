import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioProject } from '@/lib/portfolio'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project, eager = false }: { project: PortfolioProject; eager?: boolean }) {
  const features = project.cardFeatures ?? project.features?.slice(0, 2)
  const stack = project.cardStack ?? project.stack?.slice(0, 5)
  const run = project.demo ?? project.local
  return (
    <article className={'editorial-project ' + styles.card}>
      <Link href={`/projects/${project.slug}`} className="editorial-preview" aria-label={project.title + ' 상세 보기'}>
        {project.image ? (
          <Image src={project.image} alt={project.title + ' 실행 화면'} fill sizes="(max-width: 639px) 95vw, (max-width: 1023px) 48vw, 370px" loading={eager ? 'eager' : 'lazy'} style={{ objectFit: project.imageFit }} data-preview={project.slug} />
        ) : <span>{project.slug === 'opportunity-web' ? '개발 진행 중' : '실행 화면 추가 예정'}</span>}
      </Link>
      <div className="editorial-project-body">
        <p className="editorial-kicker">{project.semester} · {project.kind} · {project.status}{project.deployment === '미배포' && ' · 미배포'}</p>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p className="muted">{project.summary}</p>
        {features && <ul className="editorial-bullets">
          {features.map(feature => <li key={feature}>{feature}</li>)}
        </ul>}
        {project.technologyGroups && !project.cardStack ? (
          <dl className="space-y-1.5">
            {project.technologyGroups.map(group => (
              <div key={group.label}>
                <dt className="muted text-xs">{group.label}</dt>
                <dd><ul className="editorial-project-tags">
                  {group.tools.map(technology => <li key={technology}>{technology}</li>)}
                </ul></dd>
              </div>
            ))}
          </dl>
        ) : stack && (
          <ul className="editorial-project-tags" aria-label="핵심 기술">
            {stack.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
        )}
        <div className="editorial-actions">
          <Link className="button button-secondary" href={`/projects/${project.slug}`}>상세 보기</Link>
          {project.github && <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer">GitHub 소스 코드 보기 ↗</a>}
          {run && <a className="button" href={run.url} target="_blank" rel="noreferrer">{run.label} ↗</a>}
        </div>
      </div>
    </article>
  )
}
