import { Button } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { landing } from "@/i18n/dictionaries/landing";
import styles from "./OrderCta.module.css";

const WAVE = "M0 4.5c12-3.5 25 3.5 37 0s25 3.5 38 0 25 3.5 37 0 25 3.5 38 0 25 3.5 37 0 25 3.5 38 0 25 3.5 37 0 25 3.5 38 0";

function Wave({ className }: { className: string }) {
  return (
    <svg
      width="100%"
      height="9"
      viewBox="0 0 300 9"
      preserveAspectRatio="none"
      fill="none"
      stroke="var(--cream-100)"
      strokeWidth="1.1"
      strokeLinecap="round"
      className={className}
    >
      <path d={WAVE} />
    </svg>
  );
}

export function OrderCta({ lang }: { lang: Locale }) {
  const t = landing[lang].cta;
  return (
    <section id="order" className={styles.section}>
      <div aria-hidden="true" className={styles.scene}>
        <div className={styles.sun} />
        <div className={styles.rangeFar} />
        <div className={styles.rangeNear} />
        <div className={styles.sea}>
          <Wave className={styles.waveHigh} />
          <Wave className={styles.waveLow} />
        </div>
        <div className={styles.sand} />
        <div className={styles.boardCream}>
          <div className={styles.stringerCoral} />
        </div>
        <div className={styles.boardTeal}>
          <div className={styles.stringerSun} />
        </div>
      </div>
      <div className={styles.inner}>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.sub}>{t.sub}</p>
        <Button variant="primary" size="lg" href={localePath(lang, "/order")}>
          {common[lang].order}
          <ArrowIcon />
        </Button>
      </div>
    </section>
  );
}
