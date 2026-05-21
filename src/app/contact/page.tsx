import type { Metadata } from "next";
import { ContactPageShell } from "@/components/contact/ContactPageShell";
import { SeoJsonLd } from "@/components/shared/SeoJsonLd";
import { getCatalogue } from "@/lib/dataUtils";
import { buildBreadcrumbListJsonLd } from "@/lib/seoHelpers";
import { buildMetadata } from "@/lib/seoHelpers";

export function generateMetadata(): Metadata {
  const catalogue = getCatalogue();
  const description = catalogue.modes.automobile.contactPage.copy;

  return buildMetadata({
    title: "Contact SV Enterprises | Bangalore Wholesale Dealer",
    description,
    path: "/contact/",
    keywords: [
      "SV Enterprises",
      "contact SV Enterprises",
      "Bangalore wholesale dealer",
      "automobile spare parts contact",
    ],
  });
}

export default function ContactPage() {
  return (
    <>
      <SeoJsonLd
        data={buildBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />
      <ContactPageShell />
    </>
  );
}
