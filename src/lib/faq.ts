/**
 * Shared by the rendered FAQ and the FAQPage JSON-LD, so a crawler always
 * reads exactly what a visitor reads — Google penalises structured data that
 * does not match the page.
 *
 * Every answer restates something the site already claims. Nothing here
 * invents a fact about pricing, client numbers or capability.
 */
export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does the scouting platform work?",
    answer:
      "In three steps. Scouts record what they see at training or matches from a phone — technical, physical and mental ratings plus written notes. Every report lands in one live database that is comparable and trackable across scouts, months and seasons. An AI layer then turns those reports into player assessments and answers questions about the whole pool in plain language.",
  },
  {
    question: "Is this software for football academies only?",
    answer:
      "No. Football, basketball and tennis are live today, and the platform is sport-agnostic by architecture. It is used by clubs and academies, by agencies managing a roster, by individual scouts, and by federations building nationwide talent infrastructure.",
  },
  {
    question: "Do we need match video to use it?",
    answer:
      "No, and that is the point. Youth and grassroots sport is barely filmed, so video-based tools have nothing to work with there. Sportokol captures the scout's own pitch-side observation instead — no film crew, no camera setup.",
  },
  {
    question: "How does talent tracking work over time?",
    answer:
      "Every report, note and assessment attaches to the same athlete profile, from a first trial through to a professional contract. That turns scouting from a one-off opinion into a continuous record, which is what catches the late developers that a single snapshot misses.",
  },
  {
    question: "How is athlete data handled, especially for minors?",
    answer:
      "Consent-first by design: explicit, revocable, per-purpose consent. Minors' data is treated as special-category data and governed separately, and nothing is licensed or surveyed without consent for that specific purpose.",
  },
];
