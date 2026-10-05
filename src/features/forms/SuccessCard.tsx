import type { ReactNode } from "react";
import { SuccessIcon } from "@/components/icons";
import { cx } from "@/lib/cx";
import styles from "./forms.module.css";

type SuccessCardProps = {
  title: string;
  body: string;
  /** Sets the body's max-width, which differs per page. */
  bodyClassName?: string;
  refLabel: string;
  reference: string;
  /** The second receipt entry (the role applied for, the target city). */
  detailLabel: string;
  detail: string;
  /** Shown under the receipt. */
  children?: ReactNode;
};

/** The teal confirmation that replaces a form once it is sent. */
export function SuccessCard({
  title,
  body,
  bodyClassName,
  refLabel,
  reference,
  detailLabel,
  detail,
  children,
}: SuccessCardProps) {
  return (
    <div className={styles.success}>
      <span className={styles.successIcon}>
        <SuccessIcon size={26} />
      </span>
      <h3 className={styles.successTitle}>{title}</h3>
      <p className={cx(styles.successBody, bodyClassName)}>{body}</p>
      <div className={styles.receipt}>
        <span className={styles.receiptItem}>
          <span className={styles.receiptLabel}>{refLabel}</span>
          <span className={styles.reference} dir="ltr">
            {reference}
          </span>
        </span>
        <span className={styles.receiptItem}>
          <span className={styles.receiptLabel}>{detailLabel}</span>
          <span className={styles.receiptValue}>{detail}</span>
        </span>
      </div>
      {children}
    </div>
  );
}
