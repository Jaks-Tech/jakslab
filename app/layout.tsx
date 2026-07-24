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

  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-theme="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col bg-white antialiased text-slate-900">

        {/* Content Wrapper */}
        <div className="relative z-10 flex min-h-screen flex-col">

          {/* Header (always visible) */}
          <Header />

          {/* Main */}
          <main className="flex-1 pt-20 w-full">
            {children}
          </main>

          {/* Footer (hidden only for ghost-chat) */}
          {!isGhostChat && <LightFooter />}

        </div>

        <SpeedInsights />
        <Analytics />

      </body>
    </html>
  );
}
