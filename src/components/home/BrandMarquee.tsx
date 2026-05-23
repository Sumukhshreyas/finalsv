"use client";

export function BrandMarquee() {
  const dummyBrands = [
    "Annabond", "Ceekay", "Delphi", "Elofic", "Gabriel",
    "Dummy 6", "Dummy 7", "Dummy 8", "Dummy 9", "Dummy 10"
  ];
  // Repeat enough times to fill a wide screen and allow infinite scrolling
  const repeated = [...dummyBrands, ...dummyBrands, ...dummyBrands, ...dummyBrands];

  return (
    <div className="brand-marquee-section" aria-label="Our Brands">
      <div className="brand-marquee-label">OUR BRANDS</div>
      <div className="brand-marquee-track-container">
        <div className="brand-marquee-track">
          {repeated.map((brand, index) => (
            <span className="brand-marquee-pill" key={`${brand}-${index}`}>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
