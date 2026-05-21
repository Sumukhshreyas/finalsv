"use client";

interface FilterChipsProps {
  brandValue: string;
  compatibilityLabel: string;
  compatibilityValue: string;
  onClearAll: () => void;
  onRemoveBrand: () => void;
  onRemoveCompatibility: () => void;
}

export function FilterChips({
  brandValue,
  compatibilityLabel,
  compatibilityValue,
  onClearAll,
  onRemoveBrand,
  onRemoveCompatibility,
}: FilterChipsProps) {
  const hasBrand = Boolean(brandValue);
  const hasCompatibility = Boolean(compatibilityValue);

  if (!hasBrand && !hasCompatibility) {
    return null;
  }

  return (
    <div className="selected-filters open">
      <div className="selected-filter-head">
        <span>Selected filters</span>
        <button type="button" onClick={onClearAll}>
          Clear all
        </button>
      </div>
      <div className="selected-filter-list">
        {hasBrand ? (
          <button
            aria-label={`Remove brand filter ${brandValue}`}
            className="selected-filter-chip"
            type="button"
            onClick={onRemoveBrand}
          >
            Brand: {brandValue} <span aria-hidden="true">×</span>
          </button>
        ) : null}
        {hasCompatibility ? (
          <button
            aria-label={`Remove ${compatibilityLabel} filter ${compatibilityValue}`}
            className="selected-filter-chip"
            type="button"
            onClick={onRemoveCompatibility}
          >
            {compatibilityLabel}: {compatibilityValue}{" "}
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
