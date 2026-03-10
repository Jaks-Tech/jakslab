import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Background3D from "@/components/Scene";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

          {/* Header */}
          <Header />

          {/* Main */}
          <main className="flex-1 pt-20 w-full">
            {children}
          </main>

          {/* Footer */}
          <Footer />

        </div>

      </body>
    </html>
  );
}