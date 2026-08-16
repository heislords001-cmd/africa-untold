"use client";

import React, { useState } from "react";
import { BACKGROUNDS, PERSONALITIES, STRENGTHS } from "@/game/backgrounds";
import { BackgroundType, PersonalityType, StrengthType } from "@/game/storyTypes";
import { ArrowRight, User, Shield, Sparkles, Code2, Newspaper, Zap, ShieldAlert, Briefcase, Music, Camera, GraduationCap } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";

interface CharacterCreationScreenProps {
  onConfirmCharacter: (
    name: string,
    background: BackgroundType,
    personality: PersonalityType,
    strength: StrengthType
  ) => void;
  onBack: () => void;
}

export const CharacterCreationScreen: React.FC<CharacterCreationScreenProps> = ({
  onConfirmCharacter,
  onBack,
}) => {
  const [name, setName] = useState("");
  const [selectedBg, setSelectedBg] = useState<BackgroundType>("Developer");
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityType>("Clever");
  const [selectedStrength, setSelectedStrength] = useState<StrengthType>("Intelligence");

  const bgDetail = BACKGROUNDS.find((b) => b.id === selectedBg) || BACKGROUNDS[0];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2": return <Code2 className="w-5 h-5 text-amber-400" />;
      case "Newspaper": return <Newspaper className="w-5 h-5 text-amber-400" />;
      case "Zap": return <Zap className="w-5 h-5 text-amber-400" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case "Briefcase": return <Briefcase className="w-5 h-5 text-amber-400" />;
      case "Music": return <Music className="w-5 h-5 text-amber-400" />;
      case "Camera": return <Camera className="w-5 h-5 text-amber-400" />;
      case "GraduationCap": return <GraduationCap className="w-5 h-5 text-amber-400" />;
      default: return <User className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleStart = () => {
    soundSystem.playClick();
    onConfirmCharacter(
      name.trim() || "Adebayo",
      selectedBg,
      selectedPersonality,
      selectedStrength
    );
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-zinc-100 flex flex-col p-4 sm:p-8 font-sans selection:bg-amber-500 selection:text-black">
      {/* Background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-slate-950 to-black pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 tracking-widest">
              CHARACTER CREATION
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-amber-100 uppercase tracking-tight">
              WHO ARE YOU?
            </h1>
          </div>
          <button
            onClick={() => {
              soundSystem.playClick();
              onBack();
            }}
            className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 border border-zinc-800 rounded-xl px-4 py-2 hover:bg-zinc-900 transition"
          >
            ← Back Menu
          </button>
        </div>

        {/* Form Body - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          {/* Left Column - Options */}
          <div className="lg:col-span-7 space-y-6">
            {/* Name Input */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                1. CHARACTER NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your character's name (e.g. Adebayo, Kemi, Farouk)..."
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 text-zinc-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition font-medium"
              />
            </div>

            {/* Background Picker */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                2. BACKGROUND / ARCHETYPE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      soundSystem.playClick();
                      setSelectedBg(bg.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      selectedBg === bg.id
                        ? "bg-amber-950/60 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10"
                        : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      {renderIcon(bg.iconName)}
                    </div>
                    <div className="text-xs font-bold">{bg.title}</div>
                    <div className="text-[10px] text-zinc-500 mt-1">₦{bg.startingMoney.toLocaleString()} NGN</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personality Picker */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                3. PERSONALITY DISPOSITION
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PERSONALITIES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      soundSystem.playClick();
                      setSelectedPersonality(p.id);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      selectedPersonality === p.id
                        ? "bg-amber-500 text-slate-950 font-bold border-amber-400"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div className="text-xs">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Strength Picker */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                4. STARTING PRIMARY STRENGTH
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {STRENGTHS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      soundSystem.playClick();
                      setSelectedStrength(s.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition ${
                      selectedStrength === s.id
                        ? "bg-amber-950/60 border-amber-400 text-amber-200 shadow-md"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-300">{s.label}</div>
                    <div className="text-[10px] text-zinc-400 mt-1 line-clamp-2">{s.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Live Character Card Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                    DOSSIER PREVIEW
                  </span>
                  <h3 className="text-2xl font-black text-zinc-100">
                    {name.trim() || "Adebayo"}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  {renderIcon(bgDetail.iconName)}
                </div>
              </div>

              {/* Archetype & Perks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Background:</span>
                  <span className="font-bold text-amber-300">{bgDetail.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Personality:</span>
                  <span className="font-bold text-amber-300">{selectedPersonality}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Primary Strength:</span>
                  <span className="font-bold text-emerald-400">{selectedStrength}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Starting Capital:</span>
                  <span className="font-bold text-amber-400">₦{bgDetail.startingMoney.toLocaleString()} NGN</span>
                </div>
              </div>

              {/* Special Perk */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-amber-500/20 text-xs">
                <div className="text-amber-400 font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> SPECIAL PERK:
                </div>
                <p className="text-zinc-300 italic">{bgDetail.specialPerk}</p>
              </div>

              {/* Starting Item */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs">
                <div className="text-zinc-400 font-semibold mb-1">STARTING ITEM IN BAG:</div>
                <div className="text-zinc-100 font-bold">{bgDetail.startingItem}</div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleStart}
              className="mt-6 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-4 rounded-2xl text-base tracking-wider uppercase shadow-xl shadow-amber-500/20 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 group"
            >
              ENTER LAGOS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
