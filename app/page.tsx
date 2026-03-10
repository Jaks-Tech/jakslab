import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import FeaturedArticles from "@/components/home/FeaturedArticles";

// 1. Import the function instead of the variable
import { getAllArticles } from "@/lib/articles"; 

export default function Home() {
  // 2. Call the function to get the sorted articles list
  const articles = getAllArticles();

  return (
    <main className="flex-1 bg-transparent text-white relative">
      <Hero />

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 pb-2 space-y-2">
        <ServicesPreview />
        <WhyChooseUs />
       <FeaturedArticles articles={articles} />
        <Statistics />

        <Testimonials />
      </div>
    </main>
  );
}