import { EVENT } from "../data/hackathon";
import NeuralBackdrop from "./NeuralBackdrop";
import { scrollToTarget } from "../lib/gsap";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-28 bg-void overflow-hidden">
      <NeuralBackdrop tint="gold" className="opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <span className="label-caps text-xs md:text-sm text-cyan mb-6">CONTACT US · THE NETWORK IS COMPLETE</span>

        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium text-bone leading-none">
          NEUR<span className="text-gold-bright">A</span>X
        </h2>
        <p className="label-caps text-sm md:text-base text-gold mt-3 tracking-[0.5em]">{EVENT.edition}</p>

        <p className="font-display text-2xl md:text-3xl text-bone mt-10 tracking-wide">
          BUILD. CONNECT. INNOVATE.
        </p>

        <p className="text-mist text-xs mt-8">
          {EVENT.dateLabel} &middot; {EVENT.venue}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#register"
            onClick={(e) => e.preventDefault()}
            className="label-caps text-xs px-8 py-4 rounded-full bg-gold-bright text-void font-semibold hover:bg-bone transition-colors"
          >
            Register Now
          </a>
          <button
            type="button"
            onClick={() => scrollToTarget("#themes")}
            className="label-caps text-xs px-8 py-4 rounded-full border border-line text-mist hover:text-bone hover:border-gold-dim transition-colors"
          >
            Explore Themes
          </button>
        </div>
      </div>
    </section>
  );
}
