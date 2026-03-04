import { OrderHero } from "@/components/order/OrderHero";
import OrderForm from "@/components/order/order-form/OrderForm";
import Testimonials from "@/components/home/Testimonials";
import { OrderProcess } from "@/components/order/OrderProcess";

export default function OrderPage() {
  return (
    <main className="relative bg-transparent min-h-screen pb-32 text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[160px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-indigo-600/10 blur-[160px] rounded-full" />
      </div>

      <OrderHero />

      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 mb-24">
        <OrderForm />
      </div>

      <OrderProcess />

      <div className="mt-24">
        <Testimonials />
      </div>

    </main>
  );
}