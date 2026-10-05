import { cx } from "@/lib/cx";
import styles from "./SceneBand.module.css";

// The identity's horizon bands, top to bottom.
const BANDS = {
  beach: ["var(--scene-sky)", "var(--scene-sea)", "var(--scene-beach)"],
  sunset: ["var(--scene-sky)", "var(--scene-hills)", "var(--scene-sea)"],
  deep: ["var(--scene-sea)", "var(--scene-headland)"],
  sand: ["var(--scene-beach)", "var(--sun-200)"],
} as const;

type SceneBandProps = {
  scene?: keyof typeof BANDS;
  height?: number;
  radius?: number;
  className?: string;
};

/** Stacked colour stripes: the brand's horizon motif used as a divider. */
export function SceneBand({ scene = "beach", height = 12, radius = 0, className }: SceneBandProps) {
  return (
    <div aria-hidden="true" className={cx(styles.band, className)} style={{ height, borderRadius: radius }}>
      {BANDS[scene].map((color) => (
        <div key={color} className={styles.stripe} style={{ background: color }} />
      ))}
    </div>
  );
}
