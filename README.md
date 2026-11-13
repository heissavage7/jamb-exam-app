# JAMB UTME CBT Practice Web Application

A full-featured Computer-Based Test (CBT) practice app inspired by Lamlard Past Questions and modern CBT simulators, built with Next.js, React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **4 Key JAMB Subjects**:
  - 🏛️ **Government** (100 questions, 2020–2024)
  - 📐 **Mathematics** (100 questions, 2020–2024)
  - 📝 **Use of English** (100 questions, 2020–2024)
  - 📊 **Economics** (100 questions, 2020–2024)
- **400 Questions Total**: 20 authentic questions per year per subject across 5 years (2020–2024).
- **CBT Interface**:
  - Live countdown timer (30 minutes)
  - Interactive question grid navigation palette
  - Direct option selection (A, B, C, D)
  - Instant question review with filters (Correct, Wrong, Skipped)
  - Comprehensive answer keys and step-by-step explanations
  - Estimated JAMB UTME score calculator & grade display

---

## 🚀 How to Run Locally

### Option 1: Double-Click Launcher (Windows)
Double-click either:
- `C:\Users\HP\Downloads\START_JAMB_CBT_APP.bat`
- `C:\Users\HP\.gemini\antigravity\scratch\jamb-exam-app\start-app.bat`

### Option 2: Terminal / PowerShell
```powershell
cd "C:\Users\HP\.gemini\antigravity\scratch\jamb-exam-app"
npm run dev
```
Then visit **`http://localhost:3000`** in your browser.

---

## ☁️ How to Deploy to Vercel

### Method 1: Using npx vercel (Fastest, zero install)
Open PowerShell and run:
```powershell
cd "C:\Users\HP\.gemini\antigravity\scratch\jamb-exam-app"
npx vercel
```
1. Follow the interactive prompts in your terminal:
   - Log in with GitHub, GitLab, or Email when prompted.
   - Set up and deploy `jamb-exam-app`? Select **Y**.
   - Which scope? Select your personal account.
   - Link to existing project? Select **N**.
   - Project name: `jamb-exam-app` (or your choice).
   - In which directory is your code located? `./`.
2. When asked to deploy to production, run:
```powershell
npx vercel --prod
```
Your app will be live at `https://your-project-name.vercel.app`!

### Method 2: Via GitHub + Vercel Dashboard
1. Push this directory to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Next.js is detected automatically — click **"Deploy"**.
