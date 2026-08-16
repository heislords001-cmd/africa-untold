"use client";

import React, { useState } from "react";
import { GameState } from "@/game/storyTypes";
import { ENDINGS_CATALOG } from "@/game/endings";
import { Award, RotateCcw, Share2, Sparkles, CheckCircle2, Shield, Heart, DollarSign, History, Search, BookmarkCheck } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";

interface EndingScreenProps {
  gameState: GameState;
  onRestartGame: () => void;
  onOpenVault: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({ gameState, onRestartGame, onOpenVault }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const endingType = gameState.endingType || "The Hero";
  const endingDef = ENDINGS_CATALOG[endingType] || ENDINGS_CATALOG["The Hero"];

  const handleSaveToVault = async () => {
    soundSystem.playClick();
    setIsSaving(true);
    try {
      await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${gameState.player.name}'s ${endingType} Tale`,
          playerName: gameState.player.name,
          background: gameState.player.background,
          personality: gameState.player.personality,
          city: gameState.player.city,
          endingType,
          totalChoices: gameState.choicesHistory.length,
          reputation: gameState.reputation,
          cluesFound: gameState.clues.length,
          summary: endingDef.description,
          storyHighlights: gameState.choicesHistory.map((c) => c.choiceText),
        }),
      });
      setIsSaved(true);
      soundSystem.playClueDiscovered();
    } catch {
      // ignore
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareCard = () => {
    soundSystem.playClick();
    const text = `I just finished AFRICA: UNTOLD as ${gameState.player.name} (${gameState.player.background}) and unlocked ending: "${endingDef.title}"! #AfricaUntold #CANEX2026`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100 flex flex-col p-4 sm:p-8 font-sans selection:bg-amber-500 selection:text-black">
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-slate-950 to-black pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto space-y-8 py-8">
        {/* Top Ending Badge Card */}
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            STORY RESOLUTION
          </div>

          <div className="space-y-2">
            <span className={`inline-block px-4 py-1.5 rounded-full font-extrabold text-xs uppercase tracking-wider border shadow-lg ${endingDef.badgeColor}`}>
              {endingDef.type}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-amber-100 uppercase tracking-tight font-sans">
              {endingDef.title}
            </h1>
            <p className="text-lg font-bold text-amber-400/90 italic font-serif">
              "{endingDef.subtitle}"
            </p>
          </div>

          <p className="text-zinc-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800/80">
            {endingDef.description}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800 text-left">
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <div className="text-[10px] uppercase font-mono text-zinc-400 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Reputation
              </div>
              <div className="text-lg font-black text-amber-300 mt-1">{gameState.reputation}/100</div>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <div className="text-[10px] uppercase font-mono text-zinc-400 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-amber-400" /> Clues Found
              </div>
              <div className="text-lg font-black text-amber-300 mt-1">{gameState.clues.length} Collected</div>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <div className="text-[10px] uppercase font-mono text-zinc-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Final Cash
              </div>
              <div className="text-lg font-black text-emerald-400 mt-1">₦{gameState.money.toLocaleString()} NGN</div>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <div className="text-[10px] uppercase font-mono text-zinc-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-400" /> Health
              </div>
              <div className="text-lg font-black text-red-400 mt-1">{gameState.health}% Remaining</div>
            </div>
          </div>
        </div>

        {/* Choice Timeline Summary */}
        <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" /> YOUR DECISION TRAIL SUMMARY
          </h3>
          <div className="space-y-3">
            {gameState.choicesHistory.map((item, idx) => (
              <div key={idx} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-300">CHAPTER {item.chapter}</div>
                  <div className="text-zinc-200 mt-0.5">"{item.choiceText}"</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "AI IS THE GAME" Banner & Actions */}
        <div className="p-6 bg-zinc-950 border border-amber-500/30 rounded-2xl text-center space-y-4 shadow-xl">
          <div className="text-xs font-mono uppercase text-amber-400 tracking-widest font-bold">
            YOUR STORY WAS UNIQUE
          </div>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto">
            Another player starting as a Journalist or Street Hustler would experience completely different dialogue, options, and consequences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onRestartGame}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              CREATE A DIFFERENT STORY
            </button>

            <button
              onClick={handleSaveToVault}
              disabled={isSaving || isSaved}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold border transition flex items-center justify-center gap-2 ${
                isSaved
                  ? "bg-emerald-950 border-emerald-500/50 text-emerald-300"
                  : "bg-zinc-900 border-amber-500/40 text-amber-300 hover:bg-zinc-800"
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              {isSaved ? "SAVED TO VAULT!" : isSaving ? "SAVING..." : "SAVE TO VAULT"}
            </button>

            <button
              onClick={handleShareCard}
              className="w-full sm:w-auto bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-zinc-800 transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              {copiedShare ? "COPIED CARD!" : "SHARE STORY CARD"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
