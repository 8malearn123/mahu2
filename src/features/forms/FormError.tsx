import type { ReactNode } from "react";
import styles from "./forms.module.css";

/** The error line above a form's submit button. */
export function FormError({ children }: { children: ReactNode }) {
  return (
    <span role="alert" className={styles.formError}>
      {children}
    </span>
  );
}
