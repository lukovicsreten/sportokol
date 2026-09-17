import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Optional artwork in public/media.
 *
 * Everything under public/media is a drop-in: the file may or may not be there
 * yet. Rather than shipping components that 404 an image and leave a broken
 * frame, each one asks here first and renders the media slot only when the
 * file actually exists. With nothing dropped in, every page looks exactly as
 * it does today.
 *
 * Server-only. `existsSync` runs at build time during prerender, so the answer
 * is baked into the static HTML and costs nothing at runtime. Importing this
 * from a "use client" module will not compile, which is the intended guard.
 */
const PUBLIC_DIR = join(process.cwd(), "public");

export function hasMedia(publicPath: string): boolean {
  return existsSync(join(PUBLIC_DIR, publicPath.replace(/^\/+/, "")));
}

/**
 * The file as a data URI, or null if it is not there.
 *
 * Only for the OG route: Satori cannot fetch a relative URL, so an image has
 * to arrive inline. Base64 inflates by about a third, so keep anything read
 * this way small — a 1200x630 PNG is fine, a photograph at full resolution is
 * not.
 */
export function mediaDataUri(
  publicPath: string,
  mime = "image/png"
): string | null {
  const file = join(PUBLIC_DIR, publicPath.replace(/^\/+/, ""));
  if (!existsSync(file)) return null;
  return `data:${mime};base64,${readFileSync(file).toString("base64")}`;
}
