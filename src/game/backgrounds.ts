import { BackgroundType, PersonalityType, StrengthType } from "./storyTypes";

export interface BackgroundDetail {
  id: BackgroundType;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  bonusStat: StrengthType;
  startingMoney: number;
  startingItem: string;
  specialPerk: string;
  color: string;
}

export const BACKGROUNDS: BackgroundDetail[] = [
  {
    id: "Developer",
    title: "Software Developer",
    tagline: "Code, terminal, dark coffee, encrypted keys",
    description: "You build systems by day and inspect open-source vulnerabilities by night in Yaba. You read raw data like poetry.",
    iconName: "Code2",
    bonusStat: "Intelligence",
    startingMoney: 12000,
    startingItem: "Encrypted Decryption Key",
    specialPerk: "Can bypass tech security locks and analyze code signatures.",
    color: "from-blue-600 to-indigo-900",
  },
  {
    id: "Journalist",
    title: "Investigative Journalist",
    tagline: "Uncovering truth behind power and oil",
    description: "You've written expose articles on government contractors and tech monopolies. Your press badge opens locked doors.",
    iconName: "Newspaper",
    bonusStat: "Observation",
    startingMoney: 8500,
    startingItem: "Press Credentials & Audio Recorder",
    specialPerk: "Notices micro-expressions and uncovers hidden clues easily.",
    color: "from-amber-600 to-red-900",
  },
  {
    id: "Street Hustler",
    title: "Street Hustler",
    tagline: "Lagos survivor who knows every corner",
    description: "You know every Danfo route, every Agbero chief, and how to get anything done in Balogun or Computer Village before sunrise.",
    iconName: "Zap",
    bonusStat: "Street Smarts",
    startingMoney: 4500,
    startingItem: "Lagos Street Network Map & Pocket Blade",
    specialPerk: "Avoids police traps and gains street trust instantly.",
    color: "from-emerald-600 to-teal-900",
  },
  {
    id: "Detective",
    title: "Private Detective",
    tagline: "Ex-police operative with sharp eyes",
    description: "Disciplined, cautious, and methodical. You retired from the force to pursue corporate sabotage cases.",
    iconName: "ShieldAlert",
    bonusStat: "Courage",
    startingMoney: 9500,
    startingItem: "Tactical Flashlight & Police Ledger",
    specialPerk: "Predicts physical threats and handles high-danger choices.",
    color: "from-slate-600 to-slate-900",
  },
  {
    id: "Entrepreneur",
    title: "Tech Entrepreneur",
    tagline: "Pitch decks, venture capital, big ambition",
    description: "You've pitched in Lekki and raised funding in London. You understand contracts, financial motives, and power plays.",
    iconName: "Briefcase",
    bonusStat: "Persuasion",
    startingMoney: 25000,
    startingItem: "VIP Lekki Penthouse Keycard",
    specialPerk: "Can bribe or negotiate deals with elites effortlessly.",
    color: "from-yellow-500 to-amber-800",
  },
  {
    id: "Musician",
    title: "Afrobeat Musician",
    tagline: "Stage charisma, night clubs, cultural icon",
    description: "Your music plays in clubs from Ikoyi to London. People open up to you over drinks because everyone loves your rhythm.",
    iconName: "Music",
    bonusStat: "Persuasion",
    startingMoney: 15000,
    startingItem: "VIP Nightclub Pass & Backstage Key",
    specialPerk: "Charisma charms NPCs into revealing secret information.",
    color: "from-purple-600 to-pink-900",
  },
  {
    id: "Photographer",
    title: "Visual Photographer",
    tagline: "Capturing the raw truth through the lens",
    description: "Your telephoto camera sees through smoke screens. You document street protests, high society, and shadowy exchanges.",
    iconName: "Camera",
    bonusStat: "Observation",
    startingMoney: 7000,
    startingItem: "Telephoto Camera & Night-Vision Lens",
    specialPerk: "Captures photographic evidence without alerting targets.",
    color: "from-cyan-600 to-blue-900",
  },
  {
    id: "Student",
    title: "University Student",
    tagline: "Underestimated, fast learner, passionate",
    description: "Studying Computer Science at Unilag while hacking together side hustles. Quick on your feet and eager to make a mark.",
    iconName: "GraduationCap",
    bonusStat: "Intelligence",
    startingMoney: 3000,
    startingItem: "Unilag Student ID & Custom USB Drive",
    specialPerk: "Low profile allows you to slip under heavy security radar.",
    color: "from-green-600 to-emerald-900",
  },
];

export const PERSONALITIES: { id: PersonalityType; label: string; description: string; statBonus: string }[] = [
  { id: "Brave", label: "Brave", description: "Takes bold actions directly when danger strikes.", statBonus: "+15 Courage" },
  { id: "Clever", label: "Clever", description: "Outsmarts obstacles with creative logic.", statBonus: "+15 Intelligence" },
  { id: "Charismatic", label: "Charismatic", description: "Wins hearts, smooths conflict, earns trust.", statBonus: "+15 Persuasion" },
  { id: "Cautious", label: "Cautious", description: "Notices hidden traps and minimizes health loss.", statBonus: "+15 Observation" },
  { id: "Reckless", label: "Reckless", description: "High risk, high reward style with sudden maneuvers.", statBonus: "+15 Street Smarts" },
];

export const STRENGTHS: { id: StrengthType; label: string; description: string }[] = [
  { id: "Intelligence", label: "Intelligence", description: "Decrypting codes, analyzing financial trails, hacking terminals." },
  { id: "Persuasion", label: "Persuasion", description: "Convincing allies, talking down hostiles, bluffing security." },
  { id: "Street Smarts", label: "Street Smarts", description: "Navigating Lagos alleys, spotting traps, handling Agberos." },
  { id: "Observation", label: "Observation", description: "Uncovering hidden envelopes, reading body language, picking locks." },
  { id: "Courage", label: "Courage", description: "Standing your ground in ambushes, taking physical risks." },
];
