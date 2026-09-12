// ============================================================================
// NEURAX HACKATHON 3.0 — SPONSOR DATA
// Sponsor tiers and details — update logos & descriptions as confirmed.
// ============================================================================

export type SponsorTier =
  | "title"
  | "silver"
  | "supporting"
  | "associate"
  | "outreach";

export type Sponsor = {
  name: string;
  logo: string;
  description: string;
  tier: SponsorTier;
  url?: string;
};

export type TierMeta = {
  id: SponsorTier;
  label: string;
  icon: string;
};

export const TIER_ORDER: TierMeta[] = [
  { id: "title", label: "TITLE SPONSOR", icon: "👑" },
  { id: "silver", label: "SILVER SPONSOR", icon: "🥈" },
  { id: "supporting", label: "SUPPORTING SPONSOR", icon: "🤝" },
  { id: "associate", label: "ASSOCIATE SPONSOR", icon: "🔗" },
  { id: "outreach", label: "OFFICIAL OUTREACH SPONSOR", icon: "📡" },
];

export const SPONSORS: Sponsor[] = [
  {
    name: "StepUpMark.AI",
    logo: "/images/sponsors/stepupmark.png",
    description:
      "Leading the AI revolution by empowering businesses and developers with state-of-the-art AI solutions and marketing strategies.",
    tier: "title",
    url: "https://stepupmark.ai",
  },
  {
    name: "Accentric",
    logo: "/images/sponsors/accentric.png",
    description:
      "Driving innovation through cutting-edge technology solutions and creative digital experiences for the modern enterprise.",
    tier: "silver",
    url: "https://accentric.in",
  },
  {
    name: "Gradious",
    logo: "/images/sponsors/gradious.png",
    description:
      "Transforming education with intelligent assessment platforms that empower institutions and learners alike.",
    tier: "supporting",
    url: "https://gradious.com",
  },
  {
    name: "StayKaro",
    logo: "/images/sponsors/staykaro.png",
    description:
      "Simplifying accommodation discovery for students and professionals — your next stay, sorted.",
    tier: "associate",
    url: "https://staykaro.org",
  },
  {
    name: "Kaiotix Technologies",
    logo: "/images/sponsors/kaiotix.png",
    description:
      "Building next-generation technology solutions that bridge the gap between ideas and impactful products.",
    tier: "associate",
    url: "https://kaiotix.com",
  },
  {
    name: "Student Tribe",
    logo: "/images/sponsors/studenttribe.png",
    description:
      "India's student community platform connecting learners with opportunities, events, and a thriving peer network.",
    tier: "outreach",
    url: "https://studenttribe.in",
  },
];
