import { cx } from "@/lib/cx";
import { ArtSvg } from "./ArtSvg";
import { LANDSCAPE } from "./landscapeArt";
import styles from "./Landscape.module.css";

/** Named crops of the cover's line art, as SVG viewBoxes (the full artwork is 1366 × 428). */
const CROPS = {
  /** The whole panorama: waves left and right, the range in the middle. */
  full: LANDSCAPE.viewBox,
  /** The range and the swell under it, without the outer waves. */
  peaks: "330 340 860 428",
  /** The left-hand swell. */
  wavesStart: "0 450 330 318",
  /** The right-hand swell. */
  wavesEnd: "900 570 466 198",
} as const;

export type LandscapeCrop = keyof typeof CROPS;

type LandscapeProps = {
  crop?: LandscapeCrop;
  /** Line colour. Cream on the gradient or ink (the cover); ink or coral on cream. */
  color?: string;
  /**
   * How the art meets its box. "bottom" (default) anchors it to the bottom edge and lets it bleed off
   * the sides, like the cover; "contain" shows the whole crop.
   */
  fit?: "bottom" | "contain";
  className?: string;
};

/**
 * The rebrand's signature line art — Jazan "from its mountains to its sea" — drawn in one colour.
 * Decorative: hidden from assistive tech.
 */
export function Landscape({ crop = "full", color = "var(--cream-100)", fit = "bottom", className }: LandscapeProps) {
  return (
    <ArtSvg
      art={{ ...LANDSCAPE, viewBox: CROPS[crop] }}
      fill={color}
      aria-hidden="true"
      preserveAspectRatio={fit === "bottom" ? "xMidYMax slice" : "xMidYMid meet"}
      className={cx(styles.landscape, className)}
    />
  );
}
