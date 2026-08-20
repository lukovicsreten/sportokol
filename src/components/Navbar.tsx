"use client";

import { useEffect, useMemo, useState } from "react";
import { LogoWordmark } from "./Logo";
import { cn } from "@/lib/utils";
import { CHAPTERS } from "@/lib/chapters";
import { CTA, DECK_NAV_LABEL } from "@/lib/cta";
import { useScrollSpy } from "./ui/useScrollSpy";

/* The deck has no menu glyph, so these are drawn inline rather than pulling
   in an icon library for a single button. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

const NAV_CHAPTERS = CHAPTERS.filter((c) => c.inNav);
const SPY_IDS = NAV_CHAPTERS.flatMap((c) => c.sections);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const spyIds = useMemo(() => SPY_IDS, []);
  const activeSection = useScrollSpy(spyIds);
  const activeChapter = activeSection
    ? NAV_CHAPTERS.find((c) => c.sections.includes(activeSection))
    : undefined;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-navy-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8"
      >
        <a
          href="#top"
          aria-label="Sportokol home"
          className="inline-flex min-h-11 shrink-0 items-center"
        >
          <LogoWordmark />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_CHAPTERS.map((c) => {
            const isActive = activeChapter?.number === c.number;
            return (
              <li key={c.number}>
                <a
                  href={c.anchor}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-slate-light hover:text-white"
                  )}
                >
                  {c.title}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-1.5 h-px origin-left bg-lime transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <a
            href={CTA.deck.href}
            className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:border-lime hover:text-lime"
          >
            {DECK_NAV_LABEL}
          </a>
          <a
            href={CTA.demo.href}
            className="inline-flex min-h-11 items-center rounded-full bg-lime px-5 text-sm font-semibold text-navy-950 transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
          >
            {CTA.demo.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-navy-950/95 backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_CHAPTERS.map((c) => {
              const isActive = activeChapter?.number === c.number;
              return (
                <li key={c.number}>
                  <a
                    href={c.anchor}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium",
                      isActive
                        ? "bg-white/5 text-white"
                        : "text-slate-light hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span className="text-xs font-semibold text-lime">
                      {c.number}
                    </span>
                    {c.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-4">
            <a
              href={CTA.demo.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-full bg-lime px-5 text-sm font-semibold text-navy-950"
            >
              {CTA.demo.label}
            </a>
            <a
              href={CTA.deck.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-medium text-white"
            >
              {DECK_NAV_LABEL}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
