import { useId } from "react";
import { Checkbox, Input } from "@/components/ds";
import { formatPhone } from "../format";
import type { OrderModel } from "../model";
import { ScreenIntro } from "./parts";
import ui from "./screens.module.css";

export function PhoneScreen({ model }: { model: OrderModel }) {
  const { t, state, dispatch } = model;
  const consentErrorId = useId();
  const consentMissing = !!state.errors.consent;

  return (
    <div className={ui.stack26}>
      <ScreenIntro eyebrow={t.stepPhone} title={t.phoneTitle}>
        {t.phoneLead}
      </ScreenIntro>
      <div className={ui.phoneRow}>
        <div className={ui.prefix} dir="ltr">
          +966
        </div>
        <Input
          label={t.phoneLabel}
          placeholder="5X XXX XXXX"
          value={state.phone}
          onChange={(e) => dispatch({ type: "phone", value: formatPhone(e.target.value) })}
          error={state.errors.phone ? t.phoneInvalid : undefined}
          type="tel"
        />
      </div>
      <div className={ui.consentField}>
        <Checkbox
          label={t.consent}
          checked={state.consent}
          onChange={(e) => dispatch({ type: "set", patch: { consent: e.target.checked } })}
          aria-invalid={consentMissing || undefined}
          aria-describedby={consentMissing ? consentErrorId : undefined}
        />
        {consentMissing && (
          <span id={consentErrorId} className={ui.consentError}>
            {t.consentRequired}
          </span>
        )}
      </div>
      <div className={ui.pointsTeaser}>
        <div className={ui.teaserPoints}>
          <span className={ui.teaserNumber} dir="ltr">
            {state.points}
          </span>
          <span className={ui.teaserUnit}>{t.cardOf}</span>
        </div>
        <span className={ui.teaserTitle}>{t.cardTitle}</span>
        <span className={ui.muted}>{t.cardAuto}</span>
      </div>
    </div>
  );
}
