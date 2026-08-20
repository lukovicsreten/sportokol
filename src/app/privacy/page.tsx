import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sportokol handles personal data, including the special-category and minors' data its scouting platform processes.",
  // Placeholder text must not be indexed as if it were the real policy.
  robots: { index: false, follow: true },
};

/**
 * PLACEHOLDER. The footer links here so the route is not a dead end, but the
 * content below is scaffolding, not legal text.
 *
 * TODO: replace wholesale with the reviewed policy. Sportokol processes
 * special-category data about minors, so this needs a lawyer, not a template
 * — the deck itself markets consent handling as a moat.
 */
export default function PrivacyPage() {
  return (
    <main
      id="main"
      className="mx-auto min-h-screen max-w-3xl px-6 pb-24 pt-32 sm:px-8"
    >
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-lime">
        Placeholder
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-slate-light">
        This page is a placeholder. The published policy is not written yet and
        nothing below should be relied on.
      </p>

      <div className="mt-10 space-y-6 text-slate-light">
        <section>
          <h2 className="text-lg font-semibold text-white">
            What the final policy has to cover
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              Scouting reports on identifiable athletes, including minors, and
              the lawful basis for each purpose.
            </li>
            <li>
              How explicit, revocable, per-purpose consent is captured,
              recorded and withdrawn.
            </li>
            <li>
              Separate handling and retention rules for minors&rsquo; data.
            </li>
            <li>
              Any onward licensing of aggregated data, and how consent governs
              it.
            </li>
            <li>Processors, transfers, retention periods, and data subject rights.</li>
          </ul>
        </section>

        <p className="text-sm">
          Questions in the meantime:{" "}
          <a
            href="mailto:info@smsolutions.ai"
            className="font-medium text-lime hover:underline"
          >
            info@smsolutions.ai
          </a>
        </p>
      </div>

      <Link
        href="/"
        className="mt-12 inline-flex min-h-11 items-center rounded-full bg-lime px-5 text-sm font-semibold text-navy-950"
      >
        Back to the site
      </Link>
    </main>
  );
}
