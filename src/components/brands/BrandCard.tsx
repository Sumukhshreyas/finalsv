interface BrandCardProps {
  name: string;
}

function getBrandInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function BrandCard({ name }: BrandCardProps) {
  return (
    <div className="brand-card">
      <span className="brand-mark" aria-hidden="true">
        {getBrandInitials(name)}
      </span>
      <strong>{name}</strong>
    </div>
  );
}
