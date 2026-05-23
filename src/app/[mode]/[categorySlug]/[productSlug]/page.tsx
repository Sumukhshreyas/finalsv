import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Mode } from "@/data/types";
import { SeoJsonLd } from "@/components/shared/SeoJsonLd";
import { ProductDetail } from "@/components/product/ProductDetail";
import {
  getCatalogue,
  getCategoryBySlug,
  getProductBySlug,
  getStaticProductParams,
} from "@/lib/dataUtils";
import {
  buildBreadcrumbListJsonLd,
  buildProductJsonLd,
  buildProductMetadata,
} from "@/lib/seoHelpers";
import { isMode } from "@/lib/modeUtils";

type ProductRouteParams = {
  categorySlug: string;
  mode: string;
  productSlug: string;
};

type ProductPageProps = {
  params: Promise<ProductRouteParams>;
};

export const dynamicParams = false;

async function resolveProductPage(params: Promise<ProductRouteParams>) {
  const { mode, categorySlug, productSlug } = await params;

  if (!isMode(mode)) {
    notFound();
  }

  const validMode = mode as Mode;
  const category = getCategoryBySlug(validMode, categorySlug);

  if (!category) {
    notFound();
  }

  const product = getProductBySlug(validMode, category.slug, productSlug);

  if (!product) {
    notFound();
  }

  const detail = getCatalogue().modes[validMode].detail;

  return {
    category,
    detail,
    mode: validMode,
    product,
  };
}

export async function generateStaticParams() {
  return getStaticProductParams();
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { mode, product } = await resolveProductPage(params);

  return buildProductMetadata(mode, product);
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { category, detail, mode, product } = await resolveProductPage(params);

  return (
    <section className="section compact">
      <div className="container page-shell">
        <nav className="category-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/categories">Categories</Link>
          <span aria-hidden="true">&gt;</span>
          <Link href={`/${mode}/${category.slug}/`}>{category.title}</Link>
          <span aria-hidden="true">&gt;</span>
          <span>{product.name}</span>
        </nav>

        <SeoJsonLd
          data={buildBreadcrumbListJsonLd([
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories/" },
            { name: category.title, path: `/${mode}/${category.slug}/` },
            {
              name: product.name,
              path: `/${mode}/${category.slug}/${product.slug}/`,
            },
          ])}
        />
        <SeoJsonLd data={buildProductJsonLd(product, mode)} />

        <ProductDetail
          category={category}
          content={detail}
          mode={mode}
          product={product}
        />
      </div>
    </section>
  );
}
