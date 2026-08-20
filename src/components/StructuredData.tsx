import {
  siteUrl,
  siteName,
  siteDescription,
  contactEmail,
  companySite,
} from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/faq";

/**
 * Schema.org JSON-LD. Rendered as a plain <script> in the server component so
 * it lands in the initial HTML — crawlers read it without executing anything.
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
        url: `${siteUrl}/brand/mark.png`,
        width: 256,
        height: 256,
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
      inLanguage: "en-US",
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
        "Structured, comparable player database",
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
      // Content is authored here, not user input, so there is nothing to escape
      // beyond the closing-tag guard below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c"
        ),
      }}
    />
  );
}
