import type { Metadata } from "next";
import { CategoriesOverview } from "@/components/catalog/CategoriesOverview";
import { SeoJsonLd } from "@/components/shared/SeoJsonLd";
import { buildBreadcrumbListJsonLd } from "@/lib/seoHelpers";
import { buildMetadata } from "@/lib/seoHelpers";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Categories | SV Enterprises",
    description:
      "Browse the active automobile or industrial product categories available from SV Enterprises.",
    path: "/categories/",
    keywords: [
      "SV Enterprises",
      "automobile categories",
      "industrial categories",
      "vehicle product categories",
    ],
  });
}

export default function CategoriesPage() {
  return (
    <>
      <SeoJsonLd
        data={buildBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories/" },
        ])}
      />
      <CategoriesOverview />
    </>
  );
}
