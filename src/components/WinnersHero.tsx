import { useState } from "react";
import cybersecurityWinnerPhoto from "../../IMG_6886.JPG (1).jpeg";
import automationWinnerPhoto from "../../IMG_6888.JPG.jpeg";
import smartCityWinnerPhoto from "../../IMG_6878.JPG.jpeg";

// ─── Winner Data ─────────────────────────────────────────────────────────────
const DOMAIN_WINNERS = [
  {
    id: "automation",
    domain: "AI in Industry Automation",
    photo: automationWinnerPhoto,
    icon: "🏭",
    teamName: "HUNGRY INNOVATORS",
    teamId: "NX3-AIA-39",
    college: "Sphoorthy Engineering College",
    state: "Telangana",
    teamSize: 2,
    accent: "gold" as const,
    border: "border-gold-bright/60",
    activeBg: "bg-gold-bright/12",
    glow: "shadow-[0_0_60px_rgba(233,201,138,0.20)]",
    tagColor: "text-gold-bright",
    tagBg: "bg-gold-bright/10",
    markerColor: "bg-gold-bright",
  },
  {
    id: "cybersecurity",
    domain: "AI in Cybersecurity",
    photo: cybersecurityWinnerPhoto,
    icon: "🛡️",
    teamName: "codeb1ooded",
    teamId: "NX3-ACS-03",
    college: "Keshav Memorial Institute of Technology",
    state: "Telangana",
    teamSize: 4,
    accent: "cyan" as const,
    border: "border-cyan/50",
    activeBg: "bg-cyan/12",
    glow: "shadow-[0_0_60px_rgba(111,216,209,0.18)]",
    tagColor: "text-cyan",
    tagBg: "bg-cyan/10",
    markerColor: "bg-cyan",
  },
  {
    id: "smartcity",
    domain: "AI in Smart Cities",
    photo: smartCityWinnerPhoto,
    icon: "🏙️",
    teamName: "TEAM KRISHNA",
    teamId: "NX3-ASC-01",
    college: "SRKR Engineering College",
    state: "Andhra Pradesh",
    teamSize: 4,
    accent: "gold" as const,
    border: "border-gold-bright/60",
    activeBg: "bg-gold-bright/12",
    glow: "shadow-[0_0_60px_rgba(233,201,138,0.20)]",
    tagColor: "text-gold-bright",
    tagBg: "bg-gold-bright/10",
    markerColor: "bg-gold-bright",
  },
];

// ─── Vertical Marquee ─────────────────────────────────────────────────────────
const MARQUEE_WORDS = [
  "HACKATHON",
  "FINISHED",
  "◆",
  "3",
  "CHAMPIONS",
  "◆",
  "10",
  "WINNERS",
  "◆",
  "NEURAX",
  "3.0",
  "◆",
];

