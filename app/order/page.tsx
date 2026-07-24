import CompactOrderForm from "@/components/order/order-form/CompactOrderForm";
import { FileCheck2, MessageSquareText, Send } from "lucide-react";

export default function OrderPage() {
  return (
    <main className="order-page min-h-[calc(100vh-5rem)] bg-white [font-family:Arial,Helvetica,sans-serif] text-slate-800">
      <section className="w-full border-b border-slate-300 px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-12 lg:pb-20 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Request a service</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-700">
            Describe the work, add the deadline and attach any useful files. We will review the request before confirming scope, cost and delivery.
          </p>
        </div>

        <div id="order-form" className="mx-auto mt-10 w-full max-w-5xl border border-slate-300 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,.08)] sm:p-8">
          <CompactOrderForm />
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">Already submitted? Use the private workspace link sent to your email.</p>
      </section>

      <section className="grid w-full gap-4 px-5 py-14 sm:grid-cols-3 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
        {[
          { title: "Send the brief", text: "Choose the type of work, explain what is needed and attach the relevant material.", icon: Send },
          { title: "We review it", text: "We check the requirements and contact you if anything is missing or unclear.", icon: MessageSquareText },
          { title: "Scope is confirmed", text: "You receive the agreed scope, cost, delivery plan and private workspace link.", icon: FileCheck2 },
        ].map(({ title, text, icon: Icon }, index) => (
          <article key={title} className="border border-slate-300 bg-white p-6">
            <div className="flex items-center justify-between">
              <Icon size={20} className="text-slate-700" aria-hidden="true" />
              <span className="text-xs font-semibold text-slate-500">0{index + 1}</span>
            </div>
            <h2 className="mt-5 font-semibold text-slate-950">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
