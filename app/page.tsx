import Hero from "@/components/home/Hero";
import ServicesEditorial from "@/components/home/ServicesEditorial";
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
    <main className="home-3d flex-1 bg-transparent text-white relative overflow-hidden">
      <Hero />

      <div className="home-flow relative">
        <section className="home-section" aria-label="Services">
          <ServicesEditorial />
        </section>

        <section className="home-section home-section--wide" aria-label="Company statistics">
          <Statistics />
        </section>

        <section className="home-section" aria-label="Why choose JaksLab">
          <WhyChooseUs />
        </section>

        <section className="home-section home-section--narrow" aria-label="Client testimonials">
          <Testimonials />
        </section>

        <section className="home-section" aria-label="Featured articles">
          <FeaturedArticles articles={articles} />
        </section>
      </div>
    </main>
  );
}