function VerticalMarquee({ reverse = false, side }: { reverse?: boolean; side: "left" | "right" }) {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center select-none pointer-events-none">
      <div
        className="flex flex-col items-center gap-6"
        style={{
          animation: "marquee-vertical 20s linear infinite",
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {items.map((word, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={`font-display font-semibold tracking-[0.2em] whitespace-nowrap ${
              word === "◆"
                ? "text-gold-bright text-base opacity-70"
                : "text-gold-dim text-sm opacity-60"
            }`}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: side === "left" ? "rotate(180deg)" : "none",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Winners Hero Section ─────────────────────────────────────────────────────
export default function WinnersHero() {
  const [active, setActive] = useState(0);
  const winner = DOMAIN_WINNERS[active];

  return (
    <section
      id="champions"
      className="relative bg-void overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div
          className={`h-[55vmax] w-[55vmax] rounded-full blur-3xl opacity-[0.07] transition-all duration-700 ${
            winner.accent === "gold" ? "bg-gold" : "bg-cyan"
          }`}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── LEFT MARQUEE — absolute, full section height, 30px from left edge ── */}
      <div
        className="hidden xl:block absolute top-0 bottom-0 z-20 overflow-hidden rounded-xl border border-gold-dim/20 bg-gold-dim/5"
        style={{ left: "50px", width: "44px" }}
      >
        <VerticalMarquee side="left" />
      </div>

      {/* ── RIGHT MARQUEE — absolute, full section height, 30px from right edge ── */}
      <div
        className="hidden xl:block absolute top-0 bottom-0 z-20 overflow-hidden rounded-xl border border-gold-dim/20 bg-gold-dim/5"
        style={{ right: "50px", width: "44px" }}
      >
        <VerticalMarquee reverse side="right" />
      </div>

      {/* ── MAIN CONTENT — padded to clear the 30px+44px marquee columns ── */}
      <div className="relative z-10 px-4 md:px-8 xl:px-[120px]">

          {/* Compact eyebrow + heading */}
          <div className="flex flex-col items-center gap-2 text-center mb-6 sm:mb-8 px-2">
            <span className="label-caps text-[10px] sm:text-[11px] text-cyan tracking-[0.25em] sm:tracking-[0.35em]">
              NEURAX 3.0 · 24 HOURS COMPLETE
            </span>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium text-bone leading-none">
              Champions
            </h1>
            <p className="text-mist text-sm max-w-md mt-1">
              Three domains. Three winning teams. One unforgettable hackathon.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-12 mt-3">
              {[
                { value: "3", label: "Domains" },
                { value: "10", label: "Champions" },
                { value: "3", label: "Institutions" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-0">
                  <span className="font-display text-2xl md:text-3xl text-gold-bright font-semibold">{stat.value}</span>
                  <span className="label-caps text-[9px] text-mist tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tabs (left) + Card (right) ── */}
          <div className="flex flex-col lg:flex-row items-stretch gap-5 w-full max-w-7xl mx-auto">

            {/* LEFT: Vertical tab list */}
            <div className="lg:w-64 xl:w-72 shrink-0 flex flex-col gap-2.5">
              {DOMAIN_WINNERS.map((w, i) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative flex items-center gap-3 px-5 py-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                    active === i
                      ? `${w.activeBg} ${w.border} ${w.glow}`
                      : "border-line/50 bg-charcoal/40 hover:bg-charcoal/60 hover:border-line"
                  }`}
                >
                  {/* Active bar */}
                  {active === i && (
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-full ${w.markerColor}`} />
                  )}

                  {/* Icon */}
                  <div
                    className={`flex items-center justify-center h-10 w-10 shrink-0 rounded-xl border text-xl transition-all duration-300 ${
                      active === i ? `${w.border} ${w.tagBg}` : "border-line/40 bg-void/40"
                    }`}
                  >
                    {w.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className={`label-caps text-[9px] mb-0.5 transition-colors duration-300 ${active === i ? w.tagColor : "text-mist/50"}`}>
                      Domain Winner
                    </p>
                    <p className={`font-display text-sm font-semibold leading-tight transition-colors duration-300 ${active === i ? w.tagColor : "text-mist"}`}>
                      {w.domain}
                    </p>
                    <p className={`text-[11px] mt-0.5 truncate transition-colors duration-300 ${active === i ? "text-bone/70" : "text-mist/40"}`}>
                      {w.teamName}
                    </p>
                  </div>

                  {/* Chevron */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`shrink-0 transition-colors duration-300 ${active === i ? w.tagColor : "text-mist/25"}`}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}

              {/* Prize summary */}
              <div className="mt-1 rounded-2xl border border-gold-bright/20 bg-gold-bright/5 px-5 py-3.5 flex items-center gap-3">
                <span className="text-xl">🏆</span>
                <div>
                  <p className="font-display text-gold-bright text-base font-semibold">₹50,000+</p>
                  <p className="label-caps text-[9px] text-mist/50 mt-0.5">Total Prize Pool</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Winner card */}
            <div
              key={winner.id}
              className={`flex-1 rounded-3xl border ${winner.border} bg-charcoal/60 backdrop-blur-sm overflow-hidden ${winner.glow} transition-all duration-500 flex flex-col md:flex-row`}
              style={{ animation: "fadeSlideUp 0.3s ease both" }}
            >
              {/* Photo — full image, no cropping, dominant over text */}
              <div
                className={`relative w-full md:w-3/5 shrink-0 border-b md:border-b-0 md:border-r ${winner.border} bg-void/80 flex flex-col items-center justify-center gap-2 min-h-[240px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[480px]`}
              >
                {winner.photo ? (
                  <img
                    src={winner.photo}
                    alt={`${winner.teamName} winning team`}
                    className="absolute inset-0 h-full w-full object-contain object-center"
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`flex items-center justify-center h-16 w-16 rounded-2xl border-2 ${winner.border} ${winner.tagBg} text-4xl`}>
                      {winner.icon}
                    </div>
                    <span className="text-4xl opacity-20">📸</span>
                    <p className="label-caps text-[9px] text-mist/30 tracking-widest">Team Photo · Placeholder</p>
                  </div>
                )}

                {/* Badge */}
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${winner.border} ${winner.tagBg}`}>
                  <span className="text-sm">🏆</span>
                  <span className={`label-caps text-[9px] ${winner.tagColor}`}>Domain Winner</span>
                </div>
              </div>

              {/* Details — narrower, secondary to the photo */}
              <div className="w-full md:w-2/5 p-4 md:p-5 flex flex-col justify-center">
                <div className="mb-2">
                  <p className={`label-caps text-[9px] ${winner.tagColor} mb-0.5`}>{winner.domain}</p>
                  <h2 className={`font-display text-xl md:text-2xl font-semibold ${winner.tagColor} leading-tight`}>
                    {winner.teamName}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-2">
                  <div>
                    <p className="label-caps text-[9px] text-mist/50 mb-0.5">Team ID</p>
                    <p className={`font-display text-sm font-semibold ${winner.tagColor}`}>{winner.teamId}</p>
                  </div>
                  <div>
                    <p className="label-caps text-[9px] text-mist/50 mb-0.5">State</p>
                    <p className="text-bone text-sm font-medium">{winner.state}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="label-caps text-[9px] text-mist/50 mb-0.5">Institution</p>
                    <p className="text-bone text-sm font-medium leading-snug">{winner.college}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-line/40">
                  <span className={`inline-flex items-center gap-1.5 label-caps text-[10px] px-3 py-1.5 rounded-full border ${winner.border} ${winner.tagBg} ${winner.tagColor}`}>
                    👥 {winner.teamSize} Member{winner.teamSize > 1 ? "s" : ""}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 label-caps text-[10px] px-3 py-1.5 rounded-full border ${winner.border} ${winner.tagBg} ${winner.tagColor}`}>
                    🏆 ₹10,000
                  </span>
                </div>
              </div>
            </div>

          </div>{/* end tabs+card row */}

      </div>{/* end main content wrapper */}

      {/* Scroll hint */}
      <div className="flex flex-col items-center gap-2 mt-10 opacity-30 pointer-events-none">
        <span className="label-caps text-[9px] text-mist tracking-widest">Scroll</span>
        <div className="h-6 w-px bg-gradient-to-b from-gold-dim to-transparent" />
      </div>
    </section>
  );
}
