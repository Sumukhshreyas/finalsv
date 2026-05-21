"use client";

import Link from "next/link";
import Image from "next/image";
import type { Mode, Product } from "@/data/types";
import { getProductUrl } from "@/lib/dataUtils";
import { getAssetPath, getFallbackInitials } from "@/components/catalog/cardUtils";

interface ProductCardProps {
  mode: Mode;
  product: Product;
  variant?: "grid" | "list";
}

export function ProductCard({ mode, product, variant = "grid" }: ProductCardProps) {
  const imagePath = getAssetPath(product.imageUrl);
  const productUrl = getProductUrl(product, mode);

  return (
    <Link className={`catalog-card catalog-card--${variant}`} href={productUrl}>
      <div className="catalog-card-visual">
        {imagePath ? (
          <Image src={imagePath} alt={product.name} width={240} height={170} />
        ) : (
          <span className="catalog-visual-fallback">
            {product.imageFallbackInitials || getFallbackInitials(product.name)}
          </span>
        )}
      </div>
      <div className="catalog-card-content">
        <h3>{product.name}</h3>
        <div className="catalog-oem">OEM: {product.oemNumber}</div>
        <div className="catalog-desc">{product.shortDescription}</div>
        <span className="catalog-brand">{product.brand}</span>
      </div>
      <span className="catalog-enquire catalog-card-action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 11.5A8.5 8.5 0 0 1 7.53 19l-3.53 1 1.04-3.38A8.5 8.5 0 1 1 20 11.5Z" />
          <path d="M8.5 9.5c.2 2 1.8 3.8 3.8 4.2" />
        </svg>
        Enquire
      </span>
    </Link>
  );
}
