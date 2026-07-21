# Fractionl Studio WordPress Theme

A standalone custom WordPress theme converted from the Fractionl Studio Vite/React website. The original application remains untouched outside this directory.

## Requirements

- WordPress 7.0.2 or newer in the maintained 7.0 release line
- PHP 8.2 or newer
- Advanced Custom Fields Pro
- WP-CLI for the automated initial-content import

No page builder is required. Tally and Google Analytics remain optional external services configured through **Studio Settings**.

## Installation

1. Copy the `fractionl-studio` directory into `wp-content/themes/`.
2. Install and activate Advanced Custom Fields Pro.
3. Activate **Fractionl Studio** in Appearance → Themes.
4. Run the importer from the WordPress root:

   ```bash
   wp fractionl install-content
   ```

5. Visit Settings → Permalinks and click **Save Changes** if the server does not permit the importer to flush rewrite rules.
6. Confirm Appearance → Menus → Manage Locations assigns **Primary Navigation** to the Primary location.
7. Review Studio Settings, imported media, and page content before launch.

The importer is idempotent: it updates content located by post type and slug rather than creating duplicate pages or posts. Take a database backup before rerunning it on a site where editors have already changed imported content.

## Content architecture

- Pages: Home, About, Services, Process, Work, Team, Contact, Insights
- Services: `service` custom post type at `/services/{slug}`
- Case Studies: `case_study` custom post type at `/work/{slug}`
- Insights: native posts at `/insights/{slug}`
- Insight Categories: native categories
- Team and global contact details: Studio Settings options page

The Home, About, Services, Process, Work, Team, and Contact pages are assembled from controlled ACF blocks. Service and Case Study detail pages use structured fields and fixed templates so clients cannot accidentally break their layouts.

## ACF block library

- Studio Hero
- Split Introduction
- Card Grid
- Studio Differentiators
- Content Listing
- Process Steps
- Team Grid
- Media and Text
- Checklist
- Call to Action
- Contact Options
- Engagement Models

Each block has a dedicated renderer in `blocks/{block-name}/render.php`, editor preview mode, a client-facing description, and limited layout controls. Anchor support is enabled where useful.

## Global settings

Studio Settings contains:

- Studio name, general email, location, description, and logos
- Tally form ID, fallback URL, and optional administrator-provided embed code
- Optional announcement content
- Team members, biographies, images, alt text, skills, and links
- Footer content
- GA4 measurement ID

Only an allowlisted Tally iframe can be output from the optional embed-code field. Tally buttons otherwise use the form ID and fall back to the configured form URL.

## Fonts and assets

Hanken Grotesk and Spectral are bundled under `assets/fonts/` and loaded with local `@font-face` declarations. No Google Fonts request is made. The SIL Open Font License files are included beside the fonts.

Images are bundled under `assets/images/` and copied into the Media Library by the importer. No production image is hotlinked from Vercel.

## SEO

The theme provides custom title, description, canonical, social image, robots, Open Graph, Twitter Card, ProfessionalService, and Article metadata. When Yoast SEO, Rank Math, or SEOPress is active, the theme suppresses its own general metadata/schema to avoid duplicates.

WordPress core generates the XML sitemap. Verify it after launch and submit the new sitemap URL in relevant search consoles.

## Redirects and URLs

No redirect is required for Hudsons: the existing internal URL is preserved as `/work/restaurant-website-redesign`.

The following routes are also preserved:

- `/team`
- `/process`
- all six `/services/{slug}` routes
- all six `/work/{slug}` routes
- all published `/insights/{slug}` routes

WordPress now returns a real branded 404 instead of redirecting unknown URLs to the homepage. If the production server currently forces all paths through Vercel’s SPA rewrite, remove that rule when WordPress becomes authoritative.

Recommended optional redirects, only if analytics or backlink reports show traffic:

```text
/work/hudsons-canadas-pub  -> /work/restaurant-website-redesign  (301)
```

Do not redirect the retained `/team` or `/process` pages.

## Deployment

1. Back up files and database.
2. Deploy WordPress to staging with PHP 8.2+ and HTTPS.
3. Install the theme and ACF Pro, then run the importer.
4. Review imported content and image focal points.
5. Configure Tally and GA4 in Studio Settings.
6. Test Tally submission and analytics in their respective dashboards.
7. Replace Vercel DNS only after URL, metadata, and form QA passes.
8. Remove the old SPA rewrite and clear all page/CDN caches.
9. Recheck sitemap, robots rules, canonical URLs, and redirects in production.

## Remaining limitations

- Tally and Google Analytics remain third-party network dependencies by approval.
- Three intentionally preserved outbound demo links currently point to separate `vercel.app` demo sites. The WordPress theme and production site do not load code or assets from them; move those demos separately if eliminating every Vercel-hosted property is desired.
- Analytics consent controls are not included because requirements vary by visitor region and legal policy.
- CSS-drawn React visuals were recreated in semantic PHP/HTML and CSS; they are intentionally not editable artwork.
- WP-CLI is required for the automated migration. Content can be created manually through WordPress if WP-CLI is unavailable.
- Final production screenshots can vary slightly because WordPress image processing and browser font rasterization differ from the Vite build.

See `TESTING.md` for the release checklist.
