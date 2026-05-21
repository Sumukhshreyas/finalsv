interface CompatibilityListProps {
  emptyCopy: string;
  items: string[];
  title: string;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CompatibilityList({ emptyCopy, items, title }: CompatibilityListProps) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {items.length > 0 ? (
        <div className="compat-grid">
          {items.map((item) => (
            <div className="compat-item" key={item}>
              <CheckIcon />
              <span>{item}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="desc">{emptyCopy}</p>
      )}
    </section>
  );
}
