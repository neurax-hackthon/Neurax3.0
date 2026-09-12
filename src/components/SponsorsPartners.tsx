import { SPONSORS, TIER_ORDER, type Sponsor, type SponsorTier } from "../data/sponsors";
import SectionHeading from "./SectionHeading";
import NeuralBackdrop from "./NeuralBackdrop";

// ── Tier-specific styling maps ──────────────────────────────────────────────
const TIER_BADGE_STYLE: Record<SponsorTier, string> = {
  title:
    "bg-gradient-to-r from-gold/20 to-gold-bright/20 text-gold-bright border-gold/40",
  silver:
    "bg-gradient-to-r from-[#9ca3af]/15 to-[#d1d5db]/15 text-[#d1d5db] border-[#9ca3af]/30",
  supporting:
    "bg-gradient-to-r from-cyan/15 to-cyan-dim/15 text-cyan border-cyan-dim/40",
  associate:
    "bg-gradient-to-r from-green/15 to-green-dim/15 text-green border-green-dim/40",
  outreach:
    "bg-gradient-to-r from-[#a78bfa]/15 to-[#7c3aed]/15 text-[#c4b5fd] border-[#7c3aed]/30",
};

const TIER_CARD_GLOW: Record<SponsorTier, string> = {
  title: "shadow-[0_0_60px_-12px_rgba(201,163,95,0.25)]",
  silver: "shadow-[0_0_40px_-12px_rgba(156,163,175,0.15)]",
  supporting: "shadow-[0_0_40px_-12px_rgba(111,216,209,0.15)]",
  associate: "shadow-[0_0_30px_-12px_rgba(131,216,150,0.12)]",
  outreach: "shadow-[0_0_40px_-12px_rgba(167,139,250,0.15)]",
};

const TIER_BORDER: Record<SponsorTier, string> = {
  title: "border-gold/30 hover:border-gold/50",
  silver: "border-[#9ca3af]/20 hover:border-[#9ca3af]/40",
  supporting: "border-cyan-dim/25 hover:border-cyan/40",
  associate: "border-green-dim/25 hover:border-green/35",
  outreach: "border-[#7c3aed]/25 hover:border-[#a78bfa]/40",
};

const TIER_NAME_COLOR: Record<SponsorTier, string> = {
  title: "text-gold-bright",
  silver: "text-[#e5e7eb]",
  supporting: "text-cyan",
  associate: "text-green",
  outreach: "text-[#c4b5fd]",
};

// ── Sponsor card ────────────────────────────────────────────────────────────
function SponsorCard({
  sponsor,
  isTitle,
}: {
  sponsor: Sponsor;
  isTitle?: boolean;
}) {
  const tier = sponsor.tier;

  const card = (
    <div
      className={`
        group relative rounded-2xl border bg-charcoal/60 backdrop-blur-sm
        overflow-hidden transition-all duration-500 ease-out
        hover:-translate-y-1 h-full flex flex-col
        ${TIER_BORDER[tier]}
        ${TIER_CARD_GLOW[tier]}
        ${isTitle ? "px-8 py-12 md:px-14 md:py-16" : "px-6 py-10 md:px-10 md:py-12"}
      `}
    >
      {/* Subtle neural backdrop in the background */}
      <NeuralBackdrop
        tint={tier === "title" || tier === "silver" ? "gold" : "cyan"}
        className="opacity-10 group-hover:opacity-20 transition-opacity duration-700"
      />

      {/* Tier badge */}
      <div className="relative flex justify-center mb-8">
        <span
          className={`
            inline-flex items-center gap-2 label-caps text-[10px] md:text-[11px]
            px-5 py-2 rounded-full border
            ${TIER_BADGE_STYLE[tier]}
          `}
        >
          {TIER_ORDER.find((t) => t.id === tier)?.icon}{" "}
          {TIER_ORDER.find((t) => t.id === tier)?.label}
        </span>
      </div>

      {/* Logo container */}
      <div className="relative flex justify-center mb-6">
        <div
          className={`
            ${isTitle ? "w-36 h-36 md:w-44 md:h-44" : "w-28 h-28 md:w-32 md:h-32"}
            rounded-2xl bg-bone/95 flex items-center justify-center p-4
            shadow-lg group-hover:shadow-xl transition-shadow duration-500
          `}
        >
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Name */}
      <h3
        className={`
          relative font-display text-center font-semibold
          ${isTitle ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}
          ${TIER_NAME_COLOR[tier]}
          mb-3
        `}
      >
        {sponsor.name}
      </h3>

      {/* Description */}
      <p className="relative text-mist text-sm md:text-[15px] text-center max-w-sm mx-auto leading-relaxed mt-auto">
        {sponsor.description}
      </p>
    </div>
  );

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline h-full"
      >
        {card}
      </a>
    );
  }
  return card;
}

// ── Main section ────────────────────────────────────────────────────────────
export default function SponsorsPartners() {
  const titleSponsor = SPONSORS.find((s) => s.tier === "title");
  const silverSponsors = SPONSORS.filter((s) => s.tier === "silver");
  const supportingSponsors = SPONSORS.filter((s) => s.tier === "supporting");
  const associateSponsors = SPONSORS.filter((s) => s.tier === "associate");
  const outreachSponsors = SPONSORS.filter((s) => s.tier === "outreach");

  return (
    <section
      id="sponsors"
      className="relative py-28 md:py-36 px-6 bg-ink overflow-hidden"
    >
      {/* Top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="// OUR PARTNERS"
          title="Sponsors & Partners"
          subtitle="NEURAX 3.0 is proudly supported by industry leaders and visionary organizations driving the future."
        />

        {/* ── Title Sponsor ─────────────────────────────── */}
        {titleSponsor && (
          <div className="mb-16 md:mb-20">
            <SponsorCard sponsor={titleSponsor} isTitle />
          </div>
        )}

        {/* ── Silver + Supporting row ───────────────────── */}
        {(silverSponsors.length > 0 || supportingSponsors.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
            {silverSponsors.map((s) => (
              <SponsorCard key={s.name} sponsor={s} />
            ))}
            {supportingSponsors.map((s) => (
              <SponsorCard key={s.name} sponsor={s} />
            ))}
          </div>
        )}

        {/* ── Associate Sponsors ────────────────────────── */}
        {associateSponsors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
            {associateSponsors.map((s) => (
              <SponsorCard key={s.name} sponsor={s} />
            ))}
          </div>
        )}

        {/* ── Outreach Sponsor ──────────────────────────── */}
        {outreachSponsors.length > 0 && (
          <div className="max-w-lg mx-auto">
            {outreachSponsors.map((s) => (
              <SponsorCard key={s.name} sponsor={s} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom divider glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
