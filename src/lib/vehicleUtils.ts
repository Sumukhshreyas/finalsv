import type { VehicleEntity } from "@/data/types";

export interface VehiclePartLink {
  href: string;
  label: string;
}

const CATEGORY_LINKS = {
  automobile: {
    brakeParts: { href: "/automobile/brake-parts/", label: "Brake Parts" },
    bodyParts: { href: "/automobile/body-parts/", label: "Body Parts" },
    cooling: { href: "/automobile/cooling/", label: "Cooling" },
    electrical: { href: "/automobile/electrical/", label: "Electrical" },
    engineParts: { href: "/automobile/engine-parts/", label: "Engine Parts" },
    filters: { href: "/automobile/filters/", label: "Filters" },
    suspension: { href: "/automobile/suspension/", label: "Suspension" },
    transmission: { href: "/automobile/transmission/", label: "Transmission" },
  },
  industrial: {
    bearings: { href: "/industrial/bearings/", label: "Bearings" },
    gearboxes: { href: "/industrial/gearboxes/", label: "Gearboxes" },
    hydraulicParts: {
      href: "/industrial/hydraulic-hoses/",
      label: "Hydraulic Parts",
    },
    motors: { href: "/industrial/motors/", label: "Motors" },
    pneumaticParts: {
      href: "/industrial/pneumatic-parts/",
      label: "Pneumatic Parts",
    },
    sealsAndCouplings: {
      href: "/industrial/seals-and-couplings/",
      label: "Seals and Couplings",
    },
  },
} as const;

function matchVehicleLink(part: string): VehiclePartLink | null {
  const normalized = part.toLowerCase();

  if (
    /(air brake|brake|brake shoe|brake drum|brake lining|brake pad|brake caliper|master cylinder)/.test(
      normalized,
    )
  ) {
    return CATEGORY_LINKS.automobile.brakeParts;
  }

  if (
    /(clutch|pressure plate|drive belt|chain sprocket|gearbox|gear set)/.test(
      normalized,
    )
  ) {
    return CATEGORY_LINKS.automobile.transmission;
  }

  if (
    /(air filter|fuel filter|oil filter|filter assembly)/.test(normalized)
  ) {
    return CATEGORY_LINKS.automobile.filters;
  }

  if (/(radiator|cooling hose|radiator hose)/.test(normalized)) {
    return CATEGORY_LINKS.automobile.cooling;
  }

  if (
    /(lamp|light|indicator|relay|starter motor|alternator|sensor|switch|battery)/.test(
      normalized,
    )
  ) {
    return CATEGORY_LINKS.automobile.electrical;
  }

  if (
    /(steering|joint|shock|spring|bush|engine mount|wheel bearing|load wheel bearing)/.test(
      normalized,
    )
  ) {
    return CATEGORY_LINKS.automobile.suspension;
  }

  if (/(mirror|body|tail lamp|head lamp)/.test(normalized)) {
    return CATEGORY_LINKS.automobile.bodyParts;
  }

  return null;
}

function matchIndustrialLink(part: string): VehiclePartLink | null {
  const normalized = part.toLowerCase();

  if (
    /(bearing housing|bearing|roller bearing|wheel bearing|take-up bearing|load wheel bearing|deep groove bearing)/.test(
      normalized,
    )
  ) {
    return CATEGORY_LINKS.industrial.bearings;
  }

  if (
    /(hydraulic|hose|pump|seal kit|seal|valve|pressure gauge|fittings|breather)/.test(
      normalized,
    ) || /return line filter/.test(normalized)
  ) {
    return CATEGORY_LINKS.industrial.hydraulicParts;
  }

  if (/(geared motor|motor|motor pulley|motor terminal box)/.test(normalized)) {
    return CATEGORY_LINKS.industrial.motors;
  }

  if (/(pneumatic cylinder|solenoid valve)/.test(normalized)) {
    return CATEGORY_LINKS.industrial.pneumaticParts;
  }

  if (/(jaw coupling|chain coupling|flexible coupling|coupling|packing|shaft sleeve)/.test(normalized)) {
    return CATEGORY_LINKS.industrial.sealsAndCouplings;
  }

  if (/(gearbox|reduction gear)/.test(normalized)) {
    return CATEGORY_LINKS.industrial.gearboxes;
  }

  return null;
}

export function getVehiclePartLink(
  entity: VehicleEntity,
  part: string,
): VehiclePartLink | null {
  const partLink =
    "badge" in entity ? matchIndustrialLink(part) : matchVehicleLink(part);

  return partLink;
}

export function getVehicleEntityKicker(entity: VehicleEntity): string {
  return "badge" in entity ? "Product Range For" : "Vehicle Type";
}

export function getVehicleEntityCaption(entity: VehicleEntity): string {
  return "badge" in entity
    ? "Common industrial application parts"
    : "Common vehicle segment parts";
}
