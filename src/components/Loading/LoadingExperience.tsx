"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ShieldAlert, Cpu } from "lucide-react";

interface LoadingExperienceProps {
  lastChoiceText?: string;
  location?: string;
}

const ATMOSPHERIC_TEXTS = [
  "THE WORLD RESPONDS...",
  "THE STORY IS RESPONDING...",
  "YOUR CHOICE HAS CONSEQUENCES...",
  "COMPOSING CONFLICT IN YABA...",
  "EVALUATING TOBI'S REACTION...",
  "THE SHADOWS OF LAGOS MOVE...",
  "DECRYPTING SERVER LOGS...",
  "CALCULATING DANGER METRICS...",
];

export const LoadingExperience: React.FC<LoadingExperienceProps> = ({ lastChoiceText, location }) => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ATMOSPHERIC_TEXTS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg p-6 animate-in fade-in duration-300">
      {/* Visual pulse glow center */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full bg-amber-500/20 blur-2xl animate-ping" />
        <div className="absolute w-24 h-24 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
        <div className="relative p-5 rounded-2xl bg-zinc-900 border border-amber-500/40 text-amber-400 shadow-2xl shadow-amber-500/10">
          <Cpu className="w-10 h-10 animate-pulse text-amber-400" />
        </div>
      </div>

      {/* Main atmospheric status */}
      <div className="text-center max-w-lg space-y-3">
        <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
          <span>AFRICA: UNTOLD NARRATIVE ENGINE</span>
        </div>

        <h2 className="text-xl md:text-2xl font-black text-amber-100 tracking-wider font-sans transition-all duration-300 min-h-[3rem] flex items-center justify-center">
          {ATMOSPHERIC_TEXTS[textIndex]}
        </h2>

        {lastChoiceText && (
          <div className="p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-zinc-300 italic max-w-md mx-auto">
            <span className="text-amber-400 font-semibold not-italic block mb-0.5">YOUR DECISION:</span>
            "{lastChoiceText}"
          </div>
        )}

        {location && (
          <div className="text-[11px] text-zinc-500 uppercase tracking-widest font-mono pt-2">
            LOCATION: {location}
          </div>
        )}
      </div>

      {/* Bottom glowing bar */}
      <div className="absolute bottom-10 w-48 h-1 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 animate-pulse w-full" />
      </div>
    </div>
  );
};
