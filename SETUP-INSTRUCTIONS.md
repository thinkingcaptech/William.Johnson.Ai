# 🔮 Setup Instructions for Will.Johnson.AI (Alchemist Edition)

## Step 1: Install Dependencies (Run in Terminal)

Open PowerShell in the `william.johnson.ai` folder and run:

```powershell
npm install
```

This will install everything needed (~2 minutes).

---

## Step 2: Set Up Firebase

### 2a. Create Firebase Project
1. Go to: https://console.firebase.google.com
2. Click "Add Project"
3. Name it: `william-johnson-ai`
4. Disable Google Analytics (optional, simpler)
5. Click "Create Project"

### 2b. Get Firebase Config
1. In Firebase Console, click the **Gear Icon** (Settings) → "Project Settings"
2. Scroll to "Your apps" → Click the **</>** (Web) icon
3. Register app: Name it "Will.Johnson.AI"
4. Copy the `firebaseConfig` object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "william-johnson-ai.firebaseapp.com",
  projectId: "william-johnson-ai",
  storageBucket: "william-johnson-ai.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 2c. Create Environment File
1. Copy `.env.local.example` to `.env.local`
2. Fill in your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_apiKey_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_authDomain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_projectId_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storageBucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messagingSenderId_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_appId_here
```

### 2d. Enable Firestore
1. In Firebase Console, click "Firestore Database" (left sidebar)
2. Click "Create Database"
3. Choose "Start in **test mode**" (we'll secure it later)
4. Select a location (us-central1 is fine)
5. Click "Enable"

---

## Step 3: Run the Development Server

```powershell
npm run dev
```

Open browser to: http://localhost:3000

You should see the Alchemist portfolio!

---

## Step 4: Deploy to Firebase (When Ready)

### 4a. Install Firebase CLI (One-time)
```powershell
npm install -g firebase-tools
```

### 4b. Login to Firebase
```powershell
firebase login
```

### 4c. Initialize Firebase in Project
```powershell
firebase init
```

Select:
- **Hosting** (use spacebar to select, then Enter)
- Use existing project → Select "william-johnson-ai"
- Public directory: `out`
- Single-page app: `Yes`
- GitHub deploys: `No`

### 4d. Deploy
```powershell
npm run firebase:deploy
```

Your site will be live at: `https://william-johnson-ai.web.app`

---

## 🎯 What You Have Now

✅ Next.js 14 app with TypeScript
✅ Alchemical theme (gold/maroon colors)
✅ AI Oracle with expanded keywords for your services
✅ Blog system (MDX-based, easy to write posts)
✅ Firebase contact form (submissions go to Firestore)
✅ Fully responsive design
✅ SEO-optimized

---

## 📝 How to Add Blog Posts

1. Create new file: `src/content/blog/your-post-title.mdx`
2. Add frontmatter at top:

```mdx
---
title: "Your Post Title"
date: "2025-11-19"
excerpt: "A short description of your post"
author: "Will Johnson"
---

Your markdown content here...
```

3. Restart dev server (Ctrl+C, then `npm run dev`)
4. Post appears at `/blog`

---

## 🚨 Troubleshooting

**"Cannot find module 'next'"**
→ Run: `npm install`

**"Firebase not configured"**
→ Check `.env.local` file exists with correct values

**Site won't build**
→ Run: `npm run build` to see specific errors

**Need help?**
→ Ask AI: "I'm getting error: [paste error here]"
