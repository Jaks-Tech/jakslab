import { Mail, Phone, Clock, MapPin } from "lucide-react";

const info = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@jakslab.work",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 w-full">
      {info.map((item, i) => (
        <div
          key={i}
          className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500"
        >
          {/* Icon */}
          <div className="mb-4 inline-flex p-4 rounded-2xl bg-white/10 border border-white/20 text-blue-400 transition-all duration-300 group-hover:border-blue-500/40 group-hover:scale-105">
            <item.icon size={22} />
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-white">
            {item.title}
          </h4>

          {/* Value */}
          <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed break-words max-w-xs">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}