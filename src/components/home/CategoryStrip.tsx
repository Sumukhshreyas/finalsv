"use client";

import Link from "next/link";
import type { ModeContent } from "@/data/types";
import { useMode } from "@/context/ModeContext";
import { getCatalogue, getCategories } from "@/lib/dataUtils";
import { CategoryCard } from "@/components/catalog/CategoryCard";

function splitTitle(title: string): { before: string; accent: string; after: string } {
  const match = title.match(/^(.*)<span>(.*)<\/span>(.*)$/);

  if (!match) {
    return { before: title, accent: "", after: "" };
  }

  return {
    before: match[1],
    accent: match[2],
    after: match[3],
  };
}

function renderSectionTitle(content: ModeContent) {
  const title = splitTitle(content.home.categoryTitle);

  return (
    <>
      {title.before}
      {title.accent ? <span>{title.accent}</span> : null}
      {title.after}
    </>
  );
}

export function CategoryStrip() {
  const { mode } = useMode();
  const catalogue = getCatalogue();
  const categories = getCategories(mode);
  const content = catalogue.modes[mode];

  return (
    <section className="section compact" aria-labelledby="home-category-title">
      <div className="container">
        <div className="section-head category-section-head">
          <div>
            <h2 className="section-title" id="home-category-title">
              {renderSectionTitle(content)}
            </h2>
          </div>
          <Link className="text-link" href="/categories">
            View all
          </Link>
        </div>
        <div className="card-grid category-strip" aria-label={`${mode} categories`}>
          {categories.map((category) => (
            <CategoryCard category={category} mode={mode} key={category.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
