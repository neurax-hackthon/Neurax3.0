// ============================================================================
// NEURAX HACKATHON 3.0 — CONTENT DATA
// All placeholder/sample content lives here. Replace with real content when
// available — nothing in the components below needs to change.
// ============================================================================

export const EVENT = {
  name: "NEURAX",
  edition: "HACKATHON 3.0",
  tagline: "BUILD. CONNECT. INNOVATE.",
  countdownTarget: "2026-09-19T09:00:00",
  venue: "Innovation Hall, Central Campus",
  dateLabel: "SEP 19–20, 2026",
};

export type ProblemStatement = {
  code: string;
  summary: string;
  objectives: string[];
  requirements: string[];
};

export type Theme = {
  id: string;
  label: string;
  icon: string;
  description: string;
  tags: string[];
  // relative position in the neural node diagram, percentage based
  x: number;
  y: number;
  // Set on tracks that haven't been finalized yet — the modal shows a
  // "coming soon" panel instead of a locked/revealed problem statement.
  comingSoon?: boolean;
  // Hidden from the public site until the admin reveals it — see
  // useHackathonState()'s `problemStatementsVisible` flag.
  problemStatement: ProblemStatement;
};

export const THEMES: Theme[] = [
  {
    id: "ai-fintech",
    label: "AI in FinTech",
    icon: "\u{1F4B9}",
    description: "Apply intelligent automation to how money moves, is assessed, and is managed.",
    tags: ["AI", "FinTech", "Automation"],
    x: 50,
    y: 14,
    problemStatement: {
      code: "PS / 01",
      summary: "Design an AI-powered financial tool that assesses risk in real time and brings credit or savings access to first-time users.",
      objectives: [
        "Use an AI model to assess risk or trustworthiness from limited financial history.",
        "Give a first-time user a usable, automated path to build a credit or savings history.",
      ],
      requirements: [
        "A working onboarding-to-first-transaction flow.",
        "A model or heuristic that visibly drives a real decision in that flow.",
      ],
    },
  },
  {
    id: "ai-industry4",
    label: "AI in Industry 4.0",
    icon: "\u{1F3ED}",
    description: "Bring intelligent automation to the smart factory floor — prediction, monitoring, and control.",
    tags: ["AI", "Industry 4.0", "IoT", "Automation"],
    x: 18,
    y: 78,
    problemStatement: {
      code: "PS / 02",
      summary: "Build an AI-driven predictive maintenance system that flags equipment failures before they happen using live sensor data.",
      objectives: [
        "Detect anomalies or degrading trends in streamed or simulated sensor data.",
        "Turn a detected anomaly into a concrete, actionable maintenance alert.",
      ],
      requirements: [
        "A working prediction pipeline evaluated against historical or simulated sensor data.",
        "A dashboard or alerting flow a floor operator could actually act on.",
      ],
    },
  },
  {
    id: "tba",
    label: "Track 3",
    icon: "\u{2753}",
    description: "A new track is on the way — the organizers haven't finalized it yet.",
    tags: ["Coming Soon"],
    x: 82,
    y: 78,
    comingSoon: true,
    problemStatement: {
      code: "PS / 03",
      summary: "",
      objectives: [],
      requirements: [],
    },
  },
];

// Connections between theme node ids — drawn as neural pathways.
export const THEME_CONNECTIONS: [string, string][] = [
  ["ai-fintech", "ai-industry4"],
  ["ai-fintech", "tba"],
  ["ai-industry4", "tba"],
];

export type ScheduleItem = {
  time: string;
  label: string;
};

export const SCHEDULE: { day: string; date: string; items: ScheduleItem[] }[] = [
  {
    day: "DAY 1",
    date: "SEP 19",
    items: [
      { time: "09:00", label: "Registration" },
      { time: "10:00", label: "Opening Ceremony" },
      { time: "10:30", label: "Problem Statement Reveal" },
      { time: "11:00", label: "Team Formation" },
      { time: "12:00", label: "Hackathon Begins" },
      { time: "14:00", label: "Mentoring Session" },
      { time: "18:00", label: "Technical Workshop" },
      { time: "21:00", label: "Progress Check" },
    ],
  },
  {
    day: "DAY 2",
    date: "SEP 20",
    items: [
      { time: "09:00", label: "Development Continues" },
      { time: "11:00", label: "Mentor Review" },
      { time: "14:00", label: "Submission Window Opens" },
      { time: "16:00", label: "Final Submission" },
      { time: "17:00", label: "Project Demonstrations" },
      { time: "19:00", label: "Jury Evaluation" },
      { time: "20:30", label: "Results" },
      { time: "21:00", label: "Closing Ceremony" },
    ],
  },
];

