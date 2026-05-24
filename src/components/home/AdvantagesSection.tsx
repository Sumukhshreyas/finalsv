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

const ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><polyline points="9 10 12 13 15 10"></polyline></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
];

const BADGES = [
  "10,000+ references",
  "500+ B2B partners",
  "Avg. reply < 2 hrs",
  "Verified OEM quality"
];

const COLORS = ["orange", "green", "yellow", "blue"];

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
          {content.advantages.map((advantage, index) => (
            <div 
              className={`advantage-feature-card theme-${COLORS[index % COLORS.length]}`} 
              key={advantage.title}
            >
              <div className="advantage-card-header">
                <div className="advantage-title-group">
                  <div className="advantage-icon-box">
                    {ICONS[index % ICONS.length]}
                  </div>
                  <h3 className="advantage-card-title">{advantage.title}</h3>
                </div>
                <div className="advantage-index">
                  0{index + 1}
                </div>
              </div>
              <p className="advantage-card-copy">{advantage.copy}</p>
              
              <div className="advantage-footer">
                <div className="advantage-badge">
                  {BADGES[index % BADGES.length]}
                </div>
                <button className="advantage-arrow-btn" aria-label={`Read more about ${advantage.title}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
