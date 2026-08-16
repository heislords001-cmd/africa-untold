import { GameState, SceneData, ChoiceOption, EndingType } from "./storyTypes";
import { ENDINGS_CATALOG } from "./endings";

export function generateInitialScene(state: GameState): SceneData {
  const { player } = state;
  const name = player.name || "Adventurer";
  const bg = player.background;
  const strength = player.strength;

  let bgNarration = "";
  if (bg === "Developer") {
    bgNarration = `Your terminal screen flickers with green lines of code in your Yaba tech apartment. A high-priority encrypted ping arrives on port 8080.`;
  } else if (bg === "Journalist") {
    bgNarration = `Your tape recorder sits beside a stack of confidential files on oil subsidies. A unlisted Lagos number buzzes on your desk.`;
  } else if (bg === "Street Hustler") {
    bgNarration = `You're standing near the glowing neon signs of Yaba, counting cash after a sharp trade, when a young kid in a Danfo shirt hands you a sealed red envelope.`;
  } else if (bg === "Detective") {
    bgNarration = `Your rain-streaked office window overlooks the Lagos traffic. A shadow knocks three times on your door before slipping an encrypted USB drive under the frame.`;
  } else if (bg === "Musician") {
    bgNarration = `Backstage at a packed Bogobiri Afrobeat gig, Tobi rushes into your dressing room with wide eyes and a phone displaying live server breach alerts.`;
  } else {
    bgNarration = `The midnight breeze carries the distant rhythm of Afrobeats and rain. Your phone lights up with a frantic message from Tobi: 'They found the vault. I need you right now.'`;
  }

  return {
    id: "ch1_start",
    chapter: 1,
    title: "CHAPTER 1: THE CALL",
    location: "Yaba Innovation District",
    time: "11:47 PM",
    mood: "suspenseful",
    narration: `LAGOS, NIGERIA — 11:47 PM. The city isn't sleeping. Neither are you.\n\n${bgNarration}\n\n"Listen to me carefully, ${name}," Tobi's voice trembles over the speaker. "Chief Bode's private operatives just breached our encrypted server in Computer Village. They're trying to activate the digital surveillance grid across Lagos Island before sunrise. If you don't help me trace the key tonight, we're all compromised."`,
    charactersPresent: [
      {
        name: "Tobi Adebayo",
        role: "Yaba Hacker",
        relationship: 50,
        status: "Ally",
        lastAction: "Sent urgent SOS distress signal.",
      },
    ],
    choices: [
      {
        id: "ch1_choice_1",
        text: "Answer Tobi's call immediately and trace the encrypted signal from your terminal.",
        risk: "low",
        statReq: "Intelligence",
        riskDescription: "Exposes your IP address to initial port scanning.",
        consequenceHint: "Unlocks digital key traces.",
      },
      {
        id: "ch1_choice_2",
        text: "Sprint straight to Balogun Market to intercept Chief Bode's courier on foot.",
        risk: "medium",
        statReq: "Street Smarts",
        riskDescription: "Risk running into armed private security guards.",
        consequenceHint: "High reward physical evidence.",
      },
      {
        id: "ch1_choice_3",
        text: "Contact Amaka, the undercover investigative reporter, to verify the threat.",
        risk: "safe",
        statReq: "Persuasion",
        riskDescription: "Takes extra time while the server clock ticks.",
        consequenceHint: "Builds journalist alliance early.",
      },
    ],
    stateChanges: {
      health: 0,
      money: 0,
      danger: 5,
      reputation: 2,
    },
    newClues: ["Tobi's Encrypted SOS Signal"],
    relationshipChanges: { Tobi: 5 },
    nextObjective: "Investigate the cyber ping and discover Chief Bode's primary target.",
    imagePrompt: "Lagos tech hub at midnight rain neon yellow Danfo buses dark cinematic atmosphere",
  };
}

