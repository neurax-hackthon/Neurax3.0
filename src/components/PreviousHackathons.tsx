import { PREVIOUS_HACKATHONS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";
import NeuralBackdrop from "./NeuralBackdrop";

export default function PreviousHackathons() {
  return (
    <section id="previous" className="relative py-28 md:py-36 px-6 bg-ink overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading eyebrow="THE ARCHIVE" title="The Network Remembers" />

        <div className="grid md:grid-cols-2 gap-8">
          {PREVIOUS_HACKATHONS.map((edition) => (
            <div
              key={edition.edition}
              className="group relative overflow-hidden rounded-2xl border border-line bg-charcoal/60 hover:border-gold-dim transition-colors duration-300"
            >
              <div className="relative h-40 md:h-48 overflow-hidden border-b border-line">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-void to-charcoal" />
                <NeuralBackdrop tint={edition.year === "2024" ? "gold" : "cyan"} className="opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl md:text-6xl text-gold-dim/40">{edition.year}</span>
                </div>
              </div>

              <div className="p-6 md:p-7">
                <h3 className="font-display text-2xl text-bone mb-4">{edition.edition}</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Stat label="Participants" value={edition.participants} />
                  <Stat label="Projects" value={edition.projects} />
                  <Stat label="Champion" value={edition.winningTeam} small />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <div className={`font-display text-bone ${small ? "text-base md:text-lg" : "text-xl md:text-2xl"}`}>{value}</div>
      <div className="label-caps text-[9px] text-mist mt-1">{label}</div>
    </div>
  );
}
