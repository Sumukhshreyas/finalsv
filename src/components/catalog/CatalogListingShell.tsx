"use client";

import { useEffect, useMemo, useState } from "react";
import type { Mode, Product } from "@/data/types";
import type { ProductSort } from "@/lib/dataUtils";
import { filterProducts, sortProducts } from "@/lib/dataUtils";
import { ProductCard } from "@/components/catalog/ProductCard";
import { FilterChips } from "@/components/catalog/FilterChips";
import { FilterPanel } from "@/components/catalog/FilterPanel";
import { SortDropdown } from "@/components/catalog/SortDropdown";
import {
  ViewToggle,
  type CatalogViewMode,
} from "@/components/catalog/ViewToggle";

interface CatalogListingShellProps {
  brandLabel: string;
  brandPlaceholder: string;
  categoryTitle: string;
  compatibilityLabel: string;
  compatibilityPlaceholder: string;
  filterPanelCopy: string;
  filterPanelTitle: string;
  mode: Mode;
  products: Product[];
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export function CatalogListingShell({
  brandLabel,
  brandPlaceholder,
  categoryTitle,
  compatibilityLabel,
  compatibilityPlaceholder,
  filterPanelCopy,
  filterPanelTitle,
  mode,
  products,
}: CatalogListingShellProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [draftBrand, setDraftBrand] = useState("");
  const [draftCompatibility, setDraftCompatibility] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCompatibility, setSelectedCompatibility] = useState("");
  const [sort, setSort] = useState<ProductSort>("popularity");
  const [viewMode, setViewMode] = useState<CatalogViewMode>("grid");

  const brandOptions = useMemo(
    () => uniqueSorted(products.map((product) => product.brand)),
    [products],
  );

  const compatibilityOptions = useMemo(() => {
    const values = products.flatMap((product) =>
      mode === "automobile"
        ? product.compatibleVehicles || []
        : product.compatibleApplications || [],
    );

    return uniqueSorted(values);
  }, [mode, products]);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      brand: selectedBrand || undefined,
      compatibleWith: selectedCompatibility || undefined,
    });

    return sortProducts(filtered, sort);
  }, [products, selectedBrand, selectedCompatibility, sort]);

  const activeFilterCount =
    (selectedBrand ? 1 : 0) + (selectedCompatibility ? 1 : 0);

  useEffect(() => {
    if (!isFilterOpen) {
      document.body.classList.remove("filter-open");
      return;
    }

    document.body.classList.add("filter-open");

    return () => {
      document.body.classList.remove("filter-open");
    };
  }, [isFilterOpen]);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFilterOpen]);

  const openFilterPanel = () => {
    setDraftBrand(selectedBrand);
    setDraftCompatibility(selectedCompatibility);
    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setSelectedBrand(draftBrand);
    setSelectedCompatibility(draftCompatibility);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setDraftBrand("");
    setDraftCompatibility("");
    setSelectedBrand("");
    setSelectedCompatibility("");
    setIsFilterOpen(false);
  };

  const clearBrand = () => {
    setSelectedBrand("");
    setDraftBrand("");
  };

  const clearCompatibility = () => {
    setSelectedCompatibility("");
    setDraftCompatibility("");
  };

  return (
    <div className="catalog-listing-shell">
      <div
        className="catalog-toolbar"
        aria-label={`${categoryTitle} listing controls`}
      >
        <button
          aria-expanded={isFilterOpen}
          aria-haspopup="dialog"
          className="catalog-filter-btn"
          type="button"
          onClick={openFilterPanel}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
          </svg>
          <span>Filter</span>
          {activeFilterCount > 0 ? (
            <span className="catalog-filter-badge">{activeFilterCount}</span>
          ) : null}
        </button>
        <SortDropdown onChange={setSort} value={sort} />
      </div>

      <FilterChips
        brandValue={selectedBrand}
        compatibilityLabel={compatibilityLabel}
        compatibilityValue={selectedCompatibility}
        onClearAll={resetFilters}
        onRemoveBrand={clearBrand}
        onRemoveCompatibility={clearCompatibility}
      />

      <div className="catalog-subbar">
        <div className="catalog-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"} found
        </div>
        <ViewToggle onChange={setViewMode} value={viewMode} />
      </div>

      {filteredProducts.length > 0 ? (
        <div
          className={`category-grid${viewMode === "list" ? " category-grid--list" : ""}`}
          aria-label={`${categoryTitle} products`}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              mode={mode}
              product={product}
              variant={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="catalog-empty" role="status">
          <h3>No products match these filters</h3>
          <p>
            Clear one or more filters to see the available parts in this
            category.
          </p>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
      )}

      <FilterPanel
        brandLabel={brandLabel}
        brandOptions={brandOptions}
        brandPlaceholder={brandPlaceholder}
        brandValue={draftBrand}
        compatibilityLabel={compatibilityLabel}
        compatibilityOptions={compatibilityOptions}
        compatibilityPlaceholder={compatibilityPlaceholder}
        compatibilityValue={draftCompatibility}
        copy={filterPanelCopy}
        onApply={applyFilters}
        onBrandChange={setDraftBrand}
        onClose={() => setIsFilterOpen(false)}
        onCompatibilityChange={setDraftCompatibility}
        onReset={resetFilters}
        open={isFilterOpen}
        title={filterPanelTitle}
      />
    </div>
  );
}
