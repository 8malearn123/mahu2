import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./RadioGroup.module.css";

export type RadioOption<V extends string = string> = { value: V; label: ReactNode };

type RadioGroupProps<V extends string> = {
  label?: ReactNode;
  name: string;
  value: V;
  onChange?: (value: V) => void;
  options: readonly RadioOption<V>[];
  direction?: "row" | "column";
  className?: string;
};

export function RadioGroup<V extends string>({
  label,
  name,
  value,
  onChange,
  options,
  direction = "column",
  className,
}: RadioGroupProps<V>) {
  return (
    <fieldset className={cx(styles.group, className)}>
      {label && <legend className={styles.legend}>{label}</legend>}
      <div className={cx(styles.options, direction === "row" && styles.row)}>
        {options.map((o) => {
          const on = o.value === value;
          return (
            <label key={o.value} className={styles.option}>
              <span className={cx(styles.ring, on && styles.ringOn)}>{on && <span className={styles.dot} />}</span>
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={on}
                onChange={() => onChange?.(o.value)}
                className={styles.input}
              />
              <span className={styles.text}>{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
