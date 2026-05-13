# Vercel Feedback System 설정 가이드

MegazoneCloud 마케팅 온보딩 플랫폼의 피드백 시스템을 Notion 데이터베이스와 연동하기 위한 설정 가이드입니다.

## 1단계: Notion Integration 생성

### 1.1 Notion Developers 페이지 접속
- https://www.notion.so/my-integrations로 이동
- 로그인 (이미 로그인되어 있지 않은 경우)

### 1.2 새 Integration 생성
1. "Create new integration" 버튼 클릭
2. Integration 이름 입력: `MegazoneCloud Marketing Feedback`
3. "Associated workspace" 선택: 현재 Notion workspace
4. "Submit" 클릭

### 1.3 Integration Token 복사
1. Integration 생성 후 "Show" 버튼 클릭하여 Secret 토큰 표시
2. 토큰 복사 및 안전한 곳에 저장
   - 형식: `secret_XXXXXXXXXXXXXXXXXXXXX`

## 2단계: Notion 데이터베이스에 Integration 연결

### 2.1 피드백 데이터베이스 공유
1. Notion에서 피드백 데이터베이스 열기
2. 우상단 "Share" 버튼 클릭
3. Integration 검색 및 선택: `MegazoneCloud Marketing Feedback`
4. "Invite" 또는 "Add" 클릭하여 접근 권한 부여

### 2.2 데이터베이스 ID 확인
1. 데이터베이스 URL 확인
   - 형식: `https://www.notion.so/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX?v=...`
2. `?` 이전의 32자 문자열이 데이터베이스 ID
   - 예: `35fb611123df803fba0ade6e7d399df5`

## 3단계: Vercel 환경 변수 설정

### 3.1 Vercel Dashboard 접속
1. https://vercel.com/dashboard로 이동
2. 현재 프로젝트 선택

### 3.2 환경 변수 추가
1. "Settings" 탭 클릭
2. "Environment Variables" 선택
3. 다음 두 개의 환경 변수 추가:

#### 환경 변수 1: NOTION_API_KEY
- **Key**: `NOTION_API_KEY`
- **Value**: `secret_XXXXXXXXXXXXXXXXXXXXX` (1.3단계에서 복사한 토큰)
- **Environments**: Production, Preview, Development 모두 선택

#### 환경 변수 2: NOTION_DATABASE_ID
- **Key**: `NOTION_DATABASE_ID`
- **Value**: `35fb611123df803fba0ade6e7d399df5` (2.2단계에서 확인한 ID)
- **Environments**: Production, Preview, Development 모두 선택

### 3.3 환경 변수 저장
1. 각 변수 입력 후 "Enter" 또는 "Save" 클릭
2. 변수가 목록에 추가되는지 확인

## 4단계: 배포 및 테스트

### 4.1 코드 배포
1. 로컬에서 `api/feedback.js` 파일이 `/vercel 배포/api/` 디렉토리에 있는지 확인
2. 업데이트된 `index.html` 파일 확인
3. Git에 커밋 후 푸시

```bash
git add .
git commit -m "Add Notion feedback integration with Vercel serverless function"
git push
```

### 4.2 Vercel 자동 배포 확인
- Vercel Dashboard에서 배포 진행 상황 모니터링
- 배포 완료 후 프로젝트 URL 방문

### 4.3 피드백 시스템 테스트
1. 웹사이트의 "피드백 보내기" 또는 "Send Feedback" 버튼 클릭
2. 테스트 피드백 정보 입력:
   - 이름: 테스트
   - 이메일: test@example.com
   - 멘토: 선택 (옵션)
   - 피드백: 테스트 피드백입니다
3. "전송" 또는 "Submit" 버튼 클릭
4. 성공 메시지 확인

### 4.4 Notion 데이터베이스 확인
1. Notion 데이터베이스 열기
2. 새로운 행(row)이 추가되었는지 확인
3. 모든 필드(이름, 이메일, 멘토, 피드백내용, 제출일, 상태)가 올바르게 입력되었는지 확인

## 5단계: 트러블슈팅

### 문제: "Method not allowed" 에러
- **원인**: API 함수가 배포되지 않음
- **해결책**: 
  - Vercel Dashboard에서 배포 로그 확인
  - `api/feedback.js` 파일이 프로젝트에 포함되었는지 확인

### 문제: "Server configuration error" 메시지
- **원인**: 환경 변수가 설정되지 않음
- **해결책**:
  - Vercel Settings에서 환경 변수 재확인
  - `NOTION_API_KEY`와 `NOTION_DATABASE_ID`가 모두 설정되었는지 확인
  - 배포 후 브라우저 캐시 초기화 후 재시도

### 문제: "Failed to submit feedback" 에러
- **원인**: Notion API 호출 실패
- **해결책**:
  1. Notion Integration이 데이터베이스에 접근 권한이 있는지 확인
  2. 데이터베이스 ID가 정확한지 재확인
  3. API 토큰이 만료되었는지 확인
  4. Notion 데이터베이스 구조(필드명)가 코드와 일치하는지 확인

### 문제: 피드백이 Notion에 저장되지 않음
- **원인**: 필드명 불일치
- **해결책**:
  - Notion 데이터베이스의 필드명 확인:
    - `이름` (Title 타입)
    - `제출자` (Rich text 타입)
    - `이메일` (Email 타입)
    - `멘토` (Select 타입)
    - `피드백내용` (Rich text 타입)
    - `제출일` (Date 타입)
    - `상태` (Select 타입)

## 6단계: 보안 고려사항

### 6.1 API 키 보안
- **절대 하면 안 될 것**:
  - API 키를 코드에 하드코딩하기
  - API 키를 GitHub에 커밋하기
  - API 키를 다른 사람과 공유하기

- **안전한 관리**:
  - 모든 민감한 정보는 Vercel Environment Variables에 저장
  - 정기적으로 Integration 접근 로그 검토
  - 필요 없는 Integration은 제거

### 6.2 CORS 설정
- 현재 API 함수는 모든 출처(origin)에서의 요청을 허용합니다
- 필요시 `api/feedback.js`의 CORS 헤더를 수정하여 특정 도메인만 허용 가능

## 문제 해결을 위한 로그 확인

### Vercel 함수 로그 확인
1. Vercel Dashboard → Settings → Functions
2. 함수 호출 로그 및 에러 확인 가능

### 브라우저 개발자 도구
1. F12 또는 우클릭 → "검사" 선택
2. "Console" 탭에서 에러 메시지 확인
3. "Network" 탭에서 API 요청 상태 확인

## 완료 체크리스트

- [ ] Notion Integration 생성 완료
- [ ] Integration Token 복사 및 저장
- [ ] Notion 데이터베이스에 Integration 권한 부여
- [ ] Notion 데이터베이스 ID 확인
- [ ] Vercel 환경 변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)
- [ ] api/feedback.js 파일 배포
- [ ] index.html 업데이트 배포
- [ ] 피드백 시스템 테스트 완료
- [ ] Notion 데이터베이스에 테스트 데이터 확인

모든 단계가 완료되면 피드백 시스템이 정상적으로 작동합니다!
