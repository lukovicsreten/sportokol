/**
 * Blog posts.
 *
 * Plain TypeScript modules rather than MDX: a handful of articles does not
 * justify a markdown pipeline, and this way a post is type-checked at build
 * time — a missing title or a malformed block fails the build instead of
 * rendering broken.
 *
 * `published` is the switch. A post with `published: null` is a draft: it is
 * absent from the listing, absent from the sitemap, and its own page carries
 * noindex. That matters for search — three outline-only articles shipped as
 * live pages read to Google as thin content, which drags on the whole domain
 * rather than helping it. Set the date when the text is actually written.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type Post = {
  slug: string;
  /**
   * Kept to 48 characters or fewer. The layout's title template appends
   * " | Sportokol" (12 chars), and Google truncates the rendered title around
   * 60 — so anything longer here is cut off in the result that matters.
   */
  title: string;
  /** The <h1>. May be longer and more natural than the meta title. */
  heading: string;
  /** 160 characters or fewer. */
  description: string;
  /** ISO date, or null while the post is a draft. */
  published: string | null;
  updated?: string;
  readingMinutes: number;
  tags: string[];
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "reducing-subjectivity-in-scouting",
    title: "How to reduce subjectivity in scouting",
    heading: "How to reduce subjectivity in scouting",
    description:
      "Two scouts watch the same player and file different reports. A shared framework, tracked over time, is what turns opinion into comparable evidence.",
    published: null,
    readingMinutes: 7,
    tags: ["Scouting method", "Talent identification"],
    body: [
      {
        type: "p",
        text: "OUTLINE — not yet written. Open with the concrete version of the problem: the same player, two scouts, two verdicts, and no way to tell which one the club should act on.",
      },
      { type: "h2", text: "Where the bias actually comes from" },
      {
        type: "ul",
        items: [
          "The relative age effect — selection skewed roughly 90/10 toward early-born children at age six.",
          "Physical maturity read as ability, which quietly penalises late developers.",
          "No shared vocabulary, so two scouts writing \"good first touch\" may not mean the same thing.",
          "Recency: the last match seen outweighs the six before it.",
        ],
      },
      { type: "h2", text: "What a shared framework has to fix" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — describe the technical / physical / mental split the platform uses, and why free-text notes sit alongside it rather than being replaced by it.",
      },
      { type: "h2", text: "Why tracking over time matters more than any single report" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — a single observation is an opinion; the same observation repeated across months is a trajectory, and a trajectory is what separates a late developer from a player who has stopped progressing.",
      },
      { type: "h2", text: "What this looks like in practice" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — walk through one scout's week: what they enter pitch-side, what the club sees the next morning.",
      },
    ],
  },
  {
    slug: "ai-in-youth-football",
    title: "AI in youth football: what it can do",
    heading: "AI in youth football: what it can and cannot do",
    description:
      "Video-based analytics never reach the grassroots pitches where talent is first visible. What AI can do with observational data instead, and what it can't.",
    published: null,
    readingMinutes: 8,
    tags: ["AI", "Youth football"],
    body: [
      {
        type: "p",
        text: "OUTLINE — not yet written. Lead with the gap: the incumbents are built on video, and youth football is barely filmed, so the tools that dominate the professional game have nothing to work with at the level where talent first appears.",
      },
      { type: "h2", text: "Why video-based tools stop at the youth level" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — the economics of filming grassroots matches, and what that leaves scouts working with instead.",
      },
      { type: "h2", text: "What AI can do with observational data" },
      {
        type: "ul",
        items: [
          "Turn a scattered set of reports into a structured assessment — scores, strengths, gaps, trajectory.",
          "Answer questions across the whole pool rather than one player at a time.",
          "Surface players whose progression curve looks unusual against their cohort.",
        ],
      },
      { type: "h2", text: "What it cannot do, and should not claim to" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — be honest here; this section is what makes the piece worth reading rather than marketing. AI cannot see a player it has no data on, cannot correct for a biased scout, and cannot replace the judgement call at the end.",
      },
    ],
  },
  {
    slug: "case-study-fk-tsc",
    title: "Case study: scouting at FK TSC",
    heading: "Case study: scouting operations at FK TSC Bačka Topola",
    description:
      "How a club competing in Europe runs its scouting operation, and where the pitch-side reporting workflow changed.",
    published: null,
    readingMinutes: 6,
    tags: ["Case study", "Clubs"],
    body: [
      {
        type: "p",
        text: "OUTLINE — not yet written, and this one must not be written from guesswork. Everything below needs confirming with the club before it goes anywhere near publication.",
      },
      { type: "h2", text: "Facts to gather before drafting" },
      {
        type: "ul",
        items: [
          "Written approval from FK TSC to be named, and sign-off on the final text.",
          "How the scouting operation actually worked before — tools, number of scouts, reporting cadence.",
          "What specifically changed, with dates.",
          "Any numbers the club is willing to publish. Do not estimate or round up.",
          "A named quote from someone at the club.",
        ],
      },
      { type: "h2", text: "Structure once the facts exist" },
      {
        type: "ul",
        items: [
          "Situation — the club, the level it competes at, the scale of its youth intake.",
          "Problem — stated in the club's own words.",
          "What changed — the workflow, concretely.",
          "Result — only what can be evidenced.",
        ],
      },
      {
        type: "p",
        text: "NOTE — Aleksandar Isaković is Operations Director at FK TSC, which is what makes this access possible. That relationship should be disclosed in the piece rather than left for a reader to discover.",
      },
    ],
  },
];

/** Live posts, newest first. Drafts never appear. */
export function publishedPosts(): Post[] {
  return POSTS.filter((p) => p.published).sort((a, b) =>
    (b.published ?? "").localeCompare(a.published ?? "")
  );
}

export function findPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
