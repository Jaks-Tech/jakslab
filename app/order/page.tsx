import { OrderHero } from "@/components/order/OrderHero";
import { OrderForm } from "@/components/order/OrderForm";
import Testimonials from "@/components/home/Testimonials";
import { OrderProcess } from "@/components/order/OrderProcess";
export default function OrderPage() {
  return (
    <main className="bg-slate-50 min-h-screen pb-32">

      <OrderHero />

      <div className="max-w-[1200px] mx-auto px-8 lg:px-12">
        <OrderForm />
      </div>

      <OrderProcess />
      <Testimonials />

    </main>
  );
}