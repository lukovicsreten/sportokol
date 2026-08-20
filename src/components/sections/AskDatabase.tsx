"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ProductShot } from "@/components/ui/ProductShot";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";

const QUESTIONS = [
  "Which U17 midfielders rate highest across all scouts?",
  "Show me left-footed defenders we haven't re-scouted in 6 months.",
  "Compare our top two strikers on physical data.",
];

export function AskDatabase() {
  return (
    <Section id="ask" dark className="bg-gradient-to-b from-navy-900 to-navy-950">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
        <Reveal className="order-2 md:order-1">
          <ProductShot
            dark
            src="/product/scouting-reports.jpg"
            alt="Sportokol Scouting Reports list with the AI Assistant answering a plain-language question about the highest-rated players"
            caption="Natural-language assistant"
          />
        </Reveal>

        <Reveal delay={0.1} className="order-1 md:order-2">
          <h2 className="balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[44px]">
            Ask your whole database a question
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-light">
            No query language. No analyst. Anyone on staff can interrogate
            the entire talent pool in plain language and get an answer in
            seconds.
          </p>

          <div className="mt-8 space-y-3">
            {QUESTIONS.map((q, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="ml-auto flex max-w-sm items-start gap-2.5 rounded-2xl rounded-tr-sm bg-lime px-4 py-3 text-sm font-medium text-navy-950 shadow-lg"
              >
                <DeckIcon name="chat" className="mt-0.5 h-4 w-4 shrink-0" />
                {q}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
