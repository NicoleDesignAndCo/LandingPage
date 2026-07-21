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

## Google Analytics 4

The official Google tag is installed directly in `index.html` with measurement ID `G-5NYS64CK8P`. Its `config` call sends the initial page view automatically. The route observer sends deduplicated manual `page_view` events only for subsequent SPA navigation.

Custom events include `service_view`, `work_view`, `external_demo_click`, `insight_view`, `insight_cta_click`, `start_project_click`, `contact_click`, `email_click`, `website_review_click`, `outbound_link_click`, and `generate_lead`. `generate_lead` is sent only after Tally posts its confirmed `Tally.FormSubmitted` event; no form values are included.

To test the integration, confirm requests and events with Google Tag Assistant or the GA4 Realtime/DebugView reports. GA4 events such as `generate_lead` can be marked as key events in the GA4 property.

The site does not currently include a cookie banner or consent-preference system. Review privacy and consent requirements for each visitor region before relying on Analytics in production; this technical integration alone does not establish legal compliance.
