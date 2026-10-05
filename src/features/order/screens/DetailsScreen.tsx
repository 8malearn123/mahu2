import { Checkbox } from "@/components/ds";
import type { OrderModel } from "../model";
import { DetailsFields, ScreenIntro } from "./parts";
import ui from "./screens.module.css";

export function DetailsScreen({ model }: { model: OrderModel }) {
  const { t, state, dispatch } = model;
  return (
    <div className={ui.stack26}>
      <ScreenIntro eyebrow={t.stepCup} title={t.cupTitle}>
        {t.cupLead}
      </ScreenIntro>
      <DetailsFields model={model} pickupName="pickup" />
      <Checkbox
        label={t.saveUsual}
        checked={state.saveUsual}
        onChange={(e) => dispatch({ type: "set", patch: { saveUsual: e.target.checked } })}
      />
    </div>
  );
}
