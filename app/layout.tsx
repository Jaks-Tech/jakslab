'use client';

import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Background3D from "@/components/Scene";
import { usePathname } from "next/navigation";

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
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col bg-[#03050c] antialiased text-slate-100">

        {/* Background Layer */}
        <Background3D />

        {/* Content Wrapper */}
        <div className="relative z-10 flex min-h-screen flex-col">

          {/* Header (always visible) */}
          <Header />

          {/* Main */}
          <main className="flex-1 pt-20 w-full">
            {children}
          </main>

          {/* Footer (hidden only for ghost-chat) */}
          {!isGhostChat && <Footer />}

        </div>

      </body>
    </html>
  );
}