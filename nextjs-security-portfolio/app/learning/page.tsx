import Link from 'next/link'
import Image from 'next/image'
import { Binary, Cable, Code2, FileKey, Fingerprint, KeyRound, Layers3, ShieldCheck, Sparkles } from 'lucide-react'
import { practices, skillGroups } from '@/lib/practices'
import { firstSemesterLessons } from '@/lib/semesters'
import styles from './learning.module.css'

const practiceIcons = {
  jwt: ShieldCheck,
  'digital-forensics': Fingerprint,
  lora: Sparkles,
  fernet: KeyRound,
}

const brands: Partial<Record<string, string>> = {
  HTML: 'html5.svg', CSS: 'css3.svg', JavaScript: 'javascript.svg',
  TypeScript: 'typescript.svg', React: 'react.svg', 'Next.js': 'nextjs.svg',
  'Node.js': 'nodejs.svg', Express: 'express.svg', MongoDB: 'mongodb.svg', Mongoose: 'mongoose.svg',
  'Auth.js': 'authjs.webp', JWT: 'jsonwebtokens.svg', 'Google Colab': 'googlecolab.svg', RSS: 'rss.svg',
  C: 'c.svg', Java: 'java.svg', Python: 'python.svg', Linux: 'linux.svg',
  'VS Code': 'vscode.svg', Git: 'git.svg', GitHub: 'github.svg', Vercel: 'vercel.svg',
}

const conceptIcons: Partial<Record<string, typeof Code2>> = {
  'Server Actions': Layers3, 'Route Handlers': Cable, 'REST API': Cable, '외부 API': Cable,
  bcryptjs: KeyRound, '환경변수': FileKey, '세션 관리': ShieldCheck,
  HxD: Fingerprint, 'HEX 데이터': Binary, '파일 시그니처': Fingerprint,
  cryptography: KeyRound, Fernet: KeyRound,
  LoRA: Sparkles, 'Fine-tuning': Sparkles, 'AI API': Sparkles,
}

const programming = [
  { name: 'C', description: '프로그래밍 기초 학습' },
  { name: 'Java', description: '프로그래밍 기초 학습' },
  { name: 'Python', description: '프로그래밍 기초 학습' },
  { name: 'Linux', description: '1학기 서버구축 수업에서 기초 학습' },
]

function TechnologyMark({ tool }: { tool: string }) {
  const brand = brands[tool]
  const Icon = conceptIcons[tool] ?? Code2
  return brand ? (
    <span className={styles.brand}>
      <Image src={'/learning-logos/' + brand} alt="" width={16} height={16} unoptimized />
    </span>
  ) : <Icon className={styles.concept} aria-hidden="true" size={16} strokeWidth={1.7} />
}

function TechnologyList({ tools }: { tools: string[] }) {
  return (
    <ul className={styles.technologies} aria-label="관련 기술">
      {tools.map(tool => <li key={tool}><TechnologyMark tool={tool} /><span>{tool}</span></li>)}
    </ul>
  )
}

export default function Learning() {
  return (
    <section className={'wrap editorial-page ' + styles.page}>
      <header className="editorial-heading">
        <p className="editorial-kicker">LEARNING NOTES</p>
        <h1>기술·실습 기록</h1>
        <p className="muted">전공 수업, 동아리 활동, 개인 및 팀 프로젝트에서 학습하고 활용한 기술을 정리했습니다.</p>
      </header>
      <section className={styles.section} aria-labelledby="practice-list">
        <h2 id="practice-list">실습 상세</h2>
        <ul className={styles.grid + ' ' + styles.practiceGrid}>
          {practices.map(practice => {
            const Icon = practiceIcons[practice.slug as keyof typeof practiceIcons] ?? Code2
            return <li key={practice.slug} className={styles.entry}>
              <p className="editorial-kicker">{practice.category} · {practice.context}</p>
              <h3 className={styles.practiceTitle}><Icon aria-hidden="true" size={18} strokeWidth={1.7} />{practice.title}</h3>
              <p className="muted">{practice.purpose}</p>
              <Link className="editorial-link" href={`/learning/${practice.slug}`} aria-label={practice.title + ' 상세 보기'}>상세 보기 →</Link>
            </li>
          })}
        </ul>
      </section>
      <section className={styles.section} id="web">
        <h2>웹 개발 기초 실습</h2>
        <ol className={styles.grid + ' ' + styles.threeColumns}>
          {firstSemesterLessons.map((lesson, index) => <li key={lesson.href} className={styles.entry}>
            <span className={styles.step} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3>{lesson.title}</h3>
            <p className="muted">{lesson.body}</p>
            <a className="editorial-link" href={lesson.href} target="_blank" rel="noreferrer" aria-label={lesson.title + ' 실습 보기'}>실습 보기 ↗</a>
          </li>)}
        </ol>
        <Link href="/projects/class-practice" className={'editorial-link ' + styles.courseLink}>2학기 웹서버보안프로그래밍 주차별 수업 실습 →</Link>
      </section>
      <section className={styles.section} id="programming">
        <h2>기초 프로그래밍과 서버구축</h2>
        <ul className={styles.grid + ' ' + styles.programmingGrid}>
          {programming.map(({ name, description }) => <li className={styles.entry} key={name}>
            <h3><TechnologyMark tool={name} />{name}</h3>
            <p className="muted">{description}</p>
          </li>)}
        </ul>
      </section>
      <section className={styles.section}>
        <h2>기술 스택과 활용</h2>
        <ul className={styles.skillRows}>
          {skillGroups.map(skill => <li key={skill.label} className={styles.skillRow}>
            <div>
              <h3><Link href={skill.href}>{skill.label}</Link></h3>
              <TechnologyList tools={skill.tools.split(' · ')} />
            </div>
            <div>
              <p className="editorial-kicker">{skill.scope}</p>
              <p className="muted">{skill.use}</p>
            </div>
          </li>)}
        </ul>
      </section>
    </section>
  )
}
