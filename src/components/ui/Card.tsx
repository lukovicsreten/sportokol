"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  as?: "div";
  delay?: number;
  hover?: boolean;
};

export function Card({
  children,
  className,
  dark = false,
  delay = 0,
  hover = true,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -4 } : undefined}
      className={cn(
        "rounded-2xl border p-6 transition-colors duration-300 sm:p-7",
        dark
          ? "border-lime-dim bg-navy-800 hover:border-lime/40"
          : "border-black/5 bg-white shadow-[0_1px_2px_rgba(15,27,46,0.04),0_12px_32px_-16px_rgba(15,27,46,0.12)] hover:border-lime/50",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
