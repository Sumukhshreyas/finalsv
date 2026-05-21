import type { Metadata } from "next";
import { ProductPdfView } from "@/components/product/ProductPdfView";
import { resolveProductPageData } from "@/lib/productPageData";

type ProductPdfPageProps = {
  params: Promise<{
    categorySlug: string;
    mode: string;
    productSlug: string;
  }>;
};

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Product PDF Download",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ProductPdfPage({ params }: ProductPdfPageProps) {
  const { category, mode, product } = await resolveProductPageData(params);

  return <ProductPdfView category={category} mode={mode} product={product} />;
}
