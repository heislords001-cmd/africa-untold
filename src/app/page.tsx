"use client";

import React, { useState, useEffect } from "react";
import { LandingPage } from "@/components/Landing/LandingPage";
import { CharacterCreationScreen } from "@/components/CharacterCreation/CharacterCreationScreen";
import { WorldIntroScreen } from "@/components/WorldIntro/WorldIntroScreen";
import { GameplayScreen } from "@/components/Game/GameplayScreen";
import { EndingScreen } from "@/components/Ending/EndingScreen";
import { LoadingExperience } from "@/components/Loading/LoadingExperience";
import { AIInspectorModal } from "@/components/Modals/AIInspectorModal";
import { CluesInventoryModal } from "@/components/Modals/CluesInventoryModal";
import { SlangGlossaryModal } from "@/components/Modals/SlangGlossaryModal";
import { StoryVaultModal } from "@/components/Modals/StoryVaultModal";
import { SettingsModal } from "@/components/Modals/SettingsModal";

import { GameState, ChoiceOption, BackgroundType, PersonalityType, StrengthType } from "@/game/storyTypes";
import { createInitialState, loadSavedGameState, saveGameState, getCustomApiKey } from "@/lib/storage";
import { generateInitialScene } from "@/game/storyEngine";
import { soundSystem } from "@/lib/soundSystem";

type ScreenStep = "landing" | "character_creation" | "world_intro" | "gameplay" | "ending";

