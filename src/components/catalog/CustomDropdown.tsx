import { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

export function CustomDropdown({ options, value, onChange, placeholder }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={containerRef}>
      <button
        type="button"
        className="custom-dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="custom-dropdown-value">
          {value || <span className="custom-dropdown-placeholder">{placeholder}</span>}
        </span>
        <svg
          className={`custom-dropdown-icon ${isOpen ? "open" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu">
          <ul className="custom-dropdown-list">
            <li
              className={`custom-dropdown-item ${!value ? "selected" : ""}`}
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
            >
              {placeholder}
            </li>
            {options.map((option) => (
              <li
                key={option}
                className={`custom-dropdown-item ${value === option ? "selected" : ""}`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
