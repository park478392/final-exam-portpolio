import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return <div className="page-shell">
    <section className="wrap home-intro">
      <div><p className="eyebrow mb-5">PARK SIWOO · 2026</p><h1>안녕하세요.<br /><span className="text-accent">박시우입니다.</span></h1><p className="muted leading-8 mt-6 max-w-xl">정보보호학과에서 웹 개발을 공부하고 있습니다.<br />수업 과제와 동아리에서 만든 프로젝트를 정리해 두었습니다. 요즘은 멋쟁이사자처럼 14기에서 공부하면서 축구 웹을 만들고 있습니다.</p><div className="flex flex-wrap gap-3 mt-8"><Link href="/projects" className="button">프로젝트 보기 →</Link><Link href="/about" className="button button-secondary">소개 보기</Link></div></div>
      <figure className="home-portrait"><Image src="/semester-1/KakaoTalk_20260604_212116913.jpg" alt="박시우 프로필 사진" width={340} height={380} priority className="object-cover" /><figcaption>박시우 <span>정보보호학과 · 멋쟁이사자처럼 14기</span></figcaption></figure>
    </section>
    <section className="wrap home-feature"><div><p className="eyebrow mb-3">지금 만들고 있는 프로젝트</p><h2 className="text-2xl sm:text-3xl font-bold">축구 데이터 분석 웹</h2><p className="muted leading-7 mt-3 max-w-xl">동아리 개인 프로젝트로 만들고 있습니다. 유럽 5대 리그의 경기 일정과 순위를 볼 수 있고, 공부하면서 기능을 추가하고 있습니다.</p></div><div className="flex flex-wrap gap-3"><a href="http://localhost:3001" target="_blank" rel="noreferrer" className="button">축구 웹 열기 ↗</a><Link href="/projects/football-data" className="button button-secondary">프로젝트 소개</Link></div></section>
    <nav className="wrap home-directory" aria-label="포트폴리오 둘러보기">{[{href:'/about',label:'소개',text:'제 소개와 동아리 활동'},{href:'/projects',label:'프로젝트·기록',text:'학기별 과제와 프로젝트'},{href:'/board',label:'게시판',text:'글 작성과 회원 인증 실습'}].map(x => <Link key={x.href} href={x.href}><div className="flex justify-between items-center"><h2 className="font-bold text-lg">{x.label}</h2><span className="text-accent">→</span></div><p className="muted text-sm mt-2">{x.text}</p></Link>)}</nav>
  </div>
}
