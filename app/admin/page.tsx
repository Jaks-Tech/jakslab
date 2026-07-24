"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, CreditCard, Ghost, LogOut, MessageSquare, Search, ShoppingCart, Users } from "lucide-react";
import { useEffect, useState } from "react";
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
      } catch (error) {
        console.error("Failed to load admin totals:", error);
      } finally {
        setIsSyncing(false);
      }
    }
    getStats();
  }, [activeTab]);

  const sectionTitle = activeTab === "orders" ? "Orders" : "Inquiries";

  return (
    <main className="admin-surface min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <div>
            <p className="text-lg font-semibold">JaksLab Admin</p>
            <p className="text-xs text-slate-700">{isSyncing ? "Updating records..." : "Orders and enquiries"}</p>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">
            <LogOut size={16} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
        <section className="grid gap-4 sm:grid-cols-2">
          <SummaryCard label="Orders" value={stats.orders} active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon={<ShoppingCart size={19} />} />
          <SummaryCard label="Inquiries" value={stats.inquiries} active={activeTab === "inquiries"} onClick={() => setActiveTab("inquiries")} icon={<MessageSquare size={19} />} />
        </section>

        <section className="mt-7">
          <h2 className="text-sm font-semibold text-slate-950">Admin tools</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ToolLink href="/ghost-chat" icon={<Ghost size={20} />} title="Ghost Chat" description="Open secure sessions and file sharing." />
            <ToolLink href="/payment" icon={<CreditCard size={20} />} title="JaksPay" description="Open payments and receipt verification." />
            <ToolLink href="/workhub" icon={<Users size={20} />} title="Work Hub" description="Open team tasks and collaboration." />
          </div>
        </section>

        <section className="mt-8 border-t border-slate-400 pt-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{sectionTitle}</h1>
              <p className="mt-1 text-sm text-slate-700">
                {activeTab === "orders" ? "Review requests, files and client deliveries." : "Read and respond to website enquiries."}
              </p>
            </div>
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search {sectionTitle.toLowerCase()}</span>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
              <input
                type="search"
                placeholder={`Search ${sectionTitle.toLowerCase()}`}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-lg border border-slate-400 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 outline-none placeholder:text-slate-600 focus:border-slate-950"
              />
            </label>
          </div>

          <div className="mt-6">
            {activeTab === "orders" ? <OrderManager searchTerm={searchQuery} /> : <InquiryManager searchTerm={searchQuery} />}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ label, value, active, onClick, icon }: { label: string; value: number; active: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`flex items-center justify-between rounded-xl border p-5 text-left transition-colors ${active ? "border-slate-950 bg-slate-100" : "border-slate-400 hover:border-slate-950"}`}>
      <div>
        <p className="text-sm text-slate-800">{label}</p>
        <p className="mt-1 text-3xl font-semibold">{value}</p>
      </div>
      <span className="rounded-lg border border-slate-400 bg-white p-3 text-slate-950">{icon}</span>
    </button>
  );
}

function ToolLink({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-xl border border-slate-400 bg-white p-4 hover:border-slate-950 hover:bg-slate-50">
      <span className="admin-tool-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-slate-950">{title}</span>
        <span className="mt-0.5 block text-sm text-slate-700">{description}</span>
      </span>
      <ArrowUpRight size={18} className="shrink-0 text-slate-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
