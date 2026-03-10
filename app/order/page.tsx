import { OrderHero } from "@/components/order/OrderHero";
import OrderForm from "@/components/order/order-form/OrderForm";
import { OrderProcess } from "@/components/order/OrderProcess";
import Testimonials from "@/components/home/Testimonials";

export default function OrderPage() {
  return (
    <main className="relative bg-transparent min-h-screen pb-24 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[160px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-indigo-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="space-y-16">

        {/* HERO */}
        <OrderHero />

        {/* ORDER FORM */}
        <section id="order-form" className="max-w-[1200px] mx-auto px-8 lg:px-12">
          <OrderForm />
        </section>

        {/* PROCESS */}
        <OrderProcess />

        {/* TESTIMONIALS */}
        <Testimonials />

      </div>

    </main>
  );
}