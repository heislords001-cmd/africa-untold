"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Navigation, Shield, Zap } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";
import { PlayerProfile } from "@/game/storyTypes";

interface WorldIntroScreenProps {
  player: PlayerProfile;
  onEnterGameplay: () => void;
}

export const WorldIntroScreen: React.FC<WorldIntroScreenProps> = ({ player, onEnterGameplay }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinishedTyping, setIsFinishedTyping] = useState(false);

  const fullText = `LAGOS, NIGERIA — 11:47 PM.\n\nThe city isn't sleeping. Neither are you.\n\nFrom the neon-lit tech incubators of Yaba to the damp alleys of Balogun Market and the high-rise penthouses of Lekki, twenty million lives cross paths under the tropical rain.\n\nTonight, ${player.name}, a message arrived on an encrypted line. A secret that could ignite the surveillance grid of West Africa. Every decision you make from this moment on writes your story.`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsFinishedTyping(true);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleSkipOrProceed = () => {
    soundSystem.playClick();
    onEnterGameplay();
  };

  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-black">
      {/* Background imagery visual overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-zinc-950 to-black pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between max-w-4xl mx-auto w-full border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 tracking-widest">
          <Navigation className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>LOCATION: LAGOS, NIGERIA</span>
        </div>
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
          CHAPTER 1 INTRO
        </div>
      </div>

      {/* Main Cinematic Text */}
      <div className="relative z-10 max-w-3xl mx-auto w-full my-auto py-10 space-y-8">
        <div className="p-8 rounded-3xl bg-zinc-950/80 border border-amber-500/30 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                PROLOGUE • {player.background.toUpperCase()}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-100 uppercase tracking-tight">
                THE MIDNIGHT CALL
              </h2>
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-serif leading-relaxed whitespace-pre-line tracking-wide">
            {displayedText}
            {!isFinishedTyping && <span className="inline-block w-2 h-5 bg-amber-400 ml-1 animate-ping" />}
          </p>
        </div>
      </div>

      {/* Footer Proceed Button */}
      <div className="relative z-10 max-w-3xl mx-auto w-full flex items-center justify-between pt-4 border-t border-zinc-800/80">
        <div className="text-xs text-zinc-400 font-mono">
          PROFILE: {player.name} ({player.personality} {player.strength})
        </div>

        <button
          onClick={handleSkipOrProceed}
          className="bg-amber-500 hover:bg-amber-400 text-black font-black px-8 py-3.5 rounded-2xl text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 group"
        >
          {isFinishedTyping ? "BEGIN CHAPTER 1" : "SKIP TO GAMEPLAY"}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
};
