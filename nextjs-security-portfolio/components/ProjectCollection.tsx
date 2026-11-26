'use client'

import { useState } from 'react'
import { portfolioProjects } from '@/lib/portfolio'
import { ProjectCard } from './ProjectCard'

const filters = ['전체', '1학기', '2학기', '개인', '팀', '수업'] as const

export function ProjectCollection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('전체')
  const results = portfolioProjects.filter(project =>
    filter === '전체' || project.semester === filter || project.kind === filter,
  )

  return (
    <>
      <div className="collection-toolbar">
        <div className="semester-tabs" role="group" aria-label="프로젝트 분류">
          {filters.map(option => (
            <button type="button" key={option} aria-pressed={filter === option} onClick={() => setFilter(option)}>
              {option}
            </button>
          ))}
        </div>
        <p className="muted text-sm" aria-live="polite">{results.length}개 프로젝트</p>
      </div>
      <div className="editorial-grid">
        {results.map((project, index) => (
          <ProjectCard key={project.slug} eager={index < 3} project={project} />
        ))}
      </div>
    </>
  )
}
