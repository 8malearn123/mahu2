import type { ReactNode } from "react";

// Line icons for the lobby's list, on a 24px grid, after the ones drawn for Heet's lobby.

type IconProps = { className?: string };

function Line({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M5 8h14l-1.1 12.5H6.1Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </Line>
  );
}

/** A takeaway cup with its lid. */
export function CupIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M6.5 8.5h11l-1.3 12a1 1 0 0 1-1 .9H8.8a1 1 0 0 1-1-.9Z" />
      <path d="M5.5 8.5h13M7 8.5l.6-2.6a1 1 0 0 1 1-.8h6.8a1 1 0 0 1 1 .8l.6 2.6M7.4 13h9.2" />
    </Line>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 21.5s6.5-5.8 6.5-11.2a6.5 6.5 0 0 0-13 0c0 5.4 6.5 11.2 6.5 11.2Z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </Line>
  );
}

/** A car at the window. */
export function CarIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 15.5v-3l1.8-4.6A1.5 1.5 0 0 1 7.2 7h9.6a1.5 1.5 0 0 1 1.4.9L20 12.5v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
      <path d="M4 12.5h16M6.5 16.5V19M17.5 16.5V19" />
      <circle cx="7.5" cy="14" r=".6" fill="currentColor" />
      <circle cx="16.5" cy="14" r=".6" fill="currentColor" />
    </Line>
  );
}

export function GiftIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 11h16v9.5H4ZM3 7.5h18V11H3ZM12 7.5v13" />
      <path d="M12 7.5C10.5 4 7 4 7 5.8 7 7.2 9.5 7.5 12 7.5c2.5 0 5-.3 5-1.7C17 4 13.5 4 12 7.5Z" />
    </Line>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M3.5 8.5h17v11h-17Z" />
      <path d="M9 8.5V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5M3.5 13h17" />
    </Line>
  );
}

/** A shopfront with an awning. */
export function StoreIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 9.5 5.2 4.5h13.6L20 9.5a2.7 2.7 0 0 1-5.3 0 2.7 2.7 0 0 1-5.4 0A2.7 2.7 0 0 1 4 9.5Z" />
      <path d="M5.5 11.5v9h13v-9M10 20.5v-5h4v5" />
    </Line>
  );
}

/** A wave under the sun: the whole journey. */
export function WaveIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M3 17c1.5-1.4 3-1.4 4.5 0s3 1.4 4.5 0 3-1.4 4.5 0 3 1.4 4.5 0" />
      <path d="M7.5 12.5a4.5 4.5 0 0 1 9 0M12 4.5v1.5M5.8 7l1 1M18.2 7l-1 1" />
    </Line>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.5l-5.1 2.7 1-5.6-4.1-4 5.7-.8Z" />
    </Line>
  );
}

export function ChevronIcon({ className, up = false }: IconProps & { up?: boolean }) {
  return (
    <Line className={className}>
      <path d={up ? "M6 14.5l6-6 6 6" : "M6 9.5l6 6 6-6"} />
    </Line>
  );
}

/** The list of sections. */
export function ListIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M5 7h14M5 12h14M5 17h9" />
    </Line>
  );
}

/** Points forward in reading order; the lobby's CSS mirrors it for Arabic. */
export function ArrowIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Line>
  );
}

/** Leaves the site; the lobby's CSS mirrors it for Arabic. */
export function OutIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M7 17L17 7M9 7h8v8" />
    </Line>
  );
}

/** The sea under the sign, as the identity draws it: one swell. */
export function SwellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 10" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M2 6c3.3-3.6 6.7-3.6 10 0s6.7 3.6 10 0 6.7-3.6 10 0 6.7 3.6 10 0" />
    </svg>
  );
}

// ── Social ──────────────────────────────────────────────────────

export function InstagramIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </Line>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M16.6 3h-3.1v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .9.1V9.4a5.9 5.9 0 1 0 5 5.8V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-4.4-4.4Z" />
    </svg>
  );
}

export function SnapchatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2.8c2.9 0 5.1 2.2 5.1 5.3v2.4l1.5-.5c.6-.2 1.1.5.6 1l-1.9 1.3c.7 1.8 2 3.1 3.6 3.6-.3.9-1.7 1.3-3.1 1.5l-.3 1.3c-1.3-.2-2.3 0-3.3.6-1 .6-1.6 1-2.2 1s-1.2-.4-2.2-1c-1-.6-2-.8-3.3-.6l-.3-1.3c-1.4-.2-2.8-.6-3.1-1.5 1.6-.5 2.9-1.8 3.6-3.6l-1.9-1.3c-.5-.5 0-1.2.6-1l1.5.5V8.1c0-3.1 2.2-5.3 5.1-5.3Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.5 3.5h3l-6.6 7.6 7.8 9.4h-6.1l-4.8-5.9-5.5 5.9h-3l7.1-8.1-7.4-8.9h6.2l4.3 5.4Zm-1 15.2h1.7L7.6 5.2H5.8Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M20 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4A8.4 8.4 0 1 1 20 11.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M9 8.3c.3-.6.9-.6 1.1 0l.6 1.4c.1.3 0 .6-.2.8l-.5.5c.6 1.2 1.6 2.2 2.8 2.8l.5-.5c.2-.2.5-.3.8-.2l1.4.6c.6.2.6.8 0 1.1-.9.5-2 .6-3 .1-1.8-.9-3.2-2.3-4-4.1-.5-1-.3-2 .5-2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
