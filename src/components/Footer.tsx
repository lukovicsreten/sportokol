import Link from "next/link";
import { Wordmark } from "@/components/brand/Logo";
import { NAV_LINKS, CONTACT_EMAIL, COMPANY_SITE } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-white/10 bg-ink-950 text-white">
      <div className="relative z-[2] mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-lg font-semibold leading-snug">
            An eye on all the talent in the{" "}
            <span className="text-lime">country.</span>
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-lime">
            Navigate
          </h2>
          <ul className="mt-4 flex flex-col">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-11 w-full items-center text-sm text-mist transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-lime">
            Contact
          </h2>
          <ul className="mt-4 flex flex-col">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex min-h-11 w-full items-center text-sm text-mist transition-colors hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={COMPANY_SITE}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 w-full items-center text-sm text-mist transition-colors hover:text-white"
              >
                smsolutions.ai
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-[2] border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>&copy; {new Date().getFullYear()} Sportokol. All rights reserved.</p>
          <p>Backed by SMART START &middot; Innovation Fund</p>
        </div>
      </div>
    </footer>
  );
}
