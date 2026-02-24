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
    color: "blue",
  },
  {
    icon: Search,
    title: "Research Papers",
    price: "$149+",
    desc: "In-depth research with proper citations.",
    color: "indigo",
  },
  {
    icon: Code,
    title: "Programming Help",
    price: "$259+",
    desc: "Debugging, optimization & clean code.",
    color: "violet",
  },
  {
    icon: Globe,
    title: "Web Development",
    price: "$299+",
    desc: "Custom modern websites & apps.",
    color: "cyan",
  },
  {
    icon: FileText,
    title: "Technical Reports",
    price: "$179+",
    desc: "Structured professional documentation.",
    color: "emerald",
  },
  {
    icon: Database,
    title: "Final Year Projects",
    price: "$399+",
    desc: "Complete implementation & documentation.",
    color: "rose",
  },
];

const colorStyles: any = {
  blue: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-100",
  },
  indigo: {
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-100",
  },
  violet: {
    bg: "bg-violet-50",
    iconBg: "bg-violet-100",
    text: "text-violet-600",
    border: "border-violet-100",
  },
  cyan: {
    bg: "bg-cyan-50",
    iconBg: "bg-cyan-100",
    text: "text-cyan-600",
    border: "border-cyan-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    text: "text-emerald-600",
    border: "border-emerald-100",
  },
  rose: {
    bg: "bg-rose-50",
    iconBg: "bg-rose-100",
    text: "text-rose-600",
    border: "border-rose-100",
  },
};

export default function ServicesPreview() {
  return (
    <section className="py-5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Core Services
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Comprehensive academic and technical solutions engineered for precision and excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const style = colorStyles[s.color];

            return (
              <div
                key={i}
                className={`group p-8 rounded-3xl border ${style.border} ${style.bg} 
                           hover:shadow-xl hover:-translate-y-2 transition-all duration-300 
                           text-center flex flex-col items-center`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 ${style.iconBg} rounded-xl 
                             flex items-center justify-center mb-6`}
                >
                  <s.icon className={`w-6 h-6 ${style.text}`} />
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold text-slate-900">
                  {s.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-xs">
                  {s.desc}
                </p>

                {/* Price */}
                <div className="mt-6">
                  <span className={`font-semibold ${style.text}`}>
                    {s.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/services"
            className="inline-block px-10 py-4 rounded-2xl 
                       bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold shadow-lg 
                       hover:shadow-xl hover:scale-[1.02] transition"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
}