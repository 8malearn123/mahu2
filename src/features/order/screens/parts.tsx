import type { ReactNode } from "react";
import { Checkbox, Input, OrderLine, RadioGroup } from "@/components/ds";
import type { Locale } from "@/i18n/config";
import { getBranch, isOpenAt, statusLabel, type Branch } from "@/lib/branches";
import { cx } from "@/lib/cx";
import { optionText } from "../copy";
import { formatCardNumber, formatCvv, formatExpiry } from "../format";
import type { OrderModel } from "../model";
import { linePrice, REWARD_POINTS } from "../pricing";
import { METHODS, PICKUPS } from "../types";
import ui from "./screens.module.css";

type ModelProps = { model: OrderModel };

/** Step eyebrow, screen title and (optional) lead paragraph. */
export function ScreenIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className={ui.intro}>
      <span className={ui.eyebrow}>{eyebrow}</span>
      <h1 className={ui.title}>{title}</h1>
      {children && <p className={ui.lead}>{children}</p>}
    </div>
  );
}

/** "Open · until 11 PM" with its dot. Empty (but full height) until the hour is known on the client. */
export function BranchStatus({
  branch,
  hour,
  lang,
  className,
}: {
  branch: Branch;
  hour: number | null;
  lang: Locale;
  className: string;
}) {
  if (hour === null) return <span className={className}>{" "}</span>;
  return (
    <span className={className}>
      <span className={cx(ui.dot, isOpenAt(branch, hour) ? ui.dotOpen : ui.dotClosed)} />
      {statusLabel(branch, hour, lang)}
    </span>
  );
}

/** The pickup window with its status and a "Change" button (pay: inside the summary card; confirm: its own card). */
export function PickupWindow({ model, inCard = false }: ModelProps & { inCard?: boolean }) {
  const { lang, t, state, dispatch, hour } = model;
  const branch = getBranch(state.branch);
  return (
    <div className={inCard ? ui.windowInCard : ui.windowCard}>
      <div className={ui.windowText}>
        <span className={ui.windowLabel}>{t.windowLabel}</span>
        <span className={ui.windowName}>
          {branch[lang].name} · {branch[lang].area}
        </span>
        <BranchStatus branch={branch} hour={hour} lang={lang} className={ui.windowStatus} />
      </div>
      <button
        type="button"
        className={cx(ui.pill, ui.pillFixed, ui.pillTall)}
        onClick={() => dispatch({ type: "set", patch: { branchOpen: true } })}
      >
        {t.change}
      </button>
    </div>
  );
}

/** Name for the cup, pickup time and car (the details screen, and "Edit" on confirm). */
export function DetailsFields({ model, pickupName }: ModelProps & { pickupName: string }) {
  const { t, state, dispatch } = model;
  return (
    <>
      <Input
        label={t.cupLabel}
        placeholder={t.cupPlaceholder}
        value={state.cupName}
        onChange={(e) => dispatch({ type: "set", patch: { cupName: e.target.value } })}
        error={state.errors.cupName ? t.cupRequired : undefined}
      />
      <RadioGroup
        label={t.pickupLabel}
        name={pickupName}
        value={state.pickup}
        onChange={(pickup) => dispatch({ type: "set", patch: { pickup } })}
        options={PICKUPS.map((value) => ({ value, label: t.pickups[value] }))}
      />
      <Input
        label={t.carLabel}
        placeholder={t.carPlaceholder}
        hint={t.carHint}
        value={state.car}
        onChange={(e) => dispatch({ type: "set", patch: { car: e.target.value } })}
      />
    </>
  );
}

export function MethodChoice({ model, name }: ModelProps & { name: string }) {
  const { t, state, dispatch } = model;
  return (
    <RadioGroup
      label={t.payMethod}
      name={name}
      value={state.method}
      onChange={(method) => dispatch({ type: "set", patch: { method } })}
      options={METHODS.map((value) => ({ value, label: t.methods[value] }))}
    />
  );
}

export function CardFields({ model }: ModelProps) {
  const { t, state, dispatch } = model;
  const { errors } = state;
  return (
    <div className={ui.stack16}>
      <Input
        label={t.cardNumber}
        placeholder="0000 0000 0000 0000"
        value={state.card}
        onChange={(e) => dispatch({ type: "set", patch: { card: formatCardNumber(e.target.value) } })}
        error={errors.card ? t.cardInvalid : undefined}
        inputMode="numeric"
      />
      <div className={ui.pairRow}>
        <Input
          label={t.cardExp}
          placeholder="MM/YY"
          value={state.exp}
          onChange={(e) => dispatch({ type: "set", patch: { exp: formatExpiry(e.target.value) } })}
          error={errors.exp ? t.expInvalid : undefined}
        />
        <Input
          label={t.cardCvv}
          placeholder="123"
          value={state.cvv}
          onChange={(e) => dispatch({ type: "set", patch: { cvv: formatCvv(e.target.value) } })}
          error={errors.cvv ? t.cvvInvalid : undefined}
        />
      </div>
    </div>
  );
}

/** Editable basket lines (menu basket and confirm screen). */
export function BasketLines({ model }: ModelProps) {
  const { lang, t, tc, state, dispatch } = model;
  const labels = { remove: t.remove, decrease: t.decrease, increase: t.increase };
  return state.basket.map((line, index) => (
    <OrderLine
      // Lines have no id of their own (the same drink can be added twice); they hold no state either.
      key={index}
      name={t.names[line.id]}
      options={optionText(line, t, lang)}
      price={linePrice(line, line)}
      currency={tc.currency}
      qty={line.qty}
      onQty={(qty) => dispatch({ type: "lineQty", index, qty })}
      onRemove={() => dispatch({ type: "removeLine", index })}
      labels={labels}
    />
  ));
}

/** Free-drink discount, "save it for next time", and the total (pay summary and confirm totals). */
export function RewardAndTotal({ model, rewardRowClass }: ModelProps & { rewardRowClass: string }) {
  const { t, tc, state, dispatch, totals } = model;
  return (
    <>
      {totals.reward > 0 && (
        <div className={cx(ui.row, ui.rewardRow, rewardRowClass)}>
          <span className={ui.rewardText}>{t.rewardLine}</span>
          <span className={ui.rewardText} dir="ltr">
            − {totals.reward} {tc.currency}
          </span>
        </div>
      )}
      {state.points >= REWARD_POINTS && (
        <div className={ui.rewardCheck}>
          <Checkbox
            label={t.rewardSave}
            checked={!state.useReward}
            onChange={(e) => dispatch({ type: "set", patch: { useReward: !e.target.checked } })}
          />
        </div>
      )}
      <div className={cx(ui.row, ui.totalRow)}>
        <span className={ui.label}>{t.total}</span>
        <span className={ui.priceLarge}>
          {totals.total}
          <span className={ui.currency}>{tc.currency}</span>
        </span>
      </div>
    </>
  );
}
