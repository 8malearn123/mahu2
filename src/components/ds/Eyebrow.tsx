import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";
import styles from "./Eyebrow.module.css";

/**
 * coral: coral text and sunset dots, on cream (the deck's "• قصتنا •").
 * ink: on the gradient, orange or coral.
 * cream: on ink and on photos.
 */
export type EyebrowTone = "coral" | "ink" | "cream";

type EyebrowProps = ComponentProps<"p"> & { tone?: EyebrowTone };

/** A section's kicker, set between two round bullets as in the rebrand deck. */
export function Eyebrow({ tone = "coral", className, children, ...rest }: EyebrowProps) {
  return (
    <p {...rest} className={cx(styles.eyebrow, styles[tone], className)}>
      <span aria-hidden="true" className={styles.dot} />
      <span>{children}</span>
      <span aria-hidden="true" className={styles.dot} />
    </p>
  );
}
