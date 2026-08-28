import {
  siteUrl,
  siteName,
  siteDescription,
  contactEmail,
  companySite,
} from "@/lib/seo";
import { FAQ_ITEMS } from "@/lib/faq";

/**
 * Schema.org JSON-LD, emitted as a plain script from a server component so it
 * is in the initial HTML — crawlers read it without executing anything.
 *
 * One @graph with cross-references rather than separate blocks, so Google
 * resolves the organisation, the site and the product as one entity instead
 * of three unrelated ones.
 */
export function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
      description: siteDescription,
      email: contactEmail,
      sameAs: [companySite],
      contactPoint: {
        "@type": "ContactPoint",
        email: contactEmail,
        contactType: "sales",
        availableLanguage: ["en", "sr"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: siteName,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Sports scouting and talent management",
      operatingSystem: "Web",
      url: siteUrl,
      description:
        "A scout-first platform that captures pitch-side observation — technical, physical and mental ratings plus written notes — into one structured, comparable database, with an AI layer that turns reports into player assessments and plain-language answers.",
      featureList: [
        "Pitch-side scouting reports without video",
        "One structured, comparable player database",
        "AI-generated player assessments",
        "Natural-language queries across the talent pool",
        "Multi-sport: football, basketball, tennis",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Content is authored here, not user input; the escape guards against a
      // literal "</script>" ever appearing inside the JSON.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
