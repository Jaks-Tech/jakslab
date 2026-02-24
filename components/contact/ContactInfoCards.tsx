import { Mail, Phone, Clock, MapPin } from "lucide-react";

const info = [
  {
    icon: Mail,
    title: "Email",
    value: "jakslab.services@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    value: "+254 113 178 912",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "24/7 Client Support",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Remote Services Worldwide",
  },
];

export function ContactInfoCards() {
  return (
    <section className="relative py-14 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute -top-24 -left-24 w-60 sm:w-72 h-60 sm:h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-60 sm:w-72 h-60 sm:h-72 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {info.map((item, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-md hover:shadow-xl lg:hover:shadow-2xl lg:hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-300">
                <item.icon size={22} />
              </div>

              {/* Title */}
              <h4 className="text-base sm:text-lg font-semibold text-slate-900">
                {item.title}
              </h4>

              {/* Value */}
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed break-words max-w-xs">
                {item.value}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}