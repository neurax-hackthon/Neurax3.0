import { WINNERS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

const RING: Record<number, string> = {
  1: "border-gold-bright shadow-[0_0_30px_rgba(233,201,138,0.55)]",
  2: "border-gold shadow-[0_0_18px_rgba(201,163,95,0.35)]",
  3: "border-gold-dim shadow-[0_0_12px_rgba(138,115,70,0.25)]",
};

function initials(team: string) {
  return team
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Winners() {
  const ordered = [...WINNERS].sort((a, b) => {
    // visually center 1st place: order as [2nd, 1st, 3rd]
    const order: Record<number, number> = { 2: 0, 1: 1, 3: 2 };
    return order[a.rank] - order[b.rank];
  });

  return (
    <section id="winners" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE OUTPUT"
          title="The Minds Behind the Network"
          subtitle="Three teams. One winning signal each."
        />

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-6">
          {ordered.map((winner) => {
            const isFirst = winner.rank === 1;
            return (
              <div
                key={winner.team}
                className={`flex flex-col items-center text-center ${isFirst ? "md:-translate-y-6" : ""}`}
              >
                <div
                  className={`relative rounded-full border-2 flex items-center justify-center font-display text-bone ${RING[winner.rank]} ${
                    isFirst ? "h-32 w-32 md:h-40 md:w-40 text-3xl md:text-4xl" : "h-24 w-24 md:h-28 md:w-28 text-xl md:text-2xl"
                  } bg-charcoal`}
                >
                  {initials(winner.team)}
                  <span className="absolute -bottom-2 label-caps text-[9px] px-2 py-0.5 rounded-full bg-void border border-line text-gold-bright">
                    {winner.place}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-bone mt-6">{winner.team}</h3>
                <p className="text-mist text-sm mt-1 max-w-[220px]">{winner.project}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
