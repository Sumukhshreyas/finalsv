"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useMode } from "@/context/ModeContext";
import { getCatalogue, searchProducts } from "@/lib/dataUtils";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { FilterPanel } from "@/components/catalog/FilterPanel";

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function sanitizeQuery(value: string): string {
  return value.replace(/[<>]/g, "").trim();
}

function RecentSearches({ onSelect }: { onSelect: (q: string) => void }) {
  const mockRecent = [
    { query: "Brake Disc — Toyota Innova", meta: "OEM • 2 hours ago" },
    { query: "Bosch Air Filter 04521", meta: "Brand • Yesterday" },
  ];

  return (
    <div className="recent-searches">
      <div className="recent-head">
        <h2>RECENT SEARCHES</h2>
        <button type="button" className="clear-link">Clear all</button>
      </div>
      <div className="recent-list">
        {mockRecent.map((item) => (
          <button key={item.query} className="recent-item" type="button" onClick={() => onSelect(item.query)}>
            <div className="recent-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="6" />
                <path d="m16 16 4 4" />
              </svg>
            </div>
            <div className="recent-text">
              <strong>{item.query}</strong>
              <small>{item.meta}</small>
            </div>
            <div className="recent-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function renderModeTitle(title: string) {
  return title.split("<br>").map((line, index, lines) => (
    <span key={line}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

export function SearchPageShell() {
  const { mode } = useMode();
  const catalogue = getCatalogue();
  const content = catalogue.modes[mode].searchPage;
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter state
  const [draftBrand, setDraftBrand] = useState("");
  const [draftVehicleManufacturer, setDraftVehicleManufacturer] = useState("");
  const [draftVehicleModel, setDraftVehicleModel] = useState("");
  const [draftToolType, setDraftToolType] = useState("");
  const [draftVehicleType, setDraftVehicleType] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedVehicleManufacturer, setSelectedVehicleManufacturer] = useState("");
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("");
  const [selectedToolType, setSelectedToolType] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  const vehicleManufacturerOptions = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Volkswagen", "Hyundai", "Kia", "BMW", "Mercedes-Benz"];
  const vehicleModelOptions = ["Corolla", "Civic", "F-150", "Silverado", "Altima", "Jetta", "Elantra", "Optima", "3 Series", "C-Class"];
  const toolTypeOptions = ["Wrench", "Screwdriver", "Pliers", "Hammer", "Drill", "Saw", "Socket Set", "Allen Key", "Mallet", "Tape Measure"];
  const vehicleTypeOptions = ["Sedan", "SUV", "Truck", "Hatchback", "Coupe", "Convertible", "Minivan", "Wagon", "Van", "Pickup"];

  const results = useMemo(() => {
    const cleanedQuery = query.trim();
    if (cleanedQuery.length < 2) {
      return [];
    }
    return searchProducts(cleanedQuery, mode);
  }, [mode, query]);

  const brandOptions = useMemo(
    () => uniqueSorted(results.map((product) => product.brand)),
    [results],
  );

  const activeFilterCount =
    (selectedBrand ? 1 : 0) + (selectedVehicleManufacturer ? 1 : 0) + (selectedVehicleModel ? 1 : 0) + (selectedToolType ? 1 : 0) + (selectedVehicleType ? 1 : 0);

  const applyFilters = () => {
    setSelectedBrand(draftBrand);
    setSelectedVehicleManufacturer(draftVehicleManufacturer);
    setSelectedVehicleModel(draftVehicleModel);
    setSelectedToolType(draftToolType);
    setSelectedVehicleType(draftVehicleType);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setDraftBrand("");
    setDraftVehicleManufacturer("");
    setDraftVehicleModel("");
    setDraftToolType("");
    setDraftVehicleType("");
    setSelectedBrand("");
    setSelectedVehicleManufacturer("");
    setSelectedVehicleModel("");
    setSelectedToolType("");
    setSelectedVehicleType("");
    setIsFilterOpen(false);
  };

  const openFilterPanel = () => {
    setDraftBrand(selectedBrand);
    setDraftVehicleManufacturer(selectedVehicleManufacturer);
    setDraftVehicleModel(selectedVehicleModel);
    setDraftToolType(selectedToolType);
    setDraftVehicleType(selectedVehicleType);
    setIsFilterOpen(true);
  };

  return (
    <>
      <section className="section" style={{ paddingTop: '16px', paddingBottom: '24px', backgroundColor: '#ffffff' }}>
        <div className="container search-page-wrap">
          <nav className="category-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '8px' }}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <span>Search</span>
          </nav>

          <div className="category-overview-hero">
            <div className="overview-badge">
              <span className="overview-badge-dot" aria-hidden="true"></span>
              FIND YOUR PART
            </div>
            <h1>
              SEARCH <span className="overview-highlight">PARTS</span>
            </h1>
            <p>OEM number, product code, brand, vehicle model or category.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container search-page-wrap">

        <div className="search-panel">
          <SearchInput
            onChange={(value) => {
              setQuery(value);
            }}
            onSubmit={() => setQuery((current) => sanitizeQuery(current))}
            value={query}
            onFilterClick={openFilterPanel}
            activeFilterCount={activeFilterCount}
          />
          <SearchSuggestions
            items={content.suggestions}
            label={content.suggestionLabel}
            onSelect={(value) => {
              setQuery(value);
            }}
          />
        </div>

        {query.trim().length === 0 && (
          <RecentSearches onSelect={setQuery} />
        )}

        <SearchResults
          key={`${mode}:${sanitizeQuery(query)}`}
          emptyLabel="No products found for your search"
          mode={mode}
          onQueryChange={setQuery}
          query={query}
          resultsTitle={content.resultsTitle}
          suggestions={content.suggestions}
          results={results}
          selectedBrand={selectedBrand}
        />
      </div>
    </section>

    <FilterPanel
      brandOptions={brandOptions}
      brandValue={draftBrand}
      copy="Filter down the search results by selecting specific brands, vehicles, or tool types."
      onApply={applyFilters}
      onBrandChange={setDraftBrand}
      onClose={() => setIsFilterOpen(false)}
      onReset={resetFilters}
      onToolTypeChange={setDraftToolType}
      onVehicleManufacturerChange={setDraftVehicleManufacturer}
      onVehicleModelChange={setDraftVehicleModel}
      onVehicleTypeChange={setDraftVehicleType}
      open={isFilterOpen}
      title="Filter Search Results"
      toolTypeOptions={toolTypeOptions}
      toolTypeValue={draftToolType}
      vehicleManufacturerOptions={vehicleManufacturerOptions}
      vehicleManufacturerValue={draftVehicleManufacturer}
      vehicleModelOptions={vehicleModelOptions}
      vehicleModelValue={draftVehicleModel}
      vehicleTypeOptions={vehicleTypeOptions}
      vehicleTypeValue={draftVehicleType}
    />
    </>
  );
}
