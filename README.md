# CoreX — Premium Training Club

A modern, animation-rich landing page for a premium training club, built with Vite, React, GSAP (ScrollTrigger + SplitText), Lenis smooth scrolling, and Tailwind CSS v4.

## Tech Stack

- **Vite 8**
- **React 19**
- **GSAP** — ScrollTrigger, SplitText, DrawSVGPlugin
- **Lenis** — buttery smooth scrolling, synced with GSAP ticker
- **Tailwind CSS v4** — custom design tokens (ink, paper, lime, smoke)
- **Google Fonts** — Bebas Neue, Inter, JetBrains Mono

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Scripts

```bash
pnpm dev      # start the Vite dev server
pnpm build    # production build
pnpm preview  # preview the production build
pnpm lint     # run ESLint
```

## Project Structure

```
src/
├── main.jsx           # Vite entry point
├── App.jsx            # providers + Loader/Home switch
└── app/
    ├── components/    # Home, Loader, Faq, Highlight, Testimonial, WhyUs, Image, ui/
    ├── context/       # LoadingProvider (asset-aware preloader)
    ├── data/          # homeData.js — all static site content
    ├── utils/         # SmoothScroller (Lenis + GSAP integration)
    └── globals.css    # Tailwind v4 theme + custom tokens/animations
```

## Features

- Asset-aware preloader with counter animation and progress bar
- Scroll-triggered reveals across every section (hero, stats, ticker, values, classes, why-us, journal, testimonials, FAQ, CTA)
- Infinite marquee testimonials and hero ticker ribbon
- Full-screen mobile nav with clip-path reveal
- DrawSVG sine-wave footer animation
- Reduced-motion support for marquee/ticker animations

## Deploy

Build a static production bundle with `pnpm build`, then serve the `dist/` directory from any static host or CDN.
