interface TechSpecRow {
  label: string;
  value: string;
}

interface TechSpecsProps {
  rows: TechSpecRow[];
  title: string;
}

export function TechSpecs({ rows, title }: TechSpecsProps) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <div className="spec-grid" role="list" aria-label={title}>
        {rows.map((row) => (
          <div className="spec-item" key={row.label} role="listitem">
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
