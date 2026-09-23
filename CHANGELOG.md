# Changelog - Programming Bridge Frontend Web Application

All notable changes to the **Programming Bridge Frontend Web Application** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.3] — 2026-03-20

### Added
- **Google Analytics GA4 Measurement**: Configured official GA4 measurement ID (`G-QCYK4XDQQN`) via Next.js `next/script` in RootLayout and `.env` environment variables.
- **HR Email Recruitment Routing**: Integrated Zoho HR mailer routing (`hr@programmingbridge.org`) for all job candidate activities (interview invitations, status updates, rejection dispatches) and updated dashboard modal preview footers.

---

## [0.3.2] — 2026-03-10

### Added
- **Interactive Floating Chatbot Widget**: Created native `ChatBot.tsx` component with instant AI conversational assistant, quick action suggestion chips, and dynamic dark/light mode compatibility.
- **WhatsApp Live Support Integration**: Integrated direct WhatsApp click-to-chat connect with dedicated agency technical lead (`+923155831940`).

### Changed
- **Affordable Startup Pricing Tiers**: Updated bot estimations and contact form budget ranges to affordable startup tiers ($300–$800 MVP, $1,000–$2,500 Full-Stack Platform, $3,000+ Enterprise).

### Fixed
- **Tawk.to Script Loader Fix**: Optimized script injection lifecycle to prevent missing `window.onload` event in Next.js App Router SPAs.

---

## [0.3.1] — 2026-02-25

### Fixed & Enhanced (L-01 to L-08)
- **L-01 (Phone Number Validation & Sanitization)**: Restricted phone input fields in contact and job application forms to phone characters (`+`, digits, hyphens, spaces, parens) with regex validation on submit.
- **L-02 (Default Budget Option)**: Changed initial budget select state to an unselected placeholder (`""`), prompting users to make a deliberate choice.
- **L-03 (Skip to Content Accessibility Link)**: Added a keyboard-accessible `"Skip to main content"` shortcut link at the root layout targeting `<main id="main-content">` on all pages.
- **L-04 (Hero Carousel Pause / Play Controls)**: Added an accessible Pause/Play toggle button to the hero carousel allowing users to pause auto-rotation.
- **L-05 (Screen Reader Marquee Duplicate Prevention)**: Added `aria-hidden="true"` to duplicate items in the infinite scrolling tech stacks and service marquees so screen readers do not repeat entries.
- **L-06 (Hero Slider Click Transition Race Fix)**: Implemented instantaneous timer reset on manual pagination/navigation clicks in `useCarousel` to eliminate missed slide transitions.
- **L-07 (Chat Widget Layout Clearance)**: Added bottom-right safe area spacing in the footer to prevent the Tawk.to floating chat widget from overlapping text or buttons in light and dark modes.
- **L-08 (Mobile Drawer CTA)**: Added a high-visibility `"Get in Touch"` primary action button inside the mobile drawer navigation.

---

## [0.3.0] — 2026-02-10

### Security & Accessibility (D-01 to D-10)
- **D-01 (Light Mode Contrast)**: Refined `:root` brand color tokens (`#008A4B`) to achieve WCAG AA compliant $\ge 4.5:1$ contrast against white text and backgrounds.
- **D-02 (Security Headers & Clickjacking)**: Added `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and strict `Content-Security-Policy` in `next.config.ts`.
- **D-03 (CDN Configurations)**: Configured all remote image patterns (`unsplash`, `cloudinary`, `github`, `jsdelivr`, `seaborn`) in Next.js config.
- **D-04 (CLS Prevention)**: Added explicit `width`, `height`, and `decoding="async"` attributes to all `<img>` tags across projects, marquee, team, and tech stack tabs.
- **D-05 (Careers Modal Accessibility)**: Added `Escape` key listener, backdrop dismissal, body scroll lock, and ARIA dialog roles to `JobApplyModal.tsx`.
- **D-06 (Web Analytics Setup)**: Integrated Google Analytics 4 (GA4) measurement script with configurable `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **D-07 (Landscape Social Share Banner)**: Generated 1200x630 landscape OpenGraph/Twitter card (`opengraph-image.tsx` & `/og-image.png`).
- **D-08 (Careers Page Bottom Section)**: Replaced client sales inquiry form with a dedicated Engineering Talent Open Application CTA section.
- **D-09 (Navbar 6 Services Sync)**: Synchronized Services dropdown across MongoDB and frontend fallback to list all 6 core services.
- **D-10 (Response Time Copy Harmonization)**: Unified response time SLAs to `< 2 hours` average response across all forms, metadata, and copy.

---

## [0.2.0] — 2026-01-20

### Routing & SEO Enhancements (C-01 to C-03 & M-01 to M-10)
- **C-01 & C-02**: Implemented dynamic `/services/[slug]` routing for all 8 services with valid 404 handler for invalid routes.
- **C-03 & M-10**: Sanitized portfolio links and replaced placeholder URLs with verified GitHub repo and live demo links.
- **M-01 & M-02**: Fixed footer anchor navigation and made About section "Learn more" buttons fully interactive.
- **M-03 & M-04**: Added dynamic `sitemap.xml`, `robots.txt`, and canonical URL metadata.
- **M-05**: Added 404 title and `noindex, nofollow` metadata.
- **M-06 & M-07**: Contact form accessibility (`htmlFor`/`id`) and honeypot + time-gate bot protection.
- **M-08 & M-09**: Single `<h1>` tag enforcement in Hero carousel and dynamic `as` prop in SectionHeader.
