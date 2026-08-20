// ============================================================================
// NEURAX HACKATHON 3.0 — CONTENT DATA
// All placeholder/sample content lives here. Replace with real content when
// available — nothing in the components below needs to change.
// ============================================================================

export const EVENT = {
  name: "NeuraX",
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
      { time: "09:00 AM", label: "Check-in & Verification" },
      { time: "09:30 AM", label: "Opening Ceremony" },
      { time: "10:00 AM", label: "Hacking Begins" },
      { time: "02:00 PM", label: "Lunch" },
      { time: "05:00 PM", label: "Activity & Checkpoint" },
      { time: "08:00 PM", label: "Dinner" },
      { time: "11:00 PM", label: "Checkpoint" },
    ],
  },
  {
    day: "DAY 2",
    date: "SEP 20",
    items: [
      { time: "01:00 AM", label: "Refreshment" },
      { time: "06:00 AM", label: "Checkpoint" },
      { time: "08:00 AM", label: "Breakfast" },
      { time: "10:00 AM", label: "Project Submission" },
      { time: "12:00 PM", label: "Awards & Closing Ceremony" },
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
    edition: "NeuraX 1.0",
    year: "2024",
    participants: "420",
    projects: "86",
    winningTeam: "Team Axiom",
  },
  {
    edition: "NeuraX 2.0",
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
  date: string;
  title: string;
  description: string;
  icon: string;
};

export const PROCESS: ProcessStage[] = [
  {
    date: "Feb 23, 2026",
    title: "Registration Opens",
    description: "Teams can start registering",
    icon: "📝",
  },
  {
    date: "Mar 8, 2026",
    title: "Registration Closes",
    description: "Last date to register teams",
    icon: "📌",
  },
  {
    date: "Mar 8, 2026",
    title: "Round 1 - Abstract submission",
    description: "Submit your project abstract for evaluation",
    icon: "📄",
  },
  {
    date: "Mar 10, 2026",
    title: "Shortlisted Teams",
    description: "Selected teams will be notified via email",
    icon: "✅",
  },
  {
    date: "Mar 11, 2026",
    title: "Final Confirmation",
    description: "Shortlisted teams confirm participation",
    icon: "☑️",
  },
  {
    date: "Mar 14–15, 2026",
    title: "NeuraX 3.0 Hackathon",
    description: "24-hour innovation begins at CMR Technical Campus",
    icon: "🚀",
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
  { icon: "🚀", title: "Exposure", description: "Present your work to judges and the wider NeuraX community." },
  { icon: "\u{1F3C6}", title: "Recognition", description: "Top projects are recognized at the closing ceremony." },
];
