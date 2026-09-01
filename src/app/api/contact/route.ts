import { CONTACT_EMAIL, MAIL_FROM } from "@/lib/contact";

/**
 * Contact form handler.
 *
 * Talks to Resend's REST API with a plain fetch rather than the SDK: this is
 * one POST with a JSON body, and the SDK would add a dependency to maintain
 * for no behaviour we need.
 *
 * The visitor's own address goes in `reply_to`, not `from` — putting it in
 * `from` would be a forged sender and land the mail in spam, or get the
 * domain's reputation burned. Hitting reply on the received mail still opens
 * a message addressed to the enquirer, which is the actual thing wanted.
 */

const AUDIENCES = [
  "Club",
  "Academy",
  "Agency",
  "Federation",
  "Investor",
  "Other",
];

const LIMITS = { name: 120, email: 200, company: 160, message: 4000 };

/**
 * Naive per-IP throttle on *sends*.
 *
 * Checking and recording are separate on purpose. The budget is spent only
 * when a message is actually about to go out, so a visitor who mistypes their
 * address three times is not locked out for a minute — they never cost us a
 * send. Requests that fail validation cost nothing worth rationing.
 *
 * Deliberately modest: one Map inside one serverless instance, so it resets on
 * cold start and does not coordinate across concurrent instances. It stops a
 * script hammering a single warm instance, which is the realistic threat for a
 * five-page marketing site — not a distributed flood, which would need a
 * shared store this form does not yet justify.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function recentHits(ip: string) {
  const now = Date.now();
  return (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
}

function overLimit(ip: string) {
  return recentHits(ip).length >= MAX_PER_WINDOW;
}

function recordSend(ip: string) {
  const now = Date.now();
  hits.set(ip, [...recentHits(ip), now]);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
  }
}

function str(v: FormDataEntryValue | undefined | null) {
  return typeof v === "string" ? v.trim() : "";
}

function bad(error: string, status = 400) {
  return Response.json({ ok: false, error }, { status });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Surfaced as a distinct code so the form can tell the visitor to email
    // directly rather than blaming them for a configuration gap.
    console.error("[contact] RESEND_API_KEY is not set");
    return bad("unconfigured", 503);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (overLimit(ip)) return bad("Too many messages. Try again in a minute.", 429);

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed request.");
  }

  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const audience = str(body.audience);
  const message = str(body.message);
  const trap = str(body.website);

  // Honeypot: a hidden field no human ever fills. Answer 200 so a bot sees
  // success and moves on instead of probing for what tripped it.
  if (trap) return Response.json({ ok: true });

  if (!name || !email || !message) return bad("Name, email and message are required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return bad("That email address looks wrong.");
  if (name.length > LIMITS.name) return bad("Name is too long.");
  if (email.length > LIMITS.email) return bad("Email is too long.");
  if (company.length > LIMITS.company) return bad("Company is too long.");
  if (message.length > LIMITS.message) return bad("Message is too long.");

  const who = AUDIENCES.includes(audience) ? audience : "Other";

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["I am a", who],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    message,
    "",
    `— sent from the sportokol.com contact form (${ip})`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.55;color:#0a1628">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry — ${escapeHtml(who)}</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#4a5568">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(
                v
              )}</strong></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;white-space:pre-wrap;font-size:14px">${escapeHtml(message)}</p>
      <p style="margin:24px 0 0;font-size:12px;color:#4a5568">
        Sent from the sportokol.com contact form. Reply to this mail to answer ${escapeHtml(
          name
        )} directly.
      </p>
    </div>`.trim();

  recordSend(ip);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Website enquiry — ${who} — ${name}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] resend rejected", res.status, await res.text());
      return bad("delivery", 502);
    }
  } catch (err) {
    console.error("[contact] resend unreachable", err);
    return bad("delivery", 502);
  }

  return Response.json({ ok: true });
}
