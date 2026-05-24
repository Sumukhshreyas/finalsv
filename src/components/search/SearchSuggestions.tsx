"use client";

interface SearchSuggestionsProps {
  items: string[];
  label: string;
  onSelect: (value: string) => void;
}

export function SearchSuggestions({
  items,
  label,
  onSelect,
}: SearchSuggestionsProps) {
  return (
    <div className="suggestion-block">
      <div className="suggestion-label">POPULAR SEARCHES</div>
      <div className="suggestion-chips">
        {items.map((item) => (
          <button
            className="suggestion-chip"
            key={item}
            type="button"
            onClick={() => onSelect(item)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="squiggle-icon">
              <path d="M4 12c2.5-3 5-3 8 0 2.5 3 5 3 8 0" />
            </svg>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
