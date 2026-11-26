export type Practice = {
  slug: string
  title: string
  category: string
  context: string
  purpose: string
  tools: string[]
  concept: string
  steps: string[]
  result: string
  reflection: string
  flow?: string[]
  evidence?: { label: string; image?: string; alt?: string }[]
  report?: string
  code?: string
  troubleshooting?: string
}

export const practices: Practice[] = [
  {
    slug: 'jwt', title: 'JWT 토큰 발급', category: '웹 보안', context: '멋쟁이사자처럼 14기',
    purpose: '외부 API에서 읽은 사용자 정보로 JWT를 발급하는 서버 흐름을 익혔습니다.',
    tools: ['Node.js', 'Express', 'JWT', 'JSONPlaceholder API', '환경변수'],
    concept: 'JWT는 정보를 담은 페이로드에 서명을 붙여 전달할 수 있는 토큰입니다. 페이로드는 암호화되지 않으며, 서버의 서명 키는 환경변수로 관리했습니다.',
    steps: ['JSONPlaceholder API에서 사용자 목록을 조회했습니다.', '입력한 사용자 이름과 일치하는 계정을 찾아 ID, 사용자 이름, 이름, 이메일로 페이로드를 구성했습니다.', 'JWT_SECRET으로 서명하고 유효기간을 10분으로 설정했습니다.'],
    flow: ['사용자 이름 입력', '외부 API에서 사용자 조회', '일치하는 사용자로 페이로드 구성', '10분 유효 JWT 발급'],
    result: '사용자 정보 조회부터 JWT 발급까지 실습했습니다.',
    reflection: '이 실습의 범위는 토큰 발급입니다. 로그인 인증과 접근 제어를 완성하는 데에는 토큰 검증과 권한 확인이 별도로 필요합니다.',
  },
  {
    slug: 'digital-forensics', title: 'HxD 파일 시그니처 분석', category: '디지털 포렌식', context: '멋쟁이사자처럼 14기',
    purpose: '실습용 이미지의 HEX 데이터를 분석해 파일 형식과 데이터 경계를 확인했습니다.',
    tools: ['HxD', 'HEX 데이터 분석', '파일 시그니처 분석'],
    concept: 'JPG 시작은 FF D8, 종료는 FF D9입니다. ZIP 로컬 파일 헤더는 50 4B 03 04, 중앙 디렉터리 종료 레코드 시작은 50 4B 05 06입니다.',
    steps: ['HxD로 PNG 내부의 바이트를 살피고 포함된 ZIP을 추출했습니다.', '손상된 실습용 파일의 헤더와 종료 표식을 비교해 JPG와 ZIP 영역을 분리했습니다.', '분리한 JPG를 열어 복원 결과를 확인했습니다.'],
    result: 'PNG에 포함된 ZIP을 추출하고, JPG와 ZIP을 분리해 이미지가 다시 표시되는 것을 확인했습니다.',
    troubleshooting: '첫 시도에서는 ZIP 종료 레코드의 시작을 데이터 끝으로 판단해 JPG가 온전히 복원되지 않았습니다. JPG의 시작과 종료 표식을 기준으로 이미지 범위를 다시 잡아 저장했습니다.',
    reflection: '확장자와 시그니처는 파일 구조를 파악하는 단서입니다. ZIP 종료 레코드의 시작 위치만으로 전체 데이터의 끝을 확정할 수 없다는 점을 배웠습니다.',
    evidence: [{ label: '첫 복원 시도 · 화면 자료 추가 예정' }, { label: '최종 복원 결과 · 화면 자료 추가 예정' }],
  },
  {
    slug: 'lora', title: 'LoRA 모델 파인튜닝', category: '인공지능', context: '멋쟁이사자처럼 14기',
    purpose: '작은 학습 데이터로 추가 학습을 진행하고, 설정에 따라 응답이 어떻게 바뀌는지 비교했습니다.',
    tools: ['Google Colab', 'LoRA', 'Fine-tuning'],
    concept: 'LoRA는 기존 모델의 모든 가중치를 다시 학습하는 대신, 낮은 랭크의 추가 행렬을 학습하는 파인튜닝 방식입니다.',
    steps: ['손흥민 관련 학습 문장 3개를 사용했습니다.', 'Learning Rate 0.0002·0.0005·0.001, Epoch 2·5·10·20, Rank 4·8·16·32의 설정을 바꿔 총 11회 실험했습니다.', '학습 질문과 처음 보는 질문의 정답률, 관계없는 질문에서 기존 응답이 유지되는지를 비교했습니다.'],
    result: '최종 설정은 Learning Rate 0.0002, Epoch 5, Rank 8입니다.',
    reflection: '학습 질문과 처음 보는 질문을 나눠 평가하니 같은 설정에서도 결과에 차이가 있었습니다.',
  },
  {
    slug: 'fernet', title: '대칭키 암호화와 복호화', category: '암호학', context: '암호학 전공 수업',
    purpose: 'Python에서 데이터를 암호화하고 복호화하며 대칭키의 역할을 확인했습니다.',
    tools: ['Python', 'cryptography', 'Fernet'],
    concept: '대칭키 암호화에서는 데이터를 암호화하고 다시 읽을 때 같은 키를 사용합니다.',
    steps: ['Fernet에서 사용할 키를 준비했습니다.', 'Python 라이브러리로 데이터를 암호화한 뒤 같은 키로 복호화했습니다.', '복호화한 데이터와 원래 입력을 비교했습니다.'],
    result: '같은 키로 암호화된 데이터를 복호화해 원래 입력을 확인했습니다.',
    reflection: '같은 키가 두 과정에 쓰이는 만큼 키를 관리하는 일이 중요하다는 점을 익혔습니다.',
  },
]

