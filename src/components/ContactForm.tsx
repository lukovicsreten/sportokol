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

type Status = "idle" | "sending" | "sent";

/**
 * Glass-morphism contact form.
 *
 * TODO: replace the mailto handoff with a real handler (Resend, Formspree, or
 * a route handler) once a backend exists. Until then submitting composes the
 * message and hands it to the visitor's mail client — nothing is transmitted
 * to or stored by this site, and the form says so.
 *
 * The button's "sending" state is a short, honest beat while the mail client
 * is being opened, not a fake upload. The confirmation says the draft was
 * opened, because that is all that actually happened.
 */
export function ContactForm() {
  const [audience, setAudience] = useState<string>("Club");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;

    const data = new FormData(e.currentTarget);
    const subject = `Website enquiry — ${audience}`;
    const body = [
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Company: ${data.get("company") ?? ""}`,
      `I am a: ${audience}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    setStatus("sending");
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      window.location.href = href;
      setStatus("sent");
    }, 700);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/12 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8"
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

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <m.button
          type="submit"
          disabled={status !== "idle"}
          whileHover={status === "idle" ? { scale: 1.03 } : undefined}
          whileTap={status === "idle" ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
          className={cn(
            "relative inline-flex min-h-12 min-w-[11rem] items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-bold",
            "transition-colors duration-300",
            status === "sent"
              ? "bg-lime text-ink-950"
              : "bg-lime text-ink-950 hover:shadow-[0_12px_44px_-10px_rgba(198,241,53,0.7)]",
            status !== "idle" && "cursor-default"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "idle" && (
              <m.span
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                Send message
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
                Opening…
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
                Draft opened
              </m.span>
            )}
          </AnimatePresence>
        </m.button>

        <p className="text-xs leading-relaxed text-mist" aria-live="polite">
          {status === "sent"
            ? "Your email app should be open with the message ready to send."
            : "Opens in your email app — nothing is stored by this site."}
        </p>
      </div>
    </form>
  );
}
