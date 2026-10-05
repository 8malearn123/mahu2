import { cx } from "@/lib/cx";
import { optionText } from "../copy";
import type { OrderModel } from "../model";
import { linePrice } from "../pricing";
import { CardFields, MethodChoice, PickupWindow, RewardAndTotal } from "./parts";
import ui from "./screens.module.css";

export function PayScreen({ model }: { model: OrderModel }) {
  const { lang, t, tc, state, totals } = model;
  return (
    <div className={ui.stack26}>
      <div className={ui.intro}>
        <span className={ui.eyebrow}>{t.stepPay}</span>
        <h1 className={ui.title}>{t.payTitle}</h1>
      </div>
      <div className={ui.card}>
        <PickupWindow model={model} inCard />
        <span className={cx(ui.label, ui.summaryLabel)}>{t.summary}</span>
        {state.basket.map((line, index) => (
          <div key={index} className={cx(ui.row, ui.rowTight)}>
            <span className={ui.lineText}>
              {`${line.qty > 1 ? `${line.qty} × ` : ""}${t.names[line.id]} · ${optionText(line, t, lang)}`}
            </span>
            <span className={ui.value}>
              {linePrice(line, line)} {tc.currency}
            </span>
          </div>
        ))}
        <div className={cx(ui.row, ui.subtotalRow)}>
          <span className={ui.label}>{t.subtotal}</span>
          <span className={ui.value}>
            {totals.subtotal} {tc.currency}
          </span>
        </div>
        <RewardAndTotal model={model} rewardRowClass={ui.rewardRowPay} />
      </div>
      <MethodChoice model={model} name="method" />
      {state.method === "card" && <CardFields model={model} />}
      <span className={ui.payNote}>{t.payNote}</span>
    </div>
  );
}
