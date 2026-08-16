export type BackgroundType = 
  | "Student" 
  | "Developer" 
  | "Journalist" 
  | "Street Hustler" 
  | "Musician" 
  | "Photographer" 
  | "Detective" 
  | "Entrepreneur";

export type PersonalityType = 
  | "Brave" 
  | "Clever" 
  | "Charismatic" 
  | "Cautious" 
  | "Reckless";

export type StrengthType = 
  | "Intelligence" 
  | "Persuasion" 
  | "Street Smarts" 
  | "Observation" 
  | "Courage";

export type CityType = 
  | "Lagos" 
  | "Accra" 
  | "Nairobi" 
  | "Johannesburg" 
  | "Dakar" 
  | "Freetown" 
  | "Kampala" 
  | "Cairo";

export interface PlayerProfile {
  name: string;
  background: BackgroundType;
  personality: PersonalityType;
  strength: StrengthType;
  city: CityType;
  avatarSeed: string;
}

export type RiskLevel = "safe" | "low" | "medium" | "high" | "extreme";

export interface ChoiceOption {
  id: string;
  text: string;
  risk: RiskLevel;
  statReq?: StrengthType;
  riskDescription?: string;
  consequenceHint?: string;
}

export interface StateChanges {
  health?: number;
  money?: number;
  reputation?: number;
  danger?: number;
}

export interface NPCState {
  name: string;
  role: string;
  relationship: number; // -100 to 100
  status: "Ally" | "Wary" | "Hostile" | "Trusted" | "Mystery" | "Neutral";
  lastAction?: string;
  avatarUrl?: string;
}

export type SceneMood = "suspenseful" | "dangerous" | "investigative" | "mysterious" | "triumphant" | "chaotic" | "calm";

export interface SceneData {
  id: string;
  chapter: number;
  title: string;
  location: string;
  time: string;
  mood: SceneMood;
  narration: string;
  charactersPresent: NPCState[];
  choices: ChoiceOption[];
  stateChanges?: StateChanges;
  newClues?: string[];
  relationshipChanges?: Record<string, number>;
  newItems?: string[];
  nextObjective: string;
  imagePrompt?: string;
  aiPromptLogs?: {
    systemPrompt: string;
    userPrompt: string;
    rawResponse: string;
  };
}

export interface ChoiceHistoryItem {
  chapter: number;
  choiceId: string;
  choiceText: string;
  sceneTitle: string;
  consequencesSummary: string;
  timestamp: string;
}

export interface GameState {
  sessionId: string;
  player: PlayerProfile;
  currentChapter: number; // 1 to 5
  sceneCount: number;
  location: string;
  time: string;
  health: number; // 0 to 100
  money: number; // in NGN ₦
  reputation: number; // 0 to 100
  danger: number; // 0 to 100
  clues: string[];
  inventory: string[];
  relationships: Record<string, number>;
  npcDetails: Record<string, NPCState>;
  choicesHistory: ChoiceHistoryItem[];
  storyLogs: Array<{
    chapter: number;
    title: string;
    narration: string;
    location: string;
    timestamp: string;
  }>;
  currentObjective: string;
  currentScene: SceneData | null;
  isGameOver: boolean;
  endingType: EndingType | null;
  endingSummary?: string;
  isDemoMode?: boolean;
}

export type EndingType = 
  | "The Hero" 
  | "The Survivor" 
  | "The Betrayal" 
  | "The Truth" 
  | "The Lost Path";

export interface EndingDefinition {
  type: EndingType;
  title: string;
  subtitle: string;
  badgeColor: string;
  description: string;
  requirementsSummary: string;
}

export interface SlangTerm {
  term: string;
  definition: string;
  example: string;
}
