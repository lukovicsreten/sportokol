/**
 * Shared copy and data.
 *
 * Deliberately a plain module with no "use client": a server component that
 * imports a value from a client module receives a client-reference proxy
 * rather than the value itself, so arrays imported that way are not arrays
 * and `.map` throws at prerender.
 */
export type TractionKind = "completed" | "winner" | "partnership" | "inuse";

export const TRACTION: {
  title: string;
  body: string;
  label: string;
  kind: TractionKind;
  /**
   * The named organisation's own page, so a reader can check who they are
   * rather than take the name on trust. It identifies the organisation — none
   * of these pages mentions Sportokol, and none is offered as a citation for
   * the engagement itself. Omitted where there is no single organisation to
   * point at.
   */
  href?: string;
}[] = [
  {
    label: "Pilot completed",
    kind: "completed",
    href: "https://www.fktsc.com/en/pocetna/",
    title: "Pilot completed — FK TSC Bačka Topola",
    body: "A full pilot delivered with a Serbian SuperLiga club that reached the UEFA Conference League knockout phase.",
  },
  {
    label: "In daily use",
    kind: "inuse",
    title: "In use by academies & agencies",
    body: "Running today with multiple youth academies in both US and EU markets and player agencies, repeatable demand beyond the pilot.",
  },
  {
    label: "Winner",
    kind: "winner",
    // The fund publishes this in English at /en/; /eng/ redirects to Cyrillic.
    href: "https://www.inovacionifond.rs/en/program/smart-start",
    title: "Winner — SMART START",
    body: "Selected by the national accelerator programme of the Innovation Fund: non-dilutive validation from a credible institution.",
  },
  {
    label: "Active engagement",
    kind: "partnership",
    href: "https://www.laliga.com/en-GB/news/laliga-academy-madrid-gets-underway-with-twice-as-many-players-and-now-with-its-first-womens-youth-team",
    title: "LALIGA Academy engagement",
    body: "Active engagement with one of world football's leading youth development networks — our entry into Spain.",
  },
];

export const STREAMS = [
  { title: "Scouts", detail: "Technical, physical & mental ratings", color: "#C6F135" },
  { title: "Coaches", detail: "Training load & development notes", color: "#5AC8FA" },
  { title: "Medical staff", detail: "Physicals, injury & medical history", color: "#4ADE80" },
  { title: "Athletes themselves", detail: "Self-reported wellness & feedback", color: "#FB923C" },
];
