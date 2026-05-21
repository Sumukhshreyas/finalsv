"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Catalogue, Mode, ModeContent } from "@/data/types";
import { useMode } from "@/context/ModeContext";
import { getBrands } from "@/lib/dataUtils";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ModeToggle } from "@/components/home/ModeToggle";
import { BrandMarquee } from "@/components/home/BrandMarquee";

interface HeroSectionProps {
  modes: Catalogue["modes"];
  children?: ReactNode;
}

function splitTitle(title: string): { before: string; accent: string; after: string } {
  const match = title.match(/^(.*)<span>(.*)<\/span>(.*)$/);

  if (!match) {
    return { before: title, accent: "", after: "" };
  }

  return {
    before: match[1],
    accent: match[2],
    after: match[3],
  };
}

function renderTitle(content: ModeContent) {
  const title = splitTitle(content.home.title);

  return (
    <>
      {title.before}
      {title.accent ? <span>{title.accent}</span> : null}
      {title.after}
    </>
  );
}

function HeroPoint({ point }: { point: string }) {
  return (
    <div className="hero-point">
      <span className="hero-point-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="m5 12 4 4 10-10" />
        </svg>
      </span>
      <span>{point}</span>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  );
}

export function HeroSection({ modes, children }: HeroSectionProps) {
  const { mode, setMode } = useMode();
  const currentMode: Mode = mode;
  const content = modes[currentMode];
  const brands = getBrands(currentMode);

  return (
    <section className="page active" id="page-home">
      <div className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div>
              <h1 className="hero-title">{renderTitle(content)}</h1>
              <p className="hero-copy">{content.home.copy}</p>
              <div className="hero-points" aria-label="Business highlights">
                {content.home.points.map((point) => (
                  <HeroPoint point={point} key={point} />
                ))}
              </div>
              <div className="hero-actions" aria-label="Hero actions">
                <Link className="hero-cta primary" href="/search">
                  <SearchIcon />
                  <span>{content.nav.search}</span>
                </Link>
                <Link className="hero-cta secondary" href="/categories">
                  <GridIcon />
                  <span>Browse by Category</span>
                </Link>
              </div>
            </div>
            <HeroSlideshow />
            <BrandMarquee brands={brands} label="Our Brands" />
            <ModeToggle mode={currentMode} onModeChange={setMode} />
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
