import Image from "next/image";
import Link from "next/link";
import type { VehicleEntity } from "@/data/types";
import { getAssetPath, getFallbackInitials } from "@/components/catalog/cardUtils";
import { getVehicleEntityCaption, getVehicleEntityKicker, getVehiclePartLink } from "@/lib/vehicleUtils";

interface VehicleDetailProps {
  entity: VehicleEntity;
}

export function VehicleDetail({ entity }: VehicleDetailProps) {
  const imagePath = getAssetPath(entity.imageUrl);
  const kicker = getVehicleEntityKicker(entity);
  const caption = getVehicleEntityCaption(entity);

  return (
    <div className="vehicle-range-grid">
      <div>
        <Link className="range-back" href="/vehicle">
          Back to vehicle types
        </Link>

        <p className="kicker">{kicker}</p>
        <h1>{entity.title}</h1>
        <p>{entity.description}</p>
        <p>{caption}</p>

        <ol className="range-list">
          {entity.parts.map((part, index) => {
            const link = getVehiclePartLink(entity, part);
            const content = (
              <>
                <span className="range-item-icon" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{part}</strong>
                  <small>
                    {link ? `Open ${link.label}` : `Common part for ${entity.title}`}
                  </small>
                </span>
              </>
            );

            return (
              <li key={part}>
                {link ? (
                  <Link className="range-item" href={link.href}>
                    {content}
                  </Link>
                ) : (
                  <div className="range-item">{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="vehicle-range-visual">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={`${entity.title} hero image`}
            width={620}
            height={360}
            priority
          />
        ) : (
          <span className="detail-fallback">
            {getFallbackInitials(entity.title)}
          </span>
        )}
      </div>
    </div>
  );
}
