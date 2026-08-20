import { PROCESS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section id="process" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="MARK YOUR CALENDAR"
          title="Important Dates"
          subtitle="Key milestones on the road to NeuraX 3.0. Don't miss any deadline!"
        />

        <div className="relative mt-12">
          {/* Connecting line for desktop/tablet */}
          <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-line z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4 relative z-10">
            {PROCESS.map((stage) => (
              <div key={stage.title} className="relative flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full border border-line bg-ink flex items-center justify-center text-xl mb-4 shadow-lg shadow-black/20">
                  {stage.icon}
                </div>
                <span className="label-caps text-[11px] text-cyan mb-2">{stage.date}</span>
                <h3 className="font-display text-sm text-bone mb-2 leading-tight px-2">{stage.title}</h3>
                <p className="text-mist text-[10px] leading-relaxed px-1">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
