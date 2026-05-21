import type { Metadata } from "next";
import { BrandsListing } from "@/components/brands/BrandsListing";
import { SeoJsonLd } from "@/components/shared/SeoJsonLd";
import { buildMetadata } from "@/lib/seoHelpers";
import { buildBreadcrumbListJsonLd } from "@/lib/seoHelpers";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Brands | SV Enterprises",
    description:
      "Browse automobile and industrial brands stocked by SV Enterprises from the JSON catalog.",
    path: "/brands/",
    keywords: [
      "SV Enterprises",
      "automobile brands",
      "industrial brands",
      "OEM brands Bangalore",
    ],
  });
}

export default function BrandsPage() {
  return (
    <>
      <SeoJsonLd
        data={buildBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands/" },
        ])}
      />
      <BrandsListing />
    </>
  );
}
