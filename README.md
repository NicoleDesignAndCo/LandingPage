# Fractionl Studio — Website

A Vite + React + TypeScript site for Fractionl Studio. The site uses real browser routes for each main section while preserving the original one-page marketing experience on the homepage.

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Local dev server and production build |
| React | Component-based UI |
| TypeScript | Typed components and content data |
| React Router | Browser routes like `/about` and `/services` |
| React Helmet Async | Route-level SEO metadata |

## Routes

| Route | Page |
|------|------|
| `/` | Full landing page |
| `/about` | About and Team |
| `/services` | Services |
| `/process` | How We Work |
| `/contact` | Contact |

## Local Development

```bash
npm install
npm run dev
```

Build and preview production output:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Use the Vite defaults:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

`vercel.json` rewrites all route requests to `index.html`, so direct visits such as `/services` or `/about` work after deployment. Legacy `/team` visits redirect to `/about`.

## Updating Content

Most reusable content lives in `src/data.ts`, including:

- Studio email, domain, location, and Tally form ID
- Services
- Process steps
- Team members, links, tags, and headshots

Page layout and section composition live in `src/App.tsx`. The visual system lives in `src/styles.css`.

## Contact Form

The "Start a Project" buttons use the existing Tally popup. To change the form, update `tallyFormId` in `src/data.ts`.
