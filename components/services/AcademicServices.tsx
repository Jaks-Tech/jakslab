import {
  PenTool,
  FileText,
  BookOpen,
  Search,
  GraduationCap,
  ClipboardList,
  FileCheck,
  Presentation,
  ScrollText,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: PenTool,
    title: "Essay Writing",
    desc: "Well-researched, structured, and academically sound essays.",
    price: "From $25",
  },
  {
    icon: FileText,
    title: "Research Papers",
    desc: "Comprehensive research papers with credible sources.",
    price: "From $75",
  },
  {
    icon: BookOpen,
    title: "Formatting & Editing",
    desc: "APA, MLA, Chicago formatting and professional editing.",
    price: "From $15",
  },
  {
    icon: Search,
    title: "Case Studies",
    desc: "In-depth analytical and structured case study reports.",
    price: "From $50",
  },
  {
    icon: GraduationCap,
    title: "Thesis & Dissertation",
    desc: "Undergraduate & postgraduate research guidance and writing.",
    price: "Custom Pricing",
  },
  {
    icon: ScrollText,
    title: "Literature Reviews",
    desc: "Critical and structured literature synthesis.",
    price: "From $60",
  },
  {
    icon: ClipboardList,
    title: "Lab Reports",
    desc: "Detailed scientific and technical lab documentation.",
    price: "From $35",
  },
  {
    icon: FileCheck,
    title: "Proofreading & Plagiarism Check",
    desc: "Grammar refinement and originality verification.",
    price: "From $20",
  },
  {
    icon: Presentation,
    title: "PowerPoint Presentations",
    desc: "Professional, well-designed academic slide decks.",
    price: "From $30",
  },
];

export function AcademicServices() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex justify-center px-4 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            Academic Support
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Professional Academic Services
          </h2>

          <p className="mt-4 text-slate-600 text-lg">
            High-quality, well-structured academic work tailored to meet
            university standards and deadlines.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-3xl border border-slate-200 
                         shadow-sm hover:shadow-2xl hover:-translate-y-3 
                         transition-all duration-300 text-center flex flex-col items-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl 
                              bg-gradient-to-br from-blue-100 to-indigo-100 
                              flex items-center justify-center mb-6
                              group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-blue-600 w-7 h-7" />
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
                <span className="text-blue-600 font-semibold">
                  {service.price}
                </span>

                <Link
                  href="/contact"
                  className="text-sm font-medium text-slate-500 
                             group-hover:text-blue-600 transition"
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