import { useId, type ComponentProps, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import field from "./Field.module.css";
import styles from "./Select.module.css";

export type SelectOption = { value: string; label: string };

type SelectProps = Omit<ComponentProps<"select">, "className" | "children"> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  options: readonly SelectOption[];
  /** Applied to the outer wrapper. */
  className?: string;
};

export function Select({ label, hint, error, options, className, id, ...rest }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const messageId = `${selectId}-message`;
  const message = error || hint;
  return (
    <div className={cx(field.wrap, className)}>
      {label && (
        <label htmlFor={selectId} className={field.label}>
          {label}
        </label>
      )}
      <select
        {...rest}
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cx(styles.select, error && styles.invalid)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {message && (
        <span id={messageId} className={cx(field.message, error && field.messageError)}>
          {message}
        </span>
      )}
    </div>
  );
}
