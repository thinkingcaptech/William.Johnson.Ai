# ⚡ QUICK START GUIDE - Will.Johnson.AI

## 🎯 What This Is
A complete Next.js portfolio with:
- AI Oracle (keyword-based consultant simulator)
- Blog system (write in Markdown)
- Contact form (saves to Firebase)
- Alchemical design (gold/maroon theme)

---

## 🚀 First Time Setup (5 Minutes)

### Step 1: Install Everything
```powershell
cd william.johnson.ai
npm install
```
Wait ~2 minutes while it downloads packages.

### Step 2: Create Firebase Project
1. Go to: https://console.firebase.google.com
2. Click "Add Project"
3. Name: `william-johnson-ai`
4. Disable Analytics → Create Project
5. Click "Firestore Database" → Create Database → Test Mode → Enable

### Step 3: Get Firebase Config
1. Click gear icon (⚙️) → Project Settings
2. Scroll to "Your apps" → Click `</>` Web icon
3. Register app name: "Will.Johnson.AI"
4. **Copy the config object** (it looks like this):

```javascript
apiKey: "AIzaSy..."
authDomain: "william-johnson-ai.firebaseapp.com"
projectId: "william-johnson-ai"
// etc.
```

### Step 4: Create .env.local File
1. Copy `.env.local.example` to `.env.local`
2. Open `.env.local` in VS Code
3. Paste your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=william-johnson-ai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=william-johnson-ai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=william-johnson-ai.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 5: Run It!
```powershell
npm run dev
```

Open: http://localhost:3000

**You should see the alchemical portfolio!**

---

## ✅ Daily Commands

```powershell
# Start development server
npm run dev

# Build for production (test before deploy)
npm run build

# Deploy to Firebase
npm run firebase:deploy
```

---

## 📝 How To Add Blog Posts

1. Create file: `src/content/blog/my-post-name.mdx`
2. Add frontmatter (copy from existing posts):
```mdx
---
title: "Your Post Title"
date: "2025-11-19"
excerpt: "Short description"
author: "Will Johnson"
---

Your content here in Markdown...
```
3. Restart dev server (Ctrl+C, then `npm run dev`)
4. Visit: http://localhost:3000/blog

---

## 🎨 How To Customize

### Change Your Projects
Edit: `src/components/Projects.tsx`
- Update titles, URLs, descriptions

### Change Oracle Responses
Edit: `src/components/AlchemistOracle.tsx`
- Add keywords to `ORACLE_KNOWLEDGE_BASE`

### Change Colors
Edit: `tailwind.config.ts`
- Modify `alchemist.*` colors

### Change Contact Email
Forms submit to Firebase automatically!
Check Firestore Console → `contacts` collection

---

## 🚨 Common Issues & Fixes

### "Cannot find module 'react'"
**Fix**: Run `npm install` (you forgot this step)

### "Firebase not configured"
**Fix**: Create `.env.local` with your Firebase config

### TypeScript errors everywhere
**Fix**: These go away after `npm install`

### Blog posts not showing
**Fix**: Restart dev server after adding `.mdx` files

### Site won't build
**Fix**: Run `npm run build` to see the error

---

## 🔥 Deploy to Live Site

### First Time Setup
```powershell
npm install -g firebase-tools
firebase login
firebase init
```

Select:
- Hosting: Yes
- Existing project: william-johnson-ai
- Public directory: `out`
- Single-page app: Yes
- GitHub actions: No

### Every Time You Deploy
```powershell
npm run firebase:deploy
```

Your site → `https://william-johnson-ai.web.app`

---

## 📱 What Each Section Does

| Section | Element | What It Does |
|---------|---------|--------------|
| **IGNIS** (Hero) | 🔥 Fire | Oracle AI + main pitch |
| **TERRA** (Projects) | ⛰️ Earth | Your portfolio projects |
| **AER** (Philosophy) | 💨 Air | Book descriptions |
| **AQUA** (Contact) | 💧 Water | Contact form → Firebase |
| **CODEX** (Nav link) | 📖 Book | Blog system |

---

## 💡 Pro Tips

1. **Test locally first**: Always run `npm run build` before deploying
2. **Write blog posts**: SEO gold - write about your services
3. **Check Firestore**: See contact form submissions in Firebase Console
4. **Oracle logs**: Track what people ask the Oracle (analytics!)
5. **Custom domain**: Add in Firebase Console → Hosting → Custom Domain

---

## 🆘 Need Help?

1. **Read full README.md** (detailed explanations)
2. **Read SETUP-INSTRUCTIONS.md** (step-by-step guide)
3. **Ask AI**: "I'm getting error: [paste error]"
4. **Email**: thinkingcaptech3@gmail.com

---

## 🎯 Next Steps After Setup

1. ✅ Get site running locally (`npm run dev`)
2. ✅ Test Firebase form submission
3. ✅ Write your first blog post
4. ✅ Deploy to Firebase
5. ✅ Add custom domain
6. ✅ Share with the world!

---

**Remember**: The compile errors are normal before `npm install`. Don't panic!
