# SEO & performance pass

Technical-only pass over the existing site. No copy, section order or visual
design was changed, with two deliberate exceptions noted under *Trade-offs*.

## Lighthouse — before / after

Measured against `next build` + `next start` (not the dev server), median of
repeated runs on the same machine.

| Category | Mobile before | Mobile after | Desktop after |
|---|---|---|---|
| Performance | 84 | **100** | **100** |
| Accessibility | 92 | **100** | **100** |
| Best Practices | 93 | **100** | **100** |
| SEO | 100 | **100** | **100** |

The "after" column is measured against the live deployment on Vercel
(`https://sportokol-beta.vercel.app`). On a local `next start` the mobile
performance score lands at 95–98 — same build, noisier machine.

Core Web Vitals, mobile (4× CPU throttle, slow 4G):

| Metric | Before | After |
|---|---|---|
| First Contentful Paint | 1.5 s | **1.2 s** |
| Largest Contentful Paint | 3.5 s | **1.7 s** |
| Total Blocking Time | 309 ms | **40 ms** |
| Cumulative Layout Shift | 0 | **0** |

## What moved the needle

**Removing Framer Motion entirely (TBT 309 ms → 40 ms).** 42 `Reveal`s, 15
`Card`s, 10 counters and assorted `motion.div`s were all client components, and
hydrating them dominated main-thread script evaluation. Scroll reveals and the
allocation bars are now CSS scroll-driven animations (`animation-timeline:
view()`), so `Reveal`, `Card` and `StatCard` ship **zero** JavaScript. The
counters run on a small IntersectionObserver + rAF instead. `framer-motion` is
uninstalled.

The reveal CSS lives inside `@supports (animation-timeline: view())`, and the
base `.reveal` class is deliberately un-styled — a browser without scroll
timelines (Firefox, Safari today) shows the content normally. Nothing can be
left invisible by a missing feature or a failed script.

**`content-visibility: auto` on off-screen sections (Style & Layout 1229 ms →
386 ms).** The page is ~32,000 px of server-rendered markup; the browser was
laying all of it out before it could paint the hero. `contain-intrinsic-size:
auto 1200px` keeps the scrollbar stable.

## SEO

- Full Metadata API in `app/layout.tsx`: title template, description, keywords,
  canonical, Open Graph, Twitter `summary_large_image`, robots + googleBot
  (`max-image-preview: large`), icons, manifest.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` — all statically
  generated and verified over HTTP.
- `app/opengraph-image.tsx` (+ `twitter-image`) renders a real 1200×630 PNG at
  build time via `next/og`, in brand colours with the dot field and logo.
- JSON-LD `@graph` with Organization, WebSite, SoftwareApplication and FAQPage.
  Parsed and validated from the production HTML.
- New FAQ section. Its answers come from `src/lib/faq.ts`, shared with the
  JSON-LD so the structured data can never drift from the rendered page —
  Google penalises that mismatch. Every answer is drawn from the deck's own
  copy; none invents a fact.

**Canonical host.** `metadataBase` was pointing at `sportokol.com`, which is not
this site — canonicals aimed at another domain can keep a page out of the index
entirely. It now defaults to the live deployment and reads
`NEXT_PUBLIC_SITE_URL`. **Set that variable in Vercel when a real domain
exists**, otherwise canonical, sitemap, robots and OG URLs keep pointing at
`sportokol-beta.vercel.app`.

## Accessibility

The brand lime `#C6F135` is 14.3:1 on the navy surfaces but **1.3:1 on the
light ones** — the section kickers on 11 light sections were effectively
unreadable. Added `--color-lime-ink: #566e08`: same hue, 5.35:1 on the light
background. Applied to kickers, standalone icons and one badge on light cards.

Also fixed: faded `text-*/70` source notes (2.8:1), footer links that had no
explicit colour and so fell back to the UA link blue at 2.4:1, skip-to-content
link, visible `:focus-visible` rings, `aria-label` on all 21 sections,
`<article>` for the success stories, `<figure>/<figcaption>` for screenshots.

## Bundle

First-load JS: **186 KB gzipped** (614 KB raw) across 7 chunks. The three
largest are all framework code, not application code:

| gzip | raw | contents |
|---|---|---|
| 72 KB | 223 KB | React + app-router + scheduler |
| 47 KB | 173 KB | React + app-router |
| 40 KB | 109 KB | Next.js client runtime |

`@next/bundle-analyzer` is wired up: `ANALYZE=true npm run build`.

## Trade-offs / notes

- **The hero headline and subtitle no longer animate in.** They were held at
  `opacity: 0` behind an animation delay, and an unpainted element cannot
  register as LCP. Everything else still reveals on scroll.
- **The prompt assumed the product mockups were still code/SVG.** They are real
  screenshots from the deck (replaced earlier at your request), so they are
  optimised as images — AVIF/WebP via `next/image`, explicit `sizes`, and a
  pannable container on phones — rather than left as markup.
- **`recharts` is not used**, so there was nothing to tree-shake there.
- Below-the-fold sections are code-split with `next/dynamic` but keep SSR on;
  `{ ssr: false }` would have pulled the content out of the HTML and cost more
  in SEO than it saved in JS.
