import type { TrustItem } from "@/data/types";

interface TrustRowProps {
  items: TrustItem[];
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z" />
      <path d="M9.5 12.2 11.2 14l3.4-4.2" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

function TrustIcon({ icon }: { icon: TrustItem["icon"] }) {
  switch (icon) {
    case "truck":
      return <TruckIcon />;
    case "doc":
      return <DocumentIcon />;
    case "shield":
    default:
      return <ShieldIcon />;
  }
}

export function TrustRow({ items }: TrustRowProps) {
  return (
    <section className="detail-trust-row" aria-label="Product trust indicators">
      {items.map((item) => (
        <div
          className="detail-trust-item"
          key={`${item.title}-${item.subtitle}`}
        >
          <TrustIcon icon={item.icon} />
          <div className="detail-trust-copy">
            <strong>{item.title}</strong>
            <span>{item.subtitle}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
