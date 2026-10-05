import { Logo, SceneBand, SlotImage } from "@/components/ds";
import type { Locale } from "@/i18n/config";
import { jobs } from "@/i18n/dictionaries/jobs";
import styles from "./LifeSection.module.css";

/** "Life at the window": a morning shift as a receipt, next to photos from the window. */
export function LifeSection({ lang }: { lang: Locale }) {
  const t = jobs[lang].life;
  return (
    <section id="life" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>{t.lifeTitle}</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.ticket}>
            <div className={styles.ticketBody}>
              <div className={styles.ticketHead}>
                <Logo color="teal" height={22} />
                <span className={styles.shiftHead}>{t.shiftHead}</span>
                <span className={styles.shiftSub}>{t.shiftSub}</span>
              </div>
              <div className={styles.rule} />
              <div className={styles.rows}>
                {t.shiftRows.map((row) => (
                  <div key={row.time} className={styles.row}>
                    <span className={styles.time} dir="ltr">
                      {row.time}
                    </span>
                    <span className={styles.what}>{row.what}</span>
                  </div>
                ))}
              </div>
              <div className={styles.rule} />
              <div className={styles.tally}>
                {t.shiftTally.map((row) => (
                  <div key={row.label} className={styles.tallyRow}>
                    <span className={styles.tallyLabel}>{row.label}</span>
                    <span className={styles.tallyValue} dir="ltr">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className={styles.rule} />
              <span className={styles.foot}>{t.shiftFoot}</span>
            </div>
          </div>

          <div className={styles.collage}>
            <div className={styles.teamPhoto}>
              <SlotImage id="jobs-window-team" alt={t.teamSlot} />
            </div>
            <div className={styles.pair}>
              <div className={styles.square}>
                <SlotImage id="jobs-hands-machine" alt={t.handsSlot} />
              </div>
              <div className={styles.square}>
                <SlotImage id="jobs-cup-handoff" alt={t.handoffSlot} />
              </div>
            </div>
            <SceneBand scene="beach" height={14} />
          </div>
        </div>
      </div>
    </section>
  );
}
