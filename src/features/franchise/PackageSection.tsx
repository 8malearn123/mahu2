import type { Locale } from "@/i18n/config";
import { franchise } from "@/i18n/dictionaries/franchise";
import { cx } from "@/lib/cx";
import styles from "./PackageSection.module.css";

type Band = { tone: string; decoration?: "sun" | "waves" };

// Each band's look, top to bottom.
const BANDS: readonly Band[] = [
  { tone: styles.cream },
  { tone: styles.sun },
  { tone: styles.beach },
  { tone: styles.sea, decoration: "sun" },
  { tone: styles.teal },
  { tone: styles.pine, decoration: "waves" },
];

/** "What you get": the franchise package as a stack of coloured bands. */
export function PackageSection({ lang }: { lang: Locale }) {
  const t = franchise[lang].pack;
  return (
    <section id="package" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>{t.packTitle}</h2>
        </div>
        <div className={styles.bands}>
          {t.items.map((item, index) => {
            const band = BANDS[index % BANDS.length];
            return (
              <div key={item.title} className={cx(styles.band, band.tone)}>
                {band.decoration === "sun" && <span aria-hidden="true" className={styles.bandSun} />}
                {band.decoration === "waves" && (
                  <>
                    <span aria-hidden="true" className={cx(styles.bandWave, styles.bandWave1)} />
                    <span aria-hidden="true" className={cx(styles.bandWave, styles.bandWave2)} />
                  </>
                )}
                <h3 className={styles.bandTitle}>{item.title}</h3>
                <p className={styles.bandBody}>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
