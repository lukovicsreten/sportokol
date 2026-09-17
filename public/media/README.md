# Drop-in artwork

Files here are optional. `src/lib/media.ts` checks at build time whether each
one exists; when it does not, the component renders exactly as it did before —
no broken frame, no 404, no layout shift. Drop a file in, rebuild, and it
appears.

Names are fixed. The code looks for these exact paths:

| File | Where it lands | Format |
|---|---|---|
| `hero-poster.jpg` | Home hero background. Replaces the generated backdrop — the lattice, gradient mesh and motes stand down when it is present. | 1920×1080 |
| `hero-loop.mp4` | Home hero video, second iteration. Not wired up yet. | 1920×1080, H.264, under 5MB |
| `problem-invisible-talent.jpg` | "The Problem" card 1 | 4:3, 1200×900 JPEG |
| `problem-birthday-bias.jpg` | card 2 | 4:3, 1200×900 JPEG |
| `problem-subjective-evaluation.jpg` | card 3 | 4:3, 1200×900 JPEG |
| `problem-lost-knowledge.jpg` | card 4 | 4:3, 1200×900 JPEG |
| `og-background.jpg` | Behind the social card. The headline stays rendered by Satori on top — never bake text into the artwork. | exactly 1200×630 JPEG |
| `step-1-capture.png` | "How it works" ambient, second iteration | 16:9, 1600×900 |
| `step-2-structure.png` | ditto | 16:9, 1600×900 |
| `step-3-intelligence.png` | ditto | 16:9, 1600×900 |

The accent colour in every one of these should be the site's lime,
**#C6F135** — not teal. The rest of the palette is `#0A1628` and its
neighbours.
