interface CompatibilityListProps {
  emptyCopy: string;
  items: string[];
  title: string;
}

function CarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10h18M5 10l1.5-4.5A2 2 0 0 1 8.4 4h7.2a2 2 0 0 1 1.9 1.5L19 10M4 10v9a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a2 2 0 0 0 2-2v-9" />
      <circle cx="7.5" cy="15.5" r="1.5" />
      <circle cx="16.5" cy="15.5" r="1.5" />
    </svg>
  );
}

export function CompatibilityList({
  emptyCopy,
  items,
  title,
}: CompatibilityListProps) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {items.length > 0 ? (
        <div className="compat-grid">
          {items.map((item) => (
            <div className="compat-item" key={item}>
              <CarIcon />
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
