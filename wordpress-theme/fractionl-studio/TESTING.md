# Testing checklist

## Installation and content

- [ ] Theme activates with PHP 8.2+
- [ ] ACF Pro is active before import
- [ ] `wp fractionl install-content` completes without errors
- [ ] Importer can be rerun without duplicate posts or media
- [ ] Eight pages, six services, six case studies, ten published Insights, and one draft exist
- [ ] Home and Insights are assigned as the front page and posts page
- [ ] Primary WordPress menu is assigned

## URLs and SEO

- [ ] Existing static page URLs return 200
- [ ] All service, work, and Insight URLs return 200
- [ ] `/work/restaurant-website-redesign` remains canonical
- [ ] Unknown paths return the branded 404 with a 404 status
- [ ] Titles, descriptions, canonicals, OG images, and article dates are correct
- [ ] Organization and Article JSON-LD validate
- [ ] WordPress XML sitemap includes public content
- [ ] Draft Insight is noindex and not exposed in listings

## Content management

- [ ] Every custom block has a preview and organized fields
- [ ] Page anchors work
- [ ] Service and Case Study relationships render correctly
- [ ] Team and footer updates flow from Studio Settings
- [ ] Image alt text survives import
- [ ] Decorative visuals are not unnecessarily editable

## Interaction and accessibility

- [ ] Skip link is keyboard-accessible
- [ ] Desktop and mobile menus are keyboard-operable
- [ ] Escape closes the mobile menu and returns focus
- [ ] Current menu item is identifiable
- [ ] Focus indicators are visible
- [ ] Heading hierarchy is logical
- [ ] Article tables are horizontally usable at small widths
- [ ] Reveal animation is disabled for reduced-motion users
- [ ] Tally opens from header, floating, page, and card CTAs
- [ ] Tally fallback URL works when its script is unavailable
- [ ] External links use `noopener noreferrer`

## Responsive and visual QA

- [ ] 1440×1000 desktop
- [ ] 1024×768 landscape tablet
- [ ] 768×1024 portrait tablet
- [ ] 390×844 mobile
- [ ] 320×568 narrow mobile
- [ ] No horizontal document overflow
- [ ] Header, hero, cards, service visuals, galleries, and footer match the reference
- [ ] Locally hosted fonts load with no Google Fonts request
- [ ] Images do not hotlink from Vercel

## Performance and browser QA

- [ ] Chrome, Safari, Firefox, and Edge current versions
- [ ] Page cache/CDN does not break Tally or navigation
- [ ] Lazy loading is applied below the fold
- [ ] Featured/hero images receive appropriate dimensions and priority
- [ ] No JavaScript console errors
- [ ] No PHP notices or warnings with `WP_DEBUG` enabled
