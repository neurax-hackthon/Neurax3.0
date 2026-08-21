import { PREVIOUS_HACKATHONS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";
import NeuralBackdrop from "./NeuralBackdrop";

export default function PreviousHackathons() {
  return (
    <section id="previous" className="relative py-28 md:py-36 px-6 bg-ink overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading eyebrow="THE ARCHIVE" title="The Network Remembers" />

        <div className="grid md:grid-cols-2 gap-8">
          {PREVIOUS_HACKATHONS.map((edition) => {
            const Card = (
              <div className="group relative overflow-hidden rounded-2xl border border-line bg-charcoal/60 hover:border-gold-dim transition-colors duration-300 cursor-pointer">
                {/* Photo / backdrop */}
                <div className="relative h-56 md:h-64 overflow-hidden border-b border-line">
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-void to-charcoal" />
                  {edition.photo ? (
                    <>
                      <img
                        src={edition.photo}
                        alt={edition.edition}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] ${
                          edition.edition === "NeuraX 1.0" ? "object-top" : "object-center"
                        }`}
                      />
                      {/* subtle bottom fade so text underneath reads cleanly */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    </>
                  ) : (
                    <NeuralBackdrop
                      tint={edition.year === "2025" ? "gold" : "cyan"}
                      className="opacity-30 group-hover:opacity-50 transition-opacity"
                    />
                  )}

                  {/* Edition badge — top-left, replaces the large year overlay */}
                  <span className="absolute top-4 left-4 z-10 label-caps text-[10px] text-gold-bright border border-gold-dim/50 bg-charcoal/70 backdrop-blur-sm rounded-full px-3 py-1">
                    {edition.edition}
                  </span>

                  {/* External link icon — top-right on hover */}
                  {edition.siteUrl && (
                    <span className="absolute top-4 right-4 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-charcoal/70 border border-line opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-bright">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="p-6 md:p-7">
                  <div className="grid grid-cols-3 gap-4">
                    <Stat label="Participants" value={edition.participants} />
                    <Stat label="Projects" value={edition.projects} />
                    <Stat label="Champion" value={edition.winningTeam} small />
                  </div>
                </div>
              </div>
            );

            return edition.siteUrl ? (
              <a
                key={edition.edition}
                href={edition.siteUrl}
                target="_blank"
                rel="noreferrer"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-dim rounded-2xl"
              >
                {Card}
              </a>
            ) : (
              <div key={edition.edition}>{Card}</div>
            );
          })}
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
