import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  ChevronLeft, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  FileText, 
  Clock,
  Hash,
  Activity
} from "lucide-react";
import DownloadButton from "@/components/admin/DownloadButton";

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  // Await params as required by Next.js 15
  const { id } = await params;

  // Fetch the order. 'id' is now a string/text type to support personalized IDs
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center text-white bg-zinc-950">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <Link href="/admin" className="text-blue-400 hover:underline underline-offset-4">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );

  // Determine Title for Display (Project Type vs Custom Title)
  const displayTitle = order.custom_project || order.project_type || "Custom Request";

  return (
    <main className="min-h-screen p-6 lg:p-12 text-white bg-zinc-950 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Top Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Link href="/admin" className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-all text-xs font-bold uppercase tracking-widest">
              <ChevronLeft size={14} /> Back to Dashboard
            </Link>
            <div className="space-y-1">
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase italic">
                {displayTitle}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Hash size={12} className="text-blue-500" />
                  <span className="font-mono text-[11px] text-zinc-400 tracking-tighter uppercase">{order.id}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <Activity size={12} className="text-emerald-500" />
                  <span className="font-mono text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <img src="/jakslab.png" alt="JaksLab" className="w-12 h-12 rounded-full border border-white/10" />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Client Info Card */}
            <section className="bg-white/[0.01] border border-white/10 rounded-[2.5rem] p-8 lg:p-10 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-all duration-700" />
              
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black mb-10 flex items-center gap-2">
                <User size={14} /> Client_Payload_Header
              </h3>
              
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                <DetailItem icon={<User size={18}/>} label="Full Identity" value={order.full_name} />
                <DetailItem icon={<Mail size={18}/>} label="Digital Correspondence" value={order.email} />
                <DetailItem icon={<Phone size={18}/>} label="Phone Sequence" value={order.phone || "---"} />
                <DetailItem icon={<MessageSquare size={18}/>} label="Preferred Sync" value={order.contact_method} />
              </div>
            </section>

            {/* Description Card */}
            <section className="bg-white/[0.01] border border-white/10 rounded-[2.5rem] p-8 lg:p-10">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black mb-8 flex items-center gap-2">
                <FileText size={14} /> Brief_Requirements
              </h3>
              <div className="bg-zinc-950/50 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                <p className="text-zinc-400 leading-relaxed font-light text-lg whitespace-pre-wrap selection:bg-blue-500/40">
                  {order.description || "No specific briefing provided."}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Deadline Module */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-center shadow-2xl shadow-blue-500/10 relative group">
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
              <Clock className="mx-auto text-white/80 mb-4" size={32} />
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black mb-1">Target Deadline</p>
              <p className="text-4xl font-black text-white tracking-tighter italic uppercase">{order.deadline || "TBD"}</p>
            </div>

            {/* Attachments Module */}
            <div className="bg-white/[0.01] border border-white/10 rounded-[2.5rem] p-8 lg:p-10">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black mb-8 flex items-center gap-2">
                <FileText size={14} /> Linked_Files
              </h3>
              
              <div className="space-y-4">
                {order.attachments && order.attachments.length > 0 ? (
                  order.attachments.map((file: any, i: number) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-blue-500/40 transition-all group/file shadow-lg"
                    >
                      <div className="flex flex-col gap-1 overflow-hidden">
                        <span className="text-[11px] font-bold text-zinc-200 truncate pr-4 group-hover/file:text-blue-400 transition-colors">
                          {file.fileName}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-600 uppercase">
                          {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <DownloadButton 
                        url={file.fileUrl} 
                        projectTitle={displayTitle} 
                        originalFileName={file.fileName}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 px-4 border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">No Assets Detected</p>
                  </div>
                )}
              </div>
            </div>

            {/* Internal Metadata */}
            <div className="p-6 rounded-3xl border border-white/5 bg-zinc-950/30">
               <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-700 uppercase tracking-widest mb-4">
                 <Activity size={10} /> System_Logs
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-zinc-600">Created:</span>
                    <span className="text-zinc-400">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Reusable Detail Item Component
 */
function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 group/item">
      <div className="mt-1 p-2.5 bg-blue-600/10 text-blue-500 rounded-xl border border-blue-600/10 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black">{label}</p>
        <p className="text-base lg:text-lg font-bold text-zinc-100 leading-tight break-all">
          {value}
        </p>
      </div>
    </div>
  );
}