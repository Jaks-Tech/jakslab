'use client';

import "./globals.css";
import { Header } from "@/components/Header";
import { LightFooter } from "@/components/content-marketing/LightFooter";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isGhostChat = pathname.startsWith("/ghost-chat");
  const isServicesPage = pathname.startsWith("/services");
  const usesPlainBackground =
    isServicesPage ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/workhub") ||
    isGhostChat;

  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-theme="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col bg-white antialiased text-slate-900">
        <div
          className={`relative z-10 flex min-h-screen flex-col ${
            usesPlainBackground ? "bg-white" : "site-knowledge-background"
          }`}
          style={
            usesPlainBackground
              ? undefined
              : {
                  backgroundImage: "url('/homepage-hero-knowledge-flow.png')",
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center top",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }
          }
        >
          <Header />

          <main className={`${isServicesPage ? "" : "site-content-frame"} w-full flex-1 pt-20`}>
            {children}
          </main>

          {!isGhostChat && <LightFooter />}
        </div>

        <style>{`
          .site-content-frame > main {
            width: 100%;
            max-width: 1500px;
            margin-right: auto;
            margin-left: auto;
          }

          .site-knowledge-background > main > main {
            background-color: transparent !important;
          }

          @media (max-width: 640px) {
            .site-knowledge-background {
              background-attachment: scroll !important;
              background-position: center top !important;
            }

            .site-knowledge-background > main > main {
              background-color: rgba(255, 255, 255, .18) !important;
            }
          }
        `}</style>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
