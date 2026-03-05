"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  MessageSquare, 
  Layers,
  Zap,
  Activity,
  Search 
} from "lucide-react";
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
        setStats({ 
          orders: ords?.length || 0, 
          inquiries: inqs?.length || 0 
        });
      } catch (err) {
        console.error("Failed to sync stats:", err);
      } finally {
        setIsSyncing(false);
      }
    }
    getStats();
  }, [activeTab]);

  return (
    <div className="w-full text-white min-h-screen bg-transparent selection:bg-blue-500/30 pb-20">
      
      {/* Navigation Header */}
      <header className="border-b border-white/10 bg-white/[0.01] backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 group cursor-default">

              <h1 className="text-xl font-black tracking-tighter">Jakslab</h1>
            </div>

            <nav className="hidden md:flex items-center bg-white/[0.03] p-1 rounded-2xl border border-white/10 backdrop-blur-md">
              <NavButton 
                active={activeTab === "orders"} 
                onClick={() => { setActiveTab("orders"); setSearchQuery(""); }}
                icon={<ShoppingCart size={16} />}
                label="Orders"
                count={stats.orders}
              />
              <NavButton 
                active={activeTab === "inquiries"} 
                onClick={() => { setActiveTab("inquiries"); setSearchQuery(""); }}
                icon={<MessageSquare size={16} />}
                label="Inquiries"
                count={stats.inquiries}
              />
            </nav>
          </div>

        <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
            Server Status
            </span>

            <span className="text-xs text-green-400/80 flex items-center gap-1.5 font-bold">
            <span className={`h-1.5 w-1.5 rounded-full bg-green-500 ${isSyncing ? 'animate-ping' : 'animate-pulse'}`} /> 
            Operational
            </span>
        </div>

        {/* Logout Button */}
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold text-xs uppercase tracking-widest active:scale-95"
        >
            <LogOut size={16} />
            Logout
        </button>

        </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Project Streams" value={stats.orders} icon={<Layers className="text-blue-500" />} active={activeTab === "orders"} />
          <StatCard title="Client Outreach" value={stats.inquiries} icon={<MessageSquare className="text-purple-500" />} active={activeTab === "inquiries"} />
          <StatCard title="System Uptime" value="99.9%" icon={<Activity className="text-green-500" />} active={false} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
                <h2 className="text-2xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                  {activeTab === "orders" ? "Project Vault" : "Message Center"}
                </h2>
                <p className="text-slate-500 mt-2 font-medium max-w-lg">
                  {activeTab === "orders" 
                    ? "Manage and track all active service orders and client deliverables." 
                    : "Review incoming inquiries from the contact stream."}
                </p>
            </div>

            <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                    type="text"
                    placeholder="Filter by client name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all shadow-2xl"
                />
            </div>
        </div>
        
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.02] p-1 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-hidden">
           {activeTab === "orders" 
             ? <OrderManager searchTerm={searchQuery} /> 
             : <InquiryManager searchTerm={searchQuery} />
           }
        </div>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, count }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2.5 px-6 py-2 rounded-xl transition-all duration-300 font-bold text-sm ${active ? "bg-blue-600/90 text-white shadow-lg backdrop-blur-md" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
      {icon} {label}
      <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md ${active ? "bg-white/20" : "bg-white/10"}`}>{count}</span>
    </button>
  );
}

function StatCard({ title, value, icon, active }: any) {
  return (
    <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 backdrop-blur-sm ${active ? "bg-blue-600/10 border-blue-600/40 scale-[1.02] shadow-[0_0_40px_rgba(37,99,235,0.1)]" : "bg-white/[0.03] border-white/10 shadow-xl"}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10">{icon}</div>
        <div className={`h-2 w-2 rounded-full ${active ? 'bg-blue-500 animate-pulse' : 'bg-white/10'}`} />
      </div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{title}</p>
      <h3 className="text-4xl font-black tracking-tight">{value}</h3>
    </div>
  );
}