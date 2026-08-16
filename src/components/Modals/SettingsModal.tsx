"use client";

import React, { useState, useEffect } from "react";
import { X, Key, Volume2, VolumeX, ShieldAlert, Check, Sparkles } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";
import { getCustomApiKey, saveCustomApiKey } from "@/lib/storage";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDemoMode,
  onToggleDemoMode,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKeyInput(getCustomApiKey());
      setIsMuted(soundSystem.getMuted());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    saveCustomApiKey(apiKeyInput);
    soundSystem.playClick();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleToggleSound = () => {
    const muted = soundSystem.toggleMute();
    setIsMuted(muted);
    soundSystem.playClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-100 flex items-center gap-2">
              GAME SETTINGS & AI ENGINE <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
          </div>
          <button
            onClick={() => {
              soundSystem.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-6">
          {/* Custom API Key input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              CUSTOM LLM API KEY (GEMINI / OPENAI / GROQ)
            </label>
            <p className="text-xs text-zinc-400">
              Optional: Enter your key to use your own LLM model. If blank, our server-side engine / dynamic story matrix powers the narrative seamlessly!
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-... or AIzaSy..."
                className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-zinc-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition"
              />
              <button
                onClick={handleSaveKey}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                {savedSuccess ? <Check className="w-4 h-4 text-emerald-900" /> : null}
                {savedSuccess ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* Sound Mute Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div>
              <div className="text-xs font-bold text-zinc-200">Audio & Sound FX</div>
              <div className="text-[11px] text-zinc-400">Synthesized UI clicks and decision feedback sounds</div>
            </div>
            <button
              onClick={handleToggleSound}
              className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition ${
                isMuted
                  ? "bg-zinc-800 border-zinc-700 text-zinc-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {isMuted ? "Muted" : "Audio On"}
            </button>
          </div>

          {/* Demo Mode Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <div>
              <div className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> Demo Mode Fast-Track
              </div>
              <div className="text-[11px] text-zinc-400">Skip character setup & launch directly into high-stakes Yaba plot</div>
            </div>
            <button
              onClick={() => {
                soundSystem.playClick();
                onToggleDemoMode();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                isDemoMode
                  ? "bg-amber-500 text-black border-amber-400"
                  : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-600"
              }`}
            >
              {isDemoMode ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
