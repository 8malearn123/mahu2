import { CheckIcon } from "@/components/icons";
import { cx } from "@/lib/cx";
import { payingWithText } from "../copy";
import type { OrderModel } from "../model";
import { BasketLines, CardFields, DetailsFields, MethodChoice, PickupWindow, RewardAndTotal, ScreenIntro } from "./parts";
import ui from "./screens.module.css";

type ConfirmScreenProps = {
  model: OrderModel;
  onAnotherNumber: () => void;
};

/** Returning customers: everything saved from last time on one screen. */
export function ConfirmScreen({ model, onAnotherNumber }: ConfirmScreenProps) {
  const { t, tc, state, dispatch, totals } = model;
  const details = [
    { label: t.receiptName, value: state.cupName || "—" },
    { label: t.receiptPickup, value: t.pickups[state.pickup] },
    { label: t.receiptCar, value: state.car || "—" },
  ];

  return (
    <div className={ui.stack22}>
      <ScreenIntro eyebrow={t.stepConfirm} title={t.confirmTitle}>
        {t.confirmLead}
      </ScreenIntro>

      <PickupWindow model={model} />

      <div className={ui.stack12}>
        <BasketLines model={model} />
      </div>

      <div className={cx(ui.panel, ui.panelDetails)}>
        <div className={ui.panelHead}>
          <span className={ui.label}>{t.yourDetails}</span>
          <button
            type="button"
            className={ui.pill}
            onClick={() => dispatch({ type: "set", patch: { editing: !state.editing } })}
          >
            {state.editing ? t.doneEditing : t.editDetails}
          </button>
        </div>
        {state.editing ? (
          <div className={ui.stack18}>
            <DetailsFields model={model} pickupName="pickup2" />
          </div>
        ) : (
          <div className={ui.detailRows}>
            {details.map((row) => (
              <div key={row.label} className={cx(ui.row, ui.rowLoose)}>
                <span className={ui.label}>{row.label}</span>
                <span className={ui.value}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
        <div className={ui.verifiedRow}>
          <div className={ui.headText}>
            <span className={ui.verifiedLabel}>
              <CheckIcon size={15} />
              {t.verifiedNumber}
            </span>
            <span className={ui.headValue} dir="ltr">
              +966 {state.phone}
            </span>
          </div>
          <button type="button" className={ui.textButton} onClick={onAnotherNumber}>
            {t.notYou}
          </button>
        </div>
        <span className={ui.subtle}>{t.savedNote}</span>
      </div>

      <div className={ui.card}>
        <div className={cx(ui.row, ui.rowTight)}>
          <span className={ui.label}>{t.subtotal}</span>
          <span className={ui.value}>
            {totals.subtotal} {tc.currency}
          </span>
        </div>
        <RewardAndTotal model={model} rewardRowClass={ui.rewardRowConfirm} />
      </div>

      <div className={cx(ui.panel, ui.panelPay)}>
        <div className={ui.payHead}>
          <div className={ui.headText}>
            <span className={ui.label}>{t.payingWith}</span>
            <span className={ui.headValue}>{payingWithText(state.method, state.savedCard, t)}</span>
          </div>
          <button
            type="button"
            className={cx(ui.pill, ui.pillFixed)}
            onClick={() => dispatch({ type: "set", patch: { editPay: !state.editPay } })}
          >
            {t.changePay}
          </button>
        </div>
        {state.editPay && (
          <div className={ui.stack16}>
            <MethodChoice model={model} name="method2" />
            {state.method === "card" && <CardFields model={model} />}
          </div>
        )}
      </div>
    </div>
  );
}
