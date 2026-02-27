import {
  PenTool,
  Search,
  Globe,
  Code,
  FileText,
  Database,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: PenTool,
    title: "Essay Writing",
    price: "$99+",
    desc: "Compelling, well-structured academic essays.",
  },
  {
    icon: Search,
    title: "Research Papers",
    price: "$149+",
    desc: "In-depth research with proper citations.",
  },
  {
    icon: Code,
    title: "Programming Help",
    price: "$259+",
    desc: "Debugging, optimization & clean code.",
  },
  {
    icon: Globe,
    title: "Web Development",
    price: "$299+",
    desc: "Custom modern websites & apps.",
  },
  {
    icon: FileText,
    title: "Technical Reports",
    price: "$179+",
    desc: "Structured professional documentation.",
  },
  {
    icon: Database,
    title: "Final Year Projects",
    price: "$399+",
    desc: "Complete implementation & documentation.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 relative">

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Core Services
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
            Comprehensive academic and technical solutions engineered for precision and excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl 
                         bg-white/5 backdrop-blur-xl
                         border border-white/10
                         hover:border-blue-500/40
                         hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
                         transition-all duration-500
                         text-center flex flex-col items-center"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl 
                           bg-gradient-to-br from-blue-500/20 to-indigo-500/20
                           flex items-center justify-center mb-6
                           group-hover:scale-110 transition-transform duration-300"
              >
                <s.icon className="w-6 h-6 text-blue-400" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-white">
                {s.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-slate-400 mt-3 leading-relaxed max-w-xs">
                {s.desc}
              </p>

              {/* Price */}
              <div className="mt-6">
                <span className="font-semibold text-blue-400">
                  {s.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <Link
            href="/services"
            className="inline-block px-10 py-4 rounded-2xl 
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-semibold 
                       shadow-lg shadow-blue-600/20
                       hover:shadow-blue-600/40
                       hover:scale-[1.03]
                       transition-all duration-300"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
}