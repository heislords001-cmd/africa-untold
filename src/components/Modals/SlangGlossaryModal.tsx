"use client";

import React from "react";
import { SLANG_GLOSSARY } from "@/game/locations";
import { X, BookOpen, Sparkles } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";

interface SlangGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightTerm?: string;
}

export const SlangGlossaryModal: React.FC<SlangGlossaryModalProps> = ({ isOpen, onClose, highlightTerm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-100 flex items-center gap-2">
                LAGOS DICTIONARY & SLANG <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-zinc-400">Authentic Nigerian Pidgin & street terms used in AFRICA: UNTOLD</p>
            </div>
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

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4">
          {SLANG_GLOSSARY.map((item) => {
            const isHighlighted = highlightTerm && item.term.toLowerCase() === highlightTerm.toLowerCase();
            return (
              <div
                key={item.term}
                className={`p-4 rounded-xl border transition ${
                  isHighlighted
                    ? "bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-500/10"
                    : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base font-bold text-amber-400 tracking-wide">{item.term}</span>
                  {isHighlighted && (
                    <span className="text-[10px] uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-semibold">
                      Referenced
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-200 mb-2 font-medium">{item.definition}</p>
                <div className="text-xs text-zinc-400 italic bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/80">
                  "{item.example}"
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
