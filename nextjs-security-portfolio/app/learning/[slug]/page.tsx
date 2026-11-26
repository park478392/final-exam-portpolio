import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { practices } from '@/lib/practices'

const loraResults = [
  ['학습 질문 정답률', '100%'],
  ['처음 보는 질문 정답률', '약 67%'],
  ['관계없는 질문 보존율', '100%'],
]

export function generateStaticParams() {
  return practices.map(practice => ({ slug: practice.slug }))
}

export default async function PracticeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const practice = practices.find(item => item.slug === slug)
  if (!practice) notFound()

  return (
    <article className="wrap editorial-page">
      <Link href="/learning" className="editorial-link">← 기술·실습 기록</Link>
      <header className="editorial-heading mt-5">
        <p className="editorial-kicker">{practice.category} · {practice.context}</p>
        <h1>{practice.title}</h1>
        <p className="muted">{practice.purpose}</p>
      </header>
      <div className="editorial-reading">
        <section className="editorial-section">
          <h2>핵심 개념과 사용 도구</h2>
          <p>{practice.concept}</p>
          <p className="editorial-technologies mt-3">{practice.tools.join(' · ')}</p>
        </section>
        <section className="editorial-section">
          <h2>실습 과정</h2>
          <ol className="editorial-steps">{practice.steps.map(step => <li key={step}>{step}</li>)}</ol>
          {practice.flow && (
            <figure className="mt-5">
              <figcaption className="font-bold mb-2">사용자 정보에서 토큰 발급까지</figcaption>
              <ol className="editorial-flow" aria-label="JWT 발급 순서">
                {practice.flow.map(step => <li key={step}>{step}</li>)}
              </ol>
            </figure>
          )}
          {practice.code && <pre className="editorial-code"><code>{practice.code}</code></pre>}
        </section>
        <section className="editorial-section">
          <h2>실행 결과</h2>
          <p>{practice.result}</p>
          {slug === 'lora' && <>
            <table className="editorial-table mt-4">
              <caption className="sr-only">LoRA 최종 실험 평가 결과</caption>
              <thead><tr><th scope="col">평가 항목</th><th scope="col">결과</th></tr></thead>
              <tbody>{loraResults.map(([label, result]) => <tr key={label}><th scope="row">{label}</th><td>{result}</td></tr>)}</tbody>
            </table>
            <p className="muted mt-3">소규모 실습 데이터에서 얻은 수치이며, AI 모델 전체의 성능을 나타내지 않습니다.</p>
          </>}
          {practice.evidence && <div className="editorial-pair mt-4">
            {practice.evidence.map(item => <figure className="editorial-evidence" key={item.label}>
              {item.image && <Image src={item.image} alt={item.alt ?? item.label} width={640} height={360} />}
              <figcaption>{item.label}</figcaption>
            </figure>)}
          </div>}
        </section>
        {practice.troubleshooting && <section className="editorial-section">
          <h2>문제 해결 과정</h2><p>{practice.troubleshooting}</p>
        </section>}
        <section className="editorial-section">
          <h2>배운 점</h2><p>{practice.reflection}</p>
        </section>
        {practice.report && <section className="editorial-section">
          <h2>실습 보고서</h2><a className="editorial-link" href={practice.report} download>보고서 다운로드</a>
        </section>}
      </div>
    </article>
  )
}
