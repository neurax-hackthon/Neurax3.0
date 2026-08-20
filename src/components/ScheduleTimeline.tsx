import { SCHEDULE } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

export default function ScheduleTimeline() {
  return (
    <section id="schedule" className="relative py-28 md:py-36 px-6 bg-ink overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE PATHWAY"
          title="24-Hour Schedule"
          subtitle="Two days. One continuous signal from spark to showcase."
        />

        <div className="grid md:grid-cols-2 gap-14 md:gap-10">
          {SCHEDULE.map((day) => (
            <div key={day.day}>
              <div className="flex items-baseline gap-3 mb-8">
                <h3 className="font-display text-2xl md:text-3xl text-gold-bright">{day.day}</h3>
                <span className="label-caps text-xs text-mist">{day.date}</span>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-[7px] top-1 bottom-1 w-px bg-line overflow-hidden">
                  <span className="absolute left-0 -ml-[1.5px] h-3 w-[4px] rounded-full bg-cyan blur-[1px] animate-signal" />
                </div>

                <ul className="flex flex-col gap-7">
                  {day.items.map((item) => (
                    <li key={item.time} className="relative">
                      <span className="absolute -left-8 top-1 h-3.5 w-3.5 rounded-full border-2 border-gold-dim bg-ink" />
                      <span className="label-caps text-[11px] text-gold block">{item.time}</span>
                      <span className="text-bone text-sm md:text-base">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
