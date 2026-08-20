import { EVENT } from "../data/hackathon";
import SectionHeading from "./SectionHeading";
import NeuralBackdrop from "./NeuralBackdrop";
import { scrollToTarget } from "../lib/gsap";

// No sponsor/partner logos exist in the project yet — this stays an honest
// empty state rather than inventing names or logos. Once real sponsors are
// confirmed, replace this with a logo grid (the existing card style below
// is ready to hold one).
export default function SponsorsPartners() {
  return (
    <section id="sponsors" className="relative py-28 md:py-36 px-6 bg-ink overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading eyebrow="THE WIDER NETWORK" title="Sponsors & Partners" />

        <div className="relative rounded-2xl border border-line bg-charcoal/60 overflow-hidden px-8 py-16 text-center">
          <NeuralBackdrop tint="gold" className="opacity-20" />
          <div className="relative">
            <p className="text-mist text-sm md:text-base max-w-md mx-auto">
              Sponsors and partners for {EVENT.name} {EVENT.edition} will be announced here.
            </p>
            <button
              type="button"
              onClick={() => scrollToTarget("#contact")}
              className="mt-6 label-caps text-xs px-7 py-3.5 rounded-full border border-line text-mist hover:text-bone hover:border-gold-dim transition-colors"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
