import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Stepper } from "./Stepper";
import styles from "./OrderLine.module.css";

type OrderLineProps = {
  name: ReactNode;
  options?: ReactNode;
  price: ReactNode;
  currency: string;
  qty: number;
  onQty?: (qty: number) => void;
  onRemove?: () => void;
  /** Localised button and stepper labels. */
  labels: { remove: string; decrease: string; increase: string };
  className?: string;
};

/** One basket line: name, options, quantity and price. */
export function OrderLine({ name, options, price, currency, qty, onQty, onRemove, labels, className }: OrderLineProps) {
  return (
    <div className={cx(styles.line, className)}>
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        {options && <span className={styles.options}>{options}</span>}
        {onRemove && (
          <button type="button" className={styles.remove} onClick={onRemove}>
            {labels.remove}
          </button>
        )}
      </div>
      <Stepper value={qty} onChange={onQty} labels={labels} />
      <span className={styles.price}>
        {price} <span className={styles.currency}>{currency}</span>
      </span>
    </div>
  );
}
