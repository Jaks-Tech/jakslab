import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { SiteShell } from "@/components/SiteShell";

const BASE_URL = "https://www.jakslab.work";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "JaksLab | Content Marketing, Technology and Research Support",
    template: "%s | JaksLab",
  },
  description:
    "Technical content marketing, website and software development, and careful research support for companies, professionals and academic projects.",
  keywords: [
    "technical content marketing",
    "B2B content marketing",
    "technical article writing",
    "blog development",
    "SEO content",
    "AEO optimization",
    "website development",
    "software development",
    "research support",
    "academic writing support",
    "literature review support",
    "JaksLab",
  ],
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "JaksLab",
    title: "JaksLab | Content Marketing, Technology and Research Support",
    description:
      "Technical content marketing, technology development and research support built around clear, useful outcomes.",
  },
  twitter: {
    card: "summary",
    title: "JaksLab | Content Marketing, Technology and Research Support",
    description:
      "Technical content marketing, technology development and research support.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "JaksLab",
      url: BASE_URL,
      logo: `${BASE_URL}/jakslab.png`,
      email: "hello@jakslab.work",
      telephone: "+254113178912",
      founder: {
        "@type": "Person",
        name: "Jeremiah",
        jobTitle: "CEO and Technical Founder",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      areaServed: "Worldwide",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "JaksLab",
      url: BASE_URL,
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "JaksLab services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Technical Content Marketing",
              description:
                "Technical articles, documentation-to-blog content, blog setup, SEO and AEO optimization.",
              url: `${BASE_URL}/services#content-marketing`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Technology and Development",
              description:
                "Websites, web applications, internal tools, APIs, integrations and product improvement.",
              url: `${BASE_URL}/services#technology-development`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Research and Academic Support",
              description:
                "Research planning, literature reviews, data analysis, reports, editing and presentations.",
              url: `${BASE_URL}/services#research-academic`,
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "JaksLab",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-theme="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col bg-white antialiased text-slate-900">
        <SiteShell>{children}</SiteShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
