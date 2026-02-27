import { Send } from "lucide-react";

export function ContactForm() {
  return (
    <div className="relative w-full p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500">
      <h3 className="text-3xl font-bold text-white mb-2 text-center">
        Get in Touch
      </h3>
      <p className="text-slate-400 text-center mb-10">
        We'd love to hear from you. Fill out the form below.
      </p>

      <form className="space-y-8">
        {/* Full Name */}
        <div className="relative">
          <input
            type="text"
            required
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-blue-500/40 focus:outline-none transition backdrop-blur-md"
          />
          <label
            className="absolute left-4 top-3 text-slate-400 text-sm transition-all
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-slate-500
            peer-focus:top-3
            peer-focus:text-sm
            peer-focus:text-blue-400"
          >
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            required
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-blue-500/40 focus:outline-none transition backdrop-blur-md"
          />
          <label
            className="absolute left-4 top-3 text-slate-400 text-sm transition-all
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-slate-500
            peer-focus:top-3
            peer-focus:text-sm
            peer-focus:text-blue-400"
          >
            Email Address
          </label>
        </div>

        {/* Subject */}
        <div className="relative">
          <input
            type="text"
            required
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-blue-500/40 focus:outline-none transition backdrop-blur-md"
          />
          <label
            className="absolute left-4 top-3 text-slate-400 text-sm transition-all
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-slate-500
            peer-focus:top-3
            peer-focus:text-sm
            peer-focus:text-blue-400"
          >
            Subject
          </label>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            rows={5}
            required
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-blue-500/40 focus:outline-none transition resize-none backdrop-blur-md"
          />
          <label
            className="absolute left-4 top-3 text-slate-400 text-sm transition-all
            peer-placeholder-shown:top-4
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-slate-500
            peer-focus:top-3
            peer-focus:text-sm
            peer-focus:text-blue-400"
          >
            Message
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="group w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-[0.99]"
        >
          <span>Send Message</span>
          <Send
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>
      </form>
    </div>
  );
}