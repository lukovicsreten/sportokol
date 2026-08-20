# UX review — what was implemented

All ten review points are addressed. Lighthouse after the pass, mobile:
**97 performance / 100 accessibility / 100 best practices / 100 SEO**, CLS 0 —
none of the new navigation, diagrams or animation cost measurable performance.

---

## High priority

### 1 · Hero value proposition
The H1 stays as the hook. Directly beneath it, a new plain-language line says
what the product is and who buys it, before any further detail:

> The pitch-side scouting platform that turns observations into a structured,
> national talent database for clubs, academies and federations.

The old one-liner is demoted to a smaller supporting sentence, so the
hierarchy is **hook → what it is → detail → sport badges**.

### 2 · Scroll fatigue on a 21-section page
- **Nav grouped into six chapters** (Problem, Product, Proof, Market,
  Investors, Team) instead of six arbitrary anchors, with **scroll-spy**
  highlighting the group you are in. Verified: scrolling to `ai-layer`
  highlights *Product*, `traction` highlights *Proof*, and so on.
- **Reading-progress bar** across the top.
- **Chapter markers** open each group — `01 PROBLEM · The problem … 01 / 06` —
  so progress through the narrative is legible.
- **Long copy shortened**, with the detail moved behind a `Disclosure`
  (native `<details>`). Market's "what is not counted" note is the first
  example.

`src/lib/chapters.ts` is the single source for all four of these, so a section
cannot be filed under one chapter in the nav and labelled as another.

### 3 · Visual hierarchy by content type
Sections now carry a `kind` and render a matching surface:

| Kind | Sections | Treatment |
|---|---|---|
| `product` | Platform, How It Works, AI Layer, Ask Your Database | white, app-like |
| `evidence` | Wedge, Data Asset, Why Compounds, Traction, Success Stories | tinted with an inset lime ring |
| `pitch` | Market, Business Model, Revenue, Roadmap, Ask, Runway, Funds | off-white, tabular |

A type icon sits in every chapter bar, so the difference registers while
skimming.

---

## Medium priority

### 4 · Diagrams instead of text
- **Talent funnel** — rebuilt from the deck's flat PNG into SVG. Layers narrow
  in on scroll and the surviving mark drops through the neck.
- **Four data streams** — rebuilt as SVG; each line draws itself toward the
  athlete-profile hub in its own legend colour.
- **Flywheel** — was a left-to-right arrow sequence, which reads as a pipeline
  with an end. Now an actual circle with three numbered nodes and arrowheads
  running around it.
- **Market SAM** — the two figures sat in separate boxes, hiding the point
  that the second contains the first. Now one bar stacking football into the
  multi-sport total.

All four animate on the CSS scroll timeline, so they add **zero JavaScript**.

### 5 · Illustrations
Three custom SVGs in one deliberate style — 2px strokes, rounded caps, navy
with lime as the only accent, no gradients: `ScoutAtPitch`,
`NationalTalentMap`, `AiAssessment` in `src/components/illustrations`.

They were placed only in sections that had **no** imagery (How It Works,
Wedge, Roadmap) rather than stacked on top of the real product screenshots.
Each carries a `REPLACE:` comment marking where a real photo should go.

### 6 · CTA by audience
- Nav bar: **Book a demo** (primary) plus **Investor deck**.
- Final section: three named routes — *I'm a club, academy or agency* → Book a
  demo; *I'm an investor* → Request the deck; *I'm a scout* → Join early
  access.
- Every button opens a `mailto:` whose **subject identifies the route**
  ("Demo request — Club / Academy / Agency") with a short pre-filled body, so
  the inbox can tell the paths apart without a backend.

---

## Lower priority

### 7 · Footer
Logo, tagline, three site-map columns (Product / Company / Investors),
contact, and a legal row with `© 2026 Sportokol / SM Solutions` plus a
Privacy Policy link.

`/privacy` is a real route, clearly badged **Placeholder**, `noindex`, and
lists what the actual policy must cover. It is not lorem ipsum pretending to
be a policy — the platform processes minors' special-category data, so this
one needs a lawyer.

### 8 · Micro-interactions
Every section reveals on scroll; sport badges scale and brighten on hover and
now link into the product chapter; cards lift on hover. All CSS — the
animation library was removed in the performance pass and nothing here brought
it back.

---

## Notes on the review's assumptions

- The review asked for the data-stream and funnel diagrams as *new* work. They
  already existed as flat PNGs lifted from the deck; both were rebuilt as SVG
  so they could animate and scale, which loses nothing since the deck versions
  were raster.
- It also assumed there was no real imagery. There is: three product
  screenshots and two founder photos from the deck. The illustrations fill the
  gaps around them rather than replacing them.

## Performance guardrails

Scroll-spy uses a single `IntersectionObserver` scoring sections by how much
of the viewport they occupy — not a scroll listener calling
`getBoundingClientRect` on 22 sections per tick. The progress bar is
`animation-timeline: scroll()`, so it also runs without a scroll listener.
Both degrade silently where unsupported.
