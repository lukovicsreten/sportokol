"use client";

import { useState } from "react";
import { m, AnimatePresence } from "@/components/motion/Motion";
import { CONTACT_EMAIL } from "@/lib/nav";
import { cn } from "@/lib/cn";

const AUDIENCES = [
  "Club",
  "Academy",
  "Agency",
  "Federation",
  "Investor",
  "Other",
] as const;

const FIELD = cn(
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-sm text-white",
  "placeholder:text-mist/60 backdrop-blur-md transition-shadow duration-200",
  "focus:border-lime/60 focus:outline-none focus:shadow-[0_0_0_4px_rgba(198,241,53,0.14)]"
);

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Glass-morphism contact form.
 *
 * Posts to /api/contact, which sends the mail server-side through Resend.
 *
 * This replaced a mailto: handoff. A mailto depends on the visitor having a
 * mail client registered with their OS, and most people reading a B2B site in
 * a browser tab with webmail do not — the click did nothing visible and the
 * enquiry was lost with no trace on either side. Posting means the visitor
 * needs nothing installed and we find out either way.
 *
 * When the endpoint is unreachable or unconfigured the form says so and hands
 * back the direct address, so a failure still leaves a route open rather than
 * a dead button.
 */
export function ContactForm() {
  const [audience, setAudience] = useState<string>("Club");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          audience,
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        // "unconfigured" and "delivery" are ours and mean the visitor did
        // nothing wrong; anything else is a validation message worth showing.
        const known = json.error === "unconfigured" || json.error === "delivery";
        setError(known || !json.error ? null : String(json.error));
        setStatus("error");
        return;
      }

      form.reset();
      setAudience("Club");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const interactive = status === "idle" || status === "error";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/12 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={FIELD} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">
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

      <div className="mt-5">
        <label htmlFor="company" className="mb-2 block text-sm font-semibold">
          Company
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className={FIELD}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold">I am a…</legend>
        <div className="flex flex-wrap gap-2">
          {AUDIENCES.map((a) => (
            <label
              key={a}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                audience === a
                  ? "border-lime bg-lime/15 text-lime"
                  : "border-white/15 text-mist hover:border-lime/40 hover:text-white"
              )}
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

      <div className="mt-6">
        <label htmlFor="message" className="mb-2 block text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="What would you like to talk about?"
          className={FIELD}
        />
      </div>

      {/* Honeypot. Hidden from sight and from assistive tech, and excluded
          from tab order — only a bot filling every field will touch it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <m.button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          whileHover={interactive ? { scale: 1.03 } : undefined}
          whileTap={interactive ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
          className={cn(
            "relative inline-flex min-h-12 min-w-[11rem] items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-bold",
            "transition-colors duration-300",
            status === "sent"
              ? "bg-lime text-ink-950"
              : "bg-lime text-ink-950 hover:shadow-[0_12px_44px_-10px_rgba(198,241,53,0.7)]",
            !interactive && "cursor-default"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {interactive && (
              <m.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                key={status === "error" ? "retry" : "idle"}
              >
                {status === "error" ? "Try again" : "Send message"}
              </m.span>
            )}
            {status === "sending" && (
              <m.span
                key="sending"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2"
              >
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/25 border-t-ink-950" />
                Sending…
              </m.span>
            )}
            {status === "sent" && (
              <m.span
                key="sent"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="flex items-center gap-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <m.path
                    d="M4 12.5 L9.5 18 L20 6.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </svg>
                Message sent
              </m.span>
            )}
          </AnimatePresence>
        </m.button>

        <p
          className={cn(
            "text-xs leading-relaxed",
            status === "error" ? "text-white" : "text-mist"
          )}
          aria-live="polite"
        >
          {status === "sent" &&
            "Thanks — your message is on its way. We usually reply within two working days."}
          {status === "sending" && "Sending your message…"}
          {status === "idle" &&
            "We'll reply to the address you give above. No newsletter, no list."}
          {status === "error" && (
            <>
              {error ?? "Something went wrong at our end."} You can email us
              directly at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-lime underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
