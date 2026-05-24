"use client";

import type { ProductSort } from "@/lib/dataUtils";

interface SortOption {
  label: string;
  value: ProductSort;
}

interface SortDropdownProps {
  onChange: (sort: ProductSort) => void;
  options?: SortOption[];
  value: ProductSort;
}

const DEFAULT_OPTIONS: SortOption[] = [
  { label: "Sort by: Popular", value: "popularity" },
  { label: "Sort by: Name A-Z", value: "name-ascending" },
  { label: "Sort by: OEM Number", value: "oem-ascending" },
];

export function SortDropdown({
  onChange,
  options = DEFAULT_OPTIONS,
  value,
}: SortDropdownProps) {
  return (
    <select
      aria-label="Sort products"
      className="catalog-sort"
      onChange={(event) => onChange(event.target.value as ProductSort)}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
