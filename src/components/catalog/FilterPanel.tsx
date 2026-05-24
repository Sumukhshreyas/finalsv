"use client";

import { useEffect, useRef } from "react";
import { CustomDropdown } from "./CustomDropdown";

interface FilterPanelProps {
  brandOptions: string[];
  brandValue: string;
  copy: string;
  onApply: () => void;
  onBrandChange: (value: string) => void;
  onClose: () => void;
  onReset: () => void;
  onToolTypeChange: (value: string) => void;
  onVehicleManufacturerChange: (value: string) => void;
  onVehicleModelChange: (value: string) => void;
  onVehicleTypeChange: (value: string) => void;
  open: boolean;
  title: string;
  toolTypeOptions: string[];
  toolTypeValue: string;
  vehicleManufacturerOptions: string[];
  vehicleManufacturerValue: string;
  vehicleModelOptions: string[];
  vehicleModelValue: string;
  vehicleTypeOptions: string[];
  vehicleTypeValue: string;
}

function renderTitle(title: string) {
  const match = title.match(/^(.*)<span>(.*)<\/span>(.*)$/);

  if (!match) {
    return title;
  }

  return (
    <>
      {match[1]}
      <span>{match[2]}</span>
      {match[3]}
    </>
  );
}

export function FilterPanel({
  brandOptions,
  brandValue,
  copy,
  onApply,
  onBrandChange,
  onClose,
  onReset,
  onToolTypeChange,
  onVehicleManufacturerChange,
  onVehicleModelChange,
  onVehicleTypeChange,
  open,
  title,
  toolTypeOptions,
  toolTypeValue,
  vehicleManufacturerOptions,
  vehicleManufacturerValue,
  vehicleModelOptions,
  vehicleModelValue,
  vehicleTypeOptions,
  vehicleTypeValue,
}: FilterPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close filter panel"
        className="filter-backdrop open"
        type="button"
        onClick={onClose}
      />
      <div
        aria-labelledby="catalog-filter-title"
        aria-modal="true"
        className="filter-sheet open"
        role="dialog"
      >
        <div className="filter-head">
          <div>
            <h2 className="filter-title" id="catalog-filter-title">
              {renderTitle(title)}
            </h2>
            <p className="filter-copy">{copy}</p>
          </div>
          <button
            ref={closeButtonRef}
            aria-label="Close filter panel"
            className="close-btn"
            type="button"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form
          className="filter-form"
          onSubmit={(event) => {
            event.preventDefault();
            onApply();
          }}
        >
          <label className="filter-field">
            <span>VEHICLE MANUFACTURER</span>
            <CustomDropdown
              options={vehicleManufacturerOptions}
              value={vehicleManufacturerValue}
              onChange={onVehicleManufacturerChange}
              placeholder="Select Vehicle Manufacturer"
            />
          </label>

          <label className="filter-field">
            <span>VEHICLE MODEL</span>
            <CustomDropdown
              options={vehicleModelOptions}
              value={vehicleModelValue}
              onChange={onVehicleModelChange}
              placeholder="Select Vehicle Model"
            />
          </label>

          <label className="filter-field">
            <span>TOOL TYPE</span>
            <CustomDropdown
              options={toolTypeOptions}
              value={toolTypeValue}
              onChange={onToolTypeChange}
              placeholder="Select Tool Type"
            />
          </label>

          <label className="filter-field">
            <span>VEHICLE TYPE</span>
            <CustomDropdown
              options={vehicleTypeOptions}
              value={vehicleTypeValue}
              onChange={onVehicleTypeChange}
              placeholder="Select Vehicle Type"
            />
          </label>

          <label className="filter-field">
            <span>BRAND</span>
            <CustomDropdown
              options={brandOptions}
              value={brandValue}
              onChange={onBrandChange}
              placeholder="Select Brand"
            />
          </label>

          <div className="filter-actions">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onReset}
            >
              Reset
            </button>
            <button className="btn btn-primary" type="submit">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
