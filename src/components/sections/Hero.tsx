import { DotBackground } from "@/components/ui/DotBackground";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { LogoMark } from "@/components/Logo";

const SPORTS = [
  { icon: "football", label: "Football" },
  { icon: "basketball", label: "Basketball" },
  { icon: "tennis", label: "Tennis" },
];

/**
 * Above-the-fold section. Deliberately a server component using CSS-only
 * entrance animations, so the hero paints immediately instead of waiting on
 * hydration (keeps LCP fast and the copy visible without JS).
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900 text-white"
    >
      <DotBackground priority />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-36 sm:px-8 sm:pt-40 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:pb-28">
        <div>
          <div className="rise-in mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            <span className="h-px w-6 bg-lime" />
            Sports Management Systems
          </div>

          <h1
            className="rise-in balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
            style={{ animationDelay: "60ms" }}
          >
            Never lose a future <span className="text-lime">professional</span>{" "}
            again.
          </h1>

          <p
            className="rise-in mt-6 max-w-lg text-lg leading-relaxed text-slate-light"
            style={{ animationDelay: "150ms" }}
          >
            A scout-first platform that turns pitch-side observation into a
            living, national database of talent.
          </p>

          <div
            className="rise-in mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "250ms" }}
          >
            {SPORTS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 py-2 text-sm font-medium text-lime"
              >
                <DeckIcon name={s.icon} className="h-4 w-4" />
                {s.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/25 px-4 py-2 text-sm font-medium text-slate-light">
              <DeckIcon name="plus" className="h-3.5 w-3.5" />
              More sports to come
            </span>
          </div>

          <p
            className="rise-in mt-5 text-sm text-slate-light"
            style={{ animationDelay: "350ms" }}
          >
            Live modules today &middot; sport-agnostic platform, built to
            extend
          </p>

          <div
            className="rise-in mt-14 flex flex-col gap-1 border-t border-white/10 pt-6 text-sm text-slate-light sm:flex-row sm:items-center sm:justify-between"
            style={{ animationDelay: "450ms" }}
          >
            <span>Product overview &middot; 2026</span>
            <span>
              Backed by <span className="text-white">SMART START</span> —
              national accelerator, Innovation Fund
            </span>
          </div>
        </div>

        <div
          className="scale-in relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80 md:h-96 md:w-96"
          style={{ animationDelay: "200ms" }}
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-lime/10 blur-3xl" />
          {/* The deck's mark is already a rounded tile, so it stands on its own
              rather than sitting inside a second frame. */}
          <div className="animate-float relative h-full w-full drop-shadow-2xl">
            <LogoMark priority />
          </div>
        </div>
      </div>
    </section>
  );
}
