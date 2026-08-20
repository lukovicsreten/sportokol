/**
 * Content type per section, which drives its surface treatment so a product
 * feature never looks identical to a piece of evidence or a financial
 * breakdown.
 *
 * This used to sit alongside a chapter-numbering scheme ("01 / 06") built to
 * orient readers inside one 32,000px page. The site is five routes now with a
 * real nav, so the numbering was retired; the typing is still useful.
 */
export type SectionKind = "problem" | "product" | "evidence" | "pitch";

const KIND_BY_SECTION: Record<string, SectionKind> = {
  problem: "problem",

  platform: "product",
  "how-it-works": "product",
  "ai-layer": "product",
  ask: "product",

  wedge: "evidence",
  "data-asset": "evidence",
  "why-compounds": "evidence",
  traction: "evidence",
  "success-stories": "evidence",
  team: "evidence",
  faq: "evidence",

  market: "pitch",
  "business-model": "pitch",
  "revenue-engines": "pitch",
  "second-revenue-line": "pitch",
  roadmap: "pitch",
  "the-ask": "pitch",
  runway: "pitch",
  "use-of-funds": "pitch",
};

export function kindOf(id?: string): SectionKind {
  return (id && KIND_BY_SECTION[id]) || "problem";
}
