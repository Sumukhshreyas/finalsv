"use client";

import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import type { ContactItem, Mode } from "@/data/types";
import { getCatalogue } from "@/lib/dataUtils";
import { ModeToggle } from "@/components/home/ModeToggle";
import { buildWhatsAppUrl, normalizeWhatsAppPhone } from "@/lib/whatsappUtils";

function getContactHref(
  item: ContactItem,
  mode: Mode,
  whatsappPhone: string,
  contactCopy: string,
) {
  if (item.label === "WhatsApp") {
    return buildWhatsAppUrl(
      whatsappPhone,
      `Hello SV Enterprises, I want to enquire about ${mode} products.\n${contactCopy}`,
    );
  }

  if (item.label === "Call") {
    return `tel:${normalizeWhatsAppPhone(item.value)}`;
  }

  if (item.label === "Email") {
    return `mailto:${item.value}`;
  }

  return "#";
}

function getMapHref(address: string) {
  const query = encodeURIComponent(address);

  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function ContactPageShell() {
  const { mode, setMode } = useMode();
  const catalogue = getCatalogue();
  const modeContent = catalogue.modes[mode];
  const content = modeContent.contactPage;
  const whatsappPhone =
    modeContent.home.contactList.find((item) => item.label === "WhatsApp")
      ?.value || "+91 98765 43210";
  const mapHref = getMapHref(content.address);

  return (
    <section className="section compact" aria-labelledby="contact-page-title">
      <div className="container page-shell">
        <nav className="category-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <span>Contact</span>
        </nav>

        <div className="contact-page">
          <article className="biz-card">
            <span className="kicker">{content.subtitle}</span>
            <h1 id="contact-page-title">{content.title}</h1>
            <p>{content.copy}</p>

            <div className="contact-actions">
              <ModeToggle mode={mode} onModeChange={setMode} />
            </div>

            <div
              className="contact-list"
              aria-label={`${mode} contact options`}
            >
              {modeContent.home.contactList.map((item) => (
                <a
                  className="biz-row contact-row"
                  href={getContactHref(item, mode, whatsappPhone, content.copy)}
                  key={item.label}
                >
                  <span className="cat-icon contact-icon" aria-hidden="true">
                    {item.label.slice(0, 2).toUpperCase()}
                  </span>
                  <span>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>
                </a>
              ))}
            </div>

            <div className="biz-row">
              <span className="cat-icon" aria-hidden="true">
                AD
              </span>
              <span>
                <small>Address</small>
                <strong>{content.address}</strong>
              </span>
            </div>
          </article>

          <div className="contact-side">
            <article className="hours-card">
              <span className="kicker">{content.hoursKicker}</span>
              <h2>{content.hoursTitle}</h2>
              <p>
                {content.hoursCopy.split("<br>").map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            </article>

            <article className="map-card">
              <div>
                <span className="kicker">{content.mapTitle}</span>
                <p>{content.mapCopy}</p>
                <a
                  className="mini-btn"
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
