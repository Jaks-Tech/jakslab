import { Code, Globe, BarChart, Cpu, Database, Plug } from "lucide-react";
import Link from "next/link";

const techServices = [
  {
    icon: Code,
    title: "Programming Assignments",
    desc: "Java, Python, C++, debugging, optimization & performance improvements.",
    price: "From $40",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Modern responsive websites, dashboards & full-stack applications.",
    price: "From $299",
  },
  {
    icon: Cpu,
    title: "Machine Learning Solutions",
    desc: "Model development, training, evaluation & AI-powered systems.",
    price: "Custom Pricing",
  },
  {
    icon: Database,
    title: "Model Training & Optimization",
    desc: "Dataset preparation, hyperparameter tuning & deployment pipelines.",
    price: "Custom Pricing",
  },
  {
    icon: Plug,
    title: "API & Service Integration",
    desc: "Secure third-party API integrations & workflow automation.",
    price: "Custom Pricing",
  },
  {
    icon: BarChart,
    title: "Technical Reports",
    desc: "Professional documentation, research summaries & analysis reports.",
    price: "From $70",
  },
];

export function TechServices() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <div className="inline-flex justify-center px-4 py-1 mb-4 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full">
            Technical Expertise
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            High-Quality Technical Services
          </h2>

          <p className="mt-4 text-slate-600 text-lg">
            From academic programming to advanced AI systems, we deliver 
            reliable, scalable, and professionally engineered solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {techServices.map((service, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-3xl border border-slate-200 
                         shadow-sm hover:shadow-2xl hover:-translate-y-3 
                         transition-all duration-300 text-center flex flex-col items-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl 
                              bg-gradient-to-br from-indigo-100 to-blue-100 
                              flex items-center justify-center mb-6
                              group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-indigo-600 w-7 h-7" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-slate-900">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-xs">
                {service.desc}
              </p>

              {/* Price + CTA */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="text-indigo-600 font-semibold">
                  {service.price}
                </span>

                <Link
                  href="/contact"
                  className="text-sm font-medium text-slate-500 
                             group-hover:text-indigo-600 transition"
                >
                  Enquire →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}