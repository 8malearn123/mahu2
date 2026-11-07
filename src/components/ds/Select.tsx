import { useId, type ComponentProps, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
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
      <div className={styles.frame}>
        <select
          {...rest}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cx(field.control, styles.select, error && field.controlInvalid)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon size={18} className={styles.chevron} />
      </div>
      {message && (
        <span id={messageId} className={cx(field.message, error && field.messageError)}>
          {message}
        </span>
      )}
    </div>
  );
}
