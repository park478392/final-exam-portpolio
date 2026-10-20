import { firstSemesterLessons } from '@/lib/semesters'
import Link from 'next/link'
import { ProjectCollection } from '@/components/ProjectCollection'
export default function Projects() {
  return <section className="wrap page-content"><div className="page-heading"><p className="eyebrow">PROJECTS</p><h1>프로젝트와 학습 기록</h1><p>두 학기의 프로젝트, 실습, 동아리 활동을 한곳에서 확인할 수 있습니다.</p></div><nav className="learning-shortcuts" aria-label="페이지 바로가기"><a href="#work">프로젝트 ↓</a><a href="#semester-1">1학기 실습 ↓</a><a href="#semester-2">2학기 학습 ↓</a><a href="#club">동아리 활동 ↓</a></nav><section id="work" className="learning-semester"><h2 className="text-2xl font-bold mb-6">프로젝트</h2><ProjectCollection /></section>    <section id="semester-1" className="learning-semester"><div className="semester-heading"><span>01</span><div><h2 className="text-2xl font-bold">1학기 · 웹프로그래밍</h2><p className="muted mt-2">HTML → CSS → JavaScript</p></div></div><div className="lesson-list">{firstSemesterLessons.map(l => <article key={l.title}><div><h3 className="font-bold text-lg">{l.title}</h3><p className="muted leading-7 mt-2">{l.body}</p></div><a href={l.href} target="_blank" rel="noreferrer" className="button button-secondary shrink-0">실습 열기 ↗</a></article>)}</div><p className="muted leading-7 mt-5">배운 내용은 사다리타기·룰렛과 보안 교육 팀 프로젝트에 적용했습니다.</p></section>
    <section id="semester-2" className="learning-semester">
      <div className="semester-heading"><span>02</span><div><h2 className="text-2xl font-bold">2학기 · 웹서버보안프로그래밍</h2><p className="muted mt-2">React · Next.js · MongoDB</p></div></div>
      <article className="panel p-6 sm:p-8 mb-6"><span className="chip">수업 실습</span><h3 className="text-2xl font-bold mt-4">화면부터 데이터베이스까지</h3><p className="muted leading-7 mt-3">React와 Next.js로 웹을 개발하고, MongoDB에 연결해 데이터베이스를 공부하고 있습니다. 카운터, 상품, 공지사항과 회원 인증은 별도의 수업 사이트에서 실습합니다.</p><div className="flex flex-wrap gap-2 mt-4 mb-6">{['React 상태 관리', '동적 라우팅', 'Server Actions', 'MongoDB', 'Auth.js'].map(topic => <span className="chip" key={topic}>{topic}</span>)}</div><a href="http://localhost:3002" target="_blank" rel="noreferrer" className="button">2학기 수업 사이트 열기 ↗</a></article>
      <h3 className="text-xl font-bold mb-5">웹 개발 학습</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: 'React', body: '컴포넌트로 화면을 나누고, 상태와 이벤트로 사용자 인터랙션을 구현하고 있습니다.' },
          { title: 'Next.js', body: '페이지 라우팅과 서버 컴포넌트, 서버 액션을 활용한 웹 개발을 공부하고 있습니다.' },
          { title: 'MongoDB', body: '웹과 데이터베이스를 연결하고, 게시글 데이터를 저장하고 조회하는 과정을 실습하고 있습니다.' },
        ].map(item => <article className="panel p-6" key={item.title}><h4 className="text-lg font-bold">{item.title}</h4><p className="muted leading-7 mt-3">{item.body}</p></article>)}
      </div>
    </section>
    <section id="club" className="learning-semester">
      <div className="semester-heading"><span>03</span><div><h2 className="text-2xl font-bold">동아리 · 멋쟁이사자처럼 14기</h2><p className="muted mt-2">HxD 실습 · JWT 학습 · 축구 웹 개인 프로젝트</p></div></div>
      <div className="lesson-list">
        <article><div><h4 className="font-bold text-lg">HxD 실습</h4><p className="muted leading-7 mt-2">동아리에서 HxD를 활용한 실습을 진행했습니다.</p></div><span className="chip shrink-0">실습</span></article>
        <article><div><h4 className="font-bold text-lg">JWT 학습</h4><p className="muted leading-7 mt-2">동아리에서 JWT와 토큰 기반 인증을 공부했습니다.</p></div><span className="chip shrink-0">인증</span></article>
        <article><div><h4 className="font-bold text-lg">축구 웹 공부와 개발</h4><p className="muted leading-7 mt-2">동아리 개인 프로젝트인 축구 데이터 분석 웹을 만들며 웹 개발을 공부하고, 배운 내용을 프로젝트에 적용하고 있습니다.</p></div><Link href="/projects/football-data" className="button button-secondary shrink-0">축구 프로젝트 보기 →</Link></article>
      </div>
    </section>
</section>
}
