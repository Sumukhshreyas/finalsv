"use client";

import type { Mode } from "@/data/types";

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="hero-mode-switch" aria-label="Choose product type">
      <button
        className={`hero-mode-btn${mode === "automobile" ? " active" : ""}`}
        type="button"
        onClick={() => onModeChange("automobile")}
        aria-pressed={mode === "automobile"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 16V9l2-3h10l2 3v7" />
          <path d="M7 16h10" />
          <path d="M6 13h12" />
          <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        <span>Automobile Products</span>
      </button>
      <button
        className={`hero-mode-btn${mode === "industrial" ? " active" : ""}`}
        type="button"
        onClick={() => onModeChange("industrial")}
        aria-pressed={mode === "industrial"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18" />
          <path d="M5 21V8l7-4v17" />
          <path d="M12 21v-8l7-3v11" />
          <path d="M8 10h1" />
          <path d="M8 13h1" />
          <path d="M8 16h1" />
          <path d="M15 14h1" />
          <path d="M15 17h1" />
        </svg>
        <span>Industrial Products</span>
      </button>
    </div>
  );
}
