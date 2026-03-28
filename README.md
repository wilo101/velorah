<div align="center">

# Velorah

### *حيث ترتفع الأحلام من خلال الصمت.*

**Where dreams rise through the silence.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=for-the-badge)](LICENSE)

[Cinematic studio site](#-about) · [Glass UI](#-highlights) · [Background video hero](#-highlights)

</div>

---

## Overview

**Velorah** is a multi-page marketing and portfolio experience for a creative studio: hero with looping ambient video, layered typography (**Instrument Serif** + **Inter**), glassmorphic navigation and cards, and smooth route-based sections—**Home**, **Studio**, **About**, **Journal**, and **Reach Us**.

The stack is modern and minimal: **React 19**, **Vite 6**, **TypeScript**, **Tailwind CSS v4**, **React Router**, and **Motion**—ready to fork, customize, and deploy.

---

## Highlights

| | |
| --- | --- |
| **Visual language** | Full-viewport video backdrop, soft overlay, liquid-glass panels |
| **Routing** | Client-side routes with scroll restoration on navigation |
| **Motion** | Staggered fade-rise entrance animations |
| **DX** | Fast HMR, path alias `@/` (project root), env via Vite |

---

## Quick start

**Requirements:** [Node.js](https://nodejs.org/) 20+ (recommended)

```bash
git clone https://github.com/wilo101/velorah.git
cd velorah
npm install
npm run dev
```

Open **http://localhost:3000** (dev server is configured for port `3000`).

---

## Environment

Copy the example file and adjust as needed:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| -------- | ------- |
| `GEMINI_API_KEY` | Injected at build time for optional Gemini / GenAI integrations (`vite.config` defines `process.env.GEMINI_API_KEY`). The current UI does not call the API out of the box—you can wire it when you extend the app. |
| `APP_URL` | Reserved for hosted URLs, callbacks, or metadata. |

Never commit `.env`, `.env.local`, or real API keys. This repository ignores them via `.gitignore`.

---

## Scripts

| Command | Description |
| --------| ----------- |
| `npm run dev` | Start Vite dev server (port 3000, all interfaces) |
| `npm run build` | Production build to `dist/` |
| `npm run build:pages` | Production build + `404.html` copy for **GitHub Pages** (SPA fallback) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Typecheck with `tsc --noEmit` |
| `npm run clean` | Remove `dist` (Unix-style shell; on Windows you may delete `dist` manually) |

---

## Project structure

```
velorah/
├── .github/workflows/deploy-pages.yml
├── public/.nojekyll
├── scripts/copy-spa-fallback.mjs
├── src/
│   ├── App.tsx       # Routes, layout, pages, global video layer
│   ├── main.tsx
│   ├── routerBasename.ts
│   └── index.css     # Design tokens, glass utilities, animations
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── metadata.json     # App metadata (e.g. export / tooling)
├── .env.example
└── LICENSE
```

---

## Build & deploy

```bash
npm run build
```

Static output lives in **`dist/`**. You can deploy to **Vercel**, **Netlify**, **Cloudflare Pages**, or any static host that supports SPA fallback.

### GitHub Pages (this repo)

1. **Repository → Settings → Pages**: Source = **GitHub Actions** (workflow **Deploy to GitHub Pages**).
2. Pushing to **`main`** runs **`npm run build:pages`** and publishes **`dist/`** only (never the raw `index.html` that points at `/src/main.tsx`).
3. Production uses **`base: './'`** and **`resolveRouterBasename()`** so the app works at **`https://wilo101.github.io/velorah/`**.

If you ever see a white page and **`main.tsx` 404** in DevTools, the host is serving **source** instead of **`dist`** — fix the deploy source, not the React code.

---

## Tech stack

- **UI:** React 19, Tailwind CSS 4, Lucide icons  
- **Routing:** React Router 7  
- **Motion:** [Motion](https://motion.dev/)  
- **Tooling:** Vite 6, TypeScript 5.8  
- **Optional:** `@google/genai`, Express types (for future backend or tooling)

---

## License

Licensed under the **Apache License 2.0**. See [LICENSE](LICENSE).

---

<div align="center">

**Velorah** · *Tools for deep thinkers, bold creators, and quiet rebels.*

</div>
