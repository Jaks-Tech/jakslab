import { Globe2, Mail, MessageCircle } from "lucide-react";

export function ContactChannels() {
  const shared = "group flex min-w-0 flex-col items-center justify-center border border-slate-300 px-4 py-6 text-center transition-colors sm:py-7";
  const iconClass = "h-5 w-5 text-slate-700 transition-transform group-hover:-translate-y-0.5 sm:h-6 sm:w-6";

  return (
    <section aria-labelledby="other-contact-heading" className="w-full">
      <h2 id="other-contact-heading" className="text-center text-2xl font-semibold text-slate-950">Other ways to contact us</h2>
      <div className="mx-auto mt-7 grid gap-3 sm:grid-cols-3">
        <a href="mailto:hello@jakslab.work" className={shared} aria-label="Send JaksLab an email">
          <Mail className={iconClass} />
          <span className="mt-3 text-xs tracking-widest text-slate-600">EMAIL</span>
          <span className="mt-1 text-sm font-medium text-slate-950 sm:text-base">Send an email</span>
        </a>
        <a href="https://wa.me/254113178912?text=Hello%20I%20would%20like%20to%20inquire%20about%20your%20services" target="_blank" rel="noopener noreferrer" className={shared} aria-label="Chat with JaksLab on WhatsApp">
          <MessageCircle className={iconClass} />
          <span className="mt-3 text-xs tracking-widest text-slate-600">WHATSAPP</span>
          <span className="mt-1 text-sm font-medium text-slate-950 sm:text-base">Chat on WhatsApp</span>
        </a>
        <div className={shared}>
          <Globe2 className={iconClass} />
          <span className="mt-3 text-xs tracking-widest text-slate-600">AVAILABILITY</span>
          <span className="mt-1 text-sm font-medium text-slate-950 sm:text-base">Remote, worldwide</span>
        </div>
      </div>
    </section>
  );
}
