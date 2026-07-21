import CompactOrderForm from "@/components/order/order-form/CompactOrderForm";

export default function OrderPage() {
  return (
    <main className="order-page relative min-h-[calc(100vh-5rem)] overflow-hidden bg-transparent px-4 pb-16 pt-14 text-white sm:px-6 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,.2),transparent_68%)]" />
      <section className="relative mx-auto max-w-2xl text-center">
        
        <h1 className="mx-auto mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Get expert help with your work</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-slate-300 sm:text-lg">Send your question. We&apos;ll take it from there.</p>
        <div id="order-form" className="mt-9 text-left"><CompactOrderForm /></div>
        <p className="mt-7 text-sm font-medium text-slate-400">Already submitted? Check the private link sent to your email.</p>
      </section>
    </main>
  );
}
