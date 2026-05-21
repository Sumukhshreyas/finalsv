"use client";

interface SearchInputProps {
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  value: string;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function SearchInput({
  onChange,
  onSubmit,
  placeholder,
  value,
}: SearchInputProps) {
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
          placeholder={placeholder}
          type="search"
        />
      </div>
      <button className="search-submit" type="submit">
        Search
      </button>
    </form>
  );
}
