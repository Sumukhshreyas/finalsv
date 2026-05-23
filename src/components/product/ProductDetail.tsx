import Link from "next/link";
import type {
  Category,
  DetailContent,
  Mode,
  Product,
  TrustItem,
} from "@/data/types";
import { getCatalogue, getCategoryUrl, getProductUrl } from "@/lib/dataUtils";
import { BUSINESS_PHONE } from "@/lib/seoHelpers";
import {
  buildProductWhatsAppUrl,
  normalizeWhatsAppPhone,
} from "@/lib/whatsappUtils";
import { EnquiryActions } from "@/components/product/EnquiryActions";
import { ProductGallery } from "@/components/product/ProductGallery";
import { CompatibilityList } from "@/components/product/CompatibilityList";
import { TrustRow } from "@/components/product/TrustRow";
import { TechSpecs } from "@/components/product/TechSpecs";

interface ProductDetailProps {
  category: Category;
  content: DetailContent;
  mode: Mode;
  product: Product;
}

function formatStockStatus(status: Product["stockStatus"]) {
  switch (status) {
    case "ready-stock":
      return "Ready stock";
    case "available":
      return "Available";
    case "in-stock":
    default:
      return "In Stock";
  }
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function MetaPointIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 21s6-4.35 6-10.2A6 6 0 1 0 6 10.8C6 16.65 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  );
}

function getCallPhone(mode: Mode) {
  const catalogue = getCatalogue();
  const modeContent = catalogue.modes[mode];
  return (
    modeContent.home.contactList.find((item) => item.label === "Call")?.value ||
    BUSINESS_PHONE
  );
}

function getWhatsAppPhone(mode: Mode) {
  const catalogue = getCatalogue();
  const modeContent = catalogue.modes[mode];
  return (
    modeContent.home.contactList.find((item) => item.label === "WhatsApp")
      ?.value || BUSINESS_PHONE
  );
}

function getTrustItems(mode: Mode, content: DetailContent): TrustItem[] {
  if (mode === "automobile") {
    return [
      {
        title: "Genuine Parts",
        subtitle: "OEM grade",
        icon: "shield",
      },
      {
        title: "Fast Dispatch",
        subtitle: "Across Bangalore",
        icon: "truck",
      },
      {
        title: "GST Billing",
        subtitle: "Tax invoice",
        icon: "doc",
      },
    ];
  }

  return content.trust;
}

export function ProductDetail({
  category,
  content,
  mode,
  product,
}: ProductDetailProps) {
  const compatibleItems =
    mode === "automobile"
      ? product.compatibleVehicles || []
      : product.compatibleApplications || [];
  const callPhone = getCallPhone(mode);
  const whatsappPhone = getWhatsAppPhone(mode);
  const enquiryHref = buildProductWhatsAppUrl(whatsappPhone, product, mode);
  const callHref = `tel:${normalizeWhatsAppPhone(callPhone)}`;
  const pdfHref = `${getProductUrl(product, mode)}pdf/`;
  const trustItems = getTrustItems(mode, content);

  const specRows =
    product.technicalSpecs && Object.keys(product.technicalSpecs).length > 0
      ? Object.entries(product.technicalSpecs).map(([label, value]) => ({
          label,
          value,
        }))
      : product.availableSizes && product.availableSizes.length > 0
        ? [
            {
              label: "Available Size",
              value: product.availableSizes.join(", "),
            },
          ]
        : [{ label: "Reference", value: product.oemNumber }];

  return (
    <div className="detail-grid">
      <div className="detail-sheet">
        <div className="detail-hero">
          <Link className="detail-back" href={getCategoryUrl(category, mode)}>
            <BackIcon />
            Back to {category.title}
          </Link>
          <button
            aria-label="Save product"
            className="detail-favorite"
            type="button"
          >
            <HeartIcon />
          </button>
          <ProductGallery product={product} />
        </div>

        <div className="detail-body">
          <div className="detail-topbar">
            <div>
              <h1>{product.name}</h1>
              <span className="stock-pill">
                {formatStockStatus(product.stockStatus)}
              </span>
            </div>
          </div>

          <div className="oem-chip">OEM: {product.oemNumber}</div>

          <div className="detail-meta-row">
            <span className="brand-chip">{product.brand}</span>
            {content.metaPoints.map((point) => (
              <span className="meta-point" key={point}>
                <MetaPointIcon />
                <span>{point}</span>
              </span>
            ))}
          </div>

          <EnquiryActions
            callHref={callHref}
            pdfHref={pdfHref}
            pdfLabel="Download PDF"
            noteLabel={content.noteLabel}
            primaryHref={enquiryHref}
            primaryLabel={content.primaryLabel}
            secondaryLabel={content.secondaryLabel}
          />

          <TrustRow items={trustItems} />

          <CompatibilityList
            emptyCopy={
              mode === "automobile"
                ? "No compatible vehicles are listed for this product."
                : "No suitable applications are listed for this product."
            }
            items={compatibleItems}
            title={content.compatTitle}
          />

          <TechSpecs rows={specRows} title={content.specTitle} />

          <section className="detail-section">
            <h2>{content.descriptionTitle}</h2>
            <p className="desc">
              {product.fullDescription || product.shortDescription}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
