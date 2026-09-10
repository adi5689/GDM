# Grafiqly modernization audit

## Baseline
React 19 / Vite 8, Tailwind 3, one anchor-based page; no router or backend. Framer Motion throughout, GSAP additionally loaded by process. Three.js components exist but are not mounted. Working tree was clean. Baseline lint failed on unused `floatVariants`. Original hero: 2560 × 1440, 20 seconds, 33,998,749 bytes; eager autoplay without poster. No project photographs or client videos in repository.

## Priorities
- Critical: contact submit and newsletter silently discard input; scheduling and social/legal links are `#` stubs. Do not claim delivery or bookings without integration.
- High: dialogs lack semantics, Escape, focus containment/restoration; mobile menu lacks expanded state. Mobile fixed cards exceed narrow viewports. Uncontrolled motion; video has no pause control or reduced-motion behavior.
- High: repeated glows/gradients, icon-only project previews, seven navigation items, duplicate statements, and lengthy animated dashboard/timeline weaken creative-agency positioning.
- Medium: duplicate font request and excessive weights; GSAP duplicates Motion; huge public media copied to production; static charts presented as live analytics; repeated counter effects; avatar hover triggers React updates per pointer movement.
- Medium: vague metadata; absent social image, canonical, sitemap and 404; generic favicon; no confirmed production origin. No blog or separate case-study routes to preserve.
- Low: unused 3D and decorative components/dependencies; no exposed credentials or unsafe HTML found in active code.

## Direction
Retain the logo, cyan signature, original film, original projects, testimonials, metrics, team, anchor URLs and agency positioning. Use ink / warm neutral surfaces, editorial typography, wide case-study features, a numbered capabilities index, accessible native dialogs, concise sections and intentional motion. Do not manufacture project photography, logos, reviews, dates, industries, or results. Content data stays separate from presentation.

## Content and launch dependencies
Existing numbers, testimonials, awards, project claims and team bios are retained, not independently verified. Phone number looks like sample data; owner must verify it. Obtain approved project imagery and production footage before presenting visual case-study deliverables. No real newsletter, booking endpoint or form server exists. Use an explicitly labeled email draft workflow. Production origin must be supplied through SITE_URL to generate a correct canonical and sitemap. Privacy/terms and social destinations need approved content before publishing.
