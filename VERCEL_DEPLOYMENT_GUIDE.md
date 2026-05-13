# 🚀 MegazoneCloud 온보딩 플랫폼 - Vercel 배포 가이드

> **소요 시간: 1분**
> **난이도: 초급 (클릭만 하면 됨)**

---

## 📋 준비물

- ✅ GitHub 계정 (없으면 1분에 만들 수 있음)
- ✅ 이 가이드

---

## 🎯 배포 순서 (3단계)

### **Step 1: GitHub에 코드 업로드 (1분)**

#### 옵션 A: GitHub Desktop 사용 (가장 쉬움 - 추천)

1. **GitHub Desktop 다운로드**
   - https://desktop.github.com/ 접속
   - 설치 후 GitHub 계정으로 로그인

2. **저장소 생성**
   - File → New Repository
   - Name: `megazone-onboarding`
   - Local Path: 아무데나 선택
   - Create Repository 클릭

3. **파일 추가**
   - 위에서 만든 폴더에 파일 3개 복사:
     - `index.html`
     - `package.json`
     - `vercel.json`

4. **커밋 & 푸시**
   - GitHub Desktop에서:
     - Summary: "Initial commit"
     - Commit to main
     - Push origin

---

#### 옵션 B: 웹 UI로 직접 생성 (코드 없이)

1. **GitHub 로그인** → https://github.com

2. **새 저장소 생성**
   ```
   Repositories → New
   Repository name: megazone-onboarding
   Public 선택
   Create repository 클릭
   ```

3. **파일 추가**
   - "Add file" → "Create new file"
   - 파일 3개를 하나씩 추가:
     - `index.html` (내용은 아래 참고)
     - `package.json`
     - `vercel.json`

---

### **Step 2: Vercel에 배포 (30초)**

1. **Vercel 접속**
   - https://vercel.com 이동
   - "Sign Up" 클릭
   - "Continue with GitHub" 선택
   - GitHub 인증 (1초)

2. **프로젝트 import**
   - Vercel 대시보드에서 "Import Project" 클릭
   - GitHub 저장소 선택: `megazone-onboarding`
   - "Import" 클릭

3. **배포 시작**
   - Vercel이 자동으로 배포 시작
   - 진행 상황 보임
   - **완료!** 🎉

---

### **Step 3: 배포 URL 확인 (10초)**

배포 완료 후:
- Vercel 대시보드에 **파란색 "Visit" 버튼** 표시
- 클릭하면 **온보딩 플랫폼에 접속**
- URL은 다음과 같음:
  ```
  https://megazone-onboarding.vercel.app
  ```

---

## 📝 필요한 파일 내용

### `index.html`
온보딩 플랫폼 HTML 파일 (이미 제공됨)

### `package.json`
```json
{
  "name": "megazone-onboarding",
  "version": "1.0.0",
  "description": "MegazoneCloud Marketing Onboarding Platform",
  "scripts": {
    "dev": "vercel dev"
  }
}
```

### `vercel.json`
```json
{
  "buildCommand": "",
  "framework": "html",
  "outputDirectory": ".",
  "public": true
}
```

---

## ✅ 배포 후 확인사항

배포된 URL에 접속하면:

- ✅ 한영 언어 전환 가능
- ✅ 미션 체크박스 작동 (진행상황 자동 저장)
- ✅ 진행률 그래프 표시
- ✅ 멘토 선택 팝업
- ✅ 피드백 폼
- ✅ 모든 팀 정보 표시
- ✅ 모바일에서도 완벽 작동

---

## 🔗 배포 후 공유

배포 완료 후, 신규입사자에게 이렇게 공유:

```
안녕하세요! 온보딩 플랫폼입니다.

👉 https://megazone-onboarding.vercel.app

이 링크로 접속하시면 4주간의 온보딩 커리큘럼을 추적할 수 있습니다.

- 언어: 한국어/영어 선택 가능
- 진행상황: 자동으로 저장됨
- 멘토: 선택 후 저장
- 피드백: 언제든지 제출 가능

화이팅! 🚀
```

---

## 🆘 문제 해결

### Q: "GitHub 계정이 없어요"
A: https://github.com/signup → 2분이면 만들 수 있습니다

### Q: "Vercel 배포가 안 돼요"
A: 
1. GitHub 저장소에 3개 파일이 모두 있는지 확인
2. Vercel 대시보드에서 "Deployments" 탭 → 에러 메시지 확인
3. 파일 이름이 정확한지 확인 (대소문자 구분)

### Q: "배포 URL이 너무 길어요"
A: Vercel 설정에서 "Custom Domain" 추가 가능
- Domain 구입 후 연결 (선택사항)

### Q: "데이터가 저장 안 돼요"
A: 정상입니다! 브라우저의 로컬 스토리지에 저장됨
- 같은 브라우저에서는 유지
- 브라우저 캐시 지우면 초기화됨

---

## 🎯 더 나아가기

배포 후 추가 커스터마이징:

### 1. 커스텀 도메인 연결
```
Vercel 대시보드 → Settings → Domains
megazone-onboarding.com 등 연결 가능
```

### 2. 팀별 Google Drive 링크 추가
각 미션에 Google Drive 문서 링크 추가 가능

### 3. 자동 이메일 알림
피드백 폼 제출 시 자동으로 이메일 받기 (API 연결)

### 4. 데이터베이스 연결
진행상황을 클라우드에 저장 (Firebase 등)

---

## 💡 Eumenes님을 위한 팁

1. **신규입사자 공지**
   ```
   제목: 온보딩 플랫폼 공개
   
   안녕하세요!
   
   MegazoneCloud 마케팅 온보딩 플랫폼이 오픈되었습니다.
   아래 링크로 접속하여 4주간의 커리큘럼을 진행해주세요.
   
   👉 https://megazone-onboarding.vercel.app
   
   [필수 항목]
   - Week 1: 모든 미션 완료
   - 멘토 선택 (선택 페이지에서 가능)
   - 주간 체크-인
   - 완료 후 피드백 제출
   
   질문은 Slack #onboarding 채널로 부탁합니다.
   ```

2. **진행상황 추적**
   - 주 1회 신입사원에게 "이번 주 미션 현황 어때요?" 확인
   - 지난주 미션 미완료 항목 우선 완료

3. **피드백 수집**
   - 주간 1:1 미팅에서 "온보딩 플랫폼 어떤가요?" 질문
   - 피드백 폼 적극 이용하도록 장려

---

## 📞 지원

배포 과정에서 문제가 있으면:

1. **Vercel 공식 문서**: https://vercel.com/docs
2. **GitHub 도움말**: https://docs.github.com
3. **Claude와 재상담**: 이 문서와 함께 스크린샷 공유

---

**준비 완료! 이제 배포하러 가세요! 🚀**
