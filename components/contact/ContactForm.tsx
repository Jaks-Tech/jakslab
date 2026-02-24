import { Send } from "lucide-react";
export function ContactForm() {
  return (
    <div className="relative flex items-center justify-center py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-2xl p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl">

        <h3 className="text-3xl font-bold text-slate-800 mb-2 text-center">
          Get in Touch
        </h3>
        <p className="text-slate-500 text-center mb-10">
          We'd love to hear from you. Fill out the form below.
        </p>

        <form className="space-y-8">

          {/* Floating Input Group */}
          <div className="relative">
            <input
              type="text"
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-slate-300 bg-white/80 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
            />
            <label className="absolute left-4 top-3 text-slate-500 text-sm transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-slate-400 
              peer-focus:top-3 
              peer-focus:text-sm 
              peer-focus:text-blue-600">
              Full Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-slate-300 bg-white/80 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
            />
            <label className="absolute left-4 top-3 text-slate-500 text-sm transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-slate-400 
              peer-focus:top-3 
              peer-focus:text-sm 
              peer-focus:text-blue-600">
              Email Address
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-slate-300 bg-white/80 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
            />
            <label className="absolute left-4 top-3 text-slate-500 text-sm transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-slate-400 
              peer-focus:top-3 
              peer-focus:text-sm 
              peer-focus:text-blue-600">
              Subject
            </label>
          </div>

          <div className="relative">
            <textarea
              rows={5}
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-3 rounded-xl border border-slate-300 bg-white/80 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition resize-none"
            />
            <label className="absolute left-4 top-3 text-slate-500 text-sm transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-slate-400 
              peer-focus:top-3 
              peer-focus:text-sm 
              peer-focus:text-blue-600">
              Message
            </label>
          </div>

            <button
            type="submit"
            className="group w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
            >
            <span>Send Message</span>

            <Send
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
            </button>

        </form>
      </div>
    </div>
  );
}