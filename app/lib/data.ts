export type Athlete = {
  id: string;
  name: string;
  initials: string;
  sport: string;
  position: string;
  school: string;
  city: string;
  state: string;
  classYear: string;
  audience: string;
  engagement: string;
  momentum: string;
  dealRange: string;
  tags: string[];
  bio: string;
  source: string;
  sourceUrl: string;
  verified: boolean;
  guardianReady: boolean;
};

export type Opportunity = {
  id: string;
  title: string;
  brand: string;
  category: string;
  location: string;
  budget: string;
  format: string;
  deadline: string;
  fit: string[];
  summary: string;
  slots: number;
};

export const athletes: Athlete[] = [
  {
    id: "maya-thompson",
    name: "Maya Thompson",
    initials: "MT",
    sport: "Basketball",
    position: "Guard",
    school: "Baltimore North Academy",
    city: "Baltimore",
    state: "MD",
    classYear: "2027",
    audience: "18.4K",
    engagement: "8.7%",
    momentum: "+31%",
    dealRange: "$350–$900",
    tags: ["Style", "Community", "Training"],
    bio: "Two-way guard building a following around workouts, game-day style, and youth clinics.",
    source: "Public school roster",
    sourceUrl: "https://www.varslink.com/",
    verified: true,
    guardianReady: true,
  },
  {
    id: "jordan-ellis",
    name: "Jordan Ellis",
    initials: "JE",
    sport: "Football",
    position: "Wide receiver",
    school: "Capital Prep",
    city: "Washington",
    state: "DC",
    classYear: "2026",
    audience: "27.1K",
    engagement: "7.9%",
    momentum: "+44%",
    dealRange: "$500–$1.4K",
    tags: ["Gaming", "Performance", "Food"],
    bio: "Explosive receiver whose film breakdowns and mic'd-up training clips consistently travel.",
    source: "Public recruiting profile",
    sourceUrl: "https://www.varslink.com/",
    verified: true,
    guardianReady: true,
  },
  {
    id: "sofia-reyes",
    name: "Sofia Reyes",
    initials: "SR",
    sport: "Soccer",
    position: "Forward",
    school: "Chesapeake United",
    city: "Annapolis",
    state: "MD",
    classYear: "2028",
    audience: "12.8K",
    engagement: "11.2%",
    momentum: "+52%",
    dealRange: "$250–$700",
    tags: ["Wellness", "Travel", "Latina creator"],
    bio: "High-motor forward creating bilingual match-day, recovery, and student-life content.",
    source: "Public club roster",
    sourceUrl: "https://www.varslink.com/",
    verified: true,
    guardianReady: true,
  },
  {
    id: "malik-brooks",
    name: "Malik Brooks",
    initials: "MB",
    sport: "Track & field",
    position: "Sprints",
    school: "Frederick Central",
    city: "Frederick",
    state: "MD",
    classYear: "2027",
    audience: "9.6K",
    engagement: "13.4%",
    momentum: "+61%",
    dealRange: "$200–$650",
    tags: ["Speed", "Sneakers", "Nutrition"],
    bio: "State-level sprinter turning technical speed work into short, high-retention video.",
    source: "Public meet results",
    sourceUrl: "https://www.varslink.com/",
    verified: true,
    guardianReady: true,
  },
  {
    id: "ava-chen",
    name: "Ava Chen",
    initials: "AC",
    sport: "Volleyball",
    position: "Outside hitter",
    school: "Northern Virginia Select",
    city: "Fairfax",
    state: "VA",
    classYear: "2026",
    audience: "22.3K",
    engagement: "9.1%",
    momentum: "+25%",
    dealRange: "$450–$1.1K",
    tags: ["Beauty", "Student life", "Fitness"],
    bio: "Club standout mixing tournament travel, student routines, and approachable fitness content.",
    source: "Public club profile",
    sourceUrl: "https://www.varslink.com/",
    verified: true,
    guardianReady: false,
  },
  {
    id: "noah-williams",
    name: "Noah Williams",
    initials: "NW",
    sport: "Baseball",
    position: "Shortstop",
    school: "Delaware Valley College",
    city: "Newark",
    state: "DE",
    classYear: "College",
    audience: "15.7K",
    engagement: "6.8%",
    momentum: "+19%",
    dealRange: "$300–$850",
    tags: ["Equipment", "Outdoors", "Local food"],
    bio: "College shortstop with a practical gear-review voice and a strong regional audience.",
    source: "Public college roster",
    sourceUrl: "https://www.varslink.com/",
    verified: true,
    guardianReady: true,
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "game-day-bites",
    title: "Game-day bites creator crew",
    brand: "Harbor Street Kitchen",
    category: "Restaurant",
    location: "Baltimore, MD",
    budget: "$3,500",
    format: "2 short videos + appearance",
    deadline: "Sep 12",
    fit: ["Football", "Basketball", "Local reach"],
    summary: "Build a four-athlete creator crew to launch a student game-day menu and opening-weekend event.",
    slots: 4,
  },
  {
    id: "recovery-routine",
    title: "The real recovery routine",
    brand: "Northline Wellness",
    category: "Health & wellness",
    location: "DMV region",
    budget: "$5,000",
    format: "3-video series",
    deadline: "Sep 18",
    fit: ["Track", "Soccer", "Wellness"],
    summary: "Show the overlooked recovery habits that keep student-athletes ready between school and competition.",
    slots: 6,
  },
  {
    id: "back-to-school-fit",
    title: "Back-to-school fit check",
    brand: "Common Thread",
    category: "Apparel",
    location: "National",
    budget: "$8,500",
    format: "UGC + social usage",
    deadline: "Sep 22",
    fit: ["Style", "Women’s sports", "Campus life"],
    summary: "A national creator wave built around authentic first-week looks, confidence, and team culture.",
    slots: 10,
  },
  {
    id: "speed-lab",
    title: "Speed lab pop-up",
    brand: "Volt Athletics",
    category: "Sporting goods",
    location: "Frederick, MD",
    budget: "$2,400",
    format: "Clinic + recap reel",
    deadline: "Oct 04",
    fit: ["Track", "Football", "Youth coaching"],
    summary: "Two local athletes host a Saturday speed clinic, then co-create the launch recap with the store.",
    slots: 2,
  },
];

