"use client";

import React, { useState } from "react";
import { GameState, ChoiceOption, RiskLevel } from "@/game/storyTypes";
import { SLANG_GLOSSARY } from "@/game/locations";
import { 
  Heart, DollarSign, Shield, ShieldAlert, Cpu, Sparkles, Navigation, Clock, 
  Search, Users, BookOpen, Volume2, VolumeX, Terminal, ArrowRight, UserCheck 
} from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";

interface GameplayScreenProps {
  gameState: GameState;
  onMakeChoice: (choice: ChoiceOption) => void;
  onOpenAIInspector: () => void;
  onOpenInventory: () => void;
  onOpenSlang: (term?: string) => void;
  onOpenSettings: () => void;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  gameState,
  onMakeChoice,
  onOpenAIInspector,
  onOpenInventory,
  onOpenSlang,
  onOpenSettings,
}) => {
  const [hoveredChoice, setHoveredChoice] = useState<ChoiceOption | null>(null);
  const scene = gameState.currentScene;

  if (!scene) return null;

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case "safe":
        return <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-mono uppercase">SAFE</span>;
      case "low":
        return <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/40 px-2 py-0.5 rounded font-mono uppercase">LOW RISK</span>;
      case "medium":
        return <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded font-mono uppercase">MED RISK</span>;
      case "high":
        return <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/40 px-2 py-0.5 rounded font-mono uppercase">HIGH RISK</span>;
      case "extreme":
        return <span className="text-[10px] bg-red-600/30 text-red-400 border border-red-500/50 px-2 py-0.5 rounded font-mono uppercase font-bold animate-pulse">EXTREME RISK</span>;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "suspenseful": return "from-amber-950/40 via-zinc-950 to-black border-amber-500/30";
      case "dangerous": return "from-red-950/40 via-zinc-950 to-black border-red-500/30";
      case "investigative": return "from-blue-950/40 via-zinc-950 to-black border-blue-500/30";
      case "triumphant": return "from-emerald-950/40 via-zinc-950 to-black border-emerald-500/30";
      default: return "from-zinc-900 via-zinc-950 to-black border-zinc-800";
    }
  };

  const renderNarrationWithSlangTooltips = (text: string) => {
    let parts: Array<{ text: string; slangTerm?: string }> = [{ text }];

    SLANG_GLOSSARY.forEach((slang) => {
      const newParts: Array<{ text: string; slangTerm?: string }> = [];
      parts.forEach((part) => {
        if (part.slangTerm) {
          newParts.push(part);
          return;
        }
        const regex = new RegExp(`\\b(${slang.term})\\b`, "gi");
        const split = part.text.split(regex);
        split.forEach((sub, i) => {
          if (sub.toLowerCase() === slang.term.toLowerCase()) {
            newParts.push({ text: sub, slangTerm: slang.term });
          } else if (sub) {
            newParts.push({ text: sub });
          }
        });
      });
      parts = newParts;
    });

    return parts.map((p, idx) => {
      if (p.slangTerm) {
        return (
          <button
            key={idx}
            onClick={() => {
              soundSystem.playClick();
              onOpenSlang(p.slangTerm);
            }}
            className="inline-flex items-center text-amber-300 font-bold bg-amber-500/10 hover:bg-amber-500/20 border-b border-dashed border-amber-400 px-1 py-0.5 rounded transition cursor-pointer mx-0.5"
            title={`Click for slang definition: ${p.slangTerm}`}
          >
            {p.text}
          </button>
        );
      }
      return <span key={idx}>{p.text}</span>;
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* HUD Bar Top */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur-md px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Location & Time & Chapter */}
          <div className="flex items-center gap-3 font-mono">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
              <Navigation className="w-3.5 h-3.5" />
              <span>{scene.location}</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{scene.time}</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded-lg font-bold text-amber-300">
              CHAPTER {scene.chapter}/5
            </div>
          </div>

          {/* Center: Health, Money, Danger, Reputation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5" title="Health">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <div className="w-16 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-300" 
                  style={{ width: `${gameState.health}%` }} 
                />
              </div>
              <span className="font-mono text-zinc-300 text-[11px] font-bold">{gameState.health}%</span>
            </div>

            <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold" title="Money">
              <DollarSign className="w-3.5 h-3.5" />
              <span>₦{gameState.money.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1.5" title="Danger Level">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              <div className="w-16 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className="h-full bg-orange-500 transition-all duration-300" 
                  style={{ width: `${gameState.danger}%` }} 
                />
              </div>
              <span className="font-mono text-zinc-300 text-[11px] font-bold">{gameState.danger}%</span>
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-mono font-bold" title="Reputation">
              <Shield className="w-3.5 h-3.5" />
              <span>Rep: {gameState.reputation}</span>
            </div>
          </div>

          {/* Right: Quick Action Triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundSystem.playClick();
                onOpenInventory();
              }}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-zinc-300 hover:text-amber-400 transition flex items-center gap-1 text-xs font-semibold"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Clues ({gameState.clues.length})</span>
            </button>

            <button
              onClick={() => {
                soundSystem.playClick();
                onOpenAIInspector();
              }}
              className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 transition flex items-center gap-1 text-xs font-mono font-bold"
              title="Inspect AI prompt & raw JSON response"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Engine</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto w-full flex-1 p-4 sm:p-6 space-y-6">
        {/* Scene Banner Illustration Card */}
        <div className={`rounded-3xl border bg-gradient-to-b ${getMoodColor(scene.mood)} p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{scene.title}</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase bg-zinc-950/60 border border-zinc-800 px-2.5 py-1 rounded-full">
              MOOD: {scene.mood}
            </span>
          </div>

          {/* Narration Text Box */}
          <div className="text-zinc-200 text-base sm:text-lg md:text-xl font-serif leading-relaxed whitespace-pre-line space-y-3">
            {renderNarrationWithSlangTooltips(scene.narration)}
          </div>

          {/* Objective Banner */}
          {scene.nextObjective && (
            <div className="p-3 bg-zinc-950/80 border border-amber-500/20 rounded-xl text-xs flex items-center gap-2 text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>OBJECTIVE:</strong> {scene.nextObjective}</span>
            </div>
          )}
        </div>

        {/* Present NPCs Panel */}
        {scene.charactersPresent && scene.charactersPresent.length > 0 && (
          <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" /> CHARACTERS PRESENT ON SCENE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {scene.charactersPresent.map((npc, idx) => (
                <div key={idx} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-zinc-100">{npc.name}</div>
                    <div className="text-[10px] text-zinc-400">{npc.role}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                      {npc.status}
                    </span>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Trust: {npc.relationship}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Choice Buttons Section */}
        <div className="bg-zinc-900/90 border border-amber-500/30 p-6 rounded-3xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" /> YOUR DECISION shapes what happens next
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              {scene.choices.length} CHOICES AVAILABLE
            </div>
          </div>

          <div className="space-y-3">
            {scene.choices.map((choice) => (
              <button
                key={choice.id}
                onMouseEnter={() => setHoveredChoice(choice)}
                onMouseLeave={() => setHoveredChoice(null)}
                onClick={() => {
                  soundSystem.playChoiceSubmit();
                  onMakeChoice(choice);
                }}
                className="w-full text-left p-4 sm:p-5 rounded-2xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-400/80 transition-all duration-200 group flex items-center justify-between gap-4 shadow-md"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    {getRiskBadge(choice.risk)}
                    {choice.statReq && (
                      <span className="text-[10px] bg-zinc-800 text-amber-300 border border-zinc-700 px-2 py-0.5 rounded font-mono">
                        [{choice.statReq} CHECK]
                      </span>
                    )}
                  </div>
                  <div className="text-sm sm:text-base font-medium text-zinc-100 group-hover:text-amber-200 transition">
                    {choice.text}
                  </div>
                  {choice.consequenceHint && (
                    <div className="text-[11px] text-zinc-500 group-hover:text-zinc-400 italic">
                      💡 {choice.consequenceHint}
                    </div>
                  )}
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:bg-amber-500 group-hover:border-amber-400 text-zinc-400 group-hover:text-slate-950 transition shrink-0">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
