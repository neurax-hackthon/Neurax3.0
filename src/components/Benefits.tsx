import { BENEFITS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE PAYOFF"
          title="Benefits for Participants"
          subtitle="What you take away, beyond the demo."
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-line bg-charcoal/60 hover:border-gold-dim transition-colors duration-300 p-6"
            >
              <span className="text-3xl">{benefit.icon}</span>
              <h3 className="font-display text-xl text-bone mt-4">{benefit.title}</h3>
              <p className="text-mist text-sm leading-relaxed mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
