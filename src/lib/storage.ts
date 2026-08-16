import { GameState } from "@/game/storyTypes";
import { INITIAL_NPCS } from "@/game/npcs";

const STORAGE_KEY = "africa_untold_game_state_v1";
const CUSTOM_KEY_STORAGE = "africa_untold_custom_ai_key";

export function loadSavedGameState(): GameState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch (err) {
    console.error("Failed to load saved game state:", err);
    return null;
  }
}

export function saveGameState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save game state:", err);
  }
}

export function clearSavedGameState(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear game state:", err);
  }
}

export function getCustomApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(CUSTOM_KEY_STORAGE) || "";
}

export function saveCustomApiKey(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOM_KEY_STORAGE, key.trim());
}

export function createInitialState(
  playerName: string,
  background: any,
  personality: any,
  strength: any,
  city: any,
  isDemoMode: boolean = false
): GameState {
  const sessionId = "session_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
  
  const startingMoney = isDemoMode ? 10000 : (background === "Entrepreneur" ? 25000 : background === "Musician" ? 15000 : 8000);
  const startingClues = isDemoMode ? ["Tobi's Encrypted SOS Signal", "Lagos Cyber-Grid Log"] : ["Tobi's Encrypted SOS Signal"];
  const startingInventory = [background === "Developer" ? "Encrypted Decryption Key" : "Press Credentials"];

  return {
    sessionId,
    player: {
      name: playerName || (isDemoMode ? "Adebayo" : "Traveler"),
      background: background || "Developer",
      personality: personality || "Clever",
      strength: strength || "Intelligence",
      city: city || "Lagos",
      avatarSeed: (playerName || "Lagos") + Math.random(),
    },
    currentChapter: 1,
    sceneCount: 1,
    location: "Yaba Innovation District",
    time: "11:47 PM",
    health: 100,
    money: startingMoney,
    reputation: 50,
    danger: 10,
    clues: startingClues,
    inventory: startingInventory,
    relationships: {
      Tobi: 50,
      Amaka: 35,
      "Chief Bode": -20,
      "Corporal Danjuma": 10,
      Blessing: 40,
    },
    npcDetails: JSON.parse(JSON.stringify(INITIAL_NPCS)),
    choicesHistory: [],
    storyLogs: [],
    currentObjective: "Investigate Tobi's SOS warning and uncover Chief Bode's target.",
    currentScene: null,
    isGameOver: false,
    endingType: null,
    isDemoMode,
  };
}
