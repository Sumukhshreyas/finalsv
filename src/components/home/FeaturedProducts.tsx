"use client";

import Image from "next/image";
import Link from "next/link";
import type { FeaturedProductReference, Mode, Product } from "@/data/types";
import { useMode } from "@/context/ModeContext";
import {
  getCatalogue,
  getProductUrl,
} from "@/lib/dataUtils";
import { findBySlug } from "@/lib/slugUtils";
import { buildProductWhatsAppUrl } from "@/lib/whatsappUtils";

function resolveFeaturedProduct(
  mode: Mode,
  reference: FeaturedProductReference,
): { product: Product; code: string } | null {
  const catalogue = getCatalogue();
  const category = catalogue.categories[mode].find(
    (item) => item.title === reference.category,
  );

  if (!category) {
    return null;
  }

  const product = findBySlug(
    catalogue.products[mode][category.slug] || [],
    reference.product,
  );

  if (!product) {
    return null;
  }

  return {
    product,
    code: reference.code,
  };
}

function ProductImage({
  product,
  code,
}: {
  product: Product;
  code: string;
}) {
  if (!product.imageUrl) {
    return <span aria-hidden="true">{code}</span>;
  }

  return (
    <Image
      src={product.imageUrl}
      alt=""
      aria-hidden="true"
      width={108}
      height={72}
    />
  );
}

export function FeaturedProducts() {
  const { mode } = useMode();
  const catalogue = getCatalogue();
  const content = catalogue.modes[mode];
  const references = content.home.featured;
  const whatsappPhone =
    content.home.contactList.find((item) => item.label === "WhatsApp")?.value ||
    "+91 98765 43210";
  const products = references
    .map((reference) => resolveFeaturedProduct(mode, reference))
    .filter((item): item is { product: Product; code: string } => item !== null);

  return (
    <section className="section" aria-labelledby="home-featured-title">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">Popular</div>
            <h2 className="section-title" id="home-featured-title">
              {content.home.featuredTitle}
            </h2>
          </div>
        </div>
        <div className="product-strip" aria-label={`${mode} featured products`}>
          {products.map(({ product, code }) => {
            const productUrl = getProductUrl(product, mode);
            const enquireUrl = buildProductWhatsAppUrl(
              whatsappPhone,
              product,
              mode,
            );

            return (
              <article className="product-tile" key={product.id}>
                <Link href={productUrl}>
                  <div className="product-img">
                    <ProductImage code={code} product={product} />
                  </div>
                  <div className="product-body">
                    <h3>{product.name}</h3>
                    <div className="meta">OEM: {product.oemNumber}</div>
                    <div className="brand-text">{product.brand}</div>
                  </div>
                </Link>
                <button
                  className="mini-btn enquire"
                  type="button"
                  onClick={() => {
                    window.open(enquireUrl, "_blank", "noopener,noreferrer");
                  }}
                >
                  Enquire
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
