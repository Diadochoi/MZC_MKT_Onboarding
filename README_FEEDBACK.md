# MegazoneCloud 피드백 시스템 - Notion 데이터베이스 통합

> Vercel 서버리스 함수를 통한 완전 자동화된 피드백 수집 시스템

## 📋 개요

마케팅 온보딩 플랫폼의 피드백 시스템을 Notion 데이터베이스와 직접 연동하여, 별도의 자동화 도구 없이 피드백을 자동으로 수집하고 관리할 수 있는 시스템입니다.

## 🚀 주요 기능

### 피드백 폼
- ✅ 이름 입력
- ✅ 이메일 입력 (형식 검증)
- ✅ 멘토 선택 (8명 목록)
- ✅ 피드백 내용 작성
- ✅ 다국어 지원 (한국어/영어)

### 자동화 기능
- ✅ 실시간 Notion 데이터베이스 저장
- ✅ 자동 제출 날짜 기록
- ✅ 상태 자동 설정 (신규)
- ✅ 폼 검증 및 에러 처리
- ✅ 사용자 피드백 메시지

### 보안
- ✅ API 키 환경 변수 관리
- ✅ CORS 설정
- ✅ 입력값 검증
- ✅ 에러 로깅

## 📁 파일 구조

```
vercel 배포/
├── index.html                          # 메인 페이지 (업데이트됨)
├── api/
│   └── feedback.js                     # Vercel 서버리스 함수 (신규)
├── README_FEEDBACK.md                  # 이 파일
├── SETUP_GUIDE.md                      # 상세 설정 가이드
├── FEEDBACK_SYSTEM_SUMMARY.md          # 기술 요약
└── DEPLOYMENT_CHECKLIST.md             # 배포 후 확인 목록
```

## ⚡ 빠른 시작 (3단계)

### 1️⃣ Notion Integration 설정 (5분)
```bash
# 1. https://www.notion.so/my-integrations 방문
# 2. "Create new integration" 클릭
# 3. 이름 입력: MegazoneCloud Marketing Feedback
# 4. Integration Token 복사 (secret_XXXXX...)
# 5. 피드백 데이터베이스에 권한 부여
```

### 2️⃣ Vercel 환경 변수 설정 (2분)
```
Vercel Dashboard → Settings → Environment Variables

추가할 변수:
- NOTION_API_KEY = secret_XXXXXXXXXXXXXXXXXXXXX
- NOTION_DATABASE_ID = 35fb611123df803fba0ade6e7d399df5
```

### 3️⃣ 배포 및 테스트 (3분)
```bash
# 코드 푸시
git add .
git commit -m "Add Notion feedback integration"
git push

# 테스트
# 웹사이트 → "피드백 보내기" 클릭 → 폼 작성 → 제출
# Notion 데이터베이스에서 데이터 확인
```

## 📊 데이터 흐름

```
┌─────────────────────┐
│  피드백 폼 제출     │ (웹사이트)
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  폼 검증            │ (클라이언트)
│ - 이름 확인         │
│ - 이메일 검증       │
│ - 내용 확인         │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  API 요청           │ (fetch POST)
│  /api/feedback      │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Vercel Function    │ (api/feedback.js)
│  - 데이터 처리      │
│  - 유효성 검증      │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Notion API         │
│  데이터 저장        │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Notion Database    │
│  피드백 데이터 저장 │
└─────────────────────┘
```

## 🔍 Notion 데이터베이스 구조

```javascript
{
  // Title - 필수
  이름: "사용자 이름",
  
  // Rich text - 선택
  제출자: "사용자 이름",
  
  // Email - 필수
  이메일: "user@example.com",
  
  // Select - 필수
  멘토: "헤일리(정혜인) - CMO",
  
  // Rich text - 필수
  피드백내용: "피드백 본문",
  
  // Date - 자동
  제출일: "2024-05-13",
  
  // Select - 자동
  상태: "신규"
}
```

## 🧪 테스트 예시

### 성공 케이스
```
이름: 이무경
이메일: eumenes@megazonecloud.com
멘토: 성무경 - 마케팅 유닛 리더
피드백: 온보딩 프로그램이 매우 유용합니다!

결과: ✅ 성공 - Notion에 저장됨
```

