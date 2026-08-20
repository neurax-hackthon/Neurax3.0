import { PROCESS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section id="process" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE SIGNAL PATH"
          title="Process"
          subtitle="How the 24 hours unfold, stage by stage."
        />

        <div className="grid md:grid-cols-5 gap-6">
          {PROCESS.map((stage) => (
            <div key={stage.step} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-3xl text-gold-dim">{stage.step}</span>
                <div className="h-px flex-1 bg-line md:hidden" />
              </div>
              <h3 className="label-caps text-sm text-bone mb-3">{stage.title}</h3>
              <p className="text-mist text-sm leading-relaxed">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
