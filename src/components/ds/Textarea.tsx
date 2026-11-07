import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";
import field from "./Field.module.css";
import styles from "./Textarea.module.css";

type TextareaProps = Omit<ComponentProps<"textarea">, "className"> & {
  label?: ReactNode;
  hint?: ReactNode;
  /** Applied to the outer label. */
  className?: string;
};

/** Free-text field used by the job and franchise forms. */
export function Textarea({ label, hint, className, rows = 3, ...rest }: TextareaProps) {
  return (
    <label className={cx(field.wrap, className)}>
      {label && <span className={field.label}>{label}</span>}
      <textarea {...rest} rows={rows} className={cx(field.control, styles.textarea)} />
      {hint && <span className={field.message}>{hint}</span>}
    </label>
  );
}
