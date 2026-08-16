"use client";

import React, { useState } from "react";
import { X, Code, Terminal, Cpu, Copy, Check } from "lucide-react";
import { soundSystem } from "@/lib/soundSystem";

interface AIInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptLogs?: {
    systemPrompt: string;
    userPrompt: string;
    rawResponse: string;
  };
  engineUsed?: string;
}

export const AIInspectorModal: React.FC<AIInspectorModalProps> = ({
  isOpen,
  onClose,
  promptLogs,
  engineUsed = "local-engine",
}) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"system" | "user" | "response">("response");

  if (!isOpen) return null;

  const copyContent = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    soundSystem.playClick();
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const sysText = promptLogs?.systemPrompt || "No system prompt log available yet.";
  const usrText = promptLogs?.userPrompt || "No user prompt log available yet.";
  const rawRes = promptLogs?.rawResponse || "No raw AI response payload available yet.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden font-mono text-xs">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                  AI ENGINE INSPECTOR
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-sans">
                  {engineUsed}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans font-normal">
                Inspect structured LLM prompts & JSON payloads driving this story state.
              </p>
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

        {/* Tab selection */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/60 font-sans">
          <button
            onClick={() => {
              soundSystem.playClick();
              setActiveTab("response");
            }}
            className={`flex-1 py-3 px-4 text-center border-b-2 font-medium transition flex items-center justify-center gap-2 ${
              activeTab === "response"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Code className="w-4 h-4" /> AI JSON Payload Output
          </button>
          <button
            onClick={() => {
              soundSystem.playClick();
              setActiveTab("user");
            }}
            className={`flex-1 py-3 px-4 text-center border-b-2 font-medium transition flex items-center justify-center gap-2 ${
              activeTab === "user"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Terminal className="w-4 h-4" /> User Choice & State Prompt
          </button>
          <button
            onClick={() => {
              soundSystem.playClick();
              setActiveTab("system");
            }}
            className={`flex-1 py-3 px-4 text-center border-b-2 font-medium transition flex items-center justify-center gap-2 ${
              activeTab === "system"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Cpu className="w-4 h-4" /> System Instructions
          </button>
        </div>

        {/* Tab content area */}
        <div className="p-4 overflow-y-auto flex-1 bg-black/50">
          {activeTab === "response" && (
            <div className="relative">
              <button
                onClick={() => copyContent(rawRes, "response")}
                className="absolute top-2 right-2 flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded border border-zinc-700 text-[10px] font-sans transition"
              >
                {copiedTab === "response" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedTab === "response" ? "Copied" : "Copy JSON"}
              </button>
              <pre className="text-emerald-400 whitespace-pre-wrap font-mono p-3 bg-zinc-950 rounded-xl border border-zinc-800 leading-relaxed overflow-x-auto">
                {rawRes}
              </pre>
            </div>
          )}

          {activeTab === "user" && (
            <div className="relative">
              <button
                onClick={() => copyContent(usrText, "user")}
                className="absolute top-2 right-2 flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded border border-zinc-700 text-[10px] font-sans transition"
              >
                {copiedTab === "user" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedTab === "user" ? "Copied" : "Copy Prompt"}
              </button>
              <pre className="text-zinc-200 whitespace-pre-wrap font-mono p-3 bg-zinc-950 rounded-xl border border-zinc-800 leading-relaxed">
                {usrText}
              </pre>
            </div>
          )}

          {activeTab === "system" && (
            <div className="relative">
              <button
                onClick={() => copyContent(sysText, "system")}
                className="absolute top-2 right-2 flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded border border-zinc-700 text-[10px] font-sans transition"
              >
                {copiedTab === "system" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedTab === "system" ? "Copied" : "Copy Instructions"}
              </button>
              <pre className="text-amber-300/90 whitespace-pre-wrap font-mono p-3 bg-zinc-950 rounded-xl border border-zinc-800 leading-relaxed">
                {sysText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
