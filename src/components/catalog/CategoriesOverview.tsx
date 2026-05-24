"use client";

import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { getCatalogue, getCategories } from "@/lib/dataUtils";

import { CategoryCard } from "@/components/catalog/CategoryCard";

export function CategoriesOverview() {
  const { mode } = useMode();
  const catalogue = getCatalogue();
  const categories = getCategories(mode);
  const content = catalogue.modes[mode].categoriesOverview;

  return (
    <>
      <section
        className="section"
        style={{ paddingTop: '16px', paddingBottom: '24px', backgroundColor: '#ffffff' }}
        aria-labelledby="categories-overview-title"
      >
        <div className="container">
          <div className="category-overview-shell">
            <nav className="category-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">&gt;</span><span>Categories</span>
            </nav>

            <div className="category-overview-hero">
              <div className="overview-badge">
                <span className="overview-badge-dot" aria-hidden="true"></span>
                {mode === "automobile" ? "ALL CATEGORIES" : "INDUSTRIAL CATEGORIES"}
              </div>
              <h1 id="categories-overview-title">
                {content.title.split(' ').map((word: string, i: number, arr: string[]) => (
                  <span key={i} className={word.toLowerCase() === 'all' || word.toLowerCase() === 'industrial' ? 'overview-highlight' : ''}>
                    {word.toUpperCase()}{i < arr.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </h1>

              <p id="categories-overview-copy">{content.copy}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container">
          <div className="category-overview-shell">
            <div
              className="category-overview-grid"
              aria-label={`${mode} categories`}
            >
              {categories.map((category) => (
                <CategoryCard
                  category={category}
                  mode={mode}
                  variant="strip"
                  key={category.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
