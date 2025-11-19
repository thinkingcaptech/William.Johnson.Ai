# 🔮 Will.Johnson.AI - The Alchemist Portfolio

**Next.js 14 + Firebase + Tailwind CSS**

A complete rebuild of the Will.Johnson.AI portfolio with:
- ✨ Alchemical theme (gold/maroon aesthetic)
- 🤖 AI Oracle simulation with expanded service keywords
- 📝 MDX-powered blog system ("The Codex")
- 🔥 Firebase backend (Firestore, Hosting)
- ⚡ Next.js 14 for SEO optimization
- 🎨 Tailwind CSS with custom alchemical colors

---

## 🚀 Quick Start

### 1. Install Dependencies
```powershell
npm install
```

### 2. Set Up Firebase
1. Go to https://console.firebase.google.com
2. Create project: `william-johnson-ai`
3. Enable Firestore Database (test mode)
4. Get config from Project Settings > Your Apps > Web

### 3. Configure Environment
Copy `.env.local.example` to `.env.local` and fill in Firebase values:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```powershell
npm run dev
```

Open http://localhost:3000

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (all sections)
│   ├── globals.css         # Tailwind + custom styles
│   └── blog/
│       ├── page.tsx        # Blog list
│       └── [slug]/
│           └── page.tsx    # Individual blog post
├── components/
│   ├── Navigation.tsx      # Sticky nav with elemental icons
│   ├── Hero.tsx            # IGNIS section with Oracle
│   ├── Projects.tsx        # TERRA section
│   ├── Philosophy.tsx      # AER section (books)
│   ├── Contact.tsx         # AQUA section (Firebase form)
│   ├── Footer.tsx
│   ├── AlchemistOracle.tsx # AI simulation component
│   └── ui/
│       ├── ElementalBadge.tsx
│       ├── SectionTitle.tsx
│       ├── BookCard.tsx
│       └── ProjectCard.tsx
├── lib/
│   ├── firebase.ts         # Firebase initialization
│   ├── firestore.ts        # Database operations
│   └── blog.ts             # Blog post utilities
└── content/
    └── blog/
        ├── geometric-return.mdx
        ├── zero-cost-ai.mdx
        └── 90-day-onboarding.mdx
```

---

## 🎯 Key Features

### The Alchemist's Oracle
Enhanced AI simulation with 10+ knowledge domains:
- Human Systems Architecture (HR, hiring, culture)
- Geometric Scaling (franchise, growth)
- Community Alchemy (engagement, tribes)
- AI Integration & Automation
- Digital Infrastructure
- Zero-Cost Systems
- Strategic Consulting

Queries are logged to Firebase for future analysis.

### The Codex (Blog)
MDX-powered blog with:
- Markdown + JSX components
- Automatic static generation
- SEO-optimized
- Beautiful typography

**Add new posts**: Create `.mdx` file in `src/content/blog/`

### Firebase Integration
- **Contact Form**: Submissions saved to Firestore
- **Oracle Logs**: Track popular queries
- **Hosting**: Deploy with `npm run firebase:deploy`

---

## 📝 Writing Blog Posts

Create `src/content/blog/my-post.mdx`:

```mdx
---
title: "Your Post Title"
date: "2025-11-19"
excerpt: "Brief description"
author: "Will Johnson"
---

## Your Content

Write in **Markdown** with full formatting support.

### Code blocks work too

\`\`\`javascript
const magic = true;
\`\`\`
```

Restart dev server to see new posts.

---

## 🚀 Deployment

### Firebase Hosting

1. **Install Firebase CLI** (one-time)
```powershell
npm install -g firebase-tools
firebase login
```

2. **Initialize**
```powershell
firebase init
```
- Select: Hosting
- Use existing project: `william-johnson-ai`
- Public directory: `out`
- Single-page app: Yes

3. **Deploy**
```powershell
npm run firebase:deploy
```

Your site: `https://william-johnson-ai.web.app`

### Custom Domain
In Firebase Console:
1. Hosting → Add custom domain
2. Follow DNS instructions
3. SSL auto-configured

---

## 🎨 Customization

### Colors (tailwind.config.ts)
```typescript
colors: {
  alchemist: {
    darkest: '#0f0606',    // Background
    dark: '#1a0a0a',        // Cards
    maroon: '#3D1111',      // Borders
    gold: '#D4AF37',        // Accent
    parchment: '#F0F0F0',   // Text
    ash: '#C0C0C0',         // Secondary text
  }
}
```

### Oracle Keywords (src/components/AlchemistOracle.tsx)
Add new domains to `ORACLE_KNOWLEDGE_BASE` array.

### Projects (src/components/Projects.tsx)
Edit `ProjectCard` components to showcase your work.

---

## 🐛 Troubleshooting

**TypeScript errors before `npm install`**
→ Normal. Run `npm install` first.

**"Cannot find module 'react'"**
→ Run: `npm install`

**Firebase errors**
→ Check `.env.local` file exists with correct values

**Blog posts not showing**
→ Restart dev server after adding `.mdx` files

**Build fails**
→ Run: `npm run build` to see specific errors

---

## 📊 Why Next.js vs Static HTML?

| Feature | Old (HTML) | New (Next.js) |
|---------|------------|---------------|
| SEO | ❌ Poor | ✅ Excellent |
| Blog | ❌ None | ✅ Full system |
| Scalability | ❌ Limited | ✅ Infinite |
| Maintenance | ❌ Copy/paste | ✅ Components |
| Forms | Formspree | Firebase |
| Speed | Fast | ⚡ Blazing |

---

## 📧 Contact

**Email**: thinkingcaptech3@gmail.com
**Live Site**: [Coming soon after deployment]
**Repository**: https://github.com/thinkingcaptech/william.johnson.ai

---

## 📜 License

All rights reserved © 2025 Will Johnson

---

Built with the philosophy of **geometric returns** and **zero-cost engineering**.
