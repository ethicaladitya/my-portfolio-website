# Aditya Shah — Portfolio Website

A modern, animated personal portfolio and resume website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Statically exported and hosted on GitHub Pages.

🌐 **Live site:** [theadityashah.com](https://theadityashah.com)

---

## ✨ Features

- **Animated Hero** — Typewriter role effect, floating glassmorphism blobs
- **Impact-Focused Cards** — What I Do section with gradient hover effects  
- **Interactive Timeline** — Expandable career milestones
- **Experience Section** — Structured work history with impact bullets
- **Community & Speaking** — Event cards with impact numbers
- **Live Stats** — Animated counter-up numbers on scroll
- **Blog Cards** — Styled post cards with category gradients
- **Terminal Easter Egg** — Fully functional CLI (`whoami`, `skills`, `stack`, `contact`)
- **Recruiter Mode** — Clean, printable, ATS-friendly resume overlay
- **QR Code Generator** — Generates QR code for portfolio URL
- **Dark Mode Toggle** — Class-based dark mode
- **Scroll Progress Bar** — Gradient progress indicator in navbar

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework with static export |
| Tailwind CSS v3 | Styling with custom design system |
| Framer Motion | Animations and transitions |
| `qrcode` | Client-side QR generation |
| GitHub Actions | CI/CD pipeline |
| GitHub Pages | Static hosting |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css       ← Design system (glassmorphism, gradients, keyframes)
│   ├── layout.tsx        ← SEO metadata, fonts
│   └── page.tsx          ← Main page, assembles all sections
├── components/
│   ├── Navbar.tsx        ← Sticky glass navbar
│   ├── Hero.tsx          ← Animated hero with typewriter
│   ├── WhatIDo.tsx       ← Impact cards
│   ├── LiveStats.tsx     ← Animated counters
│   ├── Timeline.tsx      ← Expandable career timeline
│   ├── Experience.tsx    ← Work history
│   ├── Community.tsx     ← Events & speaking
│   ├── Blog.tsx          ← Blog cards
│   ├── Terminal.tsx      ← CLI easter egg
│   ├── RecruiterMode.tsx ← Resume overlay
│   └── QRModal.tsx       ← QR code modal

public/
└── content.json          ← ALL site content (edit this to update the site)
```

---

## ✏️ How to Edit Content

All site content lives in **`public/content.json`**. Edit this file to update any section without touching code.

### Update personal info
```json
"meta": {
  "name": "Your Name",
  "email": "you@example.com",
  "github": "https://github.com/yourusername",
  ...
}
```

### Add a timeline entry
```json
{
  "year": "2025",
  "title": "Your New Role",
  "company": "Company Name",
  "description": "What you achieved...",
  "tags": ["Tag1", "Tag2"]
}
```

### Add a blog post
```json
{
  "title": "Post Title",
  "category": "Category",
  "excerpt": "Short description...",
  "readTime": "5 min read",
  "date": "2025-01-01",
  "gradient": "from-purple-500 to-blue-500"
}
```

---

## 🚀 Local Development

```bash
# Clone the repo
git clone https://github.com/ethicaladitya/my-portfolio-website.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🏗 Build & Deploy

### Build locally
```bash
npm run build
# Output in ./out/
```

### Deploy to GitHub Pages

1. Push to `main` branch → GitHub Actions auto-deploys
2. Go to **Settings → Pages** → Source: `Deploy from a branch` → Branch: `gh-pages`
3. Site will be live at `https://<username>.github.io/portfolio/`

### Manual deploy
The workflow in `.github/workflows/deploy.yml` runs automatically on every push to `main`.

npx -y gh-pages -d out -t -m "Deploy: comment to gh-pages"

---

## ⚙️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_BASE_PATH` | Base path for GitHub Pages | `/portfolio` |

Set `NEXT_PUBLIC_BASE_PATH` in `.env.local` for local testing with a subpath.

For production, the GitHub Actions workflow sets this automatically.

---

## 🖨 Recruiter Mode

Click **"Recruiter Mode"** in the navbar to open a clean, printable resume view. Use `Ctrl+P` / `Cmd+P` or the "Print / Save PDF" button.

---

## 📱 QR Code

Click **"Generate QR"** on the hero to open a modal with a scannable QR code pointing to your portfolio URL.

---

## 📄 License

MIT — feel free to fork and adapt for your own portfolio.
