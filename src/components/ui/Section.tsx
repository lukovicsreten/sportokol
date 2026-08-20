import { cn } from "@/lib/utils";
import { DotBackground } from "./DotBackground";
import { kindOf } from "@/lib/sectionKinds";

type SectionProps = {
  id?: string;
  dark?: boolean;
  dots?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Surface treatment per content type: product sections read light and
 * app-like, evidence sections get a tinted framed look so results are
 * visibly not features, business sections stay plain and tabular.
 */
const KIND_SURFACE = {
  problem: "bg-offwhite text-ink",
  product: "bg-white text-ink",
  evidence: "bg-offwhite text-ink ring-1 ring-inset ring-lime-ink/10",
  pitch: "bg-offwhite text-ink",
} as const;

export function Section({
  id,
  dark = false,
  dots = false,
  className,
  innerClassName,
  children,
  ...aria
}: SectionProps) {
  const kind = kindOf(id);
  const surface = dark ? "bg-navy-950 text-white" : KIND_SURFACE[kind];

  return (
    <section
      id={id}
      {...aria}
      data-kind={kind}
      className={cn(
        "relative scroll-mt-20 overflow-hidden defer-render",
        surface,
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
