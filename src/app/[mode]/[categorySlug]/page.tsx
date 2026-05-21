import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Mode } from "@/data/types";
import { CatalogListingShell } from "@/components/catalog/CatalogListingShell";
import { CategoryChipRow } from "@/components/catalog/CategoryChipRow";
import { SeoJsonLd } from "@/components/shared/SeoJsonLd";
import { getCatalogue } from "@/lib/dataUtils";
import {
  getCategories,
  getCategoryBySlug,
  getCategoryProducts,
  getStaticCategoryParams,
} from "@/lib/dataUtils";
import { buildBreadcrumbListJsonLd, buildCategoryMetadata, buildItemListJsonLd } from "@/lib/seoHelpers";
import { isMode } from "@/lib/modeUtils";

type CategoryRouteParams = {
  mode: string;
  categorySlug: string;
};

type CategoryPageProps = {
  params: Promise<CategoryRouteParams>;
};

export const dynamicParams = false;

async function resolveCategoryPage(params: Promise<CategoryRouteParams>) {
  const { mode, categorySlug } = await params;

  if (!isMode(mode)) {
    notFound();
  }

  const validMode = mode as Mode;
  const category = getCategoryBySlug(validMode, categorySlug);

  if (!category) {
    notFound();
  }

  const products = getCategoryProducts(validMode, category.slug);
  const categories = getCategories(validMode);

  return {
    mode: validMode,
    category,
    categories,
    products,
  };
}

export async function generateStaticParams() {
  return getStaticCategoryParams();
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category, mode } = await resolveCategoryPage(params);

  return buildCategoryMetadata(mode, category);
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { mode, category, categories, products } = await resolveCategoryPage(params);
  const catalogue = getCatalogue();
  const filterPanel = catalogue.modes[mode].filterPanel;
  const brandField = filterPanel.fields[1];
  const compatibilityField = filterPanel.fields[2];

  return (
    <section className="section compact">
      <div className="container page-shell">
        <div className="category-catalog">
          <nav className="category-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <Link href="/categories">Categories</Link>
            <span aria-hidden="true">&gt;</span>
            <span>{category.title}</span>
          </nav>

          <SeoJsonLd
            data={buildBreadcrumbListJsonLd([
              { name: "Home", path: "/" },
              { name: "Categories", path: "/categories/" },
              { name: category.title, path: `/${mode}/${category.slug}/` },
            ])}
          />
          <SeoJsonLd data={buildItemListJsonLd(mode, category, products)} />

          <div className="catalog-hero">
            <div className="catalog-title">
              <h1>{category.title}</h1>
              <p>{category.catalogueCopy}</p>
            </div>
          </div>

          <CategoryChipRow
            activeCategorySlug={category.slug}
            categories={categories}
            mode={mode}
          />

          <CatalogListingShell
            brandLabel={brandField.label}
            brandPlaceholder={brandField.placeholder}
            categoryTitle={category.title}
            compatibilityLabel={compatibilityField.label}
            compatibilityPlaceholder={compatibilityField.placeholder}
            filterPanelCopy={filterPanel.copy}
            filterPanelTitle={filterPanel.title}
            mode={mode}
            products={products}
          />
        </div>
      </div>
    </section>
  );
}
