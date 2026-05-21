import { notFound } from "next/navigation";
import type { Mode } from "@/data/types";
import { getCatalogue, getCategoryBySlug, getProductBySlug } from "@/lib/dataUtils";
import { isMode } from "@/lib/modeUtils";

export type ProductRouteParams = {
  categorySlug: string;
  mode: string;
  productSlug: string;
};

export interface ResolvedProductPageData {
  category: NonNullable<ReturnType<typeof getCategoryBySlug>>;
  detail: ReturnType<typeof getCatalogue>["modes"]["automobile"]["detail"];
  mode: Mode;
  product: NonNullable<ReturnType<typeof getProductBySlug>>;
}

export async function resolveProductPageData(
  params: Promise<ProductRouteParams>,
): Promise<ResolvedProductPageData> {
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
