/**
 * Glyphs for the three steps and the four proof badges.
 *
 * Drawn inline rather than pulled from an icon package: eight shapes do not
 * justify a dependency, and these share one stroke weight and corner radius
 * with the rest of the site's line work.
 */
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Props = { className?: string };

/** Capture — a clipboard being written on. */
export function CaptureIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9 4h6v2.2H9z" {...base} />
      <path d="M15 5h2.5a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19V6.5A1.5 1.5 0 0 1 6.5 5H9" {...base} />
      <path d="M9 11h4.5M9 14.5h3" {...base} />
      <path d="m15.6 16.4 3-3 1.3 1.3-3 3-1.7.4z" {...base} />
    </svg>
  );
}

/** Structure — stacked database layers. */
export function StructureIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="2.8" {...base} />
      <path d="M5 6v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V6" {...base} />
      <path d="M5 12v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" {...base} />
    </svg>
  );
}

/** Intelligence — a brain with a spark. */
export function IntelligenceIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 5.2a3 3 0 0 0-5.6 1.1A2.9 2.9 0 0 0 4.6 9a2.9 2.9 0 0 0 1 2.2A2.9 2.9 0 0 0 5 13.6a2.9 2.9 0 0 0 2.2 2.8A2.8 2.8 0 0 0 12 18.4z" {...base} />
      <path d="M12 5.2a3 3 0 0 1 5.6 1.1A2.9 2.9 0 0 1 19.4 9a2.9 2.9 0 0 1-1 2.2" {...base} />
      <path d="M12 5.2v13.2" {...base} />
      <path d="m17.4 13.6 1.1 2.3 2.3 1.1-2.3 1.1-1.1 2.3-1.1-2.3-2.3-1.1 2.3-1.1z" {...base} />
    </svg>
  );
}

/* -------------------------------------------------------------------------
 * Proof badges
 * ---------------------------------------------------------------------- */

/** Completed — a checkmark. */
export function CheckIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6.5" {...base} strokeWidth={2.4} />
    </svg>
  );
}

/** Winner — a star. */
export function StarIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="m12 3.4 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" {...base} />
    </svg>
  );
}

/**
 * Partnership — two links of a chain.
 *
 * Was a handshake, which turned to mush at the 20px the badges render it at:
 * too many strokes in too little space. Two interlocking links read as a
 * partnership and survive the size.
 */
export function HandshakeIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M10.3 13.7a3.6 3.6 0 0 0 5.4.4l2.6-2.6a3.6 3.6 0 0 0-5.1-5.1l-1.5 1.5" {...base} />
      <path d="M13.7 10.3a3.6 3.6 0 0 0-5.4-.4l-2.6 2.6a3.6 3.6 0 0 0 5.1 5.1l1.5-1.5" {...base} />
    </svg>
  );
}

/** In use — a group of people. */
export function UsersIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="9.5" cy="8" r="3.2" {...base} />
      <path d="M3.6 19.4a6 6 0 0 1 11.8 0" {...base} />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.9" {...base} />
      <path d="M17.4 13.6a6 6 0 0 1 3 5.8" {...base} />
    </svg>
  );
}
