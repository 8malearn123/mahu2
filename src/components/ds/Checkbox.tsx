import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Checkbox.module.css";

type CheckboxProps = Omit<ComponentProps<"input">, "type" | "className"> & {
  label: ReactNode;
  /** Applied to the outer label. */
  className?: string;
};

export function Checkbox({ label, checked = false, disabled, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx(styles.label, disabled && styles.disabled, className)}>
      <span className={cx(styles.box, checked && styles.checked)}>
        {checked && (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
            <path d="M1 5.2 4.6 8.8 12 1.4" stroke="var(--cream-100)" strokeWidth="2.2" strokeLinecap="square" />
          </svg>
        )}
      </span>
      <input {...rest} type="checkbox" checked={checked} disabled={disabled} className={styles.input} />
      <span className={styles.text}>{label}</span>
    </label>
  );
}
