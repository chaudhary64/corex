# CoreX — Premium Training Club

A modern, animation-rich landing page for a premium training club, built with Next.js, React, GSAP (ScrollTrigger + SplitText), Lenis smooth scrolling, and Tailwind CSS v4.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **GSAP** — ScrollTrigger, SplitText, DrawSVGPlugin
- **Lenis** — buttery smooth scrolling, synced with GSAP ticker
- **Tailwind CSS v4** — custom design tokens (ink, paper, lime, smoke)
- **next/font** — Bebas Neue, Inter, JetBrains Mono

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

```bash
pnpm dev     # start the dev server (Turbopack)
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # run ESLint
```

## Project Structure

```
src/app/
├── components/       # Home, Loader, Faq, Highlight, Testimonial, WhyUs, Image, ui/
├── context/          # LoadingProvider (asset-aware preloader)
├── data/             # homeData.js — all static site content
├── utils/            # SmoothScroller (Lenis + GSAP integration)
├── globals.css       # Tailwind v4 theme + custom tokens/animations
├── layout.js         # fonts, metadata, providers
├── page.js           # Loader → Home transition
└── template.js       # wraps routes with SmoothScroller
```

## Features

- Asset-aware preloader with counter animation and progress bar
- Scroll-triggered reveals across every section (hero, stats, ticker, values, classes, why-us, journal, testimonials, FAQ, CTA)
- Infinite marquee testimonials and hero ticker ribbon
- Full-screen mobile nav with clip-path reveal
- DrawSVG sine-wave footer animation
- Reduced-motion support for marquee/ticker animations

## Deploy on Vercel

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new) — it auto-detects this Next.js project. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
