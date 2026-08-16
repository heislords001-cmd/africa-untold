"use client";

import React, { useState } from "react";
import { GameState } from "@/game/storyTypes";
import { X, Search, Briefcase, History, Sparkles, AlertCircle } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";

interface CluesInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
}

export const CluesInventoryModal: React.FC<CluesInventoryModalProps> = ({ isOpen, onClose, gameState }) => {
  const [activeTab, setActiveTab] = useState<"clues" | "inventory" | "timeline">("clues");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-100 uppercase tracking-wide flex items-center gap-2">
                STORY VAULT & INVENTORY
              </h3>
              <p className="text-xs text-zinc-400">Track clues, item tools, and your decision choices timeline</p>
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

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/60">
          <button
            onClick={() => {
              soundSystem.playClick();
              setActiveTab("clues");
            }}
            className={`flex-1 py-3 text-center text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              activeTab === "clues"
                ? "border-b-2 border-amber-400 text-amber-400 bg-amber-950/20"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Search className="w-4 h-4" /> Clues ({gameState.clues.length})
          </button>
          <button
            onClick={() => {
              soundSystem.playClick();
              setActiveTab("inventory");
            }}
            className={`flex-1 py-3 text-center text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              activeTab === "inventory"
                ? "border-b-2 border-amber-400 text-amber-400 bg-amber-950/20"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Briefcase className="w-4 h-4" /> Items ({gameState.inventory.length})
          </button>
          <button
            onClick={() => {
              soundSystem.playClick();
              setActiveTab("timeline");
            }}
            className={`flex-1 py-3 text-center text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              activeTab === "timeline"
                ? "border-b-2 border-amber-400 text-amber-400 bg-amber-950/20"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <History className="w-4 h-4" /> Decision Log ({gameState.choicesHistory.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === "clues" && (
            <div>
              {gameState.clues.length === 0 ? (
                <div className="text-center py-10 text-zinc-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No clues discovered yet. Explore Lagos and make decisions to uncover secrets.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {gameState.clues.map((clue, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-950 border border-amber-500/20 shadow-md flex items-start gap-3"
                    >
                      <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-amber-200">{clue}</h4>
                        <p className="text-xs text-zinc-400 mt-1">Discovered during investigation.</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "inventory" && (
            <div>
              {gameState.inventory.length === 0 ? (
                <div className="text-center py-10 text-zinc-500">
                  <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Your inventory bag is currently empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {gameState.inventory.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3"
                    >
                      <Briefcase className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100">{item}</h4>
                        <p className="text-xs text-zinc-400 mt-1">Available tool in your bag.</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "timeline" && (
            <div>
              {gameState.choicesHistory.length === 0 ? (
                <div className="text-center py-10 text-zinc-500">
                  <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No decisions logged yet.</p>
                </div>
              ) : (
                <div className="space-y-3 relative pl-4 border-l-2 border-amber-500/30">
                  {gameState.choicesHistory.map((item, idx) => (
                    <div key={idx} className="relative bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                      <div className="absolute -left-[23px] top-4 w-3 h-3 rounded-full bg-amber-400 border-2 border-zinc-900" />
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold mb-1">
                        <span>CHAPTER {item.chapter}</span>
                        <span className="text-zinc-500">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-zinc-200 font-medium">"{item.choiceText}"</p>
                      {item.consequencesSummary && (
                        <p className="text-[11px] text-zinc-400 italic mt-1 bg-zinc-900 p-2 rounded">
                          {item.consequencesSummary}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
