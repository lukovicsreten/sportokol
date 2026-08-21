/**
 * Shared copy and data.
 *
 * Deliberately a plain module with no "use client": a server component that
 * imports a value from a client module receives a client-reference proxy
 * rather than the value itself, so arrays imported that way are not arrays
 * and `.map` throws at prerender.
 */
export const TRACTION = [
  {
    title: "Pilot completed — FK TSC Bačka Topola",
    body: "A full pilot delivered with a Serbian SuperLiga club that reached the UEFA Conference League knockout phase.",
  },
  {
    title: "In use by academies & agencies",
    body: "Running today with multiple youth academies in both US and EU markets and player agencies, repeatable demand beyond the pilot.",
  },
  {
    title: "Winner — SMART START",
    body: "Selected by the national accelerator programme of the Innovation Fund: non-dilutive validation from a credible institution.",
  },
  {
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
