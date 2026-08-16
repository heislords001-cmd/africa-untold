import { EndingDefinition, EndingType } from "./storyTypes";

export const ENDINGS_CATALOG: Record<EndingType, EndingDefinition> = {
  "The Hero": {
    type: "The Hero",
    title: "THE HERO OF LAGOS",
    subtitle: "You exposed Chief Bode, secured the grid, and protected your allies.",
    badgeColor: "bg-amber-500 text-black border-amber-300",
    description: "Through courage, sharp intellect, and unwavering trust in Tobi and Amaka, you brought down Chief Bode's dangerous surveillance plot. Millions of citizens in Lagos remain free from digital tyranny.",
    requirementsSummary: "High Reputation (>60), High NPC Trust, Solved the Mystery.",
  },
  "The Survivor": {
    type: "The Survivor",
    title: "THE SURVIVOR",
    subtitle: "You escaped with your life, but the shadows remained untouched.",
    badgeColor: "bg-blue-500 text-white border-blue-300",
    description: "When the heat rose at Lekki Phase 1, you chose self-preservation. You boarded a flight out of Murtala Muhammed International with cash in hand, leaving the full truth buried deep in Yaba.",
    requirementsSummary: "Escaped high danger without uncovering full evidence.",
  },
  "The Betrayal": {
    type: "The Betrayal",
    title: "THE BETRAYAL",
    subtitle: "You placed your faith in the wrong shadow.",
    badgeColor: "bg-red-600 text-white border-red-400",
    description: "You trusted an operative who was secretly on Chief Bode's payroll. The encrypted drive was wiped, your evidence destroyed, and you barely made it out of Eko Atlantic.",
    requirementsSummary: "High relationship with a double agent or critical bad choice.",
  },
  "The Truth": {
    type: "The Truth",
    title: "THE DEEPER TRUTH",
    subtitle: "You uncovered a conspiracy bigger than Lagos itself.",
    badgeColor: "bg-emerald-500 text-black border-emerald-300",
    description: "You bypassed surface-level villains and decrypted the global syndicate file. The conspiracy connects Lagos, London, and Johannesburg. Your report reshapes African cybersecurity forever.",
    requirementsSummary: "Collected 4+ Clues, High Intelligence/Observation, Chapter 5 Mastery.",
  },
  "The Lost Path": {
    type: "The Lost Path",
    title: "THE LOST PATH",
    subtitle: "Distracted by side hustles, you lost the original objective.",
    badgeColor: "bg-zinc-600 text-zinc-200 border-zinc-400",
    description: "In the chaos of Balogun market and local squabbles, you lost track of Tobi's warning. The system collapsed before you could piece together the final server key.",
    requirementsSummary: "High Danger / Low Clues / Straying from main objectives.",
  },
};
