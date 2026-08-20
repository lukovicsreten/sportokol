/**
 * Shared by the rendered FAQ section and the FAQPage JSON-LD, so the answers
 * a crawler sees are always the answers on the page — Google flags mismatches.
 *
 * Every answer is drawn from the pitch deck's own copy. Nothing here states a
 * fact the deck does not already make (no pricing, no client counts).
 */
export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What sports does Sportokol support?",
    answer:
      "Football, basketball and tennis are live modules today. The platform is sport-agnostic by architecture, so further sports run on the same system and sell to the same buyers in the same markets.",
  },
  {
    question: "Does Sportokol require video?",
    answer:
      "No. Scouts record what they see pitch-side at training or matches — technical, physical and mental ratings plus written notes — from a mobile device. That is the point: youth and grassroots football is barely filmed, so video-based tools have nothing to work with.",
  },
  {
    question: "Who is Sportokol for?",
    answer:
      "Every buyer in the talent chain: an individual scout or agent keeping a personal record, a youth-focused agency sharing a talent book across its roster, a club or academy running recruitment and player development, and a federation building nationwide talent infrastructure.",
  },
  {
    question: "What does the AI layer actually produce?",
    answer:
      "An overall assessment, key strengths and gaps, a development trajectory and a clear recommendation for each player. The models are built on the methodology of working scouts, coaches, ex-professional players and active professionals.",
  },
  {
    question: "How is athlete data handled, especially for minors?",
    answer:
      "Consent-first by design: explicit, revocable, per-purpose consent. Nothing is licensed or surveyed without it, and minors' data is governed separately as special-category data.",
  },
];
