"use client";

import type { Mode } from "@/data/types";
import { useMode } from "@/context/ModeContext";
import { getCatalogue } from "@/lib/dataUtils";

interface ModeContentSummary {
  advantageKicker: string;
  advantageTitle: string;
  advantages: { title: string; copy: string }[];
}

function getModeContent(mode: Mode): ModeContentSummary {
  const catalogue = getCatalogue();
  return catalogue.modes[mode].home;
}

export function AdvantagesSection() {
  const { mode } = useMode();
  const content = getModeContent(mode);

  return (
    <section className="section" aria-labelledby="home-advantage-title">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker" id="home-advantage-kicker">
              {content.advantageKicker}
            </div>
            <h2 className="section-title" id="home-advantage-title">
              {content.advantageTitle}
            </h2>
          </div>
        </div>
        <div className="advantage-grid" aria-label={`${mode} advantages`}>
          {content.advantages.map((advantage) => (
            <div className="brand-card advantage-card" key={advantage.title}>
              <strong>{advantage.title}</strong>
              <p>{advantage.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
