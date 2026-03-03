import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="flex-1 bg-transparent text-white relative">

      <Hero />

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 pb-2 space-y-2">
        <ServicesPreview />
        <WhyChooseUs />
        <Statistics />
        <Testimonials />
      </div>

    </main>
  );
}