export const operatingAgents = [
  { name: "Scout", role: "Finds rising athletes, businesses, and recruiting signals", metric: "312 profiles monitored", tone: "lime" },
  { name: "Matchmaker", role: "Ranks audience, location, values, format, and budget fit", metric: "84 matches scored", tone: "mint" },
  { name: "Deal Architect", role: "Turns a goal into scope, price, rights, and deliverables", metric: "11 briefs in motion", tone: "orange" },
  { name: "Compliance Sentinel", role: "Checks guardian, school, state, disclosure, and inducement gates", metric: "7 reviews due", tone: "blue" },
  { name: "Content Producer", role: "Builds concepts, shot lists, calendars, and approval queues", metric: "24 assets tracked", tone: "violet" },
  { name: "Settlement Ops", role: "Tracks signatures, completion, payment, and tax closeout", metric: "$18.6K scheduled", tone: "gold" },
  { name: "Growth Publisher", role: "Creates crawlable market, athlete, deal, and education pages", metric: "46 pages indexed", tone: "pink" },
] as const;

export const dealTypes = [
  "Sponsored social content",
  "Appearances and events",
  "UGC for brand channels",
  "Camps and coaching",
  "Affiliate and ambassador",
  "Merchandise and licensing",
] as const;

export function athleteById(id: string) {
  return athletes.find((athlete) => athlete.id === id);
}

export function opportunityById(id: string) {
  return opportunities.find((opportunity) => opportunity.id === id);
}
