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
  Clock 
} from "lucide-react";
import DownloadButton from "@/components/admin/DownloadButton";
export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <Link href="/admin" className="text-blue-400 hover:underline underline-offset-4">Return to Dashboard</Link>
      </div>
    </div>
  );

  // Determine Title for Display and Filenames
  const displayTitle = order.project_title || order.project_type || "Custom Project";

  return (
    <main className="min-h-screen p-6 lg:p-12 text-white bg-transparent">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Top Navigation & Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Link href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
              <ChevronLeft size={18} /> Back to Dashboard
            </Link>
            <div className="space-y-1">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight italic uppercase">
                {displayTitle}
              </h1>
              <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">ID: {order.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
            <div className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-xl text-xs font-bold border border-blue-500/20">
              ACTIVE ORDER
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
              <h3 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-black mb-8">Client Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <DetailItem icon={<User size={20}/>} label="Full Name" value={order.full_name} />
                <DetailItem icon={<Mail size={20}/>} label="Email Address" value={order.email} />
                <DetailItem icon={<Phone size={20}/>} label="Contact Phone" value={order.phone || "Not Provided"} />
                <DetailItem icon={<MessageSquare size={20}/>} label="Preferred Method" value={order.contact_method} />
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
              <h3 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-black mb-6">Project Requirements</h3>
              <div className="bg-black/40 p-6 rounded-3xl border border-white/5 leading-relaxed text-slate-300 italic whitespace-pre-wrap">
                {order.description || "No description provided."}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/20 rounded-[2.5rem] p-8 text-center shadow-[0_0_30px_rgba(37,99,235,0.1)]">
              <Clock className="mx-auto text-blue-400 mb-4" size={32} />
              <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-black mb-1">Target Deadline</p>
              <p className="text-3xl font-black">{order.deadline || "TBD"}</p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8">
              <h3 className="text-xs uppercase tracking-[0.3em] text-slate-500 font-black mb-6 flex items-center gap-2">
                <FileText size={16} /> Attachments
              </h3>
              <div className="space-y-3">
                {order.attachments?.length > 0 ? (
                  order.attachments.map((file: any, i: number) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group"
                    >
                      <span className="text-xs font-medium truncate max-w-[140px]">{file.fileName}</span>
                      <div className="flex gap-1">
                        <DownloadButton 
                          url={file.fileUrl} 
                          projectTitle={displayTitle} 
                          originalFileName={file.fileName}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-600 italic text-center py-4">No files uploaded.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 p-2 bg-blue-600/10 text-blue-400 rounded-lg border border-blue-600/10">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">{label}</p>
        <p className="text-lg font-bold text-white leading-tight break-all">{value}</p>
      </div>
    </div>
  );
}