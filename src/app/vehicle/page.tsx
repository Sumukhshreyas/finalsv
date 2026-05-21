import type { Metadata } from "next";
import { VehicleListing } from "@/components/vehicle/VehicleListing";
import { SeoJsonLd } from "@/components/shared/SeoJsonLd";
import { buildBreadcrumbListJsonLd } from "@/lib/seoHelpers";
import { buildMetadata } from "@/lib/seoHelpers";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Vehicle Types | SV Enterprises",
    description:
      "Browse vehicle segments in automobile mode or switch to industrial application types from the same catalog.",
    path: "/vehicle/",
    keywords: [
      "SV Enterprises",
      "vehicle types",
      "automobile vehicle segments",
      "industrial application types",
    ],
  });
}

export default function VehicleListingPage() {
  return (
    <>
      <SeoJsonLd
        data={buildBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Vehicle Types", path: "/vehicle/" },
        ])}
      />
      <VehicleListing />
    </>
  );
}
