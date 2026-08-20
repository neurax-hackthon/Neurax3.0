import { EVENT } from "../data/hackathon";
import NeuralBackdrop from "./NeuralBackdrop";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-28 bg-void overflow-hidden">
      <NeuralBackdrop tint="gold" className="opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <span className="label-caps text-xs md:text-sm text-cyan mb-6">NEED HELP? · WE'RE HERE FOR YOU</span>

        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium text-bone leading-none">
          Get In Touch
        </h2>
        <p className="text-mist text-sm md:text-base mt-4 max-w-md leading-relaxed">
          Have questions about registration, themes, or logistics? Reach out — our team is ready to help.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-lg">
          {/* Phone */}
          <a
            href="tel:+917995760212"
            className="flex items-center gap-4 rounded-2xl border border-line bg-charcoal/60 hover:border-gold-dim transition-colors duration-300 px-6 py-5"
          >
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-gold-bright/10 text-gold-bright text-lg shrink-0">
              📞
            </span>
            <div className="text-left">
              <p className="label-caps text-[10px] text-mist">Phone</p>
              <p className="text-bone text-sm mt-0.5">+91 7995760212</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:neurax@cmrtc.ac.in"
            className="flex items-center gap-4 rounded-2xl border border-line bg-charcoal/60 hover:border-gold-dim transition-colors duration-300 px-6 py-5"
          >
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan/10 text-cyan text-lg shrink-0">
              ✉️
            </span>
            <div className="text-left">
              <p className="label-caps text-[10px] text-mist">Email</p>
              <p className="text-bone text-sm mt-0.5">neurax@cmrtc.ac.in</p>
            </div>
          </a>
        </div>

        <p className="text-mist text-xs mt-10">
          {EVENT.dateLabel} &middot; {EVENT.venue}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfELUvKrZS2koDgq92jZzjzFqanV5jiS5AjghIE2gXNMFVygA/viewform?usp=send_form"
            target="_blank"
            rel="noreferrer"
            className="label-caps text-xs px-8 py-4 rounded-full bg-gold-bright text-void font-semibold hover:bg-bone transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
