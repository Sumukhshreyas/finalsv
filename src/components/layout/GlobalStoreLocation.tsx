export function GlobalStoreLocation() {
  return (
    <section className="global-store-section">
      <div className="container">
        <div className="gsl-head">
          <div className="gsl-kicker">FIND US</div>
          <h2 className="gsl-title">Visit our store</h2>
        </div>

        <div className="gsl-map-card">
          <div className="gsl-map-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gsl-map-icon">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
              <circle cx="12" cy="12" r="3" fill="#fff" strokeWidth="2"></circle>
            </svg>
            <span>Map preview</span>
          </div>
        </div>

        <div className="gsl-details-card">
          <div className="gsl-card-header">
            <h3>SV Enterprises Auto Parts</h3>
            <p className="gsl-subtitle">Auto Parts Store &middot; Car Repair</p>
            <div className="gsl-badge-wrap">
              <span className="gsl-badge open-now">
                <span className="dot" aria-hidden="true"></span>
                Open now
              </span>
            </div>
          </div>

          <div className="gsl-list">
            <div className="gsl-row">
              <div className="gsl-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="gsl-text-block">
                <span className="gsl-label">ADDRESS</span>
                <span className="gsl-value">No. 11, JC Road, near HDFC Bank,<br/>Sudhama Nagar, Bengaluru &ndash; 560002</span>
              </div>
              <button className="gsl-icon-btn" aria-label="Get Directions">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
              </button>
            </div>

            <div className="gsl-row">
              <div className="gsl-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="gsl-text-block">
                <span className="gsl-label">HOURS</span>
                <span className="gsl-value">Mon &ndash; Sat &middot; 9:00 AM &ndash; 7:00 PM</span>
              </div>
            </div>

            <div className="gsl-row">
              <div className="gsl-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="gsl-text-block">
                <span className="gsl-label">PHONE</span>
                <span className="gsl-value">+91 98XXX XXXXX</span>
              </div>
              <button className="gsl-icon-btn" aria-label="Call Store">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
            </div>
            
            <div className="gsl-toggle-wrap">
              <button className="gsl-toggle-btn" aria-label="Toggle details">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="gsl-actions-row">
              <button className="gsl-pill-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
                Directions
              </button>
              <button className="gsl-pill-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
