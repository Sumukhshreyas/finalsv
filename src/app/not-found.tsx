import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section compact">
      <div className="container page-shell">
        <div className="contact-page">
          <article className="biz-card">
            <span className="kicker">404</span>
            <h1>Page not found</h1>
            <p>
              The page you requested is unavailable. Use the links below to return
              to the catalogue.
            </p>

            <div className="contact-list">
              <Link className="biz-row contact-row" href="/">
                <span className="cat-icon" aria-hidden="true">
                  HM
                </span>
                <span>
                  <small>Home</small>
                  <strong>Return to the homepage</strong>
                </span>
              </Link>
              <Link className="biz-row contact-row" href="/categories">
                <span className="cat-icon" aria-hidden="true">
                  CT
                </span>
                <span>
                  <small>Categories</small>
                  <strong>Browse product categories</strong>
                </span>
              </Link>
              <Link className="biz-row contact-row" href="/search">
                <span className="cat-icon" aria-hidden="true">
                  SR
                </span>
                <span>
                  <small>Search</small>
                  <strong>Find a part or product</strong>
                </span>
              </Link>
              <Link className="biz-row contact-row" href="/brands">
                <span className="cat-icon" aria-hidden="true">
                  BR
                </span>
                <span>
                  <small>Brands</small>
                  <strong>See stocked brands</strong>
                </span>
              </Link>
              <Link className="biz-row contact-row" href="/contact">
                <span className="cat-icon" aria-hidden="true">
                  CO
                </span>
                <span>
                  <small>Contact</small>
                  <strong>Reach SV Enterprises</strong>
                </span>
              </Link>
            </div>
          </article>

          <div className="contact-side">
            <article className="hours-card">
              <span className="kicker">Need help?</span>
              <h2>Use the catalogue links</h2>
              <p>
                This route may have been moved or removed. Search by OEM number,
                browse categories, or contact the team directly.
              </p>
            </article>

            <article className="map-card">
              <div>
                <span className="kicker">Quick navigation</span>
                <p>Stay on the site and continue browsing SV Enterprises.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
