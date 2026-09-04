import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { SectionDark, RevealGrid, RevealItem, Reveal } from "@/components/ui/primitives";
import { Card } from "@/components/ui/cards";
import { Constellation } from "@/components/ui/Constellation";
import { ClosingCta } from "@/components/sections/shared";
import { publishedPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — scouting, talent and AI",
  description:
    "Writing on scouting method, talent identification and the use of AI in youth sport, from the team building Sportokol.",
  alternates: { canonical: "/blog" },
  // While there is nothing published, this page is an empty shell. An empty
  // index in the search results helps nobody and reads as thin content, so it
  // stays out until the first post lands — then indexes itself.
  robots: publishedPosts().length === 0 ? { index: false, follow: true } : undefined,
};

export default function BlogPage() {
  const posts = publishedPosts();

  return (
    <>
      <Hero
        eyebrow="Blog"
        headline="On scouting, talent and **AI in sport**"
        subhead="What we learn building a scouting platform, and what the people using it tell us."
        full={false}
      />

      <SectionDark aria-label="Articles">
        <Constellation strength={60} />

        {posts.length > 0 ? (
          <RevealGrid className="relative grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <RevealItem key={post.slug} index={i}>
                <Card className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-lime"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0 hover:text-lime"
                    >
                      {post.heading}
                    </Link>
                  </h2>

                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-mist">
                    {post.description}
                  </p>

                  <p className="mt-6 border-t border-white/10 pt-5 text-xs text-mist">
                    {post.published && (
                      <time dateTime={post.published}>{formatDate(post.published)}</time>
                    )}
                    <span aria-hidden="true"> · </span>
                    {post.readingMinutes} min read
                  </p>
                </Card>
              </RevealItem>
            ))}
          </RevealGrid>
        ) : (
          <Reveal className="relative mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h2 className="font-display text-2xl font-extrabold">
              Nothing published yet
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mist">
              The first pieces are being written. In the meantime, the product
              pages cover how the platform works.
            </p>
            <Link
              href="/product"
              className="mt-7 inline-flex min-h-11 items-center rounded-full border border-lime/50 px-6 text-sm font-bold text-lime transition-colors hover:bg-lime hover:text-ink-950"
            >
              See the product
            </Link>
          </Reveal>
        )}
      </SectionDark>

      <ClosingCta />
    </>
  );
}
