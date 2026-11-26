import Image from 'next/image'
import Link from 'next/link'
import { profile } from '@/lib/data'
import { networkCertificate } from '@/lib/portfolio'
import { CertificateDialog } from '@/components/CertificateDialog'
import styles from './about.module.css'

const milestones = [
  { category: '대학교', title: '중부대학교 정보보호학과 · 2학년', emblem: 'joongbu.jpg', mark: '중부대학교 엠블럼', source: 'https://www.joongbu.ac.kr/menu.es?mid=a10105030100', layout: 'university' },
  { category: '동아리', title: '멋쟁이사자처럼 14기 아기사자', description: '웹 개발 및 기술 실습', emblem: 'likelion.png', mark: '멋쟁이사자처럼 대학 공식 로고', source: 'https://likelion.university/', layout: 'club' },
  { category: '고등학교', title: '충암고등학교', emblem: 'choongam-high.png', mark: '충암고등학교 교표', source: 'https://cham.sen.hs.kr/', layout: 'school' },
  { category: '군 복무', title: '1사단 공병대대 군 복무', emblem: 'first-division.svg', mark: '제1보병사단 부대표지', source: 'https://commons.wikimedia.org/wiki/File:ROKA_1st_Infantry_Division_Insignia.svg', layout: 'division' },
]

export default function About() {
  return (
    <article className={styles.about}>
      <header className={styles.hero}>
        <div className={'wrap ' + styles.heroInner}>
          <Image src="/semester-1/KakaoTalk_20260604_212116913.jpg" alt="박시우 프로필 사진" width={260} height={300} sizes="(max-width: 560px) 108px, 220px" loading="eager" className={styles.portrait} />
          <div>
            <h1>About Me</h1>
            <p className={styles.name}>{profile.name} · 중부대학교 정보보호학과 2학년</p>
            <p className={styles.intro}>수업에서 배운 기술을 단순히 실습으로 끝내기보다 관심 있는 분야나 일상에서 필요한 기능에 적용해 보고 있습니다. 축구 데이터를 활용한 웹사이트와 자격증 시험 대비용 CBT 프로그램을 제작하며 개발 경험을 쌓고 있습니다.</p>
          </div>
        </div>
      </header>
      <div className={'wrap ' + styles.content}>
        <div className={styles.columns}>
          <div className={styles.bio}>
            <section className={styles.block}>
              <h2>학력 및 활동 이력</h2>
              <ol className={styles.timeline}>
                {milestones.map(item => <li key={item.title}>
                  <div>
                    <p className={styles.period}>{item.category}</p>
                    <h3>{item.title}</h3>
                    {item.description && <p className="muted">{item.description}</p>}
                  </div>
                  <a href={item.source} target="_blank" rel="noreferrer" aria-label={item.mark + ' 출처'} className={styles.emblem} data-layout={item.layout}>
                    <Image src={'/about-emblems/' + item.emblem} alt="" width={48} height={48} unoptimized />
                  </a>
                </li>)}
              </ol>
            </section>
            <section className={styles.block}>
              <h2>자격증</h2>
              <h3>{networkCertificate.title}</h3>
              <p className="muted mt-1">{networkCertificate.issuer} · {networkCertificate.status}<br />
                합격일 {networkCertificate.passed}<br />유효기간 {networkCertificate.validThrough}까지
              </p>
              <CertificateDialog />
            </section>
          </div>
          <div className={styles.skills}>
            <section className={styles.block}>
              <h2>학습 및 개발 경험</h2>
              <ul className={styles.experiences}>
                <li>
                  <h3>수업에서 배운 기술의 활용</h3>
                  <p className="muted">1학기에는 HTML, CSS, JavaScript의 기초를 배우며 개인 포트폴리오와 미니 게임을 제작하고, 사이버 보안 교육 웹 팀 프로젝트에 참여했습니다. 2학기에는 교수님의 웹서버보안프로그래밍 수업을 따라 주차별로 React·Next.js, 데이터베이스 연동, 사용자 인증을 실습했습니다. 외부 API 활용은 개인 프로젝트인 축구 웹에서 경험했습니다.</p>
                </li>
                <li>
                  <h3>관심 분야를 활용한 개인 프로젝트</h3>
                  <p className="muted">평소 관심 있는 축구를 주제로 외부 API와 AI를 활용한 축구 데이터 분석 웹을 제작했습니다. 또한 네트워크관리사 시험을 준비하면서 반복 학습에 필요한 CBT 프로그램을 제작하고 실제 시험 공부에 활용했습니다.</p>
                </li>
                <li>
                  <h3>동아리 활동 및 AI 활용</h3>
                  <p className="muted">멋쟁이사자처럼 14기에서 JWT, 디지털 포렌식, LoRA 실습에 참여했습니다. 프로젝트 개발 과정에서는 ChatGPT 등 AI 도구를 코드 작성과 기능 구현에 활용했습니다.</p>
                </li>
              </ul>
              <Link href="/projects" className={styles.projectsLink}>프로젝트 보기 →</Link>
            </section>
            <section className={styles.block}>
              <h2>관심 분야와 개발 목표</h2>
              <p className="muted">웹 개발, 정보보호, 인공지능 기술에 관심이 있습니다. 앞으로는 단순히 기능을 구현하는 것에서 나아가 사용자 인증, 접근 권한, 데이터 보호 등 보안 요소를 함께 고려할 수 있는 개발 역량을 갖추고 싶습니다.</p>
            </section>
          </div>
        </div>
        <section id="links" className={styles.linkSection + ' ' + styles.block}>
          <h2>개발 기록과 링크</h2>
          <ul className={styles.links}>
            <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
            <li><a href="https://blog.naver.com/darknix03088" target="_blank" rel="noreferrer">네이버 블로그 ↗</a></li>
            <li><a href="https://my-app-indol-tau-88.vercel.app/" target="_blank" rel="noreferrer">Vercel · 수업 실습 웹 ↗</a></li>
          </ul>
        </section>
      </div>
    </article>
  )
}
