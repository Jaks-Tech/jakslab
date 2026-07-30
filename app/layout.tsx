import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { AppShell } from "@/components/layout/AppShell";

const BASE_URL = "https://www.jakslab.work";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "JaksLab | SEO, AEO, Content, Research & Product Development",
    template: "%s | JaksLab",
  },
  description:
    "JaksLab drives traffic through blog optimization and technical content, researches projects before development, builds digital products and provides academic tutoring.",
  keywords: [
    "technical content marketing",
    "B2B content marketing",
    "technical article writing",
    "blog development",
    "SEO content",
    "AEO optimization",
    "pre-development research",
    "project requirements research",
    "technology framework selection",
    "website development",
    "software development",
    "digital product development",
    "academic tutoring",
    "research tutoring",
    "JaksLab",
  ],
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "JaksLab",
    title: "JaksLab | SEO, AEO, Content, Research & Product Development",
    description:
      "A partner for blog traffic growth, pre-project research, digital product building and academic tutoring.",
  },
  twitter: {
    card: "summary",
    title: "JaksLab | SEO, AEO, Content, Research & Product Development",
    description:
      "Blog traffic growth, pre-project research, digital product building and academic tutoring.",
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
                "Blog setup, optimization and technical content designed to grow qualified traffic through SEO and AEO.",
              url: `${BASE_URL}/services#content-marketing`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pre-project Research",
              description:
                "Requirements discovery, critical analysis, framework selection, technology recommendations and delivery planning before development.",
              url: `${BASE_URL}/services#research-academic`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Product Building",
              description:
                "Websites, web applications, internal tools, APIs, integrations and product improvement.",
              url: `${BASE_URL}/services#technology-development`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Academic Tutoring",
              description:
                "Guided tutoring for research planning, literature reviews, methodology, analysis, academic writing and presentations.",
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
      <body className="site-neutral-root relative flex min-h-screen flex-col antialiased text-slate-900">
        <AppShell>{children}</AppShell>
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
