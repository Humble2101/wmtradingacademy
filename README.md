# WM Trading Academy 🏆

**Nigeria's premier crypto trading education and managed investment platform.**
Next.js 14 · TypeScript · Tailwind CSS · Prisma (SQLite) · NextAuth · Recharts · Stripe

---

## ⚡ Open in VS Code — 3 Steps

### Step 1 — Open the folder
Unzip the file, then in VS Code: **File → Open Folder** → select `wm-trading-academy`

Or from terminal:
```bash
unzip wm-trading-academy.zip
code wm-trading-academy
```

### Step 2 — Install & setup (one command)
Open the VS Code terminal (**Ctrl+`**) and run:
```bash
npm install && npm run db:setup
```
This installs all packages, creates a local SQLite database (`prisma/dev.db`), and seeds it with demo data. **No PostgreSQL or Docker needed.**

### Step 3 — Start the dev server
```bash
npm run dev
```
Open **http://localhost:3000** — the site is live. ✅

---

## 🔐 Demo Login Credentials

| Role     | Email                  | Password  |
|----------|------------------------|-----------|
| 🛡 Admin    | admin@demo.com         | demo1234  |
| 🎓 Student  | student@demo.com       | demo1234  |
| 💼 Investor | investor@demo.com      | demo1234  |

---

## 🗂 VS Code Tasks (Ctrl+Shift+P → "Run Task")

| Task | What it does |
|------|-------------|
| 🚀 Install & Setup (first time) | `npm install` + generate DB + seed |
| ▶️  Start Dev Server | `npm run dev` |
| 🗄️  Open Prisma Studio | Visual database browser at localhost:5555 |
| 🌱 Re-seed Database | Refill DB with demo data |
| 🔄 Reset & Re-seed Database | Wipe DB and reseed from scratch |

---

## 📁 Project Structure

```
wm-trading-academy/
├── .vscode/                    ← VS Code settings, tasks, launch configs
│   ├── settings.json           ← Editor + Tailwind + TypeScript settings
│   ├── tasks.json              ← One-click dev tasks
│   ├── launch.json             ← Debugger configs
│   └── extensions.json         ← Recommended extensions
│
├── app/                        ← Next.js App Router pages
│   ├── page.tsx                ← Homepage
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/dashboard/
│   │   ├── page.tsx            ← Redirects by role
│   │   ├── student/            ← Student dashboard + charts
│   │   └── investor/           ← Investor portfolio dashboard
│   ├── subscriptions/
│   │   ├── page.tsx            ← Plans page
│   │   └── checkout/page.tsx   ← Checkout (card + bank transfer)
│   ├── reviews/page.tsx
│   ├── admin/page.tsx
│   └── api/                    ← All API routes
│       ├── auth/[...nextauth]/
│       ├── users/register/
│       ├── reviews/
│       ├── subscriptions/create/
│       ├── payments/verify/
│       ├── portfolio/
│       ├── admin/{users,stats}/
│       └── stripe/webhook/
│
├── components/
│   ├── layout/     ← Navbar, Footer, DashboardSidebar
│   └── marketing/  ← TickerBar, CountdownTimer, PlanCard, ReviewCard
│
├── lib/
│   ├── auth.ts     ← NextAuth config
│   ├── prisma.ts   ← Prisma client singleton
│   ├── utils.ts    ← Plan data, formatNaira, generatePaymentCode
│   ├── stripe.ts   ← Stripe client
│   └── email.ts    ← Nodemailer setup
│
├── prisma/
│   ├── schema.prisma   ← Full database schema
│   ├── seed.ts         ← Demo data seeder
│   └── dev.db          ← SQLite file (auto-created after setup)
│
├── middleware.ts       ← Route protection (role-based)
├── .env                ← Environment variables (pre-filled for local dev)
└── .prettierrc         ← Code formatting
```

---

## 💳 Payment Flows

### Card (Stripe)
1. User picks a plan → checkout page
2. Enters card details → hits Stripe
3. Stripe webhook (`/api/stripe/webhook`) fires → subscription activated

### Bank Transfer
1. System generates a unique `paymentCode` (e.g. `WM-4X9A2B`)
2. User transfers the exact amount, puts code in bank description
3. User clicks "I've Sent Payment" → recorded as PENDING
4. Admin opens `/admin` → clicks **Approve** → subscription activates instantly

---

## 🔒 Security

- Passwords hashed with **bcryptjs** (12 salt rounds)
- Routes protected by **middleware.ts** — unauthenticated users → `/login`
- Role-based access: Admin/Investor/Student see different routes
- Stripe **webhook signature verification**
- **NextAuth JWT sessions** with role embedded in token

---

## 🌐 Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Initial commit"
gh repo create wm-trading-academy --push

# 2. Import in Vercel dashboard → vercel.com/new
# 3. Add environment variables (switch DATABASE_URL to PostgreSQL)
# 4. Deploy
```

For production, swap `DATABASE_URL` in `.env` from SQLite to a PostgreSQL URL:
```env
DATABASE_URL="postgresql://user:pass@host:5432/wm_trading_academy"
```
And update `prisma/schema.prisma` `provider` from `"sqlite"` to `"postgresql"`.

---

## 📞 Contact

- WhatsApp: [wa.me/2349153137682](https://wa.me/2349153137682)
- Phone: **07065507517**
- Instagram / X: **@wm_winnerman**
- TikTok: **@wmwinnerman**
- Facebook: **Wm Winnerman**
