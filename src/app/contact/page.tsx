import type { Metadata } from "next";
import { Constellation } from "@/components/ui/Constellation";
import { Reveal, TextReveal } from "@/components/ui/primitives";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL, COMPANY_SITE } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Talk to Sportokol — as a club, academy, agency or federation ready to stop losing talent, or as an investor backing the infrastructure layer of sports.",
};

export default function ContactPage() {
  return (
    <section className="grain relative overflow-hidden bg-ink-950 pb-28 pt-36 md:pb-36">
      <Constellation strength={80} />
      <div
        aria-hidden="true"
        className="animate-eye-glow absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-lime/15 blur-[130px]"
      />

      <div className="relative z-[2] mx-auto max-w-3xl px-6 sm:px-8">
        <div className="text-center">
          <TextReveal
            text="An eye on all the talent in the **country.**"
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-6xl"
          />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mist">
              Talk to us — as a club, academy, agency or federation ready to
              stop losing talent, or as an investor backing the infrastructure
              layer of sports.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14">
          <ContactForm />
        </Reveal>

        <Reveal className="mt-12 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
              Web
            </p>
            <a
              href={COMPANY_SITE}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex min-h-11 items-center text-base font-semibold hover:text-lime"
            >
              smsolutions.ai
            </a>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
              Email
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 inline-flex min-h-11 items-center text-base font-semibold hover:text-lime"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>

        <p className="mt-12 text-center text-xs text-mist">
          Backed by SMART START &middot; Innovation Fund
        </p>
      </div>
    </section>
  );
}
