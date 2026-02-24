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
    <section className="relative py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {info.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-5 inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                <item.icon size={22} />
              </div>

              <h4 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h4>

              <p className="mt-2 text-slate-600 leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}