export type RuleGroup = {
  title: string;
  points: string[];
};

export const RULES: RuleGroup[] = [
  {
    title: "Eligibility",
    points: [
      "Open to teams of 2–4 participants.",
      "At least one member must be a currently enrolled student.",
      "Cross-institution teams are welcome.",
    ],
  },
  {
    title: "Building",
    points: [
      "All code must be written during the event window.",
      "Open-source libraries and public APIs are permitted.",
      "Pre-existing designs or datasets must be disclosed at submission.",
    ],
  },
  {
    title: "Judging",
    points: [
      "Projects are scored on innovation, technical depth, execution, and impact.",
      "Each team presents a 5-minute live demo followed by Q&A.",
      "Judges' decisions are final.",
    ],
  },
];

export type PreviousEdition = {
  edition: string;
  year: string;
  participants: string;
  projects: string;
  winningTeam: string;
};

export const PREVIOUS_HACKATHONS: PreviousEdition[] = [
  {
    edition: "NEURAX 1.0",
    year: "2024",
    participants: "420",
    projects: "86",
    winningTeam: "Team Axiom",
  },
  {
    edition: "NEURAX 2.0",
    year: "2025",
    participants: "610",
    projects: "134",
    winningTeam: "Team Lumen",
  },
];

export type Winner = {
  place: string;
  rank: number;
  team: string;
  project: string;
};

export const WINNERS: Winner[] = [
  { place: "1st Place", rank: 1, team: "Team Synapse", project: "NeuroRoute — adaptive emergency dispatch" },
  { place: "2nd Place", rank: 2, team: "Team NeuralX", project: "Cortex Grid — predictive energy balancing" },
  { place: "3rd Place", rank: 3, team: "Team Cortex", project: "SignalAid — assistive communication interface" },
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#themes", label: "Themes" },
  { href: "#schedule", label: "Schedule" },
  { href: "#winners", label: "Prizes" },
];

// ─── Process ────────────────────────────────────────────────────────────────
// A condensed, milestone-level view of the same 24 hours detailed minute-by-
// minute in SCHEDULE below — the stage names here are pulled straight from
// SCHEDULE's items rather than re-authored, so the two sections stay in sync.
export type ProcessStage = {
  step: string;
  title: string;
  description: string;
};

export const PROCESS: ProcessStage[] = [
  {
    step: "01",
    title: "Team Formation",
    description: "Form or join a team right after the opening ceremony and problem statement reveal.",
  },
  {
    step: "02",
    title: "Build",
    description: "24 hours of building, with mentoring sessions and a technical workshop along the way.",
  },
  {
    step: "03",
    title: "Submission",
    description: "Lock in your final submission once the submission window opens.",
  },
  {
    step: "04",
    title: "Evaluation",
    description: "Each team presents a live demo; judges score on innovation, technical depth, execution, and impact.",
  },
  {
    step: "05",
    title: "Results",
    description: "Winners are announced at the closing ceremony.",
  },
];

// ─── Benefits ───────────────────────────────────────────────────────────────
export type Benefit = {
  icon: string;
  title: string;
  description: string;
};

export const BENEFITS: Benefit[] = [
  { icon: "\u{1F91D}", title: "Networking", description: "Meet fellow builders, mentors, and organizers from across the ecosystem." },
  { icon: "\u{1F393}", title: "Learning", description: "Pick up new tools and techniques through hands-on building and the technical workshop." },
  { icon: "\u{1F9ED}", title: "Mentorship", description: "Get guidance from mentors during dedicated mentoring sessions." },
  { icon: "\u{1F517}", title: "Collaboration", description: "Team up across disciplines to take a project from idea to demo." },
  { icon: "\u{1F680}", title: "Exposure", description: "Present your work to judges and the wider NeurAX community." },
  { icon: "\u{1F3C6}", title: "Recognition", description: "Top projects are recognized at the closing ceremony." },
];
