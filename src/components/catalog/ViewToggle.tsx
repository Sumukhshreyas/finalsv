"use client";

import type { ReactNode } from "react";

export type CatalogViewMode = "grid" | "list";

interface ViewToggleProps {
  onChange: (mode: CatalogViewMode) => void;
  value: CatalogViewMode;
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <rect x="3" y="4" width="2" height="4" rx="1" />
      <rect x="3" y="10" width="2" height="4" rx="1" />
      <rect x="3" y="16" width="2" height="4" rx="1" />
    </svg>
  );
}

interface ViewButtonProps {
  children: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function ViewButton({ children, label, active, onClick }: ViewButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={`catalog-view-btn${active ? " active" : ""}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ViewToggle({ onChange, value }: ViewToggleProps) {
  return (
    <div className="catalog-view-toggle" role="group" aria-label="Product view">
      <ViewButton
        active={value === "grid"}
        label="Grid view"
        onClick={() => onChange("grid")}
      >
        <GridIcon />
      </ViewButton>
      <ViewButton
        active={value === "list"}
        label="List view"
        onClick={() => onChange("list")}
      >
        <ListIcon />
      </ViewButton>
    </div>
  );
}
