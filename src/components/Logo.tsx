import Image from "next/image";
import { cn } from "@/lib/utils";

/** The Sportokol eye-and-swoosh mark, lifted from the deck's own artwork. */
export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/mark.png"
      alt="Sportokol"
      width={256}
      height={256}
      priority={priority}
      className={cn("h-full w-full object-contain", className)}
    />
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/wordmark.png"
      alt="Sportokol"
      width={640}
      height={188}
      priority
      // self-start keeps a flex-column parent from stretching the mark wide
      className={cn("h-8 w-auto self-start object-contain", className)}
    />
  );
}
