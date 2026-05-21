"use client";

import Link from "next/link";
import { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { getCatalogue } from "@/lib/dataUtils";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";

function sanitizeQuery(value: string): string {
  return value.replace(/[<>]/g, "").trim();
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

  return (
    <section className="section compact">
      <div className="container page-shell search-page-wrap">
        <nav className="category-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <span>Search</span>
        </nav>

        <div className="category-overview-hero">
          <p className="kicker section-kicker">Search</p>
          <h1>{renderModeTitle(content.title)}</h1>
          <p>{content.copy}</p>
        </div>

        <div className="search-panel">
          <SearchInput
            onChange={(value) => {
              setQuery(value);
            }}
            onSubmit={() => setQuery((current) => sanitizeQuery(current))}
            placeholder={content.placeholder}
            value={query}
          />
          <SearchSuggestions
            items={content.suggestions}
            label={content.suggestionLabel}
            onSelect={(value) => {
              setQuery(value);
            }}
          />
        </div>

        <SearchResults
          key={`${mode}:${sanitizeQuery(query)}`}
          emptyLabel="No products found for your search"
          mode={mode}
          onQueryChange={setQuery}
          query={query}
          resultsTitle={content.resultsTitle}
          suggestions={content.suggestions}
        />
      </div>
    </section>
  );
}
