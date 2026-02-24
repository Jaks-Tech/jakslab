import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#eef2f7] antialiased">
        
        {/* Global Header */}
        <Header />

        {/* 
          pt-16 prevents content from hiding behind fixed header 
          flex-1 pushes footer to bottom
        */}
        <main className="flex-1 pt-16 bg-white">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
        
      </body>
    </html>
  );
}