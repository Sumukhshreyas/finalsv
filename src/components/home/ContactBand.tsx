"use client";

import type { Mode } from "@/data/types";
import { useMode } from "@/context/ModeContext";
import { getCatalogue } from "@/lib/dataUtils";
import { buildWhatsAppUrl, normalizeWhatsAppPhone } from "@/lib/whatsappUtils";

function buildGeneralWhatsAppUrl(
  mode: Mode,
  phone: string,
  contactCopy: string,
) {
  return buildWhatsAppUrl(
    phone,
    `Hello SV Enterprises, I want to enquire about ${mode} products on the homepage.\n${contactCopy}`,
  );
}

function getContactHref(
  label: string,
  value: string,
  mode: Mode,
  copy: string,
  phone: string,
) {
  if (label === "WhatsApp") {
    return buildGeneralWhatsAppUrl(mode, phone, copy);
  }

  if (label === "Call") {
    return `tel:${normalizeWhatsAppPhone(value)}`;
  }

  if (label === "Email") {
    return `mailto:${value}`;
  }

  return "#";
}

export function ContactBand() {
  const { mode } = useMode();
  const catalogue = getCatalogue();
  const content = catalogue.modes[mode].home;
  const whatsappPhone =
    content.contactList.find((item) => item.label === "WhatsApp")?.value ||
    "+91 98765 43210";

  return (
    <section className="section compact" aria-labelledby="home-contact-title">
      <div className="container">
        <div className="contact-band">
          <div className="contact-band-grid">
            <div>
              <h2 id="home-contact-title">{content.contactTitle}</h2>
              <p id="home-contact-copy">{content.contactCopy}</p>
            </div>
            <div className="contact-list" id="home-contact-list">
              {content.contactList.map((item) => (
                <a
                  className="biz-row contact-row"
                  href={getContactHref(
                    item.label,
                    item.value,
                    mode,
                    content.contactCopy,
                    whatsappPhone,
                  )}
                  key={item.label}
                >
                  <span className="cat-icon" aria-hidden="true">
                    {item.label.slice(0, 2).toUpperCase()}
                  </span>
                  <span>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
