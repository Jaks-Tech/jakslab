import { supabase } from "@/lib/supabase";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import Testimonials from "@/components/home/Testimonials";
import { OrderProcess } from "@/components/order/OrderProcess";
import WhyChooseUs from "@/components/home/WhyChooseUs";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !order) {
    return (
      <div className="text-white p-20 text-center">
        Order not found.
      </div>
    );
  }

  const attachments = order.attachments ?? [];

  return (
    <main className="min-h-screen px-6 py-20 text-white">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-bold">
            Order Details
          </h1>

          <div className="flex gap-3">
            {/* New Request */}
            <Link
              href="/order"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
            >
              <Plus className="w-4 h-4" />
              New Request
            </Link>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-10 space-y-10">

          {/* Order Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Info label="Order ID" value={order.id} />
            <Info label="Name" value={order.full_name} />
            <Info label="Email" value={order.email} />
            <Info label="Contact Method" value={order.contact_method} />
            <Info label="Phone" value={order.phone} />
            <Info label="Project Type" value={order.project_type} />
            <Info label="Deadline" value={order.deadline} />

            {order.custom_project && (
              <Info label="Custom Project" value={order.custom_project} />
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Description
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-slate-300">
              {order.description}
            </div>
          </div>

          {/* Files */}
          {attachments.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Uploaded Files
              </h3>
              <div className="space-y-3">
                {attachments.map((file: any, i: number) => (
                  <a
                    key={i}
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  >
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="flex-1">
                      {file.fileName}
                    </span>
                    <span className="text-sm text-slate-400">
                      {(file.fileSize / 1024).toFixed(1)} KB
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Sections */}
        <div className="space-y-20 pt-10">
          <OrderProcess />
          <WhyChooseUs />
          <Testimonials />
        </div>
        
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <p className="text-sm text-slate-400 mb-1">
        {label}
      </p>
      <p className="font-semibold text-white break-all">
        {value}
      </p>
    </div>
  );
}