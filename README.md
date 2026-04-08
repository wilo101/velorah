<div align="center">

# Velorah

### *حيث ترتفع الأحلام من خلال الصمت.*

**Where dreams rise through the silence.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=for-the-badge)](LICENSE)

[Studio case studies](https://github.com/wilo101/velorah) · [Journal](https://github.com/wilo101/velorah) · [Open Graph](https://ogp.me/)

</div>

---

## Overview

**Velorah** is a cinematic **Next.js (App Router)** marketing site: full-viewport hero video, **Instrument Serif** + **Inter** (via `next/font`), glass UI, and sections for **Home**, **Studio**, **About**, **Journal**, and **Reach Us**.

**Stack (aligned with common production setups):**

| Layer | Tech |
|--------|------|
| Framework | **Next.js 15.5.14** (React 19) |
| Motion | **Framer Motion** |
| UI primitives | **Radix UI** (`Dialog` for search palette, `Slot` in `Button`) |
| Styling | **Tailwind CSS v4** |
| Animation assets | **Lottie** (`lottie-react`, optional LottieFiles CDN URL) |
| Analytics | **Google Tag Manager** (`NEXT_PUBLIC_GTM_ID`) |
| Metadata | **Open Graph** + dynamic `opengraph-image`, `metadataBase` |
| Hosting | **Vercel** (recommended); put **Cloudflare** in front as CDN/WAF if you like |
| Performance | Link **dns-prefetch** for GTM & video CDN; static prerender for routes |

**Features:** mobile nav, **⌘K** command palette, studio filters, journal search + **Saved** (localStorage), share/copy links, reading progress, focus mode, reduced-motion support.

---

## Quick start

**Requirements:** Node.js **20+**

```bash
git clone https://github.com/wilo101/velorah.git
cd velorah
npm ci
npm run dev
```

Open `http://localhost:3000`.

---

## Environment

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for **Open Graph** / `metadataBase` |
| `NEXT_PUBLIC_GTM_ID` | **Google Tag Manager** container id (e.g. `GTM-XXXX`) |
| `NEXT_PUBLIC_LOTTIE_URL` | Optional; defaults to a **LottieFiles** sample JSON. |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Optional MP4 URL or `/file.mp4` in `public/` |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | [Web3Forms](https://web3forms.com) (contact form) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `mailto` fallback if Web3Forms key is empty |

In **Vercel**, add the same keys under Project → Settings → Environment Variables.

---

## Scripts

| Command | Description |
| --------| ----------- |
| `npm run dev` | Next.js dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint (`next/core-web-vitals`) |

---

## Project structure

```
velorah/
├── src/app/                 # App Router: pages, layout, globals, OG image
├── src/components/          # UI, SiteShell, CommandPalette (Radix Dialog), etc.
├── src/components/ui/       # Radix Slot button helper
├── src/data/siteContent.ts  # Projects + journal copy
├── src/hooks/ … src/lib/
├── public/
├── next.config.ts
├── postcss.config.mjs
└── vercel.json
```

---

## Deploy

1. Push this repo to GitHub.
2. Import on **[Vercel](https://vercel.com)** (framework: Next.js).
3. Set env vars; optional: add **Cloudflare** as reverse proxy/CDN in front of Vercel.

---

## License

Licensed under the **Apache License 2.0**. See [LICENSE](LICENSE).

<div align="center">

**Velorah** · *Tools for deep thinkers, bold creators, and quiet rebels.*

</div>
