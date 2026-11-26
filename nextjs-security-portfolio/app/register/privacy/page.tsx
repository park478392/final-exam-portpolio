import type { Metadata } from 'next'
import Link from 'next/link'
import { profile } from '@/lib/data'

export const metadata: Metadata = { title: '개인정보 처리방침' }

export default function RegistrationPrivacyPage() {
  const contactEmail = process.env.PRIVACY_CONTACT_EMAIL?.trim()

  return (
    <section className="wrap py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/register" className="text-accent text-sm">← 회원가입</Link>
        <h1 className="mb-5 mt-4 text-2xl font-bold sm:text-3xl">개인정보 처리방침</h1>
        <div className="panel grid gap-6 p-5 leading-7 sm:p-8">
          <section>
            <h2 className="mb-2 font-semibold">회원가입과 로그인</h2>
            <p className="muted">닉네임, 이메일 주소, 비밀번호를 입력받습니다. 닉네임은 게시글 작성자 표시, 이메일은 로그인·중복 가입 확인·게시글 작성자 권한 확인에 사용합니다. 비밀번호는 bcrypt 해시로 변환해 저장합니다. 비밀번호 확인 값은 가입 요청에서 일치 여부를 확인하는 데만 사용합니다.</p>
          </section>
          <section>
            <h2 className="mb-2 font-semibold">게시판에 공개되는 정보</h2>
            <p className="muted">작성한 글의 제목, 내용, 닉네임, 카테고리, 작성일은 방문자가 볼 수 있습니다. 계정에 입력한 이메일과 비밀번호는 게시판에 표시되지 않습니다. 이메일은 작성자 권한 확인을 위해 게시글 내부 기록에 사용됩니다. 닉네임이나 글 본문에 개인정보를 직접 적으면 다른 방문자가 볼 수 있습니다.</p>
          </section>
          <section>
            <h2 className="mb-2 font-semibold">저장과 로그인 유지</h2>
            <p className="muted">계정과 게시글은 MongoDB Atlas에 저장됩니다. 로그인 상태를 유지하기 위해 인증 세션 쿠키를 사용합니다. 로그아웃하면 현재 브라우저의 로그인 세션이 종료됩니다.</p>
          </section>
          <section>
            <h2 className="mb-2 font-semibold">보유 및 삭제</h2>
            <p className="muted">계정과 게시글은 삭제될 때까지 보관되며 자동으로 삭제되는 기한은 설정되어 있지 않습니다. 로그인한 작성자는 본인의 게시글을 직접 수정하거나 삭제할 수 있습니다. 계정 삭제는 운영자에게 요청할 수 있으며, 계정과 별도로 저장된 게시글도 함께 삭제하려면 요청에 포함해 주세요.</p>
          </section>
          <section>
            <h2 className="mb-2 font-semibold">개인정보 문의</h2>
            <p className="muted">
              계정 정보의 열람·정정·삭제나 처리정지에 대해서는 포트폴리오 운영자에게 문의해 주세요. 공개 게시판에는 이메일이나 비밀번호를 남기지 마세요.
            </p>
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} className="text-accent underline underline-offset-4">{contactEmail}</a>
            ) : (
              <a href={profile.github} className="text-accent underline underline-offset-4">운영자 GitHub 프로필</a>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}
