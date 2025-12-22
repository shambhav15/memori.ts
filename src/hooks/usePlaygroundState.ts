import { useState, useEffect } from "react";

const SAMPLE_CONTEXT = `[PROJECT CHIMERA: INTERNAL MEMO]
CONFIDENTIALITY LEVEL: HIGH

1. PROJECT OVERVIEW
Project Chimera is a next-generation automated cat toy utilizing AI to predict feline pounce patterns.
Goal: Increase localized engagement by 400% in domestic shorthairs.
Launch Date: November 1st (National Cat Day).

2. TECHNICAL STACK
- Backend: Go (Transitioned from Python for latency).
- Frontend: React Native (Mobile App).
- Hardware: ESP32 Controller with Laser Module (Class 2).

3. KEY PERSONNEL
- Sarah (CEO): Focused on Series B funding ($5M secured from CapitalOne Ventures).
- Mike (CTO): Handling server migration and hardware latency (Target < 100ms).
- Emily (Product): Managing UI/UX and Marketing (TabbyTammy influencer campaign).
- David (Intern): General assistance (accidentally locked AWS keys, password reset to 'BlueSky$99').

4. KNOWN ISSUES
- Laser pointer latency is currently 500ms (Unacceptable).
- "Bark Detection" module needs calibration; false positives with loud sneezes.
- User testing revealed 'Dark Mode' toggle is hard to find.

5. COMPETITOR INTELLIGENCE
- "DogGo" is rumored to be launching a smart collar. Source: r/Startups.
- Counter-strategy: Release "Bark Detection" as a USP (Unique Selling Point).

6. BUDGET
- Burn rate: $50k/month.
- Marketing: $12k wasted on billboard; pivoting to influencer equity deals (2% offered to TabbyTammy).
- Cost cutting: Office closing Dec 1st; switching to fully remote to save $8k/month.

[END MEMO]`;

export type Message = any;

type StatsStandard = {
  latencyMs: number;
  originalSize: number;
};

type StatsClara = {
  latencyMs: number;
  compressedSize: number;
};

type PlaygroundState = {
  messagesStandard: Message[];
  messagesClara: Message[];
  input: string;
  statsStandard: StatsStandard | null;
  statsClara: StatsClara | null;
  contextContent: string;
  lastIngestedContent: string | null;
  isIngesting: boolean;
  ingestionStatus: "idle" | "success" | "error";
  isLoading: boolean;
};

let globalState: PlaygroundState = {
  messagesStandard: [
    { role: "assistant", content: "Ready to query Standard Index." },
  ],
  messagesClara: [
    { role: "assistant", content: "Ready to query CLaRa Engine." },
  ],
  input: "",
  statsStandard: null,
  statsClara: null,
  contextContent: SAMPLE_CONTEXT,
  lastIngestedContent: null,
  isIngesting: false,
  ingestionStatus: "idle",
  isLoading: false,
};

const listeners = new Set<(state: PlaygroundState) => void>();

const updateGlobalState = (updates: Partial<PlaygroundState>) => {
  globalState = { ...globalState, ...updates };
  listeners.forEach((l) => l(globalState));
};

export const usePlaygroundState = () => {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    const listener = (newState: PlaygroundState) => setState(newState);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setMessagesStandard = (
    value: Message[] | ((prev: Message[]) => Message[])
  ) => {
    const newValue =
      typeof value === "function" ? value(globalState.messagesStandard) : value;
    updateGlobalState({ messagesStandard: newValue });
  };

  const setMessagesClara = (
    value: Message[] | ((prev: Message[]) => Message[])
  ) => {
    const newValue =
      typeof value === "function" ? value(globalState.messagesClara) : value;
    updateGlobalState({ messagesClara: newValue });
  };

  const setInput = (value: string) => updateGlobalState({ input: value });

  const setStatsStandard = (value: StatsStandard | null) =>
    updateGlobalState({ statsStandard: value });

  const setStatsClara = (value: StatsClara | null) =>
    updateGlobalState({ statsClara: value });

  const setContextContent = (value: string) =>
    updateGlobalState({ contextContent: value });

  const setLastIngestedContent = (value: string | null) =>
    updateGlobalState({ lastIngestedContent: value });

  const setIsIngesting = (value: boolean) =>
    updateGlobalState({ isIngesting: value });

  const setIngestionStatus = (value: "idle" | "success" | "error") =>
    updateGlobalState({ ingestionStatus: value });

  const setIsLoading = (value: boolean) =>
    updateGlobalState({ isLoading: value });

  const resetToSample = () =>
    updateGlobalState({ contextContent: SAMPLE_CONTEXT });

  const clearHistory = () => {
    updateGlobalState({
      messagesStandard: [
        { role: "assistant", content: "Ready to query Standard Index." },
      ],
      messagesClara: [
        { role: "assistant", content: "Ready to query CLaRa Engine." },
      ],
      statsStandard: null,
      statsClara: null,
    });
  };

  return {
    ...state,
    setMessagesStandard,
    setMessagesClara,
    setInput,
    setStatsStandard,
    setStatsClara,
    setContextContent,
    setLastIngestedContent,
    setIsIngesting,
    setIngestionStatus,
    setIsLoading,
    resetToSample,
    clearHistory,
    SAMPLE_CONTEXT,
  };
};
