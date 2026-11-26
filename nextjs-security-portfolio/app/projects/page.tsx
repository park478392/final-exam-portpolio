import { ProjectCollection } from '@/components/ProjectCollection'
import styles from './projects.module.css'

export default function Projects() {
  return (
    <section className={'wrap editorial-page ' + styles.page}>
      <header className={'editorial-heading ' + styles.heading}>
        <p className="editorial-kicker">PROJECTS</p>
        <h1>프로젝트</h1>
        <p className="muted">기초 웹 실습에서 서버·데이터베이스·외부 API를 연결한 결과물까지 정리했습니다.</p>
      </header>
      <ProjectCollection />
    </section>
  )
}
