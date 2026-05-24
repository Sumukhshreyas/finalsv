"use client";

import { useState, useEffect } from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  value: string;
  onFilterClick?: () => void;
  activeFilterCount?: number;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 6h18M6 12h12m-9 6h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PHRASES = [
  "Search by Brand...",
  "Search by OEM number...",
  "Search by part name..."
];

export function SearchInput({
  onChange,
  onSubmit,
  value,
  onFilterClick,
  activeFilterCount,
}: SearchInputProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentPhrase = PHRASES[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      } else {
        setCurrentText(
          currentPhrase.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <form
      className="search-bar"
      role="search"
      aria-label="Search spare parts"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="search-input-wrap">
        <SearchIcon />
        <input
          autoComplete="off"
          aria-label="Search parts"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={currentText}
          type="search"
        />
      </div>
      <button
        aria-expanded="false"
        aria-haspopup="dialog"
        className="catalog-filter-btn"
        type="button"
        onClick={onFilterClick}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <span>Filter</span>
        {activeFilterCount && activeFilterCount > 0 ? (
          <span className="catalog-filter-badge">{activeFilterCount}</span>
        ) : null}
      </button>
    </form>
  );
}
