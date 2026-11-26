import Image from 'next/image'
import Link from 'next/link'
import { Award, Code2, Database, Fingerprint, Globe, KeyRound, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { profile } from '@/lib/data'
import { featuredProjects, networkCertificate } from '@/lib/portfolio'
import { ProjectCard } from '@/components/ProjectCard'
import { CertificateDialog } from '@/components/CertificateDialog'
import styles from './home.module.css'

const homeSkills = [
  { icon: Globe, label: '웹 개발', tools: 'HTML · CSS · JavaScript · TypeScript · React · Next.js', use: '개인 미니 게임의 입력과 화면을 연결하고, 수업 예제로 Next.js 상품 목록과 상세 화면을 실습했습니다.', href: '/learning#web' },
  { icon: Database, label: '데이터베이스', tools: 'MongoDB · Mongoose', use: '수업 예제를 따라 회원·상품·공지·주문 데이터 모델과 저장·조회를 실습했습니다.', href: '/projects/class-practice' },
  { icon: ShieldCheck, label: '웹 보안', tools: 'Auth.js · JWT · bcryptjs', use: '수업 예제로 비밀번호 해시, JWT 세션, 서버 측 주문 조회 권한 확인을 실습했습니다.', href: '/learning/jwt' },
  { icon: Fingerprint, label: '디지털 포렌식', tools: 'HxD · HEX · 파일 시그니처', use: '이미지 속 ZIP을 분리하고 파일 경계를 확인해 손상된 JPG를 복원했습니다.', href: '/learning/digital-forensics' },
  { icon: KeyRound, label: '암호학', tools: 'Python · cryptography · Fernet', use: '같은 키로 데이터를 암호화하고 복호화하는 과정을 실습했습니다.', href: '/learning/fernet' },
  { icon: Sparkles, label: '인공지능', tools: 'LoRA · Google Colab · Gemini API', use: 'Colab에서 LoRA 설정을 비교하고, 축구 웹에는 AI 뉴스 요약을 구현했습니다.', href: '/learning/lora' },
  { icon: Code2, label: '프로그래밍', tools: 'C · Java · Python · Linux 기초', use: '프로그래밍 기초를 학습하고, 1학기 서버구축 수업에서 Linux를 다뤘습니다.', href: '/learning#programming' },
]

export default function Home() {
  return (
    <div className={'wrap editorial-page ' + styles.homePage}>
      <section className={'editorial-hero ' + styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className="editorial-kicker">2026 DEVELOPMENT PORTFOLIO</p>
          <h1 id="home-title">박시우</h1>
          <p className="editorial-role">중부대학교 정보보호학과 2학년</p>
          <p className="muted editorial-intro">웹 개발과 정보보호를 공부하며 배운 기술을 직접 프로젝트에 적용하고 있습니다. 1학기에는 HTML, CSS, JavaScript로 웹 개발의 기초를 익혔고, 2학기에는 교수님의 수업을 따라 Next.js에서 데이터베이스 연동과 사용자 인증을 실습했습니다. 개인 프로젝트인 축구 웹에서는 외부 API를 활용했습니다.</p>
          <div className="editorial-actions">
            <Link className="button" href="/projects">프로젝트 보기 →</Link>
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <figure className={styles.profile}>
          <Image src="/semester-1/KakaoTalk_20260604_212116913.jpg" alt="박시우 프로필 사진" width={160} height={180} sizes="(max-width: 520px) 96px, 160px" priority className="editorial-portrait" />
          <figcaption>
            <strong>멋쟁이사자처럼 14기</strong>
            <span className="muted">웹 개발 · 정보보호 · 인공지능</span>
          </figcaption>
        </figure>
      </section>

      <section className="editorial-section" aria-labelledby="home-projects">
        <div className="editorial-section-head">
          <h2 id="home-projects">대표 프로젝트</h2>
          <Link className="editorial-link" href="/projects">전체 프로젝트 →</Link>
        </div>
        <div className="editorial-grid">
          {featuredProjects.map(project => <ProjectCard key={project.slug} project={project} eager />)}
        </div>
      </section>

      <section className="editorial-section" aria-labelledby="home-growth">
        <h2 id="home-growth">학기별 성장 과정</h2>
        <ol className={'editorial-pair ' + styles.growth}>
          <li>
            <p className="editorial-kicker">1학기</p>
            <h3>화면과 상호작용 만들기</h3>
            <p className="muted">HTML·CSS·기초 JavaScript로 첫 포트폴리오와 사다리타기·룰렛을 만들었습니다. 팀 보안 교육 웹에 퀴즈를 구현하고 서버구축 수업에서 Linux 기초를 익혔습니다.</p>
          </li>
          <li>
            <p className="editorial-kicker">2학기</p>
            <h3>서버와 데이터 연결하기</h3>
            <p className="muted">Next.js·React·TypeScript·Tailwind CSS로 포트폴리오를 개선했습니다. 수업 예제로 DB 연동과 사용자 인증을 실습하고, 개인 프로젝트인 축구 웹에서 외부 API와 AI를 활용했습니다. 동아리 실습과 시험 대비 CBT 제작도 진행했습니다.</p>
          </li>
        </ol>
      </section>

      <section className="editorial-section" aria-labelledby="home-skills">
        <h2 id="home-skills">기술 및 실습</h2>
        <ul className={styles.skillList}>
          {homeSkills.map(({ icon: Icon, label, tools, use, href }) => <li key={label}>
            <Link href={href}>
              <Icon aria-hidden="true" size={21} strokeWidth={1.7} />
              <span><strong>{label}</strong><small>{tools}</small></span>
              <span className={'muted ' + styles.skillUse}>{use}</span>
              <span aria-hidden="true" className={styles.skillArrow}>→</span>
            </Link>
          </li>)}
        </ul>
      </section>

      <section className="editorial-section" aria-labelledby="home-credentials">
        <h2 id="home-credentials">자격증 및 활동</h2>
        <div className={'editorial-pair ' + styles.credentials}>
          <div>
            <Award aria-hidden="true" size={23} strokeWidth={1.7} />
            <div>
              <h3>{networkCertificate.title}</h3>
              <p className="muted">{networkCertificate.issuer} · {networkCertificate.status}<br />
                합격일 {networkCertificate.passed}<br />유효기간 {networkCertificate.validThrough}까지
              </p>
              <CertificateDialog />
            </div>
          </div>
          <div>
            <Users aria-hidden="true" size={23} strokeWidth={1.7} />
            <div><h3>멋쟁이사자처럼 14기</h3><p className="muted">웹 개발 및 기술 학습<br />JWT·디지털 포렌식·LoRA 실습</p></div>
          </div>
        </div>
      </section>
    </div>
  )
}
