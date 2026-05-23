"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/assets/hero-machine-parts-cutout.svg",
    alt: "Construction and industrial spare parts diagram",
  },
  {
    src: "/assets/car-sedan-cutout.svg",
    alt: "Sedan automobile spare parts diagram",
  },
  {
    src: "/assets/car-suv-cutout.svg",
    alt: "SUV automobile spare parts diagram",
  },
];

export function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % SLIDES.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="hero-visual-card"
      aria-label="Vehicle spare parts slideshow"
    >
      {SLIDES.map((slide, index) => (
        <div
          className={`hero-slide${index === activeSlide ? " active" : ""}`}
          key={slide.src}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            width={640}
            height={420}
            priority
          />
        </div>
      ))}
    </div>
  );
}
