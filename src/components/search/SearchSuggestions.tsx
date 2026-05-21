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
      <div className="suggestion-label">{label}</div>
      <div className="suggestion-chips">
        {items.map((item) => (
          <button
            className="suggestion-chip"
            key={item}
            type="button"
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
