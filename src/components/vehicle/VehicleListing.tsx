"use client";

import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { getCatalogue, getVehiclesForMode } from "@/lib/dataUtils";
import { ModeToggle } from "@/components/home/ModeToggle";
import { VehicleCard } from "@/components/vehicle/VehicleCard";

export function VehicleListing() {
  const { mode, setMode } = useMode();
  const catalogue = getCatalogue();
  const content = catalogue.modes[mode].explore;
  const entities = getVehiclesForMode(mode);

  return (
    <section className="section compact">
      <div className="container page-shell">
        <div className="category-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <span>{content.title}</span>
        </div>

        <div className="catalog-hero">
          <div className="catalog-title">
            <h1>{content.title}</h1>
            <p>{content.copy}</p>
          </div>
          <ModeToggle mode={mode} onModeChange={setMode} />
        </div>

        <div className="vehicle-type-list" aria-label={`${mode} vehicle and application types`}>
          {entities.map((entity) => (
            <VehicleCard entity={entity} key={entity.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
