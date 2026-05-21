"use client";

import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { getBrands, getCatalogue } from "@/lib/dataUtils";

export function TopBrands() {
  const { mode } = useMode();
  const catalogue = getCatalogue();
  const content = catalogue.modes[mode];
  const brands = getBrands(mode);

  return (
    <section className="section" aria-labelledby="home-brands-title">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker section-kicker" id="home-brands-kicker">
              {content.home.brandsKicker}
            </div>
            <h2 className="section-title" id="home-brands-title">
              {content.home.brandsTitle}
            </h2>
          </div>
          <Link className="text-link" href="/brands">
            View all
          </Link>
        </div>
        <div className="brands-grid" aria-label={`${mode} brands`}>
          {brands.map((brand) => (
            <div className="brand-card" key={brand.id}>
              <strong>{brand.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
