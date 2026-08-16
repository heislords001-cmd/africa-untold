import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { savedStories } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const stories = await db.select().from(savedStories).orderBy(desc(savedStories.createdAt)).limit(20);
    return NextResponse.json({ stories });
  } catch (err: any) {
    console.error("Failed to fetch saved stories:", err);
    return NextResponse.json({ stories: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, playerName, background, personality, city, endingType, totalChoices, reputation, cluesFound, summary, storyHighlights } = body;

    const newId = "story_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();

    const [inserted] = await db.insert(savedStories).values({
      id: newId,
      title: title || "A Story of Lagos",
      playerName: playerName || "Traveler",
      background: background || "Developer",
      personality: personality || "Clever",
      city: city || "Lagos",
      endingType: endingType || "The Hero",
      totalChoices: totalChoices || 5,
      reputation: reputation || 50,
      cluesFound: cluesFound || 2,
      summary: summary || "An unforgettable journey through the streets of Lagos.",
      storyHighlights: storyHighlights || [],
    }).returning();

    return NextResponse.json({ success: true, story: inserted });
  } catch (err: any) {
    console.error("Failed to save story:", err);
    return NextResponse.json({ error: err.message || "Failed to save story" }, { status: 500 });
  }
}
