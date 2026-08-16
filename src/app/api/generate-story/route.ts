import { NextRequest, NextResponse } from "next/server";
import { GameState, SceneData } from "@/game/storyTypes";
import { processFallbackChoice, calculateEndingType } from "@/game/storyEngine";
import { ENDINGS_CATALOG } from "@/game/endings";

export const maxDuration = 30; // 30 seconds limit

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { state, choiceId, userChoiceText, customApiKey } = body as {
      state: GameState;
      choiceId: string;
      userChoiceText: string;
      customApiKey?: string;
    };

    if (!state) {
      return NextResponse.json({ error: "Missing game state" }, { status: 400 });
    }

    const apiKey = customApiKey || 
      process.env.GEMINI_API_KEY || 
      process.env.OPENAI_API_KEY || 
      process.env.GROQ_API_KEY || 
      process.env.ANTHROPIC_API_KEY || 
      process.env.OPENROUTER_API_KEY || 
      "";

    // If Chapter >= 5 or if we reach completion, output ending
    if (state.currentChapter >= 5 && choiceId === "final_ending") {
      const endingType = calculateEndingType(state);
      const endingDef = ENDINGS_CATALOG[endingType];
      return NextResponse.json({
        scene: {
          id: "ch5_ending",
          chapter: 5,
          title: `CHAPTER 5: THE RESOLUTION — ${endingDef.title}`,
          location: "Eko Atlantic Horizon",
          time: "06:00 AM",
          mood: "triumphant",
          narration: `${endingDef.description}\n\nYour choices as a ${state.player.personality} ${state.player.background} shaped the destiny of Lagos. Tobi, Amaka, and the people of Lagos will remember what transpired during these midnight hours.`,
          charactersPresent: [
            { name: "Tobi Adebayo", role: "Tech Hacker", relationship: state.relationships["Tobi"] || 70, status: "Trusted" },
            { name: "Amaka Eze", role: "Journalist", relationship: state.relationships["Amaka"] || 60, status: "Trusted" },
          ],
          choices: [],
          stateChanges: { health: 0, money: 10000, danger: 0, reputation: 25 },
          newClues: ["Final Resolution Summary"],
          nextObjective: "Story Complete.",
        },
        engineUsed: "local-engine",
      });
    }

    // Attempt AI Generation if API key is present
    if (apiKey) {
      try {
        const aiResponse = await generateAiStoryScene(apiKey, state, choiceId, userChoiceText);
        if (aiResponse) {
          return NextResponse.json({
            scene: aiResponse.scene,
            promptLogs: aiResponse.promptLogs,
            engineUsed: aiResponse.engineName,
          });
        }
      } catch (aiErr) {
        console.warn("AI generation error, falling back to local story engine:", aiErr);
      }
    }

    // Fallback to local story engine if no API key or AI call fails
    const fallbackScene = processFallbackChoice(state, choiceId, userChoiceText);
    return NextResponse.json({
      scene: fallbackScene,
      promptLogs: {
        systemPrompt: "Local Procedural Story Engine (AFRICA: UNTOLD Dynamic Matrix)",
        userPrompt: `Choice made: "${userChoiceText}" in Chapter ${state.currentChapter}.`,
        rawResponse: JSON.stringify(fallbackScene, null, 2),
      },
      engineUsed: apiKey ? "local-engine (fallback after key error)" : "local-engine (smart matrix)",
    });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

