import { Landscape } from "@/components/ds";
import type { Locale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { cx } from "@/lib/cx";
import styles from "./HowItWorks.module.css";

/** The three steps as solid brand blocks (the deck's logo page): orange, coral, ink. */
const STEPS = [
  { key: "step1", tone: styles.toneOrange },
  { key: "step2", tone: styles.toneCoral },
  { key: "step3", tone: styles.toneInk },
] as const;

export function HowItWorks({ lang }: { lang: Locale }) {
  const t = landing[lang].how;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 className={styles.title}>
              {t.titleA}
              <br />
              {t.titleB}
            </h2>
          </div>
        </div>

        <div className={styles.steps}>
          {STEPS.map(({ key, tone }) => (
            <div key={key} className={cx(styles.step, tone)}>
              <h3 className={styles.stepTitle}>{t[key]}</h3>
              {/* The cover's line art in cream, one panorama run across the three blocks. */}
              <div aria-hidden="true" className={styles.art}>
                <Landscape className={styles.line} />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.kicker}>
          <span className={styles.kickerText}>{t.kicker}</span>
          <span aria-hidden="true" className={styles.kickerRule} />
        </div>
      </div>
    </section>
  );
}
