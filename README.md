# DevOps Engineer Portfolio

A production-grade, fully responsive **DevOps Engineer portfolio** rebuilt with **Next.js 16 (App Router)**, **Tailwind CSS**, and **TypeScript** — styled with a premium Linear-inspired dark design system (indigo accent, glassmorphism cards, animated gradient blobs, scroll animations).

---

## 🗂️ Project Structure

```
jatin.devops.io/
├── app/
│   ├── globals.css          ← CSS variables, keyframes, utility classes
│   ├── layout.tsx           ← Root layout with metadata
│   └── page.tsx             ← Main page — imports all sections
│
├── components/
│   ├── Navbar.tsx           ← Sticky nav, scroll progress bar, mobile menu
│   ├── HeroSection.tsx      ← Animated blobs, parallax, terminal mock
│   ├── StatsStrip.tsx       ← Animated counters (IntersectionObserver)
│   ├── AboutSection.tsx     ← Two-column about + skill cards
│   ├── FeaturedProject.tsx  ← Flagship EKS project card
│   ├── ProjectsSection.tsx  ← Filter tabs + 9 cards + 13-item accordion
│   ├── SkillsSection.tsx    ← Tab navigation + animated skill bars
│   ├── ImpactSection.tsx    ← 4 business impact metric cards
│   ├── ContactSection.tsx   ← Contact links + terminal quick stats
│   ├── Footer.tsx           ← Simple footer
│   └── AnimatedSection.tsx  ← Scroll-reveal wrapper (fade + slide up)
│
├── hooks/
│   └── useIntersectionObserver.ts  ← Reusable viewport detection hook
│
├── .claude/
│   └── launch.json          ← Dev server config for Claude Code
│
├── tailwind.config.ts       ← Custom colours, animations, shadows
├── next.config.ts           ← Next.js config
├── tsconfig.json            ← TypeScript config
└── package.json
```

---

## ⚡ Quick Start — Run Locally

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18+ → [nodejs.org](https://nodejs.org)
- **npm** v9+ (comes with Node.js)

Check your versions:
```bash
node -v   # should be v18 or higher
npm -v    # should be v9 or higher
```

---

### Step 1 — Clone / enter the project

```bash
# If cloning from GitHub:
git clone https://github.com/YOUR_USERNAME/jatin.devops.io.git
cd jatin.devops.io

# Or if you already have the folder:
cd jatin.devops.io
```

---

### Step 2 — Install dependencies

```bash
npm install
```

This installs Next.js, React, Tailwind CSS, TypeScript and all related packages (~390 packages, ~1 minute).

---

### Step 3 — Start the development server

```bash
npm run dev
```

Open your browser and go to:
```
http://localhost:3000
```

> **Hot reload is enabled** — any file change will instantly reflect in the browser.

---

### Step 4 — Build for production (optional)

```bash
npm run build
```

Then preview the production build locally:
```bash
npm start
```

---

## 🚀 Deploy to GitHub Pages (Static Export)

### Step 1 — Enable static export

In `next.config.ts`, uncomment the export lines:

```ts
const nextConfig: NextConfig = {
  output: 'export',      // ← uncomment this
  trailingSlash: true,   // ← uncomment this
}
```

### Step 2 — Build

```bash
npm run build
```

This generates a static `out/` folder.

### Step 3 — Push to GitHub

```bash
git init
git add .
git commit -m "Deploy Next.js portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages

1. Open your repo on GitHub
2. Go to **Settings → Pages**
3. Under **Source**, choose `Deploy from a branch`
4. Select branch `main`, folder `/ (root)` or point it to `out/`
5. Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

---

## ✏️ Personalise Your Content

All content lives inside the component files. Update these to make it yours:

| What to change | File | What to edit |
|---|---|---|
| Name / title | `components/HeroSection.tsx` | Hero tag, headline |
| Description | `components/HeroSection.tsx` | `<p>` description block |
| Email / LinkedIn / GitHub | `components/ContactSection.tsx` | `CONTACT_LINKS` array |
| Quick stats | `components/ContactSection.tsx` | `QUICK_STATS` array |
| Projects | `components/ProjectsSection.tsx` | `PROJECTS` + `MORE_PROJECTS` arrays |
| Skills & levels | `components/SkillsSection.tsx` | `SKILL_GROUPS` array |
| Impact metrics | `components/ImpactSection.tsx` | `IMPACTS` array |
| Stats strip numbers | `components/StatsStrip.tsx` | `STATS` array |
| Featured project | `components/FeaturedProject.tsx` | Metrics, tags, arch lines |

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `bg-base` | `#050506` | Page background |
| `bg-elevated` | `#0a0a0c` | Section alt backgrounds |
| `accent` | `#5E6AD2` | Buttons, links, glows |
| `fg` | `#EDEDEF` | Primary text |
| `fg-muted` | `#8A8F98` | Body text, labels |
| Font | Inter + JetBrains Mono | Headings + code/labels |

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16 (App Router) | Framework |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Google Fonts | — | Inter + JetBrains Mono |

> **No heavy animation libraries.** All animations use CSS keyframes + `IntersectionObserver` + native scroll events.

---

## 📄 License

MIT — free to use and customise.
