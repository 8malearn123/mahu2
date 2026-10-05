import type { Locale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { cx } from "@/lib/cx";
import styles from "./HowItWorks.module.css";

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
          <div className={cx(styles.step, styles.toneSun)}>
            <div className={styles.stepTop} />
            <div aria-hidden="true" className={styles.art}>
              <div className={styles.sunCoral} />
              <div className={styles.waterline}>
                <svg
                  width="100%"
                  height="14"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="var(--ink-900)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M0 7c12-5 24 5 36 0s24 5 36 0 24 5 36 0 24 5 36 0 24 5 36 0" />
                </svg>
              </div>
            </div>
            <div className={styles.stepText}>
              <h3 className={styles.stepTitle}>{t.step1}</h3>
            </div>
          </div>

          <div className={cx(styles.step, styles.toneSand)}>
            <div className={styles.stepTop} />
            <div aria-hidden="true" className={styles.art}>
              <div className={styles.boardCream}>
                <div className={styles.stringerCoral} />
              </div>
              <div className={styles.boardTeal}>
                <div className={styles.stringerSun} />
              </div>
            </div>
            <div className={styles.stepText}>
              <h3 className={styles.stepTitle}>{t.step2}</h3>
            </div>
          </div>

          <div className={cx(styles.step, styles.toneSea)}>
            <div className={styles.stepTop} />
            <div aria-hidden="true" className={styles.art}>
              <div className={styles.sunPale} />
              <div className={styles.hills} />
              <div className={styles.waves}>
                <svg
                  width="100%"
                  height="16"
                  viewBox="0 0 200 16"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="var(--cream-100)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M0 5c12-4 24 4 36 0s24 4 36 0 24 4 36 0 24 4 36 0 24 4 36 0" />
                  <path d="M0 13c12-4 24 4 36 0s24 4 36 0 24 4 36 0 24 4 36 0 24 4 36 0" />
                </svg>
              </div>
            </div>
            <div className={styles.stepText}>
              <h3 className={styles.stepTitle}>{t.step3}</h3>
            </div>
          </div>
        </div>

        <div className={styles.kicker}>
          <span className={styles.kickerText}>{t.kicker}</span>
        </div>
      </div>
    </section>
  );
}
