"use client";
import { useRouter } from "next/navigation";
import { LogOut, ShoppingCart, MessageSquare, Layers, Activity, Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { OrderManager } from "@/components/admin/OrderManager";
import { InquiryManager } from "@/components/admin/InquiryManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "inquiries">("orders");
  const [stats, setStats] = useState({ orders: 0, inquiries: 0 });
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  useEffect(() => {
    async function getStats() {
      setIsSyncing(true);
      try {
        const { data: ords } = await supabase.from("orders").select("id");
        const { data: inqs } = await supabase.from("contact_messages").select("id");
        setStats({ orders: ords?.length || 0, inquiries: inqs?.length || 0 });
      } catch (err) {
        console.error("Failed to sync stats:", err);
      } finally {
        setIsSyncing(false);
      }
    }
    getStats();
  }, [activeTab]);

  return (
    <div className="w-full text-white min-h-screen bg-transparent selection:bg-blue-500/30 pb-32 md:pb-20">
      
      {/* Navigation Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <h1 className="text-lg md:text-xl font-black tracking-tighter">Jakslab</h1>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center bg-white/[0.03] p-1 rounded-2xl border border-white/10">
              <NavButton active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon={<ShoppingCart size={16} />} label="Orders" count={stats.orders} />
              <NavButton active={activeTab === "inquiries"} onClick={() => setActiveTab("inquiries")} icon={<MessageSquare size={16} />} label="Inquiries" count={stats.inquiries} />
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden xs:flex flex-col items-end">
              <span className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest">Status</span>
              <span className="text-[10px] md:text-xs text-green-400/80 flex items-center gap-1 font-bold">
                <span className={`h-1.5 w-1.5 rounded-full bg-green-500 ${isSyncing ? 'animate-ping' : 'animate-pulse'}`} /> 
                Live
              </span>
            </div>

            <button onClick={handleLogout} className="p-2 md:px-4 md:py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/20 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest active:scale-95">
              <LogOut size={16} className="md:mr-2 inline" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats Grid - Scrolled horizontally on tiny screens if needed, otherwise stacked */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <StatCard title="Orders" value={stats.orders} icon={<Layers size={20} className="text-blue-500" />} active={activeTab === "orders"} />
          <StatCard title="Inquiries" value={stats.inquiries} icon={<MessageSquare size={20} className="text-purple-500" />} active={activeTab === "inquiries"} />
          <StatCard title="Uptime" value="99.9%" icon={<Activity size={20} className="text-green-500" />} active={false} className="hidden sm:flex" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                  {activeTab === "orders" ? "Project Vault" : "Message Center"}
                </h2>
                <p className="text-slate-500 mt-1 text-xs md:text-sm font-medium">
                  {activeTab === "orders" ? "Manage active service orders." : "Review incoming inquiries."}
                </p>
            </div>

            <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                    type="text"
                    placeholder="Search client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                />
            </div>
        </div>
        
        {/* Container with horizontal scroll for tables on mobile */}
        <div className="rounded-2xl md:rounded-[3rem] border border-white/10 bg-white/[0.02] p-1 overflow-x-auto">
           <div className="min-w-[600px] md:min-w-full">
             {activeTab === "orders" ? <OrderManager searchTerm={searchQuery} /> : <InquiryManager searchTerm={searchQuery} />}
           </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-white/[0.05] border border-white/10 backdrop-blur-2xl rounded-2xl p-1.5 flex gap-1 z-[100] shadow-2xl">
        <MobileNavButton active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon={<ShoppingCart size={20} />} label="Orders" />
        <MobileNavButton active={activeTab === "inquiries"} onClick={() => setActiveTab("inquiries")} icon={<MessageSquare size={20} />} label="Inquiries" />
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, count }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm ${active ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}>
      {icon} {label}
      <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-md bg-white/10">{count}</span>
    </button>
  );
}

function MobileNavButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition-all ${active ? "bg-blue-600 text-white" : "text-slate-500"}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function StatCard({ title, value, icon, active, className = "" }: any) {
  return (
    <div className={`p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 ${className} ${active ? "bg-blue-600/10 border-blue-600/40" : "bg-white/[0.03] border-white/10"}`}>
      <div className="p-3 bg-white/5 rounded-xl border border-white/10">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0 md:mb-1">{title}</p>
        <h3 className="text-2xl md:text-4xl font-black tracking-tight">{value}</h3>
      </div>
    </div>
  );
}