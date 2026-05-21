"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Mode, Product } from "@/data/types";
import { getProductUrl, searchProducts } from "@/lib/dataUtils";
import { getAssetPath, getFallbackInitials } from "@/components/catalog/cardUtils";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";

interface SearchResultsProps {
  mode: Mode;
  query: string;
  resultsTitle: string;
  emptyLabel: string;
  suggestions: string[];
  onQueryChange: (value: string) => void;
}

interface SearchResultCategory {
  slug: string;
  title: string;
}

function formatAvailability(status: Product["stockStatus"]): string {
  switch (status) {
    case "ready-stock":
      return "Ready stock";
    case "available":
      return "Available";
    case "in-stock":
    default:
      return "In stock";
  }
}

function getResultDescription(product: Product): string {
  return [`OEM: ${product.oemNumber}`, product.brand, product.category].join(" - ");
}

function SearchResultCard({ mode, product }: { mode: Mode; product: Product }) {
  const imagePath = getAssetPath(product.imageUrl);

  return (
    <Link className="demo-product-card" href={getProductUrl(product, mode)}>
      <div className="demo-product-visual">
        {imagePath ? (
          <Image alt={product.name} src={imagePath} width={76} height={76} />
        ) : (
          <span aria-hidden="true">
            {product.imageFallbackInitials || getFallbackInitials(product.name)}
          </span>
        )}
      </div>
      <div className="demo-product-body">
        <h3>{product.name}</h3>
        <p>{getResultDescription(product)}</p>
      </div>
      <div className="demo-product-price">
        {product.category}
        <span>{formatAvailability(product.stockStatus)}</span>
      </div>
    </Link>
  );
}

function getUniqueCategories(results: Product[]): SearchResultCategory[] {
  const seen = new Map<string, SearchResultCategory>();

  results.forEach((product) => {
    if (!seen.has(product.categorySlug)) {
      seen.set(product.categorySlug, {
        slug: product.categorySlug,
        title: product.category,
      });
    }
  });

  return [...seen.values()];
}

export function SearchResults({
  emptyLabel,
  mode,
  query,
  resultsTitle,
  suggestions,
  onQueryChange,
}: SearchResultsProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const results = useMemo(() => {
    const cleanedQuery = query.trim();

    if (cleanedQuery.length < 2) {
      return [];
    }

    return searchProducts(cleanedQuery, mode);
  }, [mode, query]);

  const categories = useMemo(() => getUniqueCategories(results), [results]);
  const filteredResults = useMemo(() => {
    if (activeCategorySlug === "all") {
      return results;
    }

    return results.filter((product) => product.categorySlug === activeCategorySlug);
  }, [activeCategorySlug, results]);

  const visibleResults = expanded ? filteredResults : filteredResults.slice(0, 6);
  const isSearchReady = query.trim().length >= 2;
  const showEmptyState = !isSearchReady || filteredResults.length === 0;
  const totalMatches = filteredResults.length;
  const seeAllText = expanded ? `Show fewer (${totalMatches})` : `See all (${totalMatches})`;

  if (showEmptyState) {
    return (
      <section aria-label={resultsTitle}>
        <div className="search-results-head">
          <h2>{resultsTitle}</h2>
          <span>{isSearchReady ? `${totalMatches} results` : "Type at least 2 characters"}</span>
        </div>

        <div className="brand-card" aria-live="polite">
          <strong>{isSearchReady ? emptyLabel : "Search suggestions and results appear here."}</strong>
          <p>
            {isSearchReady
              ? `No products found for "${query.trim()}".`
              : "Enter at least two characters to search across product name, OEM/spec number, brand, and category."}
          </p>
        </div>

        <SearchSuggestions items={suggestions} label="Try these searches" onSelect={onQueryChange} />
      </section>
    );
  }

  return (
    <section aria-label={resultsTitle}>
      <div className="search-results-head">
        <h2>{resultsTitle}</h2>
        <button
          className="see-all-link"
          type="button"
          onClick={() => setExpanded((current) => !current)}
        >
          {seeAllText}
        </button>
      </div>

      {categories.length > 1 ? (
        <div className="search-filter-row" aria-label="Search categories">
          <button
            className={`search-filter-chip${activeCategorySlug === "all" ? " active" : ""}`}
            type="button"
            onClick={() => setActiveCategorySlug("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              className={`search-filter-chip${
                activeCategorySlug === category.slug ? " active" : ""
              }`}
              key={category.slug}
              type="button"
              onClick={() => setActiveCategorySlug(category.slug)}
            >
              {category.title}
            </button>
          ))}
        </div>
      ) : null}

      <div className="demo-product-grid" aria-label="Search results">
        {visibleResults.map((product) => (
          <SearchResultCard key={product.id} mode={mode} product={product} />
        ))}
      </div>
    </section>
  );
}