export function processFallbackChoice(
  state: GameState,
  choiceId: string,
  userChoiceText: string
): SceneData {
  const chapter = state.currentChapter;
  const count = state.sceneCount + 1;
  const name = state.player.name;
  const bg = state.player.background;

  // Chapter 1 -> Chapter 2 transition
  if (chapter === 1) {
    if (choiceId.includes("1")) {
      return {
        id: "ch2_tech_trace",
        chapter: 2,
        title: "CHAPTER 2: THE TRAIL — DIGITIZING TRUTH",
        location: "Computer Village, Ikeja",
        time: "01:15 AM",
        mood: "investigative",
        narration: `Using your ${bg} instincts, you trace the digital packet back to a server rack hidden behind a phone repair shop in Computer Village.\n\nRain hammers down on yellow iron shutters. Tobi meets you under a neon sign, clutching a burned hard drive. "You did it, ${name}. We intercepted half the packet ledger. But Chief Bode's security chief, Corporal Danjuma, just parked a black SUV down the street."`,
        charactersPresent: [
          { name: "Tobi Adebayo", role: "Yaba Hacker", relationship: 65, status: "Ally" },
          { name: "Corporal Danjuma", role: "Street Police Sergeant", relationship: 15, status: "Wary" },
        ],
        choices: [
          {
            id: "ch2_choice_1",
            text: "Bribe Corporal Danjuma using ₦2,000 cash to buy 15 minutes inside the server room.",
            risk: "low",
            statReq: "Persuasion",
            consequenceHint: "Spends money, reduces immediate danger.",
          },
          {
            id: "ch2_choice_2",
            text: "Hack into the building's main power box to blackout the street before moving.",
            risk: "medium",
            statReq: "Intelligence",
            consequenceHint: "Creates confusion, potential collateral danger.",
          },
          {
            id: "ch2_choice_3",
            text: "Confront Danjuma directly and demand to know who hired him.",
            risk: "high",
            statReq: "Courage",
            consequenceHint: "Pushes Danjuma to reveal his true allegiance.",
          },
        ],
        stateChanges: { health: 0, money: -2000, danger: 15, reputation: 10 },
        newClues: ["Encrypted Server Access Log", "Computer Village Storage Pass"],
        relationshipChanges: { Tobi: 10, "Corporal Danjuma": -5 },
        nextObjective: "Extract the decrypted database before Danjuma closes in.",
      };
    } else {
      return {
        id: "ch2_market_chase",
        chapter: 2,
        title: "CHAPTER 2: THE TRAIL — BALOGUN SHADOWS",
        location: "Balogun Market, Lagos Island",
        time: "01:30 AM",
        mood: "dangerous",
        narration: `You arrive at Balogun Market amidst narrow darkened stalls. Water drips from corrugated tin roofs.\n\nA woman in a traditional headwrap step out from behind a textile stall. It's Blessing 'Mama Balogun'.\n\n"You're walking on hot embers, ${name}," Blessing whispers, fanning herself in the humid air. "Chief Bode's men passed through 10 minutes ago with a red sealed dossier. They paid Agberos ₦50,000 to keep watch."`,
        charactersPresent: [
          { name: "Blessing", role: "Balogun Information Broker", relationship: 50, status: "Ally" },
          { name: "Amaka Eze", role: "Investigative Reporter", relationship: 40, status: "Neutral" },
        ],
        choices: [
          {
            id: "ch2_choice_1",
            text: "Pay Blessing for the secret rooftop access path into Chief Bode's satellite hub.",
            risk: "safe",
            statReq: "Street Smarts",
            consequenceHint: "Spends ₦3,000 NGN for stealth route.",
          },
          {
            id: "ch2_choice_2",
            text: "Team up with Amaka to record video evidence of the illegal exchange.",
            risk: "medium",
            statReq: "Observation",
            consequenceHint: "Boosts Amaka's trust and earns explosive evidence.",
          },
          {
            id: "ch2_choice_3",
            text: "Distract the Agberos with a smoke canister and rush the courier.",
            risk: "high",
            statReq: "Courage",
            consequenceHint: "Fast pace but spikes danger level.",
          },
        ],
        stateChanges: { health: -5, money: -3000, danger: 20, reputation: 12 },
        newClues: ["Red Envelope Dossier", "Agbero Trade Map"],
        relationshipChanges: { Blessing: 15, Amaka: 10 },
        nextObjective: "Infiltrate the secret satellite relay on Lagos Island.",
      };
    }
  }

  // Chapter 2 -> Chapter 3 transition
  if (chapter === 2) {
    return {
      id: "ch3_the_choice",
      chapter: 3,
      title: "CHAPTER 3: THE CRITICAL CHOICE",
      location: "Third Mainland Bridge",
      time: "03:15 AM",
      mood: "suspenseful",
      narration: `A sudden torrential downpour strikes over the 11-kilometer stretch of Third Mainland Bridge. Ocean waves crash against concrete pilings below.\n\nYour laptop screen displays a terrifying countdown: Chief Bode's offshore grid is 2 hours away from locking all financial accounts across West Africa.\n\nAmaka calls you on an encrypted satellite line while Tobi signals from inside a parked Danfo bus. You hold the master key drive, but you can only deploy it in one location before sunrise!`,
      charactersPresent: [
        { name: "Tobi Adebayo", role: "Tech Hacker", relationship: state.relationships["Tobi"] || 50, status: "Ally" },
        { name: "Amaka Eze", role: "Journalist", relationship: state.relationships["Amaka"] || 40, status: "Ally" },
        { name: "Chief Bode", role: "Tech Mogul", relationship: -35, status: "Hostile" },
      ],
      choices: [
        {
          id: "ch3_choice_1",
          text: "Upload the master key directly to the public media grid with Amaka to alert the nation.",
          risk: "medium",
          statReq: "Persuasion",
          riskDescription: "Exposes your true identity publicly.",
          consequenceHint: "Massive public reputation boost, forces Chief Bode into panic.",
        },
        {
          id: "ch3_choice_2",
          text: "Infiltrate Chief Bode's private Lekki Phase 1 penthouse to wipe the servers physically with Tobi.",
          risk: "high",
          statReq: "Intelligence",
          riskDescription: "High danger, extreme private security presence.",
          consequenceHint: "Direct confrontation with Chief Bode's inner circle.",
        },
        {
          id: "ch3_choice_3",
          text: "Negotiate a backdoor deal with Chief Bode in exchange for immunity and money.",
          risk: "extreme",
          statReq: "Street Smarts",
          riskDescription: "High risk of betrayal or losing moral standing.",
          consequenceHint: "Unlocks rich financial payout but tests your allies' trust.",
        },
      ],
      stateChanges: { health: -10, money: 5000, danger: 25, reputation: 15 },
      newClues: ["Master Encryption Matrix Key"],
      relationshipChanges: { Tobi: 10, Amaka: 15, "Chief Bode": -10 },
      nextObjective: "Execute your high-stakes plan before the 05:00 AM server reboot.",
    };
  }

  // Chapter 3 -> Chapter 4 transition
  if (chapter === 3) {
    return {
      id: "ch4_the_truth",
      chapter: 4,
      title: "CHAPTER 4: THE TRUTH UNVEILED",
      location: "Lekki Phase 1 Penthouse & Eko Atlantic",
      time: "04:30 AM",
      mood: "chaotic",
      narration: `The sky above the Atlantic coastline begins to glow with a faint violet hue. High inside Chief Bode's glass penthouse, rain streaks the floor-to-ceiling windows.\n\nYour actions have cracked the top layer of secrecy. On Chief Bode's central command monitor, a map of Africa illuminates glowing nexus points from Lagos to Nairobi and Accra.\n\n"You think this was just about money?" Chief Bode's voice echoes from the doorway. He holds a glass of whiskey, guarded by two heavy private security agents. "This grid connects energy, communications, and banking across 8 nations. You're holding the pulse of a continent, ${name}."`,
      charactersPresent: [
        { name: "Chief Bode", role: "Tech Monopoly Tycoon", relationship: -50, status: "Hostile" },
        { name: "Amaka Eze", role: "Journalist", relationship: state.relationships["Amaka"] || 50, status: "Ally" },
        { name: "Corporal Danjuma", role: "Police Officer", relationship: state.relationships["Corporal Danjuma"] || 20, status: "Mystery" },
      ],
      choices: [
        {
          id: "ch4_choice_1",
          text: "Expose Chief Bode's global syndicate live by broadcasting the master decrypt stream.",
          risk: "high",
          statReq: "Courage",
          consequenceHint: "Leads towards 'The Hero' or 'The Truth' ending.",
        },
        {
          id: "ch4_choice_2",
          text: "Use Danjuma's police backup to arrest Chief Bode and seize his hard drives.",
          risk: "medium",
          statReq: "Persuasion",
          consequenceHint: "Tests Danjuma's loyalty under pressure.",
        },
        {
          id: "ch4_choice_3",
          text: "Grab the hard drive drive and escape via boat down Lekki Lagoon with your life.",
          risk: "safe",
          statReq: "Street Smarts",
          consequenceHint: "Leads towards 'The Survivor' ending.",
        },
      ],
      stateChanges: { health: -15, money: 10000, danger: 30, reputation: 20 },
      newClues: ["Pan-African Syndicate Dossier", "Bode's Private Keycard"],
      relationshipChanges: { "Chief Bode": -25, Amaka: 20 },
      nextObjective: "Determine the final fate of the Lagos surveillance grid.",
    };
  }

  // Chapter 4 -> Chapter 5 Final Chapter & Resolution!
  const endingType = calculateEndingType(state);
  const endingDef = ENDINGS_CATALOG[endingType];

  return {
    id: "ch5_ending",
    chapter: 5,
    title: `CHAPTER 5: THE RESOLUTION — ${endingDef.title}`,
    location: "Eko Atlantic Horizon",
    time: "06:00 AM",
    mood: "triumphant",
    narration: `DAWN OVER LAGOS — 06:00 AM.\n\nAs the sun rises over the Atlantic Ocean, the yellow Danfo buses roll out across the bridges. Golden morning light floods the streets of Yaba, Balogun, and Ikeja.\n\n${endingDef.description}\n\nYour choices as a ${state.player.personality} ${state.player.background} shaped the destiny of Lagos. Tobi, Amaka, and the people of Lagos will remember what transpired during these midnight hours.`,
    charactersPresent: [
      { name: "Tobi Adebayo", role: "Tech Hacker", relationship: state.relationships["Tobi"] || 70, status: "Trusted" },
      { name: "Amaka Eze", role: "Journalist", relationship: state.relationships["Amaka"] || 60, status: "Trusted" },
    ],
    choices: [],
    stateChanges: { health: 0, money: 15000, danger: 0, reputation: 25 },
    newClues: ["Final Resolution Summary"],
    nextObjective: "Story Complete.",
  };
}

export function calculateEndingType(state: GameState): EndingType {
  const cluesCount = state.clues.length;
  const reputation = state.reputation;
  const danger = state.danger;
  const tobiTrust = state.relationships["Tobi"] || 50;
  const bodeTrust = state.relationships["Chief Bode"] || -30;

  if (bodeTrust > 30 || state.choicesHistory.some(c => c.choiceText.toLowerCase().includes("negotiate") || c.choiceText.toLowerCase().includes("backdoor"))) {
    return "The Betrayal";
  }

  if (cluesCount >= 4 && (state.player.strength === "Intelligence" || state.player.strength === "Observation")) {
    return "The Truth";
  }

  if (reputation >= 55 && tobiTrust >= 60) {
    return "The Hero";
  }

  if (danger >= 50 || state.health < 40) {
    return "The Survivor";
  }

  return "The Lost Path";
}
