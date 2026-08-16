"use client";

import React from "react";
import { Sparkles, Play, ShieldAlert, BookOpen, Volume2, VolumeX, Settings, Globe, Award, ChevronRight } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";
import { CITIES_DATA } from "@/game/locations";

interface LandingPageProps {
  onStartGame: () => void;
  onStartDemo: () => void;
  onOpenVault: () => void;
  onOpenSettings: () => void;
  onOpenSlang: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartGame,
  onStartDemo,
  onOpenVault,
  onOpenSettings,
  onOpenSlang,
}) => {
  const [isMuted, setIsMuted] = React.useState(soundSystem.getMuted());
  const [isAmbientOn, setIsAmbientOn] = React.useState(false);

  const handleToggleMute = () => {
    const muted = soundSystem.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleAmbient = () => {
    const ambientState = soundSystem.toggleAmbientMusic();
    setIsAmbientOn(ambientState);
    soundSystem.playClick();
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-zinc-100 flex flex-col justify-between overflow-hidden font-sans selection:bg-amber-500 selection:text-black">
      {/* Background cinematic visuals & lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-slate-950 to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid texture overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
      />

      {/* Top Navbar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full border-b border-zinc-800/60 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-xs font-black tracking-widest text-amber-400 uppercase font-mono">
            CANEX CREATE-THON 2026 EDITION
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleAmbient}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
              isAmbientOn
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10"
                : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
            title="Toggle synthesized atmospheric ambient drone"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAmbientOn ? "animate-spin text-amber-400" : ""}`} />
            {isAmbientOn ? "Ambient Music On" : "Music Off"}
          </button>

          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-amber-400 transition"
            title="Toggle sound effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={() => {
              soundSystem.playClick();
              onOpenSlang();
            }}
            className="p-2 rounded-xl bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-amber-400 transition flex items-center gap-1.5 text-xs font-semibold"
            title="Lagos Slang Dictionary"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Slang</span>
          </button>

          <button
            onClick={() => {
              soundSystem.playClick();
              onOpenSettings();
            }}
            className="p-2 rounded-xl bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-amber-400 transition"
            title="Settings & AI Key"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          AI-POWERED INTERACTIVE STORY ENGINE
        </div>

        {/* Cinematic Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-2xl font-sans mb-4">
          AFRICA: UNTOLD
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-bold text-amber-400/90 tracking-wide font-serif mb-6 italic">
          Every choice writes your story.
        </p>

        {/* Description */}
        <p className="text-zinc-300 max-w-2xl text-base sm:text-lg font-normal leading-relaxed mb-10 text-balance">
          Step into a living African thriller where artificial intelligence generates characters, dialogue, high-stakes consequences, and distinct multi-path endings based on your decisions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12">
          <button
            onClick={() => {
              soundSystem.playClick();
              onStartGame();
            }}
            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-8 py-4 rounded-2xl text-base tracking-wider uppercase shadow-xl shadow-amber-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 group"
          >
            <Play className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition" />
            BEGIN YOUR STORY
          </button>

          <button
            onClick={() => {
              soundSystem.playClick();
              onStartDemo();
            }}
            className="w-full sm:w-auto flex-1 bg-zinc-900/90 hover:bg-zinc-800 text-amber-300 border border-amber-500/40 font-bold px-6 py-4 rounded-2xl text-sm tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-lg"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            DEMO MODE (3-MIN)
          </button>
        </div>

        {/* Community Story Vault Button */}
        <button
          onClick={() => {
            soundSystem.playClick();
            onOpenVault();
          }}
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-amber-400 font-semibold tracking-wider uppercase transition group border-b border-dashed border-zinc-700 hover:border-amber-400 pb-0.5 mb-12"
        >
          <Award className="w-4 h-4 text-amber-400" />
          EXPLORE COMMUNITY STORY VAULT
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
        </button>

        {/* Supported African Cities Grid */}
        <div className="w-full max-w-4xl border-t border-zinc-800/80 pt-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-4">
            EXPANDING AFRICAN METROPOLIS ARCHITECTURE
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {CITIES_DATA.map((city) => (
              <div
                key={city.id}
                className={`p-2.5 rounded-xl border text-center transition ${
                  city.isAvailable
                    ? "bg-amber-950/40 border-amber-500/50 text-amber-300 font-bold shadow-md"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-600"
                }`}
              >
                <div className="text-xs">{city.name}</div>
                <div className="text-[9px] uppercase font-mono text-zinc-400 mt-0.5">
                  {city.isAvailable ? "ACTIVE MVP" : "SOON"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 border-t border-zinc-800/60 bg-slate-950/60 text-center text-xs text-zinc-400">
        CANEX Create-Thon 2026 Submission • Powered by AI Story Engine • Lagos, Nigeria
      </footer>
    </div>
  );
};
