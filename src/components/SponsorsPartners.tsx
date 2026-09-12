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

const TIER_NAME_COLOR: Record<SponsorTier, string> = {
  title: "text-gold-bright",
  silver: "text-[#e5e7eb]",
  supporting: "text-cyan",
  associate: "text-green",
  outreach: "text-[#c4b5fd]",
};

// ── Sponsor item (no box / border) ──────────────────────────────────────────
function SponsorItem({
  sponsor,
  isTitle,
}: {
  sponsor: Sponsor;
  isTitle?: boolean;
}) {
  const tier = sponsor.tier;

  const content = (
    <div
      className={`
        group relative flex flex-col items-center text-center
        transition-all duration-500 ease-out hover:-translate-y-1
        ${isTitle ? "py-3 md:py-4" : "py-2 md:py-3"}
      `}
    >
      {/* Tier badge */}
      <div className="mb-6">
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
      <div className="mb-5">
        <div
          className={`
            ${isTitle ? "w-24 h-24 md:w-28 md:h-28" : "w-20 h-20 md:w-24 md:h-24"}
            rounded-2xl bg-bone/95 flex items-center justify-center p-3
            shadow-lg group-hover:shadow-xl group-hover:scale-105
            transition-all duration-500
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
          font-display font-semibold
          ${isTitle ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}
          ${TIER_NAME_COLOR[tier]}
          mb-2
        `}
      >
        {sponsor.name}
      </h3>

      {/* Description */}
      <p className="text-mist text-xs md:text-sm max-w-xs mx-auto leading-relaxed">
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
        className="block no-underline"
      >
        {content}
      </a>
    );
  }
  return content;
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
      className="relative py-28 md:py-36 px-6 bg-charcoal/60 overflow-hidden"
    >
      {/* Neural backdrop spanning full width */}
      <NeuralBackdrop tint="gold" className="opacity-15" />

      {/* Subtle gold glow at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
          <SectionHeading
            eyebrow="// OUR PARTNERS"
            title="Sponsors & Partners"
            subtitle="NEURAX 3.0 is proudly supported by industry leaders and visionary organizations driving the future."
          />

          {/* ── Title Sponsor ─────────────────────────────── */}
          {titleSponsor && (
            <div className="mb-3 md:mb-5 border-b border-line/40 pb-3 md:pb-5">
              <SponsorItem sponsor={titleSponsor} isTitle />
            </div>
          )}

          {/* ── Silver + Supporting row ───────────────────── */}
          {(silverSponsors.length > 0 || supportingSponsors.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 md:mb-5 border-b border-line/40 pb-3 md:pb-5">
              {silverSponsors.map((s) => (
                <SponsorItem key={s.name} sponsor={s} />
              ))}
              {supportingSponsors.map((s) => (
                <SponsorItem key={s.name} sponsor={s} />
              ))}
            </div>
          )}

          {/* ── Associate Sponsors ────────────────────────── */}
          {associateSponsors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 md:mb-5 border-b border-line/40 pb-3 md:pb-5">
              {associateSponsors.map((s) => (
                <SponsorItem key={s.name} sponsor={s} />
              ))}
            </div>
          )}

          {/* ── Outreach Sponsor ──────────────────────────── */}
          {outreachSponsors.length > 0 && (
            <div className="max-w-md mx-auto">
              {outreachSponsors.map((s) => (
                <SponsorItem key={s.name} sponsor={s} />
              ))}
            </div>
          )}
      </div>

      {/* Bottom divider glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
