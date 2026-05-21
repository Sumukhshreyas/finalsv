"use client";

import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { getCatalogue, getCategories } from "@/lib/dataUtils";
import { ModeToggle } from "@/components/home/ModeToggle";
import { CategoryCard } from "@/components/catalog/CategoryCard";

export function CategoriesOverview() {
  const { mode, setMode } = useMode();
  const catalogue = getCatalogue();
  const categories = getCategories(mode);
  const content = catalogue.modes[mode].categoriesOverview;

  return (
    <section className="section compact" aria-labelledby="categories-overview-title">
      <div className="container page-shell">
        <div className="category-overview-shell">
          <nav className="category-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <span>Categories</span>
          </nav>

          <div className="category-overview-hero">
            <h1 id="categories-overview-title">{content.title}</h1>
            <p id="categories-overview-copy">{content.copy}</p>
            <ModeToggle mode={mode} onModeChange={setMode} />
          </div>

          <div className="category-overview-grid" aria-label={`${mode} categories`}>
            {categories.map((category) => (
              <CategoryCard
                category={category}
                mode={mode}
                variant="overview"
                key={category.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