async function generateAiStoryScene(
  apiKey: string,
  state: GameState,
  choiceId: string,
  userChoiceText: string
): Promise<{ scene: SceneData; promptLogs: any; engineName: string } | null> {
  const isGemini = apiKey.startsWith("AIza") || process.env.GEMINI_API_KEY;
  const isOpenAI = apiKey.startsWith("sk-") || process.env.OPENAI_API_KEY;
  const isGroq = apiKey.startsWith("gsk_") || process.env.GROQ_API_KEY;

  const nextChapter = Math.min(5, state.currentChapter + 1);

  const systemPrompt = `You are the core AI Narrative Engine for "AFRICA: UNTOLD", an interactive text story game set in modern Lagos, Nigeria.
The AI is not an assistant; the AI is the game engine.
You generate structured JSON data only representing the next story scene, consequences, stat shifts, and new choices.

CRITICAL RULES FOR AFRICAN IDENTITY & STYLE:
1. Ground the story in authentic modern Lagos: Yaba tech startups, Balogun Market hustle, Danfo buses, Keke cabs, Lekki luxury, Suya vendors, Third Mainland Bridge rain.
2. Use Nigerian names (Tobi, Amaka, Chief Bode, Blessing, Danjuma) and natural Pidgin slang where appropriate (Soro Soke, Abeg, Sharp-sharp, Agbero, Omo, Chop life).
3. Do NOT make generic fantasy or western cliches. Show modern Africa: high technology, ambition, music, corruption, resilience, night vibes.
4. Every choice must have consequences that change player health, money, danger level, reputation, or NPC relationships.
5. Provide 2 to 4 distinct, meaningful choices. Format each choice with risk levels ('safe', 'low', 'medium', 'high', 'extreme') and required character stat if applicable.

Return ONLY valid JSON with this exact schema:
{
  "chapter": ${nextChapter},
  "title": "CHAPTER ${nextChapter}: [SCENE TITLE]",
  "location": "[SPECIFIC LAGOS LOCATION]",
  "time": "[e.g. 02:30 AM]",
  "mood": "suspenseful" | "dangerous" | "investigative" | "mysterious" | "triumphant" | "chaotic" | "calm",
  "narration": "[2-3 paragraphs of vivid narrative reacting to choice: '${userChoiceText}']",
  "charactersPresent": [
    { "name": "[NPC Name]", "role": "[NPC Role]", "relationship": number (-100 to 100), "status": "Ally" | "Wary" | "Hostile" | "Trusted" | "Mystery" }
  ],
  "choices": [
    { "id": "ch${nextChapter}_c1", "text": "[Choice action]", "risk": "low" | "medium" | "high" | "extreme" | "safe", "statReq": "Intelligence" | "Persuasion" | "Street Smarts" | "Observation" | "Courage", "riskDescription": "[Brief risk info]", "consequenceHint": "[Hint]" }
  ],
  "stateChanges": { "health": number, "money": number, "danger": number, "reputation": number },
  "newClues": ["string clue name if found"],
  "relationshipChanges": { "[NPC Name]": number },
  "nextObjective": "[Clear next goal for the player]"
}`;

  const userPrompt = `PLAYER PROFILE:
- Name: ${state.player.name}
- Background: ${state.player.background}
- Personality: ${state.player.personality}
- Primary Strength: ${state.player.strength}

CURRENT GAME STATE:
- Chapter: ${state.currentChapter}
- Current Location: ${state.location}
- Health: ${state.health}/100
- Money: ₦${state.money} NGN
- Reputation: ${state.reputation}/100
- Danger Level: ${state.danger}/100
- Clues Found: ${JSON.stringify(state.clues)}
- NPC Relationships: ${JSON.stringify(state.relationships)}

PLAYER'S LATEST CHOICE:
"${userChoiceText}" (Choice ID: ${choiceId})

Generate Chapter ${nextChapter} scene responding dynamically to this choice!`;

  let jsonText = "";
  let engineName = "AI LLM";

  // Check which API endpoint to call
  if (isGemini) {
    engineName = "Google Gemini Engine";
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
        ],
        generationConfig: { responseMimeType: "application/json" }
      })
    });
    const data = await res.json();
    jsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } else if (isGroq) {
    engineName = "Groq Llama-3 Engine";
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      })
    });
    const data = await res.json();
    jsonText = data?.choices?.[0]?.message?.content || "";
  } else {
    engineName = "OpenAI GPT Engine";
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      })
    });
    const data = await res.json();
    jsonText = data?.choices?.[0]?.message?.content || "";
  }

  if (!jsonText) return null;

  // Clean raw JSON response if markdown code fences exist
  const cleanedJson = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();
  const parsed = JSON.parse(cleanedJson);

  const scene: SceneData = {
    id: `ch${parsed.chapter || nextChapter}_${Date.now()}`,
    chapter: parsed.chapter || nextChapter,
    title: parsed.title || `CHAPTER ${nextChapter}: THE RESPONSE`,
    location: parsed.location || state.location,
    time: parsed.time || "02:00 AM",
    mood: parsed.mood || "suspenseful",
    narration: parsed.narration || "The narrative continues...",
    charactersPresent: parsed.charactersPresent || [],
    choices: parsed.choices || [],
    stateChanges: parsed.stateChanges || {},
    newClues: parsed.newClues || [],
    relationshipChanges: parsed.relationshipChanges || {},
    nextObjective: parsed.nextObjective || "Investigate further.",
  };

  return {
    scene,
    promptLogs: {
      systemPrompt,
      userPrompt,
      rawResponse: jsonText,
    },
    engineName,
  };
}
