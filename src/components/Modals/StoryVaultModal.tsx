"use client";

import React, { useEffect, useState } from "react";
import { X, Award, Shield, User, Globe, Sparkles, RefreshCw } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";

interface SavedStory {
  id: string;
  title: string;
  playerName: string;
  background: string;
  personality: string;
  city: string;
  endingType: string;
  totalChoices: number;
  reputation: number;
  cluesFound: number;
  summary: string;
  createdAt: string;
}

interface StoryVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryVaultModal: React.FC<StoryVaultModalProps> = ({ isOpen, onClose }) => {
  const [stories, setStories] = useState<SavedStory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setStories(data.stories || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-100 flex items-center gap-2">
                AFRICA: UNTOLD — COMMUNITY VAULT <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-zinc-400">Read unique story conclusions authored by players across Africa</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundSystem.playClick();
                fetchStories();
              }}
              className="p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition"
              title="Refresh stories"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
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
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {loading && stories.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">Loading saved story archives...</div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <Globe className="w-10 h-8 mx-auto mb-2 opacity-40 text-amber-400" />
              <p className="text-sm font-medium">No community stories published yet.</p>
              <p className="text-xs text-zinc-500 mt-1">Be the first to complete a journey through Lagos!</p>
            </div>
          ) : (
            stories.map((s) => (
              <div
                key={s.id}
                className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-amber-500/40 transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    {s.endingType}
                  </span>
                  <span className="text-[11px] text-zinc-500">{new Date(s.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="text-base font-bold text-zinc-100">{s.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed italic">"{s.summary}"</p>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-400 pt-2 border-t border-zinc-900 font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" /> {s.playerName} ({s.background})
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" /> Rep: {s.reputation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-blue-400" /> {s.city}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
