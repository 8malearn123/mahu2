import { Button } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import type { OrderModel } from "./model";
import { isOneAway } from "./pricing";
import styles from "./OrderApp.module.css";

type OrderBarProps = {
  model: OrderModel;
  onPrev: () => void;
  onNext: () => void;
};

/** Fixed bottom bar: running total, Back and the next step. */
export function OrderBar({ model, onPrev, onNext }: OrderBarProps) {
  const { t, tc, state, totals, known } = model;
  const { screen, basket } = state;
  const nextLabel = {
    menu: known ? t.nextConfirm : t.nextMenu,
    details: t.nextCup,
    phone: t.nextPhone,
    otp: t.nextOtp,
    pay: t.nextPay,
    confirm: t.nextConfirm,
    done: "",
  }[screen];
  // Nothing to check out, or to pay for once every line has been removed.
  const nextDisabled = (screen === "menu" || screen === "confirm" || screen === "pay") && basket.length === 0;

  return (
    <div className={styles.bar}>
      <div className={styles.barRow}>
        <div className={styles.barText}>
          <span className={styles.barLabel}>{basket.length > 0 ? t.barItems : t.barEmpty}</span>
          {isOneAway(state.points, totals.earned, basket) && <span className={styles.barNudge}>{t.cardNudge}</span>}
          <span className={styles.barTotal}>
            {totals.total}
            <span className={styles.barCurrency}>{tc.currency}</span>
          </span>
        </div>
        <div className={styles.barActions}>
          {screen !== "menu" && (
            <Button variant="ghost" size="md" onClick={onPrev}>
              {t.prev}
            </Button>
          )}
          <Button variant="primary" size="lg" disabled={nextDisabled} onClick={onNext}>
            {nextLabel}
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
