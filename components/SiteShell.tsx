"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { LightFooter } from "@/components/content-marketing/LightFooter";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGhostChat = pathname.startsWith("/ghost-chat");
  const isServicesPage = pathname.startsWith("/services");
  const usesPlainBackground =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/workhub") ||
    isGhostChat;

  return (
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
    </div>
  );
}
