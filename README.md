
# 🚀 DevSync

AI-driven platform to sync GitHub repositories, analyze commit history, and provide real-time contextual insights using **Gemini AI** and **AssemblyAI**.



## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, ShadCN UI  
- **AI Integrations**:
  - **Gemini AI** – Semantic code search, context-aware Q&A
  - **AssemblyAI** – Meeting transcription and action item extraction  

---

## 🌟 Features

- 🔄 **GitHub Sync** – Connect and sync repositories in real-time  
- 📈 **Commit Analysis** – Track commit patterns, contributions, and insights  
- 🤖 **AI Code Search** – Use Gemini AI to ask natural language questions about your codebase  
- 📝 **Meeting Transcriptions** – Upload audio files, transcribe meetings, and auto-extract key points with AssemblyAI  
- 🧠 **Actionable Insights** – Identify blockers, progress, and key contributors intelligently

---

## 📷 Demo

> Add a video/gif link here to show how it works (e.g., Loom or YouTube)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Sachita007/DevSync.git
cd devsync
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/devsync-ai"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/sync-user"
GITHUB_TOKEN="your-github-token"
GEMINI_API_KEY="your-gemini-api-key"
ASSEMBLYAI_API_KEY="your-assemblyai-api-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

```

### 4. Run the App

```bash
npm run dev
```

---

