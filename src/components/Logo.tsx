import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/wordmark.png"
      alt="Sportokol"
      // The mark is decorative alongside the name, so the alt is just the name.
      width={640}
      height={188}
      priority
      // self-start keeps a flex-column parent from stretching the mark wide
      className={cn("h-8 w-auto self-start object-contain", className)}
    />
  );
}
