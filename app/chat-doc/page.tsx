"use client";

import { useState } from "react";
import { 
  Sparkles, 
  ChevronRight, 
  PlusCircle,
  HelpCircle
} from "lucide-react";

import UploadDoc from "@/components/chat-doc/UploadDoc";
import ChatBox from "@/components/chat-doc/ChatBox";
import DocumentViewer from "@/components/chat-doc/DocumentViewer";

type DocumentInfo = {
  id: string;
  title: string;
  chunks?: number;
};

export default function ChatDocPage() {
  const [document, setDocument] = useState<DocumentInfo | null>(null);

  const handleUploaded = (documentId: string) => {
    setDocument({
      id: documentId,
      title: "Strategic_Proposal_v2.pdf",
      chunks: 14,
    });
  };

  const handleReset = () => {
    setDocument(null);
  };

  return (
    <div className="flex min-h-screen w-full bg-transparent text-zinc-300 overflow-hidden selection:bg-blue-500/30">
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar bg-zinc-950/20">
        
        {/* Top Navbar / Breadcrumbs */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-widest">
            <span>Workspace</span>
            <ChevronRight size={12} />
            <span className={document ? "text-zinc-500" : "text-blue-400"}>Analysis</span>
            {document && (
              <>
                <ChevronRight size={12} />
                <span className="text-blue-400 truncate max-w-[100px]">{document.title}</span>
              </>
            )}
          </div>
          
          <button className="p-2 text-zinc-500 hover:text-white transition-colors">
            <HelpCircle size={20} />
          </button>
        </header>

        <div className="flex-1 flex flex-col">
          <div className="w-full max-w-5xl mx-auto px-6 py-12">
            
            {/* HERO SECTION - Only show when no document */}
            {!document && (
              <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
                
                {/* --- ROUND LOGO FROM PUBLIC FOLDER --- */}
                <div className="flex justify-center mb-8">
                  <div className="relative p-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/20">
                    <img 
                      src="/ai-doc.png" // Replace with your actual filename in /public
                      alt="Logo"
                      className="h-20 w-20 rounded-full border-2 border-zinc-950 object-cover"
                    />
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Sparkles size={12} /> Intelligence v2.0
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
                  Chat with your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Knowledge</span>
                </h1>
                <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
                  Securely upload documents to analyze, summarize, and extract insights in seconds using advanced neural processing.
                </p>
              </div>
            )}

            {/* APP STEPS */}
            <div className="transition-all duration-700">
              {!document ? (
                <div className="animate-in fade-in zoom-in-95 duration-700">
                   <UploadDoc onUploaded={handleUploaded} />
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <DocumentViewer
                    title={document.title}
                    documentId={document.id}
                    chunks={document.chunks}
                    onReset={handleReset}
                  />

                  <div className="mt-8">
                    <ChatBox
                      documentId={document.id}
                      onReset={handleReset}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Mobile Action (New Document) */}
        {document && (
          <button 
            onClick={handleReset}
            className="lg:hidden fixed bottom-24 right-6 h-14 w-14 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center active:scale-90 transition-all z-50"
          >
            <PlusCircle size={24} />
          </button>
        )}
      </main>
    </div>
  );
}