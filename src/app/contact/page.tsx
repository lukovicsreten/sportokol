import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { contactEmail, companySite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Sportokol — book a demo for your club, academy or agency, request the investor deck, or ask a question.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title={<>Let&rsquo;s talk</>}
        lead="Whether you're a club ready to stop losing talent, or an investor backing the infrastructure layer of sports — we'd love to hear from you."
      />

      <section
        aria-label="Contact form"
        className="bg-offwhite px-6 py-16 sm:px-8 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,27,46,0.04),0_24px_48px_-24px_rgba(15,27,46,0.16)] sm:p-8">
            {/* useSearchParams needs a Suspense boundary to keep this route
                statically prerendered. */}
            <Suspense
              fallback={
                <div className="h-96 animate-pulse rounded-lg bg-black/5" />
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          <div className="mt-10 border-t border-black/10 pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-graphite">
              Or reach us directly
            </h2>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-8">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex min-h-11 w-fit items-center gap-2 text-base font-medium text-ink hover:text-lime-ink"
              >
                <DeckIcon name="chat" className="h-4 w-4 shrink-0 text-lime-ink" />
                {contactEmail}
              </a>
              <a
                href={companySite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-fit items-center gap-2 text-base font-medium text-ink hover:text-lime-ink"
              >
                <DeckIcon
                  name="globe-alt"
                  className="h-4 w-4 shrink-0 text-lime-ink"
                />
                smsolutions.ai
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
