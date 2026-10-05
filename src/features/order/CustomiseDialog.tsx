import { Button, Dialog, RadioGroup, Select, SlotImage, Stepper } from "@/components/ds";
import { getItem } from "./catalog";
import type { OrderModel } from "./model";
import { linePrice } from "./pricing";
import { isOneOf, MILKS, SIZES, SWEETS } from "./types";
import styles from "./dialogs.module.css";

/** Size, milk, sweetness and quantity for one drink, with the line price on the add button. */
export function CustomiseDialog({ model }: { model: OrderModel }) {
  const { t, tc, state, dispatch } = model;
  const item = state.sheet ? getItem(state.sheet) : null;
  const options = { size: state.size, milk: state.milk, sweet: state.sweet, qty: state.qty };
  const close = () => dispatch({ type: "set", patch: { sheet: null } });

  return (
    <Dialog
      open={item !== null}
      title={item ? t.names[item.id] : ""}
      onClose={close}
      footer={
        <>
          <Button variant="ghost" size="md" onClick={close}>
            {t.cancel}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => item && dispatch({ type: "addLine", id: item.id, options })}
          >
            {t.addToOrder + (item ? ` · ${linePrice(item, options)} ${tc.currency}` : "")}
          </Button>
        </>
      }
    >
      {item && (
        <div className={styles.sheet}>
          <div className={styles.sheetPhoto}>
            <SlotImage id={item.slot} alt={`${t.photoOf} ${t.names[item.id]}`} />
          </div>
          <span className={styles.dialogNote}>{t.notes[item.id]}</span>
          <RadioGroup
            label={t.sizeLabel}
            name="size"
            direction="row"
            value={state.size}
            onChange={(size) => dispatch({ type: "set", patch: { size } })}
            options={SIZES.map((value) => ({ value, label: t.sizes[value] }))}
          />
          <Select
            label={t.milkLabel}
            value={state.milk}
            onChange={(e) => {
              const milk = e.target.value;
              if (isOneOf(MILKS, milk)) dispatch({ type: "set", patch: { milk } });
            }}
            options={MILKS.map((value) => ({ value, label: t.milks[value] }))}
          />
          <RadioGroup
            label={t.sweetLabel}
            name="sweet"
            direction="row"
            value={state.sweet}
            onChange={(sweet) => dispatch({ type: "set", patch: { sweet } })}
            options={SWEETS.map((value) => ({ value, label: t.sweets[value] }))}
          />
          <div className={styles.qtyRow}>
            <span className={styles.qtyLabel}>{t.qtyLabel}</span>
            <Stepper
              value={state.qty}
              onChange={(qty) => dispatch({ type: "set", patch: { qty } })}
              labels={{ decrease: t.decrease, increase: t.increase }}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
}
