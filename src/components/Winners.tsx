import SectionHeading from "./SectionHeading";

const PRIZES = [
  { place: "1st Place", rank: 1, amount: "₹10,000" },
  { place: "2nd Place", rank: 2, amount: "₹5,000" },
  { place: "3rd Place", rank: 3, amount: "₹3,000" },
];

const RING: Record<number, string> = {
  1: "border-gold-bright shadow-[0_0_30px_rgba(233,201,138,0.55)]",
  2: "border-gold shadow-[0_0_18px_rgba(201,163,95,0.35)]",
  3: "border-gold-dim shadow-[0_0_12px_rgba(138,115,70,0.25)]",
};

const ICON: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export default function Winners() {
  // visually center 1st place: order as [2nd, 1st, 3rd]
  const ordered = [...PRIZES].sort((a, b) => {
    const order: Record<number, number> = { 2: 0, 1: 1, 3: 2 };
    return order[a.rank] - order[b.rank];
  });

  return (
    <section id="winners" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE REWARD"
          title="Prize Pool"
          subtitle="Top teams take home cash prizes — build something extraordinary."
        />

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-8">
          {ordered.map((prize) => {
            const isFirst = prize.rank === 1;
            return (
              <div
                key={prize.rank}
                className={`flex flex-col items-center text-center ${isFirst ? "md:-translate-y-6" : ""}`}
              >
                <div
                  className={`relative rounded-full border-2 flex items-center justify-center ${RING[prize.rank]} ${
                    isFirst ? "h-36 w-36 md:h-44 md:w-44 text-5xl" : "h-28 w-28 md:h-32 md:w-32 text-4xl"
                  } bg-charcoal`}
                >
                  {ICON[prize.rank]}
                </div>
                <p className={`font-display font-medium text-gold-bright mt-5 ${isFirst ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
                  {prize.amount}
                </p>
                <span className="label-caps text-[11px] text-mist mt-2">{prize.place}</span>
              </div>
            );
          })}
        </div>

        <p className="text-center text-mist text-xs mt-14">
          Total prize pool worth ₹18,000+ · Additional swags for all participants
        </p>
      </div>
    </section>
  );
}
