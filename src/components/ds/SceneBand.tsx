import { cx } from "@/lib/cx";
import styles from "./SceneBand.module.css";

// The rebrand's bars, as backgrounds (see the gradient tokens in colors.css).
const BANDS = {
  /** Orange into coral, left to right: the bar under the story page and the cups' sleeve. */
  sunset: "var(--gradient-sunset-x)",
  /** Sea into sunset: the round sticker's colours, laid flat. */
  horizon: "linear-gradient(90deg, var(--teal-600) 0%, var(--orange-500) 52%, var(--coral-500) 100%)",
  /** A cream rule riding on the sunset bar, as on the deck's back page. For ink or photo backgrounds. */
  paper: "linear-gradient(var(--cream-100) 0 34%, transparent 34% 52%), var(--gradient-sunset-x)",
} as const;

type SceneBandProps = {
  scene?: keyof typeof BANDS;
  height?: number;
  radius?: number;
  className?: string;
};

/** A full-width brand bar used as a divider: the sunset gradient, or one of its variants. */
export function SceneBand({ scene = "sunset", height = 12, radius = 0, className }: SceneBandProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(styles.band, className)}
      style={{ height, borderRadius: radius, background: BANDS[scene] }}
    />
  );
}
