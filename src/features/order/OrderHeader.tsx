import Link from "next/link";
import { Logo } from "@/components/ds";
import { BackIcon, PinIcon } from "@/components/icons";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { getBranch } from "@/lib/branches";
import { cx } from "@/lib/cx";
import type { OrderModel } from "./model";
import { currentFlow } from "./reducer";
import { FLOWS } from "./types";
import styles from "./OrderApp.module.css";

type OrderHeaderProps = {
  model: OrderModel;
  /** Called as the language switch is followed, so the page keeps its progress across the remount. */
  onLanguageSwitch: () => void;
};

/** Sticky header: back to the site, step progress, and the pickup window. */
export function OrderHeader({ model, onLanguageSwitch }: OrderHeaderProps) {
  const { lang, t, state, dispatch } = model;
  const flow = currentFlow(state);
  const step = FLOWS[flow].indexOf(state.screen);
  const branch = getBranch(state.branch)[lang];
  const home = `/${lang}`;

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <Link href={home} className={styles.back}>
          <BackIcon size={16} />
          {t.back}
        </Link>
        <Link href={home} aria-label="Mahu" className={styles.logoLink}>
          <Logo color="cream" height={24} eager />
        </Link>
        <LanguageSwitch lang={lang} className={styles.langToggle} onClick={onLanguageSwitch} />
      </div>
      <div className={styles.steps}>
        {(flow === "known" ? t.stepsKnown : t.steps).map((label, i) => (
          <div key={label} className={cx(styles.step, i <= step && styles.stepDone)}>
            <div className={styles.stepBar} />
            <span className={styles.stepLabel}>{label}</span>
          </div>
        ))}
      </div>
      <div className={styles.branchStrip}>
        <div className={styles.branchRow}>
          <PinIcon size={18} className={styles.pin} />
          <div className={styles.branchText}>
            <span className={styles.pickupAt}>{t.pickupAt}</span>
            <div className={styles.branchNames}>
              <span className={styles.branchName}>{branch.name}</span>
              <span className={styles.branchArea}>{branch.area}</span>
            </div>
          </div>
          <button
            type="button"
            className={styles.changeBranch}
            onClick={() => dispatch({ type: "set", patch: { branchOpen: true } })}
          >
            {t.change}
          </button>
        </div>
      </div>
    </header>
  );
}
