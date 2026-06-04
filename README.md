# Nicole Design & Co. — Website

A polished one-page static site. Plain **HTML, CSS, and vanilla JavaScript** — no build tools, no dependencies to install.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All page content and SEO meta tags |
| `styles.css` | Design system + all styling (CSS variables at the top) |
| `script.js` | Smooth scroll, sticky header, mobile menu, scroll reveals |
| `image-slot.js` | Drag-and-drop headshot placeholders (see note below) |

---

## Deploy to Vercel

### Option A — Drag & drop (fastest, no account setup)
1. Go to **https://vercel.com** and sign in (GitHub/GitLab/email all work).
2. On the dashboard, click **Add New… → Project**.
3. Choose the **deploy a static folder** flow, or simply **drag this whole folder** onto the Vercel import screen.
4. No build settings are needed — when asked, set **Framework Preset = Other** and leave the Build Command **empty**. Output directory is the project root.
5. Click **Deploy**. Your site is live in seconds at `your-project.vercel.app`.

### Option B — Git-based (recommended for ongoing edits)
1. Push this folder to a GitHub repository.
2. In Vercel, **Add New… → Project → Import** that repo.
3. Framework Preset = **Other**, Build Command = *(empty)*, Output Directory = `./`.
4. **Deploy.** Every future `git push` auto-deploys.

### Option C — Vercel CLI
```bash
npm i -g vercel      # one-time
cd path/to/this/folder
vercel               # follow the prompts; accept defaults
vercel --prod        # promote to your production domain
```

### Custom domain (nicoledesignandco.com)
Project → **Settings → Domains → Add** `nicoledesignandco.com`, then point your registrar's DNS to Vercel as shown. Update the `og:url` / `canonical` URLs in `index.html` if your final domain differs.

---

## How to update content

Everything is plain text in `index.html` — search for the text you want to change.

**Personal links** (Team cards + footer) are live:
- Nicole — Portfolio `https://nicole-buloran.com/`, LinkedIn `https://www.linkedin.com/in/nicolebuloran/`
- Nick — Portfolio `https://nick-castillo.ca/`, LinkedIn `https://www.linkedin.com/in/nick-castillo-full-stack-developer/`
- To change any, search for the URL in `index.html` (each appears in the Team card and the footer).

**Emails** are live `mailto:` links — change them in one place each if needed.

**Colors / type** live as CSS variables at the very top of `styles.css` (`:root { … }`). Change `--accent` to reshade the whole site's accent color.

## Contact form (Tally popup)

The "Start a Project" buttons (hero, nav, and final CTA) open a [Tally](https://tally.so) popup — there is no separate contact page. Each trigger is a button with:

```html
<button data-tally-open="xXzMGr" data-tally-emoji-text="👋" data-tally-emoji-animation="wave">Start a Project</button>
```

and the embed script is loaded once before the closing `</body>`:

```html
<script async src="https://tally.so/widgets/embed.js"></script>
```

**To use a different form:** create your form in Tally, copy its form ID, and replace every `data-tally-open="xXzMGr"` with your new ID (search the file — there are three).

---

## Team headshots

The headshot areas use a drag-and-drop slot component (`image-slot.js`) so you can drop photos in while previewing. **On a live Vercel deployment those drops won't save** — for production, replace each slot with a normal image:

```html
<!-- Replace this: -->
<image-slot id="headshot-nicole" class="team-photo" ...></image-slot>

<!-- With this (drop your photo in the folder first): -->
<img class="team-photo" src="nicole.jpg" alt="Nicole Buloran" />
```

Recommended headshot ratio: **3 : 4 (portrait)**, e.g. 900×1200px.

---

## Notes
- Fully responsive, mobile-first, accessible (semantic landmarks, ARIA on the menu, reduced-motion support).
- No fake testimonials, client logos, or filler copy — by design.
- **Experience you can build on** is an editorial two-column section summarizing Nicole's and Nick's experience — credibility-focused, no tags, metrics, logos, or case studies. Project detail lives on their individual portfolios (linked in the Team section).