### 에러 케이스 1: 빈 필드
```
이름: [빈칸]
이메일: test@example.com
피드백: 테스트

결과: ❌ "이름을 입력해주세요."
```

### 에러 케이스 2: 잘못된 이메일
```
이름: 테스트
이메일: invalid-email
피드백: 테스트

결과: ❌ "유효한 이메일을 입력해주세요."
```

## 📚 상세 문서

| 문서 | 목적 | 대상 |
|------|------|------|
| **SETUP_GUIDE.md** | Notion + Vercel 통합 설정 | 개발자/관리자 |
| **FEEDBACK_SYSTEM_SUMMARY.md** | 시스템 기술 정보 | 개발자 |
| **DEPLOYMENT_CHECKLIST.md** | 배포 후 검증 | QA/테스터 |

## ⚙️ 환경 변수

### 필수 환경 변수
```bash
NOTION_API_KEY          # Notion Integration 토큰
NOTION_DATABASE_ID      # 피드백 Notion 데이터베이스 ID
```

### 설정 위치
- **로컬**: `.env.local` 또는 `.env`
- **Vercel**: Dashboard → Settings → Environment Variables

## 🔒 보안 권장사항

### ✅ 하면 좋은 것
- 환경 변수를 Vercel에 저장
- API 토큰을 정기적으로 갱신
- 접근 로그를 모니터링

### ❌ 절대 하면 안 되는 것
- 코드에 API 키 하드코딩
- GitHub에 .env 파일 커밋
- API 키를 다른 사람과 공유

## 🐛 문제 해결

### Q: "Server configuration error" 메시지가 나옵니다
**A**: Vercel 환경 변수 확인
```bash
# 필수 확인 사항
1. NOTION_API_KEY 설정됨
2. NOTION_DATABASE_ID 설정됨
3. 모든 환경(Production/Preview/Development) 선택됨
4. 배포 후 브라우저 캐시 초기화
```

### Q: 피드백이 Notion에 저장되지 않습니다
**A**: 다음을 확인하세요
```bash
1. Notion Integration이 데이터베이스에 접근 권한 있는지 확인
2. 데이터베이스 ID 정확성 확인
3. 필드명이 정확한지 확인 (한글 공백 주의)
4. 브라우저 개발자 도구에서 API 응답 확인
```

### Q: 브라우저에서 CORS 에러가 나옵니다
**A**: Vercel 함수 배포 상태 확인
```bash
1. Vercel Dashboard에서 배포 완료 확인
2. API 함수 로그에서 에러 확인
3. 환경 변수 설정 확인
```

## 📈 모니터링

### 실시간 모니터링
- **Vercel Dashboard**: Functions 탭에서 API 호출 로그 확인
- **Notion**: 데이터베이스에서 새로운 항목 실시간 확인
- **브라우저**: 개발자 도구 → Network 탭에서 요청/응답 확인

### 성능 지표
```
- API 응답 시간: < 2초 (목표)
- 에러율: < 1% (목표)
- 데이터 저장 성공률: > 99% (목표)
```

## 🎯 다음 단계 (선택사항)

1. **관리 대시보드**: Notion 데이터 조회 페이지 구현
2. **피드백 분류**: 카테고리별 분류 기능 추가
3. **이메일 알림**: 피드백 제출 시 관리자 알림
4. **통계 분석**: 피드백 분석 대시보드
5. **자동 응답**: 피드백 제출 자동 이메일 회신

## 📞 지원

### 문제 발생 시
1. **SETUP_GUIDE.md** - 트러블슈팅 섹션 확인
2. **DEPLOYMENT_CHECKLIST.md** - 배포 후 검증 항목 확인
3. **브라우저 콘솔** - 에러 메시지 확인
4. **Vercel 함수 로그** - API 호출 로그 확인

## 📝 라이선스 및 저작권

MegazoneCloud 마케팅 부서 - 모든 권리 보유

---

**마지막 업데이트**: 2024년 5월 13일  
**버전**: 1.0  
**상태**: 배포 준비 완료 ✅