export default function Home() {
  const [screen, setScreen] = useState<ScreenStep>("landing");
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [lastChoiceText, setLastChoiceText] = useState("");

  // Modals state
  const [isAiInspectorOpen, setIsAiInspectorOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isSlangOpen, setIsSlangOpen] = useState(false);
  const [slangHighlight, setSlangHighlight] = useState<string | undefined>(undefined);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadSavedGameState();
    if (saved) {
      setGameState(saved);
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (gameState) {
      saveGameState(gameState);
    }
  }, [gameState]);

  // Handlers
  const handleStartGame = () => {
    setScreen("character_creation");
  };

  const handleConfirmCharacter = (
    name: string,
    background: BackgroundType,
    personality: PersonalityType,
    strength: StrengthType
  ) => {
    const initialState = createInitialState(name, background, personality, strength, "Lagos", false);
    const scene1 = generateInitialScene(initialState);
    initialState.currentScene = scene1;
    initialState.storyLogs.push({
      chapter: 1,
      title: scene1.title,
      narration: scene1.narration,
      location: scene1.location,
      timestamp: new Date().toLocaleTimeString(),
    });

    setGameState(initialState);
    setScreen("world_intro");
  };

  const handleStartDemo = () => {
    setIsDemoMode(true);
    const demoState = createInitialState("Adebayo", "Developer", "Clever", "Intelligence", "Lagos", true);
    const scene1 = generateInitialScene(demoState);
    demoState.currentScene = scene1;
    demoState.storyLogs.push({
      chapter: 1,
      title: scene1.title,
      narration: scene1.narration,
      location: scene1.location,
      timestamp: new Date().toLocaleTimeString(),
    });

    setGameState(demoState);
    setScreen("gameplay");
    soundSystem.playClueDiscovered();
  };

  const handleEnterGameplay = () => {
    setScreen("gameplay");
  };

  const handleMakeChoice = async (choice: ChoiceOption) => {
    if (!gameState) return;

    setLastChoiceText(choice.text);
    setIsLoadingAi(true);

    const customApiKey = getCustomApiKey();

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: gameState,
          choiceId: choice.id,
          userChoiceText: choice.text,
          customApiKey,
        }),
      });

      const data = await response.json();

      if (data.scene) {
        const nextScene = data.scene;

        // Calculate stat changes
        const healthChange = nextScene.stateChanges?.health || 0;
        const moneyChange = nextScene.stateChanges?.money || 0;
        const dangerChange = nextScene.stateChanges?.danger || 0;
        const repChange = nextScene.stateChanges?.reputation || 0;

        const newHealth = Math.max(0, Math.min(100, gameState.health + healthChange));
        const newMoney = Math.max(0, gameState.money + moneyChange);
        const newDanger = Math.max(0, Math.min(100, gameState.danger + dangerChange));
        const newReputation = Math.max(0, Math.min(100, gameState.reputation + repChange));

        // Update clues
        const newCluesSet = Array.from(new Set([...gameState.clues, ...(nextScene.newClues || [])]));

        // Update relationships
        const updatedRelationships = { ...gameState.relationships };
        if (nextScene.relationshipChanges) {
          Object.entries(nextScene.relationshipChanges).forEach(([npc, change]) => {
            updatedRelationships[npc] = Math.max(-100, Math.min(100, (updatedRelationships[npc] || 0) + (change as number)));
          });
        }

        // Choice history
        const newChoiceHistory = [
          ...gameState.choicesHistory,
          {
            chapter: gameState.currentChapter,
            choiceId: choice.id,
            choiceText: choice.text,
            sceneTitle: nextScene.title,
            consequencesSummary: `Health: ${healthChange >= 0 ? "+" : ""}${healthChange}, Money: ₦${moneyChange}, Danger: ${dangerChange >= 0 ? "+" : ""}${dangerChange}`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ];

        // Is Ending?
        const isEnding = nextScene.chapter >= 5 && nextScene.choices.length === 0;

        const updatedState: GameState = {
          ...gameState,
          currentChapter: nextScene.chapter,
          sceneCount: gameState.sceneCount + 1,
          location: nextScene.location,
          time: nextScene.time,
          health: newHealth,
          money: newMoney,
          danger: newDanger,
          reputation: newReputation,
          clues: newCluesSet,
          relationships: updatedRelationships,
          choicesHistory: newChoiceHistory,
          currentObjective: nextScene.nextObjective,
          currentScene: {
            ...nextScene,
            aiPromptLogs: data.promptLogs,
          },
          isGameOver: isEnding,
          endingType: isEnding ? (nextScene.title.includes("HERO") ? "The Hero" : nextScene.title.includes("TRUTH") ? "The Truth" : "The Survivor") : null,
        };

        setGameState(updatedState);

        if (isEnding) {
          setScreen("ending");
          soundSystem.playClueDiscovered();
        } else {
          soundSystem.playChoiceSubmit();
        }
      }
    } catch (err) {
      console.error("Choice error:", err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleRestartGame = () => {
    soundSystem.playClick();
    setGameState(null);
    setScreen("character_creation");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-zinc-100 font-sans">
      {/* Loading Overlay */}
      {isLoadingAi && (
        <LoadingExperience
          lastChoiceText={lastChoiceText}
          location={gameState?.location}
        />
      )}

      {/* Screen Router */}
      {screen === "landing" && (
        <LandingPage
          onStartGame={handleStartGame}
          onStartDemo={handleStartDemo}
          onOpenVault={() => setIsVaultOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenSlang={() => {
            setSlangHighlight(undefined);
            setIsSlangOpen(true);
          }}
        />
      )}

      {screen === "character_creation" && (
        <CharacterCreationScreen
          onConfirmCharacter={handleConfirmCharacter}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === "world_intro" && gameState && (
        <WorldIntroScreen
          player={gameState.player}
          onEnterGameplay={handleEnterGameplay}
        />
      )}

      {screen === "gameplay" && gameState && (
        <GameplayScreen
          gameState={gameState}
          onMakeChoice={handleMakeChoice}
          onOpenAIInspector={() => setIsAiInspectorOpen(true)}
          onOpenInventory={() => setIsInventoryOpen(true)}
          onOpenSlang={(term) => {
            setSlangHighlight(term);
            setIsSlangOpen(true);
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {screen === "ending" && gameState && (
        <EndingScreen
          gameState={gameState}
          onRestartGame={handleRestartGame}
          onOpenVault={() => setIsVaultOpen(true)}
        />
      )}

      {/* Modals */}
      <AIInspectorModal
        isOpen={isAiInspectorOpen}
        onClose={() => setIsAiInspectorOpen(false)}
        promptLogs={gameState?.currentScene?.aiPromptLogs}
      />

      {gameState && (
        <CluesInventoryModal
          isOpen={isInventoryOpen}
          onClose={() => setIsInventoryOpen(false)}
          gameState={gameState}
        />
      )}

      <SlangGlossaryModal
        isOpen={isSlangOpen}
        onClose={() => setIsSlangOpen(false)}
        highlightTerm={slangHighlight}
      />

      <StoryVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
      />
    </div>
  );
}
