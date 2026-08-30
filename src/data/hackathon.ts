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
  venue: "CMR TECHNICAL CAMPUS",
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
    id: "ai-industry-automation",
    label: "AI in Industry Automation",
    icon: "\u{1F3ED}",
    description: "AI-powered industrial automation, smart manufacturing, predictive maintenance, process optimization, robotics, and intelligent production systems.",
    tags: ["SDG 09", "Automation", "Robotics"],
    x: 50,
    y: 14,
    comingSoon: false,
    problemStatement: {
      code: "PS / 01",
      summary: "",
      objectives: [],
      requirements: [],
    },
  },
  {
    id: "ai-cybersecurity",
    label: "AI in Cybersecurity",
    icon: "\u{1F6E1}",
    description: "AI-driven threat detection, automated vulnerability scanning, anomaly detection, phishing prevention, secure authentication, and resilient network defense.",
    tags: ["Security", "Cyber", "Defense"],
    x: 18,
    y: 78,
    comingSoon: false,
    problemStatement: {
      code: "PS / 02",
      summary: "Develop an AI-powered cybersecurity solution to proactively detect and mitigate emerging network threats.",
      objectives: [
        "Detect anomalies in network traffic in real-time.",
        "Classify potential threats and minimize false positives.",
        "Provide actionable insights for rapid incident response."
      ],
      requirements: [
        "Implement a scalable machine learning model.",
        "Provide a dashboard for threat visualization.",
        "Ensure low latency in threat detection."
      ],
    },
  },
  {
    id: "ai-smart-cities",
    label: "AI in Smart Cities",
    icon: "\u{1F3D9}",
    description: "AI-powered urban planning, intelligent transportation, waste management, smart infrastructure, public safety, energy efficiency, and better city services.",
    tags: ["SDG 11", "Smart City", "Infrastructure"],
    x: 82,
    y: 78,
    comingSoon: false,
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
  ["ai-industry-automation", "ai-cybersecurity"],
  ["ai-industry-automation", "ai-smart-cities"],
  ["ai-cybersecurity", "ai-smart-cities"],
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
      "Open to teams of 3–4 participants.",
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
  photo?: string;
  siteUrl?: string;
};

export const PREVIOUS_HACKATHONS: PreviousEdition[] = [
  {
    edition: "NeuraX 1.0",
    year: "2025",
    participants: "140",
    projects: "35",
    winningTeam: "Team InnoMinds",
    photo: "/images/neurax-history1.jpeg",
    siteUrl: "https://neurax2025.vercel.app/",
  },
  {
    edition: "NeuraX 2.0",
    year: "2026",
    participants: "300",
    projects: "75",
    winningTeam: "Team FuzzOPS",
    photo: "/images/neurax-history-2.jpeg",
    siteUrl: "https://neurax2-0.vercel.app/",
  },
];

export type Winner = {
  place: string;
  rank: number;
  team: string;
  project: string;
  prize: string;
};

export const WINNERS: Winner[] = [
  { place: "1st Place", rank: 1, team: "Team Synapse", project: "NeuroRoute — adaptive emergency dispatch", prize: "₹10,000" },
  { place: "2nd Place", rank: 2, team: "Team NeuralX", project: "Cortex Grid — predictive energy balancing", prize: "₹5,000" },
  { place: "3rd Place", rank: 3, team: "Team Cortex", project: "SignalAid — assistive communication interface", prize: "₹3,000" },
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#themes", label: "Themes" },
  { href: "#rounds", label: "Rounds" },
  { href: "#schedule", label: "Schedule" },
  { href: "#winners", label: "Prizes" },
];

// ─── Rounds ─────────────────────────────────────────────────────────────────
export type RoundStep = {
  step: number;
  title: string;
  description: string;
  icon: string;
};

export type EvaluationCriterion = {
  icon: string;
  title: string;
  description: string;
};

export type RoundInfo = {
  id: string;
  roundNumber: number;
  title: string;
  subtitle: string;
  eyebrow: string;
  fee: string;
  deadline?: string;
  teamSize: string;
  format: string;
  steps: RoundStep[];
  evaluation: EvaluationCriterion[];
  keyDates?: { label: string; value: string }[];
};

