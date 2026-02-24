import { MessageCircle } from "lucide-react";

export function ContactWhatsAppCard() {
  return (
    <div className="relative p-10 rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white shadow-2xl overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

      <div className="relative z-10">

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <MessageCircle size={24} />
          </div>
          <h4 className="text-2xl font-bold">
            Prefer WhatsApp?
          </h4>
        </div>

        <p className="text-white/90 text-base leading-relaxed max-w-sm">
          Chat with us instantly for faster responses and real-time support.
        </p>

        <a
          href="https://wa.me/254113178912?text=Hello%20I%20would%20like%20to%20inquire%20about%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-3 bg-white text-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
        >
          <span>Chat on WhatsApp</span>

          <MessageCircle
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>

      </div>
    </div>
  );
}