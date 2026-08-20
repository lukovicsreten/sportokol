/**
 * The narrative spine of the page.
 *
 * Nav groups, the scroll-spy, the chapter labels and the progress indicator
 * all read from here, so a section can never appear in the nav under one
 * chapter and be labelled as another.
 */
export type SectionKind = "product" | "evidence" | "pitch" | "problem";

export type Chapter = {
  /** Two-digit label shown in the chapter bar. */
  number: string;
  /** Short name used by the chapter bar and the nav. */
  title: string;
  /** Anchor of the first section in the chapter — the nav links here. */
  anchor: string;
  /** Every section id in the chapter, for scroll-spy. */
  sections: string[];
  /** Drives the visual treatment of the sections inside it. */
  kind: SectionKind;
  /** Hidden from the desktop nav when false (keeps the bar to five links). */
  inNav: boolean;
};

export const CHAPTERS: Chapter[] = [
  {
    number: "01",
    title: "Problem",
    anchor: "#problem",
    sections: ["problem"],
    kind: "problem",
    inNav: true,
  },
  {
    number: "02",
    title: "Product",
    anchor: "#platform",
    sections: ["platform", "how-it-works", "ai-layer", "ask"],
    kind: "product",
    inNav: true,
  },
  {
    number: "03",
    title: "Proof",
    anchor: "#wedge",
    sections: [
      "wedge",
      "data-asset",
      "why-compounds",
      "traction",
      "success-stories",
    ],
    kind: "evidence",
    inNav: true,
  },
  {
    number: "04",
    title: "Market",
    anchor: "#market",
    sections: [
      "market",
      "business-model",
      "revenue-engines",
      "second-revenue-line",
      "roadmap",
    ],
    kind: "pitch",
    inNav: true,
  },
  {
    number: "05",
    title: "Investors",
    anchor: "#ask-round",
    sections: ["ask-round", "runway", "use-of-funds"],
    kind: "pitch",
    inNav: true,
  },
  {
    number: "06",
    title: "Team",
    anchor: "#team",
    sections: ["team", "faq"],
    kind: "evidence",
    inNav: true,
  },
];

/** Section id -> the chapter it belongs to. */
export const CHAPTER_BY_SECTION = new Map(
  CHAPTERS.flatMap((c) => c.sections.map((s) => [s, c] as const))
);

/** Ids of the first section in each chapter, which renders the chapter bar. */
export const CHAPTER_OPENERS = new Set(CHAPTERS.map((c) => c.sections[0]));
