import { ROUNDS, HACKATHON_JOURNEY } from "../data/hackathon";
import type { RoundInfo } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

// ─── Single Round Card ──────────────────────────────────────────────────────
function RoundCard({ round, accent }: { round: RoundInfo; accent: "gold" | "cyan" }) {
  const accentColor = accent === "gold" ? "text-gold-bright" : "text-cyan";
  const accentDim = accent === "gold" ? "text-gold-dim" : "text-cyan-dim";
  const accentBg = accent === "gold" ? "bg-gold-dim" : "bg-cyan-dim";
  const accentBorder = accent === "gold" ? "border-gold-dim" : "border-cyan-dim";
  const dotBg = accent === "gold" ? "bg-gold" : "bg-cyan";

  return (
    <div className="rounded-2xl border border-line bg-charcoal/60 overflow-hidden">
      {/* ── Round Header ── */}
      <div className="px-7 pt-8 pb-6 md:px-10 md:pt-10 md:pb-8 border-b border-line">
        <div className="flex items-start gap-5 md:gap-7">
          {/* Large round number */}
          <span
            className={`font-display text-6xl md:text-7xl font-bold leading-none ${accentColor} opacity-80 select-none shrink-0`}
          >
            {String(round.roundNumber).padStart(2, "0")}
          </span>

          <div className="flex-1 min-w-0">
            <span className={`label-caps text-[10px] ${accentDim} block mb-2`}>
              {round.eyebrow}
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-bone leading-tight">
              Round {round.roundNumber} — {round.title}
            </h3>
            <p className="text-mist text-sm md:text-base leading-relaxed mt-3 max-w-2xl">
              {round.subtitle}
            </p>
          </div>
        </div>

        {/* Key info pills */}
        <div className="flex flex-wrap gap-2.5 mt-6">
          {[
            { label: "Fee", value: round.fee },
            { label: "Team", value: round.teamSize },
            { label: "Format", value: round.format },
            ...(round.deadline ? [{ label: "Deadline", value: round.deadline }] : []),
          ].map((pill) => (
            <span
              key={pill.label}
              className={`inline-flex items-center gap-2 text-[11px] px-3.5 py-1.5 rounded-full border ${accentBorder} bg-void/40`}
            >
              <span className={`label-caps text-[9px] ${accentDim}`}>{pill.label}</span>
              <span className="text-bone font-medium">{pill.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Steps + Evaluation ── */}
      <div className="px-7 py-8 md:px-10 md:py-10">
        {/* Steps Timeline */}
        <h4 className={`label-caps text-xs ${accentColor} mb-6`}>Procedure</h4>
        <div className="relative pl-8 md:pl-10 mb-10">
          {/* Connecting line */}
          <div
            className={`absolute left-[11px] md:left-[15px] top-2 bottom-2 w-px ${accentBg} opacity-30`}
          />

          <div className="flex flex-col gap-8">
            {round.steps.map((step) => (
              <div key={step.step} className="relative">
                {/* Step dot */}
                <span
                  className={`absolute -left-8 md:-left-10 top-0.5 h-6 w-6 md:h-7 md:w-7 rounded-full border-2 ${accentBorder} bg-ink flex items-center justify-center text-xs`}
                >
                  {step.icon}
                </span>

                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className={`label-caps text-[10px] ${accentDim}`}>
                      Step {step.step}
                    </span>
                    <h5 className="font-display text-lg md:text-xl text-bone">
                      {step.title}
                    </h5>
                  </div>
                  <p className="text-mist text-sm leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Criteria */}
        <h4 className={`label-caps text-xs ${accentColor} mb-6`}>Evaluation Criteria</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {round.evaluation.map((criterion) => (
            <div
              key={criterion.title}
              className={`rounded-xl border border-line bg-void/40 hover:border-${accent === "gold" ? "gold-dim" : "cyan-dim"} transition-colors duration-300 p-4 md:p-5`}
            >
              <span className="text-xl md:text-2xl">{criterion.icon}</span>
              <h5 className="font-display text-sm md:text-base text-bone mt-2.5 leading-tight">
                {criterion.title}
              </h5>
              <p className="text-mist text-[11px] md:text-xs leading-relaxed mt-1.5">
                {criterion.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Dates callout (only for Round 1) */}
        {round.keyDates && round.keyDates.length > 0 && (
          <div className={`mt-8 border-l-2 ${accentBorder} pl-5 py-2`}>
            <span className={`label-caps text-[10px] ${accentDim} block mb-3`}>
              Key Dates
            </span>
            <div className="flex flex-col gap-2">
              {round.keyDates.map((kd) => (
                <div key={kd.label} className="flex items-baseline gap-3">
                  <span className={`h-1 w-1 rounded-full ${dotBg} shrink-0 mt-1.5`} />
                  <span className="text-bone text-sm font-medium">{kd.value}</span>
                  <span className="text-mist text-xs">— {kd.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Journey Flowchart ──────────────────────────────────────────────────────
function JourneyFlowchart() {
  return (
    <div className="my-16 md:my-20">
      <h3 className="label-caps text-xs text-gold-bright text-center mb-8 md:mb-10">
        The Hackathon Journey
      </h3>

      <div className="relative max-w-4xl mx-auto">
        {/* Desktop: horizontal flow */}
        <div className="hidden md:block">
          <div className="flex flex-wrap justify-center items-center gap-y-6">
            {HACKATHON_JOURNEY.map((step, i) => (
              <div key={i} className="flex items-center">
                {/* Node */}
                <div className="flex flex-col items-center gap-2 w-20">
                  <div
                    className={`h-11 w-11 rounded-full border flex items-center justify-center text-lg shadow-lg shadow-black/20 ${
                      i === 0
                        ? "border-gold-dim bg-gold-dim/20"
                        : i === HACKATHON_JOURNEY.length - 1
                          ? "border-gold bg-gold/20"
                          : "border-line bg-ink"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-mist text-[9px] leading-tight text-center px-0.5">
                    {step.label}
                  </span>
                </div>
                {/* Arrow connector */}
                {i < HACKATHON_JOURNEY.length - 1 && (
                  <div className="flex items-center mx-0.5">
                    <div className="h-px w-4 bg-line" />
                    <div className="h-0 w-0 border-l-[5px] border-l-gold-dim border-y-[3px] border-y-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical flow */}
        <div className="md:hidden relative pl-10">
          {/* Connecting line */}
          <div className="absolute left-[17px] top-2 bottom-2 w-px bg-line" />

          <div className="flex flex-col gap-5">
            {HACKATHON_JOURNEY.map((step, i) => (
              <div key={i} className="relative flex items-center gap-4">
                <div
                  className={`absolute -left-10 h-9 w-9 rounded-full border flex items-center justify-center text-sm shrink-0 ${
                    i === 0
                      ? "border-gold-dim bg-gold-dim/20"
                      : i === HACKATHON_JOURNEY.length - 1
                        ? "border-gold bg-gold/20"
                        : "border-line bg-ink"
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-mist text-sm">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────
export default function RoundDetails() {
  const round1 = ROUNDS[0];
  const round2 = ROUNDS[1];

  return (
    <section id="rounds" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE ROUNDS"
          title="How It Works"
          subtitle="Two rounds. One path to the final stage. Here's everything you need to know."
        />

        {/* Round 1 */}
        <RoundCard round={round1} accent="gold" />

        {/* Journey Flowchart — between the two rounds */}
        <JourneyFlowchart />

        {/* Round 2 */}
        <RoundCard round={round2} accent="gold" />
      </div>
    </section>
  );
}
