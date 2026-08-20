"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { contactEmail } from "@/lib/site";

type Audience =
  | "Club / Academy"
  | "Agency"
  | "Federation"
  | "Investor"
  | "Other";

const AUDIENCES: Audience[] = [
  "Club / Academy",
  "Agency",
  "Federation",
  "Investor",
  "Other",
];

/** ?type= maps onto a pre-selected audience and a tailored prompt. */
const PRESETS: Record<
  string,
  { audience: Audience; subject: string; placeholder: string }
> = {
  demo: {
    audience: "Club / Academy",
    subject: "Demo request",
    placeholder:
      "Tell us about your club and what you'd like to see in a demo — sport, age groups, squad size.",
  },
  investor: {
    audience: "Investor",
    subject: "Investor inquiry",
    placeholder:
      "Tell us a little about your fund or angel activity and what you'd like to discuss.",
  },
  scout: {
    audience: "Other",
    subject: "Early access — Scout",
    placeholder: "Tell us what you scout and where.",
  },
};

const FIELD =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-graphite/70 focus:border-lime-ink focus:outline-none focus-visible:outline-none";

export function ContactForm() {
  const params = useSearchParams();
  const preset = PRESETS[params.get("type") ?? ""] ?? null;

  const [audience, setAudience] = useState<Audience>(
    preset?.audience ?? "Club / Academy"
  );

  /*
   * TODO: replace mailto fallback with a real form handler (e.g. Resend or
   * Formspree) when a backend is ready. Until then the submit composes the
   * message and hands it to the visitor's mail client — nothing is collected
   * or stored by this site.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `${preset?.subject ?? "Website enquiry"} — ${audience}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `I am a: ${audience}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={FIELD} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
          />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">I am a…</legend>
        <div className="flex flex-wrap gap-2">
          {AUDIENCES.map((a) => (
            <label
              key={a}
              className={
                "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors " +
                (audience === a
                  ? "border-lime-ink bg-lime-ink/10 text-lime-ink"
                  : "border-black/10 bg-white text-graphite hover:border-lime-ink/40")
              }
            >
              <input
                type="radio"
                name="audience"
                value={a}
                checked={audience === a}
                onChange={() => setAudience(a)}
                className="sr-only"
              />
              {a}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={
            preset?.placeholder ?? "What would you like to talk about?"
          }
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-navy-950 px-6 text-sm font-semibold text-lime transition-all duration-200 hover:scale-[1.02] hover:brightness-125"
        >
          Send message
        </button>
        <p className="text-xs leading-relaxed text-graphite">
          Opens in your email app — nothing is stored by this site.
        </p>
      </div>
    </form>
  );
}
