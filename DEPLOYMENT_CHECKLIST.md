# 배포 후 확인 체크리스트

## 배포 전 최종 확인

### 파일 구조 확인
- [ ] `api/feedback.js` 파일이 `/vercel 배포/api/` 디렉토리에 있음
- [ ] `index.html` 파일이 업데이트됨 (피드백 폼 확장)
- [ ] CSS 스타일이 추가됨 (form-group, form-input 등)
- [ ] JavaScript 함수 업데이트됨 (openFeedbackModal, submitFeedback)

### 로컬 테스트 (배포 전)
```bash
# vercel 배포 디렉토리에서
vercel env pull   # 환경 변수 로컬로 다운로드 (선택사항)
vercel dev        # 로컬 개발 서버 시작
```

## 배포 단계별 확인

### Step 1: 소스 코드 커밋
```bash
git add .
git commit -m "Implement Notion feedback integration with Vercel serverless function"
git push
```

체크사항:
- [ ] 모든 파일이 Git에 추가됨
- [ ] 커밋 메시지가 명확함
- [ ] 환경 변수 파일(.env)은 .gitignore에 포함됨

### Step 2: Vercel 환경 변수 설정
1. Vercel Dashboard → 프로젝트 선택
2. Settings → Environment Variables
3. 다음 변수 추가:

```
NOTION_API_KEY = secret_XXXXXXXXXXXXXXXXXXXXX
NOTION_DATABASE_ID = 35fb611123df803fba0ade6e7d399df5
```

체크사항:
- [ ] NOTION_API_KEY 입력됨
- [ ] NOTION_DATABASE_ID 입력됨
- [ ] 모든 환경(Production, Preview, Development) 선택됨
- [ ] 변수 저장됨

### Step 3: Vercel 자동 배포 확인
1. Vercel Dashboard 모니터링
2. 배포 상태 확인

체크사항:
- [ ] 배포가 시작됨
- [ ] 빌드 로그에 에러가 없음
- [ ] 배포가 완료됨 (✓ Production)
- [ ] 미리보기 URL이 생성됨

## 배포 후 기능 테스트

### 웹사이트 접속
```
https://your-project.vercel.app
```

### UI 테스트
- [ ] 페이지가 정상적으로 로드됨
- [ ] "피드백 보내기" / "Send Feedback" 버튼이 보임
- [ ] 버튼 클릭 시 모달이 열림

### 피드백 폼 검증 테스트

#### Test 1: 필드 표시 확인
1. 피드백 모달 열기
2. 다음 필드 확인:
   - [ ] 이름 입력 필드
   - [ ] 이메일 입력 필드
   - [ ] 멘토 선택 드롭다운
   - [ ] 피드백 내용 textarea
   - [ ] 제출 버튼
   - [ ] 취소 버튼

#### Test 2: 멘토 드롭다운 확인
1. 멘토 드롭다운 열기
2. 다음 8명의 멘토 확인:
   - [ ] 선택안함
   - [ ] 헤일리(정혜인) - CMO / Hayley Chung - CMO
   - [ ] 성무경 - 마케팅 유닛 리더 / Eumenes Sung - Marketing Unit Leader
   - [ ] 박민지 - 브랜드 & 컨텐츠 리더 / Keira Park - Brand & Content Leader
   - [ ] 진영희 - 필드이벤트 1팀 리더 / Jin Younghee - Field & Event 1 Team Leader
   - [ ] 김수경 - 필드이벤트 2팀 리더 / Lydia Kim - Field & Event 2 Team Leader
   - [ ] 김찬희 - 디지털퍼포먼스 리더 / Kim Chan-hee - Digital Performance Leader
   - [ ] 송영훈 - 크리에이티브 스튜디오 리더 / Song Young-hoon - Creative Studio Leader
   - [ ] 백경민 - 비디오랩 / Mina Baek - Video Lab

#### Test 3: 폼 검증 테스트
1. 모든 필드를 비운 채로 "제출" 버튼 클릭
   - [ ] 에러 메시지 표시: "이름을 입력해주세요."

2. 이름만 입력하고 "제출" 버튼 클릭
   - [ ] 에러 메시지 표시: "이메일을 입력해주세요."

3. 이름과 잘못된 이메일 입력
   - [ ] 에러 메시지 표시: "유효한 이메일을 입력해주세요."

4. 이메일까지 입력하고 "제출" 버튼 클릭
   - [ ] 에러 메시지 표시: "피드백 내용을 입력해주세요."

