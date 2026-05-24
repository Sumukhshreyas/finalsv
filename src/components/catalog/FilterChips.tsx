"use client";

interface FilterChipsProps {
  brandValue: string;
  onClearAll: () => void;
  onRemoveBrand: () => void;
  onRemoveToolType: () => void;
  onRemoveVehicleManufacturer: () => void;
  onRemoveVehicleModel: () => void;
  onRemoveVehicleType: () => void;
  toolTypeValue: string;
  vehicleManufacturerValue: string;
  vehicleModelValue: string;
  vehicleTypeValue: string;
}

export function FilterChips({
  brandValue,
  onClearAll,
  onRemoveBrand,
  onRemoveToolType,
  onRemoveVehicleManufacturer,
  onRemoveVehicleModel,
  onRemoveVehicleType,
  toolTypeValue,
  vehicleManufacturerValue,
  vehicleModelValue,
  vehicleTypeValue,
}: FilterChipsProps) {
  const hasActiveFilters =
    brandValue || vehicleManufacturerValue || vehicleModelValue || toolTypeValue || vehicleTypeValue;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="catalog-filters-active">
      <div className="catalog-chips-scroll">
        {vehicleTypeValue && (
          <button className="filter-chip" type="button" onClick={onRemoveVehicleType}>
            <span>{vehicleTypeValue}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
        {vehicleManufacturerValue && (
          <button className="filter-chip" type="button" onClick={onRemoveVehicleManufacturer}>
            <span>{vehicleManufacturerValue}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
        {vehicleModelValue && (
          <button className="filter-chip" type="button" onClick={onRemoveVehicleModel}>
            <span>{vehicleModelValue}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
        {toolTypeValue && (
          <button className="filter-chip" type="button" onClick={onRemoveToolType}>
            <span>{toolTypeValue}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
        {brandValue && (
          <button className="filter-chip" type="button" onClick={onRemoveBrand}>
            <span>{brandValue}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>
      <button className="filter-clear-all" type="button" onClick={onClearAll}>
        Clear all
      </button>
    </div>
  );
}
