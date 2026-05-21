"use client";

import { useEffect, useRef } from "react";

interface FilterPanelProps {
  brandLabel: string;
  brandOptions: string[];
  brandPlaceholder: string;
  brandValue: string;
  compatibilityLabel: string;
  compatibilityOptions: string[];
  compatibilityPlaceholder: string;
  compatibilityValue: string;
  copy: string;
  onApply: () => void;
  onBrandChange: (value: string) => void;
  onClose: () => void;
  onCompatibilityChange: (value: string) => void;
  onReset: () => void;
  open: boolean;
  title: string;
}

function renderTitle(title: string) {
  const match = title.match(/^(.*)<span>(.*)<\/span>(.*)$/);

  if (!match) {
    return title;
  }

  return (
    <>
      {match[1]}
      <span>{match[2]}</span>
      {match[3]}
    </>
  );
}

export function FilterPanel({
  brandLabel,
  brandOptions,
  brandPlaceholder,
  brandValue,
  compatibilityLabel,
  compatibilityOptions,
  compatibilityPlaceholder,
  compatibilityValue,
  copy,
  onApply,
  onBrandChange,
  onClose,
  onCompatibilityChange,
  onReset,
  open,
  title,
}: FilterPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close filter panel"
        className="filter-backdrop open"
        type="button"
        onClick={onClose}
      />
      <div
        aria-labelledby="catalog-filter-title"
        aria-modal="true"
        className="filter-sheet open"
        role="dialog"
      >
        <div className="filter-head">
          <div>
            <h2 className="filter-title" id="catalog-filter-title">
              {renderTitle(title)}
            </h2>
            <p className="filter-copy">{copy}</p>
          </div>
          <button
            ref={closeButtonRef}
            aria-label="Close filter panel"
            className="close-btn"
            type="button"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form
          className="filter-form"
          onSubmit={(event) => {
            event.preventDefault();
            onApply();
          }}
        >
          <label className="filter-field">
            <span>{brandLabel}</span>
            <select
              value={brandValue}
              onChange={(event) => onBrandChange(event.target.value)}
            >
              <option value="">{brandPlaceholder}</option>
              {brandOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>{compatibilityLabel}</span>
            <select
              value={compatibilityValue}
              onChange={(event) => onCompatibilityChange(event.target.value)}
            >
              <option value="">{compatibilityPlaceholder}</option>
              {compatibilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="filter-actions">
            <button className="btn btn-secondary" type="button" onClick={onReset}>
              Reset
            </button>
            <button className="btn btn-primary" type="submit">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
