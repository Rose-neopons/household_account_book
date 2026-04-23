# AI-Pocket-Guard

AI 기반 지출 피드백과 자연어 입력을 제공하는 모바일 가계부 앱입니다.

## 구조

- `apps/mobile`: Expo Router 기반 React Native 앱, NativeWind 스타일링
- `apps/backend`: Nest.js API 서버, Prisma + Supabase PostgreSQL

## 시작하기

```bash
npm install
cp apps/backend/.env.example apps/backend/.env
npm run prisma:generate
npm run mobile
npm run backend
```

Supabase 연결 문자열과 Gemini API 키는 `apps/backend/.env`에 입력합니다.
