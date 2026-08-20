"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoWordmark } from "./Logo";
import { cn } from "@/lib/utils";
import { CTA, DECK_NAV_LABEL } from "@/lib/cta";

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

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Investors", href: "/investors" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Closing on navigation is handled by each link's onClick rather than an
  // effect on pathname, which would be a setState inside render's effect.
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
        <Link
          href="/"
          aria-label="Sportokol home"
          className="inline-flex min-h-11 shrink-0 items-center"
        >
          <LogoWordmark />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                    active ? "text-white" : "text-slate-light hover:text-white"
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-1.5 h-px origin-left bg-lime transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link
            href="/investors"
            className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:border-lime hover:text-lime"
          >
            {DECK_NAV_LABEL}
          </Link>
          <Link
            href="/contact?type=demo"
            className="inline-flex min-h-11 items-center rounded-full bg-lime px-5 text-sm font-semibold text-navy-950 transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
          >
            {CTA.demo.label}
          </Link>
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
            {LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-lg px-3 text-sm font-medium",
                      active
                        ? "bg-white/5 text-white"
                        : "text-slate-light hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-4">
            <Link
              href="/contact?type=demo"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-full bg-lime px-5 text-sm font-semibold text-navy-950"
            >
              {CTA.demo.label}
            </Link>
            <Link
              href="/investors"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-medium text-white"
            >
              {DECK_NAV_LABEL}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
