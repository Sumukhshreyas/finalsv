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
            <span className="spec-bullet">&bull;</span>
            <span className="spec-text">
              <span className="spec-label">{row.label}:</span>{" "}
              <span className="spec-value">{row.value}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