export const ROUNDS: RoundInfo[] = [
  {
    id: "round-1",
    roundNumber: 1,
    title: "Idea Submission",
    subtitle: "Your hackathon journey begins with YOUR IDEA! Submit an original, innovative abstract based on your selected official theme.",
    eyebrow: "FREE & ONLINE",
    fee: "FREE",
    deadline: "11th September 2026",
    teamSize: "3–4 Participants",
    format: "PDF (Abstract Template)",
    steps: [
      {
        step: 1,
        title: "Team Registration",
        description: "The Team Leader registers the complete team through the official Neurax Hackathon website.",
        icon: "👥",
      },
      {
        step: 2,
        title: "Choose Your Theme",
        description: "Each team selects ONE official hackathon theme. Your idea must be based on the selected theme and address a relevant real-world problem.",
        icon: "🎯",
      },
      {
        step: 3,
        title: "Receive Guidelines",
        description: "After registration, the Team Leader receives an email with Round 1 guidelines, theme details, submission instructions, and evaluation criteria.",
        icon: "📩",
      },
      {
        step: 4,
        title: "Submit Your Idea",
        description: "Submit an original and innovative idea using the official Abstract Template in PDF format before the deadline.",
        icon: "📝",
      },
    ],
    evaluation: [
      { icon: "🎯", title: "Theme Relevance", description: "How well the idea aligns with the selected official theme." },
      { icon: "💡", title: "Innovation", description: "Uniqueness and creativity of the proposed solution." },
      { icon: "🔍", title: "Problem Relevance", description: "Importance and significance of the problem being addressed." },
      { icon: "⚙️", title: "Feasibility", description: "Practicality and possibility of implementation." },
      { icon: "🌍", title: "Potential Impact", description: "Value, scalability, and potential real-world impact." },
      { icon: "📝", title: "Clarity", description: "How effectively the idea and proposed solution are presented." },
    ],
    keyDates: [
      { label: "Submission Deadline", value: "11 September 2026" },
      { label: "Shortlist Announced", value: "13 September 2026" },
    ],
  },
  {
    id: "round-2",
    roundNumber: 2,
    title: "The Challenge",
    subtitle: "This is where the real challenge begins! The problem statement is revealed on the day — build a complete working project and present it live.",
    eyebrow: "ON THE DAY OF THE HACKATHON",
    fee: "₹349 / Participant",
    teamSize: "3–4 Participants",
    format: "Working Project + Live Demo",
    steps: [
      {
        step: 1,
        title: "Problem Statement Reveal",
        description: "The Round 2 problem statement is officially revealed on the day of the hackathon. Teams do NOT receive it in advance.",
        icon: "🚨",
      },
      {
        step: 2,
        title: "Analyze the Challenge",
        description: "Understand the problem, identify key requirements, and plan your approach with your team.",
        icon: "🧠",
      },
      {
        step: 3,
        title: "Build Your Solution",
        description: "Develop a complete working project within the given hackathon timeline. Build, test, and prepare for demonstration.",
        icon: "💻",
      },
      {
        step: 4,
        title: "Present & Demonstrate",
        description: "Present your solution and demonstrate your working project before the judging panel.",
        icon: "🎤",
      },
      {
        step: 5,
        title: "Final Evaluation",
        description: "Teams are evaluated across all criteria. Top performers are recognized and awarded.",
        icon: "🏆",
      },
    ],
    evaluation: [
      { icon: "💡", title: "Innovation & Creativity", description: "Originality and inventiveness of the solution." },
      { icon: "🧠", title: "Problem Understanding", description: "Depth of analysis and understanding of the challenge." },
      { icon: "💻", title: "Technical Implementation", description: "Quality of code, architecture, and engineering." },
      { icon: "⚙️", title: "Functionality & Feasibility", description: "Does it work? Can it scale?" },
      { icon: "🌍", title: "Impact & Scalability", description: "Real-world value and growth potential." },
      { icon: "📊", title: "Presentation & Demo", description: "Clarity and effectiveness of the live demonstration." },
    ],
  },
];

// ─── Journey ────────────────────────────────────────────────────────────────
export type JourneyStep = {
  icon: string;
  label: string;
};

export const HACKATHON_JOURNEY: JourneyStep[] = [
  { icon: "👥", label: "Form a Team" },
  { icon: "🎯", label: "Select a Theme" },
  { icon: "💡", label: "Develop Your Idea" },
  { icon: "📝", label: "Abstract Submission" },
  { icon: "👨‍⚖️", label: "Idea Evaluation" },
  { icon: "🏆", label: "Shortlisting" },
  { icon: "💳", label: "Round 2 Registration" },
  { icon: "🚨", label: "Problem Statement Reveal" },
  { icon: "🧠", label: "Analyze the Challenge" },
  { icon: "💻", label: "Build Your Project" },
  { icon: "🎤", label: "Final Presentation" },
  { icon: "🏆", label: "Winners" },
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
    date: "Aug 21, 2026",
    title: "Registration Opens",
    description: "Teams can start registering",
    icon: "📝",
  },
  {
    date: "Sep 10, 2026",
    title: "Registration Closes",
    description: "Last date to register teams",
    icon: "📌",
  },
  {
    date: "Sep 11, 2026",
    title: "Round 1 - Abstract submission",
    description: "Submit your project abstract for evaluation",
    icon: "📄",
  },
  {
    date: "Sep 13, 2026",
    title: "Shortlisted Teams",
    description: "Selected teams will be notified via email",
    icon: "✅",
  },
  {
    date: "Sep 14, 2026",
    title: "Final Confirmation",
    description: "Shortlisted teams confirm participation",
    icon: "☑️",
  },
  {
    date: "Sep 19–20, 2026",
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
