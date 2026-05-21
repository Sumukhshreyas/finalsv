import type { Metadata } from "next";
import { SearchPageShell } from "@/components/search/SearchPageShell";
import { SeoJsonLd } from "@/components/shared/SeoJsonLd";
import { buildBreadcrumbListJsonLd } from "@/lib/seoHelpers";
import { buildMetadata } from "@/lib/seoHelpers";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Search Parts | SV Enterprises",
    description:
      "Search SV Enterprises spare parts by OEM number, product name, brand, category, or specification.",
    path: "/search/",
    keywords: [
      "SV Enterprises",
      "search parts",
      "OEM search",
      "industrial product search",
    ],
  });
}

export default function SearchPage() {
  return (
    <>
      <SeoJsonLd
        data={buildBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search/" },
        ])}
      />
      <SearchPageShell />
    </>
  );
}
