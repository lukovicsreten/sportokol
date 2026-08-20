"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";

type StatCardProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  dark?: boolean;
  className?: string;
  delay?: number;
};

export function StatCard({
  value,
  prefix,
  suffix,
  decimals,
  label,
  dark = true,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border p-6",
        dark
          ? "border-lime-dim bg-navy-800"
          : "border-black/5 bg-white shadow-[0_1px_2px_rgba(15,27,46,0.04),0_12px_32px_-16px_rgba(15,27,46,0.12)]",
        className
      )}
    >
      <div className="text-3xl font-bold tracking-tight text-lime sm:text-4xl">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          dark ? "text-slate-light" : "text-graphite"
        )}
      >
        {label}
      </p>
    </motion.div>
  );
}
