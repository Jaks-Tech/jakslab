import { Header } from "@/components/Header";

export default function GhostChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header stays */}
      <Header />

      {/* Content */}
      <main className="flex-1 w-full pt-20 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </main>
    </>
  );
}