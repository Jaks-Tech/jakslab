import { Globe2, Mail, MessageCircle } from "lucide-react";

export function ContactChannels() {
  const shared = "group flex flex-col items-center justify-center py-6 text-center transition-colors sm:py-8 md:px-6";
  const iconClass = "h-5 w-5 text-blue-400 transition-transform group-hover:-translate-y-0.5 sm:h-6 sm:w-6";

  return (
    <section aria-labelledby="other-contact-heading" className="mx-auto w-full max-w-4xl">
      <h2 id="other-contact-heading" className="text-center text-xl font-semibold text-white sm:text-2xl">For quick inquiries...</h2>
      <div className="mx-auto mt-6 divide-y divide-white/10 border-y border-white/10 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
        <a href="mailto:hello@jakslab.work" className={shared} aria-label="Send JaksLab an email">
          <Mail className={iconClass} />
          <span className="mt-3 text-xs tracking-widest text-slate-500">EMAIL</span>
          <span className="mt-1 text-sm font-medium text-white sm:text-base">Send an email</span>
        </a>
        <a href="https://wa.me/254113178912?text=Hello%20I%20would%20like%20to%20inquire%20about%20your%20services" target="_blank" rel="noopener noreferrer" className={shared} aria-label="Chat with JaksLab on WhatsApp">
          <MessageCircle className={iconClass} />
          <span className="mt-3 text-xs tracking-widest text-slate-500">WHATSAPP</span>
          <span className="mt-1 text-sm font-medium text-white sm:text-base">Chat on WhatsApp</span>
        </a>
        <div className={shared}>
          <Globe2 className={iconClass} />
          <span className="mt-3 text-xs tracking-widest text-slate-500">AVAILABILITY</span>
          <span className="mt-1 text-sm font-medium text-white sm:text-base">Remote, worldwide</span>
        </div>
      </div>
    </section>
  );
}
