import Image from "next/image";
import cream from "@/assets/brand/logo-wordmark-cream.png";
import teal from "@/assets/brand/logo-wordmark-teal.png";
import { cx } from "@/lib/cx";
import styles from "./Logo.module.css";

const SOURCES = { cream, teal };

type LogoProps = {
  color?: keyof typeof SOURCES;
  /** Rendered height in px; width follows the wordmark's proportions. */
  height?: number;
  /** Load immediately (for logos above the fold). */
  eager?: boolean;
  className?: string;
};

/** The Mahu wordmark (raster: the identity's vector logo was never supplied). */
export function Logo({ color = "teal", height = 40, eager = false, className }: LogoProps) {
  const src = SOURCES[color];
  // Size from the source PNG's proportions (as in the design), not the optimised file's.
  const width = (height * src.width) / src.height;
  return (
    <Image
      src={src}
      alt="Mahu"
      width={Math.round(width)}
      height={height}
      loading={eager ? "eager" : undefined}
      className={cx(styles.logo, className)}
      style={{ height, width }}
    />
  );
}