export const skillGroups = [
  { label: '프런트엔드', scope: '프로젝트 적용 · 수업 실습', tools: 'HTML · CSS · JavaScript · TypeScript · React', use: '개인 미니 게임의 입력과 화면을 구현하고, 수업 예제로 React 컴포넌트와 상태 관리를 실습했습니다.', href: '/projects/ladder-game' },
  { label: '웹 프레임워크', scope: '수업 실습 · 프로젝트 적용', tools: 'Next.js · Server Actions · Route Handlers', use: '교수님의 주차별 예제를 따라 Next.js App Router에서 동적 라우팅, 폼 제출, JSON 응답 등을 실습했으며, 개인 축구 데이터 웹 프로젝트에 Next.js를 활용했습니다.', href: '/projects/class-practice' },
  { label: '백엔드', scope: '프로젝트 적용 · 실습 경험', tools: 'Node.js · Express · REST API', use: 'Express로 JWT 발급을 실습하고, 축구 웹에서 REST API 응답을 가공했습니다.', href: '/learning/jwt' },
  { label: '데이터베이스', scope: '수업 실습', tools: 'MongoDB · Mongoose', use: '수업 예제에서 회원·상품·공지·주문 데이터를 저장하고 조회하는 흐름을 실습했습니다.', href: '/projects/class-practice' },
  { label: '웹 보안', scope: '수업 실습 · 동아리 실습', tools: 'Auth.js · bcryptjs · JWT · 환경변수 · 세션 관리', use: '수업에서 비밀번호 해시·세션·주문 조회 권한 검사를, 동아리에서 JWT 발급을 실습했습니다.', href: '/learning/jwt' },
  { label: '디지털 포렌식', scope: '실습 경험', tools: 'HxD · HEX 데이터 · 파일 시그니처', use: '이미지 내부의 ZIP을 분리하고 손상된 JPG를 복원했습니다.', href: '/learning/digital-forensics' },
  { label: '암호학', scope: '실습 경험', tools: 'cryptography · Fernet', use: 'Python에서 같은 키로 암호화와 복호화를 실습했습니다.', href: '/learning/fernet' },
  { label: '인공지능', scope: '프로젝트 적용 · 실습 경험', tools: 'LoRA · Fine-tuning · AI API · Google Colab', use: 'Colab에서 추가 학습을 실험하고 축구 웹에서 AI 뉴스 요약을 구현했습니다.', href: '/learning/lora' },
  { label: '데이터 연동', scope: '프로젝트 적용', tools: '외부 API · RSS', use: '경기 데이터를 조회하고 Google News의 RSS를 수집했습니다.', href: '/projects/football-data' },
  { label: '프로그래밍 및 운영체제', scope: '기초 학습', tools: 'C · Java · Python · Linux', use: '프로그래밍 기초와 서버구축 수업의 Linux 기초를 학습했습니다.', href: '/learning#programming' },
  { label: '개발 도구', scope: '프로젝트 적용 · 사용 경험', tools: 'VS Code · Git · GitHub · Vercel', use: 'Git·GitHub로 팀 작업을 공유했습니다. 사용 계정 링크는 소개에 정리했습니다.', href: '/about#links' },
]
