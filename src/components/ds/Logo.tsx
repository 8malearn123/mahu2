import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import { ArtSvg } from "./ArtSvg";
import { LOGO_ARABIC, LOGO_HORIZONTAL, LOGO_LATIN, LOGO_STACKED, type Art } from "./logoArt";
import styles from "./Logo.module.css";

const LOCKUPS = {
  /** ماهو over MāHū — the primary lockup (signs, cups, footer). */
  stacked: LOGO_STACKED,
  /** MāHū ماهو on one line — for bars and tight heights (site header). */
  horizontal: LOGO_HORIZONTAL,
  /** MāHū alone. */
  latin: LOGO_LATIN,
  /** ماهو alone. */
  arabic: LOGO_ARABIC,
} satisfies Record<string, Art>;

export type LogoVariant = keyof typeof LOCKUPS;

/** cream on ink, the gradient or photos; ink on cream; coral or orange on cream; sunset fills it with the gradient. */
export type LogoColor = "cream" | "ink" | "coral" | "orange" | "sunset" | "current";

const COLORS: Record<Exclude<LogoColor, "sunset">, string> = {
  cream: "var(--cream-100)",
  ink: "var(--ink-900)",
  coral: "var(--coral-500)",
  orange: "var(--orange-500)",
  current: "currentColor",
};

type LogoProps = {
  variant?: LogoVariant;
  color?: LogoColor;
  /** Rendered height in px; width follows the lockup's proportions. Omit to size it with CSS. */
  height?: number;
  className?: string;
};

function aspect(art: Art) {
  const [, , w, h] = art.viewBox.split(" ").map(Number);
  return w / h;
}

/** The Mahu logo: the rebrand's bilingual wordmark, as vector artwork. */
export function Logo({ variant = "stacked", color = "cream", height, className }: LogoProps) {
  const art = LOCKUPS[variant];
  const style: CSSProperties | undefined =
    height === undefined ? undefined : { height, width: Math.round(height * aspect(art) * 100) / 100 };
  return (
    <ArtSvg
      art={art}
      role="img"
      aria-label="Mahu ماهو"
      fill={color === "sunset" ? "sunset" : COLORS[color]}
      className={cx(styles.logo, className)}
      style={style}
    />
  );
}
