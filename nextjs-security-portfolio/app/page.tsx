import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return <div className="page-shell">
    <section className="wrap home-intro">
      <div><p className="eyebrow mb-5">PARK SIWOO · 2026</p><h1>안녕하세요.<br /><span className="text-accent">박시우입니다.</span></h1><p className="muted leading-8 mt-6 max-w-xl">정보보호학과에서 웹 개발을 공부하고 있습니다.<br />수업 과제와 동아리에서 만든 프로젝트를 정리해 두었습니다. 요즘은 멋쟁이사자처럼 14기에서 공부하면서 축구 웹을 만들고 있습니다.</p><div className="flex flex-wrap gap-3 mt-8"><Link href="/projects" className="button">프로젝트 보기 →</Link><Link href="/about" className="button button-secondary">소개 보기</Link></div></div>
      <figure className="home-portrait"><Image src="/semester-1/KakaoTalk_20260604_212116913.jpg" alt="박시우 프로필 사진" width={340} height={380} priority className="object-cover" /><figcaption>박시우 <span>정보보호학과 · 멋쟁이사자처럼 14기</span></figcaption></figure>
    </section>
    <section className="wrap home-sites" aria-labelledby="home-sites-title">
      <div className="section-heading"><div><p className="eyebrow mb-3">이번 학기의 기록</p><h2 id="home-sites-title" className="section-title">수업에서 배우고, 직접 만들어 봅니다.</h2></div><Link href="/projects" className="text-accent text-sm font-bold">전체 프로젝트 →</Link></div>
      <div className="grid md:grid-cols-2 gap-5">
        <article className="panel tidy-project"><p className="eyebrow">2학기 · 수업 실습</p><h3 className="text-2xl font-bold mt-4">웹서버보안프로그래밍</h3><p className="muted leading-7 mt-3">React와 Next.js로 화면을 만들고, MongoDB에 연결해 데이터를 저장하고 조회하는 과정을 공부하고 있습니다.</p><div className="project-actions"><Link href="/projects/class-practice" className="text-accent text-sm font-bold">실습 소개 →</Link><a href="http://localhost:3002" target="_blank" rel="noreferrer" className="button button-secondary">수업 사이트 열기 ↗</a></div></article>
        <article className="panel tidy-project"><p className="eyebrow">멋쟁이사자처럼 14기 · 개인 프로젝트</p><h3 className="text-2xl font-bold mt-4">축구 데이터 분석 웹</h3><p className="muted leading-7 mt-3">유럽 5대 리그의 경기 일정과 순위를 확인하는 사이트입니다. 동아리에서 배운 내용을 적용하며 기능을 추가하고 있습니다.</p><div className="project-actions"><Link href="/projects/football-data" className="text-accent text-sm font-bold">프로젝트 소개 →</Link><a href="http://localhost:3001" target="_blank" rel="noreferrer" className="button button-secondary">축구 웹 열기 ↗</a></div></article>
      </div>
    </section>
    <nav className="wrap home-directory" aria-label="포트폴리오 둘러보기">{[{href:'/about',label:'소개',text:'제 소개와 동아리 활동'},{href:'/projects',label:'프로젝트·기록',text:'학기별 과제와 프로젝트'},{href:'/board',label:'게시판',text:'글 작성과 회원 인증 실습'}].map(x => <Link key={x.href} href={x.href}><div className="flex justify-between items-center"><h2 className="font-bold text-lg">{x.label}</h2><span className="text-accent">→</span></div><p className="muted text-sm mt-2">{x.text}</p></Link>)}</nav>
  </div>
}
