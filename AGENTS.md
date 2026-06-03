# AGENTS.md — Wedding Invitation Site

## Project Overview

A single-page digital wedding invitation for Bassem & Anoud, built with TanStack Start (React SSR) and Tailwind CSS v4, deployed on Netlify.

## Directory Structure

```
src/
  routes/
    __root.tsx      — Root layout: loads Google Fonts (Great Vibes + Montserrat), sets page title
    index.tsx       — Entire invitation: envelope scene + opened invitation page
  styles.css        — Global reset + Tailwind import

public/
  couple2.jpg       — Couple photo displayed in circular frame
  wedding-music.mp3 — Background music (auto-plays, loops)
```

## Key Design Decisions

- **All CSS lives in a template literal** (`const css`) inside `index.tsx` — keeps the component self-contained and avoids Tailwind class collisions
- **Two-phase rendering**: the component renders either the envelope scene or the invitation page (never both simultaneously) controlled by `opened` boolean state
- **Audio autoplay**: attempted on mount via `useEffect`; browser policies may block it silently. A second play attempt fires on envelope click (user gesture), which browsers always allow
- **Countdown**: Cairo time is UTC+3 — the target date is `new Date('2026-06-13T19:00:00+03:00')`
- **Photo framing**: circular clip via `border-radius: 50%` + `overflow: hidden`; outer animated ring is a separate div with `spinSlow` keyframe animation
- **No Tailwind classes in index.tsx** — Tailwind only provides the global box-sizing reset

## Coding Conventions

- Functional React components only (no class components)
- CSS-in-JS via template literal string injected through `<style>` tag
- No external icon/component libraries (decorative elements use CSS, SVG, and Unicode)
- TypeScript with strict mode

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS-in-JS |
| Fonts | Google Fonts (Great Vibes, Montserrat) |
| Deployment | Netlify |
