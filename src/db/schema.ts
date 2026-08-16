import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";

export const gameSessions = pgTable("game_sessions", {
  id: text("id").primaryKey(),
  playerName: text("player_name").notNull(),
  background: text("background").notNull(),
  personality: text("personality").notNull(),
  strength: text("strength").notNull(),
  city: text("city").notNull().default("Lagos"),
  location: text("location").notNull(),
  chapter: integer("chapter").notNull().default(1),
  health: integer("health").notNull().default(100),
  money: integer("money").notNull().default(5000),
  reputation: integer("reputation").notNull().default(50),
  danger: integer("danger").notNull().default(10),
  clues: jsonb("clues").$type<string[]>().notNull().default([]),
  relationships: jsonb("relationships").$type<Record<string, number>>().notNull().default({}),
  inventory: jsonb("inventory").$type<string[]>().notNull().default([]),
  choicesHistory: jsonb("choices_history").$type<Array<{
    chapter: number;
    choiceText: string;
    consequences: string;
    timestamp: string;
  }>>().notNull().default([]),
  storyLogs: jsonb("story_logs").$type<Array<{
    chapter: number;
    title: string;
    narration: string;
    location: string;
    timestamp: string;
  }>>().notNull().default([]),
  currentObjective: text("current_objective"),
  endingReached: text("ending_reached"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const savedStories = pgTable("saved_stories", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  playerName: text("player_name").notNull(),
  background: text("background").notNull(),
  personality: text("personality").notNull(),
  city: text("city").notNull(),
  endingType: text("ending_type").notNull(),
  totalChoices: integer("total_choices").notNull(),
  reputation: integer("reputation").notNull(),
  cluesFound: integer("clues_found").notNull(),
  summary: text("summary").notNull(),
  storyHighlights: jsonb("story_highlights").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
