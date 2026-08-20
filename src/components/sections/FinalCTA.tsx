"use client";

import { motion } from "framer-motion";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { DotBackground } from "@/components/ui/DotBackground";
import { LogoMark } from "@/components/Logo";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950 text-white"
    >
      <DotBackground />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-24 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:py-32">
        <Reveal>
          <h2 className="balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            An eye on all the talent in the{" "}
            <span className="text-lime">country.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-light">
            Talk to us - as a club, academy, agency or federation ready to
            stop losing talent, or as an investor backing the infrastructure
            layer of sports.
          </p>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="https://smsolutions.ai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg py-2 pr-3 text-base font-medium text-white hover:text-lime"
            >
              <DeckIcon name="globe-alt" className="h-4 w-4 shrink-0 text-lime" />
              smsolutions.ai
            </a>
            <a
              href="mailto:info@smsolutions.ai"
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg py-2 pr-3 text-base font-medium text-white hover:text-lime"
            >
              <DeckIcon name="chat" className="h-4 w-4 shrink-0 text-lime" />
              info@smsolutions.ai
            </a>
          </div>

          <p className="mt-14 border-t border-white/10 pt-6 text-sm text-slate-light">
            Backed by SMART START &middot; Innovation Fund
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72 md:h-80 md:w-80"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-lime/10 blur-3xl" />
          <div className="animate-float relative h-full w-full drop-shadow-2xl">
            <LogoMark />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
