# PSW.DEV — Next.js 개인 포트폴리오

웹서버보안프로그래밍 1~7주차 PPT 기술을 활용한 **실행 가능한 Next.js 프로젝트**입니다.

## 시작하기

1. Node.js 24 LTS 설치 권장
2. 폴더에서 `npm install`
3. `.env.example` 파일을 복사해 `.env.local` 생성
4. MongoDB Atlas URI 입력 후 `npx auth secret`으로 `AUTH_SECRET` 생성
5. `npm run dev` → http://localhost:3000

> **주의**: 실제 DB 연결 문자열이 없으면 Home/Projects/Learning은 사용할 수 있지만, Board와 로그인·회원가입은 작동하지 않습니다. 실제 비밀키를 GitHub에 올리지 마세요.

## 적용 기술 및 화면

| 화면/경로 | 적용 기술 |
| --- | --- |
| `/` | Server Component, Tailwind CSS v4, 컴포넌트 재사용 |
| `/projects`, `/projects/[slug]` | 목록, 동적 라우팅, `generateStaticParams`, `await params` |
| `/learning` | 1~7주 강의 내용 정리 |
| `/board`, `/board/[id]`, `/board/new` | Mongoose CRUD, 서버 컴포넌트, Server Action, `revalidatePath`, FormData |
| `/board/loading.tsx`, `/board/error.tsx` | 로딩 스켈레톤 및 안전한 에러 표시 |
| `/register`, `/login` | bcrypt 비밀번호 해싱, Auth.js v5 Credentials, JWT 세션 |
| `/api/hello`, `/api/projects` | Route Handler / JSON 응답 |

## 바꿀 부분
- `lib/data.ts`: 이름, 소개, 프로젝트, GitHub, 이메일 예시를 본인 정보로 수정
- `app/layout.tsx`: 사이트 메타데이터 수정
- 원한다면 학습 과제와 실제 GitHub 저장소 링크 추가

## 보안 및 배포
- 비밀번호는 bcrypt로 해싱하여 저장합니다.
- 회원 계정 확인 실패 시 로그인 오류 메시지는 동일하게 표시합니다.
- `/board/new`는 서버에서 세션 검증하고, 글 작성 Action도 서버에서 다시 검증합니다.
- 공개 게시판이므로 개인정보나 비밀값을 작성하지 마세요.
- 교육용 구현입니다. 외부에 대규모 공개하기 전 레이트 리미팅, 이메일 인증, 스팸 방지, 관리자 삭제 기능 등을 추가하세요.
- Vercel 배포 시 환경변수 `MONGODB_URI`, `AUTH_SECRET`을 등록하고 DB 네트워크 접근 정책을 설정하세요.

## 추천 실행 확인
1. `/api/hello`에서 JSON 확인
2. `/projects/football-data` 동적 라우팅 확인
3. 회원가입 → 로그인 → 게시글 작성 → 게시글 상세 → 로그아웃 확인
4. `/board`에서 DB 연결 실패 시 `error.tsx` 확인

과제 제출 전 사용자 데이터와 프로젝트 설명을 사실에 맞게 수정하세요.
