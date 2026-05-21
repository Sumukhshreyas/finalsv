"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { Mode } from "@/data/types";
import {
  DEFAULT_MODE,
  getModeFromPathname,
  getValidMode,
} from "@/lib/modeUtils";

interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);
const MODE_STORAGE_KEY = "sv-home-mode";
const MODE_STORAGE_EVENT = "sv-home-mode-change";

function getStoredMode(): Mode {
  if (typeof window === "undefined") {
    return DEFAULT_MODE;
  }

  return getValidMode(window.sessionStorage.getItem(MODE_STORAGE_KEY));
}

function subscribeToModeStore(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(MODE_STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(MODE_STORAGE_EVENT, onStoreChange);
  };
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const selectedMode = useSyncExternalStore(
    subscribeToModeStore,
    getStoredMode,
    () => DEFAULT_MODE,
  );
  const routeMode = getModeFromPathname(pathname);
  const mode = routeMode || selectedMode;
  const setMode = useCallback((nextMode: Mode) => {
    const validMode = getValidMode(nextMode);

    window.sessionStorage.setItem(MODE_STORAGE_KEY, validMode);
    window.dispatchEvent(new Event(MODE_STORAGE_EVENT));
  }, []);

  useEffect(() => {
    document.body.dataset.homeMode = mode;
  }, [mode]);

  const value = useMemo<ModeContextValue>(
    () => ({
      mode,
      setMode,
    }),
    [mode, setMode],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error("useMode must be used within ModeProvider");
  }

  return context;
}
