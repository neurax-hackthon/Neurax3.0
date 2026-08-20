import { RULES } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

export default function Rules() {
  return (
    <section id="rules" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading eyebrow="THE PROTOCOL" title="Rules & Regulations" />

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {RULES.map((group, i) => (
            <div key={group.title} className="relative">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-display text-3xl text-gold-dim">0{i + 1}</span>
                <div className="h-px flex-1 bg-line" />
              </div>
              <h3 className="label-caps text-sm text-bone mb-4">{group.title}</h3>
              <ul className="flex flex-col gap-3">
                {group.points.map((point) => (
                  <li key={point} className="flex gap-3 text-mist text-sm leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
