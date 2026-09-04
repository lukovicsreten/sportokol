import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionDark, Reveal } from "@/components/ui/primitives";
import { Constellation } from "@/components/ui/Constellation";
import { ClosingCta } from "@/components/sections/shared";
import { POSTS, findPost, formatDate, type Block } from "@/lib/blog";
import { siteUrl, siteName } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

/** Every post gets a static page, drafts included — they are just noindex. */
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    // A draft is reachable by URL so it can be previewed and shared, but it
    // must never be indexed — an outline in the search results is worse than
    // no result at all.
    robots: post.published ? undefined : { index: false, follow: false },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.published ?? undefined,
      modifiedTime: post.updated ?? post.published ?? undefined,
      tags: post.tags,
    },
  };
}

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-12 font-display text-2xl font-extrabold leading-tight sm:text-3xl"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 font-display text-xl font-bold leading-snug">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-3">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3 leading-relaxed text-mist">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="mt-8 border-l-2 border-lime/60 pl-6 text-lg italic leading-relaxed"
              >
                {b.text}
                {b.cite && (
                  <cite className="mt-3 block text-sm not-italic text-mist">
                    — {b.cite}
                  </cite>
                )}
              </blockquote>
            );
          default:
            return (
              <p key={i} className="mt-5 leading-relaxed text-mist">
                {b.text}
              </p>
            );
        }
      })}
    </>
  );
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  // BlogPosting only for live posts. Marking up a draft would offer Google
  // structured data for a page that also says noindex — a contradiction worth
  // not sending.
  const jsonLd = post.published
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${siteUrl}/blog/${post.slug}#article`,
        headline: post.heading,
        description: post.description,
        datePublished: post.published,
        dateModified: post.updated ?? post.published,
        keywords: post.tags.join(", "),
        inLanguage: "en",
        mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
        author: { "@type": "Organization", name: siteName, url: siteUrl },
        publisher: { "@id": `${siteUrl}/#organization` },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <article>
        <header className="grain relative overflow-hidden bg-ink-950 px-6 pb-16 pt-36 sm:px-8">
          <Constellation strength={70} />
          <div className="relative z-[2] mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center text-[11px] font-bold uppercase tracking-[0.24em] text-lime hover:underline"
            >
              ← Blog
            </Link>

            <h1 className="balance mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              {post.heading}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-mist">
              {post.description}
            </p>

            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-mist">
              {post.published ? (
                <time dateTime={post.published}>{formatDate(post.published)}</time>
              ) : (
                <span className="rounded-full border border-lime/40 bg-lime/10 px-3 py-1 font-bold text-lime">
                  Draft — not published
                </span>
              )}
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>{post.tags.join(", ")}</span>
            </p>
          </div>
        </header>

        <SectionDark aria-label="Article">
          <Reveal className="relative mx-auto max-w-3xl text-[17px]">
            <Body blocks={post.body} />
          </Reveal>
        </SectionDark>
      </article>

      <ClosingCta />
    </>
  );
}