#### Test 4: 성공적인 피드백 제출
1. 모든 필드 입력:
   - 이름: 테스트 사용자
   - 이메일: test@example.com
   - 멘토: 헤일리(정혜인) - CMO
   - 피드백: 이것은 테스트 피드백입니다.

2. "제출" 버튼 클릭
   - [ ] "제출 중..." 메시지 표시
   - [ ] 성공 메시지 표시: "피드백이 성공적으로 제출되었습니다! 감사합니다."
   - [ ] 모달이 자동으로 닫힘
   - [ ] 폼이 초기화됨

#### Test 5: 다국어 지원 확인
1. 언어를 English로 변경
   - [ ] 모든 라벨이 영어로 변환됨
   - [ ] 오류 메시지가 영어로 표시됨

2. 다시 한국어로 변경
   - [ ] 모든 라벨이 한국어로 변환됨

### API 통합 테스트

#### 브라우저 개발자 도구 확인
1. F12 또는 우클릭 → "검사" 선택
2. "Network" 탭 열기
3. 피드백 제출

체크사항:
- [ ] POST 요청이 `/api/feedback`로 전송됨
- [ ] 요청 상태가 200 (성공)
- [ ] 응답에 `success: true` 포함됨
- [ ] 응답에 `pageId` 포함됨

#### 콘솔 에러 확인
1. "Console" 탭 확인
   - [ ] 에러 메시지가 없음
   - [ ] 경고 메시지가 없음

### Notion 데이터베이스 확인

1. Notion 피드백 데이터베이스 열기
2. 새로운 행이 추가되었는지 확인

체크사항:
- [ ] 새로운 행이 추가됨
- [ ] 이름: 테스트 사용자
- [ ] 제출자: 테스트 사용자
- [ ] 이메일: test@example.com
- [ ] 멘토: 헤일리(정혜인) - CMO
- [ ] 피드백내용: 이것은 테스트 피드백입니다.
- [ ] 제출일: 오늘 날짜
- [ ] 상태: 신규

## 에러 시 문제 해결

### 에러: "Method not allowed"
- [ ] Vercel Dashboard에서 배포 로그 확인
- [ ] `api/feedback.js` 파일이 배포됨 확인
- [ ] 배포 재시도

### 에러: "Server configuration error"
- [ ] NOTION_API_KEY 환경 변수 확인
- [ ] NOTION_DATABASE_ID 환경 변수 확인
- [ ] 환경 변수가 저장되었는지 확인
- [ ] 배포 후 브라우저 캐시 초기화 후 재시도

### 에러: "Failed to submit feedback"
- [ ] Notion Integration이 데이터베이스에 접근 권한이 있는지 확인
- [ ] 데이터베이스 ID가 정확한지 재확인
- [ ] Notion API 토큰이 유효한지 확인
- [ ] Notion 데이터베이스 필드명 확인:
  - `이름` (Title)
  - `제출자` (Rich text)
  - `이메일` (Email)
  - `멘토` (Select)
  - `피드백내용` (Rich text)
  - `제출일` (Date)
  - `상태` (Select)

### 에러: "CORS" 관련 에러
- [ ] 브라우저 콘솔에서 정확한 에러 메시지 확인
- [ ] API URL이 정확한지 확인
- [ ] CORS 설정 확인 (api/feedback.js)

## 성능 모니터링

### Vercel Analytics
1. Vercel Dashboard → Analytics
2. 다음 메트릭 확인:
   - [ ] API 응답 시간
   - [ ] 오류율
   - [ ] 요청 수

### 실시간 모니터링
- [ ] Vercel Functions 로그 모니터링
- [ ] Notion API 사용량 확인

## 최종 승인

배포 완료 시 다음을 확인:
- [ ] 모든 테스트 통과
- [ ] 오류 없음
- [ ] Notion 데이터 정상 저장
- [ ] 다국어 지원 확인
- [ ] 성능 정상

## 배포 후 유지보수

### 정기 확인 항목 (주1회)
- [ ] Vercel 배포 상태
- [ ] API 에러율 모니터링
- [ ] Notion 데이터 저장 상태

### 월 1회 확인
- [ ] Notion 통합 토큰 유효성 확인
- [ ] API 사용량 확인
- [ ] 성능 통계 검토

---

모든 항목을 체크하면 피드백 시스템이 성공적으로 배포 및 운영되는 상태입니다! 🎉
