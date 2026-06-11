# CareerTalkAI FE

> AI-first English learning platform — Frontend

## Features

- 💬 **AI Onboarding**: Bilingual chat (EN/VI) với state machine + Ollama
- 📊 **Dashboard**: Bento grid tổng quan tiến độ
- 🃏 **Flashcards**: Swipe review, AI generate deck
- 📚 **Lessons**: Phân loại grammar/vocabulary/skills
- ✍️ **Writing**: IELTS-style check với inline feedback

## Prerequisites

- Node.js >= 18
- npm / pnpm
- Ollama (chạy local, model `gemma4:e4b-it-qat`)

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd careertalk-ai-fe
npm install
```

### 2. Environment

Tạo file `.env.local` từ template:

```bash
cp .env.example .env.local
```

Nếu chưa có `.env.example`, tạo `.env.local` với nội dung:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
OLLAMA_BASE_URL=http://localhost:11434
```

### 3. Start Ollama

```bash
ollama serve
ollama pull gemma4:e4b-it-qat
```

### 4. Run Dev Server

```bash
npm run dev
```

Truy cập: [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router (routes + layouts)
│   ├── api/chat/           # AI chat endpoint
│   ├── onboard/            # Onboarding page
│   ├── dashboard/          # Dashboard page
│   ├── flashcards/         # Flashcards page
│   ├── lessons/            # Lessons page
│   └── writing/            # Writing page
├── features/<feature>/     # Feature modules
│   ├── components/         # UI components
│   ├── hooks/              # React hooks
│   ├── lib/                # Pure functions
│   ├── store/              # Zustand stores
│   └── types.ts            # Feature types
├── components/ui/          # shadcn/ui primitives
├── hooks/                  # Global hooks
└── lib/utils.ts            # cn() + shared utils
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand + localStorage
- **Animation**: Framer Motion
- **AI**: Ollama (local LLM)
- **Language**: TypeScript
