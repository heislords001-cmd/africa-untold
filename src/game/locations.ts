import { CityType, SlangTerm } from "./storyTypes";

export interface LocationDetail {
  id: string;
  name: string;
  district: string;
  description: string;
  vibe: string;
  iconName: string;
  bgGradient: string;
}

export interface CityData {
  id: CityType;
  name: string;
  country: string;
  tagline: string;
  description: string;
  isAvailable: boolean;
  locations: LocationDetail[];
}

export const CITIES_DATA: CityData[] = [
  {
    id: "Lagos",
    name: "Lagos",
    country: "Nigeria",
    tagline: "The Center of Excellence & Cyber Hustle",
    description: "A megacity of 20+ million souls where high-tech innovation collides with neon nightlife, street markets, oil barons, and relentless ambition.",
    isAvailable: true,
    locations: [
      {
        id: "yaba_tech_hub",
        name: "Yaba Innovation District",
        district: "Yaba, Lagos Mainland",
        description: "Silicon Lagoon: Glass co-working spaces, glowing fiber optic cables, midnight coders, and street vendors selling suya outside.",
        vibe: "High-tech, energetic, cautious curiosity",
        iconName: "Cpu",
        bgGradient: "from-amber-900/80 via-zinc-900 to-slate-950",
      },
      {
        id: "balogun_market",
        name: "Balogun Market",
        district: "Lagos Island",
        description: "A labyrinth of thousands of vibrant cloth merchants, electronic hawkers, hidden alleys, and watchful eyes.",
        vibe: "Chaotic, bustling, sensory overload",
        iconName: "ShoppingBag",
        bgGradient: "from-yellow-900/80 via-zinc-900 to-neutral-950",
      },
      {
        id: "third_mainland",
        name: "Third Mainland Bridge",
        district: "Over Lagos Lagoon",
        description: "11.8 kilometers of concrete highway suspended over dark waters under the midnight drizzle, flanked by yellow Danfo buses.",
        vibe: "Tense, vast, isolated speed",
        iconName: "Navigation",
        bgGradient: "from-blue-950/90 via-zinc-900 to-black",
      },
      {
        id: "lekki_penthouse",
        name: "Lekki Phase 1 Penthouse",
        district: "Lekki Peninsula",
        description: "Ultra-modern glass compound with infinity pool overlooking the Atlantic, frequented by tech moguls and politicians.",
        vibe: "Luxurious, secretive, high stakes",
        iconName: "Building2",
        bgGradient: "from-amber-800/60 via-zinc-900 to-zinc-950",
      },
      {
        id: "bogobiri_lounge",
        name: "Bogobiri Art Lounge",
        district: "Ikoyi",
        description: "Rustic Afro-bohemian sanctuary filled with carved wooden masks, live Afrobeat saxophones, and hushed political whispers.",
        vibe: "Atmospheric, intellectual, covert",
        iconName: "Music",
        bgGradient: "from-emerald-950/80 via-zinc-900 to-black",
      },
      {
        id: "ikeja_computer_village",
        name: "Ikeja Computer Village",
        district: "Ikeja",
        description: "West Africa's largest tech hub: rows of gadget repairers, encrypted drive brokers, and street hawkers.",
        vibe: "Resourceful, noisy, sharp-eyed",
        iconName: "Smartphone",
        bgGradient: "from-orange-950/80 via-zinc-900 to-slate-950",
      },
      {
        id: "eko_atlantic",
        name: "Eko Atlantic City",
        district: "Victoria Island",
        description: "A futuristic reclaimed city rising from the ocean, guarded by private drone networks and corporate security.",
        vibe: "Futuristic, intimidating, elite",
        iconName: "Globe",
        bgGradient: "from-cyan-950/80 via-zinc-900 to-black",
      },
    ],
  },
  {
    id: "Accra",
    name: "Accra",
    country: "Ghana",
    tagline: "The Gateway of Freedom & Gold Coast Tech",
    description: "Vibrant coastal hub of arts, Pan-African entrepreneurship, and historical secrets.",
    isAvailable: false,
    locations: [],
  },
  {
    id: "Nairobi",
    name: "Nairobi",
    country: "Kenya",
    tagline: "Silicon Savannah & High-Altitude Intrigue",
    description: "A roaring tech metropolis nestled next to wilderness, powered by mobile money innovations.",
    isAvailable: false,
    locations: [],
  },
  {
    id: "Johannesburg",
    name: "Johannesburg",
    country: "South Africa",
    tagline: "The City of Gold & Underground Hustle",
    description: "Soaring skyline, rich gold mining heritage, and high-octane cyber finance networks.",
    isAvailable: false,
    locations: [],
  },
  {
    id: "Dakar",
    name: "Dakar",
    country: "Senegal",
    tagline: "Teranga & Oceanfront Renaissance",
    description: "Surfing, haute fashion, Francophone hip-hop culture, and Atlantic maritime espionage.",
    isAvailable: false,
    locations: [],
  },
  {
    id: "Freetown",
    name: "Freetown",
    country: "Sierra Leone",
    tagline: "Coastal Beauty & Diamond Echoes",
    description: "Sprawling hillside views, emerald oceans, and historic trade routes.",
    isAvailable: false,
    locations: [],
  },
  {
    id: "Kampala",
    name: "Kampala",
    country: "Uganda",
    tagline: "Seven Hills of Rhythm & Nightlife",
    description: "Energetic boda-boda streets, Lake Victoria breezes, and grassroots tech movements.",
    isAvailable: false,
    locations: [],
  },
  {
    id: "Cairo",
    name: "Cairo",
    country: "Egypt",
    tagline: "Nile Vanguard & Ancient Modernity",
    description: "Where thousand-year-old minarets tower above modern AI tech incubators.",
    isAvailable: false,
    locations: [],
  },
];

export const SLANG_GLOSSARY: SlangTerm[] = [
  { term: "Danfo", definition: "Iconic yellow Volkswagen commercial bus in Lagos.", example: "We hopped into a speeding Danfo towards Yaba." },
  { term: "Keke", definition: "Three-wheeled motorized tricycle cab (Keke Napep).", example: "The Keke dodged traffic with razor precision." },
  { term: "Soro Soke", definition: "Yoruba phrase meaning 'Speak up clearly/loudly', popularized by youth movements.", example: "Soro Soke, tell me who sent the envelope!" },
  { term: "Suya", definition: "Spicy grilled meat skewers, sold late at night with sliced onions.", example: "We discussed the deal over hot suya at Bogobiri." },
  { term: "Agbero", definition: "Street transport collector or local hood supervisor.", example: "The Agbero watched us from the corner with narrow eyes." },
  { term: "Sharp-sharp", definition: "Doing something immediately or quickly.", example: "We need to clear out of Computer Village sharp-sharp!" },
  { term: "Jagaban", definition: "An influential leader, boss, or kingmaker.", example: "Chief Bode acts like the Jagaban of Lagos power grid." },
  { term: "Chop Life", definition: "To enjoy life to the fullest despite chaos.", example: "He's spending stolen millions in Lekki, chopping life." },
  { term: "Abeg", definition: "Please / I beg you in Nigerian Pidgin.", example: "Abeg, don't unlock that server until we test the firewall." },
  { term: "Omo", definition: "Exclamation of surprise, shock, or heavy emphasis.", example: "Omo, this conspiracy goes higher than we imagined!" },
];
