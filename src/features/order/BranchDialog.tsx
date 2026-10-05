import { Dialog } from "@/components/ds";
import { BRANCHES } from "@/lib/branches";
import { cx } from "@/lib/cx";
import type { OrderModel } from "./model";
import { BranchStatus } from "./screens/parts";
import styles from "./dialogs.module.css";

/** "Choose your window": the drive-thru that makes the order. */
export function BranchDialog({ model }: { model: OrderModel }) {
  const { lang, t, state, dispatch, hour } = model;
  return (
    <Dialog
      open={state.branchOpen}
      title={t.branchTitle}
      onClose={() => dispatch({ type: "set", patch: { branchOpen: false } })}
    >
      <div className={styles.branchList}>
        <span className={styles.dialogNote}>{t.branchNote}</span>
        {BRANCHES.map((branch) => {
          const selected = branch.id === state.branch;
          return (
            <button
              key={branch.id}
              type="button"
              aria-pressed={selected}
              className={cx(styles.branch, selected && styles.branchOn)}
              onClick={() => dispatch({ type: "set", patch: { branch: branch.id, branchOpen: false } })}
            >
              <span className={styles.radio}>
                <span className={styles.radioDot} />
              </span>
              <span className={styles.branchText}>
                <span className={styles.branchName}>{branch[lang].name}</span>
                <span className={styles.branchArea}>{branch[lang].area}</span>
                <BranchStatus branch={branch} hour={hour} lang={lang} className={styles.branchStatus} />
                <span className={styles.branchNote}>{branch[lang].note}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Dialog>
  );
}
