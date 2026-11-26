import { projects } from './data'
import { firstSemesterWork } from './semesters'

export type PortfolioProject = {
  slug: string
  title: string
  semester: '1학기' | '2학기'
  kind: '개인' | '팀' | '수업'
  status: string
  summary: string
  stack?: string[]
  cardStack?: string[]
  technologyGroups?: { label: string; tools: string[] }[]
  features?: string[]
  cardFeatures?: string[]
  image?: string
  imageFit?: 'contain'
  screenshots?: { src: string; caption: string; width: number; height: number }[]
  questionSource?: { url: string; label: string }
  github?: string
  local?: { url: string; label: string }
  period?: string
  role?: string
  achievement?: string
  deployment?: string
  demo?: { url: string; label: string }
  sections: { title: string; text?: string; items?: string[]; files?: string[]; beforeFeatures?: boolean }[]
}

const [classroom, football, portfolio] = projects
const [ladder, roulette, security] = firstSemesterWork

export const portfolioProjects: PortfolioProject[] = [
  {
    ...football, semester: '2학기', kind: '개인', image: '/project-previews/football-data.png',
    role: '화면·서버 데이터 연동·사용자 기능 개발', period: '약 1개월', deployment: '미배포',
    github: 'https://github.com/park478392/football',
    summary: '유럽 5대 리그 데이터와 축구 뉴스를 확인하고, 승부 예측과 포인트 보상에 참여하는 웹입니다.',
    stack: ['Next.js', 'React', 'TypeScript', 'REST API', 'RSS', 'MongoDB', 'Gemini API'],
    technologyGroups: [
      { label: '프론트엔드', tools: ['Next.js', 'React', 'TypeScript'] },
      { label: '데이터베이스', tools: ['MongoDB'] },
      { label: '외부 데이터', tools: ['football-data.org (경기·순위·기록)', 'API-FOOTBALL (리그 로고·사진 자료)', 'TheSportsDB (선수 이미지·이적 정보)', 'Google News RSS (뉴스)'] },
      { label: '인공지능', tools: ['Gemini API'] },
    ],
    cardStack: ['Next.js', 'MongoDB', 'REST API', 'Gemini API'],
    cardFeatures: ['유럽 5대 리그 데이터와 경기 일정', 'Google News RSS 수집 및 일부 기사 AI 요약', '승부 예측과 포인트 보상', '꾸미기 아이템 구매·적용·해제'],
    features: ['리그별 순위, 득점·도움, 선수 이미지와 날짜별 경기 일정', 'Google News RSS 뉴스 수집 및 일부 기사 AI 요약', '회원가입·로그인과 MongoDB 데이터 관리', '승부 예측·포인트 획득·꾸미기 아이템 구매', '마우스 포인터와 프로필 효과 적용·해제'],
    sections: [
      { title: '개발 목적', text: '평소 관심 있는 축구의 경기·선수·뉴스 정보를 한곳에 모으고, 이용자가 승부 예측에 직접 참여할 수 있도록 만들었습니다.' },
      { title: '외부 데이터와 AI 요약', items: ['리그·날짜 선택 → 서버에서 축구 API 조회 → 일정·순위·선수 데이터 표시', 'Google News RSS 수집 → 뉴스 목록 표시 → 선택한 기사의 AI 요약 요청'] },
      { title: '사용자 참여와 보상 흐름', items: ['회원 인증 → 경기 승부 예측 → 경기 결과에 따라 포인트 획득', '포인트로 꾸미기 아이템 구매 → 포인터·프로필 효과 적용 또는 해제', '계정과 관련 데이터는 MongoDB 연동 구조에서 관리합니다.'] },
      { title: '개발 과정과 문제 해결', items: [
        '시즌 데이터: 처음 검토한 축구 API에서 필요한 시즌 데이터를 조회하는 데 제약이 있어 데이터 출처를 바꿨습니다. 현재 경기 일정·순위·득점 기록의 주 출처는 football-data.org입니다.',
        '뉴스 요청 제한: 기존 뉴스 출처인 GDELT에서 HTTP 429 응답이 반복돼 Google News RSS로 전환하고, 뉴스 목록을 일정 시간 캐시하도록 했습니다.',
        '선수 이미지: 경기 데이터만으로는 선수 사진을 채우기 어려워 TheSportsDB의 선수 이미지 검색을 연동했습니다. 대시보드와 선수 화면은 확보한 이미지를 로컬 사진 목록에서도 불러옵니다.',
        '날짜별 경기 조회: UTC 기준 경기 시간을 한국 시간으로 변환한 뒤 선택한 날짜의 경기만 표시합니다. 경기일만 보는 모드에서는 조회 범위 안의 경기일로 이동할 수 있도록 했습니다.',
      ] },
      { title: '추가 개선이 필요한 부분', text: '경기 결과를 보완하는 상세 조회는 요청 횟수를 제한하고, 429 응답을 받으면 Retry-After를 참고해 추가 요청을 잠시 멈춥니다. 원본 API의 갱신 지연이나 시즌·선수별 데이터 누락까지 해결한 것은 아니어서, 비어 있는 데이터와 조회 실패를 구분해 안내하는 부분을 더 보완하고 싶습니다.' },
      { title: '개발 과정에서의 AI 활용', text: '코드를 작성하고 외부 API를 연결할 때 ChatGPT의 도움을 받았습니다. 오류가 생겼을 때는 응답과 증상을 함께 살펴보며 원인을 분석하고, 제안받은 수정 사항을 프로젝트에 적용해 기능을 개선했습니다. 서비스에서 일부 기사를 요약하는 기능은 Gemini API로 동작합니다.' },
      { title: '배운 점', items: [
        '서버에서 외부 API 응답을 정리하고, 날짜와 리그처럼 화면에서 필요한 기준으로 데이터를 가공하는 방법을 익혔습니다.',
        '요청 제한과 오류를 고려해 캐시, 재요청 간격, 실패 안내를 함께 설계해야 한다는 점을 배웠습니다.',
        'MongoDB 연동과 함께 예측·포인트·장착 아이템 등 회원별로 달라지는 상태를 관리하는 흐름을 경험했습니다.',
        'AI가 제안한 코드를 실제 응답과 기존 기능에 맞춰 검토하고 수정하는 과정이 필요하다는 점을 배웠습니다.',
      ] },
      { title: '향후 개발 계획', items: ['FC 온라인 라이브 부스트(라부) 예측 기능', '이적료 대비 선수 활약 분석 기능'] },
    ],
  },
  {
    slug: 'network-cbt', title: '네트워크관리사 CBT 학습 프로그램', semester: '2학기', kind: '개인', status: '개발 완료',
    summary: '네트워크관리사 2급 시험을 준비하며 기출문제를 시험처럼 반복해서 풀 수 있도록 만든 CBT입니다.',
    image: '/images/projects/cbt-exam.png',
    imageFit: 'contain',
    screenshots: [
      { src: '/images/projects/cbt-start.png', caption: '시험 시작 화면 · 시험 회차 또는 전체 랜덤 50문항 선택', width: 1917, height: 1078 },
      { src: '/images/projects/cbt-exam.png', caption: '시험 화면 · 답안 선택, 문제 이동, 응답 현황, 제출 및 채점', width: 1917, height: 1078 },
    ],
    questionSource: { url: 'https://www.comcbt.com/', label: '전자문제집 CBT (www.comcbt.com)' },
    role: '기능 기획 및 AI 활용 개발',
    achievement: '네트워크관리사 2급 취득',
    stack: ['HTML', 'CSS', 'JavaScript'],
    cardFeatures: ['회차별 기출문제 및 랜덤 50문항 출제', '문제·보기 무작위 배치 및 키보드 단축키', '실제 시험 대비에 활용해 네트워크관리사 2급 취득'],
    features: [
      '시험 회차 선택 또는 전체 회차에서 랜덤 50문항 출제',
      '문제와 객관식 보기 순서 무작위 배치',
      '숫자 1~4로 답안 선택, Enter 또는 Space로 다음 문제 이동',
      '문제 번호로 자유롭게 이동하고 응답한 문제와 응답 문항 수 확인',
      '새 시험 시작과 재시작',
      '시험 제출 및 자동 채점',
      '기출문제 출처 표기',
    ],
    sections: [
      { title: '개발 배경', beforeFeatures: true, text: '네트워크관리사 2급을 준비하면서 같은 기출문제를 반복해서 풀다 보니 문제 순서와 정답 번호를 기억하게 됐습니다. 매번 문항을 다시 읽고 답을 판단할 수 있도록 문제와 보기의 순서를 섞는 CBT 학습 프로그램을 만들었습니다.' },
      { title: '개발 과정', beforeFeatures: true, text: 'HTML·CSS·JavaScript를 기반으로 ChatGPT의 도움을 받아 코드를 작성하고, 회차 선택과 무작위 출제, 키보드 조작, 채점 등 시험 준비에 필요한 기능을 구현했습니다.' },
      { title: '활용 결과', text: '제작한 CBT 프로그램으로 회차별 기출문제와 랜덤 50문항을 반복해서 풀며 실제 시험을 준비했습니다. 2026년 11월 24일 시험에 합격해 한국정보통신자격협회(ICQA) 네트워크관리사 2급 자격을 취득했습니다.' },
      { title: '프로젝트 파일 구조', files: [
        'index.html                   # 시험 화면의 HTML 구조와 스크립트 로드',
        'style.css                    # 시험 화면의 스타일과 모바일 배치',
        'app.js                       # 무작위 출제, 답안·키보드 이벤트, 채점 처리',
        'exams.js                     # 회차별 기출문제·보기·정답 데이터',
        'explanations.js              # 문항별 해설과 참고 출처 데이터',
        'tests/explanations.test.cjs  # 해설 표시와 키보드 조작을 검증하는 테스트',
        'assets/                      # 기출문제에 포함된 그림 파일',
        'README.md                    # 로컬 실행 방법, 사용법, 문제 출처',
      ] },
      { title: '배운 점', items: [
        '반복해서 풀다 보면 정답 번호를 외우게 되는 불편함을 발견하고, 문제와 보기를 섞는 기능으로 해결해 봤습니다.',
        'JavaScript로 회차별 문제 데이터를 다루고, 무작위 출제부터 답안 선택 이벤트와 자동 채점까지 연결했습니다.',
        'ChatGPT의 도움을 받아 필요한 기능을 코드로 옮겼습니다. 제안받은 코드가 원하는 시험 흐름에 맞게 동작하는지 확인하며 수정하는 과정을 경험했습니다.',
      ] },
    ],
  },
  {
    ...classroom, title: '웹서버보안프로그래밍 실습 웹', semester: '2학기', kind: '수업',
    status: '주차별 수업 실습', image: '/project-previews/class-practice-products.png',
    summary: '교수님의 웹서버보안프로그래밍 수업을 따라 주차별 실습을 한 사이트에 정리한 결과물입니다.',
    role: '교수님의 수업 진도에 맞춰 예제를 따라 실습',
    github: 'https://github.com/park478392/my-app',
    deployment: 'Vercel 공개 데모',
    demo: { url: 'https://my-app-indol-tau-88.vercel.app', label: '실습 웹 바로가기' },
    local: { url: 'http://localhost:3002', label: '로컬 수업 사이트' },
    stack: ['Next.js App Router', 'React', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Mongoose', 'Auth.js', 'bcryptjs'],
    cardStack: ['Next.js', 'MongoDB', 'Auth.js'],
    cardFeatures: ['상품 검색·장바구니·주문', 'MongoDB로 회원·상품·공지·주문 관리', '회원 인증과 서버 측 주문 조회 권한 검사'],
    features: ['상품 검색·목록·상세, 쿠키 기반 장바구니', '로그인 사용자 주문 및 주문 내역 조회', 'MongoDB 공지사항 목록·상세·작성·삭제', '회원가입, 로그인과 JWT 세션', '서버·클라이언트 컴포넌트와 JSON Route Handler 실습'],
    sections: [
      { title: '수업 실습 개요', beforeFeatures: true, text: '2학기 첫 주차부터 교수님의 수업 예제를 따라 진행한 실습을 하나의 Next.js 사이트에 모았습니다. 주차별 진도에 맞춰 화면 구성과 라우팅을 익히고, 상품·장바구니·주문 흐름과 MongoDB 연동, 사용자 인증을 실습했습니다.' },
      { title: '라우팅과 화면 구성', items: ['상품·장바구니·주문·공지사항 수업 예제로 App Router를 익혔습니다. 상품·주문·공지사항 상세에 동적 경로를 적용하는 흐름을 실습했습니다.', '서버에서 렌더링되는 홈과 React Client Component로 동작하는 카운터를 비교했습니다. Server Actions로 폼 제출을 처리하고 Route Handler로 JSON 응답을 반환하는 예제를 따라 했습니다.'] },
      { title: '데이터베이스와 주문 흐름', items: ['수업 예제의 User, Product, Notice, Order 모델을 통해 Mongoose의 스키마와 저장·조회 흐름을 익혔습니다. 공지사항 예제는 작성자 ID와 이름을 저장합니다.', '장바구니를 HTTP-only 쿠키에 저장하고, 주문 시 서버에서 상품을 다시 조회한 뒤 주문자 ID와 주문 당시의 상품명·가격·수량을 MongoDB에 저장하는 흐름을 실습했습니다.'] },
      { title: '인증과 접근 제어', text: '수업 예제를 따라 Auth.js Credentials 로그인과 bcryptjs 비밀번호 해시 비교를 실습했습니다. JWT 세션으로 로그인 상태와 역할을 확인하고, 서버에서 주문 상세 조회 권한을 검사하는 흐름을 익혔습니다.' },
      { title: '공개 데모 범위', text: 'Vercel에서는 데모 상품과 장바구니를 살펴볼 수 있습니다. 회원 인증, 주문 저장 및 공지사항 변경 기능은 MongoDB 환경 설정이 있는 실행 환경에서 사용하는 흐름입니다.' },
      { title: '배운 점', text: '수업에서 브라우저에서 동작하는 카운터와 서버에서 데이터를 조회하는 화면을 비교하며 컴포넌트가 실행되는 위치와 데이터가 오가는 경로를 익혔습니다.' },
    ],
  },
  {
    ...security, semester: '1학기', kind: '팀', status: '완료', image: security.image,
    github: 'https://github.com/security-guide-team/security-guide',
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub'],
    local: { url: security.href, label: '팀 프로젝트 기록' },
    role: '보안 수칙 페이지·카드 인터랙션·퀴즈 구현',
    features: ['보안 수칙 페이지 제작 및 카드 인터랙션 구현', '퀴즈 응답의 정답 확인과 결과 표시'],
    sections: [
      { title: '팀 프로젝트 범위', text: '피싱, 랜섬웨어, OWASP Top 10과 생활 보안 수칙을 쉽게 설명하는 교육 웹사이트를 함께 만들었습니다.' },
      { title: '내가 맡은 작업과 협업', text: '보안 수칙을 보여주는 화면을 만들고, 카드를 클릭하면 추가 설명이 나타나도록 연결했습니다. 퀴즈의 정답 판정과 결과 표시도 맡았으며 GitHub 저장소에서 팀원과 작업을 공유했습니다.' },
    ],
  },
  {
    ...ladder, semester: '1학기', kind: '개인', status: '완료', image: '/project-previews/ladder-game.png',
    stack: ['HTML', 'CSS', 'JavaScript'], role: '화면과 게임 기능 구현',
    local: { url: ladder.href, label: '사다리타기 실행' },
    sections: [{ title: '구현 과정', text: '점심 메뉴를 쉽게 정하려고 만든 미니 게임입니다. 입력값을 화면에 반영하고, 버튼 이벤트로 사다리 진행과 결과 표시를 연결했습니다.' }],
  },
  {
    ...roulette, title: '선택 룰렛', semester: '1학기', kind: '개인', status: '완료', image: '/project-previews/roulette.png',
    stack: ['HTML', 'CSS', 'JavaScript'], role: '화면과 선택 로직 구현',
    local: { url: roulette.href, label: '룰렛 실행' },
    sections: [{ title: '구현 과정', text: '입력한 선택지를 룰렛에 표시하고 무작위로 고른 결과를 회전 효과와 함께 보여줬습니다. 입력을 바꾼 뒤에도 다시 실행할 수 있도록 이벤트를 연결했습니다.' }],
  },
  {
    slug: 'opportunity-web', title: '공모전·대외활동 정보 제공 웹', semester: '2학기', kind: '팀', status: '개발 진행 중',
    summary: '대회, 공모전과 대외활동 정보를 한곳에서 찾는 팀 프로젝트입니다.',
    role: '정보 수집·표시, 검색과 필터, 홈 구성 및 공통 UI 지원 예정',
    cardFeatures: ['담당 예정 · 대회·공모전·대외활동 정보 수집 및 표시', '담당 예정 · 검색·필터, 메인 홈 구성, 공통 UI 지원'],
    sections: [{ title: '담당 예정 작업', items: ['대회·공모전·대외활동 정보 수집 및 표시', '필터 및 검색 기능', '메인 홈 구성과 공통 UI 컴포넌트 지원'] }],
  },
  {
    ...portfolio, semester: '1학기', kind: '개인', status: '2학기 개선',
    image: '/project-previews/portfolio-current.png',
    role: '포트폴리오 설계와 구현',
    summary: '1학기에 만든 개인 포트폴리오를 2학기에 개선해 프로젝트, 기술 실습, 자격 이력을 정리했습니다.',
    technologyGroups: [
      { label: '1학기 최초 제작', tools: ['HTML', 'CSS', 'JavaScript'] },
      { label: '2학기 개선', tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
    ],
    features: ['프로젝트 학기·유형 필터와 동적 상세 페이지', '기술·실습 기록과 실습별 상세 페이지', '주간·야간 모드', '자격 취득 확인서 모달'],
    cardFeatures: ['학기·유형 필터, 동적 프로젝트 상세', '기술·실습 기록, 야간 모드', '자격 취득 확인서 모달'],
    screenshots: [
      { src: '/project-previews/portfolio.png', caption: '1학기 · HTML·CSS·JavaScript로 제작한 초기 화면', width: 1917, height: 967 },
      { src: '/project-previews/portfolio-current.png', caption: '2학기 · Next.js와 React로 개선한 현재 화면', width: 1440, height: 950 },
    ],
    sections: [
      { title: '1학기 · 초기 제작', beforeFeatures: true, text: 'HTML로 페이지를 구성하고 CSS로 스타일을 적용했습니다. 기초 JavaScript로 간단한 화면 동작을 구현해 수업 과제와 팀 프로젝트를 소개했습니다.' },
      { title: '2학기 · 포트폴리오 개선', beforeFeatures: true, text: 'Next.js와 React로 공통 레이아웃과 컴포넌트를 구성하고, TypeScript로 프로젝트 데이터를 관리했습니다. Tailwind CSS를 활용해 반응형 화면을 구성하고 프로젝트 필터, 동적 상세 페이지, 기술·실습 기록, 야간 모드와 자격 취득 확인서 모달을 반영했습니다.' },
    ],
  },
]

export const featuredProjects = portfolioProjects.slice(0, 3)

export const networkCertificate = {
  title: '네트워크관리사 2급',
  issuer: '한국정보통신자격협회(ICQA)',
  passed: '2026년 11월 24일',
  validThrough: '2031년 11월 23일',
  status: '취득 완료',
}
