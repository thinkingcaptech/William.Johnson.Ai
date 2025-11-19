# 📂 Complete File Structure

```
william.johnson.ai/
│
├── 📄 package.json                 # Dependencies & scripts
├── 📄 next.config.js               # Next.js configuration
├── 📄 tsconfig.json                # TypeScript settings
├── 📄 tailwind.config.ts           # Custom alchemical colors
├── 📄 postcss.config.js            # CSS processing
├── 📄 firebase.json                # Firebase hosting config
├── 📄 .firebaserc                  # Firebase project reference
├── 📄 .env.local.example           # Environment template
├── 📄 .env.local                   # Your Firebase keys (create this!)
├── 📄 .gitignore                   # What not to commit
├── 📄 README.md                    # Full documentation
├── 📄 SETUP-INSTRUCTIONS.md        # Step-by-step setup
├── 📄 QUICK-START.md               # Quick reference
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── layout.tsx              # Root layout + metadata
│   │   ├── page.tsx                # Homepage (all sections)
│   │   ├── globals.css             # Tailwind + custom styles
│   │   └── 📁 blog/
│   │       ├── page.tsx            # Blog listing page
│   │       └── 📁 [slug]/
│   │           └── page.tsx        # Individual post page
│   │
│   ├── 📁 components/
│   │   ├── Navigation.tsx          # Sticky nav bar
│   │   ├── Hero.tsx                # IGNIS section (Oracle)
│   │   ├── Projects.tsx            # TERRA section (portfolio)
│   │   ├── Philosophy.tsx          # AER section (books)
│   │   ├── Contact.tsx             # AQUA section (Firebase form)
│   │   ├── Footer.tsx              # Bottom section
│   │   ├── AlchemistOracle.tsx     # AI simulation widget
│   │   └── 📁 ui/
│   │       ├── ElementalBadge.tsx
│   │       ├── SectionTitle.tsx
│   │       ├── BookCard.tsx
│   │       └── ProjectCard.tsx
│   │
│   ├── 📁 lib/
│   │   ├── firebase.ts             # Firebase initialization
│   │   ├── firestore.ts            # Database operations
│   │   └── blog.ts                 # Blog utilities
│   │
│   └── 📁 content/
│       └── 📁 blog/                # Your blog posts (MDX)
│           ├── geometric-return.mdx
│           ├── zero-cost-ai.mdx
│           └── 90-day-onboarding.mdx
│
├── 📁 public/                      # Static assets (images, etc.)
│
├── 📁 node_modules/                # Dependencies (npm install creates this)
│
├── 📁 .next/                       # Build output (auto-generated)
│
└── 📁 out/                         # Static export (for Firebase)
```

---

## 🎯 Key Files You'll Edit

### Most Common
- `src/content/blog/*.mdx` - Your blog posts
- `src/components/Projects.tsx` - Your portfolio projects
- `src/components/AlchemistOracle.tsx` - AI Oracle responses
- `.env.local` - Firebase configuration

### Occasional
- `src/components/Contact.tsx` - Contact form fields
- `src/components/Philosophy.tsx` - Book descriptions
- `tailwind.config.ts` - Color customization

### Rarely
- `src/app/layout.tsx` - Site metadata (SEO)
- `src/lib/firestore.ts` - Database operations
- `package.json` - Dependencies

---

## 📊 What Each Folder Does

| Folder | Purpose |
|--------|---------|
| `src/app/` | Pages & routing (Next.js App Router) |
| `src/components/` | Reusable UI pieces |
| `src/lib/` | Utility functions (Firebase, blog) |
| `src/content/` | Blog posts in Markdown |
| `public/` | Images, fonts, static files |
| `node_modules/` | Downloaded packages (don't edit!) |
| `.next/` | Build cache (auto-generated) |
| `out/` | Final static site (for deployment) |

---

## 🔥 Firebase Collections (Auto-Created)

When users interact with your site, Firebase creates:

### `contacts` collection
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  scope: "Consulting",
  message: "I need help scaling...",
  timestamp: Firestore timestamp,
  status: "new"
}
```

### `oracle_queries` collection (optional logging)
```javascript
{
  query: "How do I scale my business?",
  domain: "Geometric Scaling Architecture",
  insight: "You seek the Geometric Return...",
  timestamp: Firestore timestamp
}
```

View these in: Firebase Console → Firestore Database

---

## 🚀 Build Process Flow

```
1. You write code
      ↓
2. npm run dev (development server)
      ↓
3. Test locally at localhost:3000
      ↓
4. npm run build (creates production build)
      ↓
5. Generates static HTML in /out folder
      ↓
6. npm run firebase:deploy
      ↓
7. Uploads /out to Firebase Hosting
      ↓
8. Live at william-johnson-ai.web.app
```

---

## 🎨 Component Hierarchy

```
App (layout.tsx)
  ├── Navigation
  │     ├── Logo
  │     ├── Nav Items (IGNIS, TERRA, AER, AQUA, CODEX)
  │     └── Mobile Menu
  │
  ├── Hero (IGNIS)
  │     ├── ElementalBadge
  │     ├── Title
  │     ├── Description
  │     └── AlchemistOracle
  │           ├── Input Form
  │           ├── Thinking Animation
  │           └── Response Display
  │
  ├── Projects (TERRA)
  │     ├── SectionTitle
  │     └── ProjectCard (×3)
  │
  ├── Philosophy (AER)
  │     ├── SectionTitle
  │     ├── BookCard (×2)
  │     └── Quote Display
  │
  ├── Contact (AQUA)
  │     ├── SectionTitle
  │     └── Contact Form
  │           ├── Name Input
  │           ├── Email Input
  │           ├── Scope Selector
  │           ├── Message Textarea
  │           └── Submit Button
  │
  └── Footer
        ├── Hexagon Icon
        └── Copyright
```

---

## 📝 Blog System Flow

```
1. Create: src/content/blog/my-post.mdx
      ↓
2. Write with frontmatter:
   ---
   title: "Title"
   date: "2025-11-19"
   excerpt: "Description"
   ---
      ↓
3. Restart dev server
      ↓
4. blog.ts reads all .mdx files
      ↓
5. Generates:
   - /blog (list of all posts)
   - /blog/my-post (individual post page)
      ↓
6. MDX converted to HTML with styling
      ↓
7. SEO metadata auto-generated
```

---

## 🎯 Data Flow

### Contact Form Submission
```
User fills form
  → Contact.tsx handles submit
  → firestore.ts submitContactForm()
  → Firebase Firestore saves document
  → You see in Firebase Console
  → (Optional) Set up email notifications in Firebase
```

### Oracle Query
```
User asks question
  → AlchemistOracle.tsx processes
  → Keyword matching against knowledge base
  → Response generated
  → logOracleQuery() saves to Firestore
  → Analytics available in Firebase
```

---

This structure gives you:
- ✅ Clean separation of concerns
- ✅ Easy to find what you need
- ✅ Scalable architecture
- ✅ SEO-optimized output
- ✅ Fast build times

All compile errors will disappear after `npm install`!
