import { Button, SceneBand } from "@/components/ds";
import { NavigateIcon } from "@/components/icons";
import { directionsUrl, getBranch } from "@/lib/branches";
import { cx } from "@/lib/cx";
import { toGoText } from "../copy";
import type { OrderModel } from "../model";
import ui from "./screens.module.css";

export function DoneScreen({ model }: { model: OrderModel }) {
  const { lang, t, tc, state, dispatch, totals } = model;
  const branch = getBranch(state.branch);
  const receipt = [
    { label: t.receiptWindow, value: `${branch[lang].name} · ${branch[lang].area}` },
    { label: t.receiptName, value: state.cupName || "—" },
    { label: t.receiptPickup, value: t.pickups[state.pickup] },
    { label: t.receiptItems, value: String(totals.cups) },
    { label: t.receiptCar, value: state.car || "—" },
    { label: t.receiptPaid, value: `${t.methods[state.method]} · ${state.paid} ${tc.currency}` },
    { label: t.earnedLine, value: `+${totals.earned} ${t.cardOf}` },
    { label: t.onCardAfter, value: `${state.points} ${t.cardOf} · ${toGoText(state.points, t, lang)}` },
  ];

  return (
    <div className={ui.stack26}>
      <div className={ui.codeCard}>
        <span className={ui.codeLabel}>{t.orderCode}</span>
        <span className={ui.code} dir="ltr">
          {state.code}
        </span>
        <h1 className={ui.doneTitle}>{t.doneTitle}</h1>
        <p className={ui.doneBody}>{state.pickup === "now" ? t.doneBodyNow : t.doneBodyLater}</p>
        <SceneBand scene="beach" height={12} />
      </div>
      <div className={ui.card}>
        {receipt.map((row) => (
          <div key={row.label} className={cx(ui.row, ui.rowLoose)}>
            <span className={ui.label}>{row.label}</span>
            <span className={ui.value}>{row.value}</span>
          </div>
        ))}
      </div>
      <div className={ui.doneActions}>
        <a href={directionsUrl(branch)} target="_blank" rel="noopener" className={ui.directions}>
          <NavigateIcon size={18} />
          {tc.directions}
        </a>
        <Button variant="secondary" size="md" onClick={() => dispatch({ type: "startOver" })}>
          {t.another}
        </Button>
        <Button variant="ghost" size="md" href={`/${lang}`}>
          {t.back}
        </Button>
      </div>
    </div>
  );
}
