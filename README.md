# 박시우 2026 포트폴리오

1·2학기 프로젝트와 실습, 멋쟁이사자처럼 14기 활동을 정리한 포트폴리오입니다.

- `nextjs-security-portfolio`: 포트폴리오, 회원 인증과 게시판
- `football-analysis`: 동아리 개인 프로젝트인 축구 데이터 분석 웹
- 1학기 원본 실습은 `nextjs-security-portfolio/public/semester-1`에 포함되어 있습니다.

## 로컬 실행

두 프로젝트 폴더에서 각각 `npm.cmd ci`를 실행하세요.

포트폴리오의 `.env.example`을 `.env.local`로 복사해 MongoDB 연결 주소와 인증 시크릿을 설정하세요. DNS가 Atlas 주소 조회를 거부하는 환경에서는 `MONGODB_DNS_SERVERS=1.1.1.1,8.8.8.8` 옵션을 사용할 수 있습니다. 축구 웹의 `.env.local`에는 `FOOTBALL_DATA_KEY`를 설정합니다. 비밀 설정은 저장소에 포함되지 않습니다.

`nextjs-security-portfolio` 폴더에서 실행합니다.

```powershell
npm.cmd run dev
```

포트폴리오: http://localhost:3000

축구 웹: http://localhost:3001
