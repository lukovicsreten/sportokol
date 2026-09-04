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
    slug: "tsc-backa-topola-case-study",
    title: "Case study: FK TSC Bačka Topola",
    heading: "Case Study: How FK TSC Bačka Topola Uses Sportokol to Track Talent",
    description:
      "How a Serbian top-flight club with a youth-first model runs its scouting operation, and what changed once every report lived in one database.",
    published: null,
    readingMinutes: 6,
    tags: ["Case study", "Clubs"],
    body: [
      {
        type: "p",
        text: "OUTLINE — and this one must not be written from guesswork. The headline says the club uses Sportokol to track talent, which is a stronger claim than the completed pilot the site currently describes. Establish which is true before a word of it is published.",
      },
      { type: "h2", text: "Confirm before drafting" },
      {
        type: "ul",
        items: [
          "Written approval from FK TSC to be named, and sign-off on the final text.",
          "Whether this is a finished pilot or ongoing use — the headline depends on the answer.",
          "How scouting worked before: tools, number of scouts, reporting cadence.",
          "Any figures the club will put its name to. Do not estimate or round up.",
          "A named quote from someone at the club.",
        ],
      },
      { type: "h2", text: "Structure once the facts exist" },
      {
        type: "ul",
        items: [
          "The club — level, youth intake, why talent identification matters to its model.",
          "The problem, in the club's own words.",
          "What changed in the workflow, concretely.",
          "Result — only what can be evidenced.",
        ],
      },
      {
        type: "p",
        text: "DISCLOSE — Aleksandar Isaković is Operations Director at FK TSC. That is what makes this access possible, and it belongs in the piece rather than left for a reader to find out elsewhere.",
      },
    ],
  },
  {
    slug: "relative-age-effect-youth-scouting",
    title: "The relative age effect in scouting",
    heading: "The Relative Age Effect: Why Your Academy Might Be Overlooking Future Stars",
    description:
      "Selection at age six skews roughly 90/10 toward early-born children. What that costs an academy, and how tracking development over time corrects for it.",
    published: null,
    readingMinutes: 7,
    tags: ["Talent identification", "Youth football"],
    body: [
      {
        type: "p",
        text: "OUTLINE — open with the number, because it does the work on its own: at age six, selection runs roughly 90/10 in favour of children born early in the cut-off year.",
      },
      { type: "h2", text: "What the relative age effect actually is" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — a child born in January can be eleven months older than one born in December in the same age group. At six years old that is a sixth of a lifetime, and it reads as ability.",
      },
      { type: "h2", text: "What it costs an academy" },
      {
        type: "ul",
        items: [
          "Late developers are filtered out before their growth catches up.",
          "The pool narrows to a birthday band rather than a talent band.",
          "Released players are rarely tracked, so the mistake stays invisible.",
        ],
      },
      { type: "h2", text: "How a player tracking database corrects for it" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — the fix is not a cleverer single judgement, it is a longer record. A trajectory across seasons separates a late developer from a player who has stalled; a snapshot cannot.",
      },
    ],
  },
  {
    slug: "scouting-without-video",
    title: "Scouting without video",
    heading: "Scouting Without Video: How to Evaluate Talent Pitch-Side",
    description:
      "Youth and grassroots sport is barely filmed, so video-based tools have nothing to work with. What a structured pitch-side framework captures instead.",
    published: null,
    readingMinutes: 6,
    tags: ["Scouting method", "Youth football"],
    body: [
      {
        type: "p",
        text: "OUTLINE — the incumbents are built on video, and the pitches where talent first appears are not filmed. That gap is the whole subject.",
      },
      { type: "h2", text: "Why video stops at the professional game" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — the economics of filming grassroots matches, and what a scout is left working with instead.",
      },
      { type: "h2", text: "What to capture instead, and how" },
      {
        type: "ul",
        items: [
          "Technical, physical and mental ratings against a shared scale.",
          "Free-text notes for what a scale cannot hold.",
          "Context: opposition level, minutes played, position, conditions.",
        ],
      },
      { type: "h2", text: "Making two scouts comparable" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — a shared vocabulary is what turns two opinions into two data points. Without one, a phrase like good first touch means whatever the writer meant that day.",
      },
    ],
  },
  {
    slug: "ai-in-football-scouting",
    title: "AI in football scouting",
    heading: "AI in Football: How Machine Learning Is Changing Scouting",
    description:
      "What an AI scouting tool can do with observational data, what it cannot do, and why the honest limits matter more than the list of capabilities.",
    published: null,
    readingMinutes: 8,
    tags: ["AI scouting tool", "Youth football"],
    body: [
      {
        type: "p",
        text: "OUTLINE — resist the temptation to oversell. This piece earns its readers on the second half, not the first.",
      },
      { type: "h2", text: "What AI can do with scouting reports" },
      {
        type: "ul",
        items: [
          "Turn scattered reports into a structured assessment: scores, strengths, gaps, trajectory.",
          "Answer questions across the whole pool rather than one player at a time.",
          "Flag progression curves that look unusual against a cohort.",
        ],
      },
      { type: "h2", text: "What it cannot do" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — it cannot see a player nobody scouted, cannot correct a biased scout, and cannot make the final call. Say so plainly. Every competitor is claiming otherwise, which is exactly why saying it is worth something.",
      },
      { type: "h2", text: "Why the data source sets the ceiling" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — a model trained on video from professional matches knows nothing about a fourteen-year-old on an unfilmed pitch.",
      },
    ],
  },
  {
    slug: "mental-health-academy-football",
    title: "Mental health in academy football",
    heading: "Mental Health in Academy Football: Why Tracking Matters Beyond Performance",
    description:
      "55% of released academy players show clinical distress within three weeks. What duty of care looks like when the record does not stop at release.",
    published: null,
    readingMinutes: 7,
    tags: ["Duty of care", "Academies"],
    body: [
      {
        type: "p",
        text: "OUTLINE — handle this one carefully. It concerns children being told they are not good enough, and it must not read as a product pitch wearing a concern costume.",
      },
      { type: "h2", text: "What happens at release" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — the site cites 55% of released academy players showing clinical distress within three weeks. Find and cite the primary study. Do not reuse the figure without a source a reader can check.",
      },
      { type: "h2", text: "Why the record usually stops at the exit" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — when a player is released their file closes. Nobody sees what happened next, so nobody learns whether the decision was right.",
      },
      { type: "h2", text: "What tracking beyond performance would mean" },
      {
        type: "p",
        text: "NEEDS REAL CONTENT — be concrete and modest about what software can address here. Most of the answer is human, not technical.",
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
