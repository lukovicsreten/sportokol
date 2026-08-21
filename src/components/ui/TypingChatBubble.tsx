"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Chat bubbles that type themselves out one after another, the way someone
 * would actually ask the assistant.
 *
 * The full text of every query is in the DOM from the start for screen readers
 * and crawlers; only the visible copy types. Under reduced motion — or before
 * the block scrolls into view — everything is simply shown complete.
 */
export function TypingChatBubbles({
  queries,
  className,
}: {
  queries: string[];
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const skip = Boolean(reduced);

  const [typed, setTyped] = useState<string[]>(() =>
    skip ? queries : queries.map(() => "")
  );
  const [visible, setVisible] = useState(skip ? queries.length : 0);

  useEffect(() => {
    if (!inView || skip) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const typeOne = (index: number) =>
      new Promise<void>((resolve) => {
        if (cancelled) return resolve();
        setVisible((v) => Math.max(v, index + 1));
        const text = queries[index];
        let i = 0;
        const step = () => {
          if (cancelled) return resolve();
          i += 1;
          setTyped((prev) => {
            const next = [...prev];
            next[index] = text.slice(0, i);
            return next;
          });
          if (i < text.length) {
            timers.push(setTimeout(step, 18));
          } else {
            timers.push(setTimeout(resolve, 520));
          }
        };
        timers.push(setTimeout(step, 220));
      });

    (async () => {
      for (let i = 0; i < queries.length; i += 1) {
        await typeOne(i);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, skip, queries]);

  return (
    <ul ref={ref} className={cn("flex flex-col gap-3", className)}>
      {queries.map((q, i) => {
        const shown = i < visible;
        const done = typed[i] === q;
        return (
          <li
            key={q}
            className={cn(
              "ml-auto max-w-md rounded-2xl rounded-tr-sm bg-lime px-4 py-3 text-sm font-semibold text-ink-950 shadow-[0_10px_30px_-12px_rgba(198,241,53,0.5)] transition-opacity duration-300",
              shown ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="sr-only">{q}</span>
            <span aria-hidden="true">
              {typed[i]}
              {shown && !done && (
                <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-ink-950" />
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
