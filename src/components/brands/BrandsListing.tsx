"use client";

import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { getBrands, getCatalogue } from "@/lib/dataUtils";
import { ModeToggle } from "@/components/home/ModeToggle";
import { BrandCard } from "@/components/brands/BrandCard";

export function BrandsListing() {
  const { mode, setMode } = useMode();
  const catalogue = getCatalogue();
  const content = catalogue.modes[mode].brandsPage;
  const brands = getBrands(mode);

  return (
    <section className="section compact">
      <div className="container page-shell">
        <div className="category-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <span>Brands</span>
        </div>

        <div className="category-overview-hero">
          <p className="kicker section-kicker">Manufacturers</p>
          <h1>{content.title}</h1>
          <p>{content.copy}</p>
          <ModeToggle mode={mode} onModeChange={setMode} />
        </div>

        <div className="brands-grid" aria-label={`${mode} brands`}>
          {brands.map((brand) => (
            <BrandCard key={brand.id} name={brand.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
