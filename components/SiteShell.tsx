"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { LightFooter } from "@/components/content-marketing/LightFooter";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGhostChat = pathname.startsWith("/ghost-chat");

  return (
    <div className="app-shell site-neutral-background relative z-10 flex min-h-screen min-w-0 flex-col overflow-x-clip">
      <Header />

      <main className="site-content-frame w-full min-w-0 flex-1 pt-20">
        {children}
      </main>

      {!isGhostChat && <LightFooter />}

    </div>
  );
}
