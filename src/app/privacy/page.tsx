import type { Metadata } from "next";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sportokol handles personal data, including the special-category and minors' data its scouting platform processes.",
  // Placeholder text must not be indexed as though it were the real policy.
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

/**
 * PLACEHOLDER LEGAL CONTENT — NOT LEGAL ADVICE.
 *
 * This is a structural template only. Sportokol processes special-category
 * data about minors, which is exactly the case where a template is most
 * dangerous. Every section below must be reviewed, corrected and completed by
 * qualified counsel before this page is indexed or relied on.
 */
const SECTIONS: { id: string; heading: string; body: React.ReactNode }[] = [
  {
    id: "overview",
    heading: "Overview",
    body: (
      <>
        <p>
          Sportokol (operated by SM Solutions) provides a scouting platform used
          by clubs, academies, agencies and federations. Using it involves
          recording observations about identifiable athletes, many of whom are
          minors.
        </p>
        <p>
          This policy describes what is collected, why, and the rights of the
          people it concerns. Where the platform is used by a club or
          federation, that organisation is normally the controller of the
          athlete data and Sportokol acts as processor on its instructions.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What data we collect",
    body: (
      <>
        <ul>
          <li>
            <strong>Scouting reports</strong> — technical, physical and mental
            ratings, written notes, the context of the observation and the
            identity of the scout who made it.
          </li>
          <li>
            <strong>Athlete profiles</strong> — name, date of birth, position,
            club or academy, and the history of reports attached over time.
          </li>
          <li>
            <strong>Coaching and medical entries</strong> where a club chooses
            to record them, which may include health data.
          </li>
          <li>
            <strong>Account and contact information</strong> for the staff who
            use the platform.
          </li>
          <li>
            <strong>Data from public and federation sources</strong> used to
            enrich a profile, such as published match records.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    heading: "How we use it",
    body: (
      <>
        <ul>
          <li>To provide the platform to the club, academy or federation.</li>
          <li>
            To generate player assessments, comparisons and answers to queries
            within that organisation&rsquo;s own data.
          </li>
          <li>To secure, support and improve the service.</li>
          <li>To meet legal obligations.</li>
        </ul>
        <p>
          Athlete data is not used for advertising, and is not sold.
        </p>
      </>
    ),
  },
  {
    id: "minors",
    heading: "Data on minors",
    body: (
      <>
        <p>
          Most athletes described in the platform are under 18. Their data is
          treated as special-category data and handled separately from
          everything else.
        </p>
        <ul>
          <li>
            Consent from a parent or legal guardian, and from the club where
            applicable, is required before a minor&rsquo;s profile is created.
          </li>
          <li>
            Consent is explicit, recorded, tied to a specific purpose, and can
            be withdrawn at any time.
          </li>
          <li>
            A minor&rsquo;s data is never included in any licensed dataset or
            research panel without separate, explicit consent for that purpose.
          </li>
          <li>
            Access is restricted to the staff of the organisation that recorded
            it. It is not pooled across clubs.
          </li>
          <li>
            Retention is time-limited, and data is deleted on withdrawal of
            consent unless the law requires otherwise.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Data sharing and the data revenue line",
    body: (
      <>
        <p>
          Sportokol operates a second business line that licenses aggregated
          athlete data to researchers and to sportstech and medtech developers,
          and that runs paid studies with a panel of consenting athletes and
          staff.
        </p>
        <p>
          Nothing enters that line without explicit, per-purpose, revocable
          consent from the individual concerned — and, for minors, from a parent
          or guardian. Consent-first is the design of the product, not a policy
          added on top of it. Withdrawing consent removes the individual from
          future licensing and studies.
        </p>
        <p>
          Beyond this, data is shared only with processors that host or support
          the service, and where the law requires it.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>Subject to applicable law, you can ask to:</p>
        <ul>
          <li>Access the data held about you or your child.</li>
          <li>Correct anything inaccurate.</li>
          <li>Delete it.</li>
          <li>Withdraw consent, including consent to licensing or studies.</li>
          <li>Object to or restrict certain processing.</li>
          <li>Receive a copy in a portable format.</li>
        </ul>
        <p>
          Where a club or federation is the controller, we will pass the request
          to them and support them in answering it.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact for privacy enquiries",
    body: (
      <p>
        Write to{" "}
        <a href={`mailto:${contactEmail}`} className="text-lime hover:underline">
          {contactEmail}
        </a>
        . Please say whether the request concerns you or a child in your care,
        and which club or academy is involved.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-navy-950 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>

        <div className="mt-8 rounded-2xl border border-lime/40 bg-lime/10 p-5">
          <p className="text-sm font-semibold text-lime">
            This is placeholder legal content and must be reviewed by qualified
            legal counsel before publishing.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-light">
            It sets out the structure a Sportokol policy needs, including the
            handling of minors&rsquo; data. It is not legal advice and is not
            in force.
          </p>
        </div>

        <nav aria-label="Sections" className="mt-10 border-y border-white/10 py-4">
          <ul className="flex flex-wrap gap-x-5">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex min-h-11 items-center text-sm text-slate-light hover:text-lime"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quieter, more readable typography than the marketing pages: legal
            text is for reading, not scanning. */}
        <div className="mt-12 space-y-14">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold text-lime sm:text-2xl">
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-light [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-white [&_ul]:space-y-2">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 border-t border-white/10 pt-6 text-xs text-slate-light">
          Last updated: placeholder — no version of this policy is in force.
        </p>
      </div>
    </main>
  );
}
