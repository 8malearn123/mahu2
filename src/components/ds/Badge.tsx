import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";
import styles from "./Badge.module.css";

export type BadgeTone = "teal" | "coral" | "sand" | "solid" | "cream";

export function Badge({
  tone = "teal",
  className,
  ...rest
}: ComponentProps<"span"> & { tone?: BadgeTone }) {
  return <span {...rest} className={cx(styles.badge, styles[tone], className)} />;
}
