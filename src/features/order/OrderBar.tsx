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
  // Every step moves on with the ink pill; the one that places the order wears the sunset.
  const placesOrder = screen === "pay" || screen === "confirm";

  return (
    <div className={styles.bar}>
      {/* A slim strip over the bar, so the nudge never squeezes the total beside the buttons on phones. */}
      {isOneAway(state.points, totals.earned, basket) && (
        <div className={styles.barNudge}>
          <span className={styles.barNudgeText}>{t.cardNudge}</span>
        </div>
      )}
      <div className={styles.barRow}>
        <div className={styles.barText}>
          <span className={styles.barLabel}>{basket.length > 0 ? t.barItems : t.barEmpty}</span>
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
          <Button variant={placesOrder ? "brand" : "primary"} size="lg" disabled={nextDisabled} onClick={onNext}>
            {nextLabel}
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
