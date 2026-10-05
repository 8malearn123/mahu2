import { useId, type ComponentProps, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import field from "./Field.module.css";
import styles from "./Input.module.css";

type InputProps = Omit<ComponentProps<"input">, "className"> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  iconLeft?: ReactNode;
  /** Applied to the outer wrapper. */
  className?: string;
};

export function Input({ label, hint, error, iconLeft, className, id, type = "text", disabled, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const message = error || hint;
  return (
    <div className={cx(field.wrap, className)}>
      {label && (
        <label htmlFor={inputId} className={field.label}>
          {label}
        </label>
      )}
      <div className={cx(styles.box, disabled && styles.disabled, error && styles.invalid)}>
        {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
        <input
          {...rest}
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={styles.input}
        />
      </div>
      {message && (
        <span id={messageId} className={cx(field.message, error && field.messageError)}>
          {message}
        </span>
      )}
    </div>
  );
}
