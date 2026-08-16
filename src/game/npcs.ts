import { NPCState } from "./storyTypes";

export const INITIAL_NPCS: Record<string, NPCState> = {
  Tobi: {
    name: "Tobi Adebayo",
    role: "Yaba Tech Hacker & Whistleblower",
    relationship: 50,
    status: "Ally",
    lastAction: "Sent you an urgent encrypted voice note at 11:40 PM.",
  },
  Amaka: {
    name: "Amaka Eze",
    role: "Undercover Financial Reporter",
    relationship: 35,
    status: "Neutral",
    lastAction: "Investigating Chief Bode's offshore tech accounts.",
  },
  "Chief Bode": {
    name: "Chief Bode Lawson",
    role: "Billionaire Oil & Tech Monopoly Tycoon",
    relationship: -20,
    status: "Hostile",
    lastAction: "Deploying private security operatives across Lagos Island.",
  },
  "Corporal Danjuma": {
    name: "Corporal Danjuma",
    role: "Streetwise Police Officer",
    relationship: 10,
    status: "Mystery",
    lastAction: "Patrolling Third Mainland Bridge; open to the right incentive.",
  },
  Blessing: {
    name: "Blessing 'Mama Balogun'",
    role: "Balogun Market Information Broker",
    relationship: 40,
    status: "Wary",
    lastAction: "Knows who delivered the mysterious red envelope.",
  },
};
