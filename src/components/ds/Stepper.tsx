import { cx } from "@/lib/cx";
import styles from "./Stepper.module.css";

type StepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  /** Accessible names for the two buttons. */
  labels?: { decrease: string; increase: string };
  className?: string;
};

/** Quantity control. */
export function Stepper({
  value,
  min = 1,
  max = 99,
  onChange,
  labels = { decrease: "Decrease", increase: "Increase" },
  className,
}: StepperProps) {
  const step = (delta: number) => onChange?.(Math.min(max, Math.max(min, value + delta)));
  return (
    <div className={cx(styles.stepper, className)}>
      <button type="button" className={styles.button} disabled={value <= min} aria-label={labels.decrease} onClick={() => step(-1)}>
        {"−"}
      </button>
      <span className={styles.value}>{value}</span>
      <button type="button" className={styles.button} disabled={value >= max} aria-label={labels.increase} onClick={() => step(1)}>
        +
      </button>
    </div>
  );
}
