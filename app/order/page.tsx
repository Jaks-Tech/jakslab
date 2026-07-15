import { OrderHeroSimple } from "@/components/order/OrderHeroSimple";
import OrderForm from "@/components/order/order-form/OrderForm";
import { OrderProcessSimple } from "@/components/order/OrderProcessSimple";
import Testimonials from "@/components/home/Testimonials";

export default function OrderPage() {
  return (
    <main className="order-page relative bg-transparent min-h-screen pb-16 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[160px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-indigo-600/10 blur-[160px] rounded-full" />
      </div>

      <div>

        {/* HERO */}
        <OrderHeroSimple />

        {/* ORDER FORM */}
        <section id="order-form" className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-8 max-w-xl"><h2 className="text-2xl font-semibold text-white sm:text-3xl">Project details</h2><p className="mt-3 leading-7 text-slate-400">Give us enough context to understand the work. You can clarify anything else when we respond.</p></div>
          <OrderForm />
        </section>

        {/* PROCESS */}
        <OrderProcessSimple />

        {/* TESTIMONIALS */}
        <Testimonials />

      </div>

    </main>
  );
}
