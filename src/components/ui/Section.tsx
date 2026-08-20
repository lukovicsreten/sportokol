import { cn } from "@/lib/utils";
import { DotBackground } from "./DotBackground";

type SectionProps = {
  id?: string;
  dark?: boolean;
  dots?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  /** Names the section so it is exposed as a navigable landmark. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Section({
  id,
  dark = false,
  dots = false,
  className,
  innerClassName,
  children,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      {...aria}
      className={cn(
        "relative scroll-mt-20 overflow-hidden defer-render",
        dark ? "bg-navy-950 text-white" : "bg-offwhite text-ink",
        className
      )}
    >
      {dark && dots && <DotBackground />}
      <div
        className={cn(
          "relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 md:py-28",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
