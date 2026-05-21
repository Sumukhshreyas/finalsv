"use client";

import type { Brand } from "@/data/types";

interface BrandMarqueeProps {
  brands: Brand[];
  label?: string;
}

export function BrandMarquee({
  brands,
  label = "Our Brands",
}: BrandMarqueeProps) {
  const repeated = [...brands, ...brands];

  return (
    <div className="hero-brand-panel" aria-label="SV Enterprises brands">
      <div className="hero-brand-label">{label}</div>
      <div className="hero-brand-list">
        {repeated.map((brand, index) => (
          <span className="hero-brand-pill" key={`${brand.id}-${index}`}>
            {brand.name}
          </span>
        ))}
      </div>
    </div>
  );
}
