import SectionHeading from "./SectionHeading";

const DOMAIN_PRIZES = [
  {
    domain: "AI in Industry Automation",
    icon: "🏭",
    amount: "₹6,000",
    description: "Best project driving intelligent automation and smart manufacturing.",
    accent: "gold",
    glow: "shadow-[0_0_40px_rgba(233,201,138,0.30)]",
    border: "border-gold-bright/60",
    tagColor: "text-gold-bright",
    tagBorder: "border-gold-dim/50",
    badge: "bg-gold-dim/10",
  },
  {
    domain: "AI in Cybersecurity",
    icon: "🛡️",
    amount: "₹6,000",
    description: "Best project advancing threat detection and resilient network defense.",
    accent: "cyan",
    glow: "shadow-[0_0_40px_rgba(100,220,220,0.25)]",
    border: "border-cyan/50",
    tagColor: "text-cyan",
    tagBorder: "border-cyan/40",
    badge: "bg-cyan/10",
  },
  {
    domain: "AI in Smart Cities",
    icon: "🏙️",
    amount: "₹6,000",
    description: "Best project shaping intelligent urban infrastructure and city services.",
    accent: "gold",
    glow: "shadow-[0_0_40px_rgba(233,201,138,0.30)]",
    border: "border-gold-bright/60",
    tagColor: "text-gold-bright",
    tagBorder: "border-gold-dim/50",
    badge: "bg-gold-dim/10",
  },
];

export default function Winners() {
  return (
    <section id="winners" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      {/* subtle background pulse rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full border border-gold-dim/8 animate-pulse" />
        <div className="absolute h-[700px] w-[700px] rounded-full border border-gold-dim/5" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE REWARD"
          title="Prize Pool"
          subtitle="One winning team per track. Three domains, three equal champions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-4">
          {DOMAIN_PRIZES.map((prize) => (
            <div
              key={prize.domain}
              className={`group relative flex flex-col items-center text-center rounded-2xl border ${prize.border} bg-charcoal/60 backdrop-blur-sm px-6 py-9 ${prize.glow} hover:scale-[1.03] transition-all duration-300 overflow-hidden`}
            >
              {/* faint radial bloom behind the icon */}
              <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    prize.accent === "cyan"
                      ? "radial-gradient(circle, rgba(100,220,220,0.18) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(233,201,138,0.18) 0%, transparent 70%)",
                }}
              />

              {/* icon bubble */}
              <div
                className={`relative z-10 flex items-center justify-center h-20 w-20 rounded-full border ${prize.border} ${prize.badge} text-4xl mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                {prize.icon}
              </div>

              {/* prize amount */}
              <p className={`relative z-10 font-display text-4xl font-semibold ${prize.tagColor}`}>
                {prize.amount}
              </p>

              {/* domain name */}
              <span
                className={`relative z-10 label-caps text-[10px] border rounded-full px-3 py-1 mt-3 ${prize.tagColor} ${prize.tagBorder}`}
              >
                {prize.domain}
              </span>

              {/* description */}
              <p className="relative z-10 text-mist text-sm leading-relaxed mt-4 max-w-[220px]">
                {prize.description}
              </p>

              {/* bottom accent line */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 transition-all duration-500 rounded-full ${prize.accent === "cyan" ? "bg-cyan/60" : "bg-gold-bright/60"}`}
              />
            </div>
          ))}
        </div>

        {/* total pool callout */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 rounded-full border border-line bg-charcoal/40 px-6 py-3">
            <span className="text-xl">🏆</span>
            <span className="font-display text-gold-bright text-lg">₹18,000 Total Prize Pool</span>
          </div>
          <p className="text-mist text-xs text-center">
            Additional goodies & swags for all participants · Certificates for all teams
          </p>
        </div>
      </div>
    </section>
  );
}
