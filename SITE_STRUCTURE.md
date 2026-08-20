# Site structure — MVP

**This is not the final information architecture.** It is the first multi-page
cut, covering five routes. The next wave is listed at the bottom.

Lighthouse across all four public routes: **92–98 performance, 100
accessibility, 100 best practices, 100 SEO**, CLS 0 everywhere.

---

## Routes

### `/` — Home (hub)

A short overview that routes onward, not a page that tries to close the deal
by itself.

| Section | Notes |
|---|---|
| Hero | Unchanged: hook, plain statement of what the product is, sport badges |
| The Problem | `variant="compact"` — headline, funnel, four failures reduced to title + fix |
| How It Works | Full, unchanged. It is the clearest summary of what the platform does |
| Traction strip | Four claims as badges only |
| Market snapshot | The two headline figures and the stacking bar |
| Where to next | Three cards: clubs → `/product`, investors → `/investors`, questions → `/contact` |

### `/product`

Everything about what the platform does, in full.

Product hero (with sport badges) → The Problem (full) → The Platform →
How It Works → The AI Layer → Ask Your Database → The Wedge → The Data Asset →
Why The Data Compounds → Vision & Roadmap → **See it on your team** →
`/contact?type=demo`

Sports are shown as badges only. No per-sport routes in this wave.

### `/investors`

The business case, in a consistently dark, data-heavy register.

Investor hero with **Request the deck** → securities disclaimer →
Traction & Validation → Success Stories → Market Opportunity → Business Model
(Buyers) → Revenue Engines → Second Revenue Line → The Ask → The Runway →
Use of Funds → The Founders → **Talk to the founders** →
`/contact?type=investor`

### `/contact`

Built from scratch. Name, email, an "I am a…" selector (Club/Academy · Agency ·
Federation · Investor · Other) and a message.

`?type=` pre-fills it: `demo` selects Club/Academy, `investor` selects
Investor, `scout` selects Other — each with its own message prompt. Direct
email and website sit below the form for anyone who would rather not use it.

**No backend.** Submitting composes the message and hands it to the visitor's
mail client. Nothing is collected or stored by the site, and the form says so.
Marked `TODO` in `ContactForm.tsx` for a real handler (Resend, Formspree).

### `/privacy`

Structural template covering Overview, What we collect, How we use it,
**Data on minors**, Data sharing and the data revenue line, Your rights, and
Contact.

Badged as placeholder in the page itself and `noindex` in metadata, and left
out of the sitemap — a sitemap entry would ask Google to crawl what the page
refuses. Sportokol processes special-category data about minors, which is
exactly where a template is most dangerous. **Counsel must review it before it
is published or relied on.**

---

## Shared

**Navigation** — Home · Product · Investors · Contact, real `next/link`
routing with the active page marked via `aria-current="page"`. Privacy is
footer-only. Nav and footer live in `app/layout.tsx`, so all five routes share
one copy.

**Footer** — Product (Overview, Platform, How it works, AI layer) · Company
(Team, Traction, Contact) · Investors (Overview, The ask, Use of funds, deck) ·
legal row linking `/privacy`.

**SEO** — every route has its own `title` and `description`, plus a canonical.
`sitemap.ts` lists the four indexable routes.

**Reuse over duplication** — `Problem` takes `variant="compact" | "full"` and
is rendered on both Home and `/product`. `SamStack`, `TalentFunnel`,
`AthleteProfileDiagram`, `Flywheel` and `PageHero` are all shared components,
not copies.

---

## Two things that changed on the way

**Chapter numbering was retired.** The previous pass added `01 / 06` chapter
markers and a chapter scroll-spy to orient readers inside one 32,000px page.
With five routes and a real nav, per-page numbering would compete with the nav
rather than help. The section *typing* it rode on (product / evidence / pitch,
which drives the surface treatment) was kept.

**A dead link was caught in the split.** The hero sport badges pointed at
`#platform`, which lives on `/product` now — on Home they scrolled nowhere.
They route to `/product`. The footer also pointed at `/investors#the-ask` while
the section id was `ask-round`; the id was renamed. All ten internal anchors
were audited against the rendered ids and resolve.

---

## Next wave (not built)

- `/for/clubs`, `/for/agencies`, `/for/federations` — audience landing pages
- `/case-studies` as a list, with FK TSC and LALIGA as entries
- `/blog`
- `/careers`
- `/terms`
- Per-sport routes under `/product`
- A real form backend, replacing the mailto fallback
- Reviewed legal text for `/privacy`
