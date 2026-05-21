"use client";

import Link from "next/link";
import type { VehicleEntity } from "@/data/types";
import { getVehicleEntityUrl } from "@/lib/dataUtils";
import { getFallbackInitials } from "@/components/catalog/cardUtils";

interface VehicleCardProps {
  entity: VehicleEntity;
}

function TractorsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M9 27V15h7l5 12" />
      <path d="M21 27h14l-3-9h-8" />
      <path d="M26 18v-6h7v6" />
      <circle cx="13" cy="32" r="6" />
      <circle cx="34" cy="32" r="5" />
      <path d="M8 32h-4M19 32h9M39 32h5M13 26v-6M13 20h-5" />
    </svg>
  );
}

function BusTrailersIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="5" y="13" width="32" height="18" rx="3" />
      <path d="M37 20h5v11h-5M10 18h7M20 18h7M30 18h4M9 31v5M34 31v5M12 36h20" />
      <circle cx="13" cy="36" r="3" />
      <circle cx="34" cy="36" r="3" />
    </svg>
  );
}

function ConstructionIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M7 32h16V18h-8L7 32Z" />
      <path d="M23 32h10l8-11M16 18V7M16 7h11M27 7l-6 11" />
      <path d="M8 32v5h30v-5" />
      <circle cx="14" cy="37" r="4" />
      <circle cx="31" cy="37" r="4" />
    </svg>
  );
}

function ThreeWheelerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 30V17h18l7 8v5" />
      <path d="M26 17v13M10 21h10M33 25h6v5h-6" />
      <circle cx="14" cy="34" r="4" />
      <circle cx="31" cy="34" r="4" />
      <path d="M18 34h9M35 34h6" />
    </svg>
  );
}

function TwoWheelerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="11" cy="34" r="6" />
      <circle cx="37" cy="34" r="6" />
      <path d="M17 34h9l7-13h-8M20 20h7l-4 14M28 16h5M9 28l6-7h7" />
    </svg>
  );
}

function ForkliftIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M12 33V13h7v20" />
      <path d="M19 29h11l7-14M37 15v18M9 33h30" />
      <circle cx="15" cy="37" r="4" />
      <circle cx="31" cy="37" r="4" />
      <path d="M37 13h5M37 19h5M37 25h5" />
    </svg>
  );
}

function EntityIcon({ entity }: { entity: VehicleEntity }) {
  if ("badge" in entity) {
    return <span>{entity.badge}</span>;
  }

  switch (entity.slug) {
    case "tractors":
      return <TractorsIcon />;
    case "bus-trailers":
      return <BusTrailersIcon />;
    case "construction":
      return <ConstructionIcon />;
    case "three-wheeler":
      return <ThreeWheelerIcon />;
    case "two-wheeler":
      return <TwoWheelerIcon />;
    case "forklift":
      return <ForkliftIcon />;
    default:
      return <span>{getFallbackInitials(entity.title)}</span>;
  }
}

export function VehicleCard({ entity }: VehicleCardProps) {
  return (
    <Link className="vehicle-type-card" href={getVehicleEntityUrl(entity)}>
      <span className="vehicle-type-icon" aria-hidden="true">
        <EntityIcon entity={entity} />
      </span>
      <span>
        <strong>{entity.title}</strong>
        <small>{entity.description}</small>
      </span>
    </Link>
  );
}
