"use client";

import { SectionLight, EyebrowLabel, Reveal } from "@/components/ui/primitives";
import { FAQ_ITEMS } from "@/lib/faq";

/**
 * FAQ, rendered from the same data as the FAQPage JSON-LD.
 *
 * Native <details> rather than a JS accordion: it works without JavaScript,
 * is keyboard-operable for free, and Chrome expands a collapsed answer for
 * find-in-page — so the text stays reachable and indexable rather than being
 * hidden behind a script.
 */
export function Faq() {
  return (
    <SectionLight id="faq" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <EyebrowLabel dark={false}>Questions</EyebrowLabel>
          <h2 className="balance mt-6 font-display text-4xl font-extrabold tracking-[-0.02em] text-ink-950 sm:text-5xl">
            Frequently Asked Questions About Sportokol&rsquo;s Scouting
            Software
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-ink-950/10 border-y border-ink-950/10">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 marker:hidden">
                <h3 className="font-display text-base font-extrabold text-ink-950 sm:text-lg">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime-deep/40 text-lime-deep transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 pr-11 text-[15px] leading-relaxed text-slate">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </SectionLight>
  );
}
