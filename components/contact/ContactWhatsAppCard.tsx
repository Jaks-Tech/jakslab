import { MessageCircle } from "lucide-react";

export function ContactWhatsAppCard() {
  return (
    <div className="relative w-full max-w-4xl p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500 overflow-hidden text-center flex flex-col items-center">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 flex justify-center -z-10 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Centered Icon Container */}
        <div className="mb-6 p-4 bg-white/10 border border-white/20 rounded-2xl inline-flex items-center justify-center">
          <MessageCircle size={28} className="text-blue-400" />
        </div>

        {/* Centered Heading */}
        <h4 className="text-3xl font-bold text-white mb-4">
          Prefer WhatsApp?
        </h4>

        {/* Centered Description */}
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Chat with us instantly for faster responses and real-time support. Our team is available to help you with your project requirements.
        </p>

        {/* Centered Button */}
        <div className="mt-10">
          <a
            href="https://wa.me/254113178912?text=Hello%20I%20would%20like%20to%20inquire%20about%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-[0.98]"
          >
            <span>Chat on WhatsApp</span>
            <MessageCircle
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}