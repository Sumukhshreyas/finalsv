interface EnquiryActionsProps {
  callHref: string;
  pdfHref: string;
  pdfLabel: string;
  noteLabel: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryLabel: string;
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M20.2 5.8A10 10 0 0 0 4.3 17.5L3 21l3.6-1.2A10 10 0 1 0 20.2 5.8Z" />
      <path d="M8.8 9.3c.2-.5.4-.5.7-.5h.6c.2 0 .4 0 .6.4l.8 1.8c.1.3.1.5 0 .7l-.5.6c-.2.2-.2.4 0 .7.2.3.8 1.2 1.8 1.8 1 .6 1.8.8 2.1.8.3 0 .5 0 .6-.2l.7-.8c.2-.2.4-.2.7-.1l1.7.8c.3.1.5.4.4.7-.1.7-.5 1.3-1.1 1.6-.7.3-1.5.4-2.5.2-1.8-.4-3.7-1.6-5.2-3.1s-2.7-3.4-3.1-5.2c-.2-1-.1-1.8.2-2.5.3-.6.9-1 1.6-1.1Z" />
    </svg>
  );
}

function CallIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M22 16.9v2.8a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.4 19.4 0 0 1 5.4 12a19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.3 1h2.8a2 2 0 0 1 2 1.7c.1.8.3 1.6.5 2.4a2 2 0 0 1-.5 2L8 7.9a16 16 0 0 0 8.1 8.1l.8-.8a2 2 0 0 1 2-.5c.8.2 1.6.4 2.4.5a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function formatNoteLabel(noteLabel: string) {
  return noteLabel.replace(/<br\s*\/?>/gi, " ");
}

export function EnquiryActions({
  callHref,
  pdfHref,
  pdfLabel,
  noteLabel,
  primaryHref,
  primaryLabel,
  secondaryLabel,
}: EnquiryActionsProps) {
  return (
    <div className="actions" aria-label="Product enquiry actions">
      <a
        className="detail-primary-btn"
        href={primaryHref}
        rel="noopener noreferrer"
        target="_blank"
      >
        <WhatsAppIcon />
        <span>{primaryLabel}</span>
      </a>

      <div className="detail-secondary-row">
        <a className="detail-secondary-btn" href={callHref}>
          <CallIcon />
          <span>{secondaryLabel}</span>
        </a>

        <div
          className="detail-note-btn"
          aria-label={formatNoteLabel(noteLabel)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: '#c05600' }}>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
          <span>{formatNoteLabel(noteLabel)}</span>
        </div>
      </div>
    </div>
  );
